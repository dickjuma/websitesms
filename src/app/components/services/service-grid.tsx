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
      {/* Services grid - semantic list */}
      <ul className="grid gap-6 xl:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>

      {/* How it works section - semantic aside */}
      <aside
        aria-label="How our service catalog works"
        className="grid gap-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            How It Works
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
            Cards attract attention. Details explain. CTA converts.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
            Start with a clear service summary, move into a structured detail
            page, and give buyers a confident next step without flooding the
            first screen with information.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <li className="rounded-xl border border-stone-200 bg-white px-5 py-4 text-sm text-stone-700">
            <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">
              Level 1
            </span>
            Preview cards with one‑line positioning, visual cues, and fast
            scanability.
          </li>
          <li className="rounded-xl border border-stone-200 bg-white px-5 py-4 text-sm text-stone-700">
            <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">
              Level 2
            </span>
            Dedicated detail routes with process, features, proof, and
            conversion‑driven CTAs.
          </li>
          <li>
            <Link
              href="/services"
              className="group flex items-center justify-between rounded-xl border border-stone-200 bg-stone-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
            >
              Explore Full Service Catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
