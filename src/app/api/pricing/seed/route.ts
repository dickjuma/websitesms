import { NextResponse } from 'next/server';
import { seedPredefinedServices } from '@/lib/pricing-seed';

export async function POST() {
  try {
    console.log('Running manual seeding...');
    await seedPredefinedServices();
    return NextResponse.json({ success: true, message: 'Seeding completed' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}