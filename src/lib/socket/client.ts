"use client";

import { io, type Socket } from "socket.io-client";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
  ActiveUser,
} from "@/lib/socket/events";
import { SOCKET_PATH } from "@/lib/socket/events";

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: TypedSocket | null = null;
let bootstrapPromise: Promise<void> | null = null;

function getSocketUrl() {
  if (typeof window === "undefined") return undefined;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  return appUrl && appUrl !== "http://localhost:3000" ? appUrl : undefined;
}

function resolveSocketAuth() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    adminToken: window.localStorage.getItem("adminToken") || "",
  };
}

function getAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem("adminToken") || "";
}

const SOCKET_OPTIONS = {
  path: SOCKET_PATH,
  addTrailingSlash: false,
  transports: ["websocket", "polling"],
  rememberUpgrade: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  timeout: 20000,
  pingTimeout: 60000,
  pingInterval: 25000,
};

async function ensureSocketBootstrap() {
  if (!bootstrapPromise) {
    bootstrapPromise = fetch("/api/socket", {
      method: "GET",
      cache: "no-store",
    }).then(() => undefined).catch(() => undefined);
  }

  await bootstrapPromise;
}

export async function getSocketClient(): Promise<TypedSocket> {
  await ensureSocketBootstrap();

  if (!socket) {
    const socketUrl = getSocketUrl();
    socket = io(socketUrl, SOCKET_OPTIONS);
    socket.auth = resolveSocketAuth();

    socket.on("connect", () => {
      console.log("[Socket] Connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("[Socket] Connection error:", error.message);
    });

    socket.on("reconnect" as any, (attemptNumber: number) => {
      console.log("[Socket] Reconnected after", attemptNumber, "attempts");
    });

    socket.on("reconnect_failed" as any, () => {
      console.error("[Socket] Failed to reconnect after all attempts");
    });
  }

  socket.auth = resolveSocketAuth();

  if (!socket.connected && !socket.active) {
    socket.connect();
  }

  return socket;
}

export async function joinAsUser(params: {
  leadId: string;
  visitorId?: string;
  leadName?: string;
  sessionId?: string;
}) {
  const socket = await getSocketClient();
  socket.emit("join", params);
}

export async function joinAsAdmin(params: {
  adminId: string;
  adminName: string;
}) {
  const socket = await getSocketClient();
  socket.emit("join_admin", {
    ...params,
    adminToken: getAdminToken(),
  });
}

export async function sendChatMessage(params: {
  leadId: string;
  sessionId?: string;
  sender: "user" | "bot" | "agent";
  message: string;
  clientMessageId?: string;
}) {
  const socket = await getSocketClient();
  socket.emit("send_message", { ...params, sessionId: params.sessionId || "" });
}

export async function sendTyping(params: {
  leadId: string;
  sender: "user" | "agent" | "bot";
  isTyping: boolean;
}) {
  const socket = await getSocketClient();
  socket.emit("typing", params);
}

export async function takeOverChat(params: {
  leadId: string;
  adminId?: string;
  adminName?: string;
}) {
  const socket = await getSocketClient();
  socket.emit("takeover", params);
}

export async function returnToAi(leadId: string) {
  const socket = await getSocketClient();
  socket.emit("return_to_ai", { leadId });
}

export async function markAsRead(leadId: string) {
  const socket = await getSocketClient();
  socket.emit("mark_read", { leadId });
}

export function disconnectSocketClient() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export type { ActiveUser };
