import type { Metadata } from "next";
import { customSoftwareContent as content } from "../_content";
import { CustomSoftwareDevelopmentContent } from "./page-content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function CustomSoftwareDevelopmentPage() {
  return <CustomSoftwareDevelopmentContent />;
}