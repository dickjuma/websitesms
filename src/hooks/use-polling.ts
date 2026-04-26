"use client";

import { useEffect, useRef, useCallback } from "react";

interface PollOptions {
  url: string;
  interval?: number;
  onData?: (data: any) => void;
  enabled?: boolean;
}

export function usePolling({ url, interval = 3000, onData, enabled = true }: PollOptions) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch(url, { 
        signal: abortRef.current.signal,
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        onData?.(data);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Polling error:", err);
      }
    }
  }, [url, enabled, onData]);

  useEffect(() => {
    if (!enabled) return;

    fetchData();
    intervalRef.current = setInterval(fetchData, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      abortRef.current?.abort();
    };
  }, [fetchData, interval, enabled]);

  return { refetch: fetchData };
}