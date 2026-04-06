"use client";

import { io, type Socket } from "socket.io-client";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/lib/socket/events";
import { SOCKET_PATH } from "@/lib/socket/events";

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: TypedSocket | null = null;
let bootstrapPromise: Promise<void> | null = null;

async function ensureSocketBootstrap() {
  if (!bootstrapPromise) {
    bootstrapPromise = fetch("/api/socket", {
      method: "GET",
      cache: "no-store",
    }).then(() => undefined);
  }

  await bootstrapPromise;
}

export async function getSocketClient(): Promise<TypedSocket> {
  await ensureSocketBootstrap();

  if (!socket) {
    socket = io({
      path: SOCKET_PATH,
      addTrailingSlash: false,
      transports: ["websocket"],
      rememberUpgrade: true,
    });
  }

  return socket;
}

export function disconnectSocketClient() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
