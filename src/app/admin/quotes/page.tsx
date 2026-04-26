"use client";

import {
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import {
  Search,
  FileText,
  Mail,
  Phone,
  Building,
  MessageSquare,
  X,
  Send,
  Trash2,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";

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

function QuoteStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    quoted: "bg-green-100 text-green-700",
  };
  const labels: Record<string, string> = {
    new: "New",
    contacted: "Contacted",
    quoted: "Quoted",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.new}`}>
      {labels[status] || status}
    </span>
  );
}

function LeadQualityBadge({ quality }: { quality?: string }) {
  if (!quality) return null;
  const styles: Record<string, string> = {
    hot: "bg-red-100 text-red-700 border-red-200",
    warm: "bg-orange-100 text-orange-700 border-orange-200",
    cold: "bg-slate-100 text-slate-700 border-slate-200",
  };
  const labels: Record<string, string> = {
    hot: "Hot",
    warm: "Warm",
    cold: "Cold",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium border ${styles[quality] || styles.cold}`}>
      {labels[quality] || quality}
    </span>
  );
}

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  plan?: string;
  type?: string;
  price?: number | null;
  budget: string;
  timeline: string;
  message: string;
  leadQuality?: 'hot' | 'warm' | 'cold';
  status: string;
  createdAt: string;
  timestamp?: string;
  source?: string;
}


