export type LeadQualification = "HOT" | "WARM" | "COLD";
export type LeadStatus = "new" | "contacted" | "closed";
export type MessageSender = "user" | "bot" | "agent";
export type ChatSessionStatus = "active" | "closed";

export interface LeadInput {
  name?: string;
  email?: string;
  phone?: string;
  businessNeed?: string;
  qualification?: LeadQualification;
  status?: LeadStatus;
}

export interface LeadDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessNeed: string;
  qualification: LeadQualification;
  leadScore: number;
  isHumanActive: boolean;
  status: LeadStatus;
  visitorId: string;
  currentSessionId: string;
  sessionCount: number;
  aiSummary: string;
  lastActivityAt: string;
  pagesVisited: Array<{
    path: string;
    title: string;
    visitedAt: string;
    timeSpent: number;
  }>;
  activityTimeline: Array<{
    action: string;
    detail: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
  }>;
  chatDepth: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatSessionDto {
  id: string;
  leadId: string;
  visitorId: string;
  status: ChatSessionStatus;
  title: string;
  aiSummary: string;
  messageCount: number;
  startedAt: string;
  lastActivityAt: string;
  lastMessageAt: string;
  lastMessagePreview: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageDto {
  id: string;
  leadId: string;
  sessionId: string;
  sender: MessageSender;
  message: string;
  timestamp: string;
  clientMessageId?: string;
}

export interface ChatbotResponseDto {
  lead: LeadDto;
  session: ChatSessionDto;
  sessions: ChatSessionDto[];
  messages: MessageDto[];
  reply: MessageDto | null;
  waitingForAgent: boolean;
  agentSuggestions?: string[];
}
