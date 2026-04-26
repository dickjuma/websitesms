"use client";

import { useCallback, useRef } from "react";

import { notifyChatTakeover, notifyNewMessage } from "@/lib/admin-notifications";
import {
  useRealtimeStore,
  useRoomMessages,
  type AgentActivity,
  type RealtimeMessage,
  type TypingStatus,
} from "@/lib/realtime-store";

interface UseRealtimeChatOptions {
  enabled?: boolean;
  adminId?: string;
  adminName?: string;
  onMessage?: (message: RealtimeMessage) => void;
  onTyping?: (status: TypingStatus) => void;
  onAgentJoin?: (activity: AgentActivity) => void;
  onAgentLeave?: (activity: AgentActivity) => void;
  onNewLead?: (leadId: string, leadName: string) => void;
}

export function useRealtimeChat(options: UseRealtimeChatOptions = {}) {
  const { enabled = true } = options;

  const {
    isConnected,
    isConnecting,
    setConnected,
    setConnecting,
  } = useRealtimeStore();

  const sendMessage = useCallback(
    (_leadId: string, _message: string): string => {
      return "";
    },
    [],
  );

  const sendTyping = useCallback((_leadId: string, _isTyping: boolean) => {}, []);

  const joinRoom = useCallback((_leadId: string) => {}, []);

  const leaveRoom = useCallback((_leadId: string) => {}, []);

  const takeOverChat = useCallback((_leadId: string) => {}, []);

  const returnToAI = useCallback((_leadId: string) => {}, []);

  const disconnect = useCallback(() => {}, []);

  const reconnect = useCallback(() => {}, []);

  return {
    isConnected: enabled ? false : isConnected,
    isConnecting: false,
    sendMessage,
    sendTyping,
    joinRoom,
    leaveRoom,
    takeOverChat,
    returnToAI,
    disconnect,
    reconnect,
  };
}

export function useChatRoom(leadId: string) {
  const messages = useRoomMessages(leadId);
  const { sendMessage, sendTyping, takeOverChat, returnToAI, isConnected } =
    useRealtimeChat();

  return {
    messages,
    sendMessage: (message: string) => sendMessage(leadId, message),
    sendTyping: (isTyping: boolean) => sendTyping(leadId, isTyping),
    takeOverChat: () => takeOverChat(leadId),
    returnToAI: () => returnToAI(leadId),
    isConnected,
  };
}