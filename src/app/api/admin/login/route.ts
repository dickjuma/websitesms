import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const admin = await db.collection('admins').findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const token = Buffer.from(`${admin._id}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}