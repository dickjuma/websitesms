"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface ChatMessage {
  id?: string;
  sessionId: string;
  sender: "user" | "ai" | "admin";
  text: string;
  timestamp: string;
  clientMessageId?: string;
}

export interface ChatSession {
  sessionId: string;
  createdAt: string;
  assignedToHuman: boolean;
  status: "active" | "closed";
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

const POLL_INTERVAL = 2000;

export function generateSessionId(): string {
  if (typeof window === "undefined") return "";
  const stored = localStorage.getItem("sma-session-id");
  if (stored) return stored;
  const newId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  localStorage.setItem("sma-session-id", newId);
  return newId;
}

export function useChatSession(sessionId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const lastMessageCountRef = useRef(0);

  const fetchMessages = useCallback(async () => {
    if (!sessionId) return;
    try {
      const res = await fetch(`/api/chat/session/${sessionId}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
        if (data.messages.length > lastMessageCountRef.current) {
          lastMessageCountRef.current = data.messages.length;
        }
      }
      if (data.session) {
        setSession(data.session);
      }
      setIsConnected(true);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Connection error");
    }
  }, [sessionId]);

  useEffect(() => {
    fetchMessages();
    pollRef.current = setInterval(fetchMessages, POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [sessionId, fetchMessages]);

  const sendMessage = async (text: string, sender: "user" | "ai" | "admin" = "user", clientMessageId?: string) => {
    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, text, sender, clientMessageId }),
      });
      if (!res.ok) throw new Error("Failed to send");
      await fetchMessages();
      return true;
    } catch (err) {
      console.error("Send error:", err);
      setError("Failed to send message");
      return false;
    }
  };

  const createSession = async () => {
    try {
      await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
    } catch (err) {
      console.error("Create session error:", err);
    }
  };

  return {
    messages,
    session,
    isConnected,
    error,
    sendMessage,
    createSession,
    refetch: fetchMessages,
  };
}

export function useAdminSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/sessions", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setSessions(data.sessions || []);
      setIsConnected(true);
    } catch (err) {
      console.error("Fetch sessions error:", err);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
    pollRef.current = setInterval(fetchSessions, POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchSessions]);

  return { sessions, isConnected, refetch: fetchSessions };
}