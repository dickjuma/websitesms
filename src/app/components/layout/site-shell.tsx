"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { SiteIcon } from "@/components/ui/site-icon";
import type { FeatureItem } from "@/lib/site-data";
import { marketingNavGroups, platformNavGroups } from "@/lib/site-data";

type SiteShellProps = {
  children: ReactNode;
  section?: "marketing" | "platform";
  hideFooter?: boolean;
};

export function SiteShell({ children, section = "marketing", hideFooter = false }: SiteShellProps) {
  const [siteInfo, setSiteInfo] = useState<{ phone: string; email: string }>({
    phone: "0719832719",
    email: "hello@smassystems.com",
  });

  useEffect(() => {
    fetch("/api/site", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSiteInfo({
            phone: data.data.phone || "0719832719",
            email: data.data.email || "hello@smassystems.com",
          });
        }
      })
      .catch(console.error);
  }, []);

  const footerGroups = section === "platform" ? platformNavGroups : marketingNavGroups;

  return (
    <>
      <Navbar />
      <div aria-hidden="true" className="h-[6rem] lg:h-[6.25rem]" />
      <main id="main-content">{children}</main>
      {!hideFooter && (
      <footer
        className="border-t border-slate-200 bg-white pb-8"
        aria-labelledby="footer-heading"
      >
        <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6 md:pt-14 lg:px-8">
          <div className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                SMA Systems
              </p>
              <h2
                id="footer-heading"
                className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl"
              >
                Build products, systems, and platforms with more clarity.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:mt-4">
                Strategy, engineering, and business systems delivery for companies that
                want better technical execution.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 md:mt-6"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {group.title}
                  </p>
                  <ul className="mt-3 space-y-2 md:mt-4 md:space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-700 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 md:mt-10 md:pt-8">
            <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row md:gap-4">
              <address className="not-italic">
                <a
                  href={`tel:${siteInfo.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteInfo.phone}
                </a>
              </address>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" aria-hidden="true" />
              <address className="not-italic">
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteInfo.email}
                </a>
              </address>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500 md:text-sm">
              &copy; {new Date().getFullYear()} SMA Systems and Softwares. All rights
              reserved. Icons by <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Flaticon</a>.
            </p>
          </div>
        </div>
      </footer>
      )}
    </>
  );
}

// ============================================================
// PageHero – flat, semantic hero for subpages
// ============================================================
type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  ctaHref = "/contact",
  ctaLabel = "Start Your Project",
}: PageHeroProps) {
  return (
    <section aria-labelledby="page-hero-title" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700 md:px-4 md:py-2">
            {eyebrow}
          </p>
          <h1 id="page-hero-title" className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-10 md:gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:px-6 md:py-3"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 md:px-6 md:py-3"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SectionIntro – semantic heading with optional alignment
// ============================================================
type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionIntroProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

// ============================================================
// SectionGrid – flat, semantic grid of feature cards
// ============================================================
type SectionGridProps = {
  items: FeatureItem[];
};

export function SectionGrid({ items }: SectionGridProps) {
  return (
    <ul className="grid gap-5 md:gap-6 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.title}>
          <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <SiteIcon icon={item.icon} className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
            <Link
              href={item.href}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition group-hover:gap-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}

// ============================================================
// HighlightPanel – flat panel with bullet points
// ============================================================
type HighlightPanelProps = {
  title: string;
  description: string;
  highlights: string[];
};

export function HighlightPanel({ title, description, highlights }: HighlightPanelProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16 lg:px-8">
      <div className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {description}
          </p>
        </div>
        <ul className="grid gap-3 md:gap-4">
          {highlights.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700 md:px-5 md:py-4"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// CtaBanner – flat, accessible call-to-action banner
// ============================================================
export function CtaBanner() {
  return (
    <section aria-labelledby="cta-banner-title" className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:py-16 lg:px-8">
      <div className="overflow-hidden rounded-xl bg-slate-900 px-6 py-8 text-white shadow-md sm:px-8 md:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
              Next Step
            </p>
            <h2 id="cta-banner-title" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Start Your Project
            </h2>
            <p className="mt-3 text-base leading-relaxed text-blue-100 md:text-lg">
              Bring your product, internal system, or platform idea into a delivery plan
              with a team built for execution.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 md:px-6 md:py-3"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
