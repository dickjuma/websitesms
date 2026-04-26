import { Sparkles } from "lucide-react";

interface PlanSummaryProps {
  serviceName: string;
  planName: string;
  price: number | null;
  type: string;
}

export function PlanSummary({ serviceName, planName, price, type }: PlanSummaryProps) {
  const isCustom = planName.toLowerCase().includes("custom");

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
      <div className="bg-blue-600 p-3 rounded-xl">
        <Sparkles className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">You selected</p>
        <h2 className="text-xl font-bold text-slate-900">
          {serviceName} &ndash; {planName}
        </h2>
        <p className="text-slate-600 mt-1">
          {isCustom ? "Custom Pricing" : `KSh ${price?.toLocaleString()} ${type === 'subscription' ? '/ month' : ''}`}
        </p>
        <p className="text-xs text-slate-400 mt-1">Billing: {type === 'subscription' ? 'Subscription' : 'One-time project'}</p>
      </div>
    </div>
  );
}
