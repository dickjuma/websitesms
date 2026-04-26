import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SMA Systems - Leading Software Company Kenya",
  description: "Learn about SMA Systems, Kenya's leading software development company. We build custom websites, mobile apps, ERP systems, POS solutions, and AI solutions for businesses across East Africa.",
  keywords: ["about SMA Systems", "software company Kenya", "about us", "Nairobi software company", "ERP company Kenya", "development team Kenya"],
  openGraph: {
    title: "About Us | SMA Systems - Leading Software Company Kenya",
    description: "Learn about SMA Systems, Kenya's leading software development company serving East Africa.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}