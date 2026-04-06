import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const seo = await db.collection('seo_metadata').find({}).toArray();
    return NextResponse.json({ success: true, data: seo });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { db } = await connectToDatabase();
    
    const seoData = {
      page: body.page,
      title: body.title,
      description: body.description,
      keywords: body.keywords || [],
      ogImage: body.ogImage || '',
      canonicalUrl: body.canonicalUrl || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('seo_metadata').insertOne(seoData);
    return NextResponse.json({ success: true, id: result.insertedId.toString() });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    
    const { db } = await connectToDatabase();
    
    if (id) {
      await db.collection('seo_metadata').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateData, updatedAt: new Date() } }
      );
    } else if (updateData.page) {
      await db.collection('seo_metadata').updateOne(
        { page: updateData.page },
        { $set: { ...updateData, updatedAt: new Date() } },
        { upsert: true }
      );
    } else {
      return NextResponse.json({ success: false, message: 'ID or page required' }, { status: 400 });
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
    await db.collection('seo_metadata').deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}