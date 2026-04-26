import { NextResponse } from 'next/server';
import { getPricingServices, createPricingService } from '@/lib/database';

export async function GET() {
  try {
    const prices = await getPricingServices();
    return NextResponse.json(prices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newService = await createPricingService(body);
    return NextResponse.json(newService);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
