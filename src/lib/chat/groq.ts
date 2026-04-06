import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

import type { LeadDto, MessageDto } from "@/lib/chat/types";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

function buildSystemPrompt(lead: LeadDto, knowledgeContext: string) {
  return [
    "You are SMA Systems' website assistant.",
    "Keep responses concise, direct, practical, and trustworthy.",
    "Answer using SMA Systems knowledge first, not generic assumptions.",
    "Help with software projects, pricing direction, discovery, timelines, industry fit, and next steps.",
    "If the answer is not grounded in the provided knowledge, say that clearly and offer a human handoff.",
    "If contact details are missing and the user is engaged, ask for only one missing item at a time after answering.",
    "If a human agent has joined, defer to the human and do not claim to be the human.",
    "When you mention pricing, keep it directional unless the knowledge explicitly contains exact starter pricing.",
    "When you recommend a next step, point to a relevant SMA page or offer a live agent handoff.",
    `Lead context: name=${lead.name || "unknown"}, email=${lead.email || "unknown"}, phone=${lead.phone || "unknown"}, businessNeed=${lead.businessNeed || "unknown"}.`,
    `Knowledge context:\n${knowledgeContext}`,
  ].join(" ");
}

export async function generateGroqReply(
  lead: LeadDto,
  conversation: MessageDto[],
  knowledgeContext: string,
): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY environment variable.");
  }

  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: buildSystemPrompt(lead, knowledgeContext),
    },
    ...conversation.map((message) => ({
      role: (message.sender === "user" ? "user" : "assistant") as
        | "user"
        | "assistant",
      content:
        message.sender === "agent"
          ? `[Human agent] ${message.message}`
          : message.message,
    })),
  ];

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    temperature: 0.4,
    max_tokens: 300,
    messages,
  });

  const reply = completion.choices[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error("Groq returned an empty response.");
  }

  return reply;
}
