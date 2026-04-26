"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const ChatInterface = dynamic(
  () => import("@/components/chatbot/chat-interface").then((module) => module.default),
  { ssr: false, loading: () => null },
);

function ChatInterfaceError({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return null;
  }
  
  return <>{children}</>;
}

export function ChatInterfaceMount() {
  const pathname = usePathname() ?? "";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || pathname.startsWith("/admin") || pathname.startsWith("/chat")) {
    return null;
  }

  return (
    <ChatInterfaceError>
      <ChatInterface />
    </ChatInterfaceError>
  );
}
