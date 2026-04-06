"use client";

import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useNotificationStore, type Notification, type NotificationType } from "@/lib/admin-notifications";

const iconMap: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const styleMap: Record<NotificationType, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  error: "bg-rose-50 border-rose-200 text-rose-800",
};

interface ToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

function Toast({ notification, onDismiss }: ToastProps) {
  const Icon = iconMap[notification.type];
  const style = styleMap[notification.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div
      className={`
        flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all
        ${style}
        animate-slide-in-right
      `}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{notification.title}</p>
        <p className="text-sm truncate">{notification.message}</p>
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="flex-shrink-0 rounded p-1 hover:bg-black/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ToastContainer() {
  const { notifications, removeNotification } = useNotificationStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Get the most recent notifications (last 3)
  const toasts = notifications.slice(0, 3);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onDismiss={removeNotification}
        />
      ))}
    </div>,
    document.body
  );
}

// Memoized for performance
export const NotificationToasts = memo(ToastContainer);
NotificationToasts.displayName = "NotificationToasts";

// Add CSS animation via style tag
export function NotificationStyles() {
  if (typeof document === "undefined") return null;
  
  const styleId = "notification-animations";
  if (document.getElementById(styleId)) return null;
  
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes slide-in-right {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .animate-slide-in-right {
      animation: slide-in-right 0.3s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
  
  return null;
}