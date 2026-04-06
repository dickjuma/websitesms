"use client";

import { memo, useMemo } from "react";
import { Mail, MoreVertical, User } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  createdAt: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  loading: boolean;
}

function ContactsTableComponent({ contacts, loading }: ContactsTableProps) {
  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading contacts...</div>;
  }

  if (contacts.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        No contacts found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Company</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Created</th>
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
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Mail className="h-3.5 w-3.5" />
                      {contact.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600">{contact.company || "-"}</td>
              <td className="px-4 py-4">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  contact.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}>
                  {contact.status}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-slate-500">
                {new Date(contact.createdAt).toLocaleDateString()}
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

export const ContactsTable = memo(ContactsTableComponent);
ContactsTable.displayName = "ContactsTable";