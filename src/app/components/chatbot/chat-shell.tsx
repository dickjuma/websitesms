"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Bot,
  User,
  Headphones,
  X,
  Minimize2,
  Globe,
} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import {
  supportedLanguages,
  translations,
  detectUserLanguage,
  type Language,
} from "@/lib/chat/translations";
import { usePolling } from "@/hooks/use-polling";
import {
  ensureSocketBootstrap,
  joinChatRoom,
  sendTyping as socketSendTyping,
} from "@/lib/socket/client";

type Sender = "user" | "ai" | "admin" | "system";

interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: string;
}

interface ChatShellProps {
  variant?: "floating" | "page";
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function ensureSessionIds() {
  if (typeof window === "undefined") {
    return { sessionId: "", visitorId: "" };
  }

  let visitorId = localStorage.getItem("sma-visitor-id");
  if (!visitorId) {
    visitorId = `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem("sma-visitor-id", visitorId);
  }

  let sessionId = localStorage.getItem("sma-session-id");
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem("sma-session-id", sessionId);
  }

  return { sessionId, visitorId };
}

function mapMessages(rawMessages: any[]): ChatMessage[] {
  return rawMessages.map((message) => ({
    id: message.id || message._id || createId(),
    sender:
      message.sender === "bot"
        ? "ai"
        : message.sender === "agent"
          ? "admin"
          : message.sender,
    text: message.message || message.text,
    timestamp: message.timestamp || new Date().toISOString(),
  }));
}

function groupMessages(messages: ChatMessage[]) {
  const groups: Array<{
    id: string;
    sender: Sender;
    items: ChatMessage[];
  }> = [];

  const MAX_GAP_MS = 3 * 60 * 1000;

  messages.forEach((message) => {
    const lastGroup = groups[groups.length - 1];
    if (!lastGroup) {
      groups.push({ id: message.id, sender: message.sender, items: [message] });
      return;
    }

    const lastMessage = lastGroup.items[lastGroup.items.length - 1];
    const gap =
      new Date(message.timestamp).getTime() -
      new Date(lastMessage.timestamp).getTime();

    if (lastGroup.sender === message.sender && gap <= MAX_GAP_MS) {
      lastGroup.items.push(message);
    } else {
      groups.push({ id: message.id, sender: message.sender, items: [message] });
    }
  });

  return groups;
}

function getTranslation(lang: Language, key: string): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

function normalizeSender(sender: string): Sender {
  if (sender === "bot") return "ai";
  if (sender === "agent") return "admin";
  return sender as Sender;
}

function sortChatMessages(items: ChatMessage[]) {
  return [...items].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}

function areMessagesEqual(left: ChatMessage[], right: ChatMessage[]) {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((message, index) => {
    const candidate = right[index];
    return (
      message.id === candidate.id &&
      message.sender === candidate.sender &&
      message.text === candidate.text &&
      message.timestamp === candidate.timestamp
    );
  });
}

function upsertRealtimeMessage(
  existingMessages: ChatMessage[],
  payload: {
    id: string;
    sender: string;
    message: string;
    timestamp?: string;
    clientMessageId?: string;
  },
) {
  const nextMessage: ChatMessage = {
    id: payload.id,
    sender: normalizeSender(payload.sender),
    text: payload.message,
    timestamp: payload.timestamp || new Date().toISOString(),
  };

  const exactIndex = existingMessages.findIndex((message) => message.id === payload.id);
  if (exactIndex >= 0) {
    const updated = [...existingMessages];
    updated[exactIndex] = nextMessage;
    return sortChatMessages(updated);
  }

  if (payload.clientMessageId) {
    const optimisticIndex = existingMessages.findIndex(
      (message) => message.id === payload.clientMessageId,
    );
    if (optimisticIndex >= 0) {
      const updated = [...existingMessages];
      updated[optimisticIndex] = nextMessage;
      return sortChatMessages(updated);
    }
  }

  return sortChatMessages([...existingMessages, nextMessage]);
}

export function ChatShell({ variant = "floating" }: ChatShellProps) {
  const [isOpen, setIsOpen] = useState(variant === "page");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [systemMessages, setSystemMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isHumanActive, setIsHumanActive] = useState(false);
  const [connectionLabel, setConnectionLabel] = useState("Online");
  const [sessionId, setSessionId] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [leadId, setLeadId] = useState("");
  const [siteLogoUrl, setSiteLogoUrl] = useState("/images/logo.png");
  const [language, setLanguage] = useState<Language>("en");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoScrollRef = useRef(true);
  const distanceFromBottomRef = useRef(0);
  const previousHumanState = useRef(false);
  const leadIdRef = useRef("");

  useEffect(() => {
    leadIdRef.current = leadId;
  }, [leadId]);

  useEffect(() => {
    const ids = ensureSessionIds();
    setSessionId(ids.sessionId);
    setVisitorId(ids.visitorId);

    fetch("/api/site", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.logoUrl) {
          setSiteLogoUrl(data.data.logoUrl);
        }
      })
      .catch(console.error);

    const savedLang = localStorage.getItem("sma-chat-lang") as Language;
    if (savedLang && supportedLanguages.some(l => l.code === savedLang)) {
      setLanguage(savedLang);
    } else {
      const detected = detectUserLanguage();
      setLanguage(detected);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!sessionId) return;

    try {
      const url = `/api/chat/session?sessionId=${sessionId}${
        visitorId ? `&visitorId=${visitorId}` : ""
      }`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        setConnectionLabel("Connecting...");
        return;
      }

      const data = await res.json();
      const mapped = Array.isArray(data.messages) ? sortChatMessages(mapMessages(data.messages)) : [];

      setMessages((current) => (areMessagesEqual(current, mapped) ? current : mapped));
      setIsTyping(data.session?.status === "ai_processing");
      setIsHumanActive(Boolean(data.lead?.isHumanActive));
      setLeadId(data.lead?.id || "");
      setConnectionLabel("Online");
      return data;
    } catch (error) {
      console.error("Failed to fetch chat:", error);
      setConnectionLabel("Connecting...");
      return null;
    }
  }, [sessionId, visitorId]);

  useEffect(() => {
    if (!isOpen || !sessionId) return;

    fetchMessages();
  }, [isOpen, sessionId, visitorId, fetchMessages]);

  usePolling({
    url: `/api/chat/session?sessionId=${sessionId}${visitorId ? `&visitorId=${visitorId}` : ""}`,
    interval: 5000,
    enabled: isOpen && !!sessionId,
    onData: (data) => {
      if (!data?.messages) return;
      const mapped = sortChatMessages(mapMessages(data.messages));
      setMessages((current) => (areMessagesEqual(current, mapped) ? current : mapped));
      setIsTyping(data.session?.status === "ai_processing");
      setIsHumanActive(Boolean(data.lead?.isHumanActive));
      if (data.lead?.id) setLeadId(data.lead.id);
    },
  });

  useEffect(() => {
    if (previousHumanState.current !== isHumanActive && isHumanActive) {
      setSystemMessages((current) => [
        ...current,
        {
          id: `system-${Date.now()}`,
          sender: "system",
          text: "Support agent joined the conversation.",
          timestamp: new Date().toISOString(),
        },
      ]);
      autoScrollRef.current = true;
    }
    previousHumanState.current = isHumanActive;
  }, [isHumanActive]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const handleScroll = () => {
      const container = scrollRef.current;
      if (!container) return;
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      distanceFromBottomRef.current = Math.max(distanceFromBottom, 0);
      autoScrollRef.current = distanceFromBottom < 120;
    };

    const container = scrollRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    if (autoScrollRef.current) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    container.scrollTop =
      container.scrollHeight - container.clientHeight - distanceFromBottomRef.current;
  }, [messages, systemMessages, isTyping]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
  }, [inputValue]);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || !sessionId || isLoading) return;

    const messageText = inputValue.trim();
    const tempId = createId();
    const optimistic: ChatMessage = {
      id: tempId,
      sender: "user",
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);
    autoScrollRef.current = true;

    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId: leadIdRef.current || undefined,
          sessionId,
          visitorId,
          message: messageText,
          clientMessageId: tempId,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      const payload = await response.json();

      if (payload.lead?.id) {
        setLeadId(payload.lead.id);
      }

      if (Array.isArray(payload.messages)) {
        setMessages(sortChatMessages(mapMessages(payload.messages)));
      }

      setIsHumanActive(Boolean(payload.lead?.isHumanActive));
      setConnectionLabel("Online");

    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [inputValue, isLoading, sessionId, visitorId, language]);

  const mergedMessages = useMemo(() => {
    const combined = [...messages, ...systemMessages];
    combined.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
    return combined;
  }, [messages, systemMessages]);

  const messageGroups = useMemo(
    () => groupMessages(mergedMessages),
    [mergedMessages],
  );

  const headerLabel = isHumanActive ? getTranslation(language, "chat.header_agent") : getTranslation(language, "chat.header_online");
  const headerStatus = isHumanActive
    ? getTranslation(language, "chat.agent_joined")
    : getTranslation(language, "chat.ai_typing").replace("typing", "ready to help");

  const showWindow = variant === "page" || isOpen;

  return (
    <>
      {variant === "floating" ? (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="fixed bottom-6 right-6 z-[60] inline-flex h-12 sm:h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-white shadow-lg transition hover:bg-blue-700"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Image
              src={siteLogoUrl}
              alt="SMA"
              width={20}
              height={20}
              className="object-contain"
            />
          )}
          <span className="text-sm font-medium">Chat</span>
        </button>
      ) : null}

      {showWindow ? (
        <div
          className={clsx(
            "flex flex-col overflow-hidden border border-slate-200 bg-white",
            variant === "floating"
              ? "fixed bottom-20 sm:bottom-24 right-4 top-auto z-[55] h-[70vh] sm:h-[600px] max-h-[700px] w-[calc(100vw-16px)] sm:w-[380px] md:w-[420px] rounded-xl shadow-[0_8px_25px_rgba(15,23,42,0.12)]"
              : "z-40 h-[calc(100vh-0px)] w-full rounded-none",
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                {isHumanActive ? (
                  <Headphones className="h-5 w-5 text-slate-700" />
                ) : (
                  <Bot className="h-5 w-5 text-slate-700" />
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">SMA Support</p>
                <p className="text-sm text-slate-500">
                  {headerLabel} • {connectionLabel}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                  aria-label={getTranslation(language, "chat.language")}
                >
                  <Globe className="h-4 w-4" />
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 border-b border-slate-100">
                      {getTranslation(language, "chat.select_language")}
                    </div>
                    {supportedLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          localStorage.setItem("sma-chat-lang", lang.code);
                          setShowLangMenu(false);
                        }}
                        className={clsx(
                          "w-full px-3 py-2 text-left text-sm hover:bg-slate-50",
                          language === lang.code ? "bg-blue-50 text-blue-600 font-medium" : "text-slate-700"
                        )}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {variant === "page" ? (
                <a
                  href="/site"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                  aria-label="Back to site"
                >
                  <ArrowLeft className="h-4 w-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="border-b border-slate-100 px-4 py-2 text-xs text-slate-500">
            {headerStatus}
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-[#f9fafb] px-4 py-6"
          >
            {messageGroups.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white">
                  <Bot className="h-5 w-5 text-slate-500" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-800">
                  {getTranslation(language, "chat.welcome")}
                </p>
                <p className="mt-2 max-w-[260px] text-xs text-slate-500">
                  {getTranslation(language, "chat.welcome_subtitle")}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messageGroups.map((group) => (
                  <MessageGroup key={group.id} group={group} language={language} />
                ))}
                {isTyping ? (
                  <TypingIndicator isHumanActive={isHumanActive} language={language} />
                ) : null}
                <div ref={endRef} />
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-3">
            <div className="flex items-end gap-2">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
                aria-label="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void handleSend();
                    }
                  }}
                  placeholder={getTranslation(language, "chat.type_placeholder")}
                  className="w-full resize-none text-sm text-slate-800 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-60"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              {getTranslation(language, "chat.enter_hint")}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MessageGroup({ group, language }: { group: { sender: Sender; items: ChatMessage[] }; language: Language }) {
  const isUser = group.sender === "user";
  const isAgent = group.sender === "admin";
  const isSystem = group.sender === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          {group.items[0]?.text}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white">
          {isAgent ? (
            <Headphones className="h-4 w-4 text-slate-700" />
          ) : (
            <Bot className="h-4 w-4 text-slate-700" />
          )}
        </div>
      ) : null}
      <div className="max-w-[75%] space-y-2">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
          {isUser ? getTranslation(language, "chat.you") : isAgent ? getTranslation(language, "chat.agent") : getTranslation(language, "chat.ai")}
        </p>
        {group.items.map((item) => (
          <div
            key={item.id}
            className={clsx(
              "rounded-2xl px-3 py-2 text-xs leading-5",
              isUser
                ? "bg-slate-900 text-white"
                : isAgent
                  ? "border border-slate-200 bg-white text-slate-900"
                  : "border border-slate-200 bg-slate-50 text-slate-800",
            )}
          >
            <p className="whitespace-pre-wrap">{item.text}</p>
            <p className="mt-1 text-[10px] text-slate-400">
              {formatTime(item.timestamp)}
            </p>
          </div>
        ))}
      </div>
      {isUser ? (
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white">
          <User className="h-4 w-4 text-slate-700" />
        </div>
      ) : null}
    </div>
  );
}

function TypingIndicator({ isHumanActive, language }: { isHumanActive: boolean; language: Language }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:120ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:240ms]" />
      </div>
      <span>{isHumanActive ? getTranslation(language, "chat.agent_typing") : getTranslation(language, "chat.ai_typing")}</span>
    </div>
  );
}
