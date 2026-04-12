import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { sendAgentMessage } from "@/lib/chat/service";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ leadId: string }> },
) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { leadId } = await context.params;
    const { sessionId, message, clientMessageId } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const payload = await sendAgentMessage({
      leadId,
      sessionId,
      message,
      clientMessageId,
    });

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to send agent message:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}