import type { Metadata } from "next";
import { ChatInterfaceMount } from "@/components/chatbot/chat-interface-mount";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SMA Systems and Softwares | Enterprise Solutions",
    template: "%s | SMA",
  },
  description:
    "SMA Systems and Softwares designs and builds modern web platforms, mobile apps, enterprise systems, and AI solutions for ambitious businesses.",
  keywords: [
    "SMA Systems",
    "software development",
    "enterprise solutions",
    "AI solutions",
    "cloud devops",
    "enterprise systems",
  ],
  openGraph: {
    title: "SMA Systems and Softwares | Enterprise Solutions",
    description:
      "Premium product design and software engineering for teams building the next generation of digital platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
        {children}
        <ChatInterfaceMount />
      </body>
    </html>
  );
}
