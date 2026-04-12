"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { Send, User, MessageCircle, X, Users } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai" | "admin";
  message: string;
  timestamp: string;
  clientMessageId?: string;
}

interface ChatSession {
  id: string;
  leadId: string;
  status: string;
  lastMessageAt?: string;
  lastMessagePreview?: string;
  unreadCount?: number;
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

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "";
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

const POLL_INTERVAL = 2000;

export function AdminDashboard() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionsPollRef = useRef<NodeJS.Timeout | null>(null);
  const messagesPollRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      
      const leads = data.leads || data || [];
      const chatSessions: ChatSession[] = leads.slice(0, 20).map((lead: any) => ({
        id: lead.currentSessionId || lead._id,
        leadId: lead._id,
        status: lead.status,
        lastMessageAt: lead.lastActivityAt,
        lastMessagePreview: lead.aiSummary || "No messages",
        unreadCount: 0,
      }));
      setSessions(chatSessions);
      setIsConnected(true);
    } catch (err) {
      console.error("Fetch sessions error:", err);
      setIsConnected(false);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!selectedSessionId) return;
    try {
      const res = await fetch(`/api/chat/session?sessionId=${selectedSessionId}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      
      if (data.messages) {
        setMessages(data.messages.map((m: any) => ({
          id: m.id || m._id,
          sender: m.sender,
          message: m.message || m.text,
          timestamp: m.timestamp,
          clientMessageId: m.clientMessageId,
        })));
      }
      if (data.session) {
        setSelectedSession(data.session);
      }
    } catch (err) {
      console.error("Fetch messages error:", err);
    }
  }, [selectedSessionId]);

  useEffect(() => {
    fetchSessions();
    sessionsPollRef.current = setInterval(fetchSessions, POLL_INTERVAL);
    return () => {
      if (sessionsPollRef.current) clearInterval(sessionsPollRef.current);
    };
  }, [fetchSessions]);

  useEffect(() => {
    if (!selectedSessionId) {
      setMessages([]);
      return;
    }
    fetchMessages();
    messagesPollRef.current = setInterval(fetchMessages, POLL_INTERVAL);
    return () => {
      if (messagesPollRef.current) clearInterval(messagesPollRef.current);
    };
  }, [selectedSessionId, fetchMessages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || !selectedSessionId) return;

    const adminMessageId = generateClientMessageId();

    setMessages(prev => [...prev, {
      id: `pending-${adminMessageId}`,
      sender: "admin",
      message: inputValue.trim(),
      timestamp: new Date().toISOString(),
      clientMessageId: adminMessageId,
    }]);

    setInputValue("");

    try {
      await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          message: inputValue.trim(),
          sender: "agent",
          clientMessageId: adminMessageId,
        }),
      });

      await fetchMessages();
    } catch (err) {
      console.error("Send error:", err);
    }
  }, [inputValue, selectedSessionId, fetchMessages]);

  const handleTakeover = useCallback(async () => {
    if (!selectedSessionId) return;
    try {
      await fetch(`/api/admin/takeover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedSession?.leadId || selectedSessionId }),
      });
      setSelectedSession((prev: any) => prev ? { ...prev, assignedToHuman: true } : null);
    } catch (err) {
      console.error("Takeover error:", err);
    }
  }, [selectedSessionId, selectedSession]);

  const handleReleaseToAI = useCallback(async () => {
    if (!selectedSessionId) return;
    try {
      await fetch(`/api/admin/return-to-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedSession?.leadId || selectedSessionId }),
      });
      setSelectedSession((prev: any) => prev ? { ...prev, assignedToHuman: false } : null);
    } catch (err) {
      console.error("Release error:", err);
    }
  }, [selectedSessionId, selectedSession]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold flex items-center gap-2">
            <Users size={20} />
            Active Chats
          </h2>
          <p className={`text-sm ${isConnected ? "text-green-600" : "text-red-600"}`}>
            {isConnected ? "● Connected" : "● Reconnecting..."}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sessions.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No active chats
            </div>
          )}

          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              className={`w-full p-4 text-left border-b hover:bg-gray-50 ${
                selectedSessionId === session.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-medium truncate">
                  {session.leadId?.slice(0, 8) || session.id.slice(0, 8)}
                </span>
                <span className="text-xs text-gray-500">
                  {formatRelativeTime(session.lastMessageAt)}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {session.lastMessagePreview || "No messages"}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedSessionId ? (
          <>
            <div className="bg-white p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {selectedSession?.leadId || selectedSessionId.slice(0, 8)}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedSession?.assignedToHuman ? "Human handling" : "AI responding"}
                </p>
              </div>
              <div className="flex gap-2">
                {selectedSession?.assignedToHuman ? (
                  <button
                    onClick={handleReleaseToAI}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                  >
                    Release to AI
                  </button>
                ) : (
                  <button
                    onClick={handleTakeover}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                  >
                    Take Over
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No messages yet
                </div>
              )}

              {messages.map((msg, idx) => (
                <div key={msg.clientMessageId || msg.id || idx} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    msg.sender === "admin" ? "bg-green-600 text-white" : 
                    msg.sender === "ai" ? "bg-blue-100 text-gray-900" : "bg-gray-100 text-gray-900"
                  }`}>
                    <p className="text-sm">
                      {msg.sender === "admin" ? "You" : msg.message}
                    </p>
                    <p className={`text-xs mt-1 ${msg.sender === "admin" ? "text-green-200" : "text-gray-500"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4 flex gap-2 bg-white">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto mb-4" />
              <p>Select a conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}