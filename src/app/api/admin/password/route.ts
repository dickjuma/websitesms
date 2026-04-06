import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = Buffer.from(token, 'base64').toString();
    const [adminId] = decoded.split(':');

    if (!adminId) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: 'Current and new password required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const admin = await db.collection('admins').findOne({ _id: new ObjectId(adminId) });

    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: 'Current password is incorrect' }, { status: 401 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.collection('admins').updateOne(
      { _id: new ObjectId(adminId) },
      { $set: { password: hashedNewPassword, updatedAt: new Date() } }
    );

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}