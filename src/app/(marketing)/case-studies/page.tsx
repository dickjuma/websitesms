export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Briefcase, TrendingUp, Users, Clock } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Case Studies | Success Stories | SMA Systems Kenya",
  description: "Explore our success stories and client case studies. See how we've helped businesses in Kenya transform with custom software, ERP systems, mobile apps, and AI solutions.",
  keywords: ["case studies", "success stories", "software development portfolio", "project examples", "client testimonials", "Kenya software projects"],
  openGraph: {
    title: "Case Studies | Success Stories | SMA Systems Kenya",
    description: "Explore our success stories and client case studies. See how we've helped businesses transform with custom software.",
  },
};

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  image?: string;
  publishedAt: string;
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://smassystems.com'}/api/case-studies`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.caseStudies || [];
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    return [];
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <SiteShell>
      <main className="bg-white">
        {/* Hero Section – flat, no gradient */}
        <section aria-labelledby="case-hero-title" className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Proof of Delivery</p>
              <h1 id="case-hero-title" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
                Real Projects,<br />
                <span className="text-blue-700">Real Results</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                See how we've helped businesses across Kenya and Africa transform their operations with custom software, ERP systems, mobile apps, and AI solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
              <Briefcase className="mb-3 h-10 w-10 text-slate-300" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-slate-800">No case studies yet</h2>
              <p className="mt-1 text-sm text-slate-500">Check back soon for success stories from our clients.</p>
            </div>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <li key={study.id}>
                  <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    {study.image && (
                      <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-slate-100">
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center gap-2 text-xs">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-800">
                          {study.industry}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{study.client}</span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">
                        <Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
                      </h2>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{study.challenge}</p>
                      {study.metrics && study.metrics.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                          {study.metrics.slice(0, 2).map((metric) => (
                            <div key={metric.label} className="text-center">
                              <p className="text-base font-bold text-blue-700">{metric.value}</p>
                              <p className="text-[10px] text-slate-500">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-4">
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:gap-2 transition-all"
                        >
                          Read full story
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Optional: Key Statistics / Why Choose Us (static) */}
        <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <TrendingUp className="mx-auto h-8 w-8 text-blue-700" aria-hidden="true" />
                <p className="mt-3 text-2xl font-bold text-slate-900">98%</p>
                <p className="text-sm text-slate-600">Client Satisfaction</p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <Clock className="mx-auto h-8 w-8 text-blue-700" aria-hidden="true" />
                <p className="mt-3 text-2xl font-bold text-slate-900">50+</p>
                <p className="text-sm text-slate-600">Projects Delivered</p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <Users className="mx-auto h-8 w-8 text-blue-700" aria-hidden="true" />
                <p className="mt-3 text-2xl font-bold text-slate-900">10+</p>
                <p className="text-sm text-slate-600">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Ready to be our next success story?</h2>
            <p className="mt-3 text-sm text-slate-600">Let's discuss your project and how we can deliver similar results for your business.</p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Start Your Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
