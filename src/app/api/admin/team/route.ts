import { NextRequest, NextResponse } from "next/server";
import { connectMongoClientWithFallback } from "@/lib/mongo-connection";
import { requireAdminAuth } from "@/lib/admin-auth";
import { Types } from "mongoose";

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const client = await connectMongoClientWithFallback();
    const db = client.db("sma_systems");
    
    const team = await db.collection("team").find({}).sort({ order: 1, createdAt: -1 }).toArray();
    
    const members = team.map((member: any) => ({
      id: String(member._id || ""),
      name: member.name || "",
      email: member.email || "",
      role: member.role || "agent",
      status: member.isActive ? "active" : "inactive",
      photoUrl: member.photoUrl || member.image || "",
      bio: member.bio || "",
      department: member.department || "Other",
      linkedin: member.linkedin || "",
      createdAt: member.createdAt?.toISOString(),
      updatedAt: member.updatedAt?.toISOString(),
    }));

    return NextResponse.json({ team: members });
  } catch (error: any) {
    console.error("[TEAM API] Error:", error.message);
    return NextResponse.json({ error: error.message || "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { name, email, role, photoUrl, bio, department, linkedin } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    const client = await connectMongoClientWithFallback();
    const db = client.db("sma_systems");
    const now = new Date();
    
    const result = await db.collection("team").insertOne({
      name,
      email,
      role: role || "agent",
      photoUrl: photoUrl || "",
      image: photoUrl || "",
      bio: bio || "",
      department: department || "Other",
      linkedin: linkedin || "",
      isActive: true,
      order: 0,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ 
      success: true, 
      team: { 
        id: String(result.insertedId),
        name, 
        email, 
        role: role || "agent",
        photoUrl: photoUrl || "",
        bio: bio || "",
        department: department || "Other",
        status: "active",
      } 
    });
  } catch (error: any) {
    console.error("[TEAM API] POST Error:", error.message);
    return NextResponse.json({ error: error.message || "Failed to create team member" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const client = await connectMongoClientWithFallback();
    const db = client.db("sma_systems");
    await db.collection("team").deleteOne({ _id: new Types.ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[TEAM API] DELETE Error:", error.message);
    return NextResponse.json({ error: error.message || "Failed to delete team member" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { id, name, email, role, photoUrl, bio, department, linkedin, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const client = await connectMongoClientWithFallback();
    const db = client.db("sma_systems");
    
    await db.collection("team").updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { 
        name,
        email,
        role: role || "agent",
        photoUrl: photoUrl || "",
        image: photoUrl || "",
        bio: bio || "",
        department: department || "Other",
        linkedin: linkedin || "",
        isActive: isActive !== undefined ? isActive : true,
        updatedAt: new Date(),
      }}
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[TEAM API] PATCH Error:", error.message);
    return NextResponse.json({ error: error.message || "Failed to update team member" }, { status: 500 });
  }
}