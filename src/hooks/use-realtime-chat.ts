"use client";

import { useCallback, useEffect, useEffectEvent, useRef } from "react";

import { notifyChatTakeover, notifyNewMessage } from "@/lib/admin-notifications";
import {
  useRealtimeStore,
  useRoomMessages,
  type AgentActivity,
  type RealtimeMessage,
  type TypingStatus,
} from "@/lib/realtime-store";
import { getSocketClient } from "@/lib/socket/client";

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
  const {
    enabled = true,
    adminId,
    adminName,
    onMessage,
    onTyping,
    onAgentJoin,
    onAgentLeave,
    onNewLead,
  } = options;

  const socketRef = useRef<Awaited<ReturnType<typeof getSocketClient>> | null>(null);

  const {
    isConnected,
    isConnecting,
    setConnected,
    setConnecting,
    setError,
    resetReconnect,
    addRoom,
    addRealtimeMessage,
    addPendingMessage,
    confirmMessage,
    setTyping,
    setAgentActivity,
  } = useRealtimeStore();

  const handleNewMessage = useEffectEvent((message: RealtimeMessage) => {
    addRealtimeMessage(message.leadId, message);

    addRoom({
      id: message.leadId,
      leadId: message.leadId,
      leadName: "Visitor",
      lastMessage: message.message,
      lastMessageAt: message.timestamp,
      isActive: true,
      unreadCount: 1,
      isAgentActive: false,
    });

    if (message.sender === "user") {
      notifyNewMessage(message.leadId, "Visitor", message.message);
      onMessage?.(message);
    }
  });

  const handleTyping = useEffectEvent((typing: TypingStatus) => {
    setTyping(typing);
    onTyping?.(typing);
  });

  const handleAgentJoin = useEffectEvent((activity: AgentActivity) => {
    setAgentActivity(activity);
    if (activity.isActive) {
      notifyChatTakeover(activity.leadId, "Visitor", activity.adminName);
    }
    onAgentJoin?.(activity);
  });

  const handleAgentLeave = useEffectEvent((activity: AgentActivity) => {
    const inactiveActivity = { ...activity, isActive: false };
    setAgentActivity(inactiveActivity);
    onAgentLeave?.(inactiveActivity);
  });

  const handleLeadJoined = useEffectEvent((lead: { leadId: string; name: string }) => {
    addRoom({
      id: lead.leadId,
      leadId: lead.leadId,
      leadName: lead.name,
      lastMessage: "",
      lastMessageAt: new Date().toISOString(),
      isActive: true,
      unreadCount: 0,
      isAgentActive: false,
    });
    onNewLead?.(lead.leadId, lead.name);
  });

  const handleMessageConfirmed = useEffectEvent((payload: {
    leadId: string;
    clientMessageId: string;
    messageId: string;
  }) => {
    confirmMessage(payload.leadId, payload.clientMessageId, payload.messageId);
  });

  const handleSocketError = useEffectEvent((message: string) => {
    setError(message);
  });

  useEffect(() => {
    if (!enabled) {
      const socket = socketRef.current;
      if (socket) {
        socket.disconnect();
        socketRef.current = null;
      }
      setConnected(false);
      setConnecting(false);
      return;
    }

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    void (async () => {
      try {
        setConnecting(true);
        setError(null);

        const socket = await getSocketClient();

        if (!isMounted) {
          return;
        }

        socketRef.current = socket;

        const joinAdminRoom = () => {
          if (adminId) {
            socket.emit("join_admin", {
              adminId,
              adminName: adminName || "Admin",
              adminToken:
                typeof window === "undefined"
                  ? ""
                  : window.localStorage.getItem("adminToken") || "",
            });
          }
        };

        const onConnect = () => {
          setConnected(true);
          setConnecting(false);
          setError(null);
          resetReconnect();
          joinAdminRoom();
        };

        const onDisconnect = () => {
          setConnected(false);
          setConnecting(false);
        };

        const onConnectError = (error: Error) => {
          console.error("Socket.IO connection error:", error);
          setConnected(false);
          setConnecting(false);
          handleSocketError("Connection error");
        };

        const onServerError = ({ message }: { message: string }) => {
          handleSocketError(message);
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("connect_error", onConnectError);
        socket.on("new_message", handleNewMessage);
        socket.on("typing", handleTyping);
        socket.on("agent_join", handleAgentJoin);
        socket.on("agent_leave", handleAgentLeave);
        socket.on("lead_joined", handleLeadJoined);
        socket.on("message_confirmed", handleMessageConfirmed);
        socket.on("error", onServerError);

        if (socket.connected) {
          onConnect();
        } else {
          socket.connect();
        }

        cleanup = () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
          socket.off("connect_error", onConnectError);
          socket.off("new_message", handleNewMessage);
          socket.off("typing", handleTyping);
          socket.off("agent_join", handleAgentJoin);
          socket.off("agent_leave", handleAgentLeave);
          socket.off("lead_joined", handleLeadJoined);
          socket.off("message_confirmed", handleMessageConfirmed);
          socket.off("error", onServerError);
        };
      } catch (error) {
        console.error("Failed to initialize realtime chat:", error);
        setConnecting(false);
        handleSocketError("Failed to connect");
      }
    })();

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [adminId, adminName, enabled, resetReconnect, setConnected, setConnecting, setError]);

  const sendMessage = useCallback(
    (leadId: string, message: string): string => {
      const socket = socketRef.current;

      if (!socket || !socket.connected) {
        throw new Error("Socket not connected");
      }

      const clientMessageId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

      const messagePayload: RealtimeMessage = {
        id: clientMessageId,
        leadId,
        sessionId: leadId,
        sender: "agent",
        message,
        timestamp: new Date().toISOString(),
        clientMessageId,
      };

      addPendingMessage(leadId, messagePayload);
      socket.emit("send_message", messagePayload);

      return clientMessageId;
    },
    [addPendingMessage],
  );

  const sendTyping = useCallback((leadId: string, isTyping: boolean) => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      return;
    }

    socket.emit("typing", { leadId, sender: "agent", isTyping });
  }, []);

  const joinRoom = useCallback((leadId: string) => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      return;
    }

    socket.emit("join_room", { roomId: leadId, leadId });
  }, []);

  const leaveRoom = useCallback((leadId: string) => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      return;
    }

    socket.emit("leave_room", { roomId: leadId, leadId });
  }, []);

  const takeOverChat = useCallback(
    (leadId: string) => {
      const socket = socketRef.current;
      if (!socket || !socket.connected) {
        return;
      }

      socket.emit("takeover", { leadId, adminId, adminName });
    },
    [adminId, adminName],
  );

  const returnToAI = useCallback((leadId: string) => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      return;
    }

    socket.emit("return_to_ai", { leadId });
  }, []);

  const disconnect = useCallback(() => {
    const socket = socketRef.current;
    if (!socket) {
      return;
    }

    socket.disconnect();
    socketRef.current = null;
    setConnected(false);
    setConnecting(false);
  }, [setConnected, setConnecting]);

  const reconnect = useCallback(() => {
    const socket = socketRef.current;
    if (!socket) {
      return;
    }

    setConnecting(true);
    socket.connect();
  }, [setConnecting]);

  return {
    isConnected,
    isConnecting,
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
  const { joinRoom, leaveRoom, sendMessage, sendTyping, takeOverChat, returnToAI, isConnected } =
    useRealtimeChat();

  useEffect(() => {
    if (leadId && isConnected) {
      joinRoom(leadId);
    }

    return () => {
      if (leadId) {
        leaveRoom(leadId);
      }
    };
  }, [isConnected, joinRoom, leadId, leaveRoom]);

  return {
    messages,
    sendMessage: (message: string) => sendMessage(leadId, message),
    sendTyping: (isTyping: boolean) => sendTyping(leadId, isTyping),
    takeOverChat: () => takeOverChat(leadId),
    returnToAI: () => returnToAI(leadId),
    isConnected,
  };
}
