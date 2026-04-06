"use client";

import { memo, useMemo } from "react";
import { BarChart3, MessageSquare } from "lucide-react";

interface ChartProps {
  dailyLeads: Array<{ date: string; count: number }>;
  dailyChats: Array<{ date: string; count: number }>;
}

function AnalyticsChartsComponent({ dailyLeads, dailyChats }: ChartProps) {
  const maxLeadCount = useMemo(
    () => Math.max(...dailyLeads.map((d) => d.count), 1),
    [dailyLeads]
  );

  const maxChatCount = useMemo(
    () => Math.max(...dailyChats.map((d) => d.count), 1),
    [dailyChats]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Leads Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Lead Trends</h3>
          <BarChart3 className="h-5 w-5 text-slate-400" />
        </div>
        <div className="mt-4 flex h-48 items-end justify-between gap-2">
          {dailyLeads.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-50 text-sm text-slate-500">
              No lead data yet
            </div>
          ) : (
            dailyLeads.map((item, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full max-w-[40px] rounded-t bg-blue-500 transition-all hover:bg-blue-600"
                  style={{
                    height: `${Math.max((item.count / maxLeadCount) * 160, 8)}px`,
                  }}
                  title={`${item.count} leads`}
                />
                <span className="text-xs text-slate-500">{item.date.slice(5)}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chats Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Chat Volume</h3>
          <MessageSquare className="h-5 w-5 text-slate-400" />
        </div>
        <div className="mt-4 flex h-48 items-end justify-between gap-2">
          {dailyChats.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-50 text-sm text-slate-500">
              No chat data yet
            </div>
          ) : (
            dailyChats.map((item, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full max-w-[40px] rounded-t bg-emerald-500 transition-all hover:bg-emerald-600"
                  style={{
                    height: `${Math.max((item.count / maxChatCount) * 160, 8)}px`,
                  }}
                  title={`${item.count} chats`}
                />
                <span className="text-xs text-slate-500">{item.date.slice(5)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export const AnalyticsCharts = memo(AnalyticsChartsComponent);
AnalyticsCharts.displayName = "AnalyticsCharts";