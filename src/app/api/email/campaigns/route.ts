import { NextRequest, NextResponse } from "next/server";
import { createCampaign, Campaign } from "@/lib/email-marketing-schema";
import { requireAdminAuth } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/database";

// POST /api/email/campaigns - Create new campaign
export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const campaignData: Omit<Campaign, '_id' | 'createdAt' | 'updatedAt' | 'metadata'> = await request.json();

    // Validate required fields
    if (!campaignData.name || !campaignData.subject || !campaignData.content?.html) {
      return NextResponse.json(
        { success: false, message: "Name, subject, and HTML content are required" },
        { status: 400 }
      );
    }

    // Create campaign
    const campaign = await createCampaign({
      ...campaignData,
      status: campaignData.status || 'draft',
      type: campaignData.type || 'newsletter',
      sender: campaignData.sender || {
        name: 'SMAS Systems',
        email: 'hello@smassystems.com'
      },
      tracking: campaignData.tracking || {
        trackOpens: true,
        trackClicks: true,
        trackUnsubscribes: true
      },
      createdBy: 'admin' // TODO: Get from auth context
    });

    return NextResponse.json({
      success: true,
      message: "Campaign created successfully",
      campaign: {
        id: campaign._id,
        name: campaign.name,
        status: campaign.status,
        createdAt: campaign.createdAt
      }
    });

  } catch (error) {
    console.error("Create campaign error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/email/campaigns - Get campaigns list
export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');

    const { db } = await connectToDatabase();
    const collection = db.collection<Campaign>("campaigns");

    // Build query
    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    // Get campaigns with pagination
    const campaigns = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    return NextResponse.json({
      success: true,
      campaigns: campaigns.map(campaign => ({
        id: campaign._id?.toString(),
        name: campaign.name,
        subject: campaign.subject,
        status: campaign.status,
        type: campaign.type,
        sentAt: campaign.sentAt,
        createdAt: campaign.createdAt,
        metadata: campaign.metadata
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Get campaigns error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}