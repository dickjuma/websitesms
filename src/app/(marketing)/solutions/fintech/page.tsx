import { notFound } from "next/navigation";
import { SolutionShowcasePage } from "../_components/solution-showcase-page";
import { getSolutionShowcase } from "../_content";

export default function FintechPage() {
  const solution = getSolutionShowcase("fintech");

  if (!solution) {
    notFound();
  }

  return <SolutionShowcasePage solution={solution} />;
}
