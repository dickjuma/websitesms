import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const { db } = await connectToDatabase();
    
    if (slug) {
      const service = await db.collection('services').findOne({ slug, isActive: true });
      if (!service) {
        return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: service });
    }
    
    const services = await db.collection('services').find({}).toArray();
    return NextResponse.json({ success: true, data: services });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { db } = await connectToDatabase();
    
    const service = {
      ...body,
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('services').insertOne(service);
    return NextResponse.json({ success: true, id: result.insertedId.toString() });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, slug, ...updateData } = body;
    
    const { db } = await connectToDatabase();
    
    if (id) {
      await db.collection('services').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateData, updatedAt: new Date() } }
      );
    } else if (slug) {
      await db.collection('services').updateOne(
        { slug },
        { $set: { ...updateData, updatedAt: new Date() } },
        { upsert: true }
      );
    } else {
      return NextResponse.json({ success: false, message: 'ID or slug required' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    await db.collection('services').deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}