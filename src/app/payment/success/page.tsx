"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Download, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const quoteId = searchParams.get("quoteId");

  useEffect(() => {
    if (!quoteId) {
      router.push("/pricing");
    }
  }, [quoteId, router]);

  if (!quoteId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-slate-600">
            Your payment has been processed successfully. We'll start working on your project right away.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Order Details</h2>
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-slate-600">Order ID:</span>
              <span className="font-mono text-sm">{quoteId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Status:</span>
              <span className="text-green-600 font-medium">Confirmed</span>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <p className="text-sm text-slate-600">
                You'll receive an email confirmation with project timeline and next steps within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">What's Next?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="text-blue-600 mb-3">
                <Download className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Project Kickoff</h3>
              <p className="text-sm text-slate-600">
                We'll schedule a project kickoff call to discuss requirements and timeline.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="text-blue-600 mb-3">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Development Starts</h3>
              <p className="text-sm text-slate-600">
                Our team begins development according to the agreed specifications.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-sm text-slate-500">
          Questions? Contact us at{" "}
          <a href="mailto:hello@smassystems.com" className="text-blue-600 hover:underline">
            hello@smassystems.com
          </a>{" "}
          or call{" "}
          <a href="tel:+254719832719" className="text-blue-600 hover:underline">
            +254 719 832 719
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 h-8 w-8" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}