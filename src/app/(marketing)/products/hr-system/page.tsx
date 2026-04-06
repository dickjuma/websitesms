import { DetailPage } from "@/components/layout/detail-page";
import { productDetails } from "@/lib/site-data";

const page = productDetails["hr-system"];

export default function HrSystemPage() {
  return <DetailPage eyebrow={page.eyebrow} title={page.title} description={page.description} highlights={page.highlights} capabilities={page.capabilities} outcomes={page.outcomes} relatedLinks={page.relatedLinks} />;
}

