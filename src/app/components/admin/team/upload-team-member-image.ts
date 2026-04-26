export async function uploadTeamMemberImage(file: File): Promise<string> {
  console.log("Starting upload for file:", file.name, "size:", file.size);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "team");

  console.log("Sending upload request...");
  const response = await fetch("/api/admin/upload-image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
    },
    body: formData,
  });

  console.log("Upload response status:", response.status);
  const data = await response.json().catch(() => null);
  console.log("Upload response data:", data);

  if (!response.ok || !data?.url) {
    console.error("Upload failed:", data?.error || "No URL returned");
    throw new Error(data?.error || "Failed to upload image");
  }

  console.log("Upload successful, URL:", data.url);
  return data.url as string;
}
