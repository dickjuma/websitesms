import { solutionItems } from "@/lib/site-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteIcon } from "@/components/ui/site-icon";

export function IndustriesServedSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Industries</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          We Serve Every Sector
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
          Deep expertise across industries means we understand your unique challenges and deliver targeted solutions.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        {solutionItems.map((industry, i) => (
          <Link key={i} href={industry.href}>
            <div className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md cursor-pointer">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 group-hover:scale-110 transition-transform">
                <SiteIcon icon={industry.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950 group-hover:text-blue-700 transition">
                {industry.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-grow">
                {industry.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-700 group-hover:translate-x-1 transition text-sm font-semibold">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Industry-specific callout */}
      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 px-8 py-6 text-center">
        <p className="text-slate-700">
            <strong>Do not see your industry?</strong> We work across all sectors.
            <Link href="/contact" className="ml-2 text-blue-700 hover:text-blue-800 underline font-semibold">
              Let us talk about your specific needs.
            </Link>
        </p>
      </div>
    </section>
  );
}
