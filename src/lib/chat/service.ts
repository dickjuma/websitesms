import { Types } from "mongoose";

import { getAiTrainingContext } from "@/lib/chat/training";
import type {
  ChatSessionDto,
  ChatbotResponseDto,
  LeadDto,
  LeadInput,
  LeadQualification,
  LeadStatus,
  MessageDto,
} from "@/lib/chat/types";
import { getKnowledgeContextForQuery } from "@/lib/chat/website-knowledge";
import { connectToMongoose } from "@/lib/mongoose";
import {
  classifyLead,
  extractLeadSignals,
  maxQualification,
  sanitizeLeadInput,
} from "@/lib/chat/qualify";
import { generateGroqReply } from "@/lib/chat/groq";
import { ChatSessionModel } from "@/models/ChatSession";
import { LeadModel } from "@/models/Lead";
import { MessageModel } from "@/models/Message";
import { VisitorModel } from "@/models/Visitor";
import { sendNewLeadNotificationToTeam, sendNewChatMessageNotificationToTeam } from "@/lib/email";

function emitChatMessageIgnore(_payload: any) {}
function emitAgentJoinIgnore(_payload: any) {}

let emitChatMessage: (payload: any) => void = emitChatMessageIgnore;
let emitAgentJoin: (payload: any) => void = emitAgentJoinIgnore;

try {
  const socketModule = require("@/lib/socket/server");
  if (socketModule.emitChatMessage) emitChatMessage = socketModule.emitChatMessage;
  if (socketModule.emitAgentJoin) emitAgentJoin = socketModule.emitAgentJoin;
} catch {}

const FALLBACK_REPLY =
  "Thanks for reaching out. I can help with project scope, pricing direction, or getting a human specialist into the conversation.";

function calculateLeadScore(
  qualification: LeadQualification,
  chatDepth: number,
): number {
  const qualificationScore =
    qualification === "HOT" ? 50 : qualification === "WARM" ? 25 : 10;
  const chatDepthScore = Math.min(chatDepth * 5, 50);
  return qualificationScore + chatDepthScore;
}

function createSessionTitle(message: string) {
  const normalized = message.trim().replace(/\s+/g, " ");
  return normalized.length <= 72
    ? normalized
    : `${normalized.slice(0, 69).trim()}...`;
}

function toIsoString(value?: Date | string | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString();
}

async function generateAiSummary(
  lead: LeadDto,
  messages: MessageDto[],
): Promise<string> {
  const recentMessages = messages.slice(-10);

  if (recentMessages.length < 3) {
    return "";
  }

  const conversationText = recentMessages
    .map((message: MessageDto) => `${message.sender}: ${message.message}`)
    .join("\n");

  const prompt = `Summarize this conversation in 2-3 sentences for a sales team. Include: 1) What the visitor needs, 2) Current qualification level, 3) Any next steps mentioned.\n\nConversation:\n${conversationText}\n\nLead info: name=${lead.name || "unknown"}, email=${lead.email || "unknown"}, need=${lead.businessNeed || "unknown"}`;

  try {
    const Groq = (await import("groq-sdk")).default;
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("Failed to generate AI summary:", error);
    return "";
  }
}

function assertLeadId(leadId: string) {
  if (!Types.ObjectId.isValid(leadId)) {
    throw new Error("Invalid leadId.");
  }

  return new Types.ObjectId(leadId) as any;
}

function normalizeQualification(
  value?: string,
): LeadQualification | undefined {
  if (value === "HOT" || value === "WARM" || value === "COLD") {
    return value;
  }

  return undefined;
}

