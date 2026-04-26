"use client";

import { useEffect, useState } from "react";
import { SectionGrid, SectionIntro } from "@/components/layout/site-shell";
import { ServiceGrid } from "@/components/services/service-grid";
import HeroSection from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { ProcessSection } from "@/components/sections/process-section";
import { enterpriseServices } from "@/lib/enterprise-services";
import { solutionItems, productItems } from "@/lib/site-data";

interface CompletedProject {
  id: string;
  title: string;
  client: string;
  imageUrl: string;
  description?: string;
  services: string[];
  completedDate: string;
}

function CompletedProjectsSection() {
  const [projects, setProjects] = useState<CompletedProject[]>([]);

  useEffect(() => {
    fetch("/api/site", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.completedProjects) {
          setProjects(data.data.completedProjects);
        }
      })
      .catch(console.error);
  }, []);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-slate-200 bg-slate-50 px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Completed Projects"
          title="Projects we've delivered"
          description="Real results from real clients."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md">
              {project.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {project.client}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{project.title}</h3>
                {project.description && (
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{project.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketingHomePage() {
  return (
    <main id="main-content" className="bg-white">
      {/* Hero section – already has semantic structure */}
      <HeroSection />

      {/* Trust section – client logos & stats */}
      <TrustSection />

      {/* Completed Projects section */}
      <CompletedProjectsSection />

      {/* Services section */}
      <section
        aria-labelledby="services-heading"
        className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20"
      >
        <SectionIntro
          eyebrow="Our Services"
          title="Enterprise services that stay clear at every level"
          description="The first layer helps buyers scan quickly. The detail layer carries the process, proof, and next steps they need to move forward with confidence."
        />
        <div className="mt-14">
          <ServiceGrid services={enterpriseServices} />
        </div>
      </section>

      {/* Industry solutions section */}
      <section
        aria-labelledby="solutions-heading"
        className="border-t border-slate-200 bg-slate-50/80"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
          <SectionIntro
            eyebrow="Industry Fit"
            title="Solutions shaped around real operating environments"
            description="We adapt the same delivery discipline to different sectors so the site explains both what we build and where it fits."
          />
          <div className="mt-14">
            <SectionGrid items={solutionItems} />
          </div>
        </div>
      </section>

      {/* Platforms / products section */}
      <section
        aria-labelledby="platforms-heading"
        className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20"
      >
        <SectionIntro
          eyebrow="Platforms"
          title="Products that stay simple at first and scale later"
          description="The product pages now sit closer to the service story, making it easier to understand the difference between custom delivery and platform-style builds."
        />
        <div className="mt-14">
          <SectionGrid items={productItems} />
        </div>
      </section>

      {/* Why choose us section */}
      <section
        aria-labelledby="why-choose-us-heading"
        className="border-t border-slate-200 bg-white"
      >
        <WhyChooseUsSection />
      </section>

      {/* Process section */}
      <ProcessSection />
    </main>
  );
}
