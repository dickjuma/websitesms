import { connectToDatabase } from "@/lib/database";

export interface SiteInfoSettings {
  key: "site_info";
  companyName: string;
  tagline: string;
  websiteUrl: string;
  email: string;
  supportEmail: string;
  salesEmail: string;
  notificationsEmail: string;
  phone: string;
  address: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    github: string;
  };
  workingHours: string;
  updatedAt: Date;
  createdAt?: Date;
}

export interface ChatbotAdminConfig {
  key: "chatbot_config";
  systemPrompt: string;
  businessSummary: string;
  pricingNotes: string;
  escalationMessage: string;
  qualificationRules: string;
  companyFacts: string[];
  serviceFacts: string[];
  updatedAt: Date;
  createdAt?: Date;
}

export function getDefaultSiteInfoSettings(): SiteInfoSettings {
  return {
    key: "site_info",
    companyName: "SMA Systems and Softwares",
    tagline: "Custom software, AI, cloud, and business systems for growing teams",
    websiteUrl: "https://smassystems.com",
    email: "hello@smassystems.com",
    supportEmail: "support@smassystems.com",
    salesEmail: "sales@smassystems.com",
    notificationsEmail: "info@smassystems.com",
    phone: "+254 719 832 719",
    address: "Nairobi, Kenya",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      github: "",
    },
    workingHours: "Mon-Fri: 9AM-6PM EAT",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function getDefaultChatbotAdminConfig(): ChatbotAdminConfig {
  return {
    key: "chatbot_config",
    systemPrompt:
      "You are SMA Systems' AI assistant. Stay concise, direct, and trustworthy. Answer using SMA company information, services, pricing guidance, and website knowledge. If something is uncertain, say so clearly and offer a human handoff.",
    businessSummary:
      "SMA Systems builds custom software, mobile apps, ERP, CRM, POS, AI solutions, cloud/devops systems, integrations, cybersecurity support, and internal business platforms.",
    pricingNotes:
      "Use directional pricing unless exact starter pricing is stored in the knowledge base or admin training facts. Encourage discovery for final quotes.",
    escalationMessage:
      "If the visitor asks for a specialist, urgent support, or a tailored quote, offer to connect them to a human agent immediately.",
    qualificationRules:
      "Treat urgent, budget-approved, or ready-to-start visitors as HOT. Treat exploratory pricing or shortlist conversations as WARM.",
    companyFacts: [
      "SMA Systems is based in Nairobi, Kenya.",
      "The company delivers custom software and digital transformation services for businesses.",
      "The team supports both AI-first chats and live human takeover in support workflows.",
    ],
    serviceFacts: [
      "Core services include custom software, web development, mobile apps, ERP, CRM, POS, AI solutions, cloud/devops, and cybersecurity.",
      "Use the most relevant service page or pricing guidance when recommending next steps.",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getSiteInfoSettings(): Promise<SiteInfoSettings> {
  const { db } = await connectToDatabase();
  const settings = await db
    .collection<SiteInfoSettings>("site_settings")
    .findOne({ key: "site_info" });

  if (settings) {
    return {
      ...getDefaultSiteInfoSettings(),
      ...settings,
      socialLinks: {
        ...getDefaultSiteInfoSettings().socialLinks,
        ...(settings.socialLinks || {}),
      },
    };
  }

  const defaults = getDefaultSiteInfoSettings();
  await db.collection<SiteInfoSettings>("site_settings").insertOne(defaults);
  return defaults;
}

export async function saveSiteInfoSettings(
  data: Partial<SiteInfoSettings>,
): Promise<SiteInfoSettings> {
  const { db } = await connectToDatabase();
  const current = await getSiteInfoSettings();
  const next: SiteInfoSettings = {
    ...current,
    ...data,
    key: "site_info",
    socialLinks: {
      ...current.socialLinks,
      ...(data.socialLinks || {}),
    },
    updatedAt: new Date(),
  };

  await db.collection<SiteInfoSettings>("site_settings").updateOne(
    { key: "site_info" },
    { $set: next },
    { upsert: true },
  );

  return next;
}

export async function getChatbotAdminConfig(): Promise<ChatbotAdminConfig> {
  const { db } = await connectToDatabase();
  const config = await db
    .collection<ChatbotAdminConfig>("settings")
    .findOne({ key: "chatbot_config" });

  if (config) {
    return {
      ...getDefaultChatbotAdminConfig(),
      ...config,
      companyFacts:
        config.companyFacts || getDefaultChatbotAdminConfig().companyFacts,
      serviceFacts:
        config.serviceFacts || getDefaultChatbotAdminConfig().serviceFacts,
    };
  }

  const defaults = getDefaultChatbotAdminConfig();
  await db.collection<ChatbotAdminConfig>("settings").insertOne(defaults);
  return defaults;
}

export async function saveChatbotAdminConfig(
  data: Partial<ChatbotAdminConfig>,
): Promise<ChatbotAdminConfig> {
  const { db } = await connectToDatabase();
  const current = await getChatbotAdminConfig();
  const next: ChatbotAdminConfig = {
    ...current,
    ...data,
    key: "chatbot_config",
    companyFacts: data.companyFacts || current.companyFacts,
    serviceFacts: data.serviceFacts || current.serviceFacts,
    updatedAt: new Date(),
  };

  await db.collection<ChatbotAdminConfig>("settings").updateOne(
    { key: "chatbot_config" },
    { $set: next },
    { upsert: true },
  );

  return next;
}
