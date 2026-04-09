import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceCard } from "@/components/services/service-card";
import type { EnterpriseService } from "@/lib/enterprise-services";

type ServiceGridProps = {
  services: EnterpriseService[];
};

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div className="grid gap-6 rounded-[2rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,241,232,0.9))] p-6 shadow-[0_20px_60px_rgba(28,25,23,0.06)] lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c6239]">How It Works</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
            Cards attract attention. Details explain. CTA converts.
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
            Start with a clear service summary, move into a structured detail page, and give buyers a confident next step without flooding the first screen with information.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4 text-sm leading-7 text-stone-700">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Level 1</span>
            Preview cards with one-line positioning, visual cues, and fast scanability.
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4 text-sm leading-7 text-stone-700">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Level 2</span>
            Dedicated detail routes with process, features, proof, and conversion-driven CTAs.
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center justify-between rounded-[1.5rem] border border-stone-200 bg-stone-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Explore Full Service Catalog
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
