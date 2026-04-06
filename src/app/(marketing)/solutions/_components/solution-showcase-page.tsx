import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import {
  SectionHeading,
  ServiceHero,
  ServiceSection,
} from "@/app/(marketing)/services/_components/service-primitives";
import type { SolutionShowcase } from "../_content";

export function SolutionShowcasePage({
  solution,
}: {
  solution: SolutionShowcase;
}) {
  return (
    <SiteShell>
      <ServiceHero
        eyebrow={solution.eyebrow}
        title={solution.title}
        description={solution.heroDescription}
        primaryLabel="Talk to Our Team"
        primaryHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
        stats={solution.stats}
      />

      <ServiceSection className="py-18 lg:py-22">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="Industry Focus"
              title="Built around the real operating model, not a generic sector template"
              description={solution.summary}
            />
            <div className="mt-8 space-y-4">
              {solution.positioning.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] p-8 text-white shadow-[0_30px_90px_rgba(30,64,175,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
              Human + AI Integration
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              Useful automation with simple human control
            </h2>
            <p className="mt-4 text-base leading-8 text-blue-100">
              We position AI as a support layer inside a workflow, not as a
              confusing replacement for people. The result should feel simpler
              for customers and easier for teams to manage.
            </p>
            <div className="mt-8 space-y-4">
              {solution.aiHumanModel.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-4"
                >
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-blue-100">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="pb-10">
        <SectionHeading
          eyebrow="Delivery Tracks"
          title="The solution has to work across product, operations, and service"
          description="We shape each industry solution across the main lanes that determine whether it actually becomes usable day to day."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {solution.deliveryTracks.map((track) => (
            <article
              key={track.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.05)]"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                {track.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {track.description}
              </p>
            </article>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
              What We Cover
            </p>
            <div className="mt-6 space-y-4">
              {solution.capabilities.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-700 shadow-sm">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Outcomes
            </p>
            <div className="mt-6 space-y-4">
              {solution.outcomes.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-cyan-100 bg-white px-5 py-4 text-sm leading-7 text-slate-700"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
              Key Considerations
            </p>
            <div className="mt-6 space-y-4">
              {solution.considerations.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Delivery Flow
            </p>
            <div className="mt-6 space-y-4">
              {solution.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-cyan-100 bg-white px-5 py-5 shadow-[0_10px_30px_rgba(14,116,144,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-sm font-semibold text-cyan-700">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="pb-24 pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="Related Pages"
              title="Keep moving through the right next page"
              description="These routes are chosen to keep the conversation practical, whether you want service depth, pricing direction, or a direct project conversation."
            />
            <div className="mt-8 space-y-4">
              {solution.relatedLinks.map((link) => (
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

          <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,#082f49,#0f766e)] p-8 text-white shadow-[0_30px_90px_rgba(8,47,73,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Next Step
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              Shape the solution around your team, workflow, and delivery pressure
            </h2>
            <p className="mt-4 text-base leading-8 text-cyan-50">
              We can help you turn the industry idea into a scoped platform,
              a simpler operations layer, or a human + AI support workflow that
              fits the way your business actually runs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50"
              >
                Start a Project
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See Portfolio Work
              </Link>
            </div>
          </div>
        </div>
      </ServiceSection>
    </SiteShell>
  );
}
