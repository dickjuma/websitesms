import { NextRequest, NextResponse } from "next/server";

import { updateLeadActivity } from "@/lib/chat/service";
import { connectToMongoose } from "@/lib/mongoose";
import { LeadModel } from "@/models/Lead";
import { VisitorModel } from "@/models/Visitor";

export async function POST(request: NextRequest) {
  try {
    const { leadId, visitorId, sessionId, path, title, timeSpent } =
      await request.json();

    if ((!leadId && !visitorId) || !path) {
      return NextResponse.json(
        { error: "leadId or visitorId, plus path, are required." },
        { status: 400 },
      );
    }

    await connectToMongoose();

    if (!leadId && visitorId) {
      const visitor = await VisitorModel.findOne({ visitorId }).lean();

      if (!visitor) {
        return NextResponse.json(
          { error: "Visitor not found." },
          { status: 404 },
        );
      }
    }

    if (leadId) {
      const lead = await LeadModel.findById(leadId).lean();

      if (!lead) {
        return NextResponse.json(
          { error: "Lead not found." },
          { status: 404 },
        );
      }
    }

    const updatedLead = await updateLeadActivity(
      {
        leadId,
        visitorId,
        sessionId,
      },
      {
        action: "page_visit",
        detail: `Visited ${path}`,
        pageVisit: {
          path,
          title: title || "",
          timeSpent: timeSpent || 0,
        },
      },
    );

    return NextResponse.json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Failed to track page visit:", error);

    return NextResponse.json(
      { error: "Failed to track page visit." },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const leadId = request.nextUrl.searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json(
        { error: "leadId is required." },
        { status: 400 },
      );
    }

    await connectToMongoose();

    const lead = await LeadModel.findById(leadId).lean();

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      pagesVisited: lead.pagesVisited || [],
      activityTimeline: lead.activityTimeline || [],
      leadScore: lead.leadScore || 0,
      chatDepth: lead.chatDepth || 0,
    });
  } catch (error) {
    console.error("Failed to get activity:", error);

    return NextResponse.json(
      { error: "Failed to get activity." },
      { status: 500 },
    );
  }
}
