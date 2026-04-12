import type { Server as HTTPServer } from "http";

import type { NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import { Server as SocketIOServer, type Socket } from "socket.io";

import type {
  ActiveAdmin,
  ActiveUser,
  AgentJoinPayload,
  ClientToServerEvents,
  OutboundMessagePayload,
  ServerToClientEvents,
  TypingPayload,
} from "@/lib/socket/events";
import { verifyAdminToken } from "@/lib/admin-auth";
import { SOCKET_PATH } from "@/lib/socket/events";

type TypedSocketServer = SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents
>;

type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

type LeadPresence = {
  leadId: string;
  roomId: string;
  visitorId: string;
  name: string;
  joinedAt: string;
  unreadCount: number;
  lastMessage?: string;
  lastMessageAt?: string;
  isAgentActive: boolean;
  sockets: Set<string>;
};

type AdminPresence = {
  adminId: string;
  name: string;
  connectedAt: string;
  sockets: Set<string>;
};

type SocketPresence = {
  adminId?: string;
  leadId?: string;
  roomId?: string;
};

declare global {
  var socketServerInstance: TypedSocketServer | undefined;
  var socketAdmins: Map<string, AdminPresence> | undefined;
  var socketLeads: Map<string, LeadPresence> | undefined;
  var socketPresence: Map<string, SocketPresence> | undefined;
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: TypedSocketServer;
    };
  };
};

const ADMIN_ROOM = "admin:global";
const MAX_MESSAGE_LENGTH = 4000;

function getAdminRegistry() {
  if (!global.socketAdmins) {
    global.socketAdmins = new Map();
  }

  return global.socketAdmins;
}

function getLeadRegistry() {
  if (!global.socketLeads) {
    global.socketLeads = new Map();
  }

  return global.socketLeads;
}

function getPresenceRegistry() {
  if (!global.socketPresence) {
    global.socketPresence = new Map();
  }

  return global.socketPresence;
}

function getPresence(socketId: string) {
  const registry = getPresenceRegistry();

  if (!registry.has(socketId)) {
    registry.set(socketId, {});
  }

  return registry.get(socketId)!;
}

function serializeActiveUsers(): ActiveUser[] {
  return Array.from(getLeadRegistry().values()).map((lead) => ({
    socketId: lead.roomId,
    visitorId: lead.visitorId,
    name: lead.name,
    joinedAt: lead.joinedAt,
    unreadCount: lead.unreadCount,
  }));
}

function serializeActiveAdmins(): ActiveAdmin[] {
  return Array.from(getAdminRegistry().values()).map((admin) => ({
    socketId: admin.adminId,
    name: admin.name,
    connectedAt: admin.connectedAt,
  }));
}

function emitUsersUpdate(io: TypedSocketServer) {
  io.to(ADMIN_ROOM).emit("users_update", serializeActiveUsers());
}

function emitAdminConnected(socket: TypedSocket) {
  socket.emit("admin_connected", {
    admins: serializeActiveAdmins(),
    users: serializeActiveUsers(),
  });
}

function ensureLeadPresence(params: {
  leadId: string;
  roomId: string;
  visitorId?: string;
  name?: string;
}) {
  const leads = getLeadRegistry();
  const existing = leads.get(params.leadId);

  if (existing) {
    existing.roomId = params.roomId || existing.roomId;
    existing.visitorId = params.visitorId || existing.visitorId;
    existing.name = params.name || existing.name;
    return { lead: existing, isNew: false };
  }

  const lead: LeadPresence = {
    leadId: params.leadId,
    roomId: params.roomId,
    visitorId: params.visitorId || params.leadId,
    name: params.name || "Visitor",
    joinedAt: new Date().toISOString(),
    unreadCount: 0,
    isAgentActive: false,
    sockets: new Set(),
  };

  leads.set(params.leadId, lead);
  return { lead, isNew: true };
}

function registerLeadSocket(params: {
  socketId: string;
  leadId?: string;
  roomId: string;
  visitorId?: string;
  name?: string;
}) {
  if (!params.leadId) {
    return null;
  }

  const { lead, isNew } = ensureLeadPresence({
    leadId: params.leadId,
    roomId: params.roomId,
    visitorId: params.visitorId,
    name: params.name,
  });

  lead.sockets.add(params.socketId);
  return { lead, isNew };
}

