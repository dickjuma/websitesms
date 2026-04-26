"use client";

import { memo, useState, useMemo } from "react";
import { Shield, Trash2, User, Edit2, Search, ChevronUp, ChevronDown, Calendar } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastActiveAt: string | null;
  photoUrl?: string;
  image?: string;
  bio?: string;
  department?: string;
  linkedin?: string;
}

interface TeamTableProps {
  members: TeamMember[];
  loading: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (member: TeamMember) => void;
}

type SortField = "name" | "role" | "status" | "lastActiveAt";
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 10;

function formatDate(dateString: string | null): string {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TeamTableComponent({ members, loading, onDelete, onEdit }: TeamTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return members;
    const term = searchTerm.toLowerCase();
    return members.filter((m) => {
      return (
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        m.role.toLowerCase().includes(term) ||
        (m.department && m.department.toLowerCase().includes(term))
      );
    });
  }, [members, searchTerm]);

  const sortedMembers = useMemo(() => {
    return [...filteredMembers].sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];
      if (sortField === "name") {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      }
      if (sortField === "role") {
        aVal = a.role.toLowerCase();
        bVal = b.role.toLowerCase();
      }
      if (sortField === "status") {
        aVal = a.status;
        bVal = b.status;
      }
      if (sortField === "lastActiveAt") {
        aVal = a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : 0;
        bVal = b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : 0;
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredMembers, sortField, sortOrder]);

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedMembers.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedMembers, currentPage]);

  const totalPages = Math.ceil(sortedMembers.length / ITEMS_PER_PAGE);

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

  if (members.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <User className="mx-auto mb-2 h-8 w-8 text-slate-300" aria-hidden="true" />
        <p className="text-sm text-slate-500">No team members yet. Add your first team member.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <label htmlFor="team-search" className="sr-only">Search team members</label>
        <input
          id="team-search"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by name, email, role, department..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
        />
      </div>

      {/* Desktop table view */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full border-collapse">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                <button onClick={() => handleSort("name")} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Member <SortIcon field="name" />
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <button onClick={() => handleSort("role")} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-700">
                  Role <SortIcon field="role" />
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <button onClick={() => handleSort("status")} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-700">
                  Status <SortIcon field="status" />
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <button onClick={() => handleSort("lastActiveAt")} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-700">
                  Last Active <SortIcon field="lastActiveAt" />
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedMembers.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/50 transition">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {member.photoUrl || member.image ? (
                      <img src={member.photoUrl || member.image} alt={member.name} className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                        <User className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-slate-900">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    <Shield className="h-3 w-3" aria-hidden="true" />
                    {member.role}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    member.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  {formatDate(member.lastActiveAt)}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(member)}
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label={`Edit ${member.name}`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(member.id)}
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        aria-label={`Delete ${member.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="space-y-3 lg:hidden">
        {paginatedMembers.map((member) => (
          <div key={member.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              {member.photoUrl || member.image ? (
                <img src={member.photoUrl || member.image} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.email}</p>
                  </div>
                  <div className="flex gap-1">
                    {onEdit && (
                      <button onClick={() => onEdit(member)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(member.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    <Shield className="h-3 w-3" /> {member.role}
                  </span>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    member.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {member.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" /> {formatDate(member.lastActiveAt)}
                  </span>
                </div>
              </div>
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

      {/* Result count */}
      {filteredMembers.length !== members.length && (
        <div className="text-xs text-slate-500">
          Showing {filteredMembers.length} of {members.length} members
        </div>
      )}
    </div>
  );
}

export const TeamTable = memo(TeamTableComponent);
TeamTable.displayName = "TeamTable";
