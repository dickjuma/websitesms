import { NextRequest, NextResponse } from "next/server";
import { updateChatState, getActiveChats, createMessage, getMessagesByChatId, logChatEvent, getChatById } from "@/lib/database";
import { requireAdminAuth } from "@/lib/admin-auth";

// Get messages for a chat
export async function GET(request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { chatId } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = parseInt(searchParams.get("skip") || "0");

    const messages = await getMessagesByChatId(chatId, { limit, skip });

    return NextResponse.json({
      success: true,
      messages: messages.map(msg => ({
        id: msg.id,
        sender: msg.sender,
        content: msg.content,
        timestamp: msg.timestamp,
        status: msg.status,
        aiSuggestions: msg.aiSuggestions,
      }))
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

// Send message or take over chat
export async function POST(request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { chatId } = await params;
    const { message, action, adminId } = await request.json();

    const chat = await getChatById(chatId);
    if (!chat) {
      return NextResponse.json({ success: false, message: "Chat not found" }, { status: 404 });
    }

    if (action === "takeover") {
      // Take over chat
      await updateChatState(chatId, "HUMAN_ACTIVE", adminId);
      await logChatEvent({
        chatId,
        eventType: "human_takeover",
        triggeredBy: adminId,
      });

      return NextResponse.json({
        success: true,
        message: "Chat taken over by human",
        chat: { state: "HUMAN_ACTIVE" }
      });
    }

    if (action === "return_to_ai") {
      // Return to AI
      await updateChatState(chatId, "AI_ACTIVE");
      await logChatEvent({
        chatId,
        eventType: "ai_takeover",
      });

      return NextResponse.json({
        success: true,
        message: "Chat returned to AI",
        chat: { state: "AI_ACTIVE" }
      });
    }

    if (message) {
      // Send admin message
      const msg = await createMessage({
        chatId,
        sender: "admin",
        content: message,
        status: "sent",
      });

      return NextResponse.json({
        success: true,
        message: msg,
      });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Chat action error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}