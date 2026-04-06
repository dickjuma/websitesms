import { NextRequest, NextResponse } from "next/server";

import { connectToMongoose } from "@/lib/mongoose";
import { LeadModel } from "@/models/Lead";
import { VisitorModel } from "@/models/Visitor";

function generateVisitorId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `v_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "";
}

export async function POST(request: NextRequest) {
  try {
    const { visitorId, existingLeadId, fingerprint, userAgent, deviceType, timezone } = await request.json();

    let finalVisitorId = visitorId;
    let leadId = existingLeadId || null;

    if (!finalVisitorId) {
      finalVisitorId = generateVisitorId();
    }

    await connectToMongoose();
    const clientIp = getClientIp(request);

    const [lead, visitor] = await Promise.all([
      leadId ? LeadModel.findById(leadId) : Promise.resolve(null),
      VisitorModel.findOne({ visitorId: finalVisitorId }),
    ]);

    let isReturning = false;

    if (visitor) {
      visitor.lastSeenAt = new Date();
      visitor.visitCount += 1;
      isReturning = visitor.visitCount > 1;

      if (fingerprint && !visitor.fingerprint) {
        visitor.fingerprint = fingerprint;
      }
      if (clientIp && !visitor.ipAddress) {
        visitor.ipAddress = clientIp;
      }
      if (userAgent && !visitor.userAgent) {
        visitor.userAgent = userAgent;
      }
      if (deviceType && !visitor.deviceType) {
        visitor.deviceType = deviceType;
      }
      if (timezone && !visitor.timezone) {
        visitor.timezone = timezone;
      }

      await visitor.save();
    } else {
      await VisitorModel.create({
        visitorId: finalVisitorId,
        fingerprint: fingerprint || "",
        ipAddress: clientIp,
        userAgent: userAgent || "",
        deviceType: deviceType || "",
        timezone: timezone || "",
        leadId: null,
        lastSeenAt: new Date(),
        visitCount: 1,
        pagesVisited: [],
      });
      isReturning = false;
    }

    if (lead) {
      if (!lead.visitorId) {
        lead.visitorId = finalVisitorId;
        await lead.save();
      }
    } else {
      leadId = null;
      const existingLead = await LeadModel.findOne({ visitorId: finalVisitorId });
      if (existingLead) {
        leadId = existingLead._id.toString();
      }
    }

    const response = NextResponse.json({
      visitorId: finalVisitorId,
      leadId,
      isReturning,
      initialized: true,
    });

    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    response.cookies.set("sma_vid", finalVisitorId, {
      expires,
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Failed to initialize user:", error);

    return NextResponse.json(
      { error: "Failed to initialize user." },
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

    const [lead, visitor] = await Promise.all([
      LeadModel.findOne({ visitorId }),
      VisitorModel.findOne({ visitorId }),
    ]);

    if (!lead && !visitor) {
      return NextResponse.json({
        visitorId,
        leadId: null,
        exists: false,
      });
    }

    return NextResponse.json({
      visitorId,
      leadId: lead?._id.toString() || null,
      exists: true,
      status: lead?.status,
      qualification: lead?.qualification,
      leadScore: lead?.leadScore,
      isReturning: visitor ? visitor.visitCount > 1 : false,
    });
  } catch (error) {
    console.error("Failed to get user info:", error);

    return NextResponse.json(
      { error: "Failed to get user info." },
      { status: 500 },
    );
  }
}