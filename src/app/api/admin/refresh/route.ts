import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { verifyRefreshToken, generateAccessToken, setAuthCookies } from '@/lib/jwt-utils';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('admin_refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'No refresh token provided' },
        { status: 401 }
      );
    }

    // Verify refresh token
    const refreshPayload = verifyRefreshToken(refreshToken);
    if (!refreshPayload) {
      return NextResponse.json(
        { success: false, message: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    // Connect to database and verify admin still exists and token version matches
    const { db } = await connectToDatabase();
    const admin = await db.collection('admins').findOne({
      _id: refreshPayload.adminId,
      tokenVersion: refreshPayload.tokenVersion
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Admin not found or token invalidated' },
        { status: 401 }
      );
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      adminId: admin._id.toString(),
      email: admin.email,
      name: admin.name || '',
      role: admin.role || 'admin'
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Token refreshed successfully'
    });

    // Set new access token cookie (refresh token remains the same)
    response.cookies.set('admin_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 60 // 30 minutes
    });

    return response;

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}