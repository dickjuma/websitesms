import type { Metadata } from "next";
import { qaTestingContent as content } from "../_content";
import { QaSoftwareTestingContent } from "./page-content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function QaSoftwareTestingPage() {
  return <QaSoftwareTestingContent />;
}