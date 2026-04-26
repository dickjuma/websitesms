"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { Search, Calendar, Mail, Phone, Building, Clock, Users } from "lucide-react";

function TableSkeleton() {
  return (
    <div className="animate-pulse p-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 border-b border-slate-100 py-4">
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

function DemoStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-purple-100 text-purple-700",
    cancelled: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    new: "New",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.new}`}>
      {labels[status] || status}
    </span>
  );
}


export default function BookDemosPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [demos, setDemos] = useState<Array<{
    id: string; name: string; email: string; company: string;
    phone: string; serviceType: string; preferredDate: string;
    preferredTime: string; teamSize: string; notes: string;
    status: string; createdAt: string;
  }>>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const deferredFilter = useDeferredValue(filter);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const loadDemos = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
        const normalizedSearch = deferredFilter.trim();
        if (normalizedSearch) params.set("search", normalizedSearch);

        const response = await fetch(`/api/admin/book-demos?${params.toString()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
          cache: "no-store",
        });

        if (!response.ok) return;
        const data = await response.json() as { demos: Array<{ id: string; name: string; email: string; company: string; phone: string; serviceType: string; preferredDate: string; preferredTime: string; teamSize: string; notes: string; status: string; createdAt: string }>; total: number };
        setDemos(data.demos);
        setTotalCount(data.total);
      } catch (error) {
        console.error("Failed to load demos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDemos();
  }, [deferredFilter, mounted, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <Calendar className="h-3 w-3" />
            Demo Management
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Book Demos</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">View and manage demo bookings from potential clients.</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search demos..."
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : demos.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No demo bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Team Size</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {demos.map((demo) => (
                  <tr key={demo.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{demo.name}</p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{demo.email}</span>
                            {demo.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{demo.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Building className="h-4 w-4 text-slate-400" />
                        {demo.company}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{demo.serviceType}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {demo.preferredDate} at {demo.preferredTime}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="h-4 w-4 text-slate-400" />
                        {demo.teamSize}
                      </div>
                    </td>
                    <td className="px-4 py-4"><DemoStatusBadge status={demo.status} /></td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {new Date(demo.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, totalCount)} of {totalCount}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60">Previous</button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60">Next</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}