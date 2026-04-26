export interface RealtimeSocketClient {
  connected: boolean;
  connect(): void;
  disconnect(): void;
  emit(event: string, ...args: any[]): void;
  on(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
}

export const getSocketClient = async (): Promise<RealtimeSocketClient | null> => {
  return null;
};

export const ensureSocketBootstrap = async () => {};

export const joinAsAdmin = async () => {};
export const sendChatMessage = async () => {};
export const joinChatRoom = async () => {};
export const leaveChatRoom = async () => {};
export const sendTyping = async () => {};
export const takeOverChat = async () => {};
export const returnToAi = async () => {};
export const markAsRead = (leadId: string) => {};

export interface OutboundMessagePayload {
  roomId: string;
  message: string;
  leadId: string;
}

export interface TypingPayload {
  roomId: string;
  leadId: string;
  isTyping: boolean;
}

export interface ActiveAdmin {
  id: string;
  name: string;
}