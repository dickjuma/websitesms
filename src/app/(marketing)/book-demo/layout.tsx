import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | Free Software Demo | SMA Systems Kenya",
  description: "Book a free demo of our software solutions. See how our ERP systems, web apps, and mobile apps can transform your business in Kenya.",
  keywords: ["book a demo", "free demo", "software demo Kenya", "ERP demo", "schedule demo", "product demo"],
  openGraph: {
    title: "Book a Demo | Free Software Demo | SMA Systems Kenya",
    description: "Book a free demo of our software solutions for Kenyan businesses.",
  },
};

export default function BookDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}