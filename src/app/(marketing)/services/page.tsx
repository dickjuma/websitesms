import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentProps, ComponentType } from "react";
import {
  BarChart3,
  Bot,
  Bug,
  Cloud,
  Code2,
  CreditCard,
  Globe,
  Layers3,
  Package2,
  Palette,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading, ServiceHero, ServiceSection } from "./_components/service-primitives";

export const metadata: Metadata = {
  title: "Services",
  description: "Dedicated service routes for web, mobile, ERP, CRM, AI, analytics, QA, DevOps, and security work.",
};

function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<ComponentProps<"svg">>;
}) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.08)]">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      <Link href={href} className="mt-6 inline-flex text-sm font-semibold text-blue-700 transition hover:text-cyan-600">
        Open route
      </Link>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <SiteShell>
      <ServiceHero
        eyebrow="Services"
        title="Dedicated service routes with their own structure"
        description="Every service page now lives as its own routed experience inside the services section. No shared service-page mapper, no generic detail wrapper, and no dependency on the old app-level service dataset for rendering."
        primaryLabel="Talk to Our Team"
        primaryHref="/contact"
        secondaryLabel="See Pricing"
        secondaryHref="/pricing"
        stats={[
          { label: "Routing", value: "Owned in /services" },
          { label: "Pattern", value: "No mapped detail pages" },
          { label: "Approach", value: "Unique page structures" },
        ]}
      />

      <ServiceSection className="py-18 lg:py-22">
        <SectionHeading
          eyebrow="Service Catalog"
          title="Choose a route and go straight into that service story"
          description="The catalog below is written directly in this page so the services section is no longer assembled from shared arrays."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ServiceCard
            title="Custom Software Development"
            description="Business software planned around internal workflows, user roles, and long-term roadmap control."
            href="/services/custom-software-development"
            icon={Code2}
          />
          <ServiceCard
            title="Custom Web Development"
            description="Websites, portals, and web apps designed for performance, content flow, and conversion."
            href="/services/web-development"
            icon={Globe}
          />
          <ServiceCard
            title="Mobile App Development"
            description="Customer-facing and internal mobile products built for rollout readiness and daily use."
            href="/services/mobile-app-development"
            icon={Smartphone}
          />
          <ServiceCard
            title="UI/UX Design"
            description="Product design systems, research-led journeys, and interfaces that reduce user friction."
            href="/services/ui-ux-design"
            icon={Palette}
          />
          <ServiceCard
            title="ERP Systems"
            description="Connected operations platforms for approvals, finance, inventory, and reporting."
            href="/services/erp-systems"
            icon={Layers3}
          />
          <ServiceCard
            title="Inventory Systems"
            description="Stock control, warehouse flow, and procurement visibility for operational teams."
            href="/services/inventory-systems"
            icon={Package2}
          />
          <ServiceCard
            title="CRM Systems"
            description="Lead, account, and customer workflows tailored for revenue and service teams."
            href="/services/crm-systems"
            icon={Users}
          />
          <ServiceCard
            title="POS Systems"
            description="Retail and service checkout systems with branch visibility, stock sync, and reporting."
            href="/services/pos-systems"
            icon={CreditCard}
          />
          <ServiceCard
            title="API Development and Integrations"
            description="Reliable service layers and system-to-system integrations for cleaner operations."
            href="/services/api-development-integrations"
            icon={Workflow}
          />
          <ServiceCard
            title="AI Solutions"
            description="Assistants, automations, and AI features shaped around practical business problems."
            href="/services/ai-solutions"
            icon={Bot}
          />
          <ServiceCard
            title="Data Analytics and BI"
            description="Dashboards and reporting pipelines that turn scattered data into decisions."
            href="/services/data-analytics-bi"
            icon={BarChart3}
          />
          <ServiceCard
            title="QA and Software Testing"
            description="Release-focused QA support for regressions, high-risk flows, and validation clarity."
            href="/services/qa-software-testing"
            icon={Bug}
          />
          <ServiceCard
            title="Cloud and DevOps"
            description="Infrastructure, deployment, monitoring, and reliability support for production systems."
            href="/services/cloud-devops"
            icon={Cloud}
          />
          <ServiceCard
            title="Cybersecurity Services"
            description="Security reviews, hardening, and remediation work for apps and cloud environments."
            href="/services/cybersecurity-services"
            icon={ShieldCheck}
          />
        </div>
      </ServiceSection>

      <ServiceSection className="pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="What Changed"
              title="The services area now stands on its own"
              description="The rendering logic for service routes is now local to this section. Each child route can evolve without being forced back into the same detail-page mold."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                The index is hand-built here instead of being assembled from a shared service array.
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                Every service page has its own composition instead of piping content into one generic template.
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                Routing stays inside `/services/...`, so the section remains easy to extend one route at a time.
              </div>
            </div>
          </div>

          <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] p-8 text-white shadow-[0_30px_90px_rgba(30,64,175,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">Next Step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Open the service you want to shape next</h2>
            <p className="mt-4 text-base leading-8 text-blue-100">
              This structure makes it easier to give each route its own story, visuals, and section order without changing unrelated pages.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
              >
                Start a Project
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Delivery Process
              </Link>
            </div>
          </div>
        </div>
      </ServiceSection>
    </SiteShell>
  );
}
