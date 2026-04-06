"use client";

import { memo } from "react";
import { MessageSquare, Users, Mail, Zap, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  type: "lead" | "chat" | "contact" | "system";
}

interface ActivityProps {
  activity: ActivityItem[];
}

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
      return { icon: Users, color: "bg-blue-100 text-blue-600" };
    case "chat":
      return { icon: MessageSquare, color: "bg-emerald-100 text-emerald-600" };
    case "contact":
      return { icon: Mail, color: "bg-purple-100 text-purple-600" };
    case "system":
    default:
      return { icon: Zap, color: "bg-amber-100 text-amber-600" };
  }
}

function ActivityItemComponent({ item }: { item: ActivityItem }) {
  const { icon: Icon, color } = getActivityIcon(item.type);
  
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:bg-white">
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-900">{item.action}</p>
        <p className="mt-1 truncate text-sm text-slate-600">{item.detail}</p>
        <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
          <Clock className="h-3 w-3" />
          {formatTime(item.timestamp)}
        </p>
      </div>
    </div>
  );
}

function RecentActivityComponent({ activity }: ActivityProps) {
  if (activity.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="font-semibold text-slate-900">Recent Activity</h3>
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          Activity will appear here once leads start engaging.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="font-semibold text-slate-900">Recent Activity</h3>
      <div className="mt-4 space-y-3">
        {activity.map((item) => (
          <ActivityItemComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export const RecentActivity = memo(RecentActivityComponent);
RecentActivity.displayName = "RecentActivity";