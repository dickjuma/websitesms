import type { MessageSender } from "@/lib/chat/types";

export const SOCKET_PATH = "/api/socket/io";

// Server to Client Events
export interface ServerToClientEvents {
  // Messages
  new_message: (payload: OutboundMessagePayload) => void;
  message_confirmed: (payload: { leadId: string; clientMessageId: string; messageId: string }) => void;
  
  // Typing
  typing: (payload: TypingStatus) => void;
  
  // Agent activity
  agent_join: (payload: AgentActivity) => void;
  agent_leave: (payload: AgentActivity) => void;
  
  // Lead events
  lead_joined: (payload: { leadId: string; name: string }) => void;
  
  // Heartbeat
  pong: () => void;
  
  // Errors
  error: (payload: { message: string }) => void;
}

// Client to Server Events
export interface ClientToServerEvents {
  // Room management
  join_room: (payload: JoinRoomPayload) => void;
  leave_room: (payload: JoinRoomPayload) => void;
  
  // Admin connection
  admin_join: (payload: { adminId: string; adminName: string }) => void;
  
  // Messages
  send_message: (payload: SendMessagePayload) => void;
  
  // Typing
  typing: (payload: TypingPayload) => void;
  
  // Chat control
  takeover: (payload: { leadId: string; adminId?: string; adminName?: string }) => void;
  return_to_ai: (payload: { leadId: string }) => void;
  
  // Heartbeat
  ping: () => void;
}

// Payload Types
export interface JoinRoomPayload {
  leadId: string;
}

export interface LeaveRoomPayload {
  leadId: string;
}

export interface OutboundMessagePayload {
  id: string;
  leadId: string;
  sessionId: string;
  sender: MessageSender;
  message: string;
  timestamp: string;
  clientMessageId?: string;
}

export interface SendMessagePayload {
  leadId: string;
  sessionId: string;
  sender: MessageSender;
  message: string;
  clientMessageId?: string;
}

export interface TypingPayload {
  leadId: string;
  sender: "user" | "agent" | "bot";
  isTyping: boolean;
}

export interface TypingStatus {
  leadId: string;
  sender: "user" | "agent" | "bot";
  isTyping: boolean;
}

export interface AgentActivity {
  leadId: string;
  adminId: string;
  adminName: string;
  isActive: boolean;
  roomId?: string;
  sessionId?: string;
}

export interface AgentJoinPayload extends AgentActivity {
  message?: OutboundMessagePayload;
}