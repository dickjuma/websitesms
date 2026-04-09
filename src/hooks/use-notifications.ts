"use client";

import { useEffect, useCallback, useRef, useState } from "react";

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  requireInteraction?: boolean;
}

type NotificationPermission = "granted" | "denied" | "default";

interface UseNotificationsReturn {
  permission: NotificationPermission;
  isSupported: boolean;
  requestPermission: () => Promise<boolean>;
  showNotification: (options: NotificationOptions) => void;
  unreadCount: number;
  clearUnread: () => void;
}

export function useNotifications(): UseNotificationsReturn {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSupported, setIsSupported] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const supported = typeof window !== "undefined" && "Notification" in window;
    setIsSupported(supported);
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/notification.mp3");
      audio.preload = "auto";
      audioRef.current = audio;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === "granted";
    } catch {
      return false;
    }
  }, [isSupported]);

  const showNotification = useCallback((options: NotificationOptions) => {
    if (!isSupported || permission !== "granted") return;

    try {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || "/favicon.ico",
        tag: options.tag,
        requireInteraction: options.requireInteraction,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      audioRef.current?.play().catch(() => {});

      setUnreadCount(prev => prev + 1);

      setTimeout(() => notification.close(), 5000);
    } catch (err) {
      console.error("Failed to show notification:", err);
    }
  }, [isSupported, permission]);

  const clearUnread = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification,
    unreadCount,
    clearUnread,
  };
}

export function useRealtimeNotifications(
  onNewMessage: (message: string, sender: string) => void,
  enabled: boolean = true
) {
  const { showNotification, isSupported, permission } = useNotifications();
  const hasEnabledRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasEnabledRef.current) return;
    hasEnabledRef.current = true;

    if (isSupported && permission === "default") {
      Notification.requestPermission();
    }
  }, [enabled, isSupported, permission]);

  const notify = useCallback((message: string, sender: string) => {
    if (!enabled) return;
    
    onNewMessage(message, sender);
    
    if (isSupported && permission === "granted" && document.hidden) {
      showNotification({
        title: sender === "user" ? "New Message" : "New Reply",
        body: message.slice(0, 100),
        tag: "chat-notification",
      });
    }
  }, [enabled, isSupported, permission, onNewMessage, showNotification]);

  return { notify };
}