import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CtaBanner, PageHero, SiteShell } from "@/components/layout/site-shell";

type DetailPageProps = {
  section?: "marketing" | "platform";
  activeHref?: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  capabilities: string[];
  outcomes: string[];
  considerations?: string[];
  steps?: { title: string; description: string }[];
  imageSrc?: string;
  imageAlt?: string;
  relatedLinks: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
};

export function DetailPage({
  section = "marketing",
  eyebrow,
  title,
  description,
  highlights,
  capabilities,
  outcomes,
  considerations = [],
  steps = [],
  imageSrc,
  imageAlt,
  relatedLinks,
  ctaLabel,
  ctaHref,
}: DetailPageProps) {
  return (
    <SiteShell section={section}>
      <PageHero eyebrow={eyebrow} title={title} description={description} ctaLabel={ctaLabel} ctaHref={ctaHref} />

      {/* Hero image – optional */}
      {imageSrc && (
        <section className="mx-auto max-w-7xl px-4 pt-8 md:px-6 md:pt-12 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/7] w-full bg-slate-100">
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Highlights & Outcomes grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Highlights card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Why Teams Choose This
            </p>
            <ul className="mt-5 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes card */}
          <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
              What You Get
            </p>
            <ul className="mt-5 space-y-3">
              {outcomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg border border-cyan-100 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Capabilities & related links */}
      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Capabilities card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              What We Cover
            </p>
            <ul className="mt-5 space-y-3">
              {capabilities.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-700 shadow-sm">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related links card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Related Pages
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              Keep Exploring
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Jump into the next most useful page without bouncing back through the main navigation.
            </p>
            <ul className="mt-5 space-y-3">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-blue-200 hover:bg-white hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Considerations & Steps (optional) */}
      {(considerations.length > 0 || steps.length > 0) && (
        <section className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Considerations card */}
            {considerations.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Key Considerations
                </p>
                <p className="mt-3 text-base text-slate-600">
                  These are the main decisions we shape early so the service fits your users, team, and business goals.
                </p>
                <ul className="mt-5 space-y-3">
                  {considerations.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps card */}
            {steps.length > 0 && (
              <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                  Service Steps
                </p>
                <p className="mt-3 text-base text-slate-600">
                  A clear delivery flow helps the project move from planning into launch without hidden gaps.
                </p>
                <ul className="mt-5 space-y-4">
                  {steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="rounded-lg border border-cyan-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex gap-4">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-sm font-semibold text-cyan-700">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                          <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <CtaBanner />
    </SiteShell>
  );
}
