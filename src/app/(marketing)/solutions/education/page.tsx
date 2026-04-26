export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionShowcasePage } from "../_components/solution-showcase-page";
import { getSolutionShowcase } from "../_content";

export const metadata: Metadata = {
  title: "Education Solutions | E-Learning Platforms Kenya | SMAS Systems",
  description: "Education software solutions for Kenyan schools and universities. LMS, e-learning platforms, student management systems. Modern education technology.",
  keywords: ["education solutions", "e-learning platform", "LMS Kenya", "student management system", "online learning", "education technology"],
};

export default function EducationPage() {
  const solution = getSolutionShowcase("education");

  if (!solution) {
    notFound();
  }

  return <SolutionShowcasePage solution={solution} />;
}
