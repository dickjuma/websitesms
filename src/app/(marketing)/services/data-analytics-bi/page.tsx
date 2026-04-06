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
import { dataAnalyticsContent as content } from "../_content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function DataAnalyticsBiPage() {
  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Plan Your Reporting Layer"
        stats={[
          { label: "Output", value: "Decision-ready dashboards" },
          { label: "Need", value: "Connected reporting" },
          { label: "Result", value: "Less manual chasing" },
        ]}
      />

      <ServiceSection className="py-18">
        <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <SectionHeading
            eyebrow="Analytics Route"
            title={content.summary}
            description="This route is built around reporting usefulness: bringing the right sources together, defining the right KPIs, and making dashboards readable enough to drive decisions."
          />
          <div className="mt-8">
            <HighlightRibbon items={content.highlights} />
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            Easier visibility into operational movement and bottlenecks.
          </div>
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            Less time spent rebuilding reports by hand every week or month.
          </div>
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            Stronger shared understanding between leadership and operating teams.
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <BulletPanel title="What the analytics layer covers" description="The work typically spans data sources, KPI logic, dashboard structure, and refresh expectations." items={content.capabilities} />
          <ImageFrame src={content.imageSrc} alt={content.imageAlt} aspectClassName="aspect-[16/11]" />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <BulletPanel title="Reporting outcomes" description="Strong BI work creates visibility that leaders and teams can actually act on." items={content.outcomes} variant="blue" />
          <BulletPanel title="Metric planning" description="These questions help define dashboards that stay relevant." items={content.considerations} />
        </div>
      </ServiceSection>
      <ServiceSection className="py-12 pb-12">
        <BookDemoCTA />
      </ServiceSection>
      <ServiceSection className="py-8 pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <RelatedLinks links={content.relatedLinks} />
            <ActionCard
              title="Useful when reporting is scattered across spreadsheets and disconnected tools"
              description="This route is strongest when leadership and teams need one place to understand what is happening across the business."
            />
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Analytics build stages</p>
            <div className="mt-6">
              <StepsTimeline steps={content.steps} compact />
            </div>
          </div>
        </div>
      </ServiceSection>
    </>
  );
}
