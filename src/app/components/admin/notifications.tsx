"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BellOff,
  Check,
  X,
  MessageSquare,
  Users,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { useNotificationStore, type Notification, type NotificationType } from "@/lib/admin-notifications";

const notificationIcons: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
};

const notificationStyles: Record<NotificationType, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  error: "bg-rose-50 border-rose-200 text-rose-800",
};

interface NotificationItemProps {
  notification: Notification;
  onDismiss: () => void;
  onAction: () => void;
}

function NotificationItem({ notification, onDismiss, onAction }: NotificationItemProps) {
  const Icon = notificationIcons[notification.type];
  
  return (
    <div
      className={`
        relative flex items-start gap-3 rounded-lg border p-3 transition-all
        ${notificationStyles[notification.type]}
        ${!notification.read ? "bg-opacity-100" : "bg-opacity-50"}
        hover:shadow-md
      `}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{notification.title}</p>
        <p className="text-sm truncate">{notification.message}</p>
        {notification.action && (
          <button
            onClick={onAction}
            className="mt-2 text-xs font-medium underline hover:no-underline"
          >
            {notification.action.label}
          </button>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 rounded p-1 hover:bg-black/10"
      >
        <X className="h-4 w-4" />
      </button>
      {!notification.read && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
      )}
    </div>
  );
}

function NotificationDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  
  const {
    notifications,
    unreadCount,
    soundEnabled,
    markAsRead,
    markAllAsRead,
    removeNotification,
    setSoundEnabled,
  } = useNotificationStore();

  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.action?.href) {
      router.push(notification.action.href);
    }
    setIsOpen(false);
  };

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition
          ${isOpen ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
        `}
      >
        {unreadCount > 0 ? (
          <>
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        ) : (
          <Bell className="h-5 w-5" />
        )}
        <span className="hidden lg:inline">Notifications</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 p-3">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="rounded p-1 text-slate-500 hover:bg-slate-100"
                title={soundEnabled ? "Mute notifications" : "Enable notifications"}
              >
                {soundEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100"
                  title="Mark all as read"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">
                No notifications yet
              </div>
            ) : (
              <div className="space-y-2 p-3">
                {notifications.slice(0, 10).map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onDismiss={() => removeNotification(notification.id)}
                    onAction={() => handleAction(notification)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationBell() {
  const { unreadCount } = useNotificationStore();
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    if (unreadCount > 0) {
      setShowDot(true);
      const timer = setTimeout(() => setShowDot(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  return (
    <div className="relative">
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && showDot && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
          {unreadCount}
        </span>
      )}
    </div>
  );
}

// Memoized dropdown for performance
export const NotificationPanel = memo(NotificationDropdown);
NotificationPanel.displayName = "NotificationPanel";