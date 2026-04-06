import { DetailPage } from "@/components/layout/detail-page";
import { genericMarketingPages } from "@/lib/site-data";

const page = genericMarketingPages.blog;

export default function BlogPage() {
  return <DetailPage activeHref="/blog" eyebrow={page.eyebrow} title={page.title} description={page.description} highlights={page.highlights} capabilities={page.capabilities} outcomes={page.outcomes} relatedLinks={page.relatedLinks} />;
}

