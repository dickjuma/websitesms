import { notFound } from "next/navigation";
import { SolutionShowcasePage } from "../_components/solution-showcase-page";
import { getSolutionShowcase } from "../_content";

export default function EducationPage() {
  const solution = getSolutionShowcase("education");

  if (!solution) {
    notFound();
  }

  return <SolutionShowcasePage solution={solution} />;
}
