export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionShowcasePage } from "../_components/solution-showcase-page";
import { getSolutionShowcase } from "../_content";

export const metadata: Metadata = {
  title: "Healthcare Solutions | Medical Software Kenya | SMAS Systems",
  description: "Healthcare software solutions for Kenyan medical facilities. Hospital management, patient records, telemedicine platforms. HIPAA-compliant development.",
  keywords: ["healthcare solutions", "medical software", "hospital management system Kenya", "patient records", "telemedicine", "health tech"],
};

export default function HealthcarePage() {
  const solution = getSolutionShowcase("healthcare");

  if (!solution) {
    notFound();
  }

  return <SolutionShowcasePage solution={solution} />;
}
