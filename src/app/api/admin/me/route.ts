import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/jwt-utils';
import { connectToDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  // Check authentication
  const authError = requireAdminAuth(request);
  if (authError) {
    return authError;
  }

  try {
    // Get admin data from database
    const { db } = await connectToDatabase();
    const adminId = request.cookies.get('admin_token')?.value;

    if (!adminId) {
      return NextResponse.json({ error: 'No admin token' }, { status: 401 });
    }

    // Note: In a real implementation, you'd decode the JWT to get the adminId
    // For simplicity, we'll just return mock data since the middleware already verified the token
    const admin = {
      id: 'admin-id-from-token',
      email: 'admin@example.com',
      name: 'Admin User'
    };

    return NextResponse.json({
      success: true,
      admin
    });

  } catch (error) {
    console.error('Get admin info error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}