import { NextRequest, NextResponse } from "next/server";

import { getVisitorChatState } from "@/lib/chat/service";
import { connectToMongoose } from "@/lib/mongoose";
import { LeadModel } from "@/models/Lead";
import { VisitorModel } from "@/models/Visitor";

const USER_COOKIE = "sma_uid";

function generateVisitorId(): string {
  return crypto.randomUUID();
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
    const {
      visitorId,
      fingerprint,
      userAgent,
      deviceType,
      timezone,
      sessionId,
    } = await request.json();

    await connectToMongoose();

    const cookieVisitorId = request.cookies.get(USER_COOKIE)?.value || "";
    const resolvedVisitorId = visitorId || cookieVisitorId || generateVisitorId();
    const clientIp = getClientIp(request);
    const now = new Date();

    let visitor = await VisitorModel.findOne({ visitorId: resolvedVisitorId });

    if (!visitor) {
      visitor = await VisitorModel.create({
        visitorId: resolvedVisitorId,
        fingerprint: fingerprint || "",
        ipAddress: clientIp,
        userAgent: userAgent || "",
        deviceType: deviceType || "",
        timezone: timezone || "",
        leadId: null,
        currentSessionId: sessionId || "",
        sessionCount: 0,
        lastSeenAt: now,
        visitCount: 1,
        pagesVisited: [],
      });
    } else {
      visitor.lastSeenAt = now;
      visitor.visitCount += 1;

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

      if (sessionId) {
        visitor.currentSessionId = sessionId;
      }

      await visitor.save();
    }

    const existingLead = await LeadModel.findOne({ visitorId: resolvedVisitorId }).lean();
    const restoredState = await getVisitorChatState(resolvedVisitorId);
    const restoredSession = restoredState.session;
    const isReturning =
      visitor.visitCount > 1 || Boolean(existingLead) || Boolean(restoredSession);

    const response = NextResponse.json({
      visitorId: resolvedVisitorId,
      leadId: existingLead?._id?.toString() || restoredState.lead?.id || null,
      sessionId: restoredSession?.id || visitor.currentSessionId || "",
      isReturning,
      visitCount: visitor.visitCount,
      lead: restoredState.lead,
      session: restoredSession,
      sessions: restoredState.sessions,
      initialized: true,
    });

    const expires = new Date(now);
    expires.setFullYear(expires.getFullYear() + 1);

    response.cookies.set(USER_COOKIE, resolvedVisitorId, {
      expires,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
    await connectToMongoose();

    const visitorId =
      request.nextUrl.searchParams.get("visitorId") ||
      request.cookies.get(USER_COOKIE)?.value ||
      "";

    if (!visitorId) {
      return NextResponse.json(
        { error: "visitorId is required." },
        { status: 400 },
      );
    }

    const visitor = await VisitorModel.findOne({ visitorId }).lean();

    if (!visitor) {
      return NextResponse.json({
        visitorId,
        leadId: null,
        sessionId: "",
        exists: false,
      });
    }

    const restoredState = await getVisitorChatState(visitorId);

    return NextResponse.json({
      visitorId,
      leadId: restoredState.lead?.id || visitor.leadId?.toString() || null,
      sessionId: restoredState.session?.id || visitor.currentSessionId || "",
      exists: true,
      visitCount: visitor.visitCount,
      lastSeenAt: visitor.lastSeenAt.toISOString(),
      deviceType: visitor.deviceType,
      timezone: visitor.timezone,
      isReturning: visitor.visitCount > 1,
      lead: restoredState.lead,
      session: restoredState.session,
      sessions: restoredState.sessions,
    });
  } catch (error) {
    console.error("Failed to get user:", error);

    return NextResponse.json(
      { error: "Failed to get user." },
      { status: 500 },
    );
  }
}
