"use client";

import { memo } from "react";
import { Shield, Trash2, User, Edit2 } from "lucide-react";

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

function TeamTableComponent({ members, loading, onDelete, onEdit }: TeamTableProps) {
  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading team...</div>;
  }

  if (members.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        No team members found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Member</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Last Active</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-slate-50">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  {member.photoUrl || member.image ? (
                    <img 
                      src={member.photoUrl || member.image} 
                      alt={member.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                      <User className="h-5 w-5 text-slate-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900">{member.name}</p>
                    <p className="text-sm text-slate-500">{member.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  <Shield className="h-3.5 w-3.5" />
                  {member.role}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  member.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}>
                  {member.status}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-slate-500">
                {member.lastActiveAt ? new Date(member.lastActiveAt).toLocaleString() : "-"}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(member)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(member.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
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
  );
}

export const TeamTable = memo(TeamTableComponent);
TeamTable.displayName = "TeamTable";