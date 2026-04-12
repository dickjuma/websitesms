import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { deactivateHumanTakeover } from "@/lib/chat/service";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ leadId: string }> },
) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { leadId } = await context.params;
    const { sessionId } = await request.json();

    const result = await deactivateHumanTakeover(leadId, sessionId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to release:", error);
    return NextResponse.json({ error: "Failed to release" }, { status: 500 });
  }
}