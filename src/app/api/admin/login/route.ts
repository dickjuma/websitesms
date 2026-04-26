import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, setAuthCookies, generateCSRFToken } from '@/lib/jwt-utils';

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { attempts: number; lastAttempt: number; blockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes
const WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes window for rate limiting

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (clientIP) {
    return clientIP;
  }

  return request.ip || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    return false;
  }

  // Check if blocked
  if (record.blockedUntil > now) {
    return true;
  }

  // Reset if window has passed
  if (now - record.lastAttempt > WINDOW_SIZE) {
    rateLimitMap.delete(ip);
    return false;
  }

  return false;
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { attempts: 0, lastAttempt: 0, blockedUntil: 0 };

  record.attempts += 1;
  record.lastAttempt = now;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION;
  }

  rateLimitMap.set(ip, record);
}

function resetAttempts(ip: string): void {
  rateLimitMap.delete(ip);
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);

    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many login attempts. Please try again later.',
          retryAfter: Math.ceil((rateLimitMap.get(clientIP)?.blockedUntil || 0 - Date.now()) / 1000)
        },
        { status: 429 }
      );
    }

    const { email, password, csrfToken } = await request.json();

    // Basic input validation
    if (!email || !password) {
      recordFailedAttempt(clientIP);
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      recordFailedAttempt(clientIP);
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Find admin user
    const admin = await db.collection('admins').findOne({ email: sanitizedEmail });

    if (!admin) {
      recordFailedAttempt(clientIP);
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      recordFailedAttempt(clientIP);
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      adminId: admin._id.toString(),
      email: admin.email,
      name: admin.name || '',
      role: admin.role || 'admin'
    });

    const refreshToken = generateRefreshToken({
      adminId: admin._id.toString(),
      tokenVersion: admin.tokenVersion || 0
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name
      }
    });

    // Set secure cookies
    setAuthCookies(response, accessToken, refreshToken);

    // Set CSRF token cookie
    const csrfTokenValue = generateCSRFToken();
    response.cookies.set('csrf_token', csrfTokenValue, {
      httpOnly: false, // Allow client-side access for CSRF
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 // 1 hour
    });

    // Reset failed attempts on successful login
    resetAttempts(clientIP);

    // Log successful login (optional)
    console.log(`Admin login: ${admin.email} from IP: ${clientIP}`);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}