function removeSocketPresence(socketId: string) {
  const presenceRegistry = getPresenceRegistry();
  const leadRegistry = getLeadRegistry();
  const adminRegistry = getAdminRegistry();
  const presence = presenceRegistry.get(socketId);

  if (!presence) {
    return;
  }

  if (presence.leadId) {
    const lead = leadRegistry.get(presence.leadId);

    if (lead) {
      lead.sockets.delete(socketId);

      if (lead.sockets.size === 0) {
        leadRegistry.delete(presence.leadId);
      }
    }
  }

  if (presence.adminId) {
    const admin = adminRegistry.get(presence.adminId);

    if (admin) {
      admin.sockets.delete(socketId);

      if (admin.sockets.size === 0) {
        adminRegistry.delete(presence.adminId);
      }
    }
  }

  presenceRegistry.delete(socketId);
}

function clearLeadPresence(socketId: string, leadId?: string) {
  const presence = getPresenceRegistry().get(socketId);

  if (!presence?.leadId) {
    return;
  }

  if (leadId && presence.leadId !== leadId) {
    return;
  }

  const lead = getLeadRegistry().get(presence.leadId);

  if (lead) {
    lead.sockets.delete(socketId);

    if (lead.sockets.size === 0) {
      getLeadRegistry().delete(presence.leadId);
    }
  }

  delete presence.leadId;
  delete presence.roomId;
}

function publishLeadEvent(io: TypedSocketServer, lead: LeadPresence) {
  io.to(ADMIN_ROOM).emit("new_lead", {
    leadId: lead.leadId,
    visitorId: lead.visitorId,
    name: lead.name,
    timestamp: lead.joinedAt,
  });

  io.to(ADMIN_ROOM).emit("lead_joined", {
    leadId: lead.leadId,
    sessionId: lead.roomId,
    name: lead.name,
  });
}

function updateLeadFromMessage(payload: OutboundMessagePayload) {
  const { lead } = ensureLeadPresence({
    leadId: payload.leadId,
    roomId: payload.sessionId || payload.leadId,
  });

  lead.roomId = payload.sessionId || payload.leadId;
  lead.lastMessage = payload.message;
  lead.lastMessageAt = payload.timestamp;

  if (payload.sender === "user") {
    lead.unreadCount += 1;
  }

  return lead;
}

function emitMessage(io: TypedSocketServer, payload: OutboundMessagePayload) {
  const roomId = payload.sessionId || payload.leadId;

  io.to(roomId).emit("new_message", payload);
  io.to(ADMIN_ROOM).emit("new_message", payload);

  if (payload.sender === "user") {
    io.to(ADMIN_ROOM).emit("user_message", {
      ...payload,
      isNew: true,
    });
  }
}

function emitAgentState(io: TypedSocketServer, payload: AgentJoinPayload) {
  const roomId = payload.sessionId || payload.leadId;
  const lead = getLeadRegistry().get(payload.leadId);

  if (lead) {
    lead.isAgentActive = payload.isActive;
  }

  if (payload.isActive) {
    io.to(roomId).emit("agent_join", payload);
    io.to(ADMIN_ROOM).emit("lead_taken", {
      leadId: payload.leadId,
      adminId: payload.adminId,
      adminName: payload.adminName,
    });
  } else {
    io.to(roomId).emit("agent_leave", payload);
    io.to(ADMIN_ROOM).emit("lead_released", {
      leadId: payload.leadId,
    });
  }

  io.to(roomId).emit("agent_active", {
    leadId: payload.leadId,
    adminId: payload.adminId,
    adminName: payload.adminName,
    isActive: payload.isActive,
    timestamp: new Date().toISOString(),
  });

  emitUsersUpdate(io);
}

function hasAdminSocketAuth(socket: TypedSocket, payloadToken?: string) {
  const authToken =
    (typeof payloadToken === "string" && payloadToken.trim()) ||
    (typeof socket.handshake.auth?.adminToken === "string"
      ? socket.handshake.auth.adminToken.trim()
      : "");

  return authToken.length > 0 && Boolean(verifyAdminToken(authToken));
}

function normalizeJoinPayload(
  payload:
    | { roomId?: string; leadId?: string; visitorId?: string; leadName?: string }
    | { leadId?: string; visitorId?: string; leadName?: string; sessionId?: string }
    | undefined,
) {
  let roomId = "";
  if (payload) {
    if ("roomId" in payload) {
      roomId = payload.roomId || "";
    } else if ("sessionId" in payload) {
      roomId = payload.sessionId || "";
    }
  }
  roomId = roomId || (payload as any)?.leadId || "";
  const leadId = payload?.leadId || undefined;

  return {
    roomId,
    leadId,
    visitorId: payload?.visitorId || leadId,
    leadName: payload?.leadName || "Visitor",
  };
}

