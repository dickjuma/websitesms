import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";

interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  service: string;
  location: string;
  budget: string;
  timeline: string;
  message: string;
  triggerSource: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
}

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();

    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone || !leadData.company) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Save lead to database
    const result = await db.collection("leads").insertOne({
      ...leadData,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
      source: "lead_form",
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    });

    // Send instant response email (you can implement this)
    // await sendInstantResponseEmail(leadData);

    // Log the conversion
    console.log(`New lead captured: ${leadData.name} - ${leadData.service} in ${leadData.location}`);

    return NextResponse.json({
      success: true,
      leadId: result.insertedId.toString(),
      message: "Lead captured successfully"
    });

  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Get leads for admin (you might want to move this to admin API)
export async function GET(request: NextRequest) {
  // This would be for admin dashboard, but let's keep it simple for now
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}