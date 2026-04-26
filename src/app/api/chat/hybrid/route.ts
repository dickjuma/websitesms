import { NextRequest, NextResponse } from "next/server";
import { createChat, getChatById, updateChatState, getActiveChats, createMessage, getMessagesByChatId, logChatEvent } from "@/lib/database";
import { requireAdminAuth } from "@/lib/admin-auth";

// Create new chat session
export async function POST(request: NextRequest) {
  try {
    const { userId, userName, userEmail, initialMessage, sessionId, userLocation } = await request.json();

    if (!userId && !sessionId) {
      return NextResponse.json({ success: false, message: "userId or sessionId required" }, { status: 400 });
    }

    // Create chat
    const chat = await createChat({
      userId: userId || sessionId,
      userName,
      userEmail,
      userLocation,
      state: "AI_ACTIVE", // Start with AI active
      priority: "medium",
      tags: [],
      sentiment: "neutral",
      lastMessage: initialMessage || "Chat started",
      lastMessageAt: new Date(),
      sessionId,
      needsHuman: false,
    });

    // Log event
    await logChatEvent({
      chatId: chat.id,
      eventType: "user_joined",
      data: { userName, userEmail, userLocation },
    });

    // Create initial message if provided
    if (initialMessage) {
      await createMessage({
        chatId: chat.id,
        sender: "user",
        content: initialMessage,
        status: "delivered",
      });

      // Trigger AI response if AI is active
      // This will be handled by the WebSocket system
    }

    return NextResponse.json({
      success: true,
      chat: {
        id: chat.id,
        state: chat.state,
        userName: chat.userName,
        userEmail: chat.userEmail,
      }
    });
  } catch (error) {
    console.error("Create chat error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

// Get chat by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return NextResponse.json({ success: false, message: "chatId required" }, { status: 400 });
    }

    const chat = await getChatById(chatId);
    if (!chat) {
      return NextResponse.json({ success: false, message: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      chat: {
        id: chat.id,
        state: chat.state,
        userName: chat.userName,
        userEmail: chat.userEmail,
        userLocation: chat.userLocation,
        priority: chat.priority,
        tags: chat.tags,
        sentiment: chat.sentiment,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        needsHuman: chat.needsHuman,
      }
    });
  } catch (error) {
    console.error("Get chat error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}