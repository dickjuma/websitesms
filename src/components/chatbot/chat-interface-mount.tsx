"use client";

import dynamic from "next/dynamic";

const ChatInterface = dynamic(
  () => import("@/components/chatbot/chat-interface").then((module) => module.default),
  { ssr: false },
);

export function ChatInterfaceMount() {
  return <ChatInterface />;
}
