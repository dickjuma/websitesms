"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import { ArrowRight, CheckCircle, Loader2, Phone, Building2, FileText, Sparkles } from "lucide-react";
import { PRICING_SERVICES } from "@/lib/pricing-types";
import { PlanSummary } from "@/components/plan-summary";

export function QuoteFormWithToast() {
  const router = useRouter();
  const searchParams = useSearchParams() ?? new URLSearchParams();

  const serviceParam = searchParams.get("service");
  const planParam = searchParams.get("plan");
  const typeParam = searchParams.get("type");
  const priceParam = searchParams.get("price");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine if service/plan are pre-selected from URL
  const hasPreselectedService = !!serviceParam;
  const hasPreselectedPlan = !!planParam;

  // Get service and plan data
  const selectedService = serviceParam || "";
  const selectedPlan = planParam || "";

  // Look up pricing info
  const pricingInfo = useMemo(() => {
    if (!selectedService || !selectedPlan) return null;
    const service = PRICING_SERVICES.find((s) => s.slug === selectedService);
    if (!service) return null;
    const plan = service.plans.find((p) => p.id === selectedPlan);
    if (!plan) return null;
    return { service, plan };
  }, [selectedService, selectedPlan]);

  // Determine effective type
  const effectiveType = useMemo(() => {
    if (pricingInfo) {
      return pricingInfo.plan.priceType === "monthly" ? "subscription" : "one-time";
    }
    if (typeParam === "subscription" || typeParam === "one-time") return typeParam;
    return "one-time";
  }, [pricingInfo, typeParam]);

  // Is custom plan?
  const isCustom = useMemo(() => {
    if (selectedPlan) {
      return selectedPlan.toLowerCase().includes("custom");
    }
    return false;
  }, [selectedPlan]);

  // Effective price
  const effectivePrice = useMemo(() => {
    if (pricingInfo) return pricingInfo.plan.price;
    if (priceParam) return Number(priceParam);
    return null;
  }, [pricingInfo, priceParam]);

  // Form definition - includes all possible fields
  type FormValues = {
    name: string;
    email: string;
    phone: string;
    company?: string;
    service?: string;
    plan?: string;
    message?: string;
    budget?: string;
  };

  // Build validation schema based on current context
  const buildSchema = () => {
    const base: Record<string, any> = {
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      phone: z.string().min(5, "Please enter a valid phone number"),
      company: z.string().optional(),
    };

    // service and plan required if not pre-selected
    if (!hasPreselectedService) {
      base.service = z.string().min(1, "Please select a service");
    }
    if (!hasPreselectedPlan) {
      base.plan = z.string().min(1, "Please select a plan");
    }

    // Message: required for one-time, optional for subscription
    if (effectiveType === "one-time") {
      base.message = z.string().min(10, "Please provide project details (at least 10 characters)").max(2000);
    } else {
      base.message = z.string().max(2000, "Message is too long").optional();
    }

    // Budget required if custom plan
    if (isCustom) {
      base.budget = z.string().min(1, "Please select a budget range");
    } else {
      base.budget = z.string().optional();
    }

    return z.object(base) as any;
  };

  const schema: any = useMemo(() => buildSchema(), [effectiveType, isCustom, hasPreselectedService, hasPreselectedPlan]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      ...(hasPreselectedService && { service: selectedService }),
      ...(hasPreselectedPlan && { plan: selectedPlan }),
    },
  });

  // Set service and plan from URL if they become available after initial render
  useEffect(() => {
    if (hasPreselectedService) setValue("service", selectedService as any);
    if (hasPreselectedPlan) setValue("plan", selectedPlan as any);
  }, [hasPreselectedService, hasPreselectedPlan, selectedService, selectedPlan, setValue]);

  // Reset plan when service changes (only for manual selection, not when pre-selected from URL)
  const watchedService = watch("service");
  useEffect(() => {
    if (!hasPreselectedPlan && watchedService) {
      setValue("plan", "");
    }
  }, [watchedService, hasPreselectedPlan, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || "",
      service: data.service || selectedService,
      plan: data.plan || selectedPlan,
      type: effectiveType,
      price: effectivePrice,
      budget: data.budget || "",
      message: data.message || "",
      timestamp: new Date().toISOString(),
      source: "website",
    };

    toast.loading("Submitting your request...", { id: "quote-submission", duration: 2000 });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit");
      }

      toast.success("Request sent successfully!", {
        id: "quote-submission",
        duration: 5000,
      });

      reset();
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.", {
        id: "quote-submission",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get plan options based on selected service for dropdown
  const planOptions = useMemo(() => {
    if (!watch("service")) return [];
    const service = PRICING_SERVICES.find((s) => s.slug === watch("service"));
    if (!service) return [];
    return service.plans.map((p) => ({ value: p.id, label: p.name }));
  }, [watch("service")]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Plan Summary */}
      {selectedService && selectedPlan && pricingInfo && (
        <PlanSummary
          service={selectedService}
          plan={selectedPlan}
          planName={pricingInfo.plan.name}
          type={effectiveType}
          price={effectivePrice || undefined}
        />
      )}

      {/* Name & Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="John Doe"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="john@company.com"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone & Company */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
            <Phone className="inline h-4 w-4 mr-1" />
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="phone"
            placeholder="+254 700 000 000"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 ${
              errors.phone ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
            <Building2 className="inline h-4 w-4 mr-1" />
            Company Name
          </label>
          <input
            {...register("company")}
            type="text"
            id="company"
            placeholder="Your company Ltd"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Service Selection - Show only if NOT pre-selected */}
      {!hasPreselectedService && (
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-slate-900 mb-2">
            Service Interested In <span className="text-red-500">*</span>
          </label>
          <select
            {...register("service", { required: true })}
            id="service"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${
              errors.service ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
          >
            <option value="">Select a service...</option>
            {PRICING_SERVICES.map((service) => (
              <option key={service.id} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
        </div>
      )}

      {/* Hidden field to register service when pre-selected */}
      {hasPreselectedService && (
        <input type="hidden" {...register("service", { required: true })} value={selectedService} />
      )}

      {/* Plan Selection - Show only if NOT pre-selected and service is selected */}
      {!hasPreselectedPlan && watch("service") && (
        <div>
          <label htmlFor="plan" className="block text-sm font-semibold text-slate-900 mb-2">
            Preferred Plan <span className="text-red-500">*</span>
          </label>
          <select
            {...register("plan", { required: true })}
            id="plan"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${
              errors.plan ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
          >
            <option value="">Select a plan...</option>
            {(() => {
              const svc = PRICING_SERVICES.find((s) => s.slug === watch("service"));
              if (!svc) return null;
              return svc.plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ));
            })()}
          </select>
          {errors.plan && <p className="mt-1 text-sm text-red-600">{errors.plan.message}</p>}
        </div>
      )}

      {/* Hidden field to register plan when pre-selected */}
      {hasPreselectedPlan && (
        <input type="hidden" {...register("plan", { required: true })} value={selectedPlan} />
      )}

      {/* Budget Field - Only for custom plans */}
      {isCustom && (
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-slate-900 mb-2">
            Estimated Budget <span className="text-red-500">*</span>
          </label>
          <select
            {...register("budget")}
            id="budget"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${
              errors.budget ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
          >
            <option value="">Select your budget...</option>
            <option value="Under KSh 100,000">Under KSh 100,000</option>
            <option value="KSh 100,000 - KSh 300,000">KSh 100,000 - KSh 300,000</option>
            <option value="KSh 300,000 - KSh 750,000">KSh 300,000 - KSh 750,000</option>
            <option value="KSh 750,000 - KSh 1,500,000">KSh 750,000 - KSh 1,500,000</option>
            <option value="Above KSh 1,500,000">Above KSh 1,500,000</option>
          </select>
          {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
        </div>
      )}

      {/* Project Description */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
          <FileText className="inline h-4 w-4 mr-1" />
          {effectiveType === "one-time" ? "Project Details" : "Project Details (Optional)"}{" "}
          <span className="text-red-500">{effectiveType === "one-time" ? "*" : ""}</span>
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          placeholder={
            effectiveType === "one-time"
              ? "Describe your project requirements, goals, features needed, timeline..."
              : "Tell us about your project (optional but helpful for better quote)"
          }
          className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 ${
            errors.message ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
          }`}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        <p className="mt-1 text-xs text-slate-500">{watch("message")?.length || 0}/2000 characters</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>{effectiveType === "subscription" ? "Get Started" : "Request Quote"}</span>
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      {/* Trust indicators */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-green-600" />
          Free consultation
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-green-600" />
          Response within 2 days
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-green-600" />
          No obligation
        </span>
      </div>
    </form>
  );
}
