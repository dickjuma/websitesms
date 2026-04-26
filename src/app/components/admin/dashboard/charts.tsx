"use client";

import { memo, useMemo, useState } from "react";
import { BarChart3, MessageSquare, TrendingUp, Users, ChevronUp, ChevronDown } from "lucide-react";

interface DailyData {
  date: string;
  count: number;
}

interface ChartProps {
  dailyLeads: DailyData[];
  dailyChats: DailyData[];
}

// Helper to format date labels (MM/DD)
const formatDateLabel = (dateStr: string) => {
  const parts = dateStr.split("-");
  if (parts.length === 3) return `${parts[1]}/${parts[2]}`;
  return dateStr.slice(5);
};

// Helper to calculate week-over-week change
const calculateChange = (data: DailyData[]) => {
  if (data.length < 7) return 0;
  const currentWeek = data.slice(-7).reduce((sum, d) => sum + d.count, 0);
  const previousWeek = data.slice(-14, -7).reduce((sum, d) => sum + d.count, 0);
  if (previousWeek === 0) return currentWeek > 0 ? 100 : 0;
  return Math.round(((currentWeek - previousWeek) / previousWeek) * 100);
};

function ChartCard({
  title,
  icon: Icon,
  color,
  data,
  total,
  change,
  emptyMessage,
}: {
  title: string;
  icon: React.ElementType;
  color: "blue" | "emerald";
  data: DailyData[];
  total: number;
  change: number;
  emptyMessage: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxCount = useMemo(() => Math.max(...data.map((d) => d.count), 1), [data]);
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      bar: "bg-blue-500",
      barHover: "bg-blue-600",
      shadow: "shadow-blue-200",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      bar: "bg-emerald-500",
      barHover: "bg-emerald-600",
      shadow: "shadow-emerald-200",
    },
  };
  const c = colorClasses[color];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">{total} total</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${c.bg} ${c.text}`}>
          <TrendingUp className="h-3 w-3" aria-hidden="true" />
          <span>{change > 0 ? `+${change}` : change}%</span>
        </div>
      </div>

      <div className="relative mt-4 h-44">
        {data.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50">
            <BarChart3 className="mb-1 h-6 w-6 text-slate-300" aria-hidden="true" />
            <p className="text-xs text-slate-500">{emptyMessage}</p>
          </div>
        ) : (
          <div className="flex h-full items-end justify-between gap-2">
            {data.map((item, idx) => {
              const barHeight = Math.max((item.count / maxCount) * 120, 6);
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={item.date}
                  className="group relative flex flex-1 flex-col items-center gap-1"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative w-full">
                    <div
                      className={`mx-auto w-full max-w-8 rounded-t-md transition-all duration-200 ${
                        isHovered ? `${c.barHover} scale-105 shadow-md` : c.bar
                      }`}
                      style={{ height: `${barHeight}px` }}
                      aria-label={`${item.count} ${title.toLowerCase()} on ${item.date}`}
                    />
                    {isHovered && (
                      <div
                        className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-md"
                        role="tooltip"
                      >
                        {item.count} {title.toLowerCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">
                    {formatDateLabel(item.date)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-500">
        <span>Last 7 days</span>
        <div className="flex items-center gap-1">
          <span>Avg: {data.length ? Math.round(total / data.length) : 0}</span>
          <span>/day</span>
        </div>
      </div>
    </div>
  );
}

function MetricsCard({ label, value, icon: Icon, color, change }: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: "emerald" | "blue" | "purple";
  change?: number;
}) {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorMap[color]}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        {change !== undefined && (
          <span className={`flex items-center text-xs font-medium ${change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {change >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
}

const ChartsComponent = memo(function ChartsComponent({ dailyLeads, dailyChats }: ChartProps) {
  const totalLeads = useMemo(() => dailyLeads.reduce((s, d) => s + d.count, 0), [dailyLeads]);
  const totalChats = useMemo(() => dailyChats.reduce((s, d) => s + d.count, 0), [dailyChats]);
  const leadsChange = useMemo(() => calculateChange(dailyLeads), [dailyLeads]);
  const chatsChange = useMemo(() => calculateChange(dailyChats), [dailyChats]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Lead Trends"
          icon={BarChart3}
          color="blue"
          data={dailyLeads}
          total={totalLeads}
          change={leadsChange}
          emptyMessage="No lead data yet"
        />
        <ChartCard
          title="Chat Volume"
          icon={MessageSquare}
          color="emerald"
          data={dailyChats}
          total={totalChats}
          change={chatsChange}
          emptyMessage="No chat data yet"
        />
      </div>
    </div>
  );
});

export function PerformanceMetrics() {
  // In a real app, these would come from props or API
  const conversionRate = "--";
  const avgLeadScore = "--";
  const chatsPerLead = "--";

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <MetricsCard
        label="Conversion Rate"
        value={conversionRate}
        icon={TrendingUp}
        color="emerald"
        change={0}
      />
      <MetricsCard
        label="Avg Lead Score"
        value={avgLeadScore}
        icon={Users}
        color="blue"
      />
      <MetricsCard
        label="Chats per Lead"
        value={chatsPerLead}
        icon={MessageSquare}
        color="purple"
      />
    </div>
  );
}

export const DashboardCharts = memo(ChartsComponent);
DashboardCharts.displayName = "DashboardCharts";
