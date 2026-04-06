import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
// Adjust the path to your background image
import heroBg from "@/public/images/logo.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background image - subtle overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column - Text content */}
          <div>
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Enterprise Digital Solutions
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
              We Build{" "}
              <span className="text-blue-700">
                Scalable Digital Systems
              </span>{" "}
              for Modern Enterprises
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-700 sm:text-xl">
              Web applications, mobile apps for iOS & Android, ERP systems, CRM platforms, and AI‑powered
              solutions. We deliver premium digital products built to scale with your business.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-8 py-4 text-base font-semibold text-white shadow-md transition hover:bg-blue-800 hover:shadow-lg"
              >
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition hover:border-blue-400 hover:bg-blue-50"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Right column - optional (empty for now) */}
          <div className="relative flex justify-center lg:justify-end">
            {/* You can place a mockup or leave empty – the background image provides the visual depth */}
          </div>
        </div>
      </div>
    </section>
  );
}