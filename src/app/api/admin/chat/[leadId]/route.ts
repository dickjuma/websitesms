import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import { getLeadMessages, sendAgentMessage } from "@/lib/chat/service";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ leadId: string }> },
) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const { leadId } = await context.params;
    const sessionId = request.nextUrl.searchParams.get("sessionId") || undefined;
    const limitParam = request.nextUrl.searchParams.get("limit");
    const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : 40;
    const limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 100)
        : 40;
    const messages = await getLeadMessages(leadId, limit, sessionId);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Failed to fetch admin chat:", error);

    return NextResponse.json(
      { error: "Failed to fetch chat history." },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ leadId: string }> },
) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const { leadId } = await context.params;
    const { sessionId, message, clientMessageId } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
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

    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
