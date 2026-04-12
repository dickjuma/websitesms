"use client";

import type { MessageSender } from "@/lib/chat/types";

export interface ChatMessage {
  id?: string;
  sessionId: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  clientMessageId?: string;
}

export interface ChatSession {
  sessionId: string;
  createdAt: string;
  assignedToHuman: boolean;
  status: "active" | "closed";
  visitorId?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

function firebaseUnavailable(): Error {
  return new Error("Firebase chat support is not enabled in this build.");
}

export function generateSessionId(): string {
  const stored = typeof window !== "undefined" ? localStorage.getItem("sma-session-id") : null;
  if (stored) return stored;

  const newId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  if (typeof window !== "undefined") {
    localStorage.setItem("sma-session-id", newId);
  }
  return newId;
}

export function subscribeToMessages(
  _sessionId: string,
  onMessages: (messages: ChatMessage[]) => void,
  onError?: (error: Error) => void,
): () => void {
  onMessages([]);
  onError?.(firebaseUnavailable());
  return () => {};
}

export function subscribeToSession(
  _sessionId: string,
  onSession: (session: ChatSession | null) => void,
  onError?: (error: Error) => void,
): () => void {
  onSession(null);
  onError?.(firebaseUnavailable());
  return () => {};
}

export function subscribeToAllSessions(
  onSessions: (sessions: ChatSession[]) => void,
  onError?: (error: Error) => void,
): () => void {
  onSessions([]);
  onError?.(firebaseUnavailable());
  return () => {};
}

export async function sendMessage(
  _sessionId: string,
  _text: string,
  _sender: MessageSender,
  clientMessageId?: string,
): Promise<string> {
  throw firebaseUnavailable();
}

export async function createSession(_sessionId: string, _visitorId?: string): Promise<void> {
  throw firebaseUnavailable();
}

export async function assignToHuman(_sessionId: string): Promise<void> {
  throw firebaseUnavailable();
}

export async function releaseToAI(_sessionId: string): Promise<void> {
  throw firebaseUnavailable();
}

export async function closeSession(_sessionId: string): Promise<void> {
  throw firebaseUnavailable();
}

export async function markSessionRead(_sessionId: string): Promise<void> {
  throw firebaseUnavailable();
}
