"use client";

import { useEffect, useMemo, useState } from "react";
import { Cookie, MessageCircle, Plus, RefreshCcw, X } from "lucide-react";

import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { LeadDetailsForm } from "@/components/chat/lead-details-form";
import { useLeadRoomSocket } from "@/hooks/use-lead-room-socket";
import { usePageTracking } from "@/hooks/use-page-tracking";
import type {
  ChatSessionDto,
  LeadDto,
  LeadInput,
  MessageDto,
} from "@/lib/chat/types";
import { persistVisitorId, getDeviceInfo, getStoredVisitorId, initializeVisitor } from "@/lib/chat/identity";
import { getSocketClient } from "@/lib/socket/client";

const SESSION_ID_STORAGE_KEY = "sma-chat-session-id";
const LEAD_DETAILS_STORAGE_KEY = "sma-chat-lead-details";
const CHAT_CACHE_PREFIX = "sma-chat-cache:";
const QUICK_PROMPTS = [
  "What do you build for SMEs?",
  "How much does a CRM system start at?",
  "Can you build custom ERP or POS tools?",
  "How do I talk to a human agent?",
];

type ChatSnapshot = {
  lead: LeadDto;
  session: ChatSessionDto;
  sessions: ChatSessionDto[];
  messages: MessageDto[];
};

function createLocalMessage(message: string): MessageDto {
  return {
    id: `local-${message}`,
    leadId: "local",
    sessionId: "local",
    sender: "bot",
    message,
    timestamp: new Date().toISOString(),
  };
}

function createClientMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `client-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function mergeMessages(current: MessageDto[], incoming: MessageDto[]) {
  const next = [...current];

  for (const message of incoming) {
    const existingIndex = next.findIndex(
      (item) =>
        item.id === message.id ||
        (message.clientMessageId &&
          item.clientMessageId === message.clientMessageId),
    );

    if (existingIndex >= 0) {
      next[existingIndex] = message;
    } else {
      next.push(message);
    }
  }

  return next
    .filter(
      (message, index, array) =>
        array.findIndex((item) => item.id === message.id) === index,
    )
    .sort(
      (left, right) =>
        new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime(),
    );
}

function getDefaultMessages() {
  return [
    createLocalMessage(
      "Hello. I can help with pricing, scope, and next steps.",
    ),
  ];
}

function getChatCacheKey(sessionId: string) {
  return `${CHAT_CACHE_PREFIX}${sessionId}`;
}

function readCachedSnapshot(sessionId: string): ChatSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(getChatCacheKey(sessionId));
    return stored ? (JSON.parse(stored) as ChatSnapshot) : null;
  } catch {
    return null;
  }
}

async function initUserOnServer(params: {
  visitorId?: string | null;
  sessionId?: string | null;
}) {
  const visitorData = initializeVisitor(params.visitorId);
  const deviceInfo = getDeviceInfo();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch("/api/user/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId: visitorData.visitorId,
        sessionId: params.sessionId,
        fingerprint: visitorData.fingerprint,
        userAgent: deviceInfo.userAgent,
        deviceType: deviceInfo.deviceType,
        timezone: deviceInfo.timezone,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to initialize visitor.");
    }

    return response.json() as Promise<{
      visitorId: string;
      leadId: string | null;
      sessionId: string;
      isReturning: boolean;
      lead: LeadDto | null;
      session: ChatSessionDto | null;
      sessions: ChatSessionDto[];
    }>;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Connection timed out. Please try again.");
    }
    throw error;
  }
}

async function restoreConversation(params: {
  sessionId?: string | null;
  visitorId?: string | null;
}) {
  const searchParams = new URLSearchParams();

  if (params.sessionId) {
    searchParams.set("sessionId", params.sessionId);
  } else if (params.visitorId) {
    searchParams.set("visitorId", params.visitorId);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`/api/chat/session?${searchParams.toString()}`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to restore conversation.");
    }

    return response.json() as Promise<ChatSnapshot>;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Connection timed out. Please try again.");
    }
    throw error;
  }
}

async function updateLeadProfile(params: {
  leadId?: string | null;
  sessionId?: string | null;
  visitorId?: string | null;
  lead: LeadInput;
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch("/api/lead/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to save lead details.");
    }

    return response.json() as Promise<ChatSnapshot>;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Connection timed out. Please try again.");
    }
    throw error;
  }
}

async function createFreshSession(params: {
  leadId?: string | null;
  visitorId?: string | null;
  lead: LeadInput;
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch("/api/chat/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to start a new chat.");
    }

    return response.json() as Promise<ChatSnapshot>;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Connection timed out. Please try again.");
    }
    throw error;
  }
}

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [lead, setLead] = useState<LeadDto | null>(null);
  const [session, setSession] = useState<ChatSessionDto | null>(null);
  const [sessions, setSessions] = useState<ChatSessionDto[]>([]);
  const [leadInput, setLeadInput] = useState<LeadInput>({});
  const [messages, setMessages] = useState<MessageDto[]>(getDefaultMessages);
  const [loading, setLoading] = useState(false);
  const [hydrating, setHydrating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [agentTyping, setAgentTyping] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [privacyNoticeDismissed, setPrivacyNoticeDismissed] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);

  const latestSession = sessions[0] || null;
  const roomId = session?.id || null;
  const leadId = lead?.id || null;

  usePageTracking({
    leadId,
    visitorId,
    sessionId: session?.id || null,
  });

  const applySnapshot = (snapshot: ChatSnapshot) => {
    setLead(snapshot.lead);
    setSession(snapshot.session);
    setSessions(snapshot.sessions);
    setLeadInput({
      name: snapshot.lead.name,
      email: snapshot.lead.email,
      phone: snapshot.lead.phone,
      businessNeed: snapshot.lead.businessNeed,
    });
    setMessages(
      snapshot.messages.length > 0 ? snapshot.messages : getDefaultMessages(),
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedLeadDetails = localStorage.getItem(LEAD_DETAILS_STORAGE_KEY);
    const storedSessionId = localStorage.getItem(SESSION_ID_STORAGE_KEY);
    const storedVisitorId = getStoredVisitorId();

    if (storedLeadDetails) {
      try {
        setLeadInput(JSON.parse(storedLeadDetails) as LeadInput);
      } catch {
        localStorage.removeItem(LEAD_DETAILS_STORAGE_KEY);
      }
    }

    if (storedSessionId) {
      const cachedSnapshot = readCachedSnapshot(storedSessionId);

      if (cachedSnapshot) {
        applySnapshot(cachedSnapshot);
        setHydrating(true);
      }
    }

    let cancelled = false;

    void (async () => {
      try {
        const initialized = await initUserOnServer({
          visitorId: storedVisitorId,
          sessionId: storedSessionId,
        });

        if (cancelled) {
          return;
        }

        persistVisitorId(initialized.visitorId);
        setVisitorId(initialized.visitorId);
        setIsReturningUser(initialized.isReturning);

        const restoreTargetSessionId =
          storedSessionId || initialized.sessionId || initialized.session?.id || null;

        if (restoreTargetSessionId) {
          const snapshot = await restoreConversation({
            sessionId: restoreTargetSessionId,
          });

          if (cancelled) {
            return;
          }

          applySnapshot(snapshot);
          localStorage.setItem(SESSION_ID_STORAGE_KEY, snapshot.session.id);
        }
      } catch (caughtError) {
        if (!cancelled) {
          if (caughtError instanceof Error && caughtError.name === "AbortError") {
            setError("Connection timed out. Please try again.");
          } else {
            setError(
              caughtError instanceof Error
                ? caughtError.message
                : "Failed to restore chat.",
            );
          }
        }
      } finally {
        if (!cancelled) {
          setHydrating(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(LEAD_DETAILS_STORAGE_KEY, JSON.stringify(leadInput));
  }, [leadInput]);

  useEffect(() => {
    if (typeof window === "undefined" || !session || !lead) {
      return;
    }

    localStorage.setItem(SESSION_ID_STORAGE_KEY, session.id);

    const timeout = window.setTimeout(() => {
      localStorage.setItem(
        getChatCacheKey(session.id),
        JSON.stringify({
          lead,
          session,
          sessions,
          messages,
        } satisfies ChatSnapshot),
      );
    }, 200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [lead, messages, session, sessions]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!isOpen) {
        setTeaserVisible(true);
      }
    }, 5000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" || !session?.id) {
        return;
      }

      void restoreConversation({ sessionId: session.id })
        .then((snapshot) => {
          applySnapshot(snapshot);
        })
        .catch(() => {});
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [session?.id]);

  useLeadRoomSocket({
    enabled: isOpen,
    roomId,
    onMessage: (message) => {
      if (session?.id && message.sessionId !== session.id) {
        return;
      }

      setMessages((current) => mergeMessages(current, [message]));
      setBotTyping(false);

      if (message.sender === "agent") {
        setAgentTyping(false);
        setLead((current) =>
          current
            ? { ...current, isHumanActive: true, status: "contacted" }
            : current,
        );
      }
    },
    onTyping: (payload) => {
      if (payload.sender === "agent") {
        setAgentTyping(payload.isTyping);
      }
    },
    onAgentJoin: (activity) => {
      if (activity.leadId !== leadId) return;
      setLead((current) =>
        current
          ? { ...current, isHumanActive: true, status: "contacted" }
          : current,
      );
    },
  });

  const typingLabel = useMemo(() => {
    if (lead?.isHumanActive && agentTyping) {
      return "Human agent is typing...";
    }

    if (!lead?.isHumanActive && botTyping) {
      return "AI assistant is typing...";
    }

    return null;
  }, [agentTyping, botTyping, lead?.isHumanActive]);

  const handleRestoreSession = async (targetSessionId: string) => {
    setHydrating(true);
    setError(null);

    try {
      const snapshot = await restoreConversation({ sessionId: targetSessionId });
      applySnapshot(snapshot);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to restore conversation.",
      );
    } finally {
      setHydrating(false);
    }
  };

  const saveLeadInfo = async () => {
    if (
      !leadId &&
      !leadInput.name &&
      !leadInput.email &&
      !leadInput.phone &&
      !leadInput.businessNeed
    ) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const snapshot = await updateLeadProfile({
        leadId,
        sessionId: session?.id || null,
        visitorId,
        lead: leadInput,
      });

      applySnapshot(snapshot);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to save lead details.",
      );
    } finally {
      setLoading(false);
    }
  };

  const startFreshChat = async () => {
    if (
      !leadId &&
      !leadInput.name &&
      !leadInput.email &&
      !leadInput.phone &&
      !leadInput.businessNeed
    ) {
      setLead(null);
      setSession(null);
      setSessions([]);
      setMessages(getDefaultMessages());
      setBotTyping(false);
      setAgentTyping(false);
      setIsReturningUser(false);
      setError(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_ID_STORAGE_KEY);
      }
      return;
    }

    setError(null);
    setHydrating(true);

    try {
      const snapshot = await createFreshSession({
        leadId,
        visitorId,
        lead: leadInput,
      });

      applySnapshot(snapshot);
      setIsReturningUser(false);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to start a new chat.",
      );
    } finally {
      setHydrating(false);
    }
  };

  const sendTyping = async (isTyping: boolean) => {
    if (!roomId) {
      return;
    }

    const socket = await getSocketClient();
    if (leadId) {
      socket.emit("typing", {
        leadId,
        sender: "user",
        isTyping,
      });
    }
  };

  const sendMessage = async (message: string) => {
    setError(null);
    setLoading(true);
    setBotTyping(!lead?.isHumanActive);

    const clientMessageId = createClientMessageId();
    const pendingMessage: MessageDto = {
      id: clientMessageId,
      leadId: leadId || "pending",
      sessionId: session?.id || "pending",
      sender: "user",
      message,
      timestamp: new Date().toISOString(),
      clientMessageId,
    };

    setMessages((current) => mergeMessages(current, [pendingMessage]));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          sessionId: session?.id,
          message,
          lead: leadInput,
          clientMessageId,
          visitorId,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      const snapshot = (await response.json()) as ChatSnapshot & {
        waitingForAgent: boolean;
      };

      applySnapshot(snapshot);
      setBotTyping(false);

      if (snapshot.waitingForAgent) {
        setAgentTyping(false);
      }
    } catch (caughtError) {
      setMessages((current) =>
        current.filter((item) => item.clientMessageId !== clientMessageId),
      );
      setBotTyping(false);
      if (caughtError instanceof Error && caughtError.name === "AbortError") {
        setError("Connection timed out. Please try again.");
      } else {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Failed to send message.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    void startFreshChat();
  };

  return (
    <>
      {!privacyNoticeDismissed && (
        <div className="fixed bottom-20 right-5 z-40 max-w-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-lg">
          <div className="flex items-start gap-2">
            <Cookie className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <p>
              We use cookies and local storage to remember your chat and improve
              your experience.
            </p>
            <button
              type="button"
              onClick={() => setPrivacyNoticeDismissed(true)}
              className="ml-auto flex-shrink-0 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {teaserVisible && !isOpen ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setTeaserVisible(false);
          }}
          className="fixed bottom-24 right-5 z-40 max-w-xs rounded-3xl border border-sky-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 shadow-[0_20px_60px_rgba(15,23,42,0.18)] transition hover:border-sky-300 hover:text-sky-700"
        >
          Need help with pricing, software planning, or choosing the right SMA
          service?
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setTeaserVisible(false);
        }}
        className={`fixed bottom-5 right-5 z-40 rounded-full bg-slate-950 p-4 text-white shadow-[0_20px_45px_rgba(15,23,42,0.24)] transition hover:bg-sky-700 ${
          isOpen ? "hidden" : "flex"
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {isOpen ? (
        <div className="fixed inset-x-4 bottom-4 z-50 flex max-h-[min(48rem,calc(100vh-2rem))] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:inset-x-auto sm:right-6 sm:w-[28rem]">
          <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#082f49,#0f172a,#0284c7)] p-5 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                  SMA Live Desk
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  {lead?.isHumanActive ? "Live agent connected" : "Persistent chat"}
                </h2>
                <p className="mt-1 text-sm text-sky-100">
                  Your conversation stays available across refreshes and return
                  visits, with instant human handoff when needed.
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetConversation}
                  className="rounded-full p-2 text-sky-100 transition hover:bg-white/10 hover:text-white"
                  aria-label="Start fresh conversation"
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-sky-100 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto bg-slate-50 p-4">
            {isReturningUser && !hydrating && session && (
              <div className="rounded-[1rem] border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-sm font-medium text-emerald-700">
                  Welcome back!
                </p>
                <p className="text-xs text-emerald-600">
                  We restored your last session automatically.
                </p>
              </div>
            )}

            {sessions.length > 1 ? (
              <div className="rounded-[1rem] border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Continue previous chat
                    </p>
                    <p className="text-xs text-slate-500">
                      {latestSession?.title || "Resume your last conversation"}.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        latestSession && void handleRestoreSession(latestSession.id)
                      }
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => void startFreshChat()}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-700"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Start fresh
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50 p-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Session recovery
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Lead tracking
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Live agent ready
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Ask about your project, pricing direction, software fit, or the
                best SMA page to explore next.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      void sendMessage(prompt);
                    }}
                    disabled={loading || hydrating}
                    className="rounded-full border border-white bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <LeadDetailsForm
              value={leadInput}
              onChange={setLeadInput}
              onSave={saveLeadInfo}
              disabled={loading}
            />

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4">
              <ChatMessageList
                messages={messages}
                viewer="user"
                typingLabel={typingLabel}
                className="max-h-[22rem] pr-1"
              />
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            {error ? (
              <p className="mb-3 text-xs font-medium text-rose-600">{error}</p>
            ) : null}
            {hydrating ? (
              <p className="mb-3 text-xs font-medium text-slate-500">
                Restoring your previous conversation...
              </p>
            ) : null}
            <ChatComposer
              placeholder={
                lead?.isHumanActive
                  ? "Write to the live agent"
                  : "Ask about pricing, services, timelines, or your product idea"
              }
              disabled={loading || hydrating}
              onSubmit={sendMessage}
              onTypingChange={(isTyping) => {
                void sendTyping(isTyping);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
