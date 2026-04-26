import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/database";
import {
  type ChatbotAdminConfig,
  type SiteInfoSettings,
  getChatbotAdminConfig,
  getSiteInfoSettings,
  saveChatbotAdminConfig,
  saveSiteInfoSettings,
} from "@/lib/site-settings";

interface AdminPreferences {
  key: "admin_preferences";
  timezone: string;
  language: string;
  theme: "light" | "dark" | "system";
  apiKeys: {
    openai: string;
    groq: string;
    resend: string;
  };
  notifications: {
    newLead: boolean;
    newMessage: boolean;
    chatTakeover: boolean;
  };
  updatedAt: Date;
  createdAt?: Date;
}

function getDefaultAdminPreferences(): AdminPreferences {
  return {
    key: "admin_preferences",
    timezone: "Africa/Nairobi",
    language: "en",
    theme: "system",
    apiKeys: {
      openai: "",
      groq: "",
      resend: "",
    },
    notifications: {
      newLead: true,
      newMessage: true,
      chatTakeover: true,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function getAdminPreferences() {
  const { db } = await connectToDatabase();
  const current = await db
    .collection<AdminPreferences>("settings")
    .findOne({ key: "admin_preferences" });

  if (current) {
    return {
      ...getDefaultAdminPreferences(),
      ...current,
      notifications: {
        ...getDefaultAdminPreferences().notifications,
        ...(current.notifications || {}),
      },
      apiKeys: {
        ...getDefaultAdminPreferences().apiKeys,
        ...(current.apiKeys || {}),
      },
    };
  }

  const defaults = getDefaultAdminPreferences();
  await db.collection<AdminPreferences>("settings").insertOne(defaults);
  return defaults;
}

async function saveAdminPreferences(data: Partial<AdminPreferences>) {
  const { db } = await connectToDatabase();
  const current = await getAdminPreferences();
  
  const updateFields: Record<string, unknown> = {
    timezone: data.timezone ?? current.timezone,
    language: data.language ?? current.language,
    theme: data.theme ?? current.theme,
    apiKeys: data.apiKeys ?? current.apiKeys,
    notifications: data.notifications ?? current.notifications,
    updatedAt: new Date(),
  };

  await db.collection<AdminPreferences>("settings").updateOne(
    { key: "admin_preferences" },
    { $set: updateFields },
    { upsert: true },
  );

  return { ...current, ...updateFields } as AdminPreferences;
}

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const [siteSettings, aiConfig, adminPreferences] = await Promise.all([
      getSiteInfoSettings(),
      getChatbotAdminConfig(),
      getAdminPreferences(),
    ]);

    return NextResponse.json({
      siteSettings,
      aiConfig,
      adminPreferences,
    });
  } catch (error) {
    console.error("Failed to load admin settings:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load admin settings." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const body = (await request.json()) as {
      siteSettings?: Partial<SiteInfoSettings>;
      aiConfig?: Partial<ChatbotAdminConfig>;
      adminPreferences?: Partial<AdminPreferences>;
    };

    const [siteSettings, aiConfig, adminPreferences] = await Promise.all([
      saveSiteInfoSettings(body.siteSettings || {}),
      saveChatbotAdminConfig(body.aiConfig || {}),
      saveAdminPreferences(body.adminPreferences || {}),
    ]);

    return NextResponse.json({
      success: true,
      siteSettings,
      aiConfig,
      adminPreferences,
    });
  } catch (error) {
    console.error("Failed to save admin settings:", error);

    return NextResponse.json(
      { success: false, message: "Failed to save admin settings." },
      { status: 500 },
    );
  }
}
