import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

export interface AdminSession {
  adminId: string;
  email: string;
  name?: string;
  issuedAt: number;
  expiresAt: number;
}

function getAdminTokenSecret(): string {
  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret) {
    console.warn('ADMIN_TOKEN_SECRET not set - using dev fallback');
    return 'DEV_SECRET_DO_NOT_USE_IN_PRODUCTION';
  }
  return secret;
}

export function validateRequiredEnvVars() {
  getAdminTokenSecret();
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decodeBase64Url(value: string): string | null {
  try {
    return Buffer.from(value, 'base64url').toString('utf8');
  } catch {
    return null;
  }
}

function signTokenPayload(encodedPayload: string): string {
  return createHmac('sha256', getAdminTokenSecret())
    .update(encodedPayload)
    .digest('base64url');
}

function getAuthorizationToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice(7).trim();
}

export function createAdminToken(
  admin: { adminId: string; email: string; name?: string },
  ttlMs: number = ADMIN_TOKEN_TTL_MS,
): string {
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
  const [encodedPayload, providedSignature] = token.split('.');

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
      typeof payload.adminId !== 'string' ||
      typeof payload.email !== 'string' ||
      typeof payload.issuedAt !== 'number' ||
      typeof payload.expiresAt !== 'number'
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

export function getAdminSession(request: NextRequest): AdminSession | null {
  const token = getAuthorizationToken(request);

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

export function requireAdminAuth(request: NextRequest): NextResponse<{ error: string }> | null {
  // First try new cookie-based authentication
  const token = request.cookies.get('admin_token')?.value;
  if (token) {
    try {
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
      if (decoded.exp > Date.now() / 1000) {
        return null; // Valid cookie auth
      }
    } catch {
      // Invalid token, continue to header check
    }
  }

  // Fall back to old header-based authentication
  const session = getAdminSession(request);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}