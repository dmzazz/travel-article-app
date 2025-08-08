import { apiUrl } from "@/lib/config";
import { getToken } from "@/lib/cookies";

export const upload = async (file: File): Promise<any> => {
  const token = getToken();
  try {
    const formData = new FormData();
    formData.append("files", file);

    const response = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Upload failed");
    }

    return data;
  } catch (error) {
    console.error("An error occurred during upload:", error);
    throw error;
  }
};
