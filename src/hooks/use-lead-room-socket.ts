"use client";

import { useEffect, useEffectEvent } from "react";

import type {
  AgentJoinPayload,
  OutboundMessagePayload,
  TypingPayload,
} from "@/lib/socket/events";
import { getSocketClient } from "@/lib/socket/client";

interface UseLeadRoomSocketOptions {
  enabled: boolean;
  roomId?: string | null;
  leadId?: string | null;
  onMessage?: (message: OutboundMessagePayload) => void;
  onTyping?: (payload: TypingPayload) => void;
  onAgentJoin?: (payload: AgentJoinPayload) => void;
}

export function useLeadRoomSocket({
  enabled,
  roomId,
  leadId,
  onMessage,
  onTyping,
  onAgentJoin,
}: UseLeadRoomSocketOptions) {
  const handleMessage = useEffectEvent((message: OutboundMessagePayload) => {
    onMessage?.(message);
  });

  const handleTyping = useEffectEvent((payload: TypingPayload) => {
    onTyping?.(payload);
  });

  const handleAgentJoin = useEffectEvent((payload: AgentJoinPayload) => {
    onAgentJoin?.(payload);
  });

  useEffect(() => {
    if (!enabled || !roomId) {
      return;
    }

    let isMounted = true;
    let unsubscribe: (() => void) | undefined;

    void (async () => {
      const socket = await getSocketClient();

      if (!isMounted) {
        return;
      }

      const joinRoom = () => {
        socket.emit("join_room", { roomId, leadId: leadId || undefined });
      };

      joinRoom();
      socket.on("connect", joinRoom);
      socket.on("new_message", handleMessage);
      socket.on("typing", handleTyping);
      socket.on("agent_join", handleAgentJoin);

      unsubscribe = () => {
        socket.emit("leave_room", { roomId, leadId: leadId || undefined });
        socket.off("connect", joinRoom);
        socket.off("new_message", handleMessage);
        socket.off("typing", handleTyping);
        socket.off("agent_join", handleAgentJoin);
      };
    })();

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [enabled, leadId, roomId]);
}
