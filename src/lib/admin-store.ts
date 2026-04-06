import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

function withOptionalDevtools<T>(
  initializer: StateCreator<T, any, any>,
  name: string,
): StateCreator<T, any, any> {
  if (process.env.NODE_ENV === "development") {
    return devtools(initializer, { name }) as unknown as StateCreator<T, any, any>;
  }

  return initializer;
}

// Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessNeed: string;
  qualification: "HOT" | "WARM" | "COLD";
  leadScore: number;
  isHumanActive: boolean;
  status: "new" | "contacted" | "qualified" | "converted" | "closed";
  visitorId: string;
  currentSessionId: string | null;
  sessionCount: number;
  lastMessage: string;
  lastMessageAt: string;
  createdAt: string;
}

export interface Message {
  id: string;
  leadId: string;
  sessionId: string;
  sender: "user" | "bot" | "agent";
  message: string;
  timestamp: string;
  clientMessageId?: string;
}

export interface ChatSession {
  id: string;
  leadId: string;
  visitorId: string;
  title: string;
  status: "active" | "paused" | "closed";
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  isHumanActive: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "agent";
  status: "active" | "inactive";
  lastActiveAt: string | null;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Visitor {
  id: string;
  visitorId: string;
  ipAddress: string | null;
  deviceType: "desktop" | "tablet" | "mobile";
  timezone: string | null;
  visitCount: number;
  lastSeenAt: string;
  pagesVisited: Array<{
    path: string;
    title: string;
    visitedAt: string;
  }>;
}

export interface AdminAuth {
  isAuthenticated: boolean;
  adminId: string | null;
  adminEmail: string | null;
  adminName: string | null;
}

// Admin Auth Store
interface AdminAuthStore {
  auth: AdminAuth;
  setAuth: (auth: AdminAuth) => void;
  clearAuth: () => void;
}

export const useAdminAuthStore = create<AdminAuthStore>()(
  withOptionalDevtools(
    persist(
      (set) => ({
        auth: {
          isAuthenticated: false,
          adminId: null,
          adminEmail: null,
          adminName: null,
        },
        setAuth: (auth) => set({ auth }),
        clearAuth: () =>
          set({
            auth: {
              isAuthenticated: false,
              adminId: null,
              adminEmail: null,
              adminName: null,
            },
          }),
      }),
      { name: "admin-auth" }
    ),
    "AdminAuth"
  )
);

// Chat Store - Modular loading
interface ChatStore {
  // Active chat session
  activeLeadId: string | null;
  activeSession: ChatSession | null;
  messages: Message[];
  isLoadingMessages: boolean;
  isSending: boolean;
  isAgentActive: boolean;
  isAIGenerating: boolean;
  
  // Actions
  setActiveLead: (leadId: string | null) => void;
  setActiveSession: (session: ChatSession | null) => void;
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  setLoadingMessages: (loading: boolean) => void;
  setSending: (sending: boolean) => void;
  setAgentActive: (active: boolean) => void;
  setAIGenerating: (generating: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  withOptionalDevtools(
    (set, get) => ({
      activeLeadId: null,
      activeSession: null,
      messages: [],
      isLoadingMessages: false,
      isSending: false,
      isAgentActive: false,
      isAIGenerating: false,

      setActiveLead: (leadId) => set({ activeLeadId: leadId, messages: [] }),
      setActiveSession: (session) => set({ activeSession: session }),
      setMessages: (messages) => set((state) => ({ 
        messages: typeof messages === 'function' ? messages(state.messages) : messages 
      })),
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      updateMessage: (id, updates) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),
      setLoadingMessages: (loading) => set({ isLoadingMessages: loading }),
      setSending: (sending) => set({ isSending: sending }),
      setAgentActive: (active) => set({ isAgentActive: active }),
      setAIGenerating: (generating) => set({ isAIGenerating: generating }),
      clearChat: () =>
        set({
          activeLeadId: null,
          activeSession: null,
          messages: [],
          isAgentActive: false,
        }),
    }),
    "Chat"
  )
);

// Leads Store
interface LeadsStore {
  leads: Lead[];
  isLoading: boolean;
  totalCount: number;
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  setLoading: (loading: boolean) => void;
  setTotalCount: (count: number) => void;
}

export const useLeadsStore = create<LeadsStore>()(
  withOptionalDevtools(
    (set) => ({
      leads: [],
      isLoading: false,
      totalCount: 0,
      setLeads: (leads) => set({ leads }),
      addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
      updateLead: (id, updates) =>
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        })),
      setLoading: (loading) => set({ isLoading: loading }),
      setTotalCount: (count) => set({ totalCount: count }),
    }),
    "Leads"
  )
);

