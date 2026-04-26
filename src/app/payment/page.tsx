"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CreditCard, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/toast";
import Link from "next/link";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<any>(null);

  const quoteId = searchParams.get("quoteId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!quoteId) {
      router.push("/pricing");
      return;
    }

    // In a real app, you'd fetch quote details from the database
    // For now, we'll use the amount from URL params
    setQuoteDetails({
      id: quoteId,
      amount: amount ? Number(amount) : 0,
      service: searchParams.get("service") || "Service",
    });
  }, [quoteId, amount, router, searchParams]);

  const handlePayment = async (paymentMethod: string) => {
    setIsProcessing(true);
    const toastId = toast.loading(`Processing ${paymentMethod} payment...`);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // In a real app, you'd integrate with actual payment providers
      // For M-Pesa, Stripe, etc.

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteId,
          amount: quoteDetails?.amount,
          paymentMethod,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error();

      toast.success(`${paymentMethod} payment successful!`, { id: toastId });

      // Redirect to success page or dashboard
      setTimeout(() => router.push("/payment/success?quoteId=" + quoteId), 2000);
    } catch (error) {
      toast.error("Payment failed. Please try again.", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!quoteDetails) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quote
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Complete Your Payment
          </h1>
          <p className="text-slate-500 mt-2">
            Secure payment for your service request
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Service:</span>
              <span className="font-medium">{quoteDetails.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Quote ID:</span>
              <span className="font-mono text-sm">{quoteDetails.id}</span>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-blue-600">KSh {quoteDetails.amount?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Choose Payment Method</h2>

          {/* M-Pesa */}
          <button
            onClick={() => handlePayment("M-Pesa")}
            disabled={isProcessing}
            className="w-full bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-slate-900">M-Pesa</h3>
                <p className="text-sm text-slate-600">Pay with your M-Pesa mobile money</p>
              </div>
            </div>
          </button>

          {/* Card Payment */}
          <button
            onClick={() => handlePayment("Card")}
            disabled={isProcessing}
            className="w-full bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-slate-900">Credit/Debit Card</h3>
                <p className="text-sm text-slate-600">Visa, Mastercard, and other cards</p>
              </div>
            </div>
          </button>

          {/* Bank Transfer */}
          <button
            onClick={() => handlePayment("Bank Transfer")}
            disabled={isProcessing}
            className="w-full bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-slate-900">Bank Transfer</h3>
                <p className="text-sm text-slate-600">Direct bank transfer payment</p>
              </div>
            </div>
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <ShieldCheck className="h-4 w-4" />
          <span>Your payment information is encrypted and secure</span>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 text-center">
              <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
              <p className="text-lg font-semibold">Processing Payment...</p>
              <p className="text-sm text-slate-600">Please do not close this window</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 h-8 w-8" />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
