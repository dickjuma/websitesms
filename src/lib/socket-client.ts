"use client";

import { io, type Socket } from "socket.io-client";

const SOCKET_PATH = "/api/socket/io";

export interface Message {
  id: string;
  userId: string;
  sessionId: string;
  sender: "user" | "admin" | "bot";
  senderName?: string;
  message: string;
  status: "sent" | "delivered" | "seen";
  clientMessageId?: string;
  timestamp: string;
}

export interface User {
  userId: string;
  name: string;
  sessionId: string;
  joinedAt: string;
  isOnline: boolean;
  unreadCount: number;
  lastMessage?: string;
  lastMessageAt?: string;
  metadata?: Record<string, unknown>;
}

export interface Admin {
  socketId: string;
  name: string;
  connectedAt: string;
}

const SOCKET_OPTIONS = {
  path: SOCKET_PATH,
  addTrailingSlash: false,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
};

function getSocketUrl() {
  if (typeof window === "undefined") return undefined;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  return appUrl && appUrl !== "http://localhost:3000" ? appUrl : undefined;
}

let socket: Socket | null = null;
let connectPromise: Promise<Socket> | null = null;

export async function getSocketClient(): Promise<Socket> {
  if (socket?.connected) {
    return socket;
  }

  if (!connectPromise) {
    connectPromise = new Promise((resolve, reject) => {
      const newSocket = io(getSocketUrl(), SOCKET_OPTIONS);

      newSocket.on("connect", () => {
        socket = newSocket;
        resolve(newSocket);
      });

      newSocket.on("connect_error", (error) => {
        reject(error);
        connectPromise = null;
      });

      newSocket.on("disconnect", () => {
        socket = null;
        connectPromise = null;
      });
    });
  }

  return connectPromise;
}

export function disconnectSocketClient(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
    connectPromise = null;
  }
}

export async function joinAsUser(params: {
  userId: string;
  sessionId?: string;
  userName?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const socket = await getSocketClient();
  socket.emit("join", params);
}

export async function joinAsAdmin(params: {
  adminId: string;
  adminName: string;
}): Promise<void> {
  const socket = await getSocketClient();
  socket.emit("join_admin", params);
}

export async function sendChatMessage(params: {
  userId: string;
  sessionId?: string;
  sender: "user" | "admin" | "bot";
  senderName?: string;
  message: string;
  clientMessageId?: string;
}): Promise<void> {
  const socket = await getSocketClient();
  socket.emit("send_message", params);
}

export async function sendTyping(params: {
  userId: string;
  sender: "user" | "admin";
  isTyping: boolean;
}): Promise<void> {
  const socket = await getSocketClient();
  socket.emit("typing", params);
}

export async function markDelivered(params: {
  userId: string;
  messageIds: string[];
}): Promise<void> {
  const socket = await getSocketClient();
  socket.emit("mark_delivered", params);
}

export async function markSeen(params: {
  userId: string;
  messageIds: string[];
}): Promise<void> {
  const socket = await getSocketClient();
  socket.emit("mark_seen", params);
}

export async function takeOverChat(params: {
  userId: string;
  adminId?: string;
  adminName?: string;
}): Promise<void> {
  const socket = await getSocketClient();
  socket.emit("takeover", params);
}

export async function returnToAI(userId: string): Promise<void> {
  const socket = await getSocketClient();
  socket.emit("return_to_ai", { userId });
}

export default {
  getSocketClient,
  disconnectSocketClient,
  joinAsUser,
  joinAsAdmin,
  sendChatMessage,
  sendTyping,
  markDelivered,
  markSeen,
  takeOverChat,
  returnToAI,
};