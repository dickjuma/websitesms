import { connectToDatabase } from "@/lib/database";
import { createDefaultPriceServices } from "@/lib/pricing-catalog";

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
  logoUrl: string;
  stats: {
    projectsDelivered: string;
    clientSatisfaction: string;
    yearsExperience: string;
  };
  partners: Partner[];
  completedProjects: CompletedProject[];
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

export interface PriceConfig {
  key: "price_config";
  currency: string;
  currencySymbol: string;
  includeVat: boolean;
  vatRate: number;
  displayCurrency: "KES" | "USD";
  services: Record<string, ServicePrice[]>;
  updatedAt: Date;
  createdAt?: Date;
}

export interface ServicePrice {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
}

export interface CompletedProject {
  id: string;
  title: string;
  client: string;
  imageUrl: string;
  description?: string;
  services: string[];
  completedDate: string;
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
    phone: "0719832719",
    address: "Nairobi, Kenya",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      github: "",
    },
    workingHours: "Mon-Fri: 9AM-6PM EAT",
    logoUrl: "",
    stats: {
      projectsDelivered: "400+",
      clientSatisfaction: "98%",
      yearsExperience: "12+",
    },
    partners: [],
    completedProjects: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function getDefaultChatbotAdminConfig(): ChatbotAdminConfig {
  return {
    key: "chatbot_config",
    systemPrompt:
      "You are a professional AI customer support assistant for SMA Systems. Be polite, clear, and concise. Use only confirmed company information. If unsure, ask a clarifying question. If the user asks for a human, support, or agent, or raises billing, refunds, complaints, account issues, legal concerns, technical failures, or other sensitive issues, reply exactly: \"I'm going to connect you with a human support agent for better assistance.\" Stop responding once a human agent joins.",
    businessSummary:
      "SMA Systems builds custom software, mobile apps, ERP, CRM, POS, AI solutions, cloud/devops systems, integrations, cybersecurity support, and internal business platforms.",
    pricingNotes:
      "Use directional pricing unless exact starter pricing is stored in the knowledge base or admin training facts. Encourage discovery for final quotes.",
    escalationMessage:
      "I'm going to connect you with a human support agent for better assistance.",
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

export function getDefaultPriceConfig(): PriceConfig {
  return {
    key: "price_config",
    currency: "KES",
    currencySymbol: "KSh",
    includeVat: true,
    vatRate: 16,
    displayCurrency: "KES",
    services: createDefaultPriceServices(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getPriceConfig(): Promise<PriceConfig> {
  try {
    const { db } = await connectToDatabase();
    const config = await db.collection<PriceConfig>("site_settings").findOne({ key: "price_config" });
    if (config) return config;
    const defaults = getDefaultPriceConfig();
    await db.collection<PriceConfig>("site_settings").insertOne(defaults);
    return defaults;
  } catch (error) {
    console.warn("MongoDB unavailable, returning defaults:", error);
    return getDefaultPriceConfig();
  }
}

export async function savePriceConfig(data: Partial<PriceConfig>): Promise<PriceConfig> {
  const { db } = await connectToDatabase();
  const current = await getPriceConfig();
  const updated = { ...current, ...data, updatedAt: new Date() };
  await db.collection<PriceConfig>("site_settings").updateOne(
    { key: "price_config" },
    { $set: updated },
    { upsert: true }
  );
  return updated;
}

const SITE_INFO_CACHE = {
  data: null as SiteInfoSettings | null,
  timestamp: 0,
  ttl: 60000, // 60 second cache
};

export async function getSiteInfoSettings(): Promise<SiteInfoSettings> {
  const now = Date.now();
  
  if (SITE_INFO_CACHE.data && (now - SITE_INFO_CACHE.timestamp) < SITE_INFO_CACHE.ttl) {
    return SITE_INFO_CACHE.data;
  }
  
  try {
    const { db } = await connectToDatabase();
    
    const settings = await db
      .collection<SiteInfoSettings>("site_settings")
      .findOne({ key: "site_info" });

    if (settings) {
      SITE_INFO_CACHE.data = {
        ...getDefaultSiteInfoSettings(),
        ...settings,
        socialLinks: {
          ...getDefaultSiteInfoSettings().socialLinks,
          ...(settings.socialLinks || {}),
        },
      };
      SITE_INFO_CACHE.timestamp = now;
      return SITE_INFO_CACHE.data;
    }

    const defaults = getDefaultSiteInfoSettings();
    await db.collection<SiteInfoSettings>("site_settings").insertOne(defaults);
    SITE_INFO_CACHE.data = defaults;
    SITE_INFO_CACHE.timestamp = now;
    return defaults;
  } catch (error) {
    console.warn("MongoDB unavailable, returning defaults:", error);
    return getDefaultSiteInfoSettings();
  }
}

export async function saveSiteInfoSettings(
  data: Partial<SiteInfoSettings>,
): Promise<SiteInfoSettings> {
  const { db } = await connectToDatabase();
  const current = await getSiteInfoSettings();
  
  const updateFields: Record<string, unknown> = {
    companyName: data.companyName ?? current.companyName,
    tagline: data.tagline ?? current.tagline,
    websiteUrl: data.websiteUrl ?? current.websiteUrl,
    email: data.email ?? current.email,
    supportEmail: data.supportEmail ?? current.supportEmail,
    salesEmail: data.salesEmail ?? current.salesEmail,
    notificationsEmail: data.notificationsEmail ?? current.notificationsEmail,
    phone: data.phone ?? current.phone,
    address: data.address ?? current.address,
    socialLinks: data.socialLinks ?? current.socialLinks,
    workingHours: data.workingHours ?? current.workingHours,
    logoUrl: data.logoUrl ?? current.logoUrl,
    stats: data.stats ?? current.stats,
    updatedAt: new Date(),
  };

  await db.collection<SiteInfoSettings>("site_settings").updateOne(
    { key: "site_info" },
    { $set: updateFields },
    { upsert: true },
  );

  return { ...current, ...updateFields } as SiteInfoSettings;
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
  
  const updateFields: Record<string, unknown> = {
    systemPrompt: data.systemPrompt ?? current.systemPrompt,
    businessSummary: data.businessSummary ?? current.businessSummary,
    pricingNotes: data.pricingNotes ?? current.pricingNotes,
    escalationMessage: data.escalationMessage ?? current.escalationMessage,
    qualificationRules: data.qualificationRules ?? current.qualificationRules,
    companyFacts: data.companyFacts ?? current.companyFacts,
    serviceFacts: data.serviceFacts ?? current.serviceFacts,
    updatedAt: new Date(),
  };

  await db.collection<ChatbotAdminConfig>("settings").updateOne(
    { key: "chatbot_config" },
    { $set: updateFields },
    { upsert: true },
  );

  return { ...current, ...updateFields } as ChatbotAdminConfig;
}
