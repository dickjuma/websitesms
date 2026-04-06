import { DetailPage } from "@/components/layout/detail-page";
import { genericMarketingPages } from "@/lib/site-data";

const page = genericMarketingPages["case-studies"];

export default function CaseStudiesPage() {
  return <DetailPage eyebrow={page.eyebrow} title={page.title} description={page.description} highlights={page.highlights} capabilities={page.capabilities} outcomes={page.outcomes} relatedLinks={page.relatedLinks} />;
}

