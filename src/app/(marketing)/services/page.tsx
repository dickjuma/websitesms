import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/layout/site-shell";
import { ServiceGrid } from "@/components/services/service-grid";
import { enterpriseServices } from "@/lib/enterprise-services";
import { serviceItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description: "Enterprise-ready service previews with structured detail pages for software, web, and mobile delivery.",
};

const featuredHrefs = new Set(enterpriseServices.map((service) => `/services/${service.slug}`));
const additionalServices = serviceItems.filter((item) => !featuredHrefs.has(item.href));

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-stone-200 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.98),_rgba(247,241,232,0.92)_52%,_rgba(234,225,212,0.88)_100%)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(28,25,23,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,25,23,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-18 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-stone-300 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6239]">
              Services
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-stone-950 sm:text-6xl lg:text-7xl">
              Premium service pages built for clarity, structure, and conversion
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 sm:text-xl">
              Start with focused previews, move into a structured detail route, and keep every service simple enough to understand yet deep enough to trust.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-stone-800"
              >
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white px-6 py-4 text-base font-semibold text-stone-900 transition hover:border-stone-400"
              >
                View Delivery Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c6239]">Featured Services</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-5xl">
            High-impact previews for the services buyers ask about first
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            These routes now follow a cleaner enterprise pattern: stronger card previews, defined process steps, visual proof, trust builders, and clearer CTAs.
          </p>
        </div>
        <div className="mt-14">
          <ServiceGrid services={enterpriseServices} />
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50/70">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c6239]">More Capabilities</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950">
                Extend the catalog without changing the system
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-600">
                The structure is ready to absorb more service routes over time. For now, these supporting offers remain available while the new detail pattern rolls out service by service.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {additionalServices.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between gap-4 rounded-[1.6rem] border border-stone-200 bg-white px-5 py-4 text-sm font-semibold text-stone-900 shadow-[0_16px_40px_rgba(28,25,23,0.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(28,25,23,0.1)]"
                >
                  <span>{item.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
