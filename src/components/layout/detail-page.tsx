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

      {imageSrc && (
        <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-8 lg:pt-14">
          <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[16/7] w-full bg-slate-100">
              <Image
                src={imageSrc}
                alt={imageAlt ?? title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">Why Teams Choose This</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">What You Get</p>
            <div className="mt-6 space-y-4">
              {outcomes.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-cyan-100 bg-white px-5 py-4 text-sm leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">What We Cover</p>
            <div className="mt-6 space-y-4">
              {capabilities.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-700 shadow-sm">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">Related Pages</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Keep Exploring</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Jump into the next most useful page without bouncing back through the main navigation.
            </p>

            <div className="mt-8 space-y-4">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:bg-white hover:text-blue-700"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {(considerations.length > 0 || steps.length > 0) && (
        <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8 lg:py-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">Key Considerations</p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                These are the main decisions we shape early so the service fits your users, team, and business goals.
              </p>
              <div className="mt-6 space-y-4">
                {considerations.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Service Steps</p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                A clear delivery flow helps the project move from planning into launch without hidden gaps.
              </p>
              <div className="mt-6 space-y-4">
                {steps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl border border-cyan-100 bg-white px-5 py-5 shadow-[0_10px_30px_rgba(14,116,144,0.08)]">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-sm font-semibold text-cyan-700">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </SiteShell>
  );
}
