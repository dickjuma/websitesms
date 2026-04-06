const USER_ID_KEY = "sma_user_id";
const LEGACY_VISITOR_ID_KEY = "sma_visitor_id";
const VISITOR_DATA_KEY = "sma_visitor_data";

export interface VisitorData {
  visitorId: string;
  createdAt: string;
  fingerprint: string;
  lastSeenAt: string;
}

export interface DeviceInfo {
  userAgent: string;
  deviceType: string;
  timezone: string;
}

function generateVisitorId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `u_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

function detectDeviceType(): string {
  if (typeof window === "undefined") {
    return "unknown";
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(userAgent)) {
    return "mobile";
  }

  if (/ipad|tablet|playbook|silk/i.test(userAgent)) {
    return "tablet";
  }

  return "desktop";
}

function generateFingerprint(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const screenSize = `${window.screen.width}x${window.screen.height}`;
  const language = navigator.language || "";
  const platform = navigator.platform || "";
  const payload = `${navigator.userAgent}|${timezone}|${screenSize}|${language}|${platform}`;

  let hash = 0;

  for (let index = 0; index < payload.length; index += 1) {
    hash = (hash << 5) - hash + payload.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash).toString(16);
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined") {
    return {
      userAgent: "",
      deviceType: "unknown",
      timezone: "",
    };
  }

  return {
    userAgent: navigator.userAgent,
    deviceType: detectDeviceType(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function persistVisitorId(visitorId: string) {
  if (typeof window === "undefined" || !visitorId) {
    return;
  }

  try {
    localStorage.setItem(USER_ID_KEY, visitorId);
    localStorage.removeItem(LEGACY_VISITOR_ID_KEY);
  } catch {
    // Ignore localStorage issues.
  }
}

export function getStoredVisitorId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return (
      localStorage.getItem(USER_ID_KEY) ||
      localStorage.getItem(LEGACY_VISITOR_ID_KEY)
    );
  } catch {
    return null;
  }
}

export function initializeVisitor(existingVisitorId?: string | null): VisitorData {
  if (typeof window === "undefined") {
    return {
      visitorId: "",
      createdAt: "",
      fingerprint: "",
      lastSeenAt: "",
    };
  }

  const now = new Date().toISOString();
  const visitorId = existingVisitorId || getStoredVisitorId() || generateVisitorId();
  const visitorData: VisitorData = {
    visitorId,
    createdAt: now,
    fingerprint: generateFingerprint(),
    lastSeenAt: now,
  };

  persistVisitorId(visitorId);

  try {
    localStorage.setItem(VISITOR_DATA_KEY, JSON.stringify(visitorData));
  } catch {
    // Ignore localStorage issues.
  }

  return visitorData;
}

export function getVisitorData(): VisitorData | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(VISITOR_DATA_KEY);

    if (stored) {
      return JSON.parse(stored) as VisitorData;
    }
  } catch {
    // Ignore parse errors.
  }

  const visitorId = getStoredVisitorId();

  if (!visitorId) {
    return null;
  }

  return {
    visitorId,
    createdAt: "",
    fingerprint: generateFingerprint(),
    lastSeenAt: new Date().toISOString(),
  };
}

export function updateVisitorLastSeen() {
  if (typeof window === "undefined") {
    return;
  }

  const existing = getVisitorData();

  if (!existing) {
    return;
  }

  try {
    localStorage.setItem(
      VISITOR_DATA_KEY,
      JSON.stringify({
        ...existing,
        lastSeenAt: new Date().toISOString(),
      }),
    );
  } catch {
    // Ignore localStorage issues.
  }
}

export function clearVisitorData() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(LEGACY_VISITOR_ID_KEY);
    localStorage.removeItem(VISITOR_DATA_KEY);
  } catch {
    // Ignore localStorage issues.
  }
}
