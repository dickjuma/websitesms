"use client";

import { memo, useMemo } from "react";
import { Globe, Monitor, Smartphone, Tablet } from "lucide-react";

interface Visitor {
  id: string;
  visitorId: string;
  ipAddress: string | null;
  deviceType: "desktop" | "tablet" | "mobile";
  timezone: string | null;
  visitCount: number;
  lastSeenAt: string;
  pagesVisited: Array<{ path: string; title: string; visitedAt: string }>;
}

interface VisitorsTableProps {
  visitors: Visitor[];
  loading: boolean;
}

const dateTimeFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function getDeviceIcon(deviceType: string) {
  switch (deviceType) {
    case "mobile":
      return Smartphone;
    case "tablet":
      return Tablet;
    default:
      return Monitor;
  }
}

function VisitorsTableComponent({ visitors, loading }: VisitorsTableProps) {
  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading visitors...</div>;
  }

  if (visitors.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        No visitors found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Visitor ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Device</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Location</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Visits</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Last Seen</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {visitors.map((visitor) => {
            const DeviceIcon = getDeviceIcon(visitor.deviceType);
            return (
              <tr key={visitor.id} className="hover:bg-slate-50">
                <td className="px-4 py-4">
                  <p className="font-mono text-sm text-slate-900">
                    {visitor.visitorId.slice(0, 12)}...
                  </p>
                  {visitor.ipAddress && (
                    <p className="text-xs text-slate-500">{visitor.ipAddress}</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <DeviceIcon className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600 capitalize">
                      {visitor.deviceType}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Globe className="h-4 w-4 text-slate-400" />
                    {visitor.timezone || "Unknown"}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-slate-900">
                    {visitor.visitCount}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-slate-500">
                  {dateTimeFormatter.format(new Date(visitor.lastSeenAt))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const VisitorsTable = memo(VisitorsTableComponent);
VisitorsTable.displayName = "VisitorsTable";
