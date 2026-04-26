"use client";

import { memo, useState, useMemo } from "react";
import { ArrowRight, Headphones, Search, ChevronUp, ChevronDown, Users, Mail, Phone, Calendar, MessageSquare, Filter } from "lucide-react";

interface Lead {
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
}

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onRowClick?: (lead: Lead) => void;
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

function getQualificationBadge(qualification: Lead["qualification"]) {
  const classes = {
    HOT: "border-rose-200 bg-rose-50 text-rose-700",
    WARM: "border-amber-200 bg-amber-50 text-amber-700",
    COLD: "border-slate-200 bg-slate-100 text-slate-600",
  };
  return classes[qualification];
}

function getStatusBadge(status: string) {
  const classes: Record<string, string> = {
    new: "border-emerald-200 bg-emerald-50 text-emerald-700",
    contacted: "border-blue-200 bg-blue-50 text-blue-700",
    qualified: "border-purple-200 bg-purple-50 text-purple-700",
    converted: "border-emerald-200 bg-emerald-50 text-emerald-700",
    closed: "border-slate-300 bg-slate-100 text-slate-700",
  };
  return classes[status] || classes.new;
}

type SortField = "name" | "leadScore" | "createdAt" | "lastMessageAt";
type SortOrder = "asc" | "desc";

function LeadsTableComponent({ leads, loading, onRowClick }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;
    const term = searchTerm.toLowerCase();
    return leads.filter((lead) => {
      return (
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.phone.toLowerCase().includes(term) ||
        lead.businessNeed?.toLowerCase().includes(term) ||
        lead.visitorId?.toLowerCase().includes(term) ||
        lead.status.toLowerCase().includes(term)
      );
    });
  }, [leads, searchTerm]);

  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];
      if (sortField === "name") {
        aVal = a.name || "";
        bVal = b.name || "";
      }
      if (sortField === "leadScore") {
        aVal = a.leadScore || 0;
        bVal = b.leadScore || 0;
      }
      if (sortField === "createdAt" || sortField === "lastMessageAt") {
        aVal = new Date(a[sortField]).getTime();
        bVal = new Date(b[sortField]).getTime();
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredLeads, sortField, sortOrder]);

  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedLeads.slice(start, start + itemsPerPage);
  }, [sortedLeads, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="h-3 w-3 opacity-30" aria-hidden="true" />;
    return sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <Users className="mx-auto mb-2 h-8 w-8 text-slate-300" aria-hidden="true" />
        <p className="text-sm text-slate-500">No leads yet. New conversations will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <label htmlFor="lead-search" className="sr-only">Search leads</label>
          <input
            id="lead-search"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email, phone, need..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
        </div>
        <div className="text-xs text-slate-500">
          {filteredLeads.length} of {leads.length} leads
        </div>
      </div>

      {/* Desktop table view */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-4 py-3">
                <button onClick={() => handleSort("name")} className="flex items-center gap-1 hover:text-slate-700 focus:outline-none">
                  Lead <SortIcon field="name" />
                </button>
              </th>
              <th scope="col" className="px-4 py-3">User ID</th>
              <th scope="col" className="px-4 py-3">
                <button onClick={() => handleSort("leadScore")} className="flex items-center gap-1 hover:text-slate-700">
                  Score <SortIcon field="leadScore" />
                </button>
              </th>
              <th scope="col" className="px-4 py-3">Qualification</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">Last Message</th>
              <th scope="col" className="px-4 py-3">
                <button onClick={() => handleSort("createdAt")} className="flex items-center gap-1 hover:text-slate-700">
                  Created <SortIcon field="createdAt" />
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <p className="font-medium text-slate-900">{lead.name || "Anonymous"}</p>
                    <p className="text-xs text-slate-500">{lead.email || "No email"}</p>
                    <p className="text-xs text-slate-400">{lead.phone || "No phone"}</p>
                    {lead.businessNeed && <p className="text-xs text-slate-400 line-clamp-1">{lead.businessNeed}</p>}
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  <div className="space-y-1">
                    <span className="font-mono text-slate-600">{lead.visitorId?.slice(0, 12) || "—"}…</span>
                    <p>{lead.sessionCount || 0} sessions</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-lg font-bold text-slate-900">{lead.leadScore || 0}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${getQualificationBadge(lead.qualification)}`}>
                    {lead.qualification}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex w-fit rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                    {lead.isHumanActive && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700">
                        <Headphones className="h-3 w-3" /> Agent active
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 max-w-xs">
                  <p className="line-clamp-2 text-sm text-slate-600">{lead.lastMessage || "—"}</p>
                  {lead.lastMessageAt && <p className="mt-1 text-xs text-slate-400">{formatDate(lead.lastMessageAt)}</p>}
                </td>
                <td className="px-4 py-4 text-sm text-slate-500">{formatDate(lead.createdAt)}</td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => onRowClick?.(lead)}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Chat <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="space-y-3 lg:hidden">
        {paginatedLeads.map((lead) => (
          <div key={lead.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-slate-900">{lead.name || "Anonymous"}</h4>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                  {lead.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>}
                  {lead.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getQualificationBadge(lead.qualification)}`}>
                  {lead.qualification}
                </span>
                <button
                  onClick={() => onRowClick?.(lead)}
                  className="rounded-md bg-slate-800 p-2 text-white hover:bg-slate-700"
                  aria-label="Chat"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(lead.createdAt)}</span>
              <span className={`rounded-full border px-2 py-0.5 text-xs ${getStatusBadge(lead.status)}`}>{lead.status}</span>
              {lead.isHumanActive && <Headphones className="h-3 w-3 text-blue-600" />}
            </div>
            {lead.lastMessage && (
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">{lead.lastMessage}</p>
            )}
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <span>{lead.sessionCount || 0} sessions</span>
              <span>Score: <strong>{lead.leadScore || 0}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="text-xs text-slate-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const LeadsTable = memo(LeadsTableComponent);
LeadsTable.displayName = "LeadsTable";
