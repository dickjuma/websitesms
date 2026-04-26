export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Briefcase } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { portfolioProjects } from "./_content";

export const metadata: Metadata = {
  title: "Portfolio | Our Projects & Work | SMA Systems Kenya",
  description: "Browse our portfolio of software development projects. Web apps, mobile apps, ERP systems, and AI solutions built for Kenyan businesses.",
  keywords: ["portfolio", "our projects", "software projects", "web development examples", "mobile app examples", "Kenya software company"],
  openGraph: {
    title: "Portfolio | Our Projects & Work | SMA Systems Kenya",
    description: "Browse our portfolio of software development projects built for Kenyan businesses.",
  },
};

export default function PortfolioPage() {
  return (
    <SiteShell>
      <main className="bg-white">
        {/* Hero Section */}
        <section aria-labelledby="portfolio-hero-title" className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Portfolio</p>
              <h1 id="portfolio-hero-title" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
                A broader look at product, system, and workflow execution
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                The portfolio shows not just the visual outcome, but the operational thinking, delivery model, and human + AI interaction design behind the work.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Talk to Our Team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Explore Solutions
                </Link>
              </div>
              <dl className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <Briefcase className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  <span className="font-medium text-slate-700">{portfolioProjects.length} showcase stories</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <span className="font-medium text-slate-700">Case-study style detail</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <span className="font-medium text-slate-700">Execution + clarity</span>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section aria-labelledby="projects-heading" className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Selected Work</p>
            <h2 id="projects-heading" className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">
              Each project explains the challenge, solution model, and real operating outcome
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Instead of a generic overview, the portfolio shows how the work supports teams, users, and business operations in practice.
            </p>
          </div>

          {portfolioProjects.length === 0 ? (
            <div className="mt-12 flex flex-col items-center rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
              <Briefcase className="mb-2 h-10 w-10 text-slate-300" aria-hidden="true" />
              <p className="text-sm text-slate-500">No portfolio projects yet.</p>
            </div>
          ) : (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolioProjects.map((project) => (
                <li key={project.slug}>
                  <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{project.label}</p>
                    <h3 className="mt-3 text-lg font-bold text-slate-950 group-hover:text-blue-700 transition">
                      <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">{project.summary}</p>
                    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">
                      {project.outcome}
                    </div>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:gap-2 transition-all"
                    >
                      Open case story
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* What the Work Shows + Design Direction */}
        <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left card */}
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">What The Work Shows</p>
                <h2 className="mt-3 text-xl font-bold text-slate-950">The strongest portfolio examples connect product quality to operational usefulness</h2>
                <p className="mt-3 text-sm text-slate-600">
                  We want the portfolio to show more than polished screenshots. It should make clear how the design, system architecture, support flows, and admin usability come together.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Product interfaces should be easier to learn, not just visually cleaner.",
                    "Back‑office workflows should reduce internal friction, not create a prettier version of the same problem.",
                    "AI layers should support humans, preserve context, and make service simpler instead of more confusing.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right card – flat, solid background */}
              <div className="rounded-lg bg-slate-900 p-6 text-white shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Design Direction</p>
                <h2 className="mt-3 text-xl font-bold">Enterprise simplicity should still feel modern and approachable</h2>
                <p className="mt-3 text-sm text-slate-300">
                  The portfolio now leans into that principle directly: cleaner presentation, stronger hierarchy, and clearer system thinking without falling into stiff or overly corporate templates.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services"
                    className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Explore Services
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    Start a Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
