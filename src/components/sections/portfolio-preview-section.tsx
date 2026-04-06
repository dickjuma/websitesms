import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudiesPreview } from "@/lib/site-data";

export function PortfolioPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-16">
        <div className="flex items-center justify-between gap-4 sm:flex-row flex-col sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Proof of Delivery</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Real Projects, Real Results
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="whitespace-nowrap inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold"
          >
            View All Case Studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {caseStudiesPreview.map((study, i) => (
          <Link key={i} href={study.href}>
            <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-300 hover:shadow-lg cursor-pointer overflow-hidden">
              {/* Category badge */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {study.category}
                </span>
              </div>

              {/* Title and description */}
              <h3 className="text-2xl font-bold text-slate-950 group-hover:text-blue-700 transition">
                {study.title}
              </h3>
              <p className="mt-3 text-slate-600">{study.description}</p>

              {/* Result */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600">Key Result</p>
                <p className="mt-2 text-lg font-semibold text-green-600">{study.result}</p>
              </div>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-2 text-blue-700 group-hover:translate-x-1 transition">
                <span className="text-sm font-semibold">Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
