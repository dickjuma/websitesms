export interface RealtimeSocketClient {
  connected: boolean;
  connect(): void;
  disconnect(): void;
  emit(event: string, ...args: any[]): void;
  on(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
}

// Stub - no more socket.io
export const getSocketClient = async (): Promise<RealtimeSocketClient | null> => null;
export const ensureSocketBootstrap = async () => {};

// Stub exports for use-admin-socket
export const joinAsAdmin = async (params: { adminId: string; adminName: string }) => {
  console.log("Socket stub: joinAsAdmin", params);
};

export const sendChatMessage = async (payload: any) => {
  console.log("Socket stub: sendChatMessage", payload);
};

export const takeOverChat = async (params: { leadId: string; adminId: string; adminName?: string }) => {
  console.log("Socket stub: takeOverChat", params);
};

export const returnToAi = async (leadId: string) => {
  console.log("Socket stub: returnToAi", leadId);
};

export const markAsRead = (leadId: string) => {
  console.log("Socket stub: markAsRead", leadId);
};

export interface ActiveUser {
  visitorId: string;
  name: string;
  unreadCount: number;
  joinedAt: string;
  socketId: string;
}
