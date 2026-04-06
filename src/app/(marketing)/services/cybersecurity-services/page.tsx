import type { Metadata } from "next";
import { cybersecurityContent as content } from "../_content";
import { CybersecurityServicesContent } from "./page-content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function CybersecurityServicesPage() {
  return <CybersecurityServicesContent />;
}