"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Headphones,
  Bot,
  User as UserIcon,
  Zap,
  Clock,
  MapPin,
  Mail,
  ChevronRight,
  ChevronLeft,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";

// Custom styles for animations
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`;

// Types
interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "agent";
  content: string;
  timestamp: string;
  status?: "sending" | "sent" | "delivered";
  clientMessageId?: string;
}

interface LeadListItem {
  id: string;
  name: string;
  email: string;
  status: string;
  isHumanActive: boolean;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

interface Chat {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
    location?: string;
  };
  lastMessage: string;
  timestamp: string;
  status: "online" | "offline";
  isHumanActive: boolean;
  isUrgent: boolean;
  tags: string[];
  sentiment: "happy" | "neutral" | "angry";
  unreadCount: number;
}

// API functions
let chatLeadsCache: LeadListItem[] = [];
let chatLeadsPromise: Promise<LeadListItem[]> | null = null;

async function fetchChatLeads(forceRefresh = false): Promise<LeadListItem[]> {
  if (forceRefresh) {
    chatLeadsCache = [];
    chatLeadsPromise = null;
  }

  if (chatLeadsCache.length > 0) {
    return chatLeadsCache;
  }

  if (chatLeadsPromise) {
    return chatLeadsPromise;
  }

  chatLeadsPromise = (async (): Promise<LeadListItem[]> => {
    try {
      const res = await fetch("/api/admin/leads?view=chat&limit=100", {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? localStorage.getItem("adminToken") : ""
          }`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      chatLeadsCache = data.leads || [];
      return chatLeadsCache;
    } catch {
      return [];
    }
  })();

  return chatLeadsPromise;
}

