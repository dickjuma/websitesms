"use client";

import type { LeadInput } from "@/lib/chat/types";

interface LeadDetailsFormProps {
  value: LeadInput;
  onChange: (value: LeadInput) => void;
  onSave: () => Promise<void> | void;
  disabled?: boolean;
}

export function LeadDetailsForm({
  value,
  onChange,
  onSave,
  disabled = false,
}: LeadDetailsFormProps) {
  const updateField = (field: keyof LeadInput, nextValue: string) => {
    onChange({ ...value, [field]: nextValue });
  };

  return (
    <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="mb-1 text-sm font-semibold text-slate-900">Lead details</h3>
      <p className="mb-3 text-xs text-slate-500">
        Share contact details so the team can follow up.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="space-y-3"
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-name" className="sr-only">Name</label>
            <input
              id="lead-name"
              value={value.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Name"
              disabled={disabled}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="lead-email" className="sr-only">Email</label>
            <input
              id="lead-email"
              type="email"
              value={value.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Email"
              disabled={disabled}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="lead-phone" className="sr-only">Phone</label>
            <input
              id="lead-phone"
              type="tel"
              value={value.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Phone"
              disabled={disabled}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="lead-need" className="sr-only">Business need</label>
            <input
              id="lead-need"
              value={value.businessNeed || ""}
              onChange={(e) => updateField("businessNeed", e.target.value)}
              placeholder="Business need"
              disabled={disabled}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save lead info
        </button>
      </form>
    </aside>
  );
}
