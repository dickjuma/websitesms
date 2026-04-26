import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/lib/pricing-types";

interface PricingCardProps {
  serviceSlug: string;
  plan: PricingPlan;
}

export function PricingCard({ serviceSlug, plan }: PricingCardProps) {
  const isSubscription = plan.priceType === "monthly";

  // Generate the smart URL
  const quoteUrl = `/quote?service=${serviceSlug}&plan=${plan.id}&type=${isSubscription ? 'subscription' : 'one-time'}&price=${plan.price}`;

  return (
    <div className={cn(
      "relative flex flex-col p-8 bg-white border rounded-2xl transition-all duration-300 hover:shadow-xl",
      plan.popular ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200"
    )}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
        <p className="mt-2 text-slate-500 text-sm leading-relaxed">{plan.description}</p>
        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900">
            KSh {plan.price.toLocaleString()}
          </span>
          {isSubscription && <span className="text-slate-500">/mo</span>}
        </div>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
            <Check className="h-5 w-5 text-blue-600 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={quoteUrl}
        className={cn(
          "w-full py-4 px-6 rounded-xl font-bold text-center transition-all active:scale-[0.98]",
          isSubscription
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
            : "bg-slate-900 text-white hover:bg-slate-800"
        )}
      >
        {isSubscription ? "Get Started" : "Request Quote"}
      </Link>
    </div>
  );
}
