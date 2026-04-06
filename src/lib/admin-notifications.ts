import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  leadId?: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    href: string;
  };
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  soundEnabled: boolean;
  
  // Actions
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  setSoundEnabled: (enabled: boolean) => void;
}

let notificationId = 0;

const createNotificationId = () => `notif-${Date.now()}-${++notificationId}`;

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      soundEnabled: true,

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: createNotificationId(),
          timestamp: new Date(),
          read: false,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
          unreadCount: state.unreadCount + 1,
        }));

        // Play sound if enabled
        if (get().soundEnabled) {
          playNotificationSound();
        }
      },

      markAsRead: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          if (!notification || notification.read) return state;

          return {
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },

      removeNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: notification && !notification.read
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      setSoundEnabled: (enabled) => {
        set({ soundEnabled: enabled });
      },
    }),
    { name: "Notifications" }
  )
);

// Audio notification sound
function playNotificationSound() {
  try {
    const audio = new Audio("/sounds/notification.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Silent fail if audio can't play
    });
  } catch {
    // Silent fail
  }
}

// Helper functions for specific notification types
export const notifyNewMessage = (leadId: string, leadName: string, message: string) => {
  useNotificationStore.getState().addNotification({
    type: "info",
    title: "New Message",
    message: `${leadName}: ${message.slice(0, 50)}${message.length > 50 ? "..." : ""}`,
    leadId,
    action: {
      label: "View Chat",
      href: `/admin/chat/${leadId}`,
    },
  });
};

export const notifyNewLead = (leadId: string, leadName: string) => {
  useNotificationStore.getState().addNotification({
    type: "success",
    title: "New Lead",
    message: `${leadName} started a conversation`,
    leadId,
    action: {
      label: "View Lead",
      href: `/admin/chat/${leadId}`,
    },
  });
};

export const notifyChatTakeover = (leadId: string, leadName: string, agentName: string) => {
  useNotificationStore.getState().addNotification({
    type: "info",
    title: "Chat Taken Over",
    message: `${agentName} took over chat with ${leadName}`,
    leadId,
    action: {
      label: "View Chat",
      href: `/admin/chat/${leadId}`,
    },
  });
};

export const notifyHotLead = (leadId: string, leadName: string, score: number) => {
  useNotificationStore.getState().addNotification({
    type: "warning",
    title: "Hot Lead Alert",
    message: `${leadName} is a hot lead (score: ${score})`,
    leadId,
    action: {
      label: "View Lead",
      href: `/admin/leads`,
    },
  });
};