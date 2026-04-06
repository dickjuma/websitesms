"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChatStore, type Message } from "@/lib/admin-store";

// WebSocket event types
interface WebSocketMessage {
  type: "receive_message" | "typing" | "agent_join" | "agent_leave";
  payload: unknown;
}

interface ChatWebSocketOptions {
  leadId?: string;
  sessionId?: string;
  onMessage?: (message: Message) => void;
  onTyping?: (data: { sender: string; isTyping: boolean }) => void;
  onAgentJoin?: (data: { agentId: string; agentName: string }) => void;
  onAgentLeave?: () => void;
}

export function useChatWebSocket(options: ChatWebSocketOptions = {}) {
  const { leadId, sessionId, onMessage, onTyping, onAgentJoin, onAgentLeave } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const { addMessage, setAgentActive } = useChatStore();

  const connect = useCallback(() => {
    if (!leadId || typeof window === "undefined") return;

    // Get WebSocket URL from current location
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/api/socket`;

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        setIsReconnecting(false);
        
        // Join the room for this lead
        ws.send(
          JSON.stringify({
            type: "join_room",
            payload: { roomId: leadId },
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WebSocketMessage;

          switch (data.type) {
            case "receive_message": {
              const message = data.payload as Message;
              addMessage(message);
              onMessage?.(message);
              break;
            }
            case "typing": {
              const typingData = data.payload as { sender: string; isTyping: boolean };
              onTyping?.(typingData);
              break;
            }
            case "agent_join": {
              const joinData = data.payload as { agentId: string; agentName: string };
              setAgentActive(true);
              onAgentJoin?.(joinData);
              break;
            }
            case "agent_leave": {
              setAgentActive(false);
              onAgentLeave?.();
              break;
            }
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        setIsConnected(false);
        
        // Attempt to reconnect after 3 seconds
        if (!reconnectTimeoutRef.current) {
          setIsReconnecting(true);
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            connect();
          }, 3000);
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
    }
  }, [leadId, addMessage, onMessage, onTyping, onAgentJoin, onAgentLeave, setAgentActive]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsReconnecting(false);
  }, []);

  const sendMessage = useCallback(
    (message: string, sender: "agent" | "bot" = "agent") => {
      if (!wsRef.current || !leadId || !sessionId) return;

      const clientMessageId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

      wsRef.current.send(
        JSON.stringify({
          type: "send_message",
          payload: {
            roomId: leadId,
            leadId,
            sessionId,
            sender,
            message,
            clientMessageId,
          },
        })
      );

      return clientMessageId;
    },
    [leadId, sessionId]
  );

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      if (!wsRef.current || !leadId) return;

      wsRef.current.send(
        JSON.stringify({
          type: "typing",
          payload: {
            roomId: leadId,
            isTyping,
          },
        })
      );
    },
    [leadId]
  );

  // Connect when leadId changes
  useEffect(() => {
    if (leadId) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [leadId, connect, disconnect]);

  return {
    isConnected,
    isReconnecting,
    sendMessage,
    sendTyping,
    disconnect,
    reconnect: connect,
  };
}

// Hook for sending messages via API + WebSocket
export function useChatSender() {
  const { activeLeadId, isAgentActive } = useChatStore();
  
  const sendMessage = useCallback(
    async (message: string, clientMessageId: string) => {
      if (!activeLeadId || !isAgentActive) return null;

      try {
        const response = await fetch(`/api/admin/chat/${activeLeadId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, clientMessageId }),
        });

        if (!response.ok) throw new Error("Failed to send message");

        return await response.json();
      } catch (error) {
        console.error("Failed to send message:", error);
        return null;
      }
    },
    [activeLeadId, isAgentActive]
  );

  return { sendMessage };
}