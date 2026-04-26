import { NextRequest, NextResponse } from "next/server";
import { createSubscriber, findSubscriberByEmail, updateSubscriber } from "@/lib/email-marketing-schema";
import { requireAdminAuth } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/database";
import { automationEngine } from "@/lib/automation-engine";

// POST /api/newsletter/subscribe - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const { email, name, source, sourceType, interests, consent = true } = await request.json();

    // Validate required fields
    if (!email || !source) {
      return NextResponse.json(
        { success: false, message: "Email and source are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await findSubscriberByEmail(email);

    if (existingSubscriber) {
      if (existingSubscriber.subscriptionStatus === 'unsubscribed') {
        // Re-subscribe
        await updateSubscriber(existingSubscriber._id!, {
          subscriptionStatus: 'active',
          consentGiven: consent,
          consentTimestamp: new Date(),
          updatedAt: new Date(),
          lastActivityAt: new Date(),
        });

        return NextResponse.json({
          success: true,
          message: "Successfully re-subscribed to newsletter",
          subscriber: {
            id: existingSubscriber._id,
            email: existingSubscriber.email,
            status: 'active'
          }
        });
      }

      // Already subscribed
      return NextResponse.json({
        success: false,
        message: "Email already subscribed",
        subscriber: {
          id: existingSubscriber._id,
          email: existingSubscriber.email,
          status: existingSubscriber.subscriptionStatus
        }
      });
    }

    // Create new subscriber
    const subscriber = await createSubscriber({
      email: email.toLowerCase().trim(),
      name: name?.trim(),
      source,
      sourceType: sourceType || 'website_form',
      tags: [],
      segments: ['active'],
      subscriptionStatus: 'active',
      consentGiven: consent,
      consentTimestamp: new Date(),
      interests: interests || [],
      lastActivityAt: new Date(),
      emailPreferences: {
        frequency: 'weekly',
        categories: ['product_updates', 'tips']
      }
    });

    // Trigger automation rules for new subscription
    try {
      await automationEngine.processSubscriptionTrigger(subscriber._id!.toString(), source);
    } catch (error) {
      console.error("Automation trigger error:", error);
      // Don't fail the subscription if automation fails
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      subscriber: {
        id: subscriber._id,
        email: subscriber.email,
        status: subscriber.subscriptionStatus
      }
    });

  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/newsletter/subscribers - Get subscribers (admin only)
export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') || 'active';
    const search = searchParams.get('search') || '';

    const { db } = await connectToDatabase();
    const collection = db.collection("subscribers");

    // Build query
    const query: any = {};
    if (status !== 'all') {
      query.subscriptionStatus = status;
    }
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    // Get subscribers with pagination
    const subscribers = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    return NextResponse.json({
      success: true,
      subscribers: subscribers.map(sub => ({
        id: sub._id.toString(),
        email: sub.email,
        name: sub.name,
        source: sub.source,
        status: sub.subscriptionStatus,
        tags: sub.tags,
        segments: sub.segments,
        createdAt: sub.createdAt,
        lastActivityAt: sub.lastActivityAt
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Get subscribers error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}