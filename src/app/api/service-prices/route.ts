import { NextResponse } from 'next/server';
import { getAllServicePrices, createServicePrice, updateServicePrice, deleteServicePrice, createPriceChangeAudit } from '@/lib/database';

export async function GET() {
  try {
    const prices = await getAllServicePrices();
    return NextResponse.json(prices);
  } catch (error) {
    console.error('Failed to fetch service prices:', error);
    return NextResponse.json({ error: 'Failed to fetch service prices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation
    const { serviceName, description, monthlyPrice, oneTimePrice, category, features } = body;
    if (!serviceName || !description || monthlyPrice === undefined || oneTimePrice === undefined || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (monthlyPrice < 0 || oneTimePrice < 0) {
      return NextResponse.json({ error: 'Prices cannot be negative' }, { status: 400 });
    }

    const newPrice = await createServicePrice({
      serviceName,
      description,
      monthlyPrice: Number(monthlyPrice),
      oneTimePrice: Number(oneTimePrice),
      category,
      features: features || [],
    });

    // Log audit entry
    await createPriceChangeAudit({
      servicePriceId: newPrice._id!,
      action: 'create',
      newData: {
        serviceName,
        description,
        monthlyPrice: Number(monthlyPrice),
        oneTimePrice: Number(oneTimePrice),
        category,
        features: features || [],
      },
      changedBy: 'admin', // In a real app, get from auth context
    });

    return NextResponse.json(newPrice, { status: 201 });
  } catch (error) {
    console.error('Failed to create service price:', error);
    return NextResponse.json({ error: 'Failed to create service price' }, { status: 500 });
  }
}