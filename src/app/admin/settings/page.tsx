"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Shield,
  Bell,
  Globe,
  Key,
  MessageSquare,
  Bot,
} from "lucide-react";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [settings, setSettings] = useState({
    companyName: "SMA Systems",
    email: "",
    phone: "",
    address: "",
    timezone: "UTC",
    language: "en",
    notifications: {
      newLead: true,
      newMessage: true,
      chatTakeover: true,
    },
    chatbot: {
      isActive: true,
      systemPrompt: "You are a helpful assistant...",
      responseDelay: 500,
      escalationMessage: "Let me connect you with a human agent...",
    },
  });

  useEffect(() => {
    setMounted(true);
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/settings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = (await response.json()) as { settings: typeof settings };
        setSettings({ ...settings, ...data.settings });
      }
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
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!mounted || loading) {
    return (
      <main className="space-y-6">
        <div className="h-12 w-48 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl border border-slate-200 bg-white" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <Shield className="h-3 w-3" />
              System Configuration
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Settings
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Configure system settings, AI behavior, and API keys.
            </p>
          </div>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </section>

      {saved && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Settings saved successfully!
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Globe className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-slate-900">General</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chatbot Settings */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Bot className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-slate-900">AI Chatbot</h2>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Enable AI Chatbot</p>
                  <p className="text-sm text-slate-500">Allow AI to respond to visitor messages</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSettings({ 
                    ...settings, 
                    chatbot: { ...settings.chatbot, isActive: !settings.chatbot.isActive } 
                  })}
                  className={`relative h-6 w-11 rounded-full transition-all ${
                    settings.chatbot.isActive ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                      settings.chatbot.isActive ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">System Prompt</label>
                <textarea
                  value={settings.chatbot.systemPrompt}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    chatbot: { ...settings.chatbot, systemPrompt: e.target.value } 
                  })}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Response Delay (ms)</label>
                <input
                  type="number"
                  value={settings.chatbot.responseDelay}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    chatbot: { ...settings.chatbot, responseDelay: parseInt(e.target.value) } 
                  })}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Escalation Message</label>
                <textarea
                  value={settings.chatbot.escalationMessage}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    chatbot: { ...settings.chatbot, escalationMessage: e.target.value } 
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* API Keys */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Key className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-slate-900">API Keys</h2>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Groq API Key</label>
                <input
                  type="password"
                  placeholder="Enter your Groq API key"
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">OpenAI API Key</label>
                <input
                  type="password"
                  placeholder="Enter your OpenAI API key"
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Security */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-slate-900">Security</h2>
            </div>
            <div className="mt-4 space-y-4">
              <button className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
                <Key className="mr-2 inline h-4 w-4" />
                Change Password
              </button>
              <button className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
                <Shield className="mr-2 inline h-4 w-4" />
                Two-Factor Auth
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { key: "newLead", label: "New Lead" },
                { key: "newMessage", label: "New Message" },
                { key: "chatTakeover", label: "Chat Takeover" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      notifications: { ...settings.notifications, [item.key]: e.target.checked } 
                    })}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
