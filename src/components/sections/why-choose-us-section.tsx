import { whyChooseUs } from "@/lib/site-data";
import { SiteIcon } from "@/components/ui/site-icon";
import { ArrowRight, CheckCircle } from "lucide-react";

export function WhyChooseUsSection() {
  // Optional: define a stats array if not already in data
  const stats = [
    { value: "10+", label: "Years of Excellence" },
    { value: "200+", label: "Projects Delivered" },
    { value: "99%", label: "Client Retention" },
    { value: "24/7", label: "Support Availability" },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-white via-blue-50/10 to-white" />

      {/* Section Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Why Choose Us
          </span>
        </div>
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Built for Quality, Designed for Scale
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          We deliver more than code—we deliver systems, thinking, and partnerships built to drive real business outcomes.
        </p>
      </div>

      {/* Stats Row – adds immediate credibility */}
      <div className="mb-20 grid grid-cols-2 gap-8 border-y border-slate-100 py-10 sm:grid-cols-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-3xl font-bold text-blue-700 sm:text-4xl">{stat.value}</div>
            <div className="mt-2 text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Benefits Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((benefit, i) => (
          <div
            key={i}
            className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/30"
          >
            {/* Icon with gradient background */}
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <SiteIcon icon={benefit.icon} className="h-7 w-7" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-950">{benefit.title}</h3>

            {/* Description */}
            <p className="mt-3 flex-grow text-base leading-relaxed text-slate-600">
              {benefit.description}
            </p>

            {/* Optional “Learn More” link – can be added to data */}
            {benefit.link && (
              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-blue-700 transition-all group-hover:gap-2">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Testimonial / Quote (adds social proof) */}
      <div className="mt-20 rounded-2xl bg-blue-50 p-8 text-center shadow-sm">
        <div className="mx-auto max-w-2xl">
          <CheckCircle className="mx-auto h-8 w-8 text-blue-600" />
          <p className="mt-4 text-lg font-medium italic text-slate-700">
            “Their team doesn’t just build software—they become a strategic partner. Our efficiency improved 40% within six months.”
          </p>
          <p className="mt-4 font-semibold text-slate-900">— Sarah Chen, CTO of FinScale</p>
          <p className="text-sm text-slate-500">Enterprise Client since 2021</p>
        </div>
      </div>
    </section>
  );
}