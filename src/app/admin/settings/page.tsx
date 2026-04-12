"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Bot,
  Globe,
  Mail,
  RefreshCcw,
  Save,
  Shield,
  Sparkles,
} from "lucide-react";

import {
  AdminHero,
  AdminPanel,
  AdminStatCard,
} from "@/components/admin/ui/primitives";

interface SiteSettingsState {
  companyName: string;
  email: string;
  supportEmail: string;
  salesEmail: string;
  notificationsEmail: string;
  phone: string;
  address: string;
  websiteUrl: string;
  workingHours: string;
}

interface AiConfigState {
  systemPrompt: string;
  businessSummary: string;
  pricingNotes: string;
  escalationMessage: string;
  qualificationRules: string;
}

interface AdminPreferencesState {
  timezone: string;
  language: string;
  notifications: {
    newLead: boolean;
    newMessage: boolean;
    chatTakeover: boolean;
  };
}

const defaultSiteSettings: SiteSettingsState = {
  companyName: "SMA Systems and Softwares",
  email: "hello@smassystems.com",
  supportEmail: "support@smassystems.com",
  salesEmail: "sales@smassystems.com",
  notificationsEmail: "info@smassystems.com",
  phone: "+254 719 832 719",
  address: "Nairobi, Kenya",
  websiteUrl: "https://smassystems.com",
  workingHours: "Mon-Fri: 9AM-6PM EAT",
};

const defaultAiConfig: AiConfigState = {
  systemPrompt:
    "You are SMA Systems' AI assistant. Stay concise, direct, and trustworthy.",
  businessSummary:
    "SMA Systems builds custom software, mobile apps, ERP, CRM, POS, AI solutions, cloud/devops systems, integrations, cybersecurity support, and internal business platforms.",
  pricingNotes:
    "Use directional pricing unless exact starter pricing is stored in the knowledge base or admin training facts.",
  escalationMessage:
    "If the visitor asks for a specialist, urgent support, or a tailored quote, offer to connect them to a human agent immediately.",
  qualificationRules:
    "Treat urgent, budget-approved, or ready-to-start visitors as HOT. Treat exploratory pricing or shortlist conversations as WARM.",
};

