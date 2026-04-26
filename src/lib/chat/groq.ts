import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

import type { LeadDto, MessageDto } from "@/lib/chat/types";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const COUNTRIES_COVERED = `
SMA Systems operates across ALL of East Africa:
- Kenya: Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and all 47 counties
- Uganda: Kampala, Entebbe, Jinja, Mbarara, Gulu, and all regions
- Tanzania: Dar es Salaam, Arusha, Mwanza, Dodoma, Zanzibar, and all regions
- Rwanda: Kigali, Butare, Gisenyi, and all districts
- DRC: Kinshasa, Goma, Lubumbashi, and all provinces
- South Sudan: Juba, Wau, Malakal, and all regions
- Burundi, Ethiopia, Somalia, and Djibouti

SMA Systems provides ERP, POS, Inventory, CRM, Website Development, Mobile Apps, E-commerce, School Management, Hotel Management, Healthcare Management, Digital Marketing, IT Consulting, and more.
`;

const SERVICE_INFO = `
SMA Systems Services - ALL Available Services:

1. Custom Software Development - Tailored platforms for business workflows
2. Custom Web Development - Websites, portals, web applications  
3. Mobile App Development - iOS and Android apps
4. UI/UX Design - Interface and product design
5. ERP Systems - Enterprise resource planning (operations, finance, inventory, HR)
6. Inventory Systems - Stock control, warehouse management
7. CRM Systems - Lead and customer management
8. POS Systems - Point of sale for retail, restaurants, hospitality
9. API Development & Integrations - Custom APIs and system connections
10. AI Solutions - AI chatbots, automation, intelligent features
11. Data Analytics & BI - Business intelligence, dashboards, reporting
12. QA & Software Testing - Quality assurance and testing services
13. Cloud & DevOps - Cloud hosting, deployment, infrastructure
14. Cybersecurity Services - Security audits, penetration testing
15. E-commerce Solutions - Online stores, payment integration
16. School Management - Student records, fees, attendance, examinations
17. Hotel Management - Reservations, front desk, billing, restaurant
18. Healthcare Management - Patient records, EMR, hospital systems
19. Digital Marketing & SEO - Online marketing, search optimization
20. IT Consulting - Technology strategy and advisory

Key Benefits:
- Local Kenyan presence (Nairobi, Mombasa, Kisumu, Nakuru, Eldoret)
- East Africa coverage (Uganda, Tanzania, Rwanda, DRC)
- M-Pesa payment integration available
- Local support and maintenance
`;

const SUPPORT_POLICY = `
ROLE:
You are a professional AI customer support assistant for SMA Systems.

GOALS:
- Help users with accurate, clear, and helpful responses.
- Be polite, conversational, and efficient.
- Keep answers short unless more detail is needed.

CRITICAL RULES:
- Use only confirmed company information, website knowledge, and admin guidance.
- Do not hallucinate or invent policies, pricing, timelines, or technical facts.
- If unsure, ask a clarifying question instead.
- Friendly but professional tone.
- Do not use slang unless the user uses it first.
- Do not use emojis unless the user uses them first.

HUMAN HANDOFF RULES:
- If the user asks something complex, sensitive, or requiring human judgment, especially billing issues, complaints, technical failures, refunds, legal concerns, or account issues, reply exactly:
"I'm going to connect you with a human support agent for better assistance."
- Also reply with that exact sentence if the user asks for a human, agent, or support.
- If the conversation shows repeated failure to solve the issue, use that exact sentence.
- Once a human agent joins, stop responding completely.

RESPONSE STYLE:
- Resolve simple requests quickly.
- Keep replies concise and practical.
- Ask at most one clarifying question when needed.
- Prefer clear direct language over sales language.
`;

function buildSystemPrompt(lead: LeadDto, knowledgeContext: string, language: string = "en") {
  const languageInstructions: Record<string, string> = {
    en: "Respond in English.",
    sw: "Respond in Swahili (Kiswahili). Use simple sentences.",
    lg: "Respond in Luganda.",
    fr: "Respond in French (Français).",
    ar: "Respond in Arabic (العربية).",
    ki: "Respond in Kikuyu for Kenyan clients.",
    rw: "Respond in Kinyarwanda for Rwandan clients.",
    ha: "Respond in Hausa.",
    zu: "Respond in Zulu.",
    so: "Respond in Somali (Soomaali).",
  };

  const leadName = lead.name || "there";
  const businessNeed = lead.businessNeed || "";

  return [
    SUPPORT_POLICY,
    languageInstructions[language] || languageInstructions.en,
    SERVICE_INFO,
    COUNTRIES_COVERED,
    `CONTACT: Phone +254 719 832 719, Email hello@smassystems.com, Website smassystems.com`,
    `Address user as "${leadName}" when known. Business need: "${businessNeed}"`,
    `Answer using only SMA Systems info. Don't make things up.`,
    `If the user asks about services or pricing, list the relevant services and any confirmed starter prices or tiers from the provided knowledge.`,
    `Keep responses short unless more detail is needed. Ask a clarifying question only when necessary.`,
    `If human agent in chat, stop responding and defer to them.`,
    `Website knowledge:\n${knowledgeContext}`,
  ].join("\n\n");
}

export async function generateGroqReply(
  lead: LeadDto,
  conversation: MessageDto[],
  knowledgeContext: string,
  language: string = "en",
): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY environment variable.");
  }

  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: buildSystemPrompt(lead, knowledgeContext, language),
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
    temperature: 0.7,
    max_tokens: 150,
    messages,
  });

  const reply = completion.choices[0]?.message?.content?.trim();

  if (!reply) {
    console.warn("Groq returned an empty response, using fallback");
    const fallbacks: Record<string, string> = {
      en: "I'm here to help! Would you like to know about our services, get pricing, or book a demo?",
      sw: "Niko hapa kukusaidia! Je, unataka kujua kuhusu huduma zetu, bei, au kubooka demo?",
      fr: "Je suis là pour vous aider! Voulez-vous en savoir plus sur nos services ou planifier une démonstration?",
    };
    return fallbacks[language] || fallbacks.en;
  }

  return reply;
}
