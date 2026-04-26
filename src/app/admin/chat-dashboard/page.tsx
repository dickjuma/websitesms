import { Metadata } from "next";
import ModernChatDashboard from "./ModernChatDashboard";

export const metadata: Metadata = {
  title: "Chat Dashboard - SMA Systems",
  description: "Modern AI-powered customer support chat dashboard",
};

export default function ChatDashboardPage() {
  return <ModernChatDashboard />;
}