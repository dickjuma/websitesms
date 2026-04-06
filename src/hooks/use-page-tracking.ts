"use client";

import { useEffect, useRef, useCallback } from "react";

export function usePageTracking(params: {
  leadId?: string | null;
  visitorId?: string | null;
  sessionId?: string | null;
}) {
  const { leadId, visitorId, sessionId } = params;
  const startTimeRef = useRef<number>(Date.now());
  const lastPathRef = useRef<string>(
    typeof window !== "undefined" ? window.location.pathname : "",
  );

  const reportPageVisit = useCallback(
    (path: string, timeSpent: number) => {
      if (!leadId && !visitorId) return;

      const title = document.title || "";

      fetch("/api/lead/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          visitorId,
          sessionId,
          path,
          title,
          timeSpent,
        }),
      }).catch(() => {});
    },
    [leadId, sessionId, visitorId],
  );

  useEffect(() => {
    if (typeof window === "undefined" || (!leadId && !visitorId)) return;

    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);

      if (lastPathRef.current && lastPathRef.current !== currentPath) {
        reportPageVisit(lastPathRef.current, timeSpent);
      }

      startTimeRef.current = Date.now();
      lastPathRef.current = currentPath;
    };

    window.addEventListener("popstate", handleRouteChange);

    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleRouteChange();
    };

    return () => {
      const finalTimeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (lastPathRef.current) {
        reportPageVisit(lastPathRef.current, finalTimeSpent);
      }

      window.removeEventListener("popstate", handleRouteChange);
      window.history.pushState = originalPushState;
    };
  }, [leadId, reportPageVisit, visitorId]);
}
