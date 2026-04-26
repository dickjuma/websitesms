import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudiesPreview } from "@/lib/site-data";

export function PortfolioPreviewSection() {
  return (
    <section
      aria-labelledby="portfolio-heading"
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      {/* Section header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end md:mb-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Proof of Delivery
          </p>
          <h2
            id="portfolio-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
          >
            Real Projects, Real Results
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-blue-700 transition hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="View all case studies"
        >
          View All Case Studies
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Case studies grid - semantic list */}
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudiesPreview.map((study, index) => (
          <li key={index}>
            <Link href={study.href} aria-label={`Read case study: ${study.title}`}>
              <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:p-8">
                {/* Category badge */}
                <div className="mb-4 inline-flex">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {study.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-950 transition group-hover:text-blue-700 md:text-2xl">
                  {study.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  {study.description}
                </p>

                {/* Key result */}
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 md:text-sm">
                    Key Result
                  </p>
                  <p className="mt-2 text-base font-semibold text-green-600 md:text-lg">
                    {study.result}
                  </p>
                </div>

                {/* Call to action */}
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
