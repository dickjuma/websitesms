import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/jwt-utils';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Clear authentication cookies
    clearAuthCookies(response);

    // Clear CSRF token
    response.cookies.set('csrf_token', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0
    });

    // Log logout (optional)
    const session = request.cookies.get('admin_token');
    if (session) {
      console.log('Admin logout successful');
    }

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}