import { NextRequest, NextResponse } from "next/server";
import { saveNewsletterSubscriber } from "@/lib/database";
import { sendNewsletterConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
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

    // Save to database
    await saveNewsletterSubscriber({
      email,
      name,
    });

    // Send confirmation email
    await sendNewsletterConfirmation(email, name);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter. Check your email for confirmation.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Newsletter signup error:", error);

    // Handle already subscribed case
    if (error instanceof Error && error.message === "Email already subscribed") {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
