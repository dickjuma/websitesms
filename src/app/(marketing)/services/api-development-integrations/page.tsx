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
import { apiIntegrationsContent as content } from "../_content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function ApiDevelopmentIntegrationsPage() {
  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Plan an Integration Project"
        stats={[
          { label: "Priority", value: "Reliability" },
          { label: "Focus", value: "Data flow clarity" },
          { label: "Need", value: "Supportable integrations" },
        ]}
      />

      <ServiceSection className="py-18">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="Integration Route"
              title={content.summary}
              description="This page is organized around system trust: what should sync, how failures should surface, and how the integration remains understandable after launch."
            />
            <div className="mt-8">
              <HighlightRibbon items={content.highlights} />
            </div>
          </div>
          <ImageFrame src={content.imageSrc} alt={content.imageAlt} aspectClassName="aspect-[6/5]" />
        </div>
      </ServiceSection>

      <ServiceSection className="pb-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
          <BulletPanel title="What gets built" description="The work can include APIs, middleware, webhooks, auth, retries, and the monitoring needed to trust live traffic." items={content.capabilities} />
          <BulletPanel title="What improves" description="Good integration work reduces manual movement and improves confidence across connected systems." items={content.outcomes} variant="blue" />
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
              title="Strong fit when teams are tired of fragile sync logic and unclear failures"
              description="This route is most useful when integrations are business-critical and need to be observable, maintainable, and deliberately designed."
            />
          </div>
          <div className="space-y-8">
            <BulletPanel title="Integration questions" description="These checkpoints define the right service boundaries before implementation." items={content.considerations} />
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Delivery stages</p>
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
