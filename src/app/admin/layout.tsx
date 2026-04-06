"use client";

import { Suspense, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamic import for sidebar to prevent initial bundle bloat
const AdminSidebar = dynamic(
  () => import("@/components/admin/sidebar").then((mod) => mod.AdminSidebar),
  { 
    ssr: false,
    loading: () => (
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 bg-white animate-pulse">
        <div className="flex h-16 items-center border-b border-slate-100 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200">
            <span className="text-sm font-bold text-transparent">S</span>
          </div>
          <div className="ml-2 h-5 w-16 rounded bg-slate-200" />
        </div>
      </aside>
    )
  }
);

// Notification toasts - for real-time alerts
const NotificationToasts = dynamic(
  () => import("@/components/admin/notification-toast").then((mod) => mod.NotificationToasts),
  { ssr: false }
);

// Notification styles
const NotificationStyles = dynamic(
  () => import("@/components/admin/notification-toast").then((mod) => mod.NotificationStyles),
  { ssr: false }
);

// Auth guard component
function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token && typeof window !== "undefined") {
      router.push("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}

// Server-side store subscription for auth
function subscribeToAdminIdentity(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getAdminEmailSnapshot() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("adminEmail");
}

function getAdminEmailServerSnapshot() {
  return null;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";

  // Subscribe to localStorage changes for auth state
  const adminEmail = useSyncExternalStore(
    subscribeToAdminIdentity,
    getAdminEmailSnapshot,
    getAdminEmailServerSnapshot,
  ) || "admin@sma.com";

  // Skip layout for login page
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-slate-50">
        {children}
      </div>
    );
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-slate-50">
        <NotificationStyles />
        
        <Suspense fallback={<div className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 bg-white" />}>
          <AdminSidebar />
        </Suspense>
        
        <main className="ml-64 min-h-screen">
          <div className="p-6">
            {children}
          </div>
        </main>
        
        {/* Global notification toasts */}
        <NotificationToasts />
      </div>
    </AdminAuthGuard>
  );
}