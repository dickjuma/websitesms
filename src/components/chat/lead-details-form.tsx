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
    onChange({
      ...value,
      [field]: nextValue,
    });
  };

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-900">Lead details</h3>
        <p className="text-xs text-slate-500">
          Share contact details so the team can follow up if you need a live handoff.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={value.name || ""}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Name"
          disabled={disabled}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400"
        />
        <input
          value={value.email || ""}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="Email"
          disabled={disabled}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400"
        />
        <input
          value={value.phone || ""}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="Phone"
          disabled={disabled}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400"
        />
        <input
          value={value.businessNeed || ""}
          onChange={(event) => updateField("businessNeed", event.target.value)}
          placeholder="Business need"
          disabled={disabled}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400"
        />
      </div>

      <button
        type="button"
        onClick={() => void onSave()}
        disabled={disabled}
        className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Save lead info
      </button>
    </div>
  );
}
