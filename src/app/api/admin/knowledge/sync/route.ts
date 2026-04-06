import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import { syncWebsiteKnowledge } from "@/lib/chat/website-knowledge";

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const baseUrl = new URL(request.url).origin;
    const result = await syncWebsiteKnowledge(baseUrl);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to sync AI knowledge:", error);

    return NextResponse.json(
      { error: "Failed to sync AI knowledge." },
      { status: 500 },
    );
  }
}
