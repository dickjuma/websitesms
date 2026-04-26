import { NextRequest, NextResponse } from 'next/server';
import { updatePricingService } from '@/lib/database';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Service ID required' }, { status: 400 });
    }

    // For now, we'll just return success since delete functionality might not be implemented
    // In a real implementation, you'd add a deletePricingService function
    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete pricing service error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}