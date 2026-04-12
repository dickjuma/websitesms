import { NextRequest, NextResponse } from "next/server";
import { getLeadChatSnapshot, getVisitorChatState } from "@/lib/chat/service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required." },
        { status: 400 }
      );
    }

    const snapshot = await getLeadChatSnapshot({
      sessionId,
    });

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Failed to get chat session:", error);

    return NextResponse.json(
      { error: "Failed to get chat session." },
      { status: 500 }
    );
  }
}