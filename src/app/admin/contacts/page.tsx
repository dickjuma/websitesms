"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  Archive,
  Building,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { AdminHero, AdminPanel } from "@/components/admin/ui/primitives";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    read: "bg-amber-100 text-amber-700",
    responded: "bg-emerald-100 text-emerald-700",
  };
  const labels: Record<string, string> = {
    new: "New",
    read: "Read",
    responded: "Responded",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] || styles.new}`}
    >
      {labels[status] || status}
    </span>
  );
}


export default function ContactsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Contact | null>(null);
  const pageSize = 20;
  const deferredFilter = useDeferredValue(filter);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pageSize),
      });
      const normalizedSearch = deferredFilter.trim();
      if (normalizedSearch) params.set("search", normalizedSearch);

      const response = await fetch(`/api/admin/contacts?${params.toString()}`, {
        credentials: "include", // Include cookies for authentication
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = (await response.json()) as {
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

  useEffect(() => {
    if (!mounted) return;
    void loadContacts();
  }, [deferredFilter, mounted, page, pageSize]);

  const filteredContacts = useMemo(() => {
    if (statusFilter === "all") return contacts;
    return contacts.filter((contact) => contact.status === statusFilter);
  }, [contacts, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
      body: JSON.stringify({ id, status }),
    });
    await loadContacts();
  };

  const deleteContact = async (id: string) => {
    await fetch(`/api/admin/contacts?id=${id}`, {
      method: "DELETE",
      credentials: "include", // Include cookies for authentication
    });
    if (selected?.id === id) {
      setSelected(null);
    }
    await loadContacts();
  };

  if (!mounted) return null;

  return (
    <main className="space-y-6">
      <AdminHero
        badge="Contacts"
        title="Stay on top of inbound requests"
        description="Review new contact submissions, respond quickly, and keep message history centralized."
        icon={MessageSquare}
        tone="slate"
        meta={[
          { label: "Total", value: totalCount },
          { label: "New", value: contacts.filter((c) => c.status === "new").length },
          {
            label: "Responded",
            value: contacts.filter((c) => c.status === "responded").length,
          },
        ]}
      />

      <AdminPanel
        title="Contact inbox"
        description="Search, triage, and resolve customer inquiries."
        contentClassName="p-0"
      >
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-slate-400"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
            >
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
            </select>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-x-auto border-r border-slate-200">
            <table className="hidden min-w-full text-left text-sm lg:table">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Message</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                      Loading contacts...
                    </td>
                  </tr>
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                      No contacts found.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className={`cursor-pointer transition ${
                        selected?.id === contact.id ? "bg-slate-50" : "hover:bg-slate-50"
                      }`}
                      onClick={() => {
                        setSelected(contact);
                        if (contact.status === "new") {
                          void updateStatus(contact.id, "read");
                        }
                      }}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {contact.name || "Anonymous"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{contact.email}</td>
                      <td className="px-6 py-4 text-slate-500">
                        <span className="block max-w-[240px] truncate">
                          {contact.message || contact.subject || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={contact.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(contact.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="space-y-4 p-4 lg:hidden">
              {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
                  Loading contacts...
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
                  No contacts found.
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => {
                      setSelected(contact);
                      if (contact.status === "new") {
                        void updateStatus(contact.id, "read");
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {contact.name || "Anonymous"}
                        </p>
                        <p className="text-xs text-slate-500">{contact.email}</p>
                      </div>
                      <StatusBadge status={contact.status} />
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      {contact.message || contact.subject || "-"}
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      {new Date(contact.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </button>
                ))
              )}
            </div>

            {totalPages > 1 ? (
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                <p className="text-xs text-slate-500">
                  Showing {Math.min((page - 1) * pageSize + 1, totalCount)} to{" "}
                  {Math.min(page * pageSize, totalCount)} of {totalCount}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1 || loading}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page >= totalPages || loading}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="p-6">
            {selected ? (
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {selected.name || "Anonymous"}
                    </h3>
                    <p className="text-sm text-slate-500">{selected.email}</p>
                    {selected.phone ? (
                      <p className="mt-1 text-sm text-slate-500">{selected.phone}</p>
                    ) : null}
                  </div>
                  <StatusBadge status={selected.status} />
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-slate-400" />
                    <span>{selected.company || "No company listed"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{selected.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{selected.phone || "No phone number"}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Subject
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {selected.subject || "No subject"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Message
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                    {selected.message || "No message provided."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selected.status !== "responded" ? (
                    <button
                      type="button"
                      onClick={() => updateStatus(selected.id, "responded")}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300"
                    >
                      <Archive className="h-4 w-4" />
                      Mark Responded
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => deleteContact(selected.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 hover:border-rose-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Select a message
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Choose a contact to view the full message and actions.
                </p>
              </div>
            )}
          </div>
        </div>
      </AdminPanel>
    </main>
  );
}
