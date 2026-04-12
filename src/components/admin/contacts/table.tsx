"use client";

import { memo } from "react";
import { Mail, Phone, Building, FileText, MoreVertical, User } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  serviceType: string;
  status: string;
  createdAt: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  loading: boolean;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    read: "bg-yellow-100 text-yellow-700",
    responded: "bg-green-100 text-green-700",
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-600",
  };
  const labels: Record<string, string> = {
    new: "New",
    read: "Read",
    responded: "Responded",
    active: "Active",
    inactive: "Inactive",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.new}`}>
      {labels[status] || status}
    </span>
  );
}

function ContactsTableComponent({ contacts, loading }: ContactsTableProps) {
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
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Company</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
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

export const ContactsTable = memo(ContactsTableComponent);
ContactsTable.displayName = "ContactsTable";