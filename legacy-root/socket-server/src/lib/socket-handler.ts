import { Server as SocketIOServer, type Socket } from "socket.io";

import type {
  ActiveAdmin,
  ActiveUser,
  AgentJoinPayload,
  ClientToServerEvents,
  OutboundMessagePayload,
  ServerToClientEvents,
  TypingPayload,
} from "./events";

type TypedSocketServer = SocketIOServer<ClientToServerEvents, ServerToClientEvents>;
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

const ADMIN_ROOM = "admin:global";
const MAX_MESSAGE_LENGTH = 4000;

const socketAdmins = new Map<string, AdminPresence>();
const socketLeads = new Map<string, LeadPresence>();
const socketPresence = new Map<string, SocketPresence>();

function getAdminRegistry() {
  return socketAdmins;
}

function getLeadRegistry() {
  return socketLeads;
}

function getPresenceRegistry() {
  return socketPresence;
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
}

function updateLeadFromMessage(payload: OutboundMessagePayload) {
  const leads = getLeadRegistry();
  let lead = leads.get(payload.leadId);

  if (!lead) {
    const { lead: newLead } = ensureLeadPresence({
      leadId: payload.leadId,
      roomId: payload.sessionId,
    });
    lead = newLead;
  }

  lead.lastMessage = payload.message;
  lead.lastMessageAt = payload.timestamp;

  return lead;
}

function emitMessage(io: TypedSocketServer, payload: OutboundMessagePayload) {
  const lead = getLeadRegistry().get(payload.leadId);
  const roomId = lead?.roomId || payload.leadId;

  io.to(roomId).emit("receive_message", payload);
  io.to(ADMIN_ROOM).emit("new_message", payload);
}

function emitAgentState(io: TypedSocketServer, payload: AgentJoinPayload) {
  const lead = getLeadRegistry().get(payload.leadId);

  if (payload.isActive) {
    if (lead) {
      lead.isAgentActive = true;
    }

    io.to(payload.roomId || payload.leadId).emit("agent_join", payload);
    io.to("admin:global").emit("agent_active", {
      leadId: payload.leadId,
      adminId: payload.adminId,
      adminName: payload.adminName,
      isActive: true,
      timestamp: new Date().toISOString(),
    });
  } else {
    if (lead) {
      lead.isAgentActive = false;
    }

    io.to(payload.roomId || payload.leadId).emit("agent_leave", payload);
    io.to("admin:global").emit("agent_active", {
      leadId: payload.leadId,
      isActive: false,
      timestamp: new Date().toISOString(),
    });
  }

  emitUsersUpdate(io);
}

function normalizeJoinPayload(payload: any) {
  if (!payload) {
    return { roomId: "", leadId: "", visitorId: "", leadName: "Visitor" };
  }

  const roomId = payload.roomId || payload.sessionId || payload.leadId || payload.userId || "";
  const leadId = payload.leadId || payload.userId || "";
  const visitorId = payload.visitorId || payload.userId || "";
  const leadName = payload.leadName || payload.userName || payload.name || "Visitor";

  return {
    roomId: roomId || leadId,
    leadId: leadId || roomId,
    visitorId: visitorId || leadId,
    leadName,
  };
}

function hasAdminSocketAuth(socket: TypedSocket, token?: string) {
  return true;
}

export function registerSocketHandlers(io: TypedSocketServer) {
  io.on("connection", (socket: TypedSocket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", (payload: any) => {
      // Support multiple field names from clients
      const leadId = payload?.leadId || payload?.userId || payload?.visitorId || "";
      const roomId = payload?.roomId || payload?.sessionId || payload?.leadId || "";
      const visitorId = payload?.visitorId || payload?.userId || "";
      const leadName = payload?.leadName || payload?.userName || payload?.name || "Visitor";

      if (!leadId || !roomId) {
        socket.emit("error", { message: "leadId and roomId are required" });
        return;
      }

      socket.join(roomId);

      const registration = registerLeadSocket({
        socketId: socket.id,
        leadId,
        roomId,
        visitorId,
        name: leadName,
      });

      const presence = getPresence(socket.id);
      presence.leadId = leadId;
      presence.roomId = roomId;

      if (registration?.isNew) {
        publishLeadEvent(io, registration.lead);
      }

      emitUsersUpdate(io);
    });

    socket.on("join_room", (payload) => {
      const normalized = normalizeJoinPayload(payload);

      if (!normalized.roomId) {
        socket.emit("error", { message: "roomId is required" });
        return;
      }

      socket.join(normalized.roomId);

      if (normalized.leadId) {
        const registration = registerLeadSocket({
          socketId: socket.id,
          leadId: normalized.leadId,
          roomId: normalized.roomId,
          visitorId: normalized.visitorId,
          name: normalized.leadName,
        });

        const presence = getPresence(socket.id);
        presence.leadId = normalized.leadId;
        presence.roomId = normalized.roomId;

        if (registration?.isNew) {
          publishLeadEvent(io, registration.lead);
        }
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

    socket.on("send_message", (payload: any) => {
      // Support multiple field names
      const leadId = payload?.leadId?.trim() || payload?.userId?.trim() || "";
      const roomId = payload?.sessionId?.trim() || payload?.roomId?.trim() || payload?.leadId?.trim() || leadId;
      const message = payload?.message?.trim();

      if (!leadId || !roomId || !message) {
        socket.emit("error", { message: "leadId/userId, sessionId/roomId, and message are required." });
        return;
      }

      if (message.length > MAX_MESSAGE_LENGTH) {
        socket.emit("error", { message: `Messages must be ${MAX_MESSAGE_LENGTH} characters or less.` });
        return;
      }

      const messageId =
        payload.clientMessageId || `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const resolvedClientMessageId = payload.clientMessageId ?? messageId;
      const sender = payload.sender || "user";

      const outbound: OutboundMessagePayload = {
        id: messageId,
        leadId,
        sessionId: roomId,
        sender: sender,
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