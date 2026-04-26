export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck, Cpu, Mail, FileText, Briefcase } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Careers | Join Our Team | SMA Systems Kenya",
  description: "Join SMA Systems – leading software development company in Kenya. We're hiring developers, engineers, and tech talent. Build meaningful systems with cutting-edge technology.",
  keywords: ["careers", "jobs", "hiring", "software jobs Kenya", "developer jobs Nairobi", "tech jobs", "IT careers Kenya", "engineering jobs"],
  openGraph: {
    title: "Careers | Join Our Team | SMA Systems Kenya",
    description: "Join SMA Systems and build meaningful systems with cutting-edge technology.",
  },
};

interface Job {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  requirements: string;
  postedAt: string;
}

async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://smassystems.com'}/api/careers/jobs`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.jobs || [];
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <SiteShell>
      <main className="bg-white">
        {/* Hero Section – flat, no gradient */}
        <section aria-labelledby="careers-hero-title" className="border-b border-slate-200 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Careers at SMA Technologies</p>
              <h1 id="careers-hero-title" className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Build systems that <span className="text-blue-700">scale and secure.</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg max-w-xl">
                We engineer robust, high-performance applications. We are looking for forward-thinking engineers, designers, and operators to help us push the boundaries of system automation and web architecture.
              </p>
              <a
                href="#open-roles"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                View Open Roles <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Engineering Culture */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How We Build</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              We don't just write code; we design resilient systems. Joining our team means taking ownership of complex problems and delivering high-impact solutions.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            <li className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="inline-flex rounded-lg bg-blue-100 p-2 text-blue-700">
                <Code2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Modern Architecture</h3>
              <p className="mt-2 text-sm text-slate-600">
                We leverage the full power of the MERN stack and modern React frameworks to create fast, scalable, and highly interactive user experiences.
              </p>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="inline-flex rounded-lg bg-blue-100 p-2 text-blue-700">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Security by Design</h3>
              <p className="mt-2 text-sm text-slate-600">
                Security is foundational. We prioritize strict authentication protocols, rock-solid endpoints, and robust fraud prevention in every deployment.
              </p>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="inline-flex rounded-lg bg-blue-100 p-2 text-blue-700">
                <Cpu className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">AI & Automation</h3>
              <p className="mt-2 text-sm text-slate-600">
                We actively integrate lightweight LLMs and automated logic to streamline financial dispatches, platform escrow, and operational workflows.
              </p>
            </li>
          </ul>
        </section>

        {/* Open Roles Section */}
        <section id="open-roles" className="border-t border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Open Positions</h2>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                {jobs.length} Role{jobs.length !== 1 ? 's' : ''}
              </span>
            </div>

            {jobs.length === 0 ? (
              <div className="mt-8 rounded-lg border border-dashed border-slate-200 bg-white p-12 text-center">
                <Briefcase className="mx-auto mb-3 h-10 w-10 text-slate-300" aria-hidden="true" />
                <p className="text-base font-medium text-slate-700">No open positions right now</p>
                <p className="mt-1 text-sm text-slate-500">Please check back later or send your CV to careers@smasystems.com</p>
              </div>
            ) : (
              <ul className="mt-8 space-y-5">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                            <span className="font-medium">{job.department}</span>
                            <span className="hidden h-1 w-1 rounded-full bg-slate-300 md:inline-block" aria-hidden="true" />
                            <span>{job.type}</span>
                            <span className="hidden h-1 w-1 rounded-full bg-slate-300 md:inline-block" aria-hidden="true" />
                            <span>{job.location}</span>
                          </div>
                          <p className="mt-3 text-sm text-slate-700">{job.description}</p>
                          <div className="mt-3">
                            <h4 className="text-sm font-semibold text-slate-900">Requirements:</h4>
                            <p className="text-sm text-slate-600">{job.requirements}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <a
                            href={`mailto:careers@smasystems.com?subject=Application for ${job.title} (${job.id})&body=Dear SMA Team,%0D%0A%0D%0AI am applying for the position of ${job.title}. Please find my CV and cover letter attached.%0D%0A%0D%0ABest regards`}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            Apply Now <Mail className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Application Instructions */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <h2 className="text-xl font-bold text-slate-900">How to Apply</h2>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p>
                Send your <strong>CV</strong> and a <strong>cover letter</strong> to{' '}
                <a href="mailto:careers@smasystems.com" className="font-semibold text-blue-700 hover:underline">
                  careers@smasystems.com
                </a>
              </p>
              <p>
                Use the subject line: <strong>Application for [Job Title] – [Your Name]</strong>
              </p>
              <div className="mt-4 rounded-lg bg-blue-50 p-4">
                <p className="font-semibold text-blue-800">📌 Important – Attachment & Probation Period</p>
                <p className="mt-1 text-sm text-slate-700">
                  We offer a <strong>3‑month attachment/probation period</strong> for candidates in both <strong>finance and tech fields</strong>.
                  During this time, you will receive hands‑on mentorship, work on live projects, and be evaluated for a permanent role.
                  This applies to all full‑time positions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
