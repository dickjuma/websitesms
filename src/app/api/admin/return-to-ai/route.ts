import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import { deactivateHumanTakeover } from "@/lib/chat/service";

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const { leadId, sessionId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: "leadId is required." },
        { status: 400 },
      );
    }

    const payload = await deactivateHumanTakeover(leadId, sessionId);

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to return chat to AI:", error);

    return NextResponse.json(
      { error: "Failed to return chat to AI." },
      { status: 500 },
    );
  }
}