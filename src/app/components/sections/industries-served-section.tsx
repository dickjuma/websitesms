import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ShoppingCart,
  Stethoscope,
  Factory,
  Landmark,
} from "lucide-react";

// Industries with real‑world, Kenya‑specific descriptions
const industries = [
  {
    title: "Healthcare",
    description:
      "Patient management, NHIF integration, telemedicine, and pharmacy inventory for Kenyan hospitals and clinics.",
    icon: Stethoscope,
    href: "/industries/healthcare",
  },
  {
    title: "Finance",
    description:
      "Secure payment gateways, SACCO management, mobile lending, and automated accounting for Kenyan fintechs.",
    icon: Landmark,
    href: "/industries/finance",
  },
  {
    title: "E‑commerce",
    description:
      "Scalable online stores with M‑Pesa, logistics integration, and customer loyalty for Kenyan retailers.",
    icon: ShoppingCart,
    href: "/industries/ecommerce",
  },
  {
    title: "Manufacturing",
    description:
      "ERP for production lines, supply chain tracking, and IoT dashboards for Kenyan factories.",
    icon: Factory,
    href: "/industries/manufacturing",
  },
  {
    title: "Real Estate",
    description:
      "Property listing portals, CRM for agents, and virtual tour integrations for Kenyan property markets.",
    icon: Building2,
    href: "/industries/real-estate",
  },
];

export function IndustriesServedSection() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      {/* Section header */}
      <div className="mb-10 text-center md:mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
          Industries
        </p>
        <h2
          id="industries-heading"
          className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl lg:text-5xl"
        >
          We Serve Every Sector
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:mt-6 md:text-lg">
          Deep expertise across industries means we understand your unique
          challenges and deliver targeted solutions.
        </p>
      </div>

      {/* Semantic grid list */}
      <ul className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {industries.map((industry, index) => (
          <li key={index}>
            <Link href={industry.href} aria-label={`Learn more about ${industry.title}`}>
              <article className="group flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110 md:mb-4 md:h-12 md:w-12">
                  <industry.icon
                    className="h-5 w-5 md:h-6 md:w-6"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-semibold text-slate-950 transition group-hover:text-blue-700 md:text-lg">
                  {industry.title}
                </h3>
                <p className="mt-1 flex-grow text-xs leading-relaxed text-slate-600 md:mt-2 md:text-sm">
                  {industry.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-blue-700 transition group-hover:translate-x-1 md:mt-4 md:text-sm">
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom callout – semantic aside */}
      <aside
        aria-label="Industry not listed"
        className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 text-center md:mt-12 md:px-8 md:py-6"
      >
        <p className="text-sm text-slate-700 md:text-base">
          <strong>Don&apos;t see your industry?</strong> We work across all sectors.
          <Link
            href="/contact"
            className="ml-2 font-semibold text-blue-700 underline hover:text-blue-800"
          >
            Let&apos;s talk about your specific needs.
          </Link>
        </p>
      </aside>
    </section>
  );
}
