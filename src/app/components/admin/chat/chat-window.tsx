"use client";

import { memo, useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowLeft,
  Bot,
  Send,
  Sparkles,
  User,
  Paperclip,
  Check,
  CheckCheck,
  Loader2,
  MessageSquare,
} from "lucide-react";

interface ChatMessage {
  id: string;
  leadId: string;
  sessionId: string;
  sender: "user" | "bot" | "agent";
  message: string;
  timestamp: string;
  clientMessageId?: string;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface LeadInfo {
  id: string;
  name: string;
  email: string;
  status: string;
  isHumanActive: boolean;
  isTyping?: boolean;
}

interface ChatWindowProps {
  lead: LeadInfo | null;
  messages: ChatMessage[];
  loading: boolean;
  hasMoreMessages: boolean;
  totalMessages: number;
  visibleMessages: number;
  loadingMoreMessages?: boolean;
  isAgentActive: boolean;
  sendingMessage: string;
  onSendMessage: (message: string) => void;
  onMessageChange: (message: string) => void;
  onTakeOver: (leadId: string) => void;
  onReturnToAi: (leadId: string) => void;
  onBack: () => void;
  onLoadMoreMessages: () => void;
  onAttachFile?: (file: File) => void;
  isUploading?: boolean;
}

function groupMessagesByDate(messages: ChatMessage[]) {
  const groups: { date: string; messages: ChatMessage[] }[] = [];
  let currentDate = "";

  for (const msg of messages) {
    const msgDate = new Date(msg.timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groups.push({ date: msgDate, messages: [msg] });
    } else {
      groups[groups.length - 1].messages.push(msg);
    }
  }

  return groups;
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

const ChatWindow = memo(function ChatWindow({
  lead,
  messages,
  loading,
  hasMoreMessages,
  totalMessages,
  visibleMessages,
  loadingMoreMessages,
  isAgentActive,
  sendingMessage,
  onSendMessage,
  onMessageChange,
  onTakeOver,
  onReturnToAi,
  onBack,
  onLoadMoreMessages,
  onAttachFile,
  isUploading = false,
}: ChatWindowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoScrollRef = useRef(true);
  const distanceFromBottomRef = useRef(0);
  const [isFocused, setIsFocused] = useState(false);

  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    autoScrollRef.current = true;
    distanceFromBottomRef.current = 0;
  }, [lead?.id]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    if (autoScrollRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    container.scrollTop =
      container.scrollHeight - container.clientHeight - distanceFromBottomRef.current;
  }, [messages]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      const distance =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      distanceFromBottomRef.current = Math.max(distance, 0);
      autoScrollRef.current = distanceFromBottomRef.current < 100;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = useCallback(() => {
    if (!sendingMessage.trim()) return;
    onSendMessage(sendingMessage);
  }, [sendingMessage, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onAttachFile) {
        onAttachFile(file);
        e.target.value = "";
      }
    },
    [onAttachFile]
  );

  if (!lead) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <MessageSquare className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-slate-600">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{lead.name}</h3>
            <p className="text-sm text-slate-500">{lead.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {lead.isHumanActive && (
            <button
              onClick={() => onReturnToAi(lead.id)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Return to AI
            </button>
          )}
          {!lead.isHumanActive && (
            <button
              onClick={() => onTakeOver(lead.id)}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Take Over
            </button>
          )}
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        {hasMoreMessages && visibleMessages < totalMessages && (
          <div className="mb-4 text-center">
            <button
              onClick={onLoadMoreMessages}
              disabled={loadingMoreMessages}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              {loadingMoreMessages ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                `Load earlier messages (${totalMessages - visibleMessages} more)`
              )}
            </button>
          </div>
        )}

        {loading && messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="space-y-6">
            {groupedMessages.map((group) => (
              <div key={group.date}>
                <div className="mb-4 text-center">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                    {group.date}
                  </span>
                </div>
                <div className="space-y-4">
                  {group.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" || msg.sender === "agent"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[75%] items-end gap-2 ${
                          msg.sender === "user" || msg.sender === "agent"
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                            msg.sender === "user" || msg.sender === "agent"
                              ? "bg-blue-600"
                              : "bg-slate-200"
                          }`}
                        >
                          {msg.sender === "user" || msg.sender === "agent" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-slate-600" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              msg.sender === "user" || msg.sender === "agent"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-900"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.message}</p>
                          </div>
                          <div
                            className={`mt-1 flex items-center gap-1 text-xs text-slate-400 ${
                              msg.sender === "user" || msg.sender === "agent"
                                ? "justify-end"
                                : ""
                            }`}
                          >
                            <span>{formatTime(msg.timestamp)}</span>
                            {(msg.sender === "user" || msg.sender === "agent") && (
                              <span>
                                {msg.status === "sending" && (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                )}
                                {msg.status === "sent" && <Check className="h-3 w-3" />}
                                {msg.status === "delivered" && (
                                  <CheckCheck className="h-3 w-3" />
                                )}
                                {msg.status === "read" && (
                                  <CheckCheck className="h-3 w-3 text-blue-500" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {lead.isTyping && (
        <div className="flex items-center gap-2 border-t border-slate-200 px-4 py-2 text-sm text-slate-500">
          <Sparkles className="h-4 w-4 animate-pulse text-blue-600" />
          <span>AI is typing...</span>
        </div>
      )}

      <div className="border-t border-slate-200 p-4">
        <div className="relative flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2">
          {onAttachFile && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                aria-label="Attach file"
              >
                {isUploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Paperclip className="h-5 w-5" />
                )}
              </button>
            </>
          )}
          <textarea
            ref={textareaRef}
            value={sendingMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            className="max-h-32 min-h-[44px] w-full resize-none bg-transparent px-2 py-2 text-slate-900 placeholder-slate-400 focus:outline-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!sendingMessage.trim()}
            className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-center text-[10px] text-slate-400">
          Press <kbd className="rounded bg-slate-100 px-1">Ctrl</kbd> + <kbd className="rounded bg-slate-100 px-1">Enter</kbd> to send
        </p>
      </div>
    </div>
  );
});

export default memo(ChatWindow);