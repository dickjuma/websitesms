"use client";

import { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Contact,
  Headphones,
  UserSearch,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { NotificationPanel } from "@/components/admin/notifications";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Live Chats", href: "/admin/chat", icon: MessageSquare, highlight: true },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Contacts", href: "/admin/contacts", icon: Contact },
  { label: "Team", href: "/admin/team", icon: Headphones },
  { label: "Users", href: "/admin/users", icon: UserSearch },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

function SidebarComponent({ className }: SidebarProps) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const isActive = useCallback(
    (href: string) => {
      if (href === "/admin") return pathname === "/admin";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const handleSignOut = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminName");
    }
    router.push("/admin/login");
  }, [router]);

  const navElements = useMemo(
    () =>
      navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
              ${
                active
                  ? item.highlight
                    ? "bg-blue-50 text-blue-700"
                    : "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }
            `}
          >
            <Icon
              className={`h-5 w-5 flex-shrink-0 ${
                active && item.highlight ? "text-blue-600" : ""
              }`}
            />
            <span className="truncate">{item.label}</span>
            {item.highlight && !active && (
              <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                Live
              </span>
            )}
          </Link>
        );
      }),
    [isActive]
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 bg-white ${className || ""}`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">SMA</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">{navElements}</ul>
        </nav>

        {/* Notifications */}
        <div className="border-t border-slate-100 px-3 py-2">
          <NotificationPanel />
        </div>

        {/* Sign Out */}
        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

// Memoize to prevent unnecessary re-renders
export const AdminSidebar = memo(SidebarComponent);
AdminSidebar.displayName = "AdminSidebar";