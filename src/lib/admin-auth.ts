import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export interface AdminSession {
  adminId: string;
  email: string;
  name?: string;
  issuedAt: number;
  expiresAt: number;
}

function getAdminTokenSecret() {
  return (
    process.env.ADMIN_TOKEN_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.MONGODB_URI ||
    "local-admin-token-secret"
  );
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  try {
    return Buffer.from(value, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

function signTokenPayload(encodedPayload: string) {
  return createHmac("sha256", getAdminTokenSecret())
    .update(encodedPayload)
    .digest("base64url");
}

function getAuthorizationToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice(7).trim();
}

export function createAdminToken(
  admin: { adminId: string; email: string; name?: string },
  ttlMs = ADMIN_TOKEN_TTL_MS,
) {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + ttlMs;

  const encodedPayload = encodeBase64Url(
    JSON.stringify({
      adminId: admin.adminId,
      email: admin.email,
      name: admin.name,
      issuedAt,
      expiresAt,
    } satisfies AdminSession),
  );

  return `${encodedPayload}.${signTokenPayload(encodedPayload)}`;
}

export function verifyAdminToken(token: string): AdminSession | null {
  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = signTokenPayload(encodedPayload);
  const expectedBuffer = Buffer.from(expectedSignature);
  const providedBuffer = Buffer.from(providedSignature);

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    return null;
  }

  const decodedPayload = decodeBase64Url(encodedPayload);

  if (!decodedPayload) {
    return null;
  }

  try {
    const payload = JSON.parse(decodedPayload) as Partial<AdminSession>;

    if (
      typeof payload.adminId !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.issuedAt !== "number" ||
      typeof payload.expiresAt !== "number"
    ) {
      return null;
    }

    if (payload.expiresAt <= Date.now()) {
      return null;
    }

    return {
      adminId: payload.adminId,
      email: payload.email,
      name: payload.name,
      issuedAt: payload.issuedAt,
      expiresAt: payload.expiresAt,
    };
  } catch {
    return null;
  }
}

export function getAdminSession(request: NextRequest) {
  const token = getAuthorizationToken(request);

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

export function requireAdminAuth(request: NextRequest) {
  const session = getAdminSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
