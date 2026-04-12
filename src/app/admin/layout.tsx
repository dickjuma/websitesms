"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { Menu, PanelTopOpen, ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { NotificationPanel } from "@/components/admin/notifications";

const AdminSidebar = dynamic(
  () => import("@/components/admin/sidebar").then((mod) => mod.AdminSidebar),
  {
    ssr: false,
    loading: () => (
      <aside className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white animate-pulse">
        <div className="flex h-16 items-center border-b border-slate-100 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200">
            <span className="text-sm font-bold text-transparent">S</span>
          </div>
          <div className="ml-2 h-5 w-16 rounded bg-slate-200" />
        </div>
      </aside>
    ),
  },
);

const NotificationToasts = dynamic(
  () =>
    import("@/components/admin/notification-toast").then(
      (mod) => mod.NotificationToasts,
    ),
  { ssr: false },
);

const NotificationStyles = dynamic(
  () =>
    import("@/components/admin/notification-toast").then(
      (mod) => mod.NotificationStyles,
    ),
  { ssr: false },
);

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

function subscribeToAdminIdentity(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getAdminEmailSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("adminEmail");
}

function getAdminEmailServerSnapshot() {
  return null;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const adminEmail =
    useSyncExternalStore(
      subscribeToAdminIdentity,
      getAdminEmailSnapshot,
      getAdminEmailServerSnapshot,
    ) || "admin@sma.com";

  const pageMeta = useMemo(() => {
    const pages = [
      {
        href: "/admin/chat",
        label: "Live chats",
        description:
          "Monitor conversations, step into active threads, and hand control back to AI when needed.",
      },
      {
        href: "/admin/leads",
        label: "Leads",
        description:
          "Review qualification, keep the pipeline clean, and move promising conversations forward quickly.",
      },
      {
        href: "/admin/contacts",
        label: "Contacts",
        description:
          "Track inbound requests and keep response follow-up organized.",
      },
      {
        href: "/admin/quotes",
        label: "Quotes",
        description:
          "Review quote requests and keep revenue follow-up visible to the team.",
      },
      {
        href: "/admin/book-demos",
        label: "Book demos",
        description:
          "See demo demand, scheduling requests, and who needs a callback.",
      },
      {
        href: "/admin/team",
        label: "Team",
        description:
          "Manage staff availability and who can respond to incoming work.",
      },
      {
        href: "/admin/users",
        label: "Visitors",
        description:
          "Understand who is on the site, what devices they use, and how they engage.",
      },
      {
        href: "/admin/analytics",
        label: "Analytics",
        description:
          "Measure traffic, conversations, and conversion performance from one view.",
      },
      {
        href: "/admin/settings",
        label: "Settings",
        description:
          "Update site contact details, AI behavior, and admin delivery preferences.",
      },
      {
        href: "/admin",
        label: "Dashboard",
        description: "See the health of your admin workspace at a glance.",
      },
    ] as const;

    return (
      pages.find((item) =>
        item.href === "/admin"
          ? pathname === item.href
          : pathname.startsWith(item.href),
      ) ?? pages[pages.length - 1]
    );
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <AdminAuthGuard>
      <div className="admin-frame min-h-screen bg-slate-50">
        <NotificationStyles />

        {mobileSidebarOpen ? (
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[1px] lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        ) : null}

        <Suspense
          fallback={
            <div className="fixed left-0 top-0 z-50 hidden h-screen w-72 border-r border-slate-200 bg-white lg:block" />
          }
        >
          <AdminSidebar
            mobileOpen={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
          />
        </Suspense>

        <div className="min-h-screen lg:pl-72">
          {/* Mobile Header */}
          <header className="sticky top-0 z-30 border-b border-white/70 bg-white/82 backdrop-blur-xl lg:hidden">
            <div className="mx-auto flex max-w-[1640px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div className="flex min-w-0 items-start gap-3">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:text-blue-700 lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-4 w-4" />
                </button>

                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <PanelTopOpen className="h-3.5 w-3.5" />
                    {pageMeta.label}
                  </div>
                  <p className="mt-3 text-lg font-semibold text-slate-950 sm:text-xl">
                    {pageMeta.label}
                  </p>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                    {pageMeta.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <NotificationPanel />

                <div className="inline-flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Signed in
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {adminEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white hidden lg:block">
            <div className="mx-auto max-w-[1640px] px-6 py-4 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <PanelTopOpen className="h-3.5 w-3.5" />
                    {pageMeta.label}
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    {pageMeta.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {pageMeta.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <NotificationPanel />
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Signed in</p>
                      <p className="truncate text-sm font-semibold text-slate-900">{adminEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-screen">
            <div className="mx-auto max-w-[1640px] px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>

        <NotificationToasts />
      </div>
    </AdminAuthGuard>
  );
}