async function fetchMessages(
  leadId: string,
  limit = 40,
): Promise<{ messages: ChatMessage[]; hasMore: boolean; totalMessages: number }> {
  const res = await fetch(`/api/admin/hybrid-chat/${leadId}?limit=${limit}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      messages: [],
      hasMore: false,
      totalMessages: 0,
    };
  }

  const data = await res.json();
  return {
    messages: data.messages || [],
    hasMore: Boolean(data.hasMore),
    totalMessages: Number.isFinite(data.totalMessages) ? data.totalMessages : (data.messages || []).length,
  };
}

// Transform lead data to chat format
function transformLeadToChat(lead: LeadListItem): Chat {
  return {
    id: lead.id,
    customer: {
      name: lead.name,
      email: lead.email,
      location: "Location not available", // Could be enhanced later
    },
    lastMessage: lead.lastMessage,
    timestamp: lead.lastMessageAt,
    status: lead.status === "new" ? "online" : "offline",
    isHumanActive: lead.isHumanActive,
    isUrgent: lead.unreadCount > 5 || lead.lastMessage.toLowerCase().includes("urgent"),
    tags: [], // Could be enhanced based on lead data
    sentiment: "neutral", // Could be enhanced with AI analysis
    unreadCount: lead.unreadCount,
  };
}

// Transform message data
function transformMessage(msg: any): ChatMessage {
  return {
    id: msg.id || msg._id,
    sender: msg.sender === "bot" ? "ai" : msg.sender === "agent" ? "agent" : "user",
    content: msg.message || msg.text,
    timestamp: msg.timestamp || msg.createdAt,
    clientMessageId: msg.clientMessageId,
  };
}

// Premium Real-time Admin Chat Interface
export default function ModernChatDashboard() {
  const [leads, setLeads] = useState<LeadListItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [filter, setFilter] = useState<"all" | "ai" | "human" | "urgent">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageLimit, setMessageLimit] = useState(40);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [totalMessages, setTotalMessages] = useState(0);
  const [takeoverLoading, setTakeoverLoading] = useState(false);
  const [returnToAILoading, setReturnToAILoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([
    "I'd be happy to help you with that!",
    "Let me check our availability for you.",
    "Could you please provide more details?",
    "That's a great question! Here's what I can tell you:",
    "I'd love to schedule a demo for you."
  ]);

  const activeLeadId = activeChat?.id || null;

  const chats = leads.map(transformLeadToChat);

  const filteredChats = chats.filter((chat) => {
    if (filter === "ai" && chat.isHumanActive) return false;
    if (filter === "human" && !chat.isHumanActive) return false;
    if (filter === "urgent" && !chat.isUrgent) return false;

    if (searchQuery) {
      return (
        chat.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return true;
  });

  // Load leads on mount
  useEffect(() => {
    loadLeads();
  }, []);

  // Auto-refresh leads every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadLeads(true, false);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      loadMessages(activeChat.id, 40);
    } else {
      setMessages([]);
      setHasMoreMessages(false);
      setTotalMessages(0);
    }
  }, [activeChat]);

  const loadLeads = useCallback(async (forceRefresh = false, showLoader = true) => {
    if (showLoader) {
      setLoadingLeads(true);
    }

    try {
      const data = await fetchChatLeads(forceRefresh);
      setLeads(data);
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      if (showLoader) {
        setLoadingLeads(false);
      }
    }
  }, []);

  const loadMessages = useCallback(async (leadId: string, limit = 40, showLoader = true) => {
    if (showLoader) {
      setLoadingMessages(true);
    }

    try {
      const history = await fetchMessages(leadId, limit);
      setMessages(history.messages.map(transformMessage));
      setHasMoreMessages(history.hasMore);
      setTotalMessages(history.totalMessages);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setMessages([]);
    } finally {
      if (showLoader) {
        setLoadingMessages(false);
      }
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !activeChat) return;

    const messageText = newMessage.trim();
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      sender: "agent",
      content: messageText,
      timestamp: new Date().toISOString(),
      status: "sending",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");

    try {
      const res = await fetch(`/api/admin/hybrid-chat/${activeChat.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      // Reload messages to get the actual message from server
      await loadMessages(activeChat.id, messageLimit, false);
      await loadLeads(true, false); // Refresh leads to update last message
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    }
  }, [newMessage, activeChat, loadMessages, messageLimit, loadLeads]);

  const handleTakeOver = useCallback(async () => {
    if (!activeChat || takeoverLoading) return;

    setTakeoverLoading(true);

    try {
      // Use the new hybrid chat API for takeover
      const response = await fetch(`/api/admin/hybrid-chat/${activeChat.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "takeover", adminId: "admin" }),
      });

      if (!response.ok) {
        throw new Error("Failed to take over chat");
      }

      const result = await response.json();

      // Update local state
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === activeChat.id ? { ...lead, isHumanActive: true } : lead
        )
      );
      setActiveChat((prev) => prev ? { ...prev, isHumanActive: true } : null);

      // Add system message to chat
      const systemMessage: ChatMessage = {
        id: `system-${Date.now()}`,
        sender: "system",
        content: "You are now chatting with a human agent.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, systemMessage]);

      // Reload messages to get any new messages
      if (activeChat) {
        await loadMessages(activeChat.id, messageLimit, false);
      }

      // Refresh leads to update status
      await loadLeads(true, false);

      console.log("Chat takeover successful:", result.message);

    } catch (err) {
      console.error("Failed to take over chat:", err);
      // Could add error toast here
    } finally {
      setTakeoverLoading(false);
    }
  }, [activeChat, takeoverLoading, loadMessages, messageLimit, loadLeads]);

  const handleReturnToAI = useCallback(async () => {
    if (!activeChat || returnToAILoading) return;

    setReturnToAILoading(true);

    try {
      // Use the new hybrid chat API for return to AI
      const response = await fetch(`/api/admin/hybrid-chat/${activeChat.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "return_to_ai" }),
      });

      if (!response.ok) {
        throw new Error("Failed to return chat to AI");
      }

      const result = await response.json();

      // Update local state
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === activeChat.id ? { ...lead, isHumanActive: false } : lead
        )
      );
      setActiveChat((prev) => prev ? { ...prev, isHumanActive: false } : null);

      // Add system message to chat
      const systemMessage: ChatMessage = {
        id: `system-${Date.now()}`,
        sender: "system",
        content: "AI assistant has resumed the conversation.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, systemMessage]);

      // Reload messages to get any new messages
      if (activeChat) {
        await loadMessages(activeChat.id, messageLimit, false);
      }

      // Refresh leads to update status
      await loadLeads(true, false);

      console.log("Return to AI successful:", result.message);

    } catch (err) {
      console.error("Failed to return chat to AI:", err);
    } finally {
      setReturnToAILoading(false);
    }
  }, [activeChat, returnToAILoading, loadMessages, messageLimit, loadLeads]);

  const handleSelectChat = useCallback((chat: Chat) => {
    setActiveChat(chat);
  }, []);

  const insertSuggestedReply = (reply: string) => {
    setNewMessage(reply);
  };

  const regenerateSuggestions = () => {
    // Simulate regenerating AI suggestions
    setAiSuggestions([
      "Thank you for your interest!",
      "I can help you get started right away.",
      "Let me connect you with our team.",
      "Here's what our customers typically ask:",
      "I'd be glad to answer any questions you have."
    ]);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="h-screen bg-slate-950 text-white flex overflow-hidden">
      {/* LEFT PANEL — CONVERSATIONS LIST */}
      <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Conversations
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-800/50">
          <div className="flex gap-2">
            {[
              { key: "all", label: "All", count: chats.length },
              { key: "ai", label: "AI", count: chats.filter(c => !c.isHumanActive).length },
              { key: "human", label: "Human", count: chats.filter(c => c.isHumanActive).length },
              { key: "urgent", label: "Urgent", count: chats.filter(c => c.isUrgent).length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {loadingLeads ? (
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30">
                    <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-700 rounded mb-2"></div>
                      <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p className="text-slate-400 text-sm">No conversations found</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`w-full p-3 rounded-xl mb-2 transition-all duration-200 text-left ${
                    activeChat?.id === chat.id
                      ? "bg-indigo-500/20 border border-indigo-500/30"
                      : "hover:bg-slate-800/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {chat.customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                        chat.status === "online" ? "bg-emerald-500" : "bg-slate-500"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-200 truncate text-sm">
                          {chat.customer.name}
                        </h3>
                        <span className="text-xs text-slate-500">
                          {new Date(chat.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2 line-clamp-1">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center gap-2">
                        {chat.isHumanActive ? (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                            <UserIcon className="w-3 h-3" />
                            You
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                            <Bot className="w-3 h-3" />
                            AI
                          </div>
                        )}
                        {chat.isUrgent && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs">
                            <Zap className="w-3 h-3" />
                            Urgent
                          </div>
                        )}
                        {chat.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CENTER PANEL — ACTIVE CHAT */}
      <div className="flex-1 flex flex-col bg-slate-950">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {activeChat.customer.name.charAt(0)}
                      </span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                      activeChat.status === "online" ? "bg-emerald-500" : "bg-slate-500"
                    }`} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-200">{activeChat.customer.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span>{activeChat.status === "online" ? "Online" : "Offline"}</span>
                      <span>•</span>
                      <span>{activeChat.customer.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeChat.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-800/50 text-xs text-slate-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    activeChat.isHumanActive
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {activeChat.isHumanActive ? (
                      <>
                        <UserIcon className="w-3 h-3" />
                        You are handling
                      </>
                    ) : (
                      <>
                        <Bot className="w-3 h-3" />
                        AI handling
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loadingMessages ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={message.id} className="animate-fade-in">
                    {/* System Messages */}
                    {message.sender === "system" && (
                      <div className="flex justify-center my-2">
                        <div className="bg-slate-800/50 text-slate-400 px-4 py-2 rounded-full text-xs border border-slate-700/50">
                          {message.content}
                        </div>
                      </div>
                    )}

                    {/* Regular Messages */}
                    {message.sender !== "system" && (
                      <div className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"} mb-4`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-slate-800 text-slate-200"
                            : message.sender === "ai"
                            ? "bg-blue-500/20 text-blue-200 border border-blue-500/30"
                            : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        }`}>
                          {message.sender === "ai" && (
                            <div className="flex items-center gap-1 mb-1">
                              <Bot className="w-3 h-3" />
                              <span className="text-xs opacity-70">AI</span>
                            </div>
                          )}
                          {message.sender === "admin" && (
                            <div className="flex items-center gap-1 mb-1">
                              <UserIcon className="w-3 h-3" />
                              <span className="text-xs opacity-70">You</span>
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-800/50 bg-slate-900/20 backdrop-blur-xl">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                    rows={1}
                  />
                  <div className="absolute right-3 bottom-3 flex items-center gap-2">
                    <button className="p-1 text-slate-400 hover:text-slate-300 transition-colors">
                      <Smile className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-300 transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-lg font-medium text-slate-400 mb-2">Select a conversation</h3>
              <p className="text-slate-600">Choose a chat from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL — AI ASSIST + CUSTOMER INFO */}
      <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-l border-slate-800/50 flex flex-col">
        {activeChat ? (
          <>
            {/* AI Assist */}
            <div className="p-4 border-b border-slate-800/50">
              <h3 className="font-semibold text-slate-200 mb-3">AI Suggestions</h3>
              <div className="space-y-2 mb-3">
                {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => insertSuggestedReply(suggestion)}
                    className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl text-left text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <button
                onClick={regenerateSuggestions}
                className="w-full py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm text-slate-400 hover:text-slate-300 transition-colors"
              >
                Regenerate suggestions
              </button>
            </div>

            {/* Conversation Insights */}
            <div className="p-4 border-b border-slate-800/50">
              <h3 className="font-semibold text-slate-200 mb-3">Conversation Insights</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Summary</p>
                  <p className="text-xs text-slate-500">
                    Customer is interested in pricing and features. They have questions about implementation timeline.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Sentiment</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-400">Positive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Profile */}
            <div className="p-4 border-b border-slate-800/50">
              <h3 className="font-semibold text-slate-200 mb-3">Customer Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {activeChat.customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{activeChat.customer.name}</p>
                    <p className="text-xs text-slate-500">{activeChat.customer.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{activeChat.customer.location || "Location not available"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span>5 previous chats</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Actions */}
            <div className="p-4">
              <div className="space-y-3">
                <button
                  onClick={handleTakeOver}
                  disabled={activeChat.isHumanActive || takeoverLoading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {takeoverLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Taking Over...
                    </>
                  ) : (
                    'Take Over Chat'
                  )}
                </button>
                <button
                  onClick={handleReturnToAI}
                  disabled={!activeChat.isHumanActive || returnToAILoading}
                  className="w-full py-3 border border-slate-700 hover:border-slate-600 disabled:border-slate-800 disabled:cursor-not-allowed rounded-xl font-medium text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  {returnToAILoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                      Returning...
                    </>
                  ) : (
                    'Return to AI'
                  )}
                </button>
                <button className="w-full py-3 border border-slate-700 hover:border-slate-600 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
                  Mark as resolved
                </button>
                <button className="w-full py-3 border border-slate-700 hover:border-slate-600 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
                  Tag conversation
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Bot className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p className="text-slate-400 text-sm">Select a conversation to view AI insights</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}