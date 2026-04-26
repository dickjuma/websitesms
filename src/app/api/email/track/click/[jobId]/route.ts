import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { automationEngine } from "@/lib/automation-engine";
import { ObjectId } from "mongodb";

// GET /api/email/track/click/[jobId]?url=... - Track email link clicks
export async function GET(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  try {
    const { jobId } = await params;
    const url = request.nextUrl.searchParams.get('url');
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');

    if (!url) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const { db } = await connectToDatabase();

    // Find the email send record
    const emailSend = await db.collection("email_sends").findOne({
      "tracking.clickLinks.url": url
    });

    if (emailSend) {
      // Find the specific link and update click count
      const linkIndex = emailSend.tracking.clickLinks.findIndex(
        (link: any) => link.url === url
      );

      if (linkIndex !== -1) {
        const link = emailSend.tracking.clickLinks[linkIndex];

        // Update click data
        const updatePath = `tracking.clickLinks.${linkIndex}`;
        await db.collection("email_sends").updateOne(
          { _id: emailSend._id },
          {
            $set: {
              [`${updatePath}.clickedAt`]: new Date(),
              [`${updatePath}.clickUserAgent`]: userAgent,
              [`${updatePath}.clickIpAddress`]: ipAddress
            },
            $inc: {
              [`${updatePath}.clickCount`]: 1,
              clickedAt: new Date() // Update main clickedAt field
            }
          }
        );

        // Update campaign stats
        await db.collection("campaigns").updateOne(
          { _id: new ObjectId(emailSend.campaignId) },
          { $inc: { "metadata.clickedCount": 1 } }
        );

        // Trigger automation rules for email click
        try {
          await automationEngine.processEmailTrigger(
            emailSend.subscriberId,
            'click',
            {
              campaignId: emailSend.campaignId,
              clickedUrl: url,
              clickedAt: new Date()
            }
          );
        } catch (error) {
          console.error("Email click automation error:", error);
        }
      }
    }

    // Redirect to the original URL
    return NextResponse.redirect(url);

  } catch (error) {
    console.error("Email click tracking error:", error);

    // Fallback redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }
}