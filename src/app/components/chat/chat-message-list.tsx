"use client";

import { useEffect, useRef } from "react";
import type { MessageDto } from "@/lib/chat/types";
import { TypingIndicator } from "@/components/chat/typing-indicator";

interface ChatMessageListProps {
  messages: MessageDto[];
  viewer: "user" | "agent";
  typingLabel?: string | null;
  className?: string;
}

function formatTimestamp(timestamp: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function ChatMessageList({
  messages,
  viewer,
  typingLabel,
  className = "",
}: ChatMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingLabel]);

  return (
    <section className={`space-y-4 overflow-y-auto ${className}`}>
      {messages.map((message) => {
        const isOwn =
          viewer === "user"
            ? message.sender === "user"
            : message.sender === "agent";

        const bubbleClass = isOwn
          ? "bg-slate-800 text-white"
          : message.sender === "agent"
            ? "border border-slate-200 bg-slate-50 text-slate-800"
            : message.sender === "bot"
              ? "border border-slate-200 bg-white text-slate-800"
              : "border border-amber-200 bg-amber-50 text-slate-900";

        const label =
          message.sender === "user"
            ? "You"
            : message.sender === "agent"
              ? "Agent"
              : "AI";

        return (
          <article
            key={message.id}
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] space-y-1 ${isOwn ? "items-end" : ""}`}>
              <div
                className={`rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${
                  isOwn ? "rounded-br-md" : "rounded-bl-md"
                } ${bubbleClass}`}
              >
                {message.message}
              </div>
              <div
                className={`px-2 text-[10px] text-slate-400 ${
                  isOwn ? "text-right" : "text-left"
                }`}
              >
                {label} • {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </article>
        );
      })}

      {typingLabel && <TypingIndicator label={typingLabel} />}
      <div ref={scrollRef} aria-hidden="true" />
    </section>
  );
}
