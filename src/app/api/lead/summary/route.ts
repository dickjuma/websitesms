import { NextRequest, NextResponse } from "next/server";

import { connectToMongoose } from "@/lib/mongoose";
import { LeadModel } from "@/models/Lead";
import { MessageModel } from "@/models/Message";

export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: "leadId is required." },
        { status: 400 },
      );
    }

    await connectToMongoose();

    const lead = await LeadModel.findById(leadId);

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 },
      );
    }

    const messages = await MessageModel.find({ leadId: lead._id as any })
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    messages.reverse();

    if (messages.length < 3) {
      return NextResponse.json({
        summary: "Not enough messages to generate summary.",
      });
    }

    const conversationText = messages
      .map((m) => `${m.sender}: ${m.message}`)
      .join("\n");

    const prompt = `Summarize this conversation in 2-3 sentences for a sales team. Include: 1) What the visitor needs, 2) Current qualification level, 3) Any next steps mentioned.\n\nConversation:\n${conversationText}\n\nLead info: name=${lead.name || "unknown"}, email=${lead.email || "unknown"}, need=${lead.businessNeed || "unknown"}`;

    try {
      const Groq = (await import("groq-sdk")).default;
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.3,
        max_tokens: 150,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const summary = completion.choices[0]?.message?.content?.trim() || "";

      lead.aiSummary = summary;
      await lead.save();

      return NextResponse.json({ summary });
    } catch (aiError) {
      console.error("AI summary generation failed:", aiError);
      return NextResponse.json(
        { error: "Failed to generate summary." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Failed to generate summary:", error);

    return NextResponse.json(
      { error: "Failed to generate summary." },
      { status: 500 },
    );
  }
}
