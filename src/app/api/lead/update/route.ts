import { NextRequest, NextResponse } from "next/server";

import { getLeadChatSnapshot, getOrCreateLead, updateLeadDetails } from "@/lib/chat/service";

export async function POST(request: NextRequest) {
  try {
    const { leadId, sessionId, lead, visitorId } = await request.json();

    const resolvedLead = leadId
      ? await updateLeadDetails(leadId, lead || {})
      : await getOrCreateLead({
          leadInput: lead,
          visitorId,
        });

    const snapshot = await getLeadChatSnapshot({
      leadId: resolvedLead.id,
      sessionId,
      visitorId: visitorId || resolvedLead.visitorId,
    });

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Failed to update lead:", error);

    return NextResponse.json(
      { error: "Failed to update lead." },
      { status: 500 },
    );
  }
}
