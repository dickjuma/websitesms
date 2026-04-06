import type { Metadata } from "next";
import {
  ActionCard,
  BookDemoCTA,
  BulletPanel,
  HighlightRibbon,
  ImageFrame,
  RelatedLinks,
  SectionHeading,
  ServiceHero,
  ServiceSection,
  StepsTimeline,
} from "../_components/service-primitives";
import { webDevelopmentContent as content } from "../_content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function WebDevelopmentPage() {
  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Plan Your Web Project"
        stats={[
          { label: "Build Type", value: "Sites, portals, apps" },
          { label: "Focus", value: "Performance and growth" },
          { label: "Support", value: "Content and integrations" },
        ]}
      />

      <ServiceSection className="py-18">
        <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <SectionHeading
            eyebrow="Web Route"
            title={content.summary}
            description="This page is structured around what a custom web platform needs after launch: content flow, admin usability, conversion quality, performance, and room for new features."
          />
          <div className="mt-8">
            <HighlightRibbon items={content.highlights} />
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="pb-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ImageFrame src={content.imageSrc} alt={content.imageAlt} aspectClassName="aspect-[16/11]" />
          <div className="space-y-8">
            <BulletPanel title="What we build" description="The scope can range from marketing presence through to login-based operational platforms." items={content.capabilities} />
            <ActionCard
              title="Ideal when the website is more than a brochure"
              description="This route works best when the platform needs to help with acquisition, onboarding, customer service, team operations, or product delivery."
            />
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <BulletPanel title="What the business gets" description="A custom web product should create clarity for visitors, customers, and internal teams at the same time." items={content.outcomes} variant="blue" />
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">How the work moves</p>
            <div className="mt-6">
              <StepsTimeline steps={content.steps} compact />
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-12 pb-12">
        <BookDemoCTA />
      </ServiceSection>

      <ServiceSection className="py-8 pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <BulletPanel title="Planning checkpoints" description="These questions shape the right platform structure before development starts." items={content.considerations} />
          <RelatedLinks links={content.relatedLinks} />
        </div>
      </ServiceSection>
    </>
  );
}
