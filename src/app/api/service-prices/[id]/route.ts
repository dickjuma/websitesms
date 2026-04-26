import { NextResponse } from 'next/server';
import { updateServicePrice, deleteServicePrice, getAllServicePrices, createPriceChangeAudit } from '@/lib/database';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validation
    const { serviceName, description, monthlyPrice, oneTimePrice, category, features } = body;
    if (!serviceName || !description || monthlyPrice === undefined || oneTimePrice === undefined || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (monthlyPrice < 0 || oneTimePrice < 0) {
      return NextResponse.json({ error: 'Prices cannot be negative' }, { status: 400 });
    }

    // Get old data for audit log
    const allPrices = await getAllServicePrices();
    const oldPrice = allPrices.find(p => p._id === id);

    const updated = await updateServicePrice(id, {
      serviceName,
      description,
      monthlyPrice: Number(monthlyPrice),
      oneTimePrice: Number(oneTimePrice),
      category,
      features: features || [],
    });

    if (!updated) {
      return NextResponse.json({ error: 'Service price not found' }, { status: 404 });
    }

    // Log audit entry
    if (oldPrice) {
      await createPriceChangeAudit({
        servicePriceId: id,
        action: 'update',
        oldData: oldPrice,
        newData: {
          serviceName,
          description,
          monthlyPrice: Number(monthlyPrice),
          oneTimePrice: Number(oneTimePrice),
          category,
          features: features || [],
        },
        changedBy: 'admin',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update service price:', error);
    return NextResponse.json({ error: 'Failed to update service price' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Get old data for audit log
    const allPrices = await getAllServicePrices();
    const oldPrice = allPrices.find(p => p._id === id);

    const deleted = await deleteServicePrice(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Service price not found' }, { status: 404 });
    }

    // Log audit entry
    if (oldPrice) {
      await createPriceChangeAudit({
        servicePriceId: id,
        action: 'delete',
        oldData: oldPrice,
        changedBy: 'admin',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete service price:', error);
    return NextResponse.json({ error: 'Failed to delete service price' }, { status: 500 });
  }
}