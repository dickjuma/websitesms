"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

const SOCKET_PATH = "/api/socket/io";

interface Message {
  id: string;
  userId: string;
  sessionId: string;
  sender: "user" | "admin" | "bot";
  senderName?: string;
  message: string;
  status: "sent" | "delivered" | "seen";
  clientMessageId?: string;
  timestamp: string;
}

interface User {
  userId: string;
  name: string;
  sessionId: string;
  joinedAt: string;
  isOnline: boolean;
  unreadCount: number;
}

const SOCKET_OPTIONS = {
  path: SOCKET_PATH,
  addTrailingSlash: false,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
};

function getSocketUrl() {
  if (typeof window === "undefined") return undefined;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  return appUrl && appUrl !== "http://localhost:3000" ? appUrl : undefined;
}

function generateUserId(): string {
  const stored = localStorage.getItem("sma-user-id");
  if (stored) return stored;
  const newId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  localStorage.setItem("sma-user-id", newId);
  return newId;
}

function generateClientMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId] = useState(() => generateUserId());
  const [sessionId] = useState(() => `session-${userId}`);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const socket = io(getSocketUrl(), SOCKET_OPTIONS);
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      setError(null);
      socket.emit("join", {
        userId,
        sessionId,
        userName: "User",
        metadata: {
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
        },
      });
    });

    socket.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log("Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      setError("Connection failed. Please refresh the page.");
      console.error("Connection error:", err);
    });

    socket.on("chat_history", (data: { messages: Message[] }) => {
      if (data.messages?.length > 0) {
        setMessages(data.messages);
      }
    });

    socket.on("receive_message", (message: Message) => {
      setMessages((prev) => {
        const exists = prev.some(
          (m) => m.id === message.id || m.clientMessageId === message.clientMessageId
        );
        if (exists) return prev;
        return [...prev, message];
      });

      if (message.sender === "admin") {
        if (Notification.permission === "granted") {
          new Notification("New message", {
            body: message.message.slice(0, 100),
            icon: "/favicon.ico",
          });
        }
      }
    });

    socket.on("message_status", (data: { status: string; messageIds: string[] }) => {
      setMessages((prev) =>
        prev.map((m) =>
          data.messageIds.includes(m.id) || data.messageIds.includes(m.clientMessageId || "")
            ? { ...m, status: data.status as Message["status"] }
            : m
        )
      );
    });

    socket.on("typing", ({ sender, isTyping }: { sender: string; isTyping: boolean }) => {
      if (sender === "admin") {
        setIsAgentTyping(isTyping);
      }
    });

    socket.on("agent_active", ({ isActive }: { isActive: boolean }) => {
      setIsAgentActive(isActive);
    });

    socket.on("rate_limited", ({ message }: { message: string }) => {
      setError(message);
      setTimeout(() => setError(null), 5000);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, sessionId]);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim() || !socketRef.current || !isConnected) return;

    const clientMessageId = generateClientMessageId();
    const messageText = inputValue.trim();

    const optimisticMessage: Message = {
      id: `pending-${clientMessageId}`,
      userId,
      sessionId,
      sender: "user",
      message: messageText,
      status: "sent",
      clientMessageId,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInputValue("");

    socketRef.current.emit("send_message", {
      userId,
      sessionId,
      sender: "user",
      senderName: "User",
      message: messageText,
      clientMessageId,
    });
  }, [inputValue, userId, sessionId, isConnected]);

  const handleTyping = useCallback(() => {
    if (!socketRef.current || !isConnected) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socketRef.current.emit("typing", {
      userId,
      sender: "user",
      isTyping: true,
    });

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("typing", {
        userId,
        sender: "user",
        isTyping: false,
      });
    }, 2000);
  }, [userId, isConnected]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const requestNotificationPermission = useCallback(async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestNotificationPermission();
    }
  }, [isOpen, requestNotificationPermission]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
          aria-label="Open chat"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
              </div>
              <div>
                <p className="font-semibold">SMA Support</p>
                <p className="text-xs text-white/80">
                  {isAgentActive ? "Agent is online" : isConnected ? "AI Assistant" : "Connecting..."}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-white/80 transition hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
                <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="mt-3 text-sm">Start a conversation</p>
                <p className="mt-1 text-xs">We typically reply within a few minutes</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    message.sender === "user"
                      ? "bg-emerald-600 text-white"
                      : message.sender === "admin"
                      ? "bg-slate-100 text-slate-900"
                      : "bg-blue-50 text-blue-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  <div className={`mt-1 flex items-center justify-end gap-1 text-xs ${message.sender === "user" ? "text-emerald-200" : "text-slate-400"}`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === "user" && (
                      <span>
                        {message.status === "seen" ? "✓✓" : message.status === "delivered" ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isAgentTyping && (
              <div className="mb-3 flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="mx-4 mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="border-t border-slate-100 p-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleTyping();
                }}
                onKeyDown={handleKeyDown}
                placeholder={isAgentActive ? "Type a message..." : "Ask us anything..."}
                disabled={!isConnected}
                className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-slate-400 disabled:text-slate-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !isConnected}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;