import { serviceFeatures } from "@/lib/site-data";
import { SiteIcon } from "@/components/ui/site-icon";
import { ArrowRight } from "lucide-react";

export function FeaturesHighlightSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      {/* Section header */}
      <div className="mb-10 text-center md:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 md:px-4 md:py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 md:text-sm">
            Why Work With Us
          </span>
        </div>
        <h2
          id="features-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl"
        >
          Built for Excellence
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:mt-6 md:text-lg">
          Every project benefits from our commitment to quality, security,
          performance, and ongoing support – tailored for Kenyan enterprises.
        </p>
      </div>

      {/* Features grid - semantic list */}
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {serviceFeatures.map((feature, index) => (
          <li key={index}>
            <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:p-8">
              {/* Icon - flat solid background */}
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-transform duration-300 group-hover:scale-105 md:mb-6 md:h-14 md:w-14">
                <SiteIcon icon={feature.icon} className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-950 md:text-xl">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-600 md:mt-3 md:text-base">
                {feature.description}
              </p>

              {/* Optional metric */}
              {feature.metric && (
                <div className="mt-4 border-t border-slate-100 pt-4 md:mt-6 md:pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-blue-700 md:text-2xl">
                      {feature.metric}
                    </span>
                    <span className="text-xs text-slate-500 md:text-sm">
                      projects delivered
                    </span>
                  </div>
                </div>
              )}

              {/* Optional "Learn More" link */}
              {feature.link && (
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-700 transition-all group-hover:gap-2 md:mt-6">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>

      {/* Trust bar - semantic with list */}
      <aside
        className="mt-12 rounded-2xl bg-slate-50 p-6 text-center shadow-sm md:mt-20 md:p-8"
        aria-label="Companies that trust us"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Trusted by industry leaders
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-6 opacity-70 grayscale md:mt-6 md:gap-8">
          {/* Replace with actual logo components or images */}
          {[1, 2, 3, 4].map((_, idx) => (
            <li key={idx}>
              <div
                className="h-6 w-16 rounded bg-slate-200 md:h-8 md:w-20"
                aria-label="Client logo placeholder"
              />
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