// Team Store
interface TeamStore {
  members: TeamMember[];
  isLoading: boolean;
  setMembers: (members: TeamMember[]) => void;
  addMember: (member: TeamMember) => void;
  updateMember: (id: string, updates: Partial<TeamMember>) => void;
  removeMember: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useTeamStore = create<TeamStore>()(
  withOptionalDevtools(
    (set) => ({
      members: [],
      isLoading: false,
      setMembers: (members) => set({ members }),
      addMember: (member) =>
        set((state) => ({ members: [...state.members, member] })),
      updateMember: (id, updates) =>
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),
      removeMember: (id) =>
        set((state) => ({ members: state.members.filter((m) => m.id !== id) })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    "Team"
  )
);

// Contacts Store
interface ContactsStore {
  contacts: Contact[];
  isLoading: boolean;
  totalCount: number;
  page: number;
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Contact) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  setLoading: (loading: boolean) => void;
  setTotalCount: (count: number) => void;
  setPage: (page: number) => void;
}

export const useContactsStore = create<ContactsStore>()(
  withOptionalDevtools(
    (set) => ({
      contacts: [],
      isLoading: false,
      totalCount: 0,
      page: 1,
      setContacts: (contacts) => set({ contacts }),
      addContact: (contact) =>
        set((state) => ({ contacts: [...state.contacts, contact] })),
      updateContact: (id, updates) =>
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
      setLoading: (loading) => set({ isLoading: loading }),
      setTotalCount: (count) => set({ totalCount: count }),
      setPage: (page) => set({ page }),
    }),
    "Contacts"
  )
);

// Visitors Store
interface VisitorsStore {
  visitors: Visitor[];
  isLoading: boolean;
  totalCount: number;
  setVisitors: (visitors: Visitor[]) => void;
  setLoading: (loading: boolean) => void;
  setTotalCount: (count: number) => void;
}

export const useVisitorsStore = create<VisitorsStore>()(
  withOptionalDevtools(
    (set) => ({
      visitors: [],
      isLoading: false,
      totalCount: 0,
      setVisitors: (visitors) => set({ visitors }),
      setLoading: (loading) => set({ isLoading: loading }),
      setTotalCount: (count) => set({ totalCount: count }),
    }),
    "Visitors"
  )
);

// Analytics Store
interface AnalyticsStore {
  data: {
    totalLeads: number;
    hotLeads: number;
    totalChats: number;
    activeChats: number;
    conversionRate: number;
    avgLeadScore: number;
    dailyLeads: Array<{ date: string; count: number }>;
    dailyChats: Array<{ date: string; count: number }>;
  } | null;
  period: "7d" | "30d" | "90d";
  isLoading: boolean;
  setData: (data: AnalyticsStore["data"]) => void;
  setPeriod: (period: "7d" | "30d" | "90d") => void;
  setLoading: (loading: boolean) => void;
}

export const useAnalyticsStore = create<AnalyticsStore>()(
  withOptionalDevtools(
    (set) => ({
      data: null,
      period: "7d",
      isLoading: false,
      setData: (data) => set({ data }),
      setPeriod: (period) => set({ period }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    "Analytics"
  )
);

// UI Store - for global UI state
interface UIStore {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  toasts: Array<{ id: string; message: string; type: "success" | "error" | "info" }>;
  toggleSidebar: () => void;
  setActiveModal: (modal: string | null) => void;
  addToast: (message: string, type: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>()(
  withOptionalDevtools(
    (set) => ({
      sidebarCollapsed: false,
      activeModal: null,
      toasts: [],
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setActiveModal: (modal) => set({ activeModal: modal }),
      addToast: (message, type) =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { id: `toast-${Date.now()}`, message, type },
          ],
        })),
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
    }),
    "UI"
  )
);
