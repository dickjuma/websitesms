"use client";

import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  CircleDot,
  Headphones,
  MessageSquare,
  RefreshCcw,
  Search,
  Send,
  User,
} from "lucide-react";

import { useAdminSocket } from "@/hooks/use-admin-socket";
import { useNotifications } from "@/hooks/use-notifications";
import { getSocketClient } from "@/lib/socket/client";
import type { OutboundMessagePayload } from "@/lib/socket/events";

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

interface ChatMessage {
  id: string;
  leadId: string;
  sessionId: string;
  sender: "user" | "bot" | "agent";
  message: string;
  timestamp: string;
  clientMessageId?: string;
}

let chatLeadsBootstrapPromise: Promise<LeadListItem[]> | null = null;
let chatLeadsBootstrapCache: LeadListItem[] | null = null;

const timeFormatter = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

function createClientMessageId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `agent-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeChatLeads(
  leads: Array<{
    id: string;
    name: string;
    email: string;
    status: string;
    isHumanActive: boolean;
    lastMessage: string;
    lastMessageAt: string;
  }>,
): LeadListItem[] {
  return leads
    .map((lead) => ({
      ...lead,
      unreadCount: 0,
    }))
    .sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
    );
}

async function fetchChatLeads(force = false): Promise<LeadListItem[]> {
  if (!force && chatLeadsBootstrapCache) {
    return chatLeadsBootstrapCache;
  }

  if (!force && chatLeadsBootstrapPromise) {
    return chatLeadsBootstrapPromise;
  }

  chatLeadsBootstrapPromise = fetch("/api/admin/leads?view=chat&limit=100", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to load live chat leads.");
      }

      const data = (await response.json()) as {
        leads: Array<{
          id: string;
          name: string;
          email: string;
          status: string;
          isHumanActive: boolean;
          lastMessage: string;
          lastMessageAt: string;
        }>;
      };

      const normalized = normalizeChatLeads(data.leads);
      chatLeadsBootstrapCache = normalized;
      return normalized;
    })
    .finally(() => {
      chatLeadsBootstrapPromise = null;
    });

  return chatLeadsBootstrapPromise;
}

function moveLeadToTop(
  leads: LeadListItem[],
  leadId: string,
  updater: (lead: LeadListItem) => LeadListItem,
) {
  const index = leads.findIndex((lead) => lead.id === leadId);
  if (index === -1) {
    return leads;
  }

  const nextLead = updater(leads[index]);
  const nextLeads = leads.slice();
  nextLeads.splice(index, 1);
  nextLeads.unshift(nextLead);
  return nextLeads;
}

function formatTime(dateString: string): string {
  return timeFormatter.format(new Date(dateString));
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
  if (days < 7) return `${days}d`;

  return dateFormatter.format(date);
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-3 w-32 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LiveChatsPage() {
  const initializedRef = useRef(false);
  const messagesRequestInFlightRef = useRef(false);
  const [leads, setLeads] = useState<LeadListItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferredValue(filter);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [requestedLeadId, setRequestedLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState("");
  const [takingOver, setTakingOver] = useState(false);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const loadLeads = useCallback(async (force = false) => {
    setLoadingLeads(true);

    try {
      if (force) {
        chatLeadsBootstrapCache = null;
      }

      const nextLeads = await fetchChatLeads(force);
      setLeads(nextLeads);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to load leads:", error);
      setIsConnected(false);
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  const loadMessages = useCallback(async (
    leadId: string,
    options?: { signal?: AbortSignal; silent?: boolean },
  ) => {
    if (messagesRequestInFlightRef.current) {
      return;
    }

    messagesRequestInFlightRef.current = true;

    if (!options?.silent) {
      setLoadingMessages(true);
    }

    try {
      const response = await fetch(`/api/admin/chat/${leadId}?limit=40`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        cache: "no-store",
        signal: options?.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to load chat messages.");
      }

      const data = (await response.json()) as {
        messages: ChatMessage[];
      };

      setMessages(data.messages || []);
      setIsConnected(true);
    } catch (error) {
      if (options?.signal?.aborted) {
        return;
      }

      console.error("Failed to load messages:", error);
      setIsConnected(false);
    } finally {
      messagesRequestInFlightRef.current = false;
      if (!options?.signal?.aborted && !options?.silent) {
        setLoadingMessages(false);
      }
    }
  }, []);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setRequestedLeadId(params.get("leadId"));
    }

    void loadLeads();
  }, [loadLeads]);

  useEffect(() => {
    if (!requestedLeadId) {
      return;
    }

    setActiveLeadId(requestedLeadId);
    setShowMobileChat(true);
  }, [requestedLeadId]);

  useEffect(() => {
    if (!activeLeadId) {
      setMessages([]);
      setIsAgentActive(false);
      return;
    }

    const controller = new AbortController();
    void loadMessages(activeLeadId, { signal: controller.signal });

    const intervalId = window.setInterval(() => {
      if (document.hidden) {
        return;
      }

      if (isAgentActive) {
        return;
      }

      if (sendingMessage.trim()) {
        return;
      }

      void loadMessages(activeLeadId, { silent: true });
    }, 30000);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [activeLeadId, isAgentActive, loadMessages, sendingMessage]);

  useEffect(() => {
    if (!activeLeadId) {
      setIsAgentActive(false);
      return;
    }

    const selectedLead = leads.find((lead) => lead.id === activeLeadId);
    setIsAgentActive(Boolean(selectedLead?.isHumanActive));
  }, [activeLeadId, leads]);

  const filteredLeads = useMemo(() => {
    if (!deferredFilter) {
      return leads;
    }

    const search = deferredFilter.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search),
    );
  }, [deferredFilter, leads]);

  const activeLead = useMemo(
    () => leads.find((lead) => lead.id === activeLeadId),
    [activeLeadId, leads],
  );

  const handleLeadClick = useCallback((leadId: string) => {
    setActiveLeadId(leadId);
    setShowMobileChat(true);
  }, []);

  const handleBackToList = useCallback(() => {
    setActiveLeadId(null);
    setShowMobileChat(false);
    setMessages([]);
  }, []);

  const handleTakeOver = useCallback(async () => {
    if (!activeLeadId) {
      return;
    }

    setTakingOver(true);
    setIsAIGenerating(true);

    try {
      const response = await fetch("/api/admin/takeover", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadId: activeLeadId }),
      });

      if (!response.ok) {
        throw new Error("Failed to take over chat.");
      }

      setIsAgentActive(true);
      setLeads((current) =>
        moveLeadToTop(current, activeLeadId, (lead) => ({
          ...lead,
          isHumanActive: true,
        })),
      );
    } catch (error) {
      console.error("Failed to take over chat:", error);
      setIsConnected(false);
    } finally {
      setTakingOver(false);
      setIsAIGenerating(false);
    }
  }, [activeLeadId]);

  const handleReturnToAI = useCallback(async () => {
    if (!activeLeadId) {
      return;
    }

    setIsAIGenerating(true);

    try {
      const response = await fetch("/api/admin/return-to-ai", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadId: activeLeadId }),
      });

      if (!response.ok) {
        throw new Error("Failed to return chat to AI.");
      }

      setIsAgentActive(false);
      setLeads((current) =>
        moveLeadToTop(current, activeLeadId, (lead) => ({
          ...lead,
          isHumanActive: false,
        })),
      );
    } catch (error) {
      console.error("Failed to return to AI:", error);
      setIsConnected(false);
    } finally {
      setIsAIGenerating(false);
    }
  }, [activeLeadId]);

  const handleSendMessage = useCallback(async () => {
    if (!sendingMessage.trim() || !activeLeadId || !isAgentActive) {
      return;
    }

    const messageText = sendingMessage.trim();
    const clientMessageId = createClientMessageId();
    const optimisticMessage: ChatMessage = {
      id: `pending-${clientMessageId}`,
      leadId: activeLeadId,
      sessionId: activeLeadId,
      sender: "agent",
      message: messageText,
      timestamp: new Date().toISOString(),
      clientMessageId,
    };

    setSendingMessage("");
    setMessages((current) => [...current, optimisticMessage]);
    setLeads((current) =>
      moveLeadToTop(current, activeLeadId, (lead) => ({
        ...lead,
        lastMessage: messageText,
        lastMessageAt: optimisticMessage.timestamp,
      })),
    );

    try {
      const response = await fetch(`/api/admin/chat/${activeLeadId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          clientMessageId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      const data = (await response.json()) as {
        message?: ChatMessage;
      };

      if (data.message) {
        setMessages((current) =>
          current.map((message) =>
            message.clientMessageId === clientMessageId ? data.message! : message,
          ),
        );
      } else {
        await loadMessages(activeLeadId);
      }

      setIsConnected(true);
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsConnected(false);

      setMessages((current) =>
        current.filter((message) => message.clientMessageId !== clientMessageId),
      );
    }
  }, [activeLeadId, isAgentActive, loadMessages, sendingMessage]);

  return (
    <div className="flex h-[calc(100vh-3rem)] gap-6">
      <div
        className={`
          flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white
          ${showMobileChat ? "hidden lg:flex lg:w-80" : "flex w-full lg:w-80"}
        `}
      >
        <div className="flex h-full w-full flex-col">
          <div className="border-b border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Conversations
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isConnected ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <button
                  onClick={() => void loadLeads(true)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  title="Refresh"
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingLeads ? (
              <SkeletonLoader />
            ) : filteredLeads.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500">
                No conversations yet
              </div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {filteredLeads.map((leadItem) => (
                  <li key={leadItem.id}>
                    <button
                      type="button"
                      onClick={() => handleLeadClick(leadItem.id)}
                      className={`w-full p-4 text-left transition ${
                        activeLeadId === leadItem.id
                          ? "bg-blue-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                            <User className="h-5 w-5 text-slate-500" />
                          </div>
                          {leadItem.unreadCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                              {leadItem.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="truncate font-medium text-slate-900">
                              {leadItem.name || "Anonymous"}
                            </p>
                            <span className="text-xs text-slate-400">
                              {leadItem.lastMessageAt
                                ? formatRelativeTime(leadItem.lastMessageAt)
                                : ""}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-sm text-slate-500">
                            {leadItem.lastMessage || "No messages"}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                leadItem.status === "new"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : leadItem.status === "contacted"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {leadItem.status}
                            </span>
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
      </div>

      <ChatWindow
        lead={activeLead}
        activeLeadId={activeLeadId}
        showMobileChat={showMobileChat}
        isAgentActive={isAgentActive}
        isAIGenerating={isAIGenerating}
        isConnected={isConnected}
        loadingMessages={loadingMessages}
        messages={messages}
        sendingMessage={sendingMessage}
        setSendingMessage={setSendingMessage}
        takingOver={takingOver}
        onBack={handleBackToList}
        onTakeOver={handleTakeOver}
        onReturnToAI={handleReturnToAI}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

interface ChatWindowProps {
  lead?: LeadListItem;
  activeLeadId: string | null;
  showMobileChat: boolean;
  isAgentActive: boolean;
  isAIGenerating: boolean;
  isConnected: boolean;
  loadingMessages: boolean;
  messages: ChatMessage[];
  sendingMessage: string;
  setSendingMessage: (value: string) => void;
  takingOver: boolean;
  onBack: () => void;
  onTakeOver: () => void;
  onReturnToAI: () => void;
  onSendMessage: () => void;
}

function ChatWindow({
  lead,
  activeLeadId,
  showMobileChat,
  isAgentActive,
  isAIGenerating,
  isConnected,
  loadingMessages,
  messages,
  sendingMessage,
  setSendingMessage,
  takingOver,
  onBack,
  onTakeOver,
  onReturnToAI,
  onSendMessage,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  if (!activeLeadId || !lead) {
    return (
      <div className="hidden flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white lg:flex">
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg font-medium text-slate-900">
              Select a conversation
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Choose a lead from the list to view the chat
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white
        ${!showMobileChat ? "hidden lg:flex" : "flex"}
      `}
    >
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <User className="h-5 w-5 text-slate-500" />
            </div>
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-slate-900">
                {lead.name || "Anonymous"}
              </h3>
              <p className="truncate text-sm text-slate-500">
                {lead.email || "No email"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isAgentActive ? (
              <button
                onClick={onReturnToAI}
                disabled={isAIGenerating}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60"
              >
                {isAIGenerating ? "Switching..." : "Return to AI"}
              </button>
            ) : (
              <button
                onClick={onTakeOver}
                disabled={takingOver}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {takingOver ? "Connecting..." : "Take Over Chat"}
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          {loadingMessages ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              Loading conversation...
            </div>
          ) : (
            <div className="space-y-4">
              {messages
              .filter((message) => message.sender !== "bot")
              .map((message) => (
                <ChatMessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {isAIGenerating && (
          <div className="px-6 py-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
              </div>
              <span>Updating chat status...</span>
            </div>
          </div>
        )}

        <div className="border-t border-slate-100 py-2 px-4 shrink-0">
          <div className="flex items-center gap-2 mr-12">
            <input
              type="text"
              value={sendingMessage}
              onChange={(event) => setSendingMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  onSendMessage();
                }
              }}
              placeholder="Type your message..."
              disabled={!isAgentActive}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={onSendMessage}
              disabled={!sendingMessage.trim() || !isAgentActive}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          {!isAgentActive && (
            <p className="mt-1 text-xs text-slate-500">
              Take over to send messages
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const ChatMessageBubble = memo(function ChatMessageBubble({
  message,
}: {
  message: ChatMessage;
}) {
  return (
    <div
      className={`flex ${
        message.sender === "agent" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
          message.sender === "agent"
            ? "bg-blue-600 text-white"
            : message.sender === "user"
              ? "bg-slate-100 text-slate-900"
              : "bg-emerald-100 text-emerald-900"
        }`}
      >
        <p className="text-sm">{message.message}</p>
        <p
          className={`mt-1 text-xs ${
            message.sender === "agent" ? "text-blue-200" : "text-slate-400"
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
});
