"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { Search, Users, Mail, Phone, Building, FileText, MoreVertical, User } from "lucide-react";

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

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  status: string;
  createdAt: string;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    read: "bg-yellow-100 text-yellow-700",
    responded: "bg-green-100 text-green-700",
  };
  const labels: Record<string, string> = {
    new: "New",
    read: "Read",
    responded: "Responded",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.new}`}>
      {labels[status] || status}
    </span>
  );
}

function ContactsTableComponent({ contacts, loading }: { contacts: Contact[]; loading: boolean }) {
  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading contacts...</div>;
  }

  if (contacts.length === 0) {
    return <div className="p-8 text-center text-sm text-slate-500">No contacts found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Company</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Subject</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Date</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-slate-50">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{contact.name}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building className="h-4 w-4 text-slate-400" />
                  {contact.company || "-"}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 max-w-[200px]">
                  <FileText className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate" title={contact.subject}>
                    {contact.subject || "-"}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={contact.status} />
              </td>
              <td className="px-4 py-4 text-sm text-slate-500">
                {new Date(contact.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-4">
                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ContactsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const deferredFilter = useDeferredValue(filter);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadContacts = async () => {
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

        const response = await fetch(`/api/admin/contacts?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          cache: "no-store",
        });

        if (!response.ok) {
          console.error("Failed to load contacts:", response.status);
          setLoading(false);
          return;
        }

        const data = await response.json() as {
          contacts: Contact[];
          total: number;
        };

        setContacts(data.contacts || []);
        setTotalCount(data.total || 0);
      } catch (error) {
        console.error("Failed to load contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [deferredFilter, mounted, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            <Users className="h-3 w-3" />
            Contact Management
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Contacts</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">Manage contact form submissions from potential clients.</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <ContactsTableComponent contacts={contacts} loading={loading} />

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