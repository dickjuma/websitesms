import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import { getKnowledgeSyncStatus } from "@/lib/chat/website-knowledge";

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const status = await getKnowledgeSyncStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Failed to fetch AI knowledge status:", error);

    return NextResponse.json(
      { error: "Failed to fetch AI knowledge status." },
      { status: 500 },
    );
  }
}
