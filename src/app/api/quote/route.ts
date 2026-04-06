import { NextRequest, NextResponse } from "next/server";
import { saveQuoteRequest } from "@/lib/database";
import { sendQuoteRequestConfirmation, sendQuoteRequestToTeam } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, company, projectType, budget, timeline, message } = body;

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, projectType, message" },
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

    // Prevent spam
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long" },
        { status: 400 }
      );
    }

    // Save to database
    const quoteRequest = await saveQuoteRequest({
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      message,
    });

    // Send confirmation email to user
    await sendQuoteRequestConfirmation(email, name, projectType);

    // Send notification email to team
    await sendQuoteRequestToTeam(
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      message
    );

    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully. We'll contact you within 2 business days.",
        requestId: quoteRequest._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote request error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request. Please try again later." },
      { status: 500 }
    );
  }
}
