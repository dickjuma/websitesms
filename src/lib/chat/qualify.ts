import type { LeadQualification, LeadInput } from "@/lib/chat/types";

const EMAIL_PATTERN = /[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}/;
const PHONE_PATTERN = /(?:\+?\d[\d\s()-]{7,}\d)/;
const NAME_PATTERN =
  /(?:my name is|i am|i'm|call me)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+){0,2})/i;

const SERVICE_KEYWORDS = [
  "pricing",
  "quote",
  "website",
  "web app",
  "mobile app",
  "crm",
  "erp",
  "automation",
  "chatbot",
  "ai",
  "software",
  "platform",
  "integration",
];

const qualificationRank: Record<LeadQualification, number> = {
  COLD: 0,
  WARM: 1,
  HOT: 2,
};

export function sanitizeLeadInput(input?: LeadInput): LeadInput {
  if (!input) {
    return {};
  }

  return {
    name: input.name?.trim() || "",
    email: input.email?.trim().toLowerCase() || "",
    phone: input.phone?.trim() || "",
    businessNeed: input.businessNeed?.trim() || "",
  };
}

export function extractLeadSignals(message: string): LeadInput {
  const trimmedMessage = message.trim();
  const email = trimmedMessage.match(EMAIL_PATTERN)?.[0] || "";
  const phone = trimmedMessage.match(PHONE_PATTERN)?.[0] || "";
  const name = trimmedMessage.match(NAME_PATTERN)?.[1]?.trim() || "";
  const businessNeed =
    SERVICE_KEYWORDS.some((keyword) =>
      trimmedMessage.toLowerCase().includes(keyword),
    ) && trimmedMessage.length <= 240
      ? trimmedMessage
      : "";

  return {
    name,
    email,
    phone,
    businessNeed,
  };
}

export function classifyLead(message: string): LeadQualification {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("asap") ||
    normalized.includes("urgent") ||
    normalized.includes("ready to start") ||
    normalized.includes("ready to move") ||
    normalized.includes("budget approved") ||
    normalized.includes("sign this week") ||
    normalized.includes("need this immediately")
  ) {
    return "HOT";
  }

  if (
    normalized.includes("quote") ||
    normalized.includes("pricing") ||
    normalized.includes("estimate") ||
    normalized.includes("considering") ||
    normalized.includes("exploring") ||
    normalized.includes("interested")
  ) {
    return "WARM";
  }

  return "COLD";
}

export function maxQualification(
  current: LeadQualification,
  incoming: LeadQualification,
): LeadQualification {
  return qualificationRank[incoming] > qualificationRank[current]
    ? incoming
    : current;
}
