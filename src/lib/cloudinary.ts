export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary configuration missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "team_members");
  formData.append("cloud_name", cloudName);

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = await generateSignature(timestamp, apiSecret);

  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", apiKey);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data = await response.json();
  return data.secure_url;
}

async function generateSignature(timestamp: number, apiSecret: string): Promise<string> {
  const crypto = await import("crypto");
  const str = `timestamp=${timestamp}${apiSecret}`;
  return crypto.createHash("sha1").update(str).digest("hex");
}

export function getCloudinaryUrl(publicId: string, options?: {
  width?: number;
  height?: number;
  crop?: string;
}): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
  let transform = "f_auto,q_auto";
  
  if (options?.width) transform += `,w_${options.width}`;
  if (options?.height) transform += `,h_${options.height}`;
  if (options?.crop) transform += `,c_${options.crop}`;
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicId}`;
}