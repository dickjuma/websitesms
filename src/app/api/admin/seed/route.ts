import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import bcrypt from 'bcrypt';

export async function POST() {
  try {
    const { db } = await connectToDatabase();
    
    const existingAdmin = await db.collection('admins').findOne({ email: 'admin@smasystems.com' });
    
    if (existingAdmin) {
      return NextResponse.json({ success: false, message: 'Admin already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash('admin@2026', 10);
    
    await db.collection('admins').insertOne({
      email: 'admin@smasystems.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ success: true, message: 'Admin created successfully' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}