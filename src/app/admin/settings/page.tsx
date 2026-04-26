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
  Upload,
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
  logoUrl: string;
  stats: {
    projectsDelivered: string;
    clientSatisfaction: string;
    yearsExperience: string;
  };
  partners: Partner[];
  completedProjects: CompletedProject[];
}

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
}

interface CompletedProject {
  id: string;
  title: string;
  client: string;
  imageUrl: string;
  description?: string;
  services: string[];
  completedDate: string;
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
  theme: "light" | "dark" | "system";
  apiKeys: {
    openai: string;
    groq: string;
    resend: string;
  };
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
  phone: "0719832719",
  address: "Nairobi, Kenya",
  websiteUrl: "https://smasystems.co.ke",
  workingHours: "Mon-Fri: 9AM-6PM EAT",
  logoUrl: "",
  stats: {
    projectsDelivered: "400+",
    clientSatisfaction: "98%",
    yearsExperience: "12+",
  },
  partners: [],
  completedProjects: [],
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
  theme: "system",
  apiKeys: {
    openai: "",
    groq: "",
    resend: "",
  },
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
        apiKeys: {
          ...current.apiKeys,
          ...(data.adminPreferences?.apiKeys || {}),
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
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Logo</span>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          
                          const formData = new FormData();
                          formData.append("logo", file);
                          
                          try {
                            const response = await fetch("/api/admin/upload-logo", {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                              },
                              body: formData,
                            });
                            const data = await response.json();
                            if (data.success) {
                              setSiteSettings((current) => ({
                                ...current,
                                logoUrl: data.url,
                              }));
                              alert("Logo uploaded! Click 'Save settings' to apply changes.");
                            } else {
                              alert(data.message || "Upload failed");
                            }
                          } catch (error) {
                            console.error("Upload error:", error);
                            alert("Failed to upload logo");
                          }
                        }}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
                      >
                        Upload Logo
                      </label>
                    </div>
                  </div>
                  {siteSettings.logoUrl && (
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <img
                        src={siteSettings.logoUrl}
                        alt="Logo preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  value={siteSettings.logoUrl}
                  onChange={(event) =>
                    setSiteSettings((current) => ({
                      ...current,
                      logoUrl: event.target.value,
                    }))
                  }
                  placeholder="Or paste logo URL here..."
                  className="mt-3 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Favicon</span>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/png,image/x-icon,image/vnd.microsoft.icon"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          
                          const formData = new FormData();
                          formData.append("logo", file);
                          
                          try {
                            const response = await fetch("/api/admin/upload-logo", {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                              },
                              body: formData,
                            });
                            const data = await response.json();
                            if (data.success) {
                              setSiteSettings((current) => ({
                                ...current,
                                logoUrl: data.url,
                              }));
                            }
                          } catch (error) {
                            console.error("Upload error:", error);
                          }
                        }}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
                      >
                        Upload Logo
                      </label>
                    </div>
                  </div>
                  {siteSettings.logoUrl && (
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded border border-slate-200 bg-white">
                      <img
                        src={siteSettings.logoUrl}
                        alt="Logo preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
          </AdminPanel>

          {/* Partners Management */}
          <AdminPanel
            title="Partners"
            description="Manage partner logos displayed on the site."
          >
            <div className="space-y-4">
{siteSettings.partners.map((partner, index) => (
                <div key={partner.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  {partner.logoUrl ? (
                    <img src={partner.logoUrl} alt={partner.name} className="h-10 w-10 rounded object-contain" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-200 text-xs">No img</div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => {
                        const newPartners = [...siteSettings.partners];
                        newPartners[index].name = e.target.value;
                        setSiteSettings((s) => ({ ...s, partners: newPartners }));
                      }}
                      placeholder="Partner name"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm mb-2"
                    />
                    <input
                      type="text"
                      value={partner.logoUrl}
                      onChange={(e) => {
                        const newPartners = [...siteSettings.partners];
                        newPartners[index].logoUrl = e.target.value;
                        setSiteSettings((s) => ({ ...s, partners: newPartners }));
                      }}
                      placeholder="Logo URL"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newPartners = siteSettings.partners.filter((_, i) => i !== index);
                      setSiteSettings((s) => ({ ...s, partners: newPartners }));
                    }}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newPartner: Partner = { id: `partner-${Date.now()}`, name: "", logoUrl: "" };
                  setSiteSettings((s) => ({ ...s, partners: [...s.partners, newPartner] }));
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                + Add Partner
              </button>
            </div>
          </AdminPanel>

          {/* Completed Projects Management */}
          <AdminPanel
            title="Completed Projects"
            description="Manage completed projects displayed on the site."
          >
            <div className="space-y-4">
              {siteSettings.completedProjects.map((project, index) => (
                <div key={project.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex gap-3">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="h-16 w-24 rounded object-cover" />
                    ) : (
                      <div className="flex h-16 w-24 items-center justify-center rounded bg-slate-200 text-xs">No img</div>
                    )}
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...siteSettings.completedProjects];
                          newProjects[index].title = e.target.value;
                          setSiteSettings((s) => ({ ...s, completedProjects: newProjects }));
                        }}
                        placeholder="Project title"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={project.client}
                        onChange={(e) => {
                          const newProjects = [...siteSettings.completedProjects];
                          newProjects[index].client = e.target.value;
                          setSiteSettings((s) => ({ ...s, completedProjects: newProjects }));
                        }}
                        placeholder="Client name"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={project.imageUrl}
                        onChange={(e) => {
                          const newProjects = [...siteSettings.completedProjects];
                          newProjects[index].imageUrl = e.target.value;
                          setSiteSettings((s) => ({ ...s, completedProjects: newProjects }));
                        }}
                        placeholder="Image URL"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newProjects = siteSettings.completedProjects.filter((_, i) => i !== index);
                        setSiteSettings((s) => ({ ...s, completedProjects: newProjects }));
                      }}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newProject: CompletedProject = { 
                    id: `project-${Date.now()}`, 
                    title: "", 
                    client: "", 
                    imageUrl: "", 
                    services: [], 
                    completedDate: new Date().toISOString().split("T")[0] 
                  };
                  setSiteSettings((s) => ({ ...s, completedProjects: [...s.completedProjects, newProject] }));
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                + Add Completed Project
              </button>
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
              <div>
                <span className="text-sm font-medium text-slate-700">Theme</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["light", "dark", "system"] as const).map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() =>
                        setPreferences((current) => ({
                          ...current,
                          theme,
                        }))
                      }
                      className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                        preferences.theme === theme
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {theme === "light"
                        ? "Light"
                        : theme === "dark"
                          ? "Dark"
                          : "System"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AdminPanel>

          <AdminPanel
            title="API keys"
            description="Store provider keys used for chat, email, and automation services."
          >
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">OpenAI</span>
                <input
                  type="password"
                  value={preferences.apiKeys.openai}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      apiKeys: { ...current.apiKeys, openai: event.target.value },
                    }))
                  }
                  placeholder="sk-..."
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Groq</span>
                <input
                  type="password"
                  value={preferences.apiKeys.groq}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      apiKeys: { ...current.apiKeys, groq: event.target.value },
                    }))
                  }
                  placeholder="gsk_..."
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Resend</span>
                <input
                  type="password"
                  value={preferences.apiKeys.resend}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      apiKeys: { ...current.apiKeys, resend: event.target.value },
                    }))
                  }
                  placeholder="re_..."
                  className="mt-1 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
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
