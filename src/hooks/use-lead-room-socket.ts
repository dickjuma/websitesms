"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseLeadRoomSocketOptions {
  enabled: boolean;
  roomId?: string | null;
  leadId?: string | null;
  onMessage?: (message: any) => void;
  onTyping?: (payload: { leadId: string; isTyping: boolean }) => void;
  onAgentJoin?: (payload: { leadId: string; adminId: string; adminName: string; isActive: boolean }) => void;
}

export function useLeadRoomSocket({
  enabled,
  roomId,
  leadId,
  onMessage,
  onTyping,
  onAgentJoin,
}: UseLeadRoomSocketOptions) {
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastMessageIdRef = useRef<string>("");

  const pollMessages = useCallback(async () => {
    if (!roomId || !enabled) return;

    try {
      const res = await fetch(`/api/chat/session?sessionId=${roomId}`, {
        cache: "no-store",
      });
      
      if (!res.ok) return;
      
      const data = await res.json();
      
      if (data.messages && data.messages.length > 0) {
        const latestMessage = data.messages[data.messages.length - 1];
        
        // Only trigger onMessage if there's a new message
        if (latestMessage.id !== lastMessageIdRef.current) {
          lastMessageIdRef.current = latestMessage.id;
          onMessage?.(latestMessage);
        }
      }
      
      // Check for agent takeover
      if (data.lead?.isHumanActive) {
        onAgentJoin?.({
          leadId: data.lead.id,
          adminId: "admin",
          adminName: "Admin",
          isActive: true,
        });
      }
    } catch (err) {
      console.error("Failed to poll messages:", err);
    }
  }, [roomId, enabled, onMessage, onAgentJoin]);

  useEffect(() => {
    if (!enabled || !roomId) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      return;
    }

    // Initial poll
    pollMessages();

    // Poll every 3 seconds
    pollIntervalRef.current = setInterval(pollMessages, 3000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [enabled, roomId, pollMessages]);
}