export default function QuotesPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const deferredFilter = useDeferredValue(filter);

  // Detail drawer state
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadQuotes = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(pageSize),
        });
        const normalizedSearch = deferredFilter.trim();
        if (normalizedSearch) {
          params.set("search", normalizedSearch);
        }

        const response = await fetch(`/api/admin/quotes?${params.toString()}`, {
          credentials: "include", // Include cookies for authentication
          cache: "no-store",
        });

        if (!response.ok) return;
        const data = await response.json() as { quotes: Quote[]; total: number };
        setQuotes(data.quotes);
        setTotalCount(data.total);
      } catch (error) {
        console.error("Failed to load quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, [deferredFilter, mounted, page, pageSize]);

  const openDetailDrawer = (quote: Quote) => {
    setSelectedQuote(quote);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedQuote(null), 300);
  };

  const handleStatusUpdate = async (newStatus: "new" | "contacted" | "quoted") => {
    if (!selectedQuote) return;
    setActionLoading(true);
    try {
      const response = await fetch("/api/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({
          resource: "quotes",
          id: selectedQuote.id,
          data: { status: newStatus },
        }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // Update local state
      setQuotes((prev) =>
        prev.map((q) => (q.id === selectedQuote.id ? { ...q, status: newStatus } : q))
      );
      setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedQuote) return;
    if (!confirm("Are you sure you want to delete this quote request?")) return;

    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin?resource=quotes&id=${selectedQuote.id}`, {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) throw new Error("Failed to delete quote");

      // Remove from local state
      setQuotes((prev) => prev.filter((q) => q.id !== selectedQuote.id));
      setTotalCount((prev) => prev - 1);
      closeDrawer();
    } catch (error) {
      console.error("Failed to delete quote:", error);
      alert("Failed to delete quote. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedQuote) return;
    setActionLoading(true);
    try {
      const subject = prompt("Enter reply subject:", `Re: Your Quote Request - ${selectedQuote.projectType}`);
      if (!subject) return;

      const message = prompt("Enter your reply message:");
      if (!message) return;

      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({
          action: "reply",
          resource: "quotes",
          id: selectedQuote.id,
          to: selectedQuote.email,
          subject,
          message,
        }),
      });

      if (!response.ok) throw new Error("Failed to send reply");

      alert("Reply sent successfully!");
      // Status will be updated to "contacted" by the server automatically
      setQuotes((prev) =>
        prev.map((q) => (q.id === selectedQuote.id ? { ...q, status: "contacted" } : q))
      );
      setSelectedQuote((prev) => (prev ? { ...prev, status: "contacted" } : null));
    } catch (error) {
      console.error("Failed to send reply:", error);
      alert("Failed to send reply. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            <FileText className="h-3 w-3" />
            Quote Management
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Quote Requests</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">View and manage quote requests from potential clients.</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search quotes..."
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : quotes.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No quote requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Project</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Budget</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Lead</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    onClick={() => openDetailDrawer(quote)}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{quote.name}</p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{quote.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Building className="h-4 w-4 text-slate-400" />
                        {quote.company || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-slate-900 font-medium">{quote.projectType}</div>
                      {quote.plan && <div className="text-xs text-slate-500">{quote.plan} {quote.type && `(${quote.type})`}</div>}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{quote.budget || "-"}</td>
                    <td className="px-4 py-4"><LeadQualityBadge quality={quote.leadQuality} /></td>
                    <td className="px-4 py-4"><QuoteStatusBadge status={quote.status} /></td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {new Date(quote.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); openDetailDrawer(quote); }}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Manage <ChevronRight className="h-3 w-3" />
                      </button>
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

      {/* Detail Drawer */}
      {selectedQuote && (
        <>
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            onClick={closeDrawer}
          />
          <div
            className={`fixed right-0 top-0 z-50 h-full w-full max-w-2xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex h-full flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Quote Details</h2>
                  <p className="text-sm text-slate-500">{selectedQuote.projectType} - {selectedQuote.plan || "Custom"}</p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Contact Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Name</label>
                    <p className="mt-1 text-sm font-medium text-slate-900">{selectedQuote.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Email</label>
                    <p className="mt-1 text-sm text-slate-900">
                      <a href={`mailto:${selectedQuote.email}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                        {selectedQuote.email} <Mail className="h-3 w-3" />
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Phone</label>
                    <p className="mt-1 text-sm text-slate-900">
                      <a href={`tel:${selectedQuote.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                        {selectedQuote.phone} <Phone className="h-3 w-3" />
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Company</label>
                    <p className="mt-1 text-sm text-slate-900">{selectedQuote.company || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Project Type</label>
                    <p className="mt-1 text-sm text-slate-900">{selectedQuote.projectType}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Plan / Type</label>
                    <p className="mt-1 text-sm text-slate-900">{selectedQuote.plan || "Custom"} {selectedQuote.type && `(${selectedQuote.type})`}</p>
                  </div>
                  {selectedQuote.price && (
                    <div>
                      <label className="text-xs font-semibold uppercase text-slate-500">Price</label>
                      <p className="mt-1 text-sm text-slate-900">
                        {typeof selectedQuote.price === 'number' ? `KSh ${selectedQuote.price.toLocaleString()}` : selectedQuote.price}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Budget Range</label>
                    <p className="mt-1 text-sm text-slate-900">{selectedQuote.budget || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Timeline</label>
                    <p className="mt-1 text-sm text-slate-900">{selectedQuote.timeline || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Lead Quality</label>
                    <div className="mt-1"><LeadQualityBadge quality={selectedQuote.leadQuality} /></div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Status</label>
                    <div className="mt-1"><QuoteStatusBadge status={selectedQuote.status} /></div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500">Submitted</label>
                    <p className="mt-1 text-sm text-slate-900">
                      {new Date(selectedQuote.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-500">Project Message</label>
                  <div className="mt-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 whitespace-pre-wrap border border-slate-200">
                    {selectedQuote.message}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-slate-200 px-6 py-4 flex flex-wrap gap-3">
                {selectedQuote.status === "new" && (
                  <button
                    onClick={() => handleStatusUpdate("contacted")}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                  >
                    <Clock className="h-4 w-4" /> Mark Contacted
                  </button>
                )}
                {selectedQuote.status === "contacted" && (
                  <button
                    onClick={() => handleStatusUpdate("quoted")}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4" /> Mark Quoted
                  </button>
                )}
                {selectedQuote.status === "new" || selectedQuote.status === "contacted" ? (
                  <button
                    onClick={handleSendReply}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" /> Send Reply Email
                  </button>
                ) : (
                  <button
                    onClick={handleSendReply}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" /> Send Email
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
                <button
                  onClick={closeDrawer}
                  className="ml-auto rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}