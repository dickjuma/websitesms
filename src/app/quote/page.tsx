"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { ServicePrice } from "@/lib/database";
import { PlanSummary } from "@/lib/plan-summary";
import { SiteShell } from "@/components/layout/site-shell";
import { useGoogleAnalytics } from "@/lib/analytics";

function QuoteFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([]);
  const { trackQuoteRequest, trackConversion } = useGoogleAnalytics();

  // Fetch service prices on mount
  useMemo(() => {
    fetch('/api/service-prices')
      .then(res => res.json())
      .then(data => setServicePrices(data))
      .catch(err => console.error('Failed to fetch service prices:', err));
  }, []);

  const config = useMemo(() => {
    const serviceName = searchParams.get("service");
    const planType = searchParams.get("plan") || searchParams.get("type");
    const type = searchParams.get("type") || "onetime";
    const price = searchParams.get("price");

    const service = servicePrices.find(s => s.serviceName === serviceName);

    return {
      service,
      planType,
      type,
      price: price ? Number(price) : (service ? (type === 'monthly' ? service.monthlyPrice : service.oneTimePrice) : null),
      isCustom: planType?.toLowerCase().includes("custom") || !service,
    };
  }, [searchParams, servicePrices]);

  // Dynamic Zod Schema
  const schema = useMemo(() => {
    return z.object({
      name: z.string().min(2, "Full name is required"),
      email: z.string().email("Please enter a valid email"),
      phone: z.string().min(10, "Valid phone number is required"),
      company: z.string().optional(),
      budget: config.isCustom
        ? z.string().min(1, "Please select an estimated budget")
        : z.string().optional(),
      message: config.type === "one-time"
        ? z.string().min(20, "Please provide more project details (min 20 chars)")
        : z.string().max(2000).optional(),
    });
  }, [config.isCustom, config.type]);

  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your request...");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          service: config.service?.serviceName || searchParams.get("service") || "Custom",
          plan: config.planType || "Custom",
          type: config.type,
          price: config.price,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error();

      const result = await response.json();

      // Track conversion
      trackQuoteRequest(
        config.service?.serviceName || searchParams.get("service") || "Custom",
        searchParams.get("location") || undefined
      );
      trackConversion('quote_request', config.price);

      toast.success("Request sent successfully!", { id: toastId });

      // Redirect based on plan type
      if (config.type === 'onetime' && config.price && config.price > 0) {
        // Redirect to payment page for one-time purchases
        setTimeout(() => router.push(`/payment?quoteId=${result.requestId}&amount=${config.price}`), 2000);
      } else {
        // Redirect to home for subscriptions or custom quotes
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!config.service && servicePrices.length > 0) {
    return <div className="text-center py-20">Invalid service selected. <a href="/pricing" className="text-blue-600 font-bold">Return to Pricing</a></div>;
  }

  if (servicePrices.length === 0) {
    return <div className="text-center py-20"><Loader2 className="animate-spin text-blue-600 mx-auto mb-4" /> Loading...</div>;
  }

  return (
    <SiteShell>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Complete your request</h1>
          <p className="text-slate-500 mt-2 font-medium">Takes less than 60 seconds.</p>
        </div>

        <PlanSummary
          serviceName={config.service?.serviceName || searchParams.get("service") || "Custom"}
          planName={config.planType === 'monthly' ? 'Monthly Subscription' : config.planType === 'onetime' ? 'One-time Purchase' : 'Custom Solution'}
          price={config.price}
          type={config.type}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Full Name *</label>
            <input
              {...register("name")}
              className={`w-full p-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address *</label>
            <input
              {...register("email")}
              className={`w-full p-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="john@company.com"
            />
            {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Phone Number *</label>
            <input
              {...register("phone")}
              className={`w-full p-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="+254..."
            />
            {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Company Name</label>
            <input
              {...register("company")}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Optional"
            />
          </div>
        </div>

        {config.isCustom && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Estimated Budget *</label>
            <select
              {...register("budget")}
              className={`w-full p-3 rounded-xl border ${errors.budget ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-white`}
            >
              <option value="">Select an estimated budget...</option>
              <option value="under-100k">Under KSh 100,000</option>
              <option value="100k-300k">KSh 100,000 - 300,000</option>
              <option value="300k-750k">KSh 300,000 - 750,000</option>
              <option value="750k-1.5m">KSh 750,000 - 1,500,000</option>
              <option value="above-1.5m">Above KSh 1,500,000</option>
            </select>
            {errors.budget && <p className="text-red-500 text-xs font-bold">{errors.budget.message}</p>}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            {config.type === "one-time" ? "Project Details *" : "Message (Optional)"}
          </label>
          <textarea
            {...register("message")}
            rows={4}
            className={`w-full p-3 rounded-xl border ${errors.message ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            placeholder={config.type === "one-time" ? "Tell us about your requirements, timeline and goals..." : "Any additional notes?"}
          />
          {errors.message && <p className="text-red-500 text-xs font-bold">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-blue-100 transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              {config.type === "subscription" ? "Confirm Selection" : "Send Quote Request"}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm py-4">
          <ShieldCheck className="h-4 w-4" />
          <span>Your data is encrypted and secure. No spam, ever.</span>
        </div>
      </form>
    </div>
    </SiteShell>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <SiteShell>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-600 h-8 w-8" />
        </div>
      </SiteShell>
    }>
      <QuoteFormContent />
    </Suspense>
  );
}
