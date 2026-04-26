export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { DetailPage } from "@/components/layout/detail-page";
import { productDetails } from "@/lib/site-data";

const page = productDetails["hr-system"];

export const metadata: Metadata = {
  title: "HR System | Human Resources Software Kenya | SMAS Systems",
  description: "HR management system for Kenyan businesses. Automate payroll, leave management, recruitment, and employee records. Scalable HR solution.",
  keywords: ["HR system", "human resources software", "payroll software Kenya", "employee management", "HR automation", "leave management"],
};

export default function HrSystemPage() {
  return <DetailPage eyebrow={page.eyebrow} title={page.title} description={page.description} highlights={page.highlights} capabilities={page.capabilities} outcomes={page.outcomes} relatedLinks={page.relatedLinks} />;
}

