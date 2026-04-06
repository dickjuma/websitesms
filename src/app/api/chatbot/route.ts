import { NextRequest, NextResponse } from "next/server";

import {
  getLeadChatSnapshot,
  processUserMessage,
  updateLeadDetails,
} from "@/lib/chat/service";

export async function GET(request: NextRequest) {
  try {
    const leadId = request.nextUrl.searchParams.get("leadId") || undefined;
    const sessionId = request.nextUrl.searchParams.get("sessionId") || undefined;
    const visitorId = request.nextUrl.searchParams.get("visitorId") || undefined;

    if (!leadId && !sessionId && !visitorId) {
      return NextResponse.json(
        { error: "leadId, sessionId, or visitorId is required." },
        { status: 400 },
      );
    }

    const snapshot = await getLeadChatSnapshot({
      leadId,
      sessionId,
      visitorId,
    });

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Failed to fetch chatbot transcript:", error);

    return NextResponse.json(
      { error: "Failed to fetch chat history." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { leadId, sessionId, message, lead, clientMessageId, visitorId } =
      await request.json();

    if (!message?.trim() && !leadId && !lead) {
      return NextResponse.json(
        { error: "A message or lead details are required." },
        { status: 400 },
      );
    }

    if (message?.trim()) {
      const payload = await processUserMessage({
        leadId,
        sessionId,
        leadInput: lead,
        message,
        clientMessageId,
        visitorId,
      });

      return NextResponse.json(payload);
    }

    if (!leadId) {
      const payload = await processUserMessage({
        sessionId,
        leadInput: lead,
        visitorId,
      });

      return NextResponse.json(payload);
    }

    const updatedLead = await updateLeadDetails(leadId, lead || {});
    const snapshot = await getLeadChatSnapshot({
      leadId: updatedLead.id,
      sessionId,
      visitorId: visitorId || updatedLead.visitorId,
    });

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Failed to process chatbot request:", error);

    return NextResponse.json(
      { error: "Failed to process chat request." },
      { status: 500 },
    );
  }
}
