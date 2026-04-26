'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Users,
  Award,
  Clock,
  Rocket,
  Shield,
  Zap,
  Code,
  Heart,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import type { TeamMember, AboutPage } from "@/lib/content";

export default function AboutPage() {
  const [data, setData] = useState<AboutPage | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [aboutRes, teamRes] = await Promise.all([
          fetch('/api/content/about'),
          fetch('/api/content/team')
        ]);
        const aboutData = await aboutRes.json();
        const teamData = await teamRes.json();

        if (aboutData.success) setData(aboutData.data);
        if (teamData.success) setTeam(teamData.data);
      } catch (error) {
        console.error('Failed to fetch about data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <SiteShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        </div>
      </SiteShell>
    );
  }

  const hero = data?.hero || {
    eyebrow: "About SMA Technologies",
    title: "We build technology that empowers businesses to grow.",
    description: "Founded in Nairobi, SMA Technologies delivers end‑to‑end IT and software solutions. From custom applications and mobile apps to ERP, CRM, cloud infrastructure, and cybersecurity – we help companies digitise, automate, and scale with confidence."
  };

  const stats = data?.stats || [
    { value: "50+", label: "Projects Delivered", icon: "Code" },
    { value: "98%", label: "Client Retention", icon: "Heart" },
    { value: "24/7", label: "Support Available", icon: "Clock" },
    { value: "10+", label: "Years Combined Experience", icon: "Award" },
  ];

  const mission = data?.mission || "To empower Kenyan and African businesses with secure, scalable, and affordable technology solutions that drive efficiency, growth, and innovation.";
  const vision = data?.vision || "To be the most trusted technology partner for businesses across Africa – known for quality, transparency, and lasting impact.";

  const values = data?.values || [
    { title: "Integrity First", description: "We believe in honest communication, transparent pricing, and doing the right thing – always.", icon: "Shield" },
    { title: "Technical Excellence", description: "We never compromise on quality. Our solutions are secure, scalable, and built to last.", icon: "Zap" },
    { title: "Client Partnership", description: "We don't just build software; we become your long‑term technology partner.", icon: "Users" },
    { title: "Continuous Innovation", description: "We stay ahead of the curve, bringing modern tools and practices to every project.", icon: "Rocket" },
  ];

  const services = data?.services || [
    { title: "Custom Software Development", description: "Tailored web and desktop applications for your unique workflows." },
    { title: "Mobile App Development", description: "Native iOS, Android, and cross‑platform apps." },
    { title: "ERP & CRM Systems", description: "Streamline operations, sales, and customer relationships." },
    { title: "Cloud & DevOps", description: "Scalable infrastructure, CI/CD, and cloud migration." },
    { title: "Cybersecurity", description: "Risk assessments, compliance, and 24/7 monitoring." },
    { title: "IT Consulting", description: "Strategic technology advice and digital transformation." },
  ];

  const whyChooseUs = data?.whyChooseUs || [
    { title: "Local Expertise, Global Standards", description: "Based in Nairobi, we understand the local market while applying international best practices." },
    { title: "End‑to‑End Delivery", description: "From strategy and design to development, deployment, and ongoing support – we've got you covered." },
    { title: "Transparent & Collaborative", description: "We communicate openly, involve you at every stage, and never surprise you with hidden costs." },
  ];

  const cta = data?.cta || {
    title: "Ready to transform your business with technology?",
    description: "Let's talk about your goals and how we can help you achieve them."
  };

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Code,
    Heart,
    Clock,
    Award,
  };

  const teamByDepartment = team.reduce((acc: Record<string, TeamMember[]>, member) => {
    const dept = member.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  return (
    <SiteShell>
      <main className="bg-white">
        {/* Hero Section - flat, clean */}
        <section
          aria-labelledby="about-hero-title"
          className="border-b border-slate-200 bg-white py-16 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {hero.eyebrow}
              </p>
              <h1
                id="about-hero-title"
                className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl"
              >
                {hero.title.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-blue-700">{hero.title.split(' ').slice(-2).join(' ')}</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
                {hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Work With Us <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#values"
                  className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - semantic list */}
        <section
          aria-labelledby="stats-heading"
          className="border-y border-slate-200 bg-white py-10"
        >
          <h2 id="stats-heading" className="sr-only">Company statistics</h2>
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <ul className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
              {stats.map((stat) => {
                const IconComponent = iconMap[stat.icon] || Code;
                return (
                  <li key={stat.label} className="space-y-2">
                    <IconComponent className="mx-auto h-6 w-6 text-blue-600" aria-hidden="true" />
                    <p className="text-2xl font-bold text-slate-900 md:text-3xl">{stat.value}</p>
                    <p className="text-xs font-medium text-slate-600 md:text-sm">{stat.label}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex rounded-lg bg-blue-100 p-2 text-blue-700">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-slate-950 md:text-2xl">Our Mission</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{mission}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex rounded-lg bg-slate-100 p-2 text-slate-700">
                  <TrendingUp className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-slate-950 md:text-2xl">Our Vision</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section id="values" className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">What We Believe</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Our Core Values</h2>
              <p className="mt-3 text-sm text-slate-600 md:text-base">
                These principles guide every decision we make and every solution we build.
              </p>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const IconComponent = iconMap[value.icon] || Shield;
                return (
                  <li key={value.title}>
                    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                      <div className="mb-3 inline-flex rounded-lg bg-blue-100 p-2 text-blue-700">
                        <IconComponent className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-slate-950">{value.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">What We Do</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Comprehensive IT & Software Services
              </h2>
              <p className="mt-3 text-sm text-slate-600 md:text-base">
                We offer a full spectrum of technology services to help your business thrive.
              </p>
            </div>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <li key={service.title}>
                  <div className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{service.title}</h3>
                      <p className="text-sm text-slate-600">{service.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team Section */}
        <section className="border-t border-slate-200 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">The People Behind It</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Meet Our Team</h2>
              <p className="mt-3 text-sm text-slate-600 md:text-base">
                A dedicated group of professionals passionate about technology and your success.
              </p>
            </div>

            {team.length > 0 ? (
              <div className="mt-12 space-y-12">
                {Object.entries(teamByDepartment).map(([deptName, members]) => (
                  <div key={deptName}>
                    <h3 className="mb-6 inline-block border-b-2 border-blue-200 pb-1 text-xl font-bold text-slate-800">
                      {deptName}
                    </h3>
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {members.map((member) => (
                        <li key={String(member._id)}>
                          <article className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md">
                             <div className="relative mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full">
                               {member.image ? (
                                 member.image.startsWith('data:') ? (
                                   <img
                                     src={member.image}
                                     alt={member.name}
                                     className="h-full w-full object-cover"
                                   />
                                 ) : (
                                   <Image
                                     src={member.image}
                                     alt={member.name}
                                     fill
                                     className="object-cover"
                                     sizes="96px"
                                   />
                                 )
                               ) : (
                                 <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                   <User className="h-8 w-8 text-slate-400" />
                                 </div>
                               )}
                             </div>
                            <h4 className="text-base font-bold text-slate-950">{member.name}</h4>
                            <p className="text-sm font-medium text-blue-700">{member.role}</p>
                            <p className="mt-2 text-xs text-slate-600">{member.bio}</p>
                          </article>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-slate-400" aria-hidden="true" />
                <p className="text-sm text-slate-500">No team members added yet. Add team members in the admin panel.</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Why Choose SMA</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">A Partner You Can Trust</h2>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {whyChooseUs.map((item) => (
                <li key={item.title}>
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA - flat, solid */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="rounded-xl bg-slate-900 p-8 shadow-md md:p-10">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{cta.title}</h2>
              <p className="mt-3 text-sm text-slate-300 md:text-base">{cta.description}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Contact Us <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center rounded-lg border border-white/30 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  View Our Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
