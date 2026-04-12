import { NextRequest, NextResponse } from "next/server";

import {
  createChatSession,
  getLeadChatSnapshot,
  getOrCreateLead,
  getVisitorChatState,
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

    if (visitorId && !leadId && !sessionId) {
      const state = await getVisitorChatState(visitorId);

      if (!state.session) {
        return NextResponse.json(
          { error: "No session found for this visitor." },
          { status: 404 },
        );
      }

      return NextResponse.json(state);
    }

    const snapshot = await getLeadChatSnapshot({
      leadId,
      sessionId,
      visitorId,
    });

    if (!snapshot.lead && snapshot.newSessionId) {
      const resolvedLead = await getOrCreateLead({
        visitorId: visitorId || `visitor-${snapshot.newSessionId}`,
      });

      const newSession = await createChatSession({
        leadId: resolvedLead.id,
        visitorId: visitorId || resolvedLead.visitorId,
      });

      if (newSession.id) {
        const newSnapshot = await getLeadChatSnapshot({
          sessionId: newSession.id,
        });
        return NextResponse.json(newSnapshot);
      }
    }

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Failed to get chat session:", error);

    return NextResponse.json(
      { error: "Failed to get chat session." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { leadId, visitorId, lead } = await request.json();

    const resolvedLead =
      leadId
        ? { id: leadId, visitorId: visitorId || "" }
        : await getOrCreateLead({
            leadInput: lead,
            visitorId,
          });

    const session = await createChatSession({
      leadId: resolvedLead.id,
      visitorId: visitorId || resolvedLead.visitorId,
    });

    const snapshot = await getLeadChatSnapshot({
      leadId: resolvedLead.id,
      sessionId: session.id,
    });

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Failed to create chat session:", error);

    return NextResponse.json(
      { error: "Failed to create chat session." },
      { status: 500 },
    );
  }
}
