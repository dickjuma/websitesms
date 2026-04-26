export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionShowcasePage } from "../_components/solution-showcase-page";
import { getSolutionShowcase } from "../_content";

export const metadata: Metadata = {
  title: "Logistics Solutions | Fleet Management Software Kenya | SMAS Systems",
  description: "Logistics software solutions for Kenyan businesses. Fleet management, route optimization, warehouse management. Streamline your supply chain.",
  keywords: ["logistics solutions", "fleet management software", "route optimization Kenya", "warehouse management", "supply chain software", "logistics tech"],
};

export default function LogisticsPage() {
  const solution = getSolutionShowcase("logistics");

  if (!solution) {
    notFound();
  }

  return <SolutionShowcasePage solution={solution} />;
}
