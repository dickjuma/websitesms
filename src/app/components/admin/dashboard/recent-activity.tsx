"use client";

import { memo, useState, useMemo } from "react";
import { MessageSquare, Users, Mail, Zap, Clock, Filter, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  type: "lead" | "chat" | "contact" | "system";
  leadId?: string;
  isHumanActive?: boolean;
}

interface ActivityProps {
  activity: ActivityItem[];
  onRefresh?: () => void;
  isLoading?: boolean;
  onTakeOver?: (leadId: string) => void;
}

const ITEMS_PER_PAGE = 5;

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en", { month: "short", day: "numeric" });
}

function getActivityIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "lead":
      return { icon: Users, color: "bg-blue-100 text-blue-700" };
    case "chat":
      return { icon: MessageSquare, color: "bg-emerald-100 text-emerald-700" };
    case "contact":
      return { icon: Mail, color: "bg-purple-100 text-purple-700" };
    case "system":
    default:
      return { icon: Zap, color: "bg-amber-100 text-amber-700" };
  }
}

function groupByDate(items: ActivityItem[]): Record<string, ActivityItem[]> {
  const groups: Record<string, ActivityItem[]> = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  items.forEach((item) => {
    const itemDate = new Date(item.timestamp);
    itemDate.setHours(0, 0, 0, 0);
    let key = "Older";
    if (itemDate.getTime() === today.getTime()) key = "Today";
    else if (itemDate.getTime() === yesterday.getTime()) key = "Yesterday";
    else if (itemDate > weekAgo) key = "This Week";
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
}

function ActivityItemComponent({ item, onTakeOver }: { item: ActivityItem; onTakeOver?: (leadId: string) => void }) {
  const { icon: Icon, color } = getActivityIcon(item.type);
  const canTakeOver = item.type === "lead" && item.leadId && !item.isHumanActive && onTakeOver;

  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3 transition hover:border-slate-200 hover:shadow-sm">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{item.action}</p>
        <p className="mt-0.5 truncate text-xs text-slate-600">{item.detail}</p>
        <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {formatTime(item.timestamp)}
        </p>
      </div>
      {canTakeOver && (
        <button
          onClick={() => onTakeOver(item.leadId!)}
          className="shrink-0 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Take Over
        </button>
      )}
    </div>
  );
}

function RecentActivityComponent({ activity, onRefresh, isLoading = false, onTakeOver }: ActivityProps) {
  const [filter, setFilter] = useState<ActivityItem["type"] | "all">("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredActivity = useMemo(() => {
    if (filter === "all") return activity;
    return activity.filter((item) => item.type === filter);
  }, [activity, filter]);

  const grouped = useMemo(() => groupByDate(filteredActivity), [filteredActivity]);
  const hasMore = filteredActivity.length > visibleCount;
  const displayedActivity = filteredActivity.slice(0, visibleCount);
  const displayedGrouped = useMemo(() => groupByDate(displayedActivity), [displayedActivity]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleRefresh = () => {
    setVisibleCount(ITEMS_PER_PAGE);
    if (onRefresh) onRefresh();
  };

  const filterButtons: { value: typeof filter; label: string; icon?: React.ElementType }[] = [
    { value: "all", label: "All" },
    { value: "lead", label: "Leads", icon: Users },
    { value: "chat", label: "Chats", icon: MessageSquare },
    { value: "contact", label: "Contacts", icon: Mail },
    { value: "system", label: "System", icon: Zap },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            aria-label="Refresh activity"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} aria-hidden="true" />
          </button>
          <div className="relative inline-block text-left">
            <div className="flex gap-1 overflow-x-auto pb-1">
              {filterButtons.map((btn) => {
                const Icon = btn.icon;
                const isActive = filter === btn.value;
                return (
                  <button
                    key={btn.value}
                    onClick={() => {
                      setFilter(btn.value);
                      setVisibleCount(ITEMS_PER_PAGE);
                    }}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                    aria-pressed={isActive}
                  >
                    {Icon && <Icon className="h-3 w-3" aria-hidden="true" />}
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Activity list */}
      <div className="p-4">
        {isLoading && activity.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          </div>
        ) : filteredActivity.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
            <Zap className="mx-auto mb-2 h-6 w-6 text-slate-300" aria-hidden="true" />
            <p className="text-sm text-slate-500">No activity matches your filter.</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-2 text-xs text-blue-600 hover:underline"
            >
              Show all activity
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(displayedGrouped).map(([group, items]) => (
              <div key={group}>
                <div className="sticky top-0 -mt-1 mb-2 bg-white pb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {group}
                  </span>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <ActivityItemComponent key={item.id} item={item} onTakeOver={onTakeOver} />
                  ))}
                </div>
              </div>
            ))}
            {hasMore && (
              <div className="pt-2 text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Load more
                  <ChevronDown className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            )}
            {visibleCount > ITEMS_PER_PAGE && !hasMore && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => setVisibleCount(ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Show less
                  <ChevronUp className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export const RecentActivity = memo(RecentActivityComponent);
RecentActivity.displayName = "RecentActivity";
