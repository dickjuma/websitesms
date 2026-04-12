"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

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
  const [sessionId] = useState(() => generateSessionId());
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
      const res = await fetch(`/api/chat/session?sessionId=${sessionId}`, {
        cache: "no-store",
      });
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
        body: JSON.stringify({
          sessionId,
          message: messageText,
          clientMessageId,
        }),
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

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => setIsOpen(true), []);

  return (
    <>
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        aria-label="Toggle chat"
      >
        {isOpen ? <Minimize2 size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border">
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Chat with us</h3>
              <p className="text-blue-100 text-xs">
                {isAgentActive ? "Human agent" : "AI Assistant"} • {isConnected ? "Online" : "Connecting..."}
              </p>
            </div>
            <button onClick={handleClose} className="text-white hover:bg-blue-700 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="mx-auto mb-2" size={32} />
                <p className="text-sm">Start a conversation</p>
                <p className="text-xs">We&apos;ll respond shortly</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={msg.clientMessageId || msg.id || idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  msg.sender === "user" ? "bg-blue-600 text-white" : 
                  msg.sender === "admin" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs ${msg.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isAgentTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-500 italic">typing...</p>
                </div>
              </div>
            )}

            {isAiThinking && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-500 italic">AI is thinking...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {error && <div className="bg-red-50 text-red-600 px-3 py-2 text-sm">{error}</div>}

          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              disabled={!isConnected}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !isConnected}
              className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}