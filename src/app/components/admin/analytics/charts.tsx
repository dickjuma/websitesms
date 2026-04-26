"use client";

import { memo, useMemo, useState } from "react";
import { BarChart3, MessageSquare, TrendingUp } from "lucide-react";

interface ChartProps {
  dailyLeads: Array<{ date: string; count: number }>;
  dailyChats: Array<{ date: string; count: number }>;
}

function AnalyticsChartsComponent({ dailyLeads, dailyChats }: ChartProps) {
  const [hoveredLead, setHoveredLead] = useState<number | null>(null);
  const [hoveredChat, setHoveredChat] = useState<number | null>(null);

  const maxLeadCount = useMemo(
    () => Math.max(...dailyLeads.map((d) => d.count), 1),
    [dailyLeads]
  );

  const maxChatCount = useMemo(
    () => Math.max(...dailyChats.map((d) => d.count), 1),
    [dailyChats]
  );

  const totalLeads = useMemo(() => dailyLeads.reduce((sum, d) => sum + d.count, 0), [dailyLeads]);
  const totalChats = useMemo(() => dailyChats.reduce((sum, d) => sum + d.count, 0), [dailyChats]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Leads Chart */}
      <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Lead Trends</h3>
              <p className="text-xs text-slate-500">{totalLeads} total leads</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            <span>+12%</span>
          </div>
        </div>
        
        <div className="relative h-52 flex items-end justify-between gap-3 px-2">
          {dailyLeads.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-50">
              <div className="text-center">
                <BarChart3 className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                <p className="text-sm text-slate-500">No lead data yet</p>
                <p className="text-xs text-slate-400">Leads will appear here</p>
              </div>
            </div>
          ) : (
            dailyLeads.map((item, i) => (
              <div 
                key={i} 
                className="flex flex-1 flex-col items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHoveredLead(i)}
                onMouseLeave={() => setHoveredLead(null)}
              >
                <div className="relative w-full flex-1 flex items-end justify-center">
                  <div
                    className={`w-full max-w-[36px] rounded-t-xl transition-all duration-300 ${
                      hoveredLead === i 
                        ? "bg-blue-600 shadow-lg shadow-blue-200 scale-105" 
                        : "bg-gradient-to-t from-blue-600 to-blue-500 hover:to-blue-600"
                    }`}
                    style={{
                      height: `${Math.max((item.count / maxLeadCount) * 180, 8)}px`,
                    }}
                  >
                    {hoveredLead === i && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10">
                        {item.count} leads
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {item.date.slice(5)}
                </span>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Daily breakdown</span>
          <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
            <span>Avg: {dailyLeads.length > 0 ? Math.round(totalLeads / dailyLeads.length) : 0}</span>
            <span>/day</span>
          </div>
        </div>
      </div>

      {/* Chats Chart */}
      <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Chat Volume</h3>
              <p className="text-xs text-slate-500">{totalChats} total chats</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            <span>+24%</span>
          </div>
        </div>
        
        <div className="relative h-52 flex items-end justify-between gap-3 px-2">
          {dailyChats.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-50">
              <div className="text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                <p className="text-sm text-slate-500">No chat data yet</p>
                <p className="text-xs text-slate-400">Chats will appear here</p>
              </div>
            </div>
          ) : (
            dailyChats.map((item, i) => (
              <div 
                key={i} 
                className="flex flex-1 flex-col items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHoveredChat(i)}
                onMouseLeave={() => setHoveredChat(null)}
              >
                <div className="relative w-full flex-1 flex items-end justify-center">
                  <div
                    className={`w-full max-w-[36px] rounded-t-xl transition-all duration-300 ${
                      hoveredChat === i 
                        ? "bg-emerald-600 shadow-lg shadow-emerald-200 scale-105" 
                        : "bg-gradient-to-t from-emerald-600 to-emerald-500 hover:to-emerald-600"
                    }`}
                    style={{
                      height: `${Math.max((item.count / maxChatCount) * 180, 8)}px`,
                    }}
                  >
                    {hoveredChat === i && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10">
                        {item.count} chats
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {item.date.slice(5)}
                </span>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Daily breakdown</span>
          <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
            <span>Avg: {dailyChats.length > 0 ? Math.round(totalChats / dailyChats.length) : 0}</span>
            <span>/day</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AnalyticsCharts = memo(AnalyticsChartsComponent);
AnalyticsCharts.displayName = "AnalyticsCharts";
