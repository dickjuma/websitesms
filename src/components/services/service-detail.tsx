import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ServiceSteps } from "@/components/services/service-steps";
import { SiteIcon } from "@/components/ui/site-icon";
import type { EnterpriseService } from "@/lib/enterprise-services";

function ServiceSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={["mx-auto max-w-7xl px-6 lg:px-8", className].filter(Boolean).join(" ")}>{children}</section>;
}

export function ServiceDetail({ service }: { service: EnterpriseService }) {
  return (
    <>
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
        <div aria-hidden="true" className="absolute right-[-8rem] top-8 h-80 w-80 rounded-full bg-white/80 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#dec8b1]/45 blur-3xl" />

        <ServiceSection className="relative py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="inline-flex rounded-full border border-stone-300 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6239]">
                {service.eyebrow}
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-stone-950 sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">{service.heroSummary}</p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={service.cta.primaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-stone-800"
                >
                  {service.cta.primaryLabel}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href={service.cta.secondaryHref}
                  className="inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white px-6 py-4 text-base font-semibold text-stone-900 transition hover:border-stone-400"
                >
                  {service.cta.secondaryLabel}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stone-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2.2rem] border border-stone-200/80 bg-white shadow-[0_26px_80px_rgba(28,25,23,0.12)]">
                <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-5 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-300" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Preview</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 left-6 hidden max-w-xs rounded-[1.5rem] border border-stone-200 bg-white/95 p-4 shadow-[0_18px_50px_rgba(28,25,23,0.12)] backdrop-blur md:block">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Why It Works</p>
                <p className="mt-2 text-sm leading-7 text-stone-700">
                  Stronger hierarchy, clearer workflows, and production-ready structure keep the experience useful beyond launch day.
                </p>
              </div>
            </div>
          </div>
        </ServiceSection>
      </section>

      <ServiceSection className="py-18">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,241,232,0.86))] p-8 shadow-[0_20px_60px_rgba(28,25,23,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c6239]">What This Service Does</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
              Clear value, not technical noise
            </h2>
            <p className="mt-4 text-base leading-8 text-stone-600">
              Each engagement is framed around operational gain, decision clarity, and a cleaner path from need to working system.
            </p>
          </div>

          <div className="grid gap-4">
            {service.whatItDoes.map((item) => (
              <article
                key={item}
                className="flex gap-4 rounded-[1.7rem] border border-stone-200 bg-white px-5 py-5 shadow-[0_16px_45px_rgba(28,25,23,0.05)]"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#8c6239]" />
                <p className="text-sm leading-7 text-stone-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </ServiceSection>

      <section className="border-y border-stone-200 bg-stone-50/70">
        <ServiceSection className="py-18">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c6239]">How It Works</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950">
              A structured process that keeps delivery clear from kickoff to scale
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">
              The detail view carries the full story: how the service is scoped, designed, built, launched, and improved after release.
            </p>
          </div>

          <div className="mt-10">
            <ServiceSteps steps={service.steps} />
          </div>
        </ServiceSection>
      </section>

      <ServiceSection className="py-18">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c6239]">Key Features</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950">
            Built for clarity, trust, and long-term usefulness
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {service.features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[1.9rem] border border-stone-200 bg-white p-6 shadow-[0_18px_48px_rgba(28,25,23,0.06)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-900">
                <SiteIcon icon={feature.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-stone-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </ServiceSection>

      <section className="border-y border-stone-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7f1e8_100%)]">
        <ServiceSection className="py-18">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c6239]">Visual Proof</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-950">
                Show the product, then support the story with evidence
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-600">
                The visual layer gives buyers something concrete to react to while the proof cards explain how the service supports operations, growth, and delivery confidence.
              </p>

              <div className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_22px_70px_rgba(28,25,23,0.08)]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 self-end">
              {service.proof.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.7rem] border border-stone-200 bg-white px-5 py-5 shadow-[0_16px_45px_rgba(28,25,23,0.06)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{item.label}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-stone-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </ServiceSection>
      </section>

      <ServiceSection className="py-18">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_rgba(28,25,23,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c6239]">Tech Stack</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
            Trust builders that show how the work is delivered
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {service.techStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="pb-24">
        <div className="overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#16110a,#8c6239)] px-8 py-10 text-white shadow-[0_30px_90px_rgba(77,53,28,0.28)] sm:px-10 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Final CTA</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{service.cta.title}</h2>
              <p className="mt-4 text-base leading-8 text-white/80">{service.cta.description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={service.cta.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-stone-950 transition hover:bg-stone-100"
              >
                {service.cta.primaryLabel}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={service.cta.secondaryHref}
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                {service.cta.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </ServiceSection>
    </>
  );
}
