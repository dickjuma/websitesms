import { NextRequest, NextResponse } from "next/server";
import { saveQuoteRequest } from "@/lib/database";
import { sendQuoteRequestConfirmation, sendQuoteRequestToTeam } from "@/lib/email";
import { detectLeadQuality } from "@/lib/quote-schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      service,
      plan,
      type,
      price,
      budget,
      timeline,
      message,
      timestamp,
      source,
    } = body;

    const validationErrors: string[] = [];

    if (!name || name.length < 2) validationErrors.push("Name is required");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationErrors.push("Valid email is required");
    if (!phone || phone.length < 5) validationErrors.push("Phone number is required");
    if (!message || message.length < 10) validationErrors.push("Message must be at least 10 characters");

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors.join(", ") },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    const serviceLabel = service ? service.charAt(0).toUpperCase() + service.slice(1) : "Custom";
    const planLabel = plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : "Custom";
    const typeLabel = type === 'subscription' ? 'Subscription' : 'One-time';

    // Advanced Lead Tagging
    let computedLeadQuality: 'hot' | 'warm' | 'cold' = 'warm';
    if (plan?.toLowerCase().includes('custom') || budget) {
      computedLeadQuality = 'hot';
    } else if (type === 'subscription') {
      computedLeadQuality = 'warm';
    }

    try {
      const emailResult = await sendQuoteRequestConfirmation(email, name, serviceLabel);
      console.log("Quote confirmation email sent:", emailResult && 'id' in emailResult ? emailResult.id : "success");
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    try {
      const teamResult = await sendQuoteRequestToTeam(
        name,
        email,
        company,
        serviceLabel,
        budget,
        timeline,
        message,
        phone,
        planLabel,
        type,
        computedLeadQuality
      );
      console.log("Team notification sent:", teamResult && 'id' in teamResult ? teamResult.id : "success");
    } catch (emailError) {
      console.error("Failed to send team notification:", emailError);
    }

    const quoteRequest = await saveQuoteRequest({
      name,
      email,
      phone: phone || "",
      company: company || "",
      projectType: serviceLabel,
      plan: plan || "Custom",
      type: type === 'subscription' ? 'Subscription' : 'One-time',
      price: price || null,
      budget: budget || "",
      timeline: timeline || "",
      message,
      timestamp: timestamp || new Date().toISOString(),
      source: source || "website",
      leadQuality: computedLeadQuality,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully",
        requestId: quoteRequest._id,
        leadQuality: computedLeadQuality,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request. Please try again." },
      { status: 500 }
    );
  }
}
