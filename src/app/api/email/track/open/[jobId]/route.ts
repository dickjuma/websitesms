import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { automationEngine } from "@/lib/automation-engine";
import { ObjectId } from "mongodb";

// GET /api/email/track/open/[jobId] - Track email opens
export async function GET(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  try {
    const { jobId } = await params;
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');

    const { db } = await connectToDatabase();

    // Find the email send record
    const emailSend = await db.collection("email_sends").findOne({
      "tracking.openPixelId": jobId
    });

    if (!emailSend) {
      // Return 1x1 transparent pixel even if not found
      const transparentPixel = Buffer.from(
        'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        'base64'
      );

      return new NextResponse(transparentPixel, {
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }

    // Update email send record if not already opened
    if (!emailSend.openedAt) {
      await db.collection("email_sends").updateOne(
        { _id: emailSend._id },
        {
          $set: {
            openedAt: new Date(),
            openedUserAgent: userAgent,
            openedIpAddress: ipAddress
          }
        }
      );

      // Update campaign stats
      await db.collection("campaigns").updateOne(
        { _id: new ObjectId(emailSend.campaignId) },
        { $inc: { "metadata.openedCount": 1 } }
      );

      // Trigger automation rules for email open
      try {
        await automationEngine.processEmailTrigger(
          emailSend.subscriberId,
          'open',
          { campaignId: emailSend.campaignId, openedAt: new Date() }
        );
      } catch (error) {
        console.error("Email open automation error:", error);
      }
    }

    // Return 1x1 transparent pixel
    const transparentPixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );

    return new NextResponse(transparentPixel, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error("Email open tracking error:", error);

    // Still return pixel even on error
    const transparentPixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );

    return new NextResponse(transparentPixel, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}