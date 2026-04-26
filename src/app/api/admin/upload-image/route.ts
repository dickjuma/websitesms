import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    console.log("Upload API called");
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string || 'blog';

    console.log("File received:", file?.name, "size:", file?.size, "type:", file?.type);

    if (!file) {
      console.error("No file provided");
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    console.log("Converting to base64, attempting Cloudinary upload...");
    const result = await uploadImageToCloudinary(base64, {
      folder: `sma/${folder}`,
      publicId: `${folder}-${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}`,
    });

    console.log("Cloudinary upload successful:", result.secure_url);
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
