export const SOCKET_PATH = "/api/socket/io";

export type MessageSender = "user" | "admin" | "bot" | "agent";

export interface ServerToClientEvents {
  receive_message: (payload: OutboundMessagePayload) => void;
  new_message: (payload: OutboundMessagePayload) => void;
  message_confirmed: (payload: { leadId: string; clientMessageId: string; messageId: string }) => void;
  message_sent: (payload: { success: boolean; leadId: string; clientMessageId?: string; messageId: string }) => void;
  chat_history: (payload: { userId: string; messages: OutboundMessagePayload[] }) => void;
  
  user_message: (payload: OutboundMessagePayload & { isNew: boolean }) => void;
  users_update: (payload: ActiveUser[]) => void;
  new_lead: (payload: { leadId: string; visitorId: string; name: string; timestamp: string }) => void;
  new_user: (payload: ActiveUser & { timestamp: string }) => void;
  user_offline: (payload: { userId: string }) => void;
  lead_joined: (payload: { leadId: string; sessionId: string; name: string }) => void;
  
  typing: (payload: TypingStatus) => void;
  user_typing: (payload: TypingStatus) => void;
  message_status: (payload: { status: string; messageIds: string[] }) => void;
  rate_limited: (payload: { message: string }) => void;
  
  agent_active: (payload: AgentActivePayload) => void;
  agent_join: (payload: AgentActivity) => void;
  agent_leave: (payload: AgentActivity) => void;
  
  admin_connected: (payload: { admins: ActiveAdmin[]; users: ActiveUser[] }) => void;
  lead_taken: (payload: { leadId: string; adminId: string; adminName: string }) => void;
  lead_released: (payload: { leadId: string }) => void;
  user_read: (payload: { leadId: string }) => void;
  
  pong: () => void;
  
  error: (payload: { message: string }) => void;
}

export interface ClientToServerEvents {
  join: (payload: { leadId: string; visitorId?: string; leadName?: string }) => void;
  join_admin: (payload: { adminId: string; adminName: string; adminToken?: string }) => void;
  join_room: (payload: JoinRoomPayload) => void;
  leave_room: (payload: LeaveRoomPayload) => void;
  send_message: (payload: SendMessagePayload) => void;
  typing: (payload: TypingPayload) => void;
  takeover: (payload: { leadId: string; adminId?: string; adminName?: string }) => void;
  return_to_ai: (payload: { leadId: string }) => void;
  mark_read: (payload: { leadId: string }) => void;
  ping: () => void;
}

export interface ActiveUser {
  socketId: string;
  visitorId: string;
  name: string;
  joinedAt: string;
  unreadCount: number;
}

export interface ActiveAdmin {
  socketId: string;
  name: string;
  connectedAt: string;
}

export interface JoinRoomPayload {
  roomId: string;
  leadId?: string;
}

export interface LeaveRoomPayload {
  roomId: string;
  leadId?: string;
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

export interface AgentActivePayload {
  leadId: string;
  adminId?: string;
  adminName?: string;
  isActive: boolean;
  timestamp: string;
}

export interface AgentJoinPayload extends AgentActivity {
  message?: OutboundMessagePayload;
}