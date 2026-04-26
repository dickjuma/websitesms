import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import {
  getDefaultSiteInfoSettings,
  getPriceConfig,
  getSiteInfoSettings,
  saveSiteInfoSettings,
  savePriceConfig,
} from "@/lib/site-settings";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key");
  if (key === "price_config") {
    const priceConfig = await getPriceConfig();
    return NextResponse.json(priceConfig);
  }
  const siteInfo = await getSiteInfoSettings();
  return NextResponse.json({
    success: true,
    data: {
      companyName: siteInfo.companyName,
      tagline: siteInfo.tagline,
      websiteUrl: siteInfo.websiteUrl,
      email: siteInfo.email,
      phone: siteInfo.phone,
      address: siteInfo.address,
      workingHours: siteInfo.workingHours,
      logoUrl: siteInfo.logoUrl,
      stats: siteInfo.stats,
      partners: siteInfo.partners,
      completedProjects: siteInfo.completedProjects,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get("key");
    const body = await request.json();
    const resolvedKey = body?.key || key;

    if (resolvedKey === "price_config" || resolvedKey === "site_info") {
      const authError = requireAdminAuth(request);
      if (authError) return authError;
    }

    const { key: bodyKey, ...data } = body;
    const activeKey = bodyKey || key;
    if (activeKey === "price_config") {
      const saved = await savePriceConfig(data);
      return NextResponse.json(saved);
    }
    if (activeKey === "site_info") {
      const saved = await saveSiteInfoSettings(data);
      return NextResponse.json({ success: true, data: saved });
    }
    return NextResponse.json({ success: false, error: "Unknown key" }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
