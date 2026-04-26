export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import {
  SectionHeading,
  ServiceHero,
  ServiceSection,
} from "@/app/(marketing)/services/_components/service-primitives";
import { solutionShowcases } from "./_content";

export const metadata: Metadata = {
  title: "Industry Solutions | Software for Your Sector | SMAS Systems",
  description: "Industry-specific software solutions in Kenya. ERP, CRM, and custom software for retail, healthcare, finance, logistics, education, and more.",
  keywords: ["industry solutions", "sector software", "ERP for retail", "healthcare software", "fintech solutions", "logistics software", "education technology"],
  openGraph: {
    title: "Industry Solutions | Software for Your Sector | SMAS Systems",
    description: "Industry-specific software solutions tailored for Kenyan businesses.",
  },
};

export default function SolutionsPage() {
  return (
    <SiteShell>
      <ServiceHero
        eyebrow="Solutions"
        title="Industry solution pages with more depth, more clarity, and more practical AI thinking"
        description="These solution routes now follow the stronger services-page structure so each industry can explain the workflow, the human and AI model, and the outcomes more clearly."
        primaryLabel="Start a Project"
        primaryHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
        stats={[
          { label: "Industries", value: `${solutionShowcases.length} focused routes` },
          { label: "Pattern", value: "Service-style storytelling" },
          { label: "Approach", value: "Human + AI orchestration" },
        ]}
      />

      <ServiceSection className="py-18 lg:py-22">
        <SectionHeading
          eyebrow="Industry Routes"
          title="Each solution now opens up the operating story behind the sector"
          description="Instead of a generic detail wrapper, every route can now explain how the business works, where automation helps, and where human control still matters."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {solutionShowcases.map((solution) => (
            <article
              key={solution.slug}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                {solution.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                {solution.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {solution.summary}
              </p>
              <div className="mt-6 space-y-3">
                {solution.positioning.slice(0, 2).map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href={`/solutions/${solution.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-cyan-600"
              >
                Open solution route
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="Human + AI"
              title="The strongest solutions make automation feel simple, not invasive"
              description="Across these industry routes, we treat AI as a support layer inside an understandable workflow. Teams should gain speed without losing control, context, or accountability."
            />
            <div className="mt-8 space-y-4">
              {[
                "AI handles repetitive search, summarization, routing, and first-pass support work.",
                "Humans stay present at approvals, edge cases, sensitive service moments, and relationship-driven interactions.",
                "The interface should make handoff obvious so users never wonder whether they can reach a real person.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] p-8 text-white shadow-[0_30px_90px_rgba(30,64,175,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
              Why This Matters
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              Better solution pages create better project conversations
            </h2>
            <p className="mt-4 text-base leading-8 text-blue-100">
              These pages now make it easier for buyers and internal teams to
              see how a platform will actually work across product, operations,
              support, and adoption.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
              >
                View Portfolio
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </ServiceSection>
    </SiteShell>
  );
}
