import { NextResponse } from 'next/server';

// Simple health check endpoint for testing
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Authentication system is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    jwtConfigured: !!process.env.JWT_SECRET,
    databaseConfigured: !!process.env.MONGODB_URI
  });
}