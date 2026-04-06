"use client";

import {
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { Search, Users } from "lucide-react";
import { ContactsTable } from "@/components/admin/contacts/table";
import { useContactsStore } from "@/lib/admin-store";

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

export default function ContactsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const deferredFilter = useDeferredValue(filter);

  const contacts = useContactsStore((state) => state.contacts);
  const totalCount = useContactsStore((state) => state.totalCount);
  const setContacts = useContactsStore((state) => state.setContacts);
  const setTotalCount = useContactsStore((state) => state.setTotalCount);
  const setStoreLoading = useContactsStore((state) => state.setLoading);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const loadContacts = async () => {
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

        const response = await fetch(`/api/admin/contacts?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = (await response.json()) as {
          contacts: Array<{
            id: string;
            name: string;
            email: string;
            phone: string;
            company: string;
            status: string;
            createdAt: string;
          }>;
          total: number;
        };

        setContacts(data.contacts.map(c => ({ ...c, status: c.status as "active" | "inactive" })));
        setTotalCount(data.total || data.contacts.length);
      } catch (error) {
        console.error("Failed to load contacts:", error);
      } finally {
        setLoading(false);
        setStoreLoading(false);
      }
    };

    loadContacts();
  }, [deferredFilter, mounted, page, pageSize, setContacts, setStoreLoading, setTotalCount]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <Users className="h-3 w-3" />
              Contact Management
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Contacts
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Manage your contacts and leads. Track user sessions and chat history.
            </p>
          </div>
        </div>
      </section>

      {/* Contacts Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contacts..."
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
          <ContactsTable 
            contacts={contacts} 
            loading={loading}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, totalCount)} of {totalCount}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
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
