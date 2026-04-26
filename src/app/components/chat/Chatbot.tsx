"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Minimize2, Bot, User, Headphones, Loader2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai" | "admin";
  text: string;
  timestamp: string;
  clientMessageId?: string;
}

interface Session {
  assignedToHuman: boolean;
  status: string;
}

function generateSessionId(): string {
  if (typeof window === "undefined") return "";
  const stored = localStorage.getItem("sma-session-id");
  if (stored) return stored;
  const newId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  localStorage.setItem("sma-session-id", newId);
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

const POLL_INTERVAL = 2000;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const sessionRef = useRef<Session | null>(null);

  const fetchChat = useCallback(async () => {
    if (!sessionId) return;
    try {
      const res = await fetch(`/api/chat/session?sessionId=${sessionId}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages.map((m: any) => ({
          id: m.id || m._id,
          sender: m.sender,
          text: m.message || m.text,
          timestamp: m.timestamp,
          clientMessageId: m.clientMessageId,
        })));
      }
      if (data.session) {
        sessionRef.current = data.session;
        setIsAgentActive(data.session.assignedToHuman || false);
      }
      setIsConnected(true);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchChat();
    pollRef.current = setInterval(fetchChat, POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [sessionId, fetchChat]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || !sessionId) return;
    const clientMessageId = generateClientMessageId();
    const messageText = inputValue.trim();

    setMessages(prev => [...prev, {
      id: `pending-${clientMessageId}`,
      sender: "user",
      text: messageText,
      timestamp: new Date().toISOString(),
      clientMessageId,
    }]);
    setInputValue("");
    setIsAiThinking(true);

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: messageText, clientMessageId }),
      });
      if (!res.ok) throw new Error("Failed to send");
      await fetchChat();
    } catch (err) {
      console.error("Send error:", err);
      setError("Failed to send message");
    } finally {
      setIsAiThinking(false);
    }
  }, [inputValue, sessionId, fetchChat]);

  const getSenderStyles = (sender: string) => {
    switch (sender) {
      case "user":
        return { container: "justify-end", bubble: "bg-slate-800 text-white rounded-br-md", icon: "bg-white/20 text-white", label: "text-blue-200" };
      case "admin":
        return { container: "justify-start", bubble: "border border-slate-200 bg-slate-50 text-slate-800 rounded-bl-md", icon: "bg-slate-100 text-slate-600", label: "text-slate-500" };
      default:
        return { container: "justify-start", bubble: "border border-slate-200 bg-white text-slate-800 rounded-bl-md", icon: "bg-blue-100 text-blue-600", label: "text-slate-500" };
    }
  };

  const getSenderInfo = (sender: string) => {
    switch (sender) {
      case "user": return { label: "You", Icon: User };
      case "admin": return { label: "Agent", Icon: Headphones };
      default: return { label: "AI", Icon: Bot };
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <Minimize2 size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <aside
          className="fixed bottom-24 right-6 z-40 flex w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:w-[400px]"
          aria-label="Chat support"
        >
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  {isAgentActive ? <Headphones size={18} /> : <Bot size={18} />}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">SMA Support</h2>
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${isConnected ? "bg-green-500" : "bg-slate-400"}`} />
                    {isAgentActive ? "Human agent" : "AI Assistant"} • {isConnected ? "Online" : "Connecting"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="h-[480px] overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Bot size={24} />
                </div>
                <p className="text-sm font-medium text-slate-700">Welcome to SMA Support</p>
                <p className="mt-1 text-xs text-slate-500">
                  Ask about services, pricing, or get help with your project.
                </p>
              </div>
            )}

            {messages.map((msg) => {
              const styles = getSenderStyles(msg.sender);
              const { label, Icon } = getSenderInfo(msg.sender);
              return (
                <article key={msg.clientMessageId || msg.id} className={`flex ${styles.container} mb-3`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${styles.bubble}`}>
                    <div className="mb-1 flex items-center gap-1.5">
                      <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${styles.icon}`}>
                        <Icon className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</span>
                      <span className="text-[10px] text-slate-400">{formatTime(msg.timestamp)}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                  </div>
                </article>
              );
            })}

            {(isAgentTyping || isAiThinking) && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3 py-2">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="mx-4 mb-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Input area */}
          <div className="border-t border-slate-100 bg-white p-3">
            <div className="flex items-center gap-2">
              <label htmlFor="chat-input" className="sr-only">Message</label>
              <input
                id="chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder="Type a message..."
                disabled={!isConnected}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 disabled:bg-slate-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !isConnected}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send"
              >
                {isAiThinking ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-slate-400">
              Press Enter to send
            </p>
          </div>
        </aside>
      )}
    </>
  );
}
