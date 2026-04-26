import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { connectToDatabase } from "@/lib/database";
import { requireAdminAuth } from "@/lib/admin-auth";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const pageParam = request.nextUrl.searchParams.get("page");
    const limitParam = request.nextUrl.searchParams.get("limit");
    const searchParam = request.nextUrl.searchParams.get("search")?.trim() || "";
    const parsedPage = pageParam ? Number.parseInt(pageParam, 10) : 1;
    const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : 20;
    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : 20;
    const skip = (page - 1) * limit;

    const { db } = await connectToDatabase();
    const collection = db.collection("contacts");

    const query: Record<string, unknown> = {};
    if (searchParam) {
      const searchRegex = { $regex: searchParam, $options: "i" };
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { company: searchRegex },
        { subject: searchRegex },
      ];
    }

    const [contactsData, total] = await Promise.all([
      collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(query),
    ]);

    const contacts = contactsData.map((c: Record<string, unknown>) => ({
      id: (c._id as string) || "",
      name: (c.name as string) || "Anonymous",
      email: (c.email as string) || "",
      phone: (c.phone as string) || "",
      company: (c.company as string) || "",
      subject: (c.subject as string) || "",
      message: (c.message as string) || "",
      serviceType: (c.serviceType as string) || "",
      status: (c.status as string) || "new",
      createdAt: c.createdAt ? new Date(c.createdAt as Date).toISOString() : new Date().toISOString(),
    }));

    return NextResponse.json({ contacts, total, page, limit });
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as { id?: string; status?: string };
    if (!body.id || !body.status) {
      return NextResponse.json(
        { error: "id and status are required." },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("contacts");
    const contactId = ObjectId.isValid(body.id) ? new ObjectId(body.id) : null;

    if (!contactId) {
      return NextResponse.json({ error: "Invalid contact id." }, { status: 400 });
    }

    await collection.updateOne(
      { _id: contactId },
      { $set: { status: body.status } },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update contact:", error);
    return NextResponse.json({ error: "Failed to update contact." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("contacts");
    const contactId = ObjectId.isValid(id) ? new ObjectId(id) : null;

    if (!contactId) {
      return NextResponse.json({ error: "Invalid contact id." }, { status: 400 });
    }

    await collection.deleteOne({ _id: contactId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete contact:", error);
    return NextResponse.json({ error: "Failed to delete contact." }, { status: 500 });
  }
}
