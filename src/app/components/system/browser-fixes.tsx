"use client";

import { useEffect } from "react";

export function BrowserFixes() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleWindowError = (event: ErrorEvent) => {
      const message =
        event.error instanceof Error ? event.error.message : event.message;

      if (
        typeof message === "string" &&
        message.includes("releasePointerCapture") &&
        message.includes("No active pointer")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleWindowError);

    return () => {
      window.removeEventListener("error", handleWindowError);
    };
  }, []);

  return null;
}
