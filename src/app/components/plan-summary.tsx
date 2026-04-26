"use client";

import { Check, Sparkles } from "lucide-react";
import { formatCurrency, cn } from "@/lib/pricing-types";
import { formatServiceName, formatPlanName } from "@/lib/quote-schema";

interface PlanSummaryProps {
  service: string;
  plan: string;
  planName?: string;
  type: "subscription" | "one-time";
  price?: number;
  className?: string;
}

export function PlanSummary({ service, plan, planName, type, price, className }: PlanSummaryProps) {
  const serviceName = formatServiceName(service);
  const displayPlanName = planName || formatPlanName(plan);

  const isSubscription = type === "subscription";
  const priceDisplay = price ? formatCurrency(price) : "Custom Pricing";

  return (
    <div className={cn("rounded-xl border bg-slate-50 p-4", className)}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <Sparkles className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900">
            You selected:
          </h3>
          <div className="mt-1 space-y-1">
            <p className="text-lg font-bold text-slate-900">
              {serviceName} – {planName}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-green-600" />
                {priceDisplay}
                {isSubscription ? "/ month" : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-green-600" />
                Billing: {isSubscription ? "Subscription" : "One-time"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
