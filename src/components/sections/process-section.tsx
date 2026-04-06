import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processSteps } from "@/lib/site-data";

export function ProcessSection() {
  return (
    <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Our Approach</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            How We Deliver Excellence
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
            A structured, transparent process that turns your vision into a production-ready system.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-20 grid gap-8 md:grid-cols-5">
          {processSteps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connection line */}
              {i < processSteps.length - 1 && (
                <div className="absolute left-[2.75rem] top-16 hidden h-0.5 w-[calc(100%-2.75rem)] bg-gradient-to-r from-blue-300 to-transparent md:block" />
              )}

              <div className="relative">
                {/* Circle number */}
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-600/30">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{step.number}</div>
                    <div className="text-xs font-semibold mt-1">Step</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 rounded-2xl border border-blue-300 bg-blue-50 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            Learn More About Our Process
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
