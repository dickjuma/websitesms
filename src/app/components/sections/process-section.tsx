import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Hardcoded process steps for reliability (no external dependency)
const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn your business goals, user needs, and technical requirements.",
  },
  {
    number: "02",
    title: "Planning",
    description: "We create a roadmap, tech stack, and project timeline.",
  },
  {
    number: "03",
    title: "Design",
    description: "We craft intuitive interfaces and user‑centric experiences.",
  },
  {
    number: "04",
    title: "Development",
    description: "We build scalable, secure systems using modern frameworks.",
  },
  {
    number: "05",
    title: "Launch & Support",
    description: "We deploy, train your team, and provide ongoing maintenance.",
  },
];

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-t border-slate-200 bg-slate-50 px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 text-center md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Our Approach
          </p>
          <h2
            id="process-heading"
            className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl lg:text-5xl"
          >
            How We Deliver Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:mt-6 md:text-lg">
            A structured, transparent process that turns your vision into a production-ready system.
          </p>
        </div>

        {/* Semantic ordered list for process steps */}
        <ol className="relative mt-12 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-8">
          {processSteps.map((step, index) => {
            const isLast = index === processSteps.length - 1;
            return (
              <li key={step.number} className="relative">
                {/* Connecting line (only between items, not after last) */}
                {!isLast && (
                  <div
                    className="absolute left-[2.75rem] top-14 hidden h-0.5 w-[calc(100%-2.75rem)] bg-blue-300 md:top-16 md:block"
                    aria-hidden="true"
                  />
                )}

                <div className="relative">
                  {/* Step number circle – solid background, no gradient */}
                  <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 md:mb-6 md:h-24 md:w-24">
                    <div className="text-center">
                      <div className="text-3xl font-bold md:text-4xl">
                        {step.number}
                      </div>
                      <div className="mt-0.5 text-xs font-semibold md:mt-1">
                        Step
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-950 md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 md:mt-3">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center md:mt-16">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 rounded-2xl border border-blue-300 bg-blue-50 px-5 py-2.5 font-semibold text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:px-6 md:py-3"
            aria-label="Learn more about our development process"
          >
            Learn More About Our Process
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
