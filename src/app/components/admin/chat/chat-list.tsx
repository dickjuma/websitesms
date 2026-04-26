"use client";

import { memo, useEffect, useState, useRef, useCallback } from "react";
import {
  CircleDot,
  MessageSquare,
  RefreshCcw,
  Search,
  Sparkles,
  User,
  Headphones,
  Bot,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface LeadListItem {
  id: string;
  name: string;
  email: string;
  status: string;
  isHumanActive: boolean;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  avatar?: string;
  isTyping?: boolean;
}

interface ChatListProps {
  leads: LeadListItem[];
  loading: boolean;
  activeLeadId: string | null;
  onSelectLead: (leadId: string) => void;
  onRefresh: () => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const timeFormatter = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

function formatMessageTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return timeFormatter.format(date);
  }
  if (diffDays === 1) {
    return "Yesterday";
  }
  if (diffDays < 7) {
    return dateFormatter.format(date);
  }
  return date.toLocaleDateString();
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export const ChatList = memo(function ChatList({
  leads,
  loading,
  activeLeadId,
  onSelectLead,
  onRefresh,
  filter,
  onFilterChange,
}: ChatListProps) {
  const [localFilter, setLocalFilter] = useState(filter);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(localFilter);
    }, 300);
    return () => clearTimeout(timer);
  }, [localFilter, onFilterChange]);

  const filteredLeads = leads.filter((lead) => {
    const searchLower = localFilter.toLowerCase();
    return (
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      (lead.lastMessage && lead.lastMessage.toLowerCase().includes(searchLower))
    );
  });

  // Group conversations by date
  const groupedLeads = filteredLeads.reduce((groups, lead) => {
    const date = new Date(lead.lastMessageAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let groupKey = "Older";
    if (date.toDateString() === today.toDateString()) groupKey = "Today";
    else if (date.toDateString() === yesterday.toDateString()) groupKey = "Yesterday";
    else if (date > new Date(today.setDate(today.getDate() - 7))) groupKey = "This Week";

    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(lead);
    return groups;
  }, {} as Record<string, LeadListItem[]>);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (filteredLeads.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.min(focusedIndex + 1, filteredLeads.length - 1);
      setFocusedIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.max(focusedIndex - 1, 0);
      setFocusedIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      onSelectLead(filteredLeads[focusedIndex].id);
    }
  }, [filteredLeads, focusedIndex, onSelectLead]);

  useEffect(() => {
    setFocusedIndex(-1);
    itemRefs.current = itemRefs.current.slice(0, filteredLeads.length);
  }, [filteredLeads]);

  const getStatusIcon = (lead: LeadListItem) => {
    if (lead.isHumanActive) return <Headphones className="h-3 w-3 text-emerald-600" />;
    if (lead.status === "resolved") return <CheckCircle2 className="h-3 w-3 text-slate-500" />;
    return <Bot className="h-3 w-3 text-blue-600" />;
  };

  const getStatusText = (lead: LeadListItem) => {
    if (lead.isHumanActive) return "Human agent";
    if (lead.status === "resolved") return "Resolved";
    return "AI assistant";
  };

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="chat-list-heading" className="text-base font-semibold text-slate-900">
              Conversations
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {filteredLeads.length} of {leads.length} visible
            </p>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            aria-label="Refresh conversations"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
          </button>
        </div>
        <div className="relative mt-3">
          <label htmlFor="chat-search" className="sr-only">Search conversations</label>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id="chat-search"
            type="text"
            value={localFilter}
            onChange={(e) => setLocalFilter(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div
        className="flex-1 overflow-y-auto"
        role="region"
        aria-labelledby="chat-list-heading"
        onKeyDown={handleKeyDown}
      >
        {loading && leads.length === 0 ? (
          <div className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              <p className="text-xs text-slate-500">Loading conversations...</p>
            </div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageSquare className="mb-2 h-8 w-8 text-slate-300" aria-hidden="true" />
            <p className="text-sm font-medium text-slate-600">No conversations found</p>
            <p className="mt-1 text-xs text-slate-400">Try a different search term or refresh.</p>
          </div>
        ) : (
          <ul ref={listRef} className="divide-y divide-slate-100">
            {Object.entries(groupedLeads).map(([group, groupLeads]) => (
              <li key={group} className="pt-2 first:pt-0">
                <div className="sticky top-0 z-10 bg-white px-4 py-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {group}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {groupLeads.map((lead, idx) => {
                    const globalIndex = filteredLeads.findIndex(l => l.id === lead.id);
                    return (
                      <li key={lead.id}>
                        <button
                          ref={el => { itemRefs.current[globalIndex] = el; }}
                          type="button"
                          onClick={() => onSelectLead(lead.id)}
                          onFocus={() => setFocusedIndex(globalIndex)}
                          className={`group w-full text-left transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset ${
                            activeLeadId === lead.id
                              ? "bg-blue-50"
                              : "hover:bg-slate-50"
                          }`}
                          aria-label={`Conversation with ${lead.name || "Anonymous"}, ${lead.unreadCount > 0 ? `${lead.unreadCount} unread messages` : "read"}`}
                          aria-current={activeLeadId === lead.id ? "location" : undefined}
                        >
                          <div className="flex gap-3 px-4 py-3">
                            {/* Avatar */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                              {lead.avatar ? (
                                <img src={lead.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                              ) : (
                                <span className="text-sm font-medium">
                                  {getInitials(lead.name || "?")}
                                </span>
                              )}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="truncate text-sm font-medium text-slate-900">
                                  {lead.name || "Anonymous"}
                                </span>
                                <span className="shrink-0 text-[10px] text-slate-400">
                                  {formatMessageTime(lead.lastMessageAt)}
                                </span>
                              </div>
                              <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                                <span className="truncate">{lead.email || "No email"}</span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium">
                                  {getStatusIcon(lead)}
                                  <span>{getStatusText(lead)}</span>
                                </span>
                              </div>
                              {lead.lastMessage && (
                                <p className="mt-1 truncate text-xs text-slate-500">
                                  {lead.lastMessage}
                                </p>
                              )}
                              <div className="mt-1.5 flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-600">
                                  {lead.status || "open"}
                                </span>
                                {lead.unreadCount > 0 && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                                    <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                                    {lead.unreadCount} unread
                                  </span>
                                )}
                                {lead.isTyping && (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600">
                                    <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                                    Typing...
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});
