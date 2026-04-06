import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import {
  getSiteInfoSettings,
  saveSiteInfoSettings,
} from "@/lib/site-settings";

export async function GET() {
  try {
    const data = await getSiteInfoSettings();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const data = await saveSiteInfoSettings(body);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}
