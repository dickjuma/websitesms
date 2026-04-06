import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";

type ServiceResult = {
  status: string;
  error?: string;
  fromEmail?: string;
  model?: string;
  collections?: {
    contacts: number;
    newsletter_subscribers: number;
    quote_requests: number;
  };
};

type RecentContact = {
  email?: string;
  subject?: string;
  status?: string;
  createdAt?: string | Date;
};

type RecentNewsletterSubscriber = {
  email?: string;
  subscribedAt?: string | Date;
};

type RecentQuote = {
  email?: string;
  projectType?: string;
  createdAt?: string | Date;
};

type HealthResponse = {
  timestamp: string;
  services: Record<string, ServiceResult>;
  recentData?: {
    lastContact:
      | {
          submittedBy?: string;
          subject?: string;
          status?: string;
          createdAt?: string | Date;
        }
      | string;
    recentNewsletterSubscribers: {
      email?: string;
      subscribedAt?: string | Date;
    }[];
    recentQuotes: {
      email?: string;
      projectType?: string;
      createdAt?: string | Date;
    }[];
    error?: string;
  };
};

export async function GET() {
  const checks: HealthResponse = {
    timestamp: new Date().toISOString(),
    services: {},
  };

  try {
    try {
      const { db } = await connectToDatabase();

      const contactCollection = db.collection("contacts");
      const newsletterCollection = db.collection("newsletter_subscribers");
      const quoteCollection = db.collection("quote_requests");

      const [contactCount, newsletterCount, quoteCount] = await Promise.all([
        contactCollection.countDocuments(),
        newsletterCollection.countDocuments(),
        quoteCollection.countDocuments(),
      ]);

      checks.services.mongodb = {
        status: "Connected",
        collections: {
          contacts: contactCount,
          newsletter_subscribers: newsletterCount,
          quote_requests: quoteCount,
        },
      };
    } catch (error) {
      checks.services.mongodb = {
        status: "Error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    try {
      const resendKey = process.env.RESEND_API_KEY;
      const resendEmail = process.env.RESEND_FROM_EMAIL;

      if (!resendKey || !resendEmail) {
        throw new Error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL");
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${resendKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      checks.services.resend = {
        status: "Configured",
        fromEmail: resendEmail,
      };
    } catch (error) {
      checks.services.resend = {
        status: "Error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    try {
      const groqKey = process.env.GROQ_API_KEY;

      if (!groqKey) {
        throw new Error("Missing GROQ_API_KEY");
      }

      checks.services.groq = {
        status: "Configured",
        model: "llama-3.3-70b-versatile",
      };
    } catch (error) {
      checks.services.groq = {
        status: "Error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    try {
      const { db } = await connectToDatabase();

      const recentContact = (await db
        .collection("contacts")
        .findOne({}, { sort: { createdAt: -1 } })) as RecentContact | null;

      const recentNewsletters = (await db
        .collection("newsletter_subscribers")
        .find({})
        .limit(5)
        .toArray()) as RecentNewsletterSubscriber[];

      const recentQuotes = (await db
        .collection("quote_requests")
        .find({})
        .limit(5)
        .toArray()) as RecentQuote[];

      checks.recentData = {
        lastContact: recentContact
          ? {
              submittedBy: recentContact.email,
              subject: recentContact.subject,
              status: recentContact.status,
              createdAt: recentContact.createdAt,
            }
          : "No contacts yet",
        recentNewsletterSubscribers: recentNewsletters.map((subscriber) => ({
          email: subscriber.email,
          subscribedAt: subscriber.subscribedAt,
        })),
        recentQuotes: recentQuotes.map((quote) => ({
          email: quote.email,
          projectType: quote.projectType,
          createdAt: quote.createdAt,
        })),
      };
    } catch (error) {
      checks.recentData = {
        lastContact: "Unavailable",
        recentNewsletterSubscribers: [],
        recentQuotes: [],
        error: error instanceof Error ? error.message : "Failed to fetch data",
      };
    }

    return NextResponse.json(checks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Health check failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
