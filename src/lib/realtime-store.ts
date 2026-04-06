import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

export interface ChatRoom {
  id: string;
  leadId: string;
  leadName: string;
  lastMessage: string;
  lastMessageAt: string;
  isActive: boolean;
  unreadCount: number;
  isAgentActive: boolean;
}

export interface RealtimeMessage {
  id: string;
  leadId: string;
  sessionId: string;
  sender: "user" | "bot" | "agent";
  message: string;
  timestamp: string;
  clientMessageId?: string;
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
}

interface RealtimeState {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  lastError: string | null;
  reconnectAttempts: number;
  
  // Active rooms
  activeRooms: Map<string, ChatRoom>;
  
  // Real-time data
  realtimeMessages: Map<string, RealtimeMessage[]>;
  typingStatus: Map<string, TypingStatus>;
  agentActivity: Map<string, AgentActivity>;
  
  // Actions
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
  incrementReconnect: () => void;
  resetReconnect: () => void;
  
  // Room management
  addRoom: (room: ChatRoom) => void;
  updateRoom: (roomId: string, updates: Partial<ChatRoom>) => void;
  removeRoom: (roomId: string) => void;
  setUnreadCount: (roomId: string, count: number) => void;
  incrementUnread: (roomId: string) => void;
  clearUnread: (roomId: string) => void;
  
  // Messages
  setRoomMessages: (roomId: string, messages: RealtimeMessage[]) => void;
  addRealtimeMessage: (roomId: string, message: RealtimeMessage) => void;
  addPendingMessage: (roomId: string, message: RealtimeMessage) => void;
  confirmMessage: (roomId: string, clientId: string, realId: string) => void;
  removePendingMessage: (roomId: string, clientId: string) => void;
  
  // Typing
  setTyping: (status: TypingStatus) => void;
  
  // Agent activity
  setAgentActivity: (activity: AgentActivity) => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  isConnected: false,
  isConnecting: false,
  lastError: null,
  reconnectAttempts: 0,
  activeRooms: new Map<string, ChatRoom>(),
  realtimeMessages: new Map<string, RealtimeMessage[]>(),
  typingStatus: new Map<string, TypingStatus>(),
  agentActivity: new Map<string, AgentActivity>(),
};

const EMPTY_MESSAGES: RealtimeMessage[] = [];
const MAX_ROOM_MESSAGES = 150;

function withOptionalDevtools<T>(store: T, name: string): T {
  if (process.env.NODE_ENV === "development") {
    return devtools(store as never, { name }) as T;
  }

  return store;
}

function trimRoomMessages(messages: RealtimeMessage[]) {
  if (messages.length <= MAX_ROOM_MESSAGES) {
    return messages;
  }

  return messages.slice(-MAX_ROOM_MESSAGES);
}