const defaultPreferences: AdminPreferencesState = {
  timezone: "Africa/Nairobi",
  language: "en",
  notifications: {
    newLead: true,
    newMessage: true,
    chatTakeover: true,
  },
};

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsState>(defaultSiteSettings);
  const [aiConfig, setAiConfig] = useState<AiConfigState>(defaultAiConfig);
  const [preferences, setPreferences] = useState<AdminPreferencesState>(defaultPreferences);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    void loadSettings();
  }, [mounted]);

  const loadSettings = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/settings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load settings");
      }

      const data = (await response.json()) as {
        siteSettings?: Partial<SiteSettingsState>;
        aiConfig?: Partial<AiConfigState>;
        adminPreferences?: Partial<AdminPreferencesState>;
      };

      setSiteSettings((current) => ({
        ...current,
        ...(data.siteSettings || {}),
      }));
      setAiConfig((current) => ({
        ...current,
        ...(data.aiConfig || {}),
      }));
      setPreferences((current) => ({
        ...current,
        ...(data.adminPreferences || {}),
        notifications: {
          ...current.notifications,
          ...(data.adminPreferences?.notifications || {}),
        },
      }));
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteSettings,
          aiConfig,
          adminPreferences: preferences,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      setSaved(true);
      window.setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const metrics = useMemo(
    () => [
      {
        label: "Notification inbox",
        value: siteSettings.notificationsEmail || "Not set",
        detail: "Where lead and form alerts are delivered.",
        icon: Mail,
        tone: "blue" as const,
      },
      {
        label: "Support coverage",
        value: siteSettings.supportEmail || "Not set",
        detail: "Primary address for support escalations.",
        icon: Shield,
        tone: "emerald" as const,
      },
      {
        label: "Admin timezone",
        value: preferences.timezone,
        detail: "Used for admin-facing timing preferences.",
        icon: Globe,
        tone: "slate" as const,
      },
      {
        label: "AI escalation",
        value: aiConfig.escalationMessage ? "Configured" : "Needs review",
        detail: "How the assistant hands visitors off to a person.",
        icon: Bot,
        tone: "amber" as const,
      },
    ],
    [
      aiConfig.escalationMessage,
      preferences.timezone,
      siteSettings.notificationsEmail,
      siteSettings.supportEmail,
    ],
  );

  if (!mounted || loading) {
    return (
      <main className="space-y-6">
        <div className="h-48 animate-pulse rounded-[28px] border border-slate-200 bg-white/80" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-[26px] border border-slate-200 bg-white/80"
            />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <div className="h-72 animate-pulse rounded-[26px] border border-slate-200 bg-white/80" />
            <div className="h-72 animate-pulse rounded-[26px] border border-slate-200 bg-white/80" />
          </div>
          <div className="h-96 animate-pulse rounded-[26px] border border-slate-200 bg-white/80" />
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <AdminHero
        badge="System configuration"
        title="Keep the admin experience connected to real operating settings"
        description="This screen now focuses on settings that actually persist: business contact details, AI assistant behavior, and admin delivery preferences."
        icon={Shield}
        tone="emerald"
        meta={[
          { label: "Business email", value: siteSettings.email || "Not set" },
          { label: "Support desk", value: siteSettings.supportEmail || "Not set" },
          { label: "Working hours", value: siteSettings.workingHours || "Not set" },
        ]}
        actions={
          <>
            <button
              type="button"
              onClick={() => void loadSettings()}
              disabled={loading || saving}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-60"
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Reload
            </button>
            <button
              type="button"
              onClick={saveSettings}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : saved ? "Saved" : "Save settings"}
            </button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <AdminStatCard key={metric.label} {...metric} />
        ))}
      </section>

      {saved ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Settings saved successfully.
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <div className="space-y-6">
          <AdminPanel
            title="Business contact settings"
            description="These fields power your admin contact destination, public-facing business details, and working-hours references."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Company name</span>
                <input
                  type="text"
                  value={siteSettings.companyName}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      companyName: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Primary email</span>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Notifications inbox</span>
                <input
                  type="email"
                  value={siteSettings.notificationsEmail}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      notificationsEmail: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Support email</span>
                <input
                  type="email"
                  value={siteSettings.supportEmail}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      supportEmail: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Sales email</span>
                <input
                  type="email"
                  value={siteSettings.salesEmail}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      salesEmail: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Phone</span>
                <input
                  type="tel"
                  value={siteSettings.phone}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Address</span>
                <input
                  type="text"
                  value={siteSettings.address}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      address: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Website URL</span>
                <input
                  type="url"
                  value={siteSettings.websiteUrl}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      websiteUrl: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Working hours</span>
                <input
                  type="text"
                  value={siteSettings.workingHours}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      workingHours: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
            </div>
          </AdminPanel>

          <AdminPanel
            title="AI assistant configuration"
            description="These prompts and rules guide the chatbot’s business framing, pricing language, and when it should escalate to a person."
          >
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">System prompt</span>
                <textarea
                  rows={4}
                  value={aiConfig.systemPrompt}
                  onChange={(event) =>
                    setAiConfig((current) => ({
                      ...current,
                      systemPrompt: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Business summary</span>
                <textarea
                  rows={3}
                  value={aiConfig.businessSummary}
                  onChange={(event) =>
                    setAiConfig((current) => ({
                      ...current,
                      businessSummary: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Pricing guidance</span>
                <textarea
                  rows={3}
                  value={aiConfig.pricingNotes}
                  onChange={(event) =>
                    setAiConfig((current) => ({
                      ...current,
                      pricingNotes: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Escalation message</span>
                  <textarea
                    rows={4}
                    value={aiConfig.escalationMessage}
                    onChange={(event) =>
                      setAiConfig((current) => ({
                        ...current,
                        escalationMessage: event.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Qualification rules</span>
                  <textarea
                    rows={4}
                    value={aiConfig.qualificationRules}
                    onChange={(event) =>
                      setAiConfig((current) => ({
                        ...current,
                        qualificationRules: event.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                  />
                </label>
              </div>
            </div>
          </AdminPanel>
        </div>

        <div className="space-y-6">
          <AdminPanel
            title="Admin delivery preferences"
            description="These options shape how the admin area behaves for your team."
          >
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Timezone</span>
                <select
                  value={preferences.timezone}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      timezone: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                >
                  <option value="Africa/Nairobi">Africa/Nairobi</option>
                  <option value="UTC">UTC</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Language</span>
                <select
                  value={preferences.language}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      language: event.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                >
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                </select>
              </label>
            </div>
          </AdminPanel>

          <AdminPanel
            title="Admin notifications"
            description="Choose which events should surface as admin-level notifications."
          >
            <div className="space-y-3">
              {[
                { key: "newLead", label: "New lead alerts" },
                { key: "newMessage", label: "New message alerts" },
                { key: "chatTakeover", label: "Chat takeover alerts" },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm">
                      <Bell className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={
                      preferences.notifications[
                        item.key as keyof typeof preferences.notifications
                      ]
                    }
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        notifications: {
                          ...current.notifications,
                          [item.key]: event.target.checked,
                        },
                      }))
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>
          </AdminPanel>

          <AdminPanel
            title="Why this changed"
            description="This settings screen was cleaned up to remove dead or misleading controls."
          >
            <div className="space-y-3 text-sm leading-6 text-slate-600">
              <p>
                Only persisted settings are shown here now, so admins are not editing fields that silently go nowhere.
              </p>
              <p>
                Business emails, site contact data, AI messaging, and admin preferences all save through the same route.
              </p>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-blue-900">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4" />
                  Cleaner structure, fewer false controls
                </div>
              </div>
            </div>
          </AdminPanel>
        </div>
      </div>
    </main>
  );
}
