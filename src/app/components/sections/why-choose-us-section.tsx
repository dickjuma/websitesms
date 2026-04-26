import { whyChooseUs } from "@/lib/site-data";
import { SiteIcon } from "@/components/ui/site-icon";
import { ArrowRight, CheckCircle } from "lucide-react";

export function WhyChooseUsSection() {
  const stats = [
    { value: "10+", label: "Years of Excellence" },
    { value: "200+", label: "Projects Delivered" },
    { value: "99%", label: "Client Retention" },
    { value: "24/7", label: "Support Availability" },
  ];

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      {/* Section header */}
      <div className="mb-10 text-center md:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 md:px-4 md:py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 md:text-sm">
            Why Choose Us
          </span>
        </div>
        <h2
          id="why-choose-us-heading"
          className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl lg:text-5xl"
        >
          Built for Quality, Designed for Scale
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:mt-6 md:text-lg">
          We deliver more than code—we deliver systems, thinking, and
          partnerships built to drive real business outcomes.
        </p>
      </div>

      {/* Stats - semantic list */}
      <ul
        className="mb-12 grid grid-cols-2 gap-4 border-y border-slate-100 py-6 sm:grid-cols-4 md:mb-20 md:gap-8 md:py-10"
        aria-label="Key performance indicators"
      >
        {stats.map((stat, idx) => (
          <li key={idx} className="text-center">
            <div className="text-2xl font-bold text-blue-700 md:text-3xl lg:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-slate-500 md:mt-2 md:text-sm">
              {stat.label}
            </div>
          </li>
        ))}
      </ul>

      {/* Benefits grid - semantic list */}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {whyChooseUs.map((benefit, i) => (
          <li key={i}>
            <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-transform duration-300 group-hover:scale-105 md:mb-6 md:h-14 md:w-14">
                <SiteIcon icon={benefit.icon} className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950 md:text-xl">
                {benefit.title}
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-600 md:mt-3 md:text-base">
                {benefit.description}
              </p>
              {benefit.link && (
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-700 transition-all group-hover:gap-2 md:mt-6">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>

      {/* Testimonial - semantic blockquote */}
      <aside
        className="mt-12 rounded-2xl bg-blue-50 p-6 text-center shadow-sm md:mt-20 md:p-8"
        aria-label="Client testimonial"
      >
        <div className="mx-auto max-w-2xl">
          <CheckCircle className="mx-auto h-6 w-6 text-blue-600 md:h-8 md:w-8" aria-hidden="true" />
          <blockquote>
            <p className="mt-3 text-base font-medium italic text-slate-700 md:mt-4 md:text-lg">
              "Their team doesn't just build software—they become a strategic
              partner. Our efficiency improved 40% within six months."
            </p>
<footer className="mt-3 md:mt-4">
                <cite className="not-italic font-semibold text-slate-900">
                  — Lorrian Okonda, CEO and Founder of Bilor Engineers
                </cite>
                <p className="text-xs text-slate-500 md:text-sm">
                  Enterprise Client since 2025
                </p>
              </footer>
          </blockquote>
        </div>
      </aside>
    </section>
  );
}
