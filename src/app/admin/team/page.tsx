"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Shield, Trash2, User } from "lucide-react";
import { TeamTable } from "@/components/admin/team/table";
import { useTeamStore } from "@/lib/admin-store";

function TableSkeleton() {
  return (
    <div className="animate-pulse p-4">
      {[1, 2, 3].map((i) => (
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

export default function TeamPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Use Zustand store
  const { members, setMembers, setLoading: setStoreLoading } = useTeamStore();

  useEffect(() => {
    setMounted(true);
    loadTeam();
  }, []);

  const loadTeam = async () => {
    setLoading(true);
    setStoreLoading(true);
    
    try {
      const response = await fetch("/api/admin/team", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = (await response.json()) as { 
        team: Array<{
          id: string;
          name: string;
          email: string;
          role: "admin" | "agent";
          status: "active" | "inactive";
          lastActiveAt: string | null;
        }>;
      };
      
      setMembers(data.team);
    } catch (error) {
      console.error("Failed to load team:", error);
    } finally {
      setLoading(false);
      setStoreLoading(false);
    }
  };

  const filteredMembers = useMemo(() => {
    if (!filter) return members;
    const search = filter.toLowerCase();
    return members.filter(
      (m) =>
        m.name?.toLowerCase().includes(search) ||
        m.email?.toLowerCase().includes(search)
    );
  }, [members, filter]);

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <Shield className="h-3 w-3" />
              Team Management
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Team
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Manage your team members, roles, and chat assignments.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </section>

      {/* Team Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search team..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <TeamTable 
            members={filteredMembers} 
            loading={loading}
            onDelete={(id) => {
              // Handle delete
              console.log("Delete member:", id);
            }}
          />
        )}
      </section>

      {/* Add Member Modal would go here */}
    </main>
  );
}
