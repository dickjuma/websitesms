import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceSteps } from "@/components/services/service-steps";
import { SiteIcon } from "@/components/ui/site-icon";
import type { EnterpriseService } from "@/lib/enterprise-services";

function ServiceSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={["mx-auto max-w-7xl px-4 md:px-6 lg:px-8", className].filter(Boolean).join(" ")}>
      {children}
    </section>
  );
}

export function ServiceDetail({ service }: { service: EnterpriseService }) {
  return (
    <>
      {/* Hero Section */}
      <section
        aria-labelledby="service-hero-heading"
        className="border-b border-stone-200 bg-white"
      >
        <ServiceSection className="py-12 md:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                {service.eyebrow}
              </p>
              <h1 id="service-hero-heading" className="mt-6 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
                {service.heroSummary}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={service.cta.primaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                >
                  {service.cta.primaryLabel}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href={service.cta.secondaryHref}
                  className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-4 text-base font-semibold text-stone-900 transition hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                >
                  {service.cta.secondaryLabel}
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li key={tag}>
                    <span className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-600">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md">
                <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-5 py-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-3 w-3 rounded-full bg-red-300" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Preview
                  </span>
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
            </div>
          </div>
        </ServiceSection>
      </section>

      {/* What It Does Section */}
      <ServiceSection className="py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              What This Service Does
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
              Clear value, not technical noise
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Each engagement is framed around operational gain, decision clarity,
              and a cleaner path from need to working system.
            </p>
          </div>

          <ul className="grid gap-4">
            {service.whatItDoes.map((item) => (
              <li key={item}>
                <article className="flex gap-4 rounded-xl border border-stone-200 bg-white px-5 py-5 shadow-sm">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-stone-700">{item}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </ServiceSection>

      {/* Process Section */}
      <section className="border-y border-stone-200 bg-stone-50/50">
        <ServiceSection className="py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              How It Works
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">
              A structured process that keeps delivery clear from kickoff to scale
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              The detail view carries the full story: how the service is scoped,
              designed, built, launched, and improved after release.
            </p>
          </div>
          <div className="mt-10">
            <ServiceSteps steps={service.steps} />
          </div>
        </ServiceSection>
      </section>

      {/* Key Features Section */}
      <ServiceSection className="py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Key Features
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">
            Built for clarity, trust, and long‑term usefulness
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {service.features.map((feature) => (
            <li key={feature.title}>
              <article className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-stone-900">
                  <SiteIcon icon={feature.icon} className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-stone-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {feature.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </ServiceSection>

      {/* Visual Proof Section */}
      <section className="border-y border-stone-200 bg-white">
        <ServiceSection className="py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                Visual Proof
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">
                Show the product, then support the story with evidence
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                The visual layer gives buyers something concrete to react to while
                the proof cards explain how the service supports operations, growth,
                and delivery confidence.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md">
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

            <ul className="grid gap-4 self-end">
              {service.proof.map((item) => (
                <li key={item.title}>
                  <article className="rounded-xl border border-stone-200 bg-white px-5 py-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      {item.label}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      {item.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </ServiceSection>
      </section>

      {/* Tech Stack Section */}
      <ServiceSection className="py-12 md:py-16">
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Tech Stack
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">
            Trust builders that show how the work is delivered
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {service.techStack.map((item) => (
              <li key={item}>
                <span className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ServiceSection>

    </>
  );
}
