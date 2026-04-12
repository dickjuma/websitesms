import { NextRequest, NextResponse } from "next/server";
import { saveContactSubmission } from "@/lib/database";
import { sendContactConfirmation, sendContactNotificationToTeam } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, subject, message, company, phone, serviceType } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, message" },
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

    // Prevent spam (max 5000 characters)
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long" },
        { status: 400 }
      );
    }

    // Send confirmation email to user FIRST (don't fail if this errors)
    console.log("=== Sending contact confirmation to user ===");
    try {
      const emailResult = await sendContactConfirmation(email, name, message);
      console.log("Contact confirmation email sent to:", email, "Result:", JSON.stringify(emailResult));
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    // Send notification email to team
    console.log("=== Sending contact notification to team ===");
    try {
      const teamResult = await sendContactNotificationToTeam(
        name,
        email,
        company,
        subject,
        message,
        serviceType
      );
      console.log("Contact notification email sent for:", name, "Result:", JSON.stringify(teamResult));
    } catch (emailError) {
      console.error("Failed to send team notification email:", emailError);
    }

    // Save to database AFTER sending emails
    const submission = await saveContactSubmission({
      name,
      email,
      subject,
      message,
      company,
      phone,
      serviceType,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully. Check your email for confirmation.",
        submissionId: submission._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again later." },
      { status: 500 }
    );
  }
}
