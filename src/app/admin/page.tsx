"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Mail,
  MessageSquare,
  RefreshCcw,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { DashboardCharts } from "@/components/admin/dashboard/charts";
import { RecentActivity } from "@/components/admin/dashboard/recent-activity";
import {
  AdminHero,
  AdminPanel,
  AdminStatCard,
} from "@/components/admin/ui/primitives";

function ChartsSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
    </div>
  );
}

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
    leadId?: string;
    isHumanActive?: boolean;
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
  projectType?: string;
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

function buildRecentActivity(
  workspace: WorkspaceSummaryResponseData,
): DashboardData["recentActivity"] {
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
    leadId: lead.id,
    isHumanActive: lead.isHumanActive,
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
      quote.projectType?.trim() ||
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
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
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
      analytics?.dailyChats ??
      buildDailySeries(leads.map((lead) => lead.lastActivityAt)),
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);

    try {
      const [workspaceResponse, analyticsResponse] = await Promise.all([
        fetch("/api/admin?summary=true", {
          credentials: "include", // Include cookies for authentication
          cache: "no-store",
        }),
        fetch("/api/admin/analytics?period=7d", {
          credentials: "include", // Include cookies for authentication
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

  const handleTakeOver = useCallback(async (leadId: string) => {
    try {
      const response = await fetch("/api/admin/takeover", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadId }),
      });

      if (!response.ok) {
        throw new Error("Failed to take over chat");
      }

      // Refresh dashboard data
      await loadDashboardData();
    } catch (err) {
      console.error("Failed to take over chat:", err);
    }
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: "Total Leads",
        value: data.totalLeads,
        icon: Users,
        detail: "All captured leads.",
        tone: "blue" as const,
      },
      {
        label: "Hot Leads",
        value: data.hotLeads,
        icon: Zap,
        detail: "High-priority prospects.",
        tone: "rose" as const,
      },
      {
        label: "Live Agents",
        value: data.liveAgents,
        icon: MessageSquare,
        detail: "Active conversations with a person involved.",
        tone: "emerald" as const,
      },
      {
        label: "Contacts",
        value: data.contacts,
        icon: Mail,
        detail: "Contact submissions from the site.",
        tone: "slate" as const,
      },
      {
        label: "Quotes",
        value: data.quotes,
        icon: BookOpen,
        detail: "Quote requests awaiting follow-up.",
        tone: "amber" as const,
      },
      {
        label: "Demos",
        value: data.demos,
        icon: Calendar,
        detail: "Booked or requested demos.",
        tone: "blue" as const,
      },
      {
        label: "Team",
        value: data.team,
        icon: Users,
        detail: "Team members in the workspace.",
        tone: "slate" as const,
      },
      {
        label: "Q&A",
        value: data.qaItems,
        icon: BookOpen,
        detail: "Knowledge items training the assistant.",
        tone: "emerald" as const,
      },
    ],
    [data],
  );

  return (
    <main className="space-y-8 pb-10">
      <AdminHero
        badge="Admin dashboard"
        title="Run the workspace with context, not guesswork"
        description="See which leads are warming up, how many conversations need human attention, and what has landed across your website intake channels."
        icon={TrendingUp}
        tone="blue"
        meta={[
          { label: "Hot pipeline", value: `${data.hotLeads} hot leads` },
          { label: "Live support", value: `${data.liveAgents} active takeovers` },
          {
            label: "Inbound actions",
            value: `${data.contacts + data.quotes + data.demos} recent submissions`,
          },
        ]}
        actions={
          <>
            <a
              href="/admin/leads"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800"
            >
              Open leads center
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => void loadDashboardData()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 disabled:opacity-60"
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh data
            </button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <AdminStatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {loading ? (
          <ChartsSkeleton />
        ) : (
          <AdminPanel
            title="Lead and conversation trend"
            description="Use the latest traffic and chat volume to spot spikes, slowdowns, and follow-up gaps."
            contentClassName="p-0"
          >
            <DashboardCharts dailyLeads={data.dailyLeads} dailyChats={data.dailyChats} />
          </AdminPanel>
        )}
      </section>

      <section>
        {loading ? (
          <ActivitySkeleton />
        ) : (
          <AdminPanel
            title="Recent activity"
            description="The latest movement across leads, quote requests, demos, and contact submissions."
            contentClassName="p-0"
          >
            <RecentActivity activity={data.recentActivity} onTakeOver={handleTakeOver} />
          </AdminPanel>
        )}
      </section>
    </main>
  );
}
