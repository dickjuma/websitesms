import type { Metadata } from "next";
import { erpSystemsContent as content } from "../_content";
import { ErpSystemsContent } from "./page-content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function ErpSystemsPage() {
  return <ErpSystemsContent />;
}