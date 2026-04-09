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
  lastMessage?: string;
  lastMessageAt?: string;
}

interface Admin {
  socketId: string;
  name: string;
  connectedAt: string;
}

const SOCKET_OPTIONS = {
  path: SOCKET_PATH,
  addTrailingSlash: false,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
};

function getSocketUrl() {
  if (typeof window === "undefined") return undefined;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  return appUrl && appUrl !== "http://localhost:3000" ? appUrl : undefined;
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

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filter, setFilter] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initializedRef = useRef(false);
  const adminIdRef = useRef(`admin-${Date.now()}`);

  const selectedUser = users.find((u) => u.userId === selectedUserId);

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
      socket.emit("join_admin", {
        adminId: adminIdRef.current,
        adminName: "Admin",
      });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("admin_connected", (data: { admins: Admin[]; users: User[] }) => {
      setAdmins(data.admins);
      setUsers(data.users);
    });

    socket.on("users_update", (updatedUsers: User[]) => {
      setUsers((prev) => {
        const userMap = new Map(updatedUsers.map((u) => [u.userId, u]));
        return prev.map((user) => {
          const updated = userMap.get(user.userId);
          return updated ? { ...user, ...updated } : user;
        });
      });
    });

    socket.on("new_user", (user: User) => {
      setUsers((prev) => {
        if (prev.some((u) => u.userId === user.userId)) return prev;
        return [{ ...user, unreadCount: 0 }, ...prev];
      });

      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch(() => {});
      }

      if (Notification.permission === "granted") {
        new Notification("New user", {
          body: `${user.name} started a chat`,
          icon: "/favicon.ico",
        });
      }
    });

    socket.on("user_message", (message: Message & { isNew: boolean }) => {
      if (message.userId === selectedUserId) {
        setMessages((prev) => {
          const exists = prev.some(
            (m) => m.id === message.id || m.clientMessageId === message.clientMessageId
          );
          if (exists) return prev;
          return [...prev, message];
        });

        socket.emit("mark_seen", {
          userId: message.userId,
          messageIds: [message.id],
        });
      }

      if (message.isNew) {
        setUsers((prev) =>
          prev.map((u) =>
            u.userId === message.userId
              ? {
                  ...u,
                  unreadCount: u.unreadCount + 1,
                  lastMessage: message.message,
                  lastMessageAt: message.timestamp,
                }
              : u
          )
        );

        if (soundEnabled && message.userId !== selectedUserId && audioRef.current) {
          audioRef.current.play().catch(() => {});
        }
      }
    });

    socket.on("user_typing", ({ userId, isTyping }: { userId: string; isTyping: boolean }) => {
      if (userId === selectedUserId) {
        setIsUserTyping(isTyping);
      }
    });

    socket.on("lead_taken", ({ userId }: { userId: string }) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === userId ? { ...u, isOnline: true } : u
        )
      );
    });

    socket.on("lead_released", ({ userId }: { userId: string }) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === userId ? { ...u, isOnline: true } : u
        )
      );
    });

    socket.on("user_offline", ({ userId }: { userId: string }) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === userId ? { ...u, isOnline: false } : u
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUserId, soundEnabled]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/notification.mp3");
      audio.preload = "auto";
      audioRef.current = audio;
    }
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim() || !socketRef.current || !selectedUserId || !isAgentActive) return;

    const clientMessageId = generateClientMessageId();
    const messageText = inputValue.trim();

    const optimisticMessage: Message = {
      id: `pending-${clientMessageId}`,
      userId: selectedUserId,
      sessionId: selectedUserId,
      sender: "admin",
      senderName: "Admin",
      message: messageText,
      status: "sent",
      clientMessageId,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInputValue("");

    socketRef.current.emit("send_message", {
      userId: selectedUserId,
      sessionId: selectedUserId,
      sender: "admin",
      senderName: "Admin",
      message: messageText,
      clientMessageId,
    });
  }, [inputValue, selectedUserId, isAgentActive]);

  const handleUserSelect = useCallback(
    (userId: string) => {
      setSelectedUserId(userId);
      setMessages([]);
      setIsUserTyping(false);

      setUsers((prev) =>
        prev.map((u) =>
          u.userId === userId ? { ...u, unreadCount: 0 } : u
        )
      );

      socketRef.current?.emit("mark_seen", {
        userId,
        messageIds: [],
      });
    },
    []
  );

  const handleTakeover = useCallback(() => {
    if (!selectedUserId) return;

    socketRef.current?.emit("takeover", {
      userId: selectedUserId,
      adminId: adminIdRef.current,
      adminName: "Admin",
    });

    setIsAgentActive(true);
  }, [selectedUserId]);

  const handleReturnToAI = useCallback(() => {
    if (!selectedUserId) return;

    socketRef.current?.emit("return_to_ai", {
      userId: selectedUserId,
    });

    setIsAgentActive(false);
  }, [selectedUserId]);

  const handleTyping = useCallback(() => {
    if (!socketRef.current || !selectedUserId || !isAgentActive) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socketRef.current.emit("typing", {
      userId: selectedUserId,
      sender: "admin",
      isTyping: true,
    });

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("typing", {
        userId: selectedUserId,
        sender: "admin",
        isTyping: false,
      });
    }, 2000);
  }, [selectedUserId, isAgentActive]);

  const filteredUsers = filter
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(filter.toLowerCase()) ||
          u.userId.toLowerCase().includes(filter.toLowerCase())
      )
    : users;

  return (
    <div className="flex h-screen bg-slate-50">
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />

      <div className="w-80 flex-shrink-0 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Conversations</h2>
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100"
                title={soundEnabled ? "Mute" : "Unmute"}
              >
                {soundEnabled ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search users..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
            />
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500">
              No conversations yet
            </div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <li key={user.userId}>
                  <button
                    onClick={() => handleUserSelect(user.userId)}
                    className={`w-full p-4 text-left transition ${
                      selectedUserId === user.userId
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${user.isOnline ? "bg-green-500" : "bg-slate-400"}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="truncate font-medium text-slate-900">
                            {user.name}
                          </p>
                          {user.lastMessageAt && (
                            <span className="text-xs text-slate-400">
                              {formatRelativeTime(user.lastMessageAt)}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 truncate text-sm text-slate-500">
                          {user.lastMessage || "No messages"}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          {user.unreadCount > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1.5 text-xs font-bold text-white">
                              {user.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${selectedUser.isOnline ? "bg-green-500" : "bg-slate-400"}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedUser.name}</h3>
                  <p className="text-sm text-slate-500">
                    {selectedUser.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isAgentActive ? (
                  <button
                    onClick={handleReturnToAI}
                    className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                  >
                    Return to AI
                  </button>
                ) : (
                  <button
                    onClick={handleTakeover}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Take Over
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${
                    message.sender === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                      message.sender === "admin"
                        ? "bg-blue-600 text-white"
                        : message.sender === "user"
                        ? "bg-slate-100 text-slate-900"
                        : "bg-emerald-50 text-emerald-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                    <div className={`mt-1 flex items-center justify-end gap-1 text-xs ${message.sender === "admin" ? "text-blue-200" : "text-slate-400"}`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === "user" && message.status === "seen" && (
                        <span>✓✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isUserTyping && (
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

            <div className="border-t border-slate-200 bg-white p-4">
              {isAgentActive ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      handleTyping();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your reply..."
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="rounded-lg bg-slate-100 p-3 text-center text-sm text-slate-500">
                  Take over to send messages
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="mt-4 text-lg font-medium text-slate-900">Select a conversation</p>
              <p className="mt-2 text-sm text-slate-500">
                Choose a user from the list to view their chat
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;