import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServicesCTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f172a,#1e40af,#0369a1)] px-8 py-20 shadow-2xl shadow-blue-900/20 sm:px-12 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-200">Ready to Get Started?</p>

          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">Let Us Build Your Next System</h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Whether you need a website, mobile app, ERP system, or AI solution, we have the expertise to deliver.
            Schedule a free consultation to discuss your vision.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300 bg-transparent px-8 py-4 text-base font-semibold text-blue-100 transition hover:bg-blue-600/50"
            >
              Learn Our Process
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-8 text-sm text-blue-200">
            Questions? Our team is ready to help.{" "}
            <a href="mailto:hello@sma-systems.com" className="font-semibold text-white underline hover:text-blue-100">
              Email us
            </a>{" "}
            or chat with our AI assistant.
          </p>
        </div>
      </div>
    </section>
  );
}