function normalizeStatus(value?: string): LeadStatus | undefined {
  if (value === "new" || value === "contacted" || value === "closed") {
    return value;
  }

  return undefined;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type LeadDashboardRow = Pick<
  LeadDto,
  | "id"
  | "name"
  | "email"
  | "phone"
  | "businessNeed"
  | "qualification"
  | "leadScore"
  | "isHumanActive"
  | "status"
  | "visitorId"
  | "currentSessionId"
  | "sessionCount"
  | "createdAt"
> & {
  lastMessage: string;
  lastMessageAt: string;
};

interface LeadDashboardListOptions {
  page?: number;
  limit?: number;
  search?: string;
  qualification?: LeadQualification;
}

function buildLeadDashboardQuery(options: {
  search?: string;
  qualification?: LeadQualification;
}) {
  const query: Record<string, unknown> = {};

  if (options.qualification) {
    query.qualification = options.qualification;
  }

  const normalizedSearch = options.search?.trim();
  if (normalizedSearch) {
    const safePattern = escapeRegex(normalizedSearch);
    query.$or = [
      { name: { $regex: safePattern, $options: "i" } },
      { email: { $regex: safePattern, $options: "i" } },
      { businessNeed: { $regex: safePattern, $options: "i" } },
      { visitorId: { $regex: safePattern, $options: "i" } },
    ];
  }

  return query;
}

async function fetchLeadDashboardRows(
  options: LeadDashboardListOptions & {
    skip?: number;
    includeTotal?: boolean;
  } = {},
) {
  await connectToMongoose();

  const query = buildLeadDashboardQuery(options);
  const limit =
    typeof options.limit === "number" && Number.isFinite(options.limit) && options.limit > 0
      ? Math.min(options.limit, 100)
      : undefined;
  const skip =
    typeof options.skip === "number" && Number.isFinite(options.skip) && options.skip > 0
      ? options.skip
      : 0;

  const [leads, total] = await Promise.all([
    (() => {
      const leadQuery = LeadModel.find(
        query,
        {
          name: 1,
          email: 1,
          phone: 1,
          businessNeed: 1,
          qualification: 1,
          leadScore: 1,
          isHumanActive: 1,
          status: 1,
          visitorId: 1,
          currentSessionId: 1,
          sessionCount: 1,
          lastActivityAt: 1,
          createdAt: 1,
        },
      )
        .sort({ lastActivityAt: -1, createdAt: -1 })
        .skip(skip);

      if (typeof limit === "number") {
        leadQuery.limit(limit);
      }

      return leadQuery.lean();
    })(),
    options.includeTotal ? LeadModel.countDocuments(query) : Promise.resolve(0),
  ]);

  if (leads.length === 0) {
    return {
      leads: [] as LeadDashboardRow[],
      total,
    };
  }

  const leadIds = leads.map((lead) => lead._id);
  const latestMessages = await MessageModel.aggregate<{
    _id: Types.ObjectId;
    message: string;
    timestamp: Date;
  }>([
    {
      $match: {
        leadId: { $in: leadIds },
      },
    },
    {
      $sort: {
        leadId: 1,
        timestamp: -1,
      },
    },
    {
      $group: {
        _id: "$leadId",
        message: { $first: "$message" },
        timestamp: { $first: "$timestamp" },
      },
    },
  ]);

  const latestMessageByLead = new Map(
    latestMessages.map((message) => [message._id.toString(), message]),
  );

  const rows = leads
    .map((lead: any) => {
      const latestMessage = latestMessageByLead.get(lead._id.toString());

      return {
        id: lead._id.toString(),
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        businessNeed: lead.businessNeed || "",
        qualification: lead.qualification || "COLD",
        leadScore: lead.leadScore || 0,
        isHumanActive: Boolean(lead.isHumanActive),
        status: lead.status || "new",
        visitorId: lead.visitorId || "",
        currentSessionId: lead.currentSessionId || "",
        sessionCount: lead.sessionCount || 0,
        createdAt: toIsoString(lead.createdAt),
        lastMessage: latestMessage?.message || "",
        lastMessageAt: toIsoString(
          latestMessage?.timestamp || lead.lastActivityAt || lead.createdAt,
        ),
      } satisfies LeadDashboardRow;
    })
    .sort(
      (left, right) =>
        new Date(right.lastMessageAt || right.createdAt).getTime() -
        new Date(left.lastMessageAt || left.createdAt).getTime(),
    );

  return {
    leads: rows,
    total,
  };
}

function serializeLead(lead: any): LeadDto {
  return {
    id: lead._id.toString(),
    name: lead.name || "",
    email: lead.email || "",
    phone: lead.phone || "",
    businessNeed: lead.businessNeed || "",
    qualification: lead.qualification || "COLD",
    leadScore: lead.leadScore || 0,
    isHumanActive: Boolean(lead.isHumanActive),
    status: lead.status || "new",
    visitorId: lead.visitorId || "",
    currentSessionId: lead.currentSessionId || "",
    sessionCount: lead.sessionCount || 0,
    aiSummary: lead.aiSummary || "",
    lastActivityAt: toIsoString(lead.lastActivityAt),
    pagesVisited: (lead.pagesVisited || []).map((page: any) => ({
      path: page.path,
      title: page.title || "",
      visitedAt: toIsoString(page.visitedAt),
      timeSpent: page.timeSpent || 0,
    })),
    activityTimeline: (lead.activityTimeline || []).map((activity: any) => ({
      action: activity.action,
      detail: activity.detail || "",
      timestamp: toIsoString(activity.timestamp),
      metadata: activity.metadata,
    })),
    chatDepth: lead.chatDepth || 0,
    createdAt: toIsoString(lead.createdAt),
    updatedAt: toIsoString(lead.updatedAt),
  };
}

function serializeSession(session: any): ChatSessionDto {
  return {
    id: session.sessionId,
    leadId: session.leadId.toString(),
    visitorId: session.visitorId || "",
    status: session.status || "active",
    title: session.title || "Conversation",
    aiSummary: session.aiSummary || "",
    messageCount: session.messageCount || 0,
    startedAt: toIsoString(session.startedAt),
    lastActivityAt: toIsoString(session.lastActivityAt),
    lastMessageAt: toIsoString(session.lastMessageAt),
    lastMessagePreview: session.lastMessagePreview || "",
    createdAt: toIsoString(session.createdAt),
    updatedAt: toIsoString(session.updatedAt),
  };
}

function serializeMessage(message: any): MessageDto {
  return {
    id: message._id.toString(),
    leadId: message.leadId.toString(),
    sessionId: message.sessionId,
    sender: message.sender,
    message: message.message,
    timestamp: toIsoString(message.timestamp || message.createdAt),
    ...(message.clientMessageId ? { clientMessageId: message.clientMessageId } : {}),
  };
}

async function getLeadDocument(leadId: string) {
  await connectToMongoose();
  return LeadModel.findById(assertLeadId(leadId)).lean();
}

async function getSessionDocument(sessionId: string) {
  await connectToMongoose();
  return ChatSessionModel.findOne({ sessionId } as any).lean();
}

async function listSessionsForLead(leadId: string, limit = 10) {
  await connectToMongoose();

  const sessions = await ChatSessionModel.find({ leadId: assertLeadId(leadId) } as any)
    .sort({ lastActivityAt: -1 })
    .limit(limit)
    .lean();

  return sessions.map((session: any) => serializeSession(session));
}

export async function listSessionsForVisitor(visitorId: string, limit = 10) {
  await connectToMongoose();

  const sessions = await ChatSessionModel.find({ visitorId } as any)
    .sort({ lastActivityAt: -1 })
    .limit(limit)
    .lean();

  return sessions.map((session: any) => serializeSession(session));
}

async function getLatestSessionForLead(leadId: string) {
  await connectToMongoose();

  return ChatSessionModel.findOne({ leadId: assertLeadId(leadId) } as any)
    .sort({ lastActivityAt: -1 })
    .lean();
}

async function getLatestSessionForVisitor(visitorId: string) {
  await connectToMongoose();

  return ChatSessionModel.findOne({ visitorId } as any).sort({ lastActivityAt: -1 }).lean();
}

async function syncVisitorLeadLink(leadId: string, visitorId?: string) {
  if (!visitorId) {
    return;
  }

  const visitor = await VisitorModel.findOne({ visitorId });

  if (!visitor) {
    return;
  }

  visitor.leadId = assertLeadId(leadId);
  visitor.lastSeenAt = new Date();
  await visitor.save();
}

async function mergeVisitorPagesIntoLead(leadId: string, visitorId?: string) {
  if (!visitorId) {
    return;
  }

  const [lead, visitor] = await Promise.all([
    LeadModel.findById(assertLeadId(leadId)),
    VisitorModel.findOne({ visitorId }),
  ]);

  if (!lead || !visitor) {
    return;
  }

  lead.pagesVisited = lead.pagesVisited || [];

  const existingPageMap = new Map(
    (lead.pagesVisited || []).map((page: any, index: number) => [page.path, index] as const),
  );

  for (const page of visitor.pagesVisited || []) {
    const existingIndex = existingPageMap.get(page.path);

    if (existingIndex === undefined) {
      lead.pagesVisited.push({
        path: page.path,
        title: page.title || "",
        visitedAt: page.visitedAt || new Date(),
        timeSpent: page.timeSpent || 0,
      });
      continue;
    }

    const existingPage = lead.pagesVisited[existingIndex];
    existingPage.timeSpent = Math.max(
      existingPage.timeSpent || 0,
      page.timeSpent || 0,
    );
  }

  await lead.save();
}

async function attachLeadInput(
  lead: any,
  leadInput?: LeadInput,
) {
  const cleanLeadInput = sanitizeLeadInput(leadInput);
  const nextQualification = normalizeQualification(leadInput?.qualification);
  const nextStatus = normalizeStatus(leadInput?.status);

  if (cleanLeadInput.name) {
    lead.name = cleanLeadInput.name;
  }

  if (cleanLeadInput.email) {
    lead.email = cleanLeadInput.email;
  }

  if (cleanLeadInput.phone) {
    lead.phone = cleanLeadInput.phone;
  }

  if (cleanLeadInput.businessNeed) {
    lead.businessNeed = cleanLeadInput.businessNeed;
  }

  if (nextQualification) {
    lead.qualification = nextQualification;
  }

  if (nextStatus) {
    lead.status = nextStatus;
  }
}

export async function getOrCreateLead(params: {
  leadId?: string;
  leadInput?: LeadInput;
  seedMessage?: string;
  visitorId?: string;
}) {
  await connectToMongoose();

  const cleanLeadInput = sanitizeLeadInput(params.leadInput);
  const extractedSignals = params.seedMessage
    ? extractLeadSignals(params.seedMessage)
    : {};

  const mergedLeadInput: LeadInput = {
    ...cleanLeadInput,
    qualification: params.leadInput?.qualification,
    status: params.leadInput?.status,
    name: cleanLeadInput.name || extractedSignals.name || "",
    email: cleanLeadInput.email || extractedSignals.email || "",
    phone: cleanLeadInput.phone || extractedSignals.phone || "",
    businessNeed:
      cleanLeadInput.businessNeed || extractedSignals.businessNeed || "",
  };

  let lead =
    (params.leadId
      ? await LeadModel.findById(assertLeadId(params.leadId))
      : null) ||
    (params.visitorId
      ? await LeadModel.findOne({ visitorId: params.visitorId })
      : null);

  if (!lead) {
    lead = await LeadModel.create({
      name: mergedLeadInput.name || "",
      email: mergedLeadInput.email || "",
      phone: mergedLeadInput.phone || "",
      businessNeed: mergedLeadInput.businessNeed || "",
      qualification: params.seedMessage
        ? classifyLead(params.seedMessage)
        : normalizeQualification(mergedLeadInput.qualification) || "COLD",
      status: normalizeStatus(mergedLeadInput.status) || "new",
      visitorId: params.visitorId || "",
      currentSessionId: "",
      sessionCount: 0,
      leadScore: 0,
      lastActivityAt: new Date(),
      chatDepth: 0,
      activityTimeline: [
        {
          action: "session_start",
          detail: "First visit",
          timestamp: new Date(),
        },
      ],
    });

    sendNewLeadNotificationToTeam({
      name: mergedLeadInput.name || "",
      email: mergedLeadInput.email || "",
      phone: mergedLeadInput.phone || "",
      businessNeed: mergedLeadInput.businessNeed || "",
      qualification: params.seedMessage
        ? classifyLead(params.seedMessage)
        : normalizeQualification(mergedLeadInput.qualification) || "COLD",
    });
  } else {
    await attachLeadInput(lead, mergedLeadInput);

    if (params.visitorId && !lead.visitorId) {
      lead.visitorId = params.visitorId;
    }

    if (params.seedMessage?.trim()) {
      lead.qualification = maxQualification(
        lead.qualification,
        classifyLead(params.seedMessage),
      );
    }

    lead.lastActivityAt = new Date();
    await lead.save();
  }

  await Promise.all([
    syncVisitorLeadLink(lead._id.toString(), params.visitorId),
    mergeVisitorPagesIntoLead(lead._id.toString(), params.visitorId),
  ]);

  return serializeLead(lead.toObject());
}

export async function createChatSession(params: {
  leadId: string;
  visitorId?: string;
  title?: string;
}) {
  await connectToMongoose();

  const now = new Date();
  const leadObjectId = assertLeadId(params.leadId);

  const createdSession = await ChatSessionModel.create({
    leadId: leadObjectId,
    visitorId: params.visitorId || "",
    status: "active",
    title: params.title?.trim() || "New conversation",
    startedAt: now,
    lastActivityAt: now,
    lastMessageAt: now,
    lastMessagePreview: "",
    messageCount: 0,
  });

  await Promise.all([
    LeadModel.updateOne(
      { _id: leadObjectId },
      {
        $set: {
          currentSessionId: createdSession.sessionId,
          lastActivityAt: now,
        },
        $inc: { sessionCount: 1 },
      },
    ),
    params.visitorId
      ? VisitorModel.updateOne(
          { visitorId: params.visitorId },
          {
            $set: {
              currentSessionId: createdSession.sessionId,
              lastSeenAt: now,
            },
            $inc: { sessionCount: 1 },
          },
        )
      : Promise.resolve(),
  ]);

  return serializeSession(createdSession.toObject());
}

async function resolveSession(params: {
  leadId: string;
  visitorId?: string;
  sessionId?: string;
  seedMessage?: string;
  createIfMissing?: boolean;
}) {
  await connectToMongoose();

  let session =
    (params.sessionId
      ? await ChatSessionModel.findOne({ sessionId: params.sessionId } as any)
      : null) ||
    (await LeadModel.findById(assertLeadId(params.leadId))
      .select("currentSessionId")
      .lean()
      .then((lead) =>
        lead?.currentSessionId
          ? ChatSessionModel.findOne({ sessionId: lead.currentSessionId } as any).lean()
          : null,
      )) ||
    (await getLatestSessionForLead(params.leadId));

  if (!session && params.createIfMissing !== false) {
    return createChatSession({
      leadId: params.leadId,
      visitorId: params.visitorId,
      title: params.seedMessage?.trim()
        ? createSessionTitle(params.seedMessage)
        : "New conversation",
    });
  }

  if (!session) {
    return null;
  }

  await Promise.all([
    LeadModel.updateOne(
      { _id: assertLeadId(params.leadId) },
      {
        $set: {
          currentSessionId: session.sessionId,
          lastActivityAt: new Date(),
        },
      },
    ),
    params.visitorId
      ? VisitorModel.updateOne(
          { visitorId: params.visitorId },
          {
            $set: {
              currentSessionId: session.sessionId,
              lastSeenAt: new Date(),
            },
          },
        )
      : Promise.resolve(),
  ]);

  return serializeSession(session);
}

export async function updateLeadDetails(
  leadId: string,
  leadInput: LeadInput,
) {
  await connectToMongoose();

  const lead = await LeadModel.findById(assertLeadId(leadId));

  if (!lead) {
    throw new Error("Lead not found.");
  }

  await attachLeadInput(lead, leadInput);
  lead.lastActivityAt = new Date();
  await lead.save();

  return serializeLead(lead.toObject());
}

export async function saveMessage(params: {
  leadId: string;
  sessionId: string;
  sender: "user" | "bot" | "agent";
  message: string;
  clientMessageId?: string;
}) {
  await connectToMongoose();

  if (params.clientMessageId) {
    const existingMessage = await MessageModel.findOne({
      leadId: assertLeadId(params.leadId),
      clientMessageId: params.clientMessageId,
    } as any).lean();

    if (existingMessage) {
      return serializeMessage(existingMessage);
    }
  }

  const lead = await LeadModel.findById(assertLeadId(params.leadId))
    .select({ visitorId: 1 })
    .lean();

  if (!lead) {
    throw new Error("Lead not found.");
  }

  const resolvedUserId = lead.visitorId || params.leadId;
  const messageTimestamp = new Date();

  const createdMessage = await MessageModel.create({
    userId: resolvedUserId,
    leadId: assertLeadId(params.leadId),
    sessionId: params.sessionId,
    sender: params.sender,
    message: params.message.trim(),
    timestamp: messageTimestamp,
    clientMessageId: params.clientMessageId || "",
  });

  await ChatSessionModel.updateOne(
    { sessionId: params.sessionId } as any,
    {
      $set: {
        lastActivityAt: createdMessage.timestamp || createdMessage.createdAt || messageTimestamp,
        lastMessageAt: createdMessage.timestamp || createdMessage.createdAt || messageTimestamp,
        lastMessagePreview: params.message.trim().slice(0, 180),
        ...(params.sender === "user"
          ? { title: createSessionTitle(params.message) }
          : {}),
      },
      $inc: { messageCount: 1 },
    },
  );

  return serializeMessage(createdMessage.toObject());
}

export async function getLeadMessages(
  leadId: string,
  limit = 50,
  sessionId?: string,
) {
  await connectToMongoose();

  let resolvedSessionId = sessionId;
  
  if (!resolvedSessionId) {
    const leadObjId = new Types.ObjectId(leadId);
    const lead = await LeadModel.findById(leadObjId)
      .select("currentSessionId")
      .lean();
    
    if (lead?.currentSessionId) {
      resolvedSessionId = lead.currentSessionId;
    } else {
      const latestSession = await ChatSessionModel.findOne(
        { leadId: leadObjId }
      )
        .sort({ lastActivityAt: -1 })
        .limit(1)
        .lean();
      
      resolvedSessionId = latestSession?.sessionId;
    }
  }

  if (!resolvedSessionId) {
    return [];
  }

  const leadObjId = new Types.ObjectId(leadId);
  const messages = await MessageModel.find({
    leadId: leadObjId,
    sessionId: resolvedSessionId,
  } as any)
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean();

  return messages.map((message: any) => serializeMessage(message));
}

async function refreshLeadAndSessionSummary(leadId: string, sessionId: string) {
  const [leadDocument, messages, session] = await Promise.all([
    getLeadDocument(leadId),
    getLeadMessages(leadId, 10, sessionId),
    getSessionDocument(sessionId),
  ]);

  if (!leadDocument || !session || messages.length < 3) {
    return;
  }

  const summary = await generateAiSummary(serializeLead(leadDocument), messages);

  if (!summary) {
    return;
  }

  await Promise.all([
    LeadModel.updateOne(
      { _id: assertLeadId(leadId) },
      { $set: { aiSummary: summary, lastActivityAt: new Date() } },
    ),
    ChatSessionModel.updateOne(
      { sessionId } as any,
      { $set: { aiSummary: summary, lastActivityAt: new Date() } },
    ),
  ]);
}

export async function updateLeadActivity(
  identifiers: {
    leadId?: string | null;
    visitorId?: string | null;
    sessionId?: string | null;
  },
  activity: {
    action: string;
    detail?: string;
    metadata?: Record<string, unknown>;
    pageVisit?: { path: string; title: string; timeSpent: number };
  },
) {
  await connectToMongoose();

  const now = new Date();

  if (identifiers.visitorId) {
    const visitor = await VisitorModel.findOne({ visitorId: identifiers.visitorId });

    if (visitor) {
      visitor.lastSeenAt = now;

      if (identifiers.sessionId) {
        visitor.currentSessionId = identifiers.sessionId;
      }

      if (activity.pageVisit) {
        const existingPage = visitor.pagesVisited.find(
          (page) => page.path === activity.pageVisit?.path,
        );

        if (existingPage) {
          existingPage.timeSpent = Math.max(
            existingPage.timeSpent || 0,
            activity.pageVisit.timeSpent || 0,
          );
        } else {
          visitor.pagesVisited.push({
            path: activity.pageVisit.path,
            title: activity.pageVisit.title || "",
            visitedAt: now,
            timeSpent: activity.pageVisit.timeSpent || 0,
          });
        }
      }

      await visitor.save();
    }
  }

  if (!identifiers.leadId) {
    return null;
  }

  const lead = await LeadModel.findById(assertLeadId(identifiers.leadId));

  if (!lead) {
    return null;
  }

  lead.lastActivityAt = now;

  if (identifiers.sessionId) {
    lead.currentSessionId = identifiers.sessionId;
  }

  lead.activityTimeline = lead.activityTimeline || [];
  lead.activityTimeline.push({
    action: activity.action,
    detail: activity.detail || "",
    timestamp: now,
    metadata: activity.metadata,
  });

  if (activity.pageVisit) {
    lead.pagesVisited = lead.pagesVisited || [];
    const existingPageIndex = lead.pagesVisited.findIndex(
      (page) => page.path === activity.pageVisit?.path,
    );

    if (existingPageIndex >= 0) {
      lead.pagesVisited[existingPageIndex].timeSpent = Math.max(
        lead.pagesVisited[existingPageIndex].timeSpent || 0,
        activity.pageVisit.timeSpent || 0,
      );
    } else {
      lead.pagesVisited.push({
        path: activity.pageVisit.path,
        title: activity.pageVisit.title || "",
        visitedAt: now,
        timeSpent: activity.pageVisit.timeSpent || 0,
      });
    }
  }

  if (activity.action === "chat_message") {
    lead.chatDepth = (lead.chatDepth || 0) + 1;
    lead.leadScore = calculateLeadScore(
      lead.qualification as LeadQualification,
      lead.chatDepth,
    );
  }

  await lead.save();

  if (activity.action === "chat_message" && identifiers.sessionId) {
    const session = await ChatSessionModel.findOne({
      sessionId: identifiers.sessionId,
    } as any).lean();

    if (session && session.messageCount > 0 && session.messageCount % 5 === 0) {
      await refreshLeadAndSessionSummary(lead._id.toString(), session.sessionId);
    }
  }

  return serializeLead(lead.toObject());
}

async function buildChatState(params: {
  leadId?: string;
  sessionId?: string;
  visitorId?: string;
  limit?: number;
  includeSessions?: boolean;
}) {
  await connectToMongoose();

  let lead =
    (params.leadId ? await LeadModel.findById(assertLeadId(params.leadId)).lean() : null) ||
    (params.sessionId
      ? await ChatSessionModel.findOne({ sessionId: params.sessionId } as any)
          .lean()
          .then((session) =>
            session ? LeadModel.findById(session.leadId).lean() : null,
          )
      : null) ||
    (params.visitorId ? await LeadModel.findOne({ visitorId: params.visitorId }).lean() : null);

  if (!lead) {
    if (params.sessionId) {
      return {
        lead: null,
        session: null,
        sessions: [],
        messages: [],
        newSessionId: params.sessionId,
      };
    }
    throw new Error("Lead not found.");
  }

  const session =
    (params.sessionId
      ? await ChatSessionModel.findOne({
          sessionId: params.sessionId,
          leadId: lead._id,
        } as any).lean()
      : null) ||
    (lead.currentSessionId
      ? await ChatSessionModel.findOne({
          sessionId: lead.currentSessionId,
          leadId: lead._id,
        } as any).lean()
      : null) ||
    (await ChatSessionModel.findOne({ leadId: lead._id } as any)
      .sort({ lastActivityAt: -1 })
      .lean());

  if (!session) {
    if (lead) {
      const createdSession = await createChatSession({
        leadId: lead._id.toString(),
        visitorId: lead.visitorId || "",
      });
      if (createdSession.id) {
        const messages = await getLeadMessages(lead._id.toString(), params.limit || 60, createdSession.id);
        return {
          lead: serializeLead(lead),
          session: serializeSession(createdSession),
          sessions: [],
          messages,
        };
      }
    }
    throw new Error("No session found.");
  }

  const messages = await getLeadMessages(lead._id.toString(), params.limit || 60, session.sessionId);
  
  const sessions = params.includeSessions !== false 
    ? await listSessionsForLead(lead._id.toString(), 10)
    : [];

  return {
    lead: serializeLead(lead),
    session: serializeSession(session),
    sessions,
    messages,
  };
}

export async function getLeadChatSnapshot(params: {
  leadId?: string;
  sessionId?: string;
  visitorId?: string;
  limit?: number;
}) {
  return buildChatState(params);
}

export async function getVisitorChatState(visitorId: string) {
  await connectToMongoose();

  const latestSession = await getLatestSessionForVisitor(visitorId);

  if (!latestSession) {
    return {
      lead: null,
      session: null,
      sessions: [],
      messages: [],
    };
  }

  const state = await buildChatState({
    leadId: latestSession.leadId.toString(),
    sessionId: latestSession.sessionId,
    visitorId,
  });

  return state;
}

export async function processUserMessage(params: {
  leadId?: string;
  sessionId?: string;
  leadInput?: LeadInput;
  message?: string;
  clientMessageId?: string;
  visitorId?: string;
}): Promise<ChatbotResponseDto> {
  const lead = await getOrCreateLead({
    leadId: params.leadId,
    leadInput: params.leadInput,
    seedMessage: params.message,
    visitorId: params.visitorId,
  });

  const session = await resolveSession({
    leadId: lead.id,
    visitorId: params.visitorId || lead.visitorId,
    sessionId: params.sessionId,
    seedMessage: params.message,
    createIfMissing: true,
  });

  if (!session) {
    throw new Error("Failed to resolve session.");
  }

  if (!params.message?.trim()) {
    const snapshot = await getLeadChatSnapshot({
      leadId: lead.id,
      sessionId: session.id,
    });

    if (!snapshot.lead || !snapshot.session) {
      throw new Error("Failed to load chat snapshot.");
    }

    return {
      ...snapshot,
      reply: null,
      waitingForAgent: snapshot.lead.isHumanActive,
    };
  }

  const userMessage = await saveMessage({
    leadId: lead.id,
    sessionId: session.id,
    sender: "user",
    message: params.message,
    clientMessageId: params.clientMessageId,
  });

  sendNewChatMessageNotificationToTeam({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
  }, params.message);

  emitChatMessage(userMessage);

  await updateLeadActivity(
    {
      leadId: lead.id,
      visitorId: params.visitorId || lead.visitorId,
      sessionId: session.id,
    },
    {
      action: "chat_message",
      detail: `User sent message: ${params.message.slice(0, 60)}`,
      metadata: { clientMessageId: params.clientMessageId },
    },
  );

  const refreshedLead = serializeLead((await getLeadDocument(lead.id))!);

  if (refreshedLead.isHumanActive) {
    const snapshot = await getLeadChatSnapshot({
      leadId: lead.id,
      sessionId: session.id,
    });

    if (!snapshot.lead || !snapshot.session) {
      throw new Error("Failed to load chat snapshot.");
    }

    return {
      ...snapshot,
      reply: null,
      waitingForAgent: true,
    };
  }

  const [recentConversation, knowledgeContext, trainingContext] =
    await Promise.all([
      getLeadMessages(refreshedLead.id, 20, session.id),
      getKnowledgeContextForQuery(params.message),
      getAiTrainingContext(params.message),
    ]);

  const replyText = await generateGroqReply(
    refreshedLead,
    recentConversation,
    `${trainingContext}\n\nWebsite knowledge:\n${knowledgeContext}`,
  ).catch((error) => {
    console.error("Groq reply generation failed:", error);
    return FALLBACK_REPLY;
  });

  const botMessage = await saveMessage({
    leadId: refreshedLead.id,
    sessionId: session.id,
    sender: "bot",
    message: replyText,
  });

  emitChatMessage(botMessage);

  const snapshot = await getLeadChatSnapshot({
    leadId: refreshedLead.id,
    sessionId: session.id,
  });

  if (!snapshot.lead || !snapshot.session) {
    throw new Error("Failed to load chat snapshot.");
  }

  return {
    ...snapshot,
    reply: botMessage,
    waitingForAgent: false,
  };
}

export async function activateHumanTakeover(leadId: string, sessionId?: string) {
  await connectToMongoose();

  const lead = await LeadModel.findById(assertLeadId(leadId));

  if (!lead) {
    throw new Error("Lead not found.");
  }

  const session = await resolveSession({
    leadId,
    visitorId: lead.visitorId,
    sessionId,
    createIfMissing: true,
  });

  if (!session) {
    throw new Error("Session not found.");
  }

  lead.isHumanActive = true;
  lead.status = "contacted";
  lead.currentSessionId = session.id;
  await lead.save();

  const notice = await saveMessage({
    leadId,
    sessionId: session.id,
    sender: "agent",
    message: "You are now connected to a human agent.",
  });

  emitAgentJoin({
    leadId,
    adminId: "admin",
    adminName: "Admin",
    isActive: true,
    sessionId: session.id,
  });
  emitChatMessage(notice);

  const snapshot = await getLeadChatSnapshot({ leadId, sessionId: session.id });

  return {
    ...snapshot,
    notice,
  };
}

export async function deactivateHumanTakeover(leadId: string, sessionId?: string) {
  await connectToMongoose();

  const lead = await LeadModel.findById(assertLeadId(leadId));

  if (!lead) {
    throw new Error("Lead not found.");
  }

  const session = await resolveSession({
    leadId,
    visitorId: lead.visitorId,
    sessionId,
    createIfMissing: false,
  });

  lead.isHumanActive = false;
  await lead.save();

  if (session) {
    emitAgentJoin({
      leadId,
      adminId: "admin",
      adminName: "Admin",
      isActive: false,
      sessionId: session.id,
    });

    const snapshot = await getLeadChatSnapshot({ leadId, sessionId: session.id });

    return {
      ...snapshot,
    };
  }

  return { lead };
}

export async function sendAgentMessage(params: {
  leadId: string;
  sessionId?: string;
  message: string;
  clientMessageId?: string;
}) {
  await connectToMongoose();

  const lead = await LeadModel.findById(assertLeadId(params.leadId));

  if (!lead) {
    throw new Error("Lead not found.");
  }

  const session = await resolveSession({
    leadId: params.leadId,
    visitorId: lead.visitorId,
    sessionId: params.sessionId,
    createIfMissing: true,
  });

  if (!session) {
    throw new Error("Session not found.");
  }

  lead.isHumanActive = true;
  lead.status = "contacted";
  lead.currentSessionId = session.id;
  lead.lastActivityAt = new Date();
  await lead.save();

  const agentMessage = await saveMessage({
    leadId: params.leadId,
    sessionId: session.id,
    sender: "agent",
    message: params.message,
    clientMessageId: params.clientMessageId,
  });

  emitChatMessage(agentMessage);

  const refreshedLeadDoc = await getLeadDocument(params.leadId);

  if (!refreshedLeadDoc) {
    return {
      session,
      message: agentMessage,
    };
  }

  const refreshedLead = serializeLead(refreshedLeadDoc);

  return {
    lead: refreshedLead,
    session,
    message: agentMessage,
  };
}

export async function listLeadsForDashboard() {
  const result = await fetchLeadDashboardRows();
  return result.leads;
}

export async function listLeadsForDashboardPage(
  options: LeadDashboardListOptions = {},
) {
  const page =
    typeof options.page === "number" && Number.isFinite(options.page) && options.page > 0
      ? Math.floor(options.page)
      : 1;
  const limit =
    typeof options.limit === "number" && Number.isFinite(options.limit) && options.limit > 0
      ? Math.min(Math.floor(options.limit), 100)
      : 50;

  const result = await fetchLeadDashboardRows({
    ...options,
    limit,
    skip: (page - 1) * limit,
    includeTotal: true,
  });

  return {
    leads: result.leads,
    total: result.total,
    page,
    limit,
  };
}

export async function listLiveChatLeads(limit = 100) {
  await connectToMongoose();

  const leads = await LeadModel.find(
    {},
    {
      name: 1,
      email: 1,
      status: 1,
      isHumanActive: 1,
      lastActivityAt: 1,
      createdAt: 1,
    },
  )
    .sort({ lastActivityAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();

  if (leads.length === 0) {
    return [];
  }

  const leadIds = leads.map((lead) => lead._id.toString());
  
  const sessions = await ChatSessionModel.find(
    { leadId: { $in: leadIds.map(id => new Types.ObjectId(id)) } },
    { leadId: 1, sessionId: 1, lastMessagePreview: 1, lastActivityAt: 1 }
  )
  .sort({ lastActivityAt: -1 })
  .limit(limit)
  .lean();

  const sessionByLeadId = new Map(
    sessions.map(s => [s.leadId.toString(), s])
  );

  return leads
    .map((lead) => {
      const session = sessionByLeadId.get(lead._id.toString());

      return {
        id: lead._id.toString(),
        name: lead.name || "",
        email: lead.email || "",
        status: lead.status || "new",
        isHumanActive: Boolean(lead.isHumanActive),
        lastMessage: session?.lastMessagePreview || "",
        lastMessageAt: toIsoString(session?.lastActivityAt || lead.lastActivityAt || lead.createdAt),
      };
    })
    .sort(
      (left, right) =>
        new Date(right.lastMessageAt).getTime() - new Date(left.lastMessageAt).getTime(),
    );
}
