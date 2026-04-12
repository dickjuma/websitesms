import { NextRequest, NextResponse } from 'next/server';
import { connectMongoClientWithFallback } from '@/lib/mongo-connection';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await connectMongoClientWithFallback();
    const db = client.db("sma_systems");
    const team = await db.collection('team').find({}).sort({ order: 1 }).toArray();
    const formatted = team.map((m: any) => ({
      _id: String(m._id),
      name: m.name || "",
      role: m.role || "",
      bio: m.bio || "",
      image: m.photoUrl || m.image || "",
      department: m.department || "Other",
      linkedin: m.linkedin || "",
    }));
    return NextResponse.json({ success: true, data: formatted });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await connectMongoClientWithFallback();
    const db = client.db("sma_systems");
    
    const member = {
      ...body,
      order: body.order || 0,
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('team').insertOne(member);
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
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }
    
    const client = await connectMongoClientWithFallback();
    const db = client.db("sma_systems");
    await db.collection('team').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
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
    
    const client = await connectMongoClientWithFallback();
    const db = client.db("sma_systems");
    await db.collection('team').deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}