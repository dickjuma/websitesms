"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { SiteShell, SectionIntro } from "@/components/layout/site-shell";
import { SiteIcon } from "@/components/ui/site-icon";
import { QuoteForm } from "@/components/forms/quote-form";
import { pricingFAQ as importedFAQ, servicePricingData as importedPricingData } from "@/lib/site-data";

// Provide fallback data in case imports are missing
const pricingFAQ = Array.isArray(importedFAQ) ? importedFAQ : [];
const servicePricingData = Array.isArray(importedPricingData) && importedPricingData.length > 0
  ? importedPricingData
  : [];

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

const pricingNotes = [
  "Indicative 2026 Kenya market ranges, shown in Kenyan shillings.",
  "Starting prices cover the listed tier scope only and exclude VAT unless agreed otherwise.",
  "Complex integrations, migrations, hardware, or regulated compliance work are quoted separately.",
];

const includedInEveryProject = [
  {
    title: "Discovery and scoping",
    description: "We define the business workflow, user roles, and the first release clearly before build starts.",
  },
  {
    title: "UX and technical planning",
    description: "Every project includes structure, delivery planning, and architecture choices that fit the scope.",
  },
  {
    title: "Implementation and QA",
    description: "We build, review, and test the agreed scope before rollout or handover.",
  },
  {
    title: "Launch readiness",
    description: "Deployment guidance, handover, and early launch support are included in the base engagement.",
  },
];

const engagementModels = [
  {
    title: "Fixed Scope Project",
    description: "Best when the features and timeline are already clear.",
    features: ["Clear deliverables", "Milestone billing", "Defined timeline", "Best for websites and focused systems"],
  },
  {
    title: "Phased Delivery",
    description: "Best when you want to start with an MVP and expand after launch.",
    features: ["Lean first release", "Prioritized roadmap", "Controlled budget", "Great for SaaS, CRM, and ERP rollouts"],
  },
  {
    title: "Monthly Retainer",
    description: "Best when you need ongoing product, support, or enhancement work.",
    features: ["Predictable monthly cost", "Priority queue", "Continuous iteration", "Strong fit for support and growth teams"],
  },
];

export default function PricingPage() {
  const [expandedService, setExpandedService] = useState<string>(servicePricingData[0]?.service ?? "");

  const toggleService = (service: string) => {
    setExpandedService((current) => (current === service ? "" : service));
  };

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_50%,#0369a1_100%)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-300/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-300/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
              Pricing In KSh
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Complete service pricing built for the Kenya market
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100 sm:text-xl">
              Explore indicative pricing for every service SMA offers.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#service-pricing"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-blue-50"
              >
                Explore Pricing
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#quote"
                className="inline-flex items-center justify-center rounded-2xl border border-blue-200/40 bg-transparent px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Request Custom Quote
              </Link>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {pricingNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-4 text-sm leading-7 text-blue-50 backdrop-blur-sm"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <SectionIntro
          eyebrow="How Pricing Works"
          title="Market-aligned ranges, then tailored scoping"
          description="These figures are meant to help teams budget realistically in Kenya before discovery."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Service Pricing</h2>
        {servicePricingData.length === 0 ? (
          <p className="text-gray-600">Loading pricing data...</p>
        ) : (
          servicePricingData.map((service) => (
            <div key={service.service} className="mb-6">
              <h3 className="text-lg font-semibold">{service.service}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        {pricingFAQ.map((item) => (
          <div key={item.question} className="mb-4">
            <h3 className="font-semibold">{item.question}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <h2 className="text-2xl font-bold mb-6" id="quote">Request a Quote</h2>
        <QuoteForm />
      </section>
    </SiteShell>
  );
}
