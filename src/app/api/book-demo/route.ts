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

    // Send confirmation email to user FIRST (don't fail if this errors)
    console.log("=== Sending demo confirmation to user ===");
    try {
      const emailResult = await sendBookDemoConfirmation(email, name, {
        date: preferredDate,
        time: preferredTime,
        serviceType,
      });
      console.log("Demo confirmation email sent to:", email, "Result:", JSON.stringify(emailResult));
    } catch (emailError) {
      console.error("Failed to send demo confirmation email:", emailError);
    }

    // Send notification email to team
    console.log("=== Sending demo notification to team ===");
    try {
      const teamResult = await sendBookDemoNotificationToTeam({
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
      console.log("Demo notification email sent for:", name, "Result:", JSON.stringify(teamResult));
    } catch (emailError) {
      console.error("Failed to send demo team notification email:", emailError);
    }

    // Save to database AFTER sending emails
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