export function setSocketServer(io: TypedSocketServer) {
  global.socketServerInstance = io;

  if (!global.socketAdmins) {
    global.socketAdmins = new Map();
  }

  if (!global.socketLeads) {
    global.socketLeads = new Map();
  }

  if (!global.socketPresence) {
    global.socketPresence = new Map();
  }
}

export function getSocketServer() {
  return global.socketServerInstance || null;
}

export function registerSocketHandlers(io: TypedSocketServer) {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", (payload) => {
      const normalized = normalizeJoinPayload(payload);

      if (!normalized.roomId) {
        socket.emit("error", { message: "roomId is required" });
        return;
      }

      const existingPresence = getPresence(socket.id);
      if (existingPresence.roomId && existingPresence.roomId !== normalized.roomId) {
        socket.leave(existingPresence.roomId);
      }

      clearLeadPresence(socket.id);
      socket.join(normalized.roomId);
      const presence = getPresence(socket.id);
      presence.roomId = normalized.roomId;
      presence.leadId = normalized.leadId;

      const leadRegistration = registerLeadSocket({
        socketId: socket.id,
        roomId: normalized.roomId,
        leadId: normalized.leadId,
        visitorId: normalized.visitorId,
        name: normalized.leadName,
      });

      if (leadRegistration?.isNew) {
        publishLeadEvent(io, leadRegistration.lead);
      }

      emitUsersUpdate(io);
    });

    socket.on("join_room", (payload) => {
      const normalized = normalizeJoinPayload(payload);

      if (!normalized.roomId) {
        socket.emit("error", { message: "roomId is required" });
        return;
      }

      const existingPresence = getPresence(socket.id);
      if (existingPresence.roomId && existingPresence.roomId !== normalized.roomId) {
        socket.leave(existingPresence.roomId);
      }

      clearLeadPresence(socket.id);
      socket.join(normalized.roomId);
      const presence = getPresence(socket.id);
      presence.roomId = normalized.roomId;

      if (normalized.leadId) {
        presence.leadId = normalized.leadId;
      }

      const leadRegistration = registerLeadSocket({
        socketId: socket.id,
        roomId: normalized.roomId,
        leadId: normalized.leadId,
        visitorId: normalized.visitorId,
        name: normalized.leadName,
      });

      if (leadRegistration?.isNew) {
        publishLeadEvent(io, leadRegistration.lead);
      }

      emitUsersUpdate(io);
    });

    socket.on("leave_room", (payload) => {
      const normalized = normalizeJoinPayload(payload);

      if (!normalized.roomId) {
        return;
      }

      socket.leave(normalized.roomId);
      clearLeadPresence(socket.id, normalized.leadId);
      emitUsersUpdate(io);
    });

    socket.on("join_admin", ({ adminId, adminName, adminToken }) => {
      if (!adminId) {
        socket.emit("error", { message: "adminId is required" });
        return;
      }

      if (!hasAdminSocketAuth(socket, adminToken)) {
        socket.emit("error", { message: "Unauthorized admin socket connection." });
        socket.disconnect(true);
        return;
      }

      socket.join(ADMIN_ROOM);

      const admins = getAdminRegistry();
      const existing = admins.get(adminId);

      if (existing) {
        existing.sockets.add(socket.id);
        existing.name = adminName || existing.name;
      } else {
        admins.set(adminId, {
          adminId,
          name: adminName || "Admin",
          connectedAt: new Date().toISOString(),
          sockets: new Set([socket.id]),
        });
      }

      const presence = getPresence(socket.id);
      presence.adminId = adminId;

      emitAdminConnected(socket);
      emitUsersUpdate(io);
    });

    socket.on("send_message", (payload) => {
      const leadId = payload.leadId?.trim();
      const roomId = payload.sessionId?.trim() || leadId;
      const message = payload.message?.trim();

      if (!leadId || !roomId || !message) {
        socket.emit("error", { message: "leadId, sessionId, and message are required." });
        return;
      }

      if (message.length > MAX_MESSAGE_LENGTH) {
        socket.emit("error", { message: `Messages must be ${MAX_MESSAGE_LENGTH} characters or less.` });
        return;
      }

      const messageId =
        payload.clientMessageId || `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const resolvedClientMessageId = payload.clientMessageId ?? messageId;

      const outbound: OutboundMessagePayload = {
        id: messageId,
        leadId,
        sessionId: roomId,
        sender: payload.sender,
        message,
        timestamp: new Date().toISOString(),
        clientMessageId: resolvedClientMessageId,
      };

      const lead = updateLeadFromMessage(outbound);
      emitMessage(io, outbound);
      emitUsersUpdate(io);

      socket.emit("message_confirmed", {
        leadId,
        clientMessageId: resolvedClientMessageId,
        messageId,
      });

      if (lead.sockets.size === 0) {
        lead.sockets.add(socket.id);
      }
    });

    socket.on("typing", ({ leadId, isTyping, sender }) => {
      if (!leadId) {
        return;
      }

      const lead = getLeadRegistry().get(leadId);
      const roomId = lead?.roomId || leadId;
      const payload: TypingPayload = { leadId, sender, isTyping };

      socket.to(roomId).emit("typing", payload);
      socket.to(ADMIN_ROOM).emit("typing", payload);

      if (sender === "user") {
        socket.to(ADMIN_ROOM).emit("user_typing", payload);
      }
    });

    socket.on("mark_read", ({ leadId }) => {
      if (!leadId) {
        return;
      }

      const lead = getLeadRegistry().get(leadId);

      if (lead) {
        lead.unreadCount = 0;
      }

      io.to(ADMIN_ROOM).emit("user_read", { leadId });
      emitUsersUpdate(io);
    });

    socket.on("takeover", ({ leadId, adminId, adminName }) => {
      if (!leadId || !adminId) {
        socket.emit("error", { message: "leadId and adminId are required." });
        return;
      }

      const lead = getLeadRegistry().get(leadId);
      const payload: AgentJoinPayload = {
        leadId,
        adminId,
        adminName: adminName || "Admin",
        isActive: true,
        roomId: lead?.roomId || leadId,
        sessionId: lead?.roomId || leadId,
      };

      emitAgentState(io, payload);
    });

    socket.on("return_to_ai", ({ leadId }) => {
      if (!leadId) {
        return;
      }

      const presence = getPresence(socket.id);
      const lead = getLeadRegistry().get(leadId);
      const payload: AgentJoinPayload = {
        leadId,
        adminId: presence.adminId || "",
        adminName: "",
        isActive: false,
        roomId: lead?.roomId || leadId,
        sessionId: lead?.roomId || leadId,
      };

      emitAgentState(io, payload);
    });

    socket.on("ping", () => {
      socket.emit("pong");
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
      removeSocketPresence(socket.id);
      emitUsersUpdate(io);
    });
  });
}

export function emitChatMessage(payload: OutboundMessagePayload) {
  const io = getSocketServer();

  if (!io) {
    return;
  }

  const lead = updateLeadFromMessage(payload);

  if (payload.sender === "user" && lead.sockets.size === 0) {
    publishLeadEvent(io, lead);
  }

  emitMessage(io, payload);
  emitUsersUpdate(io);
}

export function emitTyping(payload: TypingPayload) {
  const io = getSocketServer();

  if (!io || !payload.leadId) {
    return;
  }

  const lead = getLeadRegistry().get(payload.leadId);
  const roomId = lead?.roomId || payload.leadId;

  io.to(roomId).emit("typing", payload);
  io.to(ADMIN_ROOM).emit("typing", payload);

  if (payload.sender === "user") {
    io.to(ADMIN_ROOM).emit("user_typing", payload);
  }
}

export function emitAgentJoin(payload: AgentJoinPayload) {
  const io = getSocketServer();

  if (!io || !payload.leadId) {
    return;
  }

  emitAgentState(io, payload);
}

export function emitNewLead(leadId: string, leadName: string) {
  const io = getSocketServer();

  if (!io) {
    return;
  }

  const { lead } = ensureLeadPresence({
    leadId,
    roomId: leadId,
    name: leadName,
  });

  publishLeadEvent(io, lead);
  emitUsersUpdate(io);
}

export function emitMessageConfirmed(leadId: string, clientMessageId: string, messageId: string) {
  const io = getSocketServer();

  if (!io) {
    return;
  }

  io.to(ADMIN_ROOM).emit("message_confirmed", {
    leadId,
    clientMessageId,
    messageId,
  });
}

export { SOCKET_PATH };
