"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Search, Smartphone, Monitor, Globe, Tablet, UserSearch } from "lucide-react";
import { VisitorsTable } from "@/components/admin/visitors/table";
import { useVisitorsStore } from "@/lib/admin-store";

function TableSkeleton() {
  return (
    <div className="animate-pulse p-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 border-b border-slate-100 py-4">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-4 w-20 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

function getDeviceIcon(deviceType: string) {
  switch (deviceType) {
    case "mobile":
      return Smartphone;
    case "tablet":
      return Tablet;
    default:
      return Monitor;
  }
}


export default function UsersPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 50;
  const deferredFilter = useDeferredValue(filter);

  const visitors = useVisitorsStore((state) => state.visitors);
  const totalCount = useVisitorsStore((state) => state.totalCount);
  const setVisitors = useVisitorsStore((state) => state.setVisitors);
  const setTotalCount = useVisitorsStore((state) => state.setTotalCount);
  const setStoreLoading = useVisitorsStore((state) => state.setLoading);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const loadVisitors = async () => {
      setLoading(true);
      setStoreLoading(true);

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(pageSize),
        });

        const normalizedSearch = deferredFilter.trim();
        if (normalizedSearch) {
          params.set("search", normalizedSearch);
        }

        const response = await fetch(`/api/admin/visitors?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = (await response.json()) as {
          visitors: Array<{
            id: string;
            visitorId: string;
            ipAddress: string | null;
            deviceType: "desktop" | "tablet" | "mobile";
            timezone: string | null;
            visitCount: number;
            lastSeenAt: string;
            pagesVisited: Array<{ path: string; title: string; visitedAt: string }>;
          }>;
          total: number;
        };

        setVisitors(data.visitors);
        setTotalCount(data.total || data.visitors.length);
      } catch (error) {
        console.error("Failed to load visitors:", error);
      } finally {
        setLoading(false);
        setStoreLoading(false);
      }
    };

    loadVisitors();
  }, [deferredFilter, mounted, page, pageSize, setStoreLoading, setTotalCount, setVisitors]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const metrics = useMemo(() => [
    {
      label: deferredFilter.trim() ? "Matching Visitors" : "Total Visitors",
      value: totalCount,
      icon: UserSearch,
      detail: "Rows matching the current search",
    },
    {
      label: "Visible Active",
      value: visitors.filter((v) => {
        const lastSeen = new Date(v.lastSeenAt).getTime();
        return Date.now() - lastSeen < 300000;
      }).length,
      icon: Monitor,
      detail: "Active rows on this page",
    },
    {
      label: "Visible Desktop",
      value: visitors.filter((v) => v.deviceType === "desktop").length,
      icon: Monitor,
      detail: "Desktop rows on this page",
    },
    {
      label: "Visible Mobile",
      value: visitors.filter((v) => v.deviceType === "mobile").length,
      icon: Smartphone,
      detail: "Mobile rows on this page",
    },
  ], [deferredFilter, totalCount, visitors]);

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <UserSearch className="h-3 w-3" />
              Visitor Tracking
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Users
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Track visitors and sessions. Monitor user behavior and engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {metric.label}
              </p>
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <metric.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-600">{metric.detail}</p>
          </div>
        ))}
      </section>

      {/* Visitors Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search visitors..."
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
              />
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <VisitorsTable 
            visitors={visitors} 
            loading={loading}
          />
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing {Math.min((page - 1) * pageSize + 1, totalCount)} to {Math.min(page * pageSize, totalCount)} of {totalCount}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1 || loading}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page >= totalPages || loading}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
