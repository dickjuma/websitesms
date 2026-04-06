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
import { cloudDevopsContent as content } from "../_content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function CloudDevopsPage() {
  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Plan Your Cloud Setup"
        stats={[
          { label: "Need", value: "Stable production systems" },
          { label: "Focus", value: "Deploy and monitor well" },
          { label: "Result", value: "Operational confidence" },
        ]}
      />

      <ServiceSection className="py-18">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Cloud Route"
              title={content.summary}
              description="The cloud and DevOps route is shaped around dependable releases, infrastructure clarity, backups, recovery, and observability once the system is live."
            />
            <div className="mt-8">
              <HighlightRibbon items={content.highlights} />
            </div>
          </div>
          <ImageFrame src={content.imageSrc} alt={content.imageAlt} aspectClassName="aspect-[16/11]" />
        </div>
      </ServiceSection>

      <ServiceSection className="pb-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
          <BulletPanel title="Cloud coverage" description="The work usually spans environments, pipelines, hosting, backups, and operational visibility." items={content.capabilities} />
          <BulletPanel title="Operational impact" description="The benefit is less release friction and stronger control over production behavior." items={content.outcomes} variant="blue" />
        </div>
      </ServiceSection>

      <ServiceSection className="py-12 pb-12">
        <BookDemoCTA />
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <RelatedLinks links={content.relatedLinks} />
            <ActionCard
              title="Strong fit when the product is growing faster than the operating process around it"
              description="This route helps when deployments are fragile, recovery is unclear, or the team needs a more deliberate production setup."
            />
          </div>
          <div className="space-y-8">
            <BulletPanel title="Infrastructure decisions" description="These questions shape the right hosting and operational model before rollout." items={content.considerations} />
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">DevOps sequence</p>
              <div className="mt-6">
                <StepsTimeline steps={content.steps} compact />
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>
    </>
  );
}
