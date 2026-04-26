import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { emailQueue } from "@/lib/email-queue";
import { ObjectId } from "mongodb";

// Automation triggers and actions
const AUTOMATION_TRIGGERS = {
  // User subscribes to newsletter
  SUBSCRIPTION: 'subscription',

  // User visits specific pages
  PAGE_VISIT: 'page_visit',

  // User clicks email links
  EMAIL_CLICK: 'email_click',

  // User opens emails
  EMAIL_OPEN: 'email_open',

  // User becomes inactive (no activity for X days)
  INACTIVE: 'inactive',

  // Custom events
  CUSTOM: 'custom'
};

const AUTOMATION_ACTIONS = {
  // Send email campaign
  SEND_EMAIL: 'send_email',

  // Add/remove tags
  ADD_TAG: 'add_tag',
  REMOVE_TAG: 'remove_tag',

  // Update segments
  UPDATE_SEGMENT: 'update_segment',

  // Call webhook
  WEBHOOK: 'webhook'
};

// Default automation rules
const DEFAULT_AUTOMATION_RULES = [
  {
    name: "Welcome Email Sequence",
    trigger: {
      type: AUTOMATION_TRIGGERS.SUBSCRIPTION,
      conditions: {}
    },
    actions: [
      {
        type: AUTOMATION_ACTIONS.SEND_EMAIL,
        config: {
          templateId: "welcome_email",
          campaignId: "welcome_campaign"
        },
        delay: 0 // Send immediately
      }
    ],
    status: "active"
  },
  {
    name: "ERP Interest Follow-up",
    trigger: {
      type: AUTOMATION_TRIGGERS.PAGE_VISIT,
      conditions: {
        source: "/services/erp-systems"
      }
    },
    actions: [
      {
        type: AUTOMATION_ACTIONS.ADD_TAG,
        config: {
          tags: ["ERP Interest"]
        },
        delay: 0
      },
      {
        type: AUTOMATION_ACTIONS.SEND_EMAIL,
        config: {
          templateId: "erp_followup",
          campaignId: "erp_interest_campaign"
        },
        delay: 86400 // 24 hours later
      }
    ],
    status: "active"
  },
  {
    name: "Re-engagement Campaign",
    trigger: {
      type: AUTOMATION_TRIGGERS.INACTIVE,
      conditions: {
        timeDelay: 604800 // 7 days
      }
    },
    actions: [
      {
        type: AUTOMATION_ACTIONS.SEND_EMAIL,
        config: {
          templateId: "reengagement",
          campaignId: "reengagement_campaign"
        },
        delay: 0
      }
    ],
    status: "active"
  }
];

// GET /api/email/automation - Get automation rules
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("automation_rules");

    const rules = await collection.find({}).sort({ createdAt: -1 }).toArray();

    // If no rules exist, return defaults
    if (rules.length === 0) {
      return NextResponse.json({
        success: true,
        rules: DEFAULT_AUTOMATION_RULES.map((rule, index) => ({
          id: `default_${index}`,
          ...rule,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      });
    }

    return NextResponse.json({
      success: true,
      rules: rules.map(rule => ({
        id: rule._id.toString(),
        name: rule.name,
        trigger: rule.trigger,
        actions: rule.actions,
        status: rule.status,
        stats: rule.stats || {
          triggeredCount: 0,
          completedCount: 0,
          failedCount: 0
        },
        createdAt: rule.createdAt,
        updatedAt: rule.updatedAt
      }))
    });

  } catch (error) {
    console.error("Get automation rules error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/email/automation - Create automation rule
export async function POST(request: NextRequest) {
  try {
    const ruleData = await request.json();

    const { db } = await connectToDatabase();
    const collection = db.collection("automation_rules");

    const rule = {
      ...ruleData,
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        triggeredCount: 0,
        completedCount: 0,
        failedCount: 0
      }
    };

    const result = await collection.insertOne(rule);

    return NextResponse.json({
      success: true,
      rule: {
        id: result.insertedId.toString(),
        ...rule
      }
    });

  } catch (error) {
    console.error("Create automation rule error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/email/automation/[ruleId] - Update automation rule
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const ruleId = url.pathname.split('/').pop();

    if (!ruleId) {
      return NextResponse.json(
        { success: false, message: "Rule ID required" },
        { status: 400 }
      );
    }

    const updateData = await request.json();

    const { db } = await connectToDatabase();
    const collection = db.collection("automation_rules");

    const result = await collection.updateOne(
      { _id: new ObjectId(ruleId) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Rule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Rule updated successfully"
    });

  } catch (error) {
    console.error("Update automation rule error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/email/automation/[ruleId] - Delete automation rule
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const ruleId = url.pathname.split('/').pop();

    if (!ruleId) {
      return NextResponse.json(
        { success: false, message: "Rule ID required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("automation_rules");

    const result = await collection.deleteOne({ _id: new ObjectId(ruleId) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Rule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Rule deleted successfully"
    });

  } catch (error) {
    console.error("Delete automation rule error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}