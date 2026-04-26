export async function uploadImageToCloudinary(
  base64Data: string,
  options?: {
    folder?: string;
    publicId?: string;
  }
): Promise<{ secure_url: string; public_id: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error("Cloudinary cloud name missing");
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = options?.folder || "sma/uploads";
  const publicId = options?.publicId || `upload-${timestamp}`;

  // Try different upload methods
  const uploadMethods = [
    // Method 1: Signed upload with team_members preset
    async () => {
      console.log("Trying signed upload with team_members preset");
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (!apiKey || !apiSecret) {
        throw new Error("API credentials missing");
      }

      const crypto = await import("crypto");
      const signatureString = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}&upload_preset=team_members${apiSecret}`;
      const signature = crypto
        .createHash("sha1")
        .update(signatureString)
        .digest("hex");

      console.log("Signature created for team_members");
      const formData = new FormData();
      formData.append("file", base64Data);
      formData.append("upload_preset", "team_members");
      formData.append("cloud_name", cloudName);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey);
      formData.append("signature", signature);
      formData.append("folder", folder);
      formData.append("public_id", publicId);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Signed upload response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Signed upload error:", errorText);
        throw new Error(`Signed upload failed: ${response.status} - ${errorText}`);
      }

      return await response.json();
    },

    // Method 2: Unsigned upload with team_members preset
    async () => {
      const formData = new FormData();
      formData.append("file", base64Data);
      formData.append("upload_preset", "team_members");
      formData.append("folder", folder);
      formData.append("public_id", publicId);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Unsigned upload failed: ${response.status}`);
      }

      return await response.json();
    },

    // Method 3: Try with ml_default preset (signed)
    async () => {
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (!apiKey || !apiSecret) {
        throw new Error("API credentials missing");
      }

      const crypto = await import("crypto");
      const signatureString = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}&upload_preset=ml_default${apiSecret}`;
      const signature = crypto
        .createHash("sha1")
        .update(signatureString)
        .digest("hex");

      const formData = new FormData();
      formData.append("file", base64Data);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", cloudName);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey);
      formData.append("signature", signature);
      formData.append("folder", folder);
      formData.append("public_id", publicId);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`ml_default upload failed: ${response.status}`);
      }

      return await response.json();
    },

    // Method 4: Unsigned with ml_default preset
    async () => {
      const formData = new FormData();
      formData.append("file", base64Data);
      formData.append("upload_preset", "ml_default");
      formData.append("folder", folder);
      formData.append("public_id", publicId);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Unsigned ml_default upload failed: ${response.status}`);
      }

      return await response.json();
    }
  ];

  let lastError: Error | null = null;

  for (const method of uploadMethods) {
    try {
      const data = await method();
      console.log("Upload successful with method");
      return { secure_url: data.secure_url, public_id: data.public_id };
    } catch (error) {
      console.warn("Upload method failed:", error);
      lastError = error as Error;
    }
  }

  // Fallback: Return base64 data URL directly
  console.log("All Cloudinary methods failed, using base64 data URL as fallback");
  return {
    secure_url: base64Data,
    public_id: `fallback-${publicId}`
  };
}

export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
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