import { NextResponse } from "next/server";
import {
  connectToDatabase,
  saveContactSubmission,
  saveNewsletterSubscriber,
  saveQuoteRequest,
} from "@/lib/database";
import {
  sendContactConfirmation,
  sendContactNotificationToTeam,
  sendNewsletterConfirmation,
  sendQuoteRequestConfirmation,
  sendQuoteRequestToTeam,
} from "@/lib/email";

type TestResult = {
  name: string;
  status: string;
  error?: string;
  sentTo?: string;
  submissionId?: unknown;
  subscriberId?: unknown;
  quoteId?: unknown;
  collections?: string[];
};

type TestSuiteResponse = {
  timestamp: string;
  tests: TestResult[];
  summary?: {
    total: number;
    passed: number;
    failed: number;
    status: string;
  };
};

export async function POST() {
  const testResults: TestSuiteResponse = {
    timestamp: new Date().toISOString(),
    tests: [],
  };

  try {
    console.log("Testing MongoDB connection...");
    try {
      const { db } = await connectToDatabase();
      const collections = await db.listCollections().toArray();
      testResults.tests.push({
        name: "MongoDB Connection",
        status: "PASS",
        collections: collections.map((collection) => collection.name),
      });
    } catch (error) {
      testResults.tests.push({
        name: "MongoDB Connection",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    console.log("Testing save contact submission...");
    try {
      const testContact = await saveContactSubmission({
        name: "Test User",
        email: "test@example.com",
        subject: "Test Contact",
        message: "This is a test message",
        company: "Test Company",
        phone: "1234567890",
        serviceType: "Custom Web Development",
      });

      testResults.tests.push({
        name: "Save Contact Submission",
        status: "PASS",
        submissionId: testContact._id,
      });
    } catch (error) {
      testResults.tests.push({
        name: "Save Contact Submission",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    console.log("Testing save newsletter subscriber...");
    try {
      const timestamp = Date.now();
      const testNewsletter = await saveNewsletterSubscriber({
        email: `test-newsletter-${timestamp}@example.com`,
        name: "Test Newsletter",
      });

      testResults.tests.push({
        name: "Save Newsletter Subscriber",
        status: "PASS",
        subscriberId: testNewsletter._id,
      });
    } catch (error) {
      testResults.tests.push({
        name: "Save Newsletter Subscriber",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    console.log("Testing save quote request...");
    try {
      const testQuote = await saveQuoteRequest({
        name: "Test Quote",
        email: "test-quote@example.com",
        company: "Test Quote Company",
        projectType: "Custom Web Development",
        budget: "10000-50000",
        timeline: "3-6 months",
        message: "This is a test quote request",
      });

      testResults.tests.push({
        name: "Save Quote Request",
        status: "PASS",
        quoteId: testQuote._id,
      });
    } catch (error) {
      testResults.tests.push({
        name: "Save Quote Request",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    console.log("Testing send contact confirmation email...");
    try {
      await sendContactConfirmation("test@example.com", "Test User", "Test message");
      testResults.tests.push({
        name: "Send Contact Confirmation Email",
        status: "PASS",
        sentTo: "test@example.com",
      });
    } catch (error) {
      testResults.tests.push({
        name: "Send Contact Confirmation Email",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    console.log("Testing send contact team notification email...");
    try {
      await sendContactNotificationToTeam(
        "Test User",
        "test@example.com",
        "Test Company",
        "Test Subject",
        "Test message",
        "Custom Web Development"
      );
      testResults.tests.push({
        name: "Send Contact Team Notification Email",
        status: "PASS",
      });
    } catch (error) {
      testResults.tests.push({
        name: "Send Contact Team Notification Email",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    console.log("Testing send newsletter confirmation email...");
    try {
      await sendNewsletterConfirmation("test@example.com", "Test User");
      testResults.tests.push({
        name: "Send Newsletter Confirmation Email",
        status: "PASS",
        sentTo: "test@example.com",
      });
    } catch (error) {
      testResults.tests.push({
        name: "Send Newsletter Confirmation Email",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    console.log("Testing send quote request confirmation email...");
    try {
      await sendQuoteRequestConfirmation("test@example.com", "Test User", "Custom Web Development");
      testResults.tests.push({
        name: "Send Quote Request Confirmation Email",
        status: "PASS",
        sentTo: "test@example.com",
      });
    } catch (error) {
      testResults.tests.push({
        name: "Send Quote Request Confirmation Email",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    console.log("Testing send quote request team email...");
    try {
      await sendQuoteRequestToTeam(
        "Test User",
        "test@example.com",
        "Test Company",
        "Custom Web Development",
        "10000-50000",
        "3-6 months",
        "Test message"
      );
      testResults.tests.push({
        name: "Send Quote Request Team Email",
        status: "PASS",
      });
    } catch (error) {
      testResults.tests.push({
        name: "Send Quote Request Team Email",
        status: "FAIL",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    const passCount = testResults.tests.filter((test) => test.status === "PASS").length;
    const failCount = testResults.tests.filter((test) => test.status === "FAIL").length;

    testResults.summary = {
      total: testResults.tests.length,
      passed: passCount,
      failed: failCount,
      status: failCount === 0 ? "All tests passed" : `${failCount} tests failed`,
    };

    return NextResponse.json(testResults, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Test suite failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
