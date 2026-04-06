import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import {
  SectionHeading,
  ServiceHero,
  ServiceSection,
} from "@/app/(marketing)/services/_components/service-primitives";
import { portfolioProjects } from "./_content";

export default function PortfolioPage() {
  return (
    <SiteShell>
      <ServiceHero
        eyebrow="Portfolio"
        title="A broader look at product, system, and workflow execution"
        description="The portfolio now uses the richer service-page structure so visitors can see not just the visual outcome, but the operational thinking, the delivery model, and the human + AI interaction design behind the work."
        primaryLabel="Talk to Our Team"
        primaryHref="/contact"
        secondaryLabel="Explore Solutions"
        secondaryHref="/solutions"
        stats={[
          { label: "Projects", value: `${portfolioProjects.length} showcase stories` },
          { label: "Pattern", value: "Case-study style detail" },
          { label: "Focus", value: "Execution + clarity" },
        ]}
      />

      <ServiceSection className="py-18 lg:py-22">
        <SectionHeading
          eyebrow="Selected Work"
          title="Each project now explains the challenge, the solution model, and the real operating outcome"
          description="Instead of a generic overview page, the portfolio is structured to show how the work supports teams, users, and business operations in practice."
        />
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {portfolioProjects.map((project) => (
            <article
              key={project.slug}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                {project.label}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                {project.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {project.summary}
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                {project.outcome}
              </div>
              <Link
                href={`/portfolio/${project.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-cyan-600"
              >
                Open case story
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
              eyebrow="What The Work Shows"
              title="The strongest portfolio examples connect product quality to operational usefulness"
              description="We want the portfolio to show more than polished screenshots. It should make clear how the design, system architecture, support flows, and admin usability come together."
            />
            <div className="mt-8 space-y-4">
              {[
                "Product interfaces should be easier to learn, not just visually cleaner.",
                "Back-office workflows should reduce internal friction, not create a prettier version of the same problem.",
                "AI layers should support humans, preserve context, and make service simpler instead of more confusing.",
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
              Design Direction
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              Enterprise simplicity should still feel modern and approachable
            </h2>
            <p className="mt-4 text-base leading-8 text-blue-100">
              The portfolio now leans into that principle directly: cleaner
              presentation, stronger hierarchy, and clearer system thinking
              without falling into stiff or overly corporate templates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </ServiceSection>
    </SiteShell>
  );
}
