import { NextResponse } from 'next/server';
import { getPricingServices } from '@/lib/database';

export async function GET() {
  try {
    console.log('Testing database connection...');
    const services = await getPricingServices();
    console.log('Database test result:', {
      servicesCount: services?.length || 0,
      services: services?.map(s => ({ id: s.id, name: s.name })) || []
    });

    return NextResponse.json({
      success: true,
      servicesCount: services?.length || 0,
      services: services?.map(s => ({ id: s.id, name: s.name })) || []
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}