"use client";

import { memo, useCallback, type ComponentType } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Contact,
  FileText,
  Calendar,
  Headphones,
  BarChart3,
  Settings,
  LogOut,
  UserSearch,
} from "lucide-react";
import clsx from "clsx";

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Live Chats", href: "/admin/chat", icon: MessageSquare },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Contacts", href: "/admin/contacts", icon: Contact },
  { label: "Quotes", href: "/admin/quotes", icon: FileText },
  { label: "Book Demos", href: "/admin/book-demos", icon: Calendar },
  { label: "Team", href: "/admin/team", icon: Headphones },
  { label: "Users", href: "/admin/users", icon: UserSearch },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
  mobileOpen?: boolean;
  onClose?: () => void;
}

function SidebarComponent({ className, mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const isActive = useCallback((href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }, [pathname]);

  const handleSignOut = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminName");
    }
    router.push("/admin/login");
  }, [router]);

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b border-slate-100 px-4 py-4">
          <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <span className="text-sm font-bold">S</span>
            </div>
            <div>
              <span className="block text-base font-semibold text-slate-900">SMA</span>
              <span className="block text-xs text-slate-400">Admin</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={clsx("h-5 w-5", active ? "text-blue-600" : "text-slate-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sign Out */}
        <div className="border-t border-slate-100 p-3">
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

export const AdminSidebar = memo(SidebarComponent);
AdminSidebar.displayName = "AdminSidebar";
