import { NextRequest, NextResponse } from "next/server";
import { saveBookDemoSubmission } from "@/lib/database";
import { sendBookDemoConfirmation, sendBookDemoNotificationToTeam } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, company, phone, serviceType, preferredDate, preferredTime, teamSize, notes } = body;

    if (!name || !email || !company || !serviceType || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prevent spam (max 500 characters in notes)
    if (notes && notes.length > 500) {
      return NextResponse.json(
        { error: "Notes are too long" },
        { status: 400 }
      );
    }

    // Save to database
    const submission = await saveBookDemoSubmission({
      name,
      email,
      company,
      phone: phone || null,
      serviceType,
      preferredDate,
      preferredTime,
      teamSize,
      notes: notes || null,
    });

    // Send confirmation email to user
    await sendBookDemoConfirmation(email, name, {
      date: preferredDate,
      time: preferredTime,
      serviceType,
    });

    // Send notification email to team
    await sendBookDemoNotificationToTeam({
      name,
      email,
      company,
      phone: phone || "Not provided",
      serviceType,
      preferredDate,
      preferredTime,
      teamSize,
      notes: notes || "None",
    });

    return NextResponse.json(
      { success: true, submissionId: submission?._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error booking demo:", error);
    return NextResponse.json(
      { error: "Failed to book demo. Please try again later." },
      { status: 500 }
    );
  }
}
