"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  getSocketClient,
  joinAsAdmin,
  sendChatMessage,
  takeOverChat,
  returnToAi,
  markAsRead,
  type ActiveUser,
} from "@/lib/socket/client";
import type { OutboundMessagePayload, SendMessagePayload } from "@/lib/socket/events";

interface ChatMessage {
  id: string;
  leadId: string;
  sessionId: string;
  sender: "user" | "bot" | "agent";
  message: string;
  timestamp: string;
  clientMessageId?: string;
}

interface LiveLead extends ActiveUser {
  unreadCount: number;
  lastMessage?: string;
  lastMessageAt?: string;
  status: "new" | "contacted" | "closed";
  isHumanActive: boolean;
  email?: string;
  leadId: string;
}

interface UseAdminSocketReturn {
  isConnected: boolean;
  activeLeads: LiveLead[];
  selectedLead: LiveLead | null;
  messages: ChatMessage[];
  typingUsers: Map<string, boolean>;
  selectLead: (leadId: string) => void;
  sendMessage: (message: string) => Promise<void>;
  takeOver: (adminName?: string) => Promise<void>;
  releaseToAi: () => Promise<void>;
}

export function useAdminSocket(adminId: string, adminName: string): UseAdminSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [activeLeads, setActiveLeads] = useState<LiveLead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, boolean>>(new Map());
  const socketRef = useRef<Awaited<ReturnType<typeof getSocketClient>> | null>(null);
  const initializedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const selectedLeadIdRef = useRef<string | null>(null);

  const selectedLead = activeLeads.find(l => l.leadId === selectedLeadId) || null;

  useEffect(() => {
    selectedLeadIdRef.current = selectedLeadId;
  }, [selectedLeadId]);

  useEffect(() => {
    if (initializedRef.current || !adminId) return;
    initializedRef.current = true;

    let isMounted = true;

    (async () => {
      try {
        const socket = await getSocketClient();
        socketRef.current = socket;

        const onConnect = () => {
          if (isMounted) {
            setIsConnected(true);
            void joinAsAdmin({ adminId, adminName });
          }
        };

        const onDisconnect = () => {
          if (isMounted) setIsConnected(false);
        };

        const onUsersUpdate = (users: ActiveUser[]) => {
          if (!isMounted) return;
          setActiveLeads(prev => {
            const userMap = new Map(users.map(u => [u.visitorId, u]));
            return prev.map(lead => {
              const user = userMap.get(lead.visitorId);
              return user
                ? {
                    ...lead,
                    name: user.name,
                    unreadCount: user.unreadCount,
                  }
                : lead;
            });
          });
        };

        const onNewLead = (lead: { leadId: string; visitorId: string; name: string; timestamp: string }) => {
          if (!isMounted) return;
          setActiveLeads(prev => {
            if (prev.some(l => l.leadId === lead.leadId)) return prev;
            return [{
              ...lead,
              socketId: lead.leadId,
              joinedAt: lead.timestamp,
              unreadCount: 0,
              status: "new" as const,
              isHumanActive: false,
              email: "",
              lastMessage: "",
              lastMessageAt: lead.timestamp,
              leadId: lead.leadId,
            }, ...prev];
          });
        };

        const onUserMessage = (payload: OutboundMessagePayload & { isNew: boolean }) => {
          if (!isMounted) return;
          if (payload.leadId === selectedLeadIdRef.current) {
            setMessages(prev => [...prev, {
              id: payload.id,
              leadId: payload.leadId,
              sessionId: payload.sessionId,
              sender: payload.sender,
              message: payload.message,
              timestamp: payload.timestamp,
              clientMessageId: payload.clientMessageId,
            }]);
          }
          if (payload.isNew) {
            setActiveLeads(prev => prev.map(lead =>
              lead.leadId === payload.leadId
                ? { ...lead, unreadCount: lead.unreadCount + 1, lastMessage: payload.message, lastMessageAt: payload.timestamp }
                : lead
            ));
          }
        };

        const onUserTyping = ({ leadId, isTyping }: { leadId: string; isTyping: boolean }) => {
          if (!isMounted) return;
          setTypingUsers(prev => {
            const next = new Map(prev);
            next.set(leadId, isTyping);
            return next;
          });
        };

        const onLeadTaken = ({ leadId }: { leadId: string }) => {
          if (!isMounted) return;
          setActiveLeads(prev => prev.map(lead =>
            lead.leadId === leadId
              ? { ...lead, isHumanActive: true }
              : lead
          ));
        };

        const onLeadReleased = ({ leadId }: { leadId: string }) => {
          if (!isMounted) return;
          setActiveLeads(prev => prev.map(lead =>
            lead.leadId === leadId
              ? { ...lead, isHumanActive: false }
              : lead
          ));
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("users_update", onUsersUpdate);
        socket.on("new_lead", onNewLead);
        socket.on("user_message", onUserMessage);
        socket.on("user_typing", onUserTyping);
        socket.on("lead_taken", onLeadTaken);
        socket.on("lead_released", onLeadReleased);

        if (socket.connected) {
          onConnect();
        }

        return () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
          socket.off("users_update", onUsersUpdate);
          socket.off("new_lead", onNewLead);
          socket.off("user_message", onUserMessage);
          socket.off("user_typing", onUserTyping);
          socket.off("lead_taken", onLeadTaken);
          socket.off("lead_released", onLeadReleased);
        };
      } catch (err) {
        console.error("Failed to initialize admin socket:", err);
      }
      return undefined;
    })().then((dispose) => {
      if (!dispose) {
        return;
      }

      if (!isMounted) {
        dispose();
      } else {
        cleanupRef.current = dispose;
      }
    });

    return () => {
      isMounted = false;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [adminId, adminName]);

  const selectLead = useCallback((leadId: string) => {
    setSelectedLeadId(leadId);
    setMessages([]);
    markAsRead(leadId);
    setActiveLeads(prev => prev.map(l =>
      l.leadId === leadId ? { ...l, unreadCount: 0 } : l
    ));
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!selectedLeadId || !message.trim()) return;
    const payload: SendMessagePayload = {
      leadId: selectedLeadId,
      sessionId: selectedLeadId,
      sender: "agent",
      message: message.trim(),
    };
    await sendChatMessage(payload);
    setMessages(prev => [...prev, {
      id: `pending-${Date.now()}`,
      leadId: selectedLeadId,
      sessionId: selectedLeadId,
      sender: "agent",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    }]);
  }, [selectedLeadId]);

  const takeOver = useCallback(async (adminName?: string) => {
    if (!selectedLeadId) return;
    await takeOverChat({ leadId: selectedLeadId, adminId, adminName });
  }, [selectedLeadId, adminId]);

  const releaseToAi = useCallback(async () => {
    if (!selectedLeadId) return;
    await returnToAi(selectedLeadId);
  }, [selectedLeadId]);

  return {
    isConnected,
    activeLeads,
    selectedLead,
    messages,
    typingUsers,
    selectLead,
    sendMessage,
    takeOver,
    releaseToAi,
  };
}
