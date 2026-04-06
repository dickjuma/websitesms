import { serviceFeatures } from "@/lib/site-data";
import { SiteIcon } from "@/components/ui/site-icon";
import { ArrowRight } from "lucide-react";

export function FeaturesHighlightSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
      {/* Decorative background element */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-white via-blue-50/20 to-white" />

      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Why Work With Us
          </span>
        </div>
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Built for Excellence
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Every project benefits from our commitment to quality, security, performance, and ongoing support.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {serviceFeatures.map((feature, i) => (
          <div
            key={i}
            className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/30"
          >
            {/* Icon with gradient background */}
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <SiteIcon icon={feature.icon} className="h-7 w-7" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-950">{feature.title}</h3>

            {/* Description */}
            <p className="mt-3 flex-grow text-base leading-relaxed text-slate-600">
              {feature.description}
            </p>

            {/* Optional metric or link (add to serviceFeatures if needed) */}
            {feature.metric && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-blue-700">{feature.metric}</span>
                  <span className="text-sm text-slate-500">projects delivered</span>
                </div>
              </div>
            )}

            {/* Optional "Learn More" link */}
            {feature.link && (
              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-blue-700 transition-all group-hover:gap-2">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Trust bar */}
      <div className="mt-20 rounded-2xl bg-slate-50 p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Trusted by industry leaders
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale">
          {/* Replace with actual logo components or images */}
          <div className="h-6 w-16 rounded bg-slate-200" />
          <div className="h-6 w-16 rounded bg-slate-200" />
          <div className="h-6 w-16 rounded bg-slate-200" />
          <div className="h-6 w-16 rounded bg-slate-200" />
        </div>
      </div>
    </section>
  );
}