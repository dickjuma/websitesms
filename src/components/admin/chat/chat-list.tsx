"use client";

import { memo, useEffect, useState } from "react";
import {
  CircleDot,
  MessageSquare,
  RefreshCcw,
  Search,
  Sparkles,
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

  return dateFormatter.format(date);
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

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onFilterChange(localFilter);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [localFilter, onFilterChange]);

  const filteredLeads = leads.filter((lead) => {
    const searchLower = localFilter.toLowerCase();
    return (
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      (lead.lastMessage && lead.lastMessage.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-slate-200/80 bg-slate-50/70 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Conversations</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredLeads.length} of {leads.length} visible
            </p>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:text-slate-900 disabled:opacity-50"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localFilter}
            onChange={(e) => setLocalFilter(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      <div className="admin-scrollbar flex-1 overflow-y-auto">
        {loading && leads.length === 0 ? (
          <div className="flex items-center justify-center p-8 text-sm text-slate-500">
            Loading...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageSquare className="mb-2 h-8 w-8 text-slate-300" />
            <p className="text-sm font-medium text-slate-600">No conversations found</p>
            <p className="mt-1 text-xs text-slate-400">
              Try a different search term or refresh the queue.
            </p>
          </div>
        ) : (
          <div className="space-y-2 p-3">
            {filteredLeads.map((lead) => (
              <button
                key={lead.id}
                type="button"
                onClick={() => onSelectLead(lead.id)}
                className={`w-full rounded-3xl border p-4 text-left transition ${
                  activeLeadId === lead.id
                    ? "border-blue-200 bg-gradient-to-r from-blue-50 via-white to-cyan-50 shadow-sm"
                    : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-slate-900">
                        {lead.name || "Anonymous"}
                      </span>
                      {lead.isHumanActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                          <CircleDot className="h-3 w-3" />
                          Human
                        </span>
                      ) : null}
                    </div>
                    <p className="truncate text-xs text-slate-500">
                      {lead.email || "No email"}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {formatMessageTime(lead.lastMessageAt)}
                  </span>
                </div>
                {lead.lastMessage ? (
                  <p className="mt-2 truncate text-sm text-slate-500">
                    {lead.lastMessage}
                  </p>
                ) : null}
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    {lead.status || "open"}
                  </span>
                  {lead.unreadCount > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                      <Sparkles className="h-3 w-3" />
                      {lead.unreadCount} unread
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
