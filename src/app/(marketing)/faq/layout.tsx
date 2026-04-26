import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | SMA Systems Kenya",
  description: "Find answers to frequently asked questions about our software development services, pricing, delivery timelines, and support in Kenya.",
  keywords: ["FAQ", "frequently asked questions", "software development FAQ", "ERP FAQ Kenya", "web development questions", "support FAQ"],
  openGraph: {
    title: "FAQ | Frequently Asked Questions | SMA Systems Kenya",
    description: "Frequently asked questions about our software development services.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
