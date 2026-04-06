"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnalyticsCharts } from "@/components/admin/analytics/charts";
import { useAnalyticsStore } from "@/lib/admin-store";

function ChartsSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("7d");
  
  // Use Zustand store
  const { data, isLoading, setData, setLoading } = useAnalyticsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics?period=${period}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        cache: "no-store",
      });

      if (response.ok) {
        const json = (await response.json()) as { data: typeof data };
        setData(json.data);
      }
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const metrics = useMemo(
    () => [
      { label: "Total Leads", value: data?.totalLeads ?? 0, icon: Users, change: "+12%", color: "text-blue-600" },
      { label: "Hot Leads", value: data?.hotLeads ?? 0, icon: Zap, change: "+8%", color: "text-rose-600" },
      { label: "Total Chats", value: data?.totalChats ?? 0, icon: MessageSquare, change: "+24%", color: "text-slate-600" },
      { label: "Active Now", value: data?.activeChats ?? 0, icon: TrendingUp, change: "Live", color: "text-emerald-600" },
    ],
    [data]
  );

  const performanceMetrics = useMemo(
    () => [
      { label: "Conversion Rate", value: `${data?.conversionRate ?? 0}%` },
      { label: "Avg Lead Score", value: data?.avgLeadScore ?? 0 },
      { label: "Chats per Lead", value: data?.totalChats && data?.totalLeads ? (data.totalChats / data.totalLeads).toFixed(1) : "0" },
    ],
    [data]
  );

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <BarChart3 className="h-3 w-3" />
              Analytics
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Analytics
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Track performance and trends across your leads and chats.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-1">
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  period === p
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {p === "7d" ? "7 days" : p === "30d" ? "30 days" : "90 days"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {metric.label}
                </p>
                <div className={`rounded-lg bg-slate-50 p-2 ${metric.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {isLoading ? "..." : metric.value}
              </p>
              <p className="mt-1 text-sm font-medium text-emerald-600">
                {metric.change}
              </p>
            </div>
          );
        })}
      </section>

      {/* Charts - Lazy Loaded */}
      <section>
        {isLoading ? (
          <ChartsSkeleton />
        ) : data ? (
          <AnalyticsCharts
            dailyLeads={data.dailyLeads}
            dailyChats={data.dailyChats}
          />
        ) : (
          <ChartsSkeleton />
        )}
      </section>

      {/* Performance Metrics */}
      <section className="grid gap-4 sm:grid-cols-3">
        {performanceMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {isLoading ? "..." : metric.value}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
