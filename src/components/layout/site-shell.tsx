import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SiteIcon } from "@/components/ui/site-icon";
import type { FeatureItem } from "@/lib/site-data";
import { marketingNavGroups, platformNavGroups } from "@/lib/site-data";

type SiteShellProps = {
  children: ReactNode;
  section?: "marketing" | "platform";
};

export function SiteShell({
  children,
  section = "marketing",
}: SiteShellProps) {
  const footerGroups = section === "platform" ? platformNavGroups : marketingNavGroups;

  return (
    <main className="min-h-screen bg-[#ffffff] text-slate-900">
      <Navbar />
      <div aria-hidden="true" className="h-[5.5rem] lg:h-[5.75rem]" />

      {children}

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">SMA Systems</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              Build products, systems, and platforms with more clarity.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Strategy, engineering, and business systems delivery for companies that want better technical execution.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{group.title}</p>
                <div className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-slate-700 transition hover:text-blue-700">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

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
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(191,219,254,0.75),_transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.14),_transparent_58%)]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-18 lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            {eyebrow}
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">{description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-700"
            >
              {ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type SectionGridProps = {
  items: FeatureItem[];
};

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
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
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}

export function SectionGrid({ items }: SectionGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]"
        >
          <div className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 shadow-sm">
            <SiteIcon icon={item.icon} className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-semibold text-slate-950">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
          <Link
            href={item.href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition group-hover:text-cyan-600"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </article>
      ))}
    </div>
  );
}

type HighlightPanelProps = {
  title: string;
  description: string;
  highlights: string[];
};

export function HighlightPanel({ title, description, highlights }: HighlightPanelProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
        <div className="grid gap-4">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-[1.6rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <div className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] px-8 py-10 text-white shadow-[0_30px_90px_rgba(30,64,175,0.22)] sm:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">Next Step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Start Your Project</h2>
            <p className="mt-4 text-lg leading-8 text-blue-100">
              Bring your product, internal system, or platform idea into a delivery plan with a team built for execution.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-blue-50"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
