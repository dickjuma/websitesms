import { NextRequest, NextResponse } from "next/server";

import { processUserMessage } from "@/lib/chat/service";

export async function POST(request: NextRequest) {
  try {
    const { leadId, sessionId, message, lead, clientMessageId, visitorId } =
      await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const payload = await processUserMessage({
      leadId,
      sessionId,
      message,
      leadInput: lead,
      clientMessageId,
      visitorId,
    });

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to process chat message:", error);

    return NextResponse.json(
      { error: "Failed to process chat message." },
      { status: 500 },
    );
  }
}
