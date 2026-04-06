"use client";

import { memo } from "react";
import { ArrowRight, Headphones } from "lucide-react";

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

function LeadsTableComponent({ leads, loading, onRowClick }: LeadsTableProps) {
  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Loading leads...
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        No leads found. New conversations will appear here automatically.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-6 py-4">Lead</th>
            <th className="px-6 py-4">User ID</th>
            <th className="px-6 py-4">Score</th>
            <th className="px-6 py-4">Qualification</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Last Message</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="transition hover:bg-slate-50/80"
            >
              <td className="px-6 py-5">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    {lead.name || "Anonymous visitor"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {lead.email || "No email captured yet"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {lead.phone || "No phone"} •{" "}
                    {lead.businessNeed || "Business need not captured"}
                  </p>
                </div>
              </td>
              <td className="px-6 py-5 text-xs text-slate-500">
                <div className="space-y-1">
                  <p className="font-mono text-slate-700">
                    {lead.visitorId?.slice(0, 12) || "Not assigned"}...
                  </p>
                  <p>{lead.sessionCount || 0} sessions</p>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">
                    {lead.leadScore || 0}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getQualificationBadge(
                    lead.qualification,
                  )}`}
                >
                  {lead.qualification}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col gap-2">
                  <span
                    className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(
                      lead.status,
                    )}`}
                  >
                    {lead.status}
                  </span>
                  {lead.isHumanActive ? (
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-700">
                      <Headphones className="h-3.5 w-3.5" />
                      Agent Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                      Bot Handling
                    </span>
                  )}
                </div>
              </td>
              <td className="max-w-xs px-6 py-5 text-sm text-slate-600">
                <div className="line-clamp-2">
                  {lead.lastMessage || "No messages yet"}
                </div>
                {lead.lastMessageAt && (
                  <div className="mt-1 text-xs text-slate-400">
                    {formatDate(lead.lastMessageAt)}
                  </div>
                )}
              </td>
              <td className="px-6 py-5 text-sm text-slate-500">
                {formatDate(lead.createdAt)}
              </td>
              <td className="px-6 py-5 text-right">
                <button
                  onClick={() => onRowClick?.(lead)}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Resume chat
                  <ArrowRight className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const LeadsTable = memo(LeadsTableComponent);
LeadsTable.displayName = "LeadsTable";
