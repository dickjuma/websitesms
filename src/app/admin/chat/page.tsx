"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Headphones,
  MessageSquare,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

import { ChatList } from "@/components/admin/chat/chat-list";
import { ChatWindow } from "@/components/admin/chat/chat-window";
import {
  AdminHero,
  AdminPanel,
  AdminStatCard,
} from "@/components/admin/ui/primitives";

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

let chatLeadsCache: LeadListItem[] = [];
let chatLeadsPromise: Promise<LeadListItem[]> | null = null;

async function fetchChatLeads(): Promise<LeadListItem[]> {
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

async function fetchMessages(leadId: string): Promise<ChatMessage[]> {
  const res = await fetch(`/api/admin/chat/${leadId}?limit=40`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.messages || [];
}

export default function AdminChatPage() {
  const [leads, setLeads] = useState<LeadListItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [filter, setFilter] = useState("");
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState("");
  const [isAgentActive, setIsAgentActive] = useState(false);

  const activeLead = leads.find((lead) => lead.id === activeLeadId) || null;

  const filteredLeadCount = leads.filter((lead) => {
    const query = filter.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      lead.name.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.lastMessage.toLowerCase().includes(query)
    );
  }).length;

  const loadLeads = useCallback(async () => {
    setLoadingLeads(true);

    try {
      const data = await fetchChatLeads();
      setLeads(data);
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const handleSelectLead = useCallback(
    async (leadId: string) => {
      setActiveLeadId(leadId);
      setMessages([]);
      setLoadingMessages(true);

      const selectedLead = leads.find((lead) => lead.id === leadId) ?? null;
      setIsAgentActive(Boolean(selectedLead?.isHumanActive));

      try {
        const loadedMessages = await fetchMessages(leadId);
        setMessages(loadedMessages);
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoadingMessages(false);
      }
    },
    [leads],
  );

  const handleRefresh = useCallback(() => {
    chatLeadsCache = [];
    chatLeadsPromise = null;
    void loadLeads();
  }, [loadLeads]);

  const handleSendMessage = useCallback(async () => {
    if (!sendingMessage.trim() || !activeLeadId || !isAgentActive) {
      return;
    }

    const messageText = sendingMessage.trim();
    const tempId = `temp-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        leadId: activeLeadId,
        sessionId: activeLeadId,
        sender: "agent",
        message: messageText,
        timestamp: new Date().toISOString(),
      },
    ]);
    setSendingMessage("");

    try {
      const res = await fetch(`/api/admin/chat/${activeLeadId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      const loadedMessages = await fetchMessages(activeLeadId);
      setMessages(loadedMessages);
    } catch (err) {
      console.error("Failed to send:", err);
      setMessages((prev) => prev.filter((message) => message.id !== tempId));
    }
  }, [activeLeadId, isAgentActive, sendingMessage]);

  const handleTakeOver = useCallback(async () => {
    if (!activeLeadId) {
      return;
    }

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
        throw new Error("Failed to activate takeover");
      }

      setIsAgentActive(true);
      setLeads((current) =>
        current.map((lead) =>
          lead.id === activeLeadId ? { ...lead, isHumanActive: true } : lead,
        ),
      );
    } catch (err) {
      console.error("Failed to take over chat:", err);
    }
  }, [activeLeadId]);

  const handleReturnToAi = useCallback(async () => {
    if (!activeLeadId) {
      return;
    }

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
        throw new Error("Failed to return chat to AI");
      }

      setIsAgentActive(false);
      setLeads((current) =>
        current.map((lead) =>
          lead.id === activeLeadId ? { ...lead, isHumanActive: false } : lead,
        ),
      );
    } catch (err) {
      console.error("Failed to return chat to AI:", err);
    }
  }, [activeLeadId]);

  const handleBack = useCallback(() => {
    setActiveLeadId(null);
    setMessages([]);
    setIsAgentActive(false);
  }, []);

  return (
    <main className="space-y-6">
      <AdminHero
        badge="Live support"
        title="Own the handoff between AI and human support"
        description="Review live conversations, step into priority chats, and keep context intact while moving between automated and human handling."
        icon={MessageSquare}
        tone="blue"
        meta={[
          { label: "Open threads", value: `${leads.length} conversations` },
          {
            label: "Human active",
            value: `${leads.filter((lead) => lead.isHumanActive).length} takeover sessions`,
          },
          { label: "Visible now", value: `${filteredLeadCount} matching search` },
        ]}
        actions={
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loadingLeads}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-60"
          >
            <RefreshCcw className={`h-4 w-4 ${loadingLeads ? "animate-spin" : ""}`} />
            Refresh queue
          </button>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Conversation queue"
          value={leads.length}
          detail="Total lead conversations available for review."
          icon={MessageSquare}
          tone="blue"
        />
        <AdminStatCard
          label="Human takeover"
          value={leads.filter((lead) => lead.isHumanActive).length}
          detail="Chats currently handled by a person."
          icon={Headphones}
          tone="emerald"
        />
        <AdminStatCard
          label="Needs review"
          value={leads.filter((lead) => !lead.isHumanActive).length}
          detail="AI-managed threads you can step into if needed."
          icon={Sparkles}
          tone="amber"
        />
      </section>

      <AdminPanel
        title="Conversation workspace"
        description="Browse the queue on the left and inspect the full conversation on the right."
        contentClassName="p-3"
      >
        <div className="flex min-h-[720px] gap-3">
          <div
            className={`flex-shrink-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white ${
              activeLeadId ? "hidden lg:flex lg:w-96" : "flex w-full lg:w-96"
            }`}
          >
            <ChatList
              leads={leads}
              loading={loadingLeads}
              activeLeadId={activeLeadId}
              onSelectLead={handleSelectLead}
              onRefresh={handleRefresh}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>

          <ChatWindow
            lead={activeLead}
            messages={messages}
            loading={loadingMessages}
            isAgentActive={isAgentActive}
            sendingMessage={sendingMessage}
            onSendMessage={handleSendMessage}
            onMessageChange={setSendingMessage}
            onTakeOver={handleTakeOver}
            onReturnToAi={handleReturnToAi}
            onBack={handleBack}
          />
        </div>
      </AdminPanel>
    </main>
  );
}
