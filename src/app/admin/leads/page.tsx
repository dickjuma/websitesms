"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  RefreshCcw,
  Search,
  Users,
  Zap,
} from "lucide-react";
import { LeadsTable } from "@/components/admin/leads/table";
import { useLeadsStore } from "@/lib/admin-store";

function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-slate-100" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 border-b border-slate-100 p-4">
          <div className="h-10 w-10 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-3 w-48 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}


export default function LeadsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [qualificationFilter, setQualificationFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 50;
  const deferredFilter = useDeferredValue(filter);

  const leads = useLeadsStore((state) => state.leads);
  const totalCount = useLeadsStore((state) => state.totalCount);
  const setLeads = useLeadsStore((state) => state.setLeads);
  const setTotalCount = useLeadsStore((state) => state.setTotalCount);
  const setStoreLoading = useLeadsStore((state) => state.setLoading);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadLeads = useCallback(async () => {
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

      if (qualificationFilter !== "all") {
        params.set("qualification", qualificationFilter);
      }

      const response = await fetch(`/api/admin/leads?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = (await response.json()) as { 
        leads: Array<{
          id: string;
          name: string;
          email: string;
          phone: string;
          businessNeed: string;
          visitorId: string;
          sessionCount: number;
          qualification: "HOT" | "WARM" | "COLD";
          leadScore: number;
          isHumanActive: boolean;
          status: string;
          lastMessage: string;
          lastMessageAt: string;
          createdAt: string;
          currentSessionId?: string | null;
        }>;
        total: number;
      };

      setLeads(data.leads.map(l => ({
        ...l,
        currentSessionId: l.currentSessionId || null,
        lastMessage: l.lastMessage || "",
        lastMessageAt: l.lastMessageAt || l.createdAt,
        status: l.status as "new" | "contacted" | "qualified" | "converted" | "closed",
      })));
      setTotalCount(data.total || data.leads.length);
    } catch (error) {
      console.error("Failed to load leads:", error);
    } finally {
      setLoading(false);
      setStoreLoading(false);
    }
  }, [
    deferredFilter,
    page,
    pageSize,
    qualificationFilter,
    setLeads,
    setStoreLoading,
    setTotalCount,
  ]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    loadLeads();
  }, [loadLeads, mounted]);

  const exportCSV = useCallback(() => {
    const headers = ["Name", "Email", "Phone", "Qualification", "Status", "Score", "Created"];
    const rows = leads.map((lead) => [
      lead.name || "",
      lead.email || "",
      lead.phone || "",
      lead.qualification,
      lead.status,
      String(lead.leadScore),
      formatDate(lead.createdAt),
    ]);
    
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [leads]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const resultLabel = deferredFilter.trim() || qualificationFilter !== "all" ? "Matching Leads" : "Total Leads";

  const metrics = useMemo(
    () => [
      { label: resultLabel, value: totalCount, icon: Users, detail: "Rows matching the current filters" },
      { label: "Visible Hot Leads", value: leads.filter((l) => l.qualification === "HOT").length, icon: Zap, detail: "Hot leads on this page" },
      { label: "Visible Live Agents", value: leads.filter((l) => l.isHumanActive).length, icon: Users, detail: "Human-handled chats on this page" },
    ],
    [leads, resultLabel, totalCount]
  );

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      {/* Hero Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex flex-col gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <Users className="h-3 w-3" />
              Lead Management
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Manage Inbound Leads
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Monitor lead status, manage conversations, and keep your data current for efficient team operations.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => loadLeads()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-60"
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
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

      {/* Filters and Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Active Pipeline
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Lead Queue & Live Conversations
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setPage(1);
                  }}
                  className="rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <select
                value={qualificationFilter}
                onChange={(e) => {
                  setQualificationFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 py-2 pl-3 pr-8 text-sm outline-none focus:border-blue-400"
              >
                <option value="all">All Qualification</option>
                <option value="HOT">Hot</option>
                <option value="WARM">Warm</option>
                <option value="COLD">Cold</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <LeadsTable 
            leads={leads} 
            loading={loading}
            onRowClick={(lead) => router.push(`/admin/chat?leadId=${lead.id}`)}
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
