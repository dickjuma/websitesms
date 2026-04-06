import { notFound } from "next/navigation";
import { SolutionShowcasePage } from "../_components/solution-showcase-page";
import { getSolutionShowcase } from "../_content";

export default function LogisticsPage() {
  const solution = getSolutionShowcase("logistics");

  if (!solution) {
    notFound();
  }

  return <SolutionShowcasePage solution={solution} />;
}
