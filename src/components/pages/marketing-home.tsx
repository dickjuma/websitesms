import { SiteShell } from "@/components/layout/site-shell";
import { SectionGrid, SectionIntro } from "@/components/layout/site-shell";
import { ServiceGrid } from "@/components/services/service-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { ProcessSection } from "@/components/sections/process-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { enterpriseServices } from "@/lib/enterprise-services";
import { solutionItems, productItems } from "@/lib/site-data";

export function MarketingHomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <TrustSection />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionIntro
          eyebrow="Our Services"
          title="Enterprise services that stay clear at every level"
          description="The first layer helps buyers scan quickly. The detail layer carries the process, proof, and next steps they need to move forward with confidence."
        />
        <div className="mt-14">
          <ServiceGrid services={enterpriseServices} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
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

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionIntro
          eyebrow="Platforms"
          title="Products that stay simple at first and scale later"
          description="The product pages now sit closer to the service story, making it easier to understand the difference between custom delivery and platform-style builds."
        />
        <div className="mt-14">
          <SectionGrid items={productItems} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <WhyChooseUsSection />
      </section>

      <ProcessSection />

      <section className="border-t border-slate-200 bg-white">
        <FinalCtaSection />
      </section>
    </SiteShell>
  );
}