export const useRealtimeStore = create<RealtimeState>()(
  withOptionalDevtools(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      setConnected: (connected) => set({ isConnected: connected }),
      setConnecting: (connecting) => set({ isConnecting: connecting }),
      setError: (error) => set({ lastError: error }),
      incrementReconnect: () => set((state) => ({ reconnectAttempts: state.reconnectAttempts + 1 })),
      resetReconnect: () => set({ reconnectAttempts: 0 }),

      addRoom: (room) =>
        set((state) => {
          const rooms = new Map(state.activeRooms);
          rooms.set(room.id, room);
          return { activeRooms: rooms };
        }),

      updateRoom: (roomId, updates) =>
        set((state) => {
          const rooms = new Map(state.activeRooms);
          const existing = rooms.get(roomId);
          if (existing) {
            rooms.set(roomId, { ...existing, ...updates });
          }
          return { activeRooms: rooms };
        }),

      removeRoom: (roomId) =>
        set((state) => {
          const rooms = new Map(state.activeRooms);
          const messages = new Map(state.realtimeMessages);
          const typing = new Map(state.typingStatus);
          const agents = new Map(state.agentActivity);
          
          rooms.delete(roomId);
          messages.delete(roomId);
          typing.delete(roomId);
          agents.delete(roomId);
          
          return {
            activeRooms: rooms,
            realtimeMessages: messages,
            typingStatus: typing,
            agentActivity: agents,
          };
        }),

      setUnreadCount: (roomId, count) =>
        set((state) => {
          const rooms = new Map(state.activeRooms);
          const room = rooms.get(roomId);
          if (room) {
            rooms.set(roomId, { ...room, unreadCount: count });
          }
          return { activeRooms: rooms };
        }),

      incrementUnread: (roomId) =>
        set((state) => {
          const rooms = new Map(state.activeRooms);
          const room = rooms.get(roomId);
          if (room) {
            rooms.set(roomId, { ...room, unreadCount: room.unreadCount + 1 });
          }
          return { activeRooms: rooms };
        }),

      clearUnread: (roomId) =>
        set((state) => {
          const rooms = new Map(state.activeRooms);
          const room = rooms.get(roomId);
          if (room) {
            rooms.set(roomId, { ...room, unreadCount: 0 });
          }
          return { activeRooms: rooms };
        }),

      setRoomMessages: (roomId, roomMessages) =>
        set((state) => {
          const messages = new Map(state.realtimeMessages);
          messages.set(roomId, trimRoomMessages(roomMessages));
          return { realtimeMessages: messages };
        }),

      addRealtimeMessage: (roomId, message) =>
        set((state) => {
          const messages = new Map(state.realtimeMessages);
          const roomMessages = messages.get(roomId) || [];
          let rooms = new Map(state.activeRooms);
          
          // Check for duplicate
          const exists = roomMessages.some(
            (m) => m.id === message.id || m.clientMessageId === message.clientMessageId
          );
          
          if (!exists) {
            messages.set(roomId, trimRoomMessages([...roomMessages, message]));
            
            // Update room last message
            const room = rooms.get(roomId);
            if (room) {
              rooms.set(roomId, {
                ...room,
                lastMessage: message.message,
                lastMessageAt: message.timestamp,
              });
            }
          }
          
          return {
            realtimeMessages: messages,
            activeRooms: rooms,
          };
        }),

      addPendingMessage: (roomId, message) =>
        set((state) => {
          const messages = new Map(state.realtimeMessages);
          const roomMessages = messages.get(roomId) || [];
          
          // Add with pending indicator
          const pendingMessage = { ...message, id: `pending-${message.clientMessageId}` };
          messages.set(roomId, trimRoomMessages([...roomMessages, pendingMessage]));
          
          return { realtimeMessages: messages };
        }),

      confirmMessage: (roomId, clientId, realId) =>
        set((state) => {
          const messages = new Map(state.realtimeMessages);
          const roomMessages = messages.get(roomId);
          
          if (roomMessages) {
            const updated = roomMessages.map((m) =>
              m.clientMessageId === clientId ? { ...m, id: realId } : m
            );
            messages.set(roomId, updated);
          }
          
          return { realtimeMessages: messages };
        }),

      removePendingMessage: (roomId, clientId) =>
        set((state) => {
          const messages = new Map(state.realtimeMessages);
          const roomMessages = messages.get(roomId);
          
          if (roomMessages) {
            const updated = roomMessages.filter(
              (m) => m.clientMessageId !== clientId
            );
            messages.set(roomId, updated);
          }
          
          return { realtimeMessages: messages };
        }),

      setTyping: (status) =>
        set((state) => {
          const typing = new Map(state.typingStatus);
          typing.set(status.leadId, status);
          return { typingStatus: typing };
        }),

      setAgentActivity: (activity) =>
        set((state) => {
          const agents = new Map(state.agentActivity);
          agents.set(activity.leadId, activity);
          
          // Update room
          const rooms = new Map(state.activeRooms);
          const room = rooms.get(activity.leadId);
          if (room) {
            rooms.set(activity.leadId, { ...room, isAgentActive: activity.isActive });
          }
          
          return {
            agentActivity: agents,
            activeRooms: rooms,
          };
        }),

      reset: () => set(initialState),
    })),
    "Realtime"
  )
);

// Selector for getting room messages
export const useRoomMessages = (roomId: string) =>
  useRealtimeStore((state) => state.realtimeMessages.get(roomId) ?? EMPTY_MESSAGES);

// Selector for getting typing status
export const useTypingStatus = (leadId: string) =>
  useRealtimeStore((state) => state.typingStatus.get(leadId));

// Selector for getting agent activity
export const useAgentActivity = (leadId: string) =>
  useRealtimeStore((state) => state.agentActivity.get(leadId));
