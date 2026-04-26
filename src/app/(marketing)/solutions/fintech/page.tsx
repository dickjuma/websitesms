export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionShowcasePage } from "../_components/solution-showcase-page";
import { getSolutionShowcase } from "../_content";

export const metadata: Metadata = {
  title: "Fintech Solutions | Financial Software Kenya | SMAS Systems",
  description: "Fintech solutions for Kenyan businesses. Payment processing, banking software, financial management systems. Secure fintech development.",
  keywords: ["fintech solutions", "financial software", "payment processing Kenya", "banking software", "financial management", "fintech development"],
};

export default function FintechPage() {
  const solution = getSolutionShowcase("fintech");

  if (!solution) {
    notFound();
  }

  return <SolutionShowcasePage solution={solution} />;
}
