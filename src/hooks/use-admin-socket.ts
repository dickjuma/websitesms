"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface ChatMessage {
  id: string;
  leadId: string;
  sessionId: string;
  sender: "user" | "bot" | "agent";
  message: string;
  timestamp: string;
  clientMessageId?: string;
}

interface LiveLead {
  visitorId: string;
  name: string;
  unreadCount: number;
  joinedAt: string;
  socketId: string;
  status: "new" | "contacted" | "closed";
  isHumanActive: boolean;
  email?: string;
  leadId: string;
  lastMessage?: string;
  lastMessageAt?: string;
}

interface UseAdminSocketReturn {
  isConnected: boolean;
  activeLeads: LiveLead[];
  selectedLead: LiveLead | null;
  messages: ChatMessage[];
  typingUsers: Map<string, boolean>;
  selectLead: (leadId: string) => void;
  sendMessage: (message: string) => Promise<void>;
  takeOver: (adminName?: string) => Promise<void>;
  releaseToAi: () => Promise<void>;
}

export function useAdminSocket(adminId: string, adminName: string): UseAdminSocketReturn {
  const [isConnected] = useState(false);
  const [activeLeads, setActiveLeads] = useState<LiveLead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, boolean>>(new Map());
  const selectedLeadIdRef = useRef<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectedLead = activeLeads.find(l => l.leadId === selectedLeadId) || null;

  useEffect(() => {
    selectedLeadIdRef.current = selectedLeadId;
  }, [selectedLeadId]);

  // Poll for leads
  const pollLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads?view=chat&limit=50", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      
      if (data.leads) {
        setActiveLeads(data.leads.map((l: any) => ({
          ...l,
          visitorId: l.visitorId || l.leadId,
          leadId: l.id || l.leadId,
        })));
      }
    } catch (err) {
      console.error("Failed to poll leads:", err);
    }
  }, []);

  // Poll for messages
  const pollMessages = useCallback(async () => {
    if (!selectedLeadIdRef.current) return;
    
    try {
      const res = await fetch(`/api/admin/chat/${selectedLeadIdRef.current}?limit=40`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      
      if (data.messages) {
        setMessages(data.messages.map((m: any) => ({
          id: m.id || m._id,
          leadId: m.leadId,
          sessionId: m.sessionId,
          sender: m.sender,
          message: m.message || m.text,
          timestamp: m.timestamp,
          clientMessageId: m.clientMessageId,
        })));
      }
    } catch (err) {
      console.error("Failed to poll messages:", err);
    }
  }, []);

  // Start polling on mount
  useEffect(() => {
    if (!adminId) return;

    pollLeads();
    pollIntervalRef.current = setInterval(() => {
      pollLeads();
      if (selectedLeadIdRef.current) {
        pollMessages();
      }
    }, 5000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [adminId, pollLeads, pollMessages]);

  const selectLead = useCallback((leadId: string) => {
    setSelectedLeadId(leadId);
    setMessages([]);
    setActiveLeads(prev => prev.map(l =>
      l.leadId === leadId ? { ...l, unreadCount: 0 } : l
    ));
    // Fetch messages immediately
    fetch(`/api/admin/chat/${leadId}?limit=40`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      cache: "no-store",
    })
      .then(res => res.json())
      .then(data => {
        if (data.messages) {
          setMessages(data.messages.map((m: any) => ({
            id: m.id || m._id,
            leadId: m.leadId,
            sessionId: m.sessionId,
            sender: m.sender,
            message: m.message || m.text,
            timestamp: m.timestamp,
          })));
        }
      });
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!selectedLeadId || !message.trim()) return;
    
    const tempMessage: ChatMessage = {
      id: `pending-${Date.now()}`,
      leadId: selectedLeadId,
      sessionId: selectedLeadId,
      sender: "agent",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, tempMessage]);

    try {
      const res = await fetch(`/api/admin/chat/${selectedLeadId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ message: message.trim() }),
      });
      
      if (res.ok) {
        pollMessages();
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  }, [selectedLeadId, pollMessages]);

  const takeOver = useCallback(async (adminName?: string) => {
    if (!selectedLeadId) return;
    
    try {
      const res = await fetch(`/api/admin/chat/${selectedLeadId}/takeover`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ adminId, adminName }),
      });
      
      if (res.ok) {
        setActiveLeads(prev => prev.map(lead =>
          lead.leadId === selectedLeadId
            ? { ...lead, isHumanActive: true }
            : lead
        ));
      }
    } catch (err) {
      console.error("Failed to take over:", err);
    }
  }, [selectedLeadId, adminId]);

  const releaseToAi = useCallback(async () => {
    if (!selectedLeadId) return;
    
    try {
      const res = await fetch(`/api/admin/chat/${selectedLeadId}/release`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      
      if (res.ok) {
        setActiveLeads(prev => prev.map(lead =>
          lead.leadId === selectedLeadId
            ? { ...lead, isHumanActive: false }
            : lead
        ));
      }
    } catch (err) {
      console.error("Failed to release to AI:", err);
    }
  }, [selectedLeadId]);

  return {
    isConnected,
    activeLeads,
    selectedLead,
    messages,
    typingUsers,
    selectLead,
    sendMessage,
    takeOver,
    releaseToAi,
  };
}