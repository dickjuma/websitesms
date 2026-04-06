import { NextRequest, NextResponse } from "next/server";

import { connectToMongoose } from "@/lib/mongoose";
import { LeadModel } from "@/models/Lead";
import { VisitorModel } from "@/models/Visitor";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "";
}

export async function POST(request: NextRequest) {
  try {
    const {
      visitorId,
      fingerprint,
      userAgent,
      deviceType,
      timezone,
      path,
      title,
      timeSpent,
    } = await request.json();

    if (!visitorId) {
      return NextResponse.json(
        { error: "visitorId is required." },
        { status: 400 },
      );
    }

    await connectToMongoose();

    let visitor = await VisitorModel.findOne({ visitorId });

    const clientIp = getClientIp(request);

    if (visitor) {
      visitor.lastSeenAt = new Date();
      visitor.visitCount += 1;

      if (fingerprint) visitor.fingerprint = fingerprint;
      if (clientIp && !visitor.ipAddress) visitor.ipAddress = clientIp;
      if (userAgent && !visitor.userAgent) visitor.userAgent = userAgent;
      if (deviceType && !visitor.deviceType) visitor.deviceType = deviceType;
      if (timezone && !visitor.timezone) visitor.timezone = timezone;

      if (path) {
        const existingPage = visitor.pagesVisited?.find((p) => p.path === path);
        if (!existingPage) {
          visitor.pagesVisited = visitor.pagesVisited || [];
          visitor.pagesVisited.push({
            path,
            title: title || "",
            visitedAt: new Date(),
            timeSpent: timeSpent || 0,
          });
        }
      }

      await visitor.save();
    } else {
      visitor = await VisitorModel.create({
        visitorId,
        fingerprint: fingerprint || "",
        ipAddress: clientIp,
        userAgent: userAgent || "",
        deviceType: deviceType || "",
        timezone: timezone || "",
        leadId: null,
        lastSeenAt: new Date(),
        visitCount: 1,
        pagesVisited: path
          ? [{ path, title: title || "", visitedAt: new Date(), timeSpent: timeSpent || 0 }]
          : [],
      });
    }

    let leadId = visitor.leadId?.toString() || null;

    if (!leadId) {
      const existingLead = await LeadModel.findOne({ visitorId });
      if (existingLead) {
        visitor.leadId = existingLead._id as any;
        await visitor.save();
        leadId = existingLead._id.toString();
      }
    }

    let leadData = null;
    if (leadId) {
      const lead = await LeadModel.findById(leadId).select(
        "name email phone businessNeed qualification leadScore status"
      );
      if (lead) {
        leadData = {
          id: lead._id.toString(),
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          businessNeed: lead.businessNeed,
          qualification: lead.qualification,
          leadScore: lead.leadScore,
          status: lead.status,
        };
      }
    }

    return NextResponse.json({
      visitorId: visitor.visitorId,
      leadId,
      leadData,
      visitCount: visitor.visitCount,
    });
  } catch (error) {
    console.error("Failed to initialize visitor:", error);

    return NextResponse.json(
      { error: "Failed to initialize visitor." },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const visitorId = request.nextUrl.searchParams.get("visitorId");

    if (!visitorId) {
      return NextResponse.json(
        { error: "visitorId is required." },
        { status: 400 },
      );
    }

    await connectToMongoose();

    const visitor = await VisitorModel.findOne({ visitorId });

    if (!visitor) {
      return NextResponse.json(
        { error: "Visitor not found." },
        { status: 404 },
      );
    }

    let leadData = null;
    const leadId = visitor.leadId?.toString();
    if (leadId) {
      const lead = await LeadModel.findById(leadId).select(
        "name email phone businessNeed qualification leadScore status"
      );
      if (lead) {
        leadData = {
          id: lead._id.toString(),
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          businessNeed: lead.businessNeed,
          qualification: lead.qualification,
          leadScore: lead.leadScore,
          status: lead.status,
        };
      }
    }

    return NextResponse.json({
      visitorId: visitor.visitorId,
      leadId: leadId || null,
      leadData,
      visitCount: visitor.visitCount,
      pagesVisited: visitor.pagesVisited || [],
      lastSeenAt: visitor.lastSeenAt.toISOString(),
      ipAddress: visitor.ipAddress,
      deviceType: visitor.deviceType,
      timezone: visitor.timezone,
    });
  } catch (error) {
    console.error("Failed to get visitor:", error);

    return NextResponse.json(
      { error: "Failed to get visitor." },
      { status: 500 },
    );
  }
}
