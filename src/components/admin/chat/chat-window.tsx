"use client";

import { memo, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Bot,
  Headphones,
  Send,
  Sparkles,
  User,
} from "lucide-react";

interface ChatMessage {
  id: string;
  leadId: string;
  sessionId: string;
  sender: "user" | "bot" | "agent";
  message: string;
  timestamp: string;
  clientMessageId?: string;
}

interface LeadInfo {
  id: string;
  name: string;
  email: string;
  status: string;
  isHumanActive: boolean;
}

interface ChatWindowProps {
  lead: LeadInfo | null;
  messages: ChatMessage[];
  loading: boolean;
  isAgentActive: boolean;
  sendingMessage: string;
  onSendMessage: () => void;
  onMessageChange: (msg: string) => void;
  onTakeOver: () => void;
  onReturnToAi: () => void;
  onBack: () => void;
}

const timeFormatter = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "2-digit",
});

function formatTime(dateString: string): string {
  return timeFormatter.format(new Date(dateString));
}

export const ChatWindow = memo(function ChatWindow({
  lead,
  messages,
  loading,
  isAgentActive,
  sendingMessage,
  onSendMessage,
  onMessageChange,
  onTakeOver,
  onReturnToAi,
  onBack,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!lead) {
    return (
      <div className="hidden flex-1 items-center justify-center rounded-[26px] border border-dashed border-slate-300 bg-white/70 lg:flex">
        <div className="text-center text-slate-500">
          <User className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="text-base font-semibold text-slate-700">Select a conversation</p>
          <p className="mt-1 text-sm text-slate-500">
            Pick a lead from the queue to review the full exchange.
          </p>
        </div>
      </div>
    );
  }

  const statusLabel = isAgentActive ? "Human takeover active" : "AI currently handling";

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-4 border-b border-slate-200/80 bg-slate-50/70 px-6 py-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 lg:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">
            {lead.name || "Anonymous"}
          </h3>
          <p className="text-sm text-slate-500">{lead.email || "No email"}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                isAgentActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isAgentActive ? (
                <Headphones className="h-3 w-3" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              {statusLabel}
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
              {lead.status || "open"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAgentActive ? (
            <button
              type="button"
              onClick={onReturnToAi}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
            >
              <Headphones className="h-4 w-4" />
              <span>Return to AI</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onTakeOver}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Headphones className="h-4 w-4" />
              <span>Take Over Chat</span>
            </button>
          )}
        </div>
      </div>

      <div className="admin-scrollbar flex-1 overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No messages yet
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isAgent = message.sender === "agent";
              const isBot = message.sender === "bot";
              const senderLabel = isAgent
                ? "Agent"
                : isBot
                  ? "AI assistant"
                  : "Visitor";
              const SenderIcon = isAgent ? Headphones : isBot ? Bot : User;

              return (
                <div
                  key={message.id}
                  className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-[22px] px-4 py-3 shadow-sm sm:max-w-[72%] ${
                      isAgent
                        ? "bg-slate-950 text-white"
                        : isBot
                          ? "border border-blue-100 bg-blue-50 text-blue-950"
                          : "border border-slate-200 bg-white text-slate-900"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
                          isAgent
                            ? "bg-white/10 text-white"
                            : isBot
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <SenderIcon className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                            isAgent ? "text-slate-300" : "text-slate-500"
                          }`}
                        >
                          {senderLabel}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-6">{message.message}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="border-t border-slate-200/80 px-6 py-4">
        <p className="mb-3 text-xs font-medium text-slate-500">
          {isAgentActive
            ? "You are in control of this conversation. Replies will be sent as a live admin message."
            : "AI is still handling this thread. Take over the chat to respond manually."}
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={sendingMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
            placeholder={isAgentActive ? "Type a message..." : "Take over to send messages"}
            disabled={!isAgentActive}
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 disabled:bg-slate-50"
          />
          <button
            type="button"
            onClick={onSendMessage}
            disabled={!sendingMessage.trim() || !isAgentActive}
            className="rounded-2xl bg-slate-950 px-4 py-3 text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});
