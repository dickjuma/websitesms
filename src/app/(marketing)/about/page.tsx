'use client';

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
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

interface AboutData {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  stats: { value: string; label: string; icon: string }[];
  mission: string;
  vision: string;
  values: { title: string; description: string; icon: string }[];
  services: { title: string; description: string }[];
  whyChooseUs: { title: string; description: string }[];
  cta: { title: string; description: string };
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  department: string;
}

const iconMap: Record<string, any> = {
  Code, Heart, Clock, Award, Shield, Zap, Users, Rocket, Target, TrendingUp
};

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
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
        
        if (aboutData.success) {
          setData(aboutData.data);
        }
        if (teamData.success) {
          setTeam(teamData.data);
        }
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
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

  const teamByDepartment = team.reduce((acc: Record<string, TeamMember[]>, member) => {
    const dept = member.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">{hero.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {hero.title.split(' ').slice(0, -2).join(' ')} <span className="text-blue-700">{hero.title.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {hero.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-800"
              >
                Work With Us <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#values"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map((stat) => {
              const IconComponent = iconMap[stat.icon] || Code;
              return (
                <div key={stat.label} className="space-y-2">
                  <div className="flex justify-center">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-950">Our Mission</h2>
              <p className="mt-4 text-slate-700 leading-relaxed">{mission}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-700">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-950">Our Vision</h2>
              <p className="mt-4 text-slate-700 leading-relaxed">{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">What We Believe</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every solution we build.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const IconComponent = iconMap[value.icon] || Shield;
              return (
                <div key={value.title} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">{value.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">What We Do</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Comprehensive IT & Software Services
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              We offer a full spectrum of technology services to help your business thrive.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <CheckCircle className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">The People Behind It</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              A dedicated group of professionals passionate about technology and your success.
            </p>
          </div>

          {team.length > 0 ? (
            Object.entries(teamByDepartment).map(([deptName, members]) => (
              <div key={deptName} className="mb-16 last:mb-0">
                <h3 className="text-2xl font-bold text-slate-800 mb-8 pb-2 border-b border-blue-200 inline-block">
                  {deptName}
                </h3>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {members.map((member) => (
                    <div
                      key={member._id}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md hover:border-blue-300"
                    >
                      <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full">
                        <Image
                          src={member.image || "/images/Devprofile.png"}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 112px, 112px"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">{member.name}</h3>
                      <p className="text-sm font-medium text-blue-700">{member.role}</p>
                      <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              <p>No team members added yet. Add team members in the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Why Choose SMA</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A Partner You Can Trust
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-950 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl bg-blue-700 p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{cta.title}</h2>
            <p className="mt-4 text-lg text-blue-100">{cta.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-md transition hover:bg-slate-100"
              >
                Contact Us <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-xl border border-white/30 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View Our Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}