import { DetailPage } from "@/components/layout/detail-page";
import { productDetails } from "@/lib/site-data";

const page = productDetails["erp-platform"];

export default function ErpPlatformPage() {
  return <DetailPage eyebrow={page.eyebrow} title={page.title} description={page.description} highlights={page.highlights} capabilities={page.capabilities} outcomes={page.outcomes} relatedLinks={page.relatedLinks} />;
}

