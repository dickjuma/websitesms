"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Minimize2, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "admin";
  text: string;
  timestamp: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with empty strings - actual values set in useEffect
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState<string | null>(null);

  // Initialize session IDs
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let vId = localStorage.getItem("sma-visitor-id");
    if (!vId) {
      vId = `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem("sma-visitor-id", vId);
    }
    
    let sId = localStorage.getItem("sma-session-id");
    if (!sId) {
      sId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem("sma-session-id", sId);
    }
    
    setVisitorId(vId);
    setSessionId(sId);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Fetch messages from API
  const fetchMessages = useCallback(async () => {
    const currentSessionId = typeof window !== "undefined" ? localStorage.getItem("sma-session-id") : null;
    const currentVisitorId = typeof window !== "undefined" ? localStorage.getItem("sma-visitor-id") : null;
    
    if (!currentSessionId) return;
    
    try {
      const url = `/api/chat/session?sessionId=${currentSessionId}${currentVisitorId ? `&visitorId=${currentVisitorId}` : ''}`;
      const res = await fetch(url, { cache: "no-store" });
      
      if (!res.ok) {
        console.log("Fetch failed:", res.status, res.statusText);
        return;
      }
      
      const data = await res.json();
      
      if (data.messages && Array.isArray(data.messages)) {
        const newMessages: ChatMessage[] = data.messages.map((m: any) => ({
          id: m.id || m._id || generateId(),
          sender: m.sender === "bot" ? "ai" : m.sender === "agent" ? "admin" : m.sender,
          text: m.message || m.text,
          timestamp: m.timestamp,
        }));
        
        // Add new messages that aren't already in state
        setMessages(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const uniqueNew = newMessages.filter(m => !existingIds.has(m.id));
          if (uniqueNew.length === 0) return prev;
          return [...prev, ...uniqueNew];
        });
        
        // Show typing indicator if AI is processing
        if (data.session?.status === "ai_processing") {
          setIsTyping(true);
        } else {
          setIsTyping(false);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  // Polling when chat is open
  useEffect(() => {
    if (!isOpen || !sessionId) return;
    
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    
    return () => clearInterval(interval);
  }, [isOpen, sessionId]);

  // Send message
  const handleSend = useCallback(async () => {
    const currentSessionId = typeof window !== "undefined" ? localStorage.getItem("sma-session-id") : null;
    const currentVisitorId = typeof window !== "undefined" ? localStorage.getItem("sma-visitor-id") : null;
    
    if (!inputValue.trim() || !currentSessionId || isLoading) return;
    
    const userMessage: ChatMessage = {
      id: generateId(),
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: currentSessionId,
          visitorId: currentVisitorId,
          message: inputValue.trim(),
        }),
      });
      
      if (!res.ok) throw new Error("Failed to send");
      
      const data = await res.json();
      
      // Get all messages from response
      if (data.messages && Array.isArray(data.messages)) {
        const serverMessages: ChatMessage[] = data.messages.map((m: any) => ({
          id: m.id || m._id || generateId(),
          sender: m.sender === "bot" ? "ai" : m.sender === "agent" ? "admin" : m.sender,
          text: m.message || m.text,
          timestamp: m.timestamp,
        }));
        
        setMessages(prev => {
          // Remove pending message and add server messages
          const filtered = prev.filter(m => m.id !== userMessage.id);
          return [...filtered, ...serverMessages];
        });
      }
    } catch (err) {
      console.error("Send error:", err);
      // Remove failed message
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [inputValue, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Close handler
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Open handler
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (sessionId) {
      fetchMessages();
    }
  }, [sessionId, fetchMessages]);

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => isOpen ? handleClose() : handleOpen()}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <Minimize2 size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">Chat with us</h3>
              <p className="text-blue-100 text-xs flex items-center gap-1">
                {isTyping ? (
                  <>
                    <span className="animate-pulse">AI is typing...</span>
                  </>
                ) : (
                  "AI Assistant"
                )}
              </p>
            </div>
            <button 
              onClick={handleClose} 
              className="text-white hover:bg-blue-700 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="mx-auto mb-2" size={32} />
                <p className="text-sm">Start a conversation</p>
                <p className="text-xs">We&apos;ll respond shortly</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white" 
                      : msg.sender === "admin" 
                        ? "bg-green-600 text-white" 
                        : "bg-gray-100 text-gray-900"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs ${msg.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
            
            {isTyping && !messages[messages.length - 1]?.text?.includes("SMA Assistant") && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50 hover:bg-blue-700 flex items-center justify-center min-w-[40px]"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}