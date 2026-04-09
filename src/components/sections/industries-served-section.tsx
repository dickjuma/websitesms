import Link from "next/link";
import { ArrowRight, Building2, ShoppingCart, Stethoscope, Factory, Landmark } from "lucide-react";

// Hardcoded industries for direct content updates and faster prototyping
const industries = [
  {
    title: "Healthcare",
    description: "Patient management systems, HIPAA-compliant portals, and AI diagnostics.",
    icon: Stethoscope,
    href: "/industries/healthcare",
  },
  {
    title: "Finance",
    description: "Secure payment gateways, fintech apps, and automated accounting tools.",
    icon: Landmark,
    href: "/industries/finance",
  },
  {
    title: "E-commerce",
    description: "Scalable online stores, inventory management, and customer loyalty platforms.",
    icon: ShoppingCart,
    href: "/industries/ecommerce",
  },
  {
    title: "Manufacturing",
    description: "ERP solutions, supply chain optimization, and IoT monitoring dashboards.",
    icon: Factory,
    href: "/industries/manufacturing",
  },
  {
    title: "Real Estate",
    description: "Property listing platforms, CRM for agents, and virtual tour integrations.",
    icon: Building2,
    href: "/industries/real-estate",
  },
];

export function IndustriesServedSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Industries</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          We Serve Every Sector
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Deep expertise across industries means we understand your unique challenges and deliver targeted solutions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {industries.map((industry, i) => (
          <Link key={i} href={industry.href}>
            <div className="group flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
                <industry.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950 transition group-hover:text-blue-700">
                {industry.title}
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-600">
                {industry.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
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
          <strong>Don&apos;t see your industry?</strong> We work across all sectors.
          <Link href="/contact" className="ml-2 font-semibold text-blue-700 underline hover:text-blue-800">
            Let&apos;s talk about your specific needs.
          </Link>
        </p>
      </div>
    </section>
  );
}
