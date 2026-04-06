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
import { uiUxDesignContent as content } from "../_content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function UiUxDesignPage() {
  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Start Your Product Design"
        accentClassName="bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_28%),linear-gradient(180deg,#ffffff_0%,#fffdf7_100%)]"
        stats={[
          { label: "Focus", value: "User clarity" },
          { label: "Output", value: "Reusable systems" },
          { label: "Result", value: "Less build rework" },
        ]}
      />

      <ServiceSection className="py-18">
        <SectionHeading
          eyebrow="Design System"
          title={content.summary}
          description="This page is shaped around product clarity: understanding users, structuring flows, defining reusable patterns, and supporting engineering with decisions that hold together."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <HighlightRibbon items={content.highlights} />
        </div>
      </ServiceSection>

      <ServiceSection className="pb-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ImageFrame src={content.imageSrc} alt={content.imageAlt} aspectClassName="aspect-[6/5]" />
          <div className="space-y-8">
            <BulletPanel title="Design coverage" description="The work usually spans structure, user journeys, interfaces, and reusable product language." items={content.capabilities} />
            <BulletPanel title="Design outcomes" description="The payoff is product clarity for both users and the people building the experience." items={content.outcomes} variant="blue" />
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <BulletPanel title="Questions that shape the design" description="We use these decisions to set the right scope and interaction depth early." items={content.considerations} />
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Design cadence</p>
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
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <ActionCard
            title="Useful when product direction needs to become visible before engineering deepens"
            description="UI and UX work is most valuable when the team needs alignment on flow, structure, and reusable patterns before implementation accelerates."
          />
          <RelatedLinks links={content.relatedLinks} />
        </div>
      </ServiceSection>
    </>
  );
}
