import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import {
  SectionHeading,
  ServiceHero,
  ServiceSection,
} from "@/app/(marketing)/services/_components/service-primitives";
import {
  getPortfolioProject,
  portfolioProjects,
} from "../_content";

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <SiteShell>
      <ServiceHero
        eyebrow={`Portfolio / ${project.label}`}
        title={project.title}
        description={project.summary}
        primaryLabel="Talk to Our Team"
        primaryHref="/contact"
        secondaryLabel="Back to Portfolio"
        secondaryHref="/portfolio"
        stats={[
          { label: "Sector", value: project.sector },
          { label: "Services", value: `${project.services.length} workstreams` },
          { label: "Outcome", value: project.outcome },
        ]}
      />

      <ServiceSection className="py-18 lg:py-22">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="Project Story"
              title="What needed to change"
              description={project.challenge}
            />
            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-700">
              {project.solution}
            </div>
          </div>

          <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,#082f49,#155e75)] p-8 text-white shadow-[0_30px_90px_rgba(8,47,73,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Human + AI Flow
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              The interaction model stays understandable for both users and teams
            </h2>
            <div className="mt-8 space-y-4">
              {project.aiHumanFlow.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-4 text-sm leading-7 text-cyan-50"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
              Impact
            </p>
            <div className="mt-6 space-y-4">
              {project.impact.map((item) => (
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

          <div className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Delivery Approach
            </p>
            <div className="mt-6 space-y-4">
              {project.deliveryModel.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-cyan-100 bg-white px-5 py-4 text-sm leading-7 text-slate-700"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-semibold text-cyan-700">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="pb-24 pt-10">
        <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <SectionHeading
            eyebrow="Related Services"
            title="The work usually spans more than one service line"
            description="These projects combine product, systems, and workflow thinking rather than sitting inside a single narrow service bucket."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {project.services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {service}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Start a Similar Project
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700"
            >
              Explore Solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </ServiceSection>
    </SiteShell>
  );
}
