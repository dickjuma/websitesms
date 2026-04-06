"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  MessageSquare,
  Zap,
  Mail,
  Calendar,
  BookOpen,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";
import { DashboardCharts } from "@/components/admin/dashboard/charts";
import { RecentActivity } from "@/components/admin/dashboard/recent-activity";

// Skeleton loader for charts
function ChartsSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
    </div>
  );
}

// Skeleton loader for activity
function ActivitySkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 animate-pulse rounded-lg bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  detail?: string;
  color?: string;
}

function MetricCard({ label, value, icon: Icon, detail, color = "text-blue-600" }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <div className={`rounded-lg bg-slate-50 p-2 ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      {detail && <p className="mt-2 text-sm text-slate-600">{detail}</p>}
    </div>
  );
}

interface DashboardData {
  totalLeads: number;
  hotLeads: number;
  liveAgents: number;
  contacts: number;
  quotes: number;
  demos: number;
  team: number;
  qaItems: number;
  recentActivity: Array<{
    id: string;
    action: string;
    detail: string;
    timestamp: string;
    type: "lead" | "chat" | "contact" | "system";
  }>;
  dailyLeads: Array<{ date: string; count: number }>;
  dailyChats: Array<{ date: string; count: number }>;
}

interface AnalyticsResponseData {
  totalLeads: number;
  hotLeads: number;
  totalChats: number;
  activeChats: number;
  conversionRate: number;
  avgLeadScore: number;
  dailyLeads: Array<{ date: string; count: number }>;
  dailyChats: Array<{ date: string; count: number }>;
}

interface WorkspaceLead {
  id?: string;
  name?: string;
  email?: string;
  businessNeed?: string;
  qualification?: string;
  isHumanActive?: boolean;
  createdAt?: string;
  lastActivityAt?: string;
  lastMessage?: string;
}

interface WorkspaceRecord {
  _id?: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  serviceType?: string;
  createdAt?: string;
}

interface WorkspaceSummaryResponseData {
  contactsCount?: number;
  quotesCount?: number;
  bookDemosCount?: number;
  teamCount?: number;
  chatbotQACount?: number;
  totalLeads?: number;
  recentContacts?: WorkspaceRecord[];
  recentQuotes?: WorkspaceRecord[];
  recentBookDemos?: WorkspaceRecord[];
  recentLeads?: WorkspaceLead[];
}

const defaultData: DashboardData = {
  totalLeads: 0,
  hotLeads: 0,
  liveAgents: 0,
  contacts: 0,
  quotes: 0,
  demos: 0,
  team: 0,
  qaItems: 0,
  recentActivity: [],
  dailyLeads: [],
  dailyChats: [],
};

function toIsoTimestamp(value: unknown) {
  if (typeof value !== "string" || !value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function buildDailySeries(values: Array<string | undefined>) {
  const grouped = values.reduce<Record<string, number>>((acc, value) => {
    const timestamp = toIsoTimestamp(value);
    if (!timestamp) {
      return acc;
    }

    const dateKey = timestamp.slice(0, 10);
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function buildRecentActivity(workspace: WorkspaceSummaryResponseData): DashboardData["recentActivity"] {
  const leadActivity = (workspace.recentLeads ?? []).map((lead, index) => ({
    id: lead.id ?? `lead-${index}`,
    action: "Lead activity",
    detail:
      lead.name?.trim() ||
      lead.email?.trim() ||
      lead.lastMessage?.trim() ||
      lead.businessNeed?.trim() ||
      "A visitor engaged with the chatbot.",
    timestamp: lead.lastActivityAt ?? lead.createdAt ?? new Date().toISOString(),
    type: "lead" as const,
  }));

  const contactActivity = (workspace.recentContacts ?? []).map((contact, index) => ({
    id: contact._id ?? `contact-${index}`,
    action: "Contact form received",
    detail:
      contact.subject?.trim() ||
      contact.message?.trim() ||
      contact.email?.trim() ||
      contact.name?.trim() ||
      "A new contact submission was received.",
    timestamp: contact.createdAt ?? new Date().toISOString(),
    type: "contact" as const,
  }));

  const quoteActivity = (workspace.recentQuotes ?? []).map((quote, index) => ({
    id: quote._id ?? `quote-${index}`,
    action: "Quote request received",
    detail:
      quote.serviceType?.trim() ||
      quote.company?.trim() ||
      quote.name?.trim() ||
      "A new quote request was submitted.",
    timestamp: quote.createdAt ?? new Date().toISOString(),
    type: "system" as const,
  }));

  const demoActivity = (workspace.recentBookDemos ?? []).map((demo, index) => ({
    id: demo._id ?? `demo-${index}`,
    action: "Demo request booked",
    detail:
      demo.company?.trim() ||
      demo.name?.trim() ||
      demo.email?.trim() ||
      "A new demo request was submitted.",
    timestamp: demo.createdAt ?? new Date().toISOString(),
    type: "system" as const,
  }));

  return [...leadActivity, ...contactActivity, ...quoteActivity, ...demoActivity]
    .map((item) => ({
      ...item,
      timestamp: toIsoTimestamp(item.timestamp) ?? new Date().toISOString(),
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);
}

function normalizeDashboardData(
  workspace?: WorkspaceSummaryResponseData,
  analytics?: AnalyticsResponseData,
): DashboardData {
  const leads = workspace?.recentLeads ?? [];

  return {
    totalLeads: analytics?.totalLeads ?? workspace?.totalLeads ?? leads.length,
    hotLeads:
      analytics?.hotLeads ??
      leads.filter((lead) => lead.qualification === "HOT").length,
    liveAgents:
      analytics?.activeChats ??
      leads.filter((lead) => lead.isHumanActive).length,
    contacts: workspace?.contactsCount ?? 0,
    quotes: workspace?.quotesCount ?? 0,
    demos: workspace?.bookDemosCount ?? 0,
    team: workspace?.teamCount ?? 0,
    qaItems: workspace?.chatbotQACount ?? 0,
    recentActivity: workspace ? buildRecentActivity(workspace) : [],
    dailyLeads:
      analytics?.dailyLeads ?? buildDailySeries(leads.map((lead) => lead.createdAt)),
    dailyChats:
      analytics?.dailyChats ?? buildDailySeries(leads.map((lead) => lead.lastActivityAt)),
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      };

      const [workspaceResponse, analyticsResponse] = await Promise.all([
        fetch("/api/admin?summary=true", {
          headers,
          cache: "no-store",
        }),
        fetch("/api/admin/analytics?period=7d", {
          headers,
          cache: "no-store",
        }),
      ]);

      const workspaceResult = workspaceResponse.ok
        ? ((await workspaceResponse.json()) as { data: WorkspaceSummaryResponseData })
        : null;
      const analyticsResult = analyticsResponse.ok
        ? ((await analyticsResponse.json()) as { data: AnalyticsResponseData })
        : null;

      setData(normalizeDashboardData(workspaceResult?.data, analyticsResult?.data));
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      setData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  const metrics = useMemo(
    () => [
      { label: "Total Leads", value: data.totalLeads, icon: Users, detail: "All captured leads" },
      { label: "Hot Leads", value: data.hotLeads, icon: Zap, detail: "High-priority prospects" },
      { label: "Live Agents", value: data.liveAgents, icon: MessageSquare, detail: "Active conversations" },
      { label: "Contacts", value: data.contacts, icon: Mail, detail: "Contact submissions" },
      { label: "Quotes", value: data.quotes, icon: BookOpen, detail: "Quote requests" },
      { label: "Demos", value: data.demos, icon: Calendar, detail: "Demo requests" },
      { label: "Team", value: data.team, icon: Users, detail: "Team members" },
      { label: "Q&A", value: data.qaItems, icon: BookOpen, detail: "Knowledge base items" },
    ],
    [data]
  );

  return (
    <main className="space-y-8 pb-10">
      {/* Hero Section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-white p-6 shadow-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <TrendingUp className="h-3 w-3" />
              Admin Dashboard
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Overview
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Manage your website content, customer interactions, and business data from a single, streamlined dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/leads"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              <MessageSquare className="h-4 w-4" />
              Leads Center
            </a>
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-700 hover:shadow-md disabled:opacity-60"
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid gap-6 lg:grid-cols-2">
        {loading ? (
          <ChartsSkeleton />
        ) : (
          <DashboardCharts dailyLeads={data.dailyLeads} dailyChats={data.dailyChats} />
        )}
      </section>

      {/* Recent Activity */}
      <section>
        {loading ? <ActivitySkeleton /> : <RecentActivity activity={data.recentActivity} />}
      </section>
    </main>
  );
}
