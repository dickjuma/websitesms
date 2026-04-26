import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("logo") as File | null;
    
    if (!file || !file.name) {
      return NextResponse.json(
        { success: false, message: "No logo file provided" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type. Allowed: PNG, JPG, SVG, WebP" },
        { status: 400 }
      );
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File too large. Max 2MB allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = path.join(process.cwd(), "public", "images", "logos");
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const fileName = `logo-${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(uploadDir, fileName);
    
    await writeFile(filePath, buffer);

    const publicUrl = `/images/logos/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: "Logo uploaded successfully"
    });
  } catch (error) {
    console.error("Logo upload failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload logo" },
      { status: 500 }
    );
  }
}