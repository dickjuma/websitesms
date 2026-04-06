import type { Server as HTTPServer } from "http";

import type { NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import { Server as SocketIOServer } from "socket.io";

import type {
  AgentJoinPayload,
  ClientToServerEvents,
  OutboundMessagePayload,
  ServerToClientEvents,
  TypingPayload,
} from "@/lib/socket/events";
import { SOCKET_PATH } from "@/lib/socket/events";

type TypedSocketServer = SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents
>;

declare global {
  var socketServerInstance: TypedSocketServer | undefined;
  var adminRooms: Map<string, Set<string>>;
  var leadRooms: Map<string, Set<string>>;
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: TypedSocketServer;
    };
  };
};

export function setSocketServer(io: TypedSocketServer) {
  global.socketServerInstance = io;
  global.adminRooms = new Map();
  global.leadRooms = new Map();
}

export function getSocketServer() {
  return global.socketServerInstance || null;
}

function getAdminRooms() {
  if (!global.adminRooms) {
    global.adminRooms = new Map();
  }
  return global.adminRooms;
}

function getLeadRooms() {
  if (!global.leadRooms) {
    global.leadRooms = new Map();
  }
  return global.leadRooms;
}

export function registerSocketHandlers(io: TypedSocketServer) {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    let currentLeadId: string | null = null;
    let currentAdminId: string | null = null;

    // Join a chat room (for both user and admin)
    socket.on("join_room", ({ leadId }) => {
      if (!leadId) return;
      
      currentLeadId = leadId;
      socket.join(leadId);
      
      // Track lead rooms
      const leadRooms = getLeadRooms();
      if (!leadRooms.has(leadId)) {
        leadRooms.set(leadId, new Set());
      }
      leadRooms.get(leadId)?.add(socket.id);
      
      console.log(`Socket ${socket.id} joined room: ${leadId}`);
    });

    // Leave a chat room
    socket.on("leave_room", ({ leadId }) => {
      if (!leadId) return;
      
      socket.leave(leadId);
      
      // Clean up lead rooms
      const leadRooms = getLeadRooms();
      leadRooms.get(leadId)?.delete(socket.id);
      
      currentLeadId = null;
    });

    // Admin joins the system
    socket.on("admin_join", ({ adminId, adminName }) => {
      if (!adminId) return;
      
      currentAdminId = adminId;
      const adminRooms = getAdminRooms();
      
      if (!adminRooms.has(adminId)) {
        adminRooms.set(adminId, new Set());
      }
      adminRooms.get(adminId)?.add(socket.id);
      
      // Join admin to all active lead rooms for notifications
      const leadRooms = getLeadRooms();
      leadRooms.forEach((sockets, leadId) => {
        if (sockets.size > 0) {
          socket.join(`lead:${leadId}`);
        }
      });
      
      console.log(`Admin ${adminName} (${adminId}) joined`);
    });

    // Send a message
    socket.on(
      "send_message",
      ({ leadId, sessionId, sender, message, clientMessageId }) => {
        if (!leadId || !sessionId || !message?.trim()) {
          return;
        }

        const messageId =
          clientMessageId || `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
        const resolvedClientMessageId = clientMessageId ?? messageId;
        
        const payload: OutboundMessagePayload = {
          id: messageId,
          leadId,
          sessionId,
          sender,
          message: message.trim(),
          timestamp: new Date().toISOString(),
          clientMessageId: resolvedClientMessageId,
        };

        // Send to the specific lead room
        io.to(leadId).emit("new_message", payload);
        
        // Also emit to admin notification room
        io.to(`lead:${leadId}`).emit("new_message", payload);

        // Confirm message to sender
        socket.emit("message_confirmed", {
          leadId,
          clientMessageId: resolvedClientMessageId,
          messageId,
        });

        console.log(`Message sent to lead ${leadId}: ${message.slice(0, 50)}...`);
      }
    );

    // Typing indicator
    socket.on("typing", ({ leadId, sender, isTyping }) => {
      if (!leadId) return;

      // Broadcast to lead room
      socket.to(leadId).emit("typing", {
        leadId,
        sender,
        isTyping,
      });

      // Also notify admin room
      socket.to(`lead:${leadId}`).emit("typing", {
        leadId,
        sender,
        isTyping,
      });
    });

    // Agent takes over a chat
    socket.on("takeover", ({ leadId, adminId, adminName }) => {
      if (!leadId || !adminId) return;

      const payload: AgentJoinPayload = {
        leadId,
        adminId,
        adminName: adminName || "Admin",
        isActive: true,
        roomId: leadId,
        sessionId: leadId,
      };

      // Notify the lead room
      io.to(leadId).emit("agent_join", payload);
      
      // Update admin room
      io.to(`lead:${leadId}`).emit("agent_join", payload);

      console.log(`Admin ${adminName} took over lead ${leadId}`);
    });

    // Return control to AI
    socket.on("return_to_ai", ({ leadId }) => {
      if (!leadId) return;

      const payload: AgentJoinPayload = {
        leadId,
        adminId: currentAdminId || "",
        adminName: "",
        isActive: false,
        roomId: leadId,
        sessionId: leadId,
      };

      // Notify the lead room
      io.to(leadId).emit("agent_leave", payload);
      
      // Update admin room
      io.to(`lead:${leadId}`).emit("agent_leave", payload);

      console.log(`Control returned to AI for lead ${leadId}`);
    });

    // Ping/pong for heartbeat
    socket.on("ping", () => {
      socket.emit("pong");
    });

    // Handle disconnect
    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
      
      // Clean up admin rooms
      if (currentAdminId) {
        const adminRooms = getAdminRooms();
        adminRooms.get(currentAdminId)?.delete(socket.id);
        
        if (adminRooms.get(currentAdminId)?.size === 0) {
          adminRooms.delete(currentAdminId);
        }
      }

      // Clean up lead rooms
      if (currentLeadId) {
        const leadRooms = getLeadRooms();
        leadRooms.get(currentLeadId)?.delete(socket.id);
      }
    });
  });
}

// Emit functions for server-side use
export function emitChatMessage(payload: OutboundMessagePayload) {
  const roomId = payload.sessionId || payload.leadId;
  if (!roomId) return;
  
  const io = getSocketServer();
  if (!io) return;

  io.to(roomId).emit("new_message", payload);
  io.to(`lead:${roomId}`).emit("new_message", payload);
}

export function emitTyping(payload: TypingPayload) {
  const leadId = payload.leadId;
  if (!leadId) return;
  
  const io = getSocketServer();
  if (!io) return;

  io.to(leadId).emit("typing", payload);
  io.to(`lead:${leadId}`).emit("typing", payload);
}

export function emitAgentJoin(payload: AgentJoinPayload) {
  const leadId = payload.leadId;
  if (!leadId) return;
  
  const io = getSocketServer();
  if (!io) return;

  io.to(leadId).emit("agent_join", payload);
  io.to(`lead:${leadId}`).emit("agent_join", payload);
}

export function emitNewLead(leadId: string, leadName: string) {
  const io = getSocketServer();
  if (!io) return;

  // Notify all admins about new lead
  io.emit("lead_joined", { leadId, name: leadName });
}

export function emitMessageConfirmed(leadId: string, clientMessageId: string, messageId: string) {
  const io = getSocketServer();
  if (!io) return;

  // Confirm to the specific socket that sent the message
  io.emit("message_confirmed", { leadId, clientMessageId, messageId });
}

export { SOCKET_PATH };
