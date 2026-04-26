export const SOCKET_PATH = "/api/socket/io";

export function setSocketServer(io: any) {}
export function getSocketServer() { return null; }
export function registerSocketHandlers(io: any) {}
export function emitChatMessage(payload: any) {}
export function emitTyping(payload: any) {}
export function emitAgentJoin(payload: any) {}
export function emitNewLead(leadId: string, leadName: string) {}
export function emitMessageConfirmed(leadId: string, clientMessageId: string, messageId: string) {}