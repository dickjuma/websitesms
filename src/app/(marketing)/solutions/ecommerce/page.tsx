export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionShowcasePage } from "../_components/solution-showcase-page";
import { getSolutionShowcase } from "../_content";

export const metadata: Metadata = {
  title: "Ecommerce Solutions | Online Store Development Kenya | SMAS Systems",
  description: "Ecommerce solutions for Kenyan businesses. Build online stores, payment integration, inventory management. Grow your online business.",
  keywords: ["ecommerce solutions", "online store development", "e-commerce Kenya", "online shop", "payment integration", "ecommerce platform"],
};

export default function EcommercePage() {
  const solution = getSolutionShowcase("ecommerce");

  if (!solution) {
    notFound();
  }

  return <SolutionShowcasePage solution={solution} />;
}
