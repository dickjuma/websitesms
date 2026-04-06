import type { Metadata } from "next";
import { inventorySystemsContent as content } from "../_content";
import { InventorySystemsContent } from "./page-content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function InventorySystemsPage() {
  return <InventorySystemsContent />;
}