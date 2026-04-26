import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30m'; // 30 minutes
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-super-secret-refresh-key-change-in-production';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'; // 7 days

export interface AdminPayload {
  adminId: string;
  email: string;
  name?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  adminId: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

/**
 * Generate JWT access token
 */
export function generateAccessToken(payload: Omit<AdminPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'admin-system',
    audience: 'admin-portal'
  });
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    issuer: 'admin-system',
    audience: 'admin-portal-refresh'
  });
}

/**
 * Verify JWT access token
 */
export function verifyAccessToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'admin-system',
      audience: 'admin-portal'
    }) as AdminPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET, {
      issuer: 'admin-system',
      audience: 'admin-portal-refresh'
    }) as RefreshTokenPayload;
    return decoded;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

/**
 * Create secure HTTP-only cookie options
 */
export function createSecureCookieOptions(maxAge?: number): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict';
  path: string;
  maxAge?: number;
} {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  };

  if (maxAge) {
    options.maxAge = maxAge;
  }

  return options;
}

/**
 * Set authentication cookies
 */
export function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken?: string
): void {
  // Set access token cookie (30 minutes)
  response.cookies.set('admin_token', accessToken, createSecureCookieOptions(30 * 60));

  // Set refresh token cookie if provided (7 days)
  if (refreshToken) {
    response.cookies.set('admin_refresh_token', refreshToken, createSecureCookieOptions(7 * 24 * 60 * 60));
  }
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies(response: NextResponse): void {
  response.cookies.set('admin_token', '', { ...createSecureCookieOptions(), maxAge: 0 });
  response.cookies.set('admin_refresh_token', '', { ...createSecureCookieOptions(), maxAge: 0 });
}

/**
 * Get admin session from request cookies
 */
export function getAdminSession(request: NextRequest): AdminPayload | null {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;

  return verifyAccessToken(token);
}

/**
 * Require admin authentication - returns error response if not authenticated
 */
export function requireAdminAuth(request: NextRequest): NextResponse | null {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  return jwt.sign(
    { type: 'csrf', timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

/**
 * Verify CSRF token
 */
export function verifyCSRFToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.type === 'csrf';
  } catch {
    return false;
  }
}