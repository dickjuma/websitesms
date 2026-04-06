import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#1e3a8a,#0369a1)] px-8 py-20 shadow-2xl shadow-blue-900/20 sm:px-12 lg:px-16">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">Ready to get started?</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">Let Us Build Your Next System Together</h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Whether you need a web app, mobile platform, ERP system, or AI solutions, we have the expertise to deliver.
            Let us talk about your vision and create a plan to make it real.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Free 30-minute consultation call",
              "Custom project scoping and timeline",
              "Clear ROI and success metrics",
              "Expert recommendations based on industry",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-green-300" />
                <span className="text-sm text-blue-50">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50"
            >
              Get Started Today
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-600/50"
            >
              Learn Our Process
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-8 text-sm text-blue-200">
            Questions? Chat with us in the bottom-right corner or email{" "}
            <a href="mailto:hello@sma-systems.com" className="font-semibold text-white underline hover:text-blue-100">
              hello@sma-systems.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
