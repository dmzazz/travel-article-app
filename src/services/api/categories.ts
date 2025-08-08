import type { CategoryType } from "@/types";

// Import lib
import { apiUrl } from "@/lib/config";
import { getToken } from "@/lib/cookies";

// Get list category
export const getCategoriesList = async (): Promise<{
  data?: CategoryType[];
}> => {
  const response = await fetch(`${apiUrl}/categories`, {
    method: "GET",
  });

  const result = await response.json();

  return { data: result.data };
};

// Get category by ID
export const getCategoryByDocumentId = async (
  documentId: string,
): Promise<{ data: CategoryType }> => {
  const token = getToken();
  try {
    const response = await fetch(`${apiUrl}/categories/${documentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Get Category by ID error:", result.error?.message);
      throw new Error(result.error?.message || "Failed to fetch category");
    }

    return result;
  } catch (error) {
    console.error("An error occurred during Get Category by ID:", error);
    throw error;
  }
};

// Create category
export const createCategory = async (
  values: Partial<CategoryType>,
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${apiUrl}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: values }),
  });

  return response;
};

// Update category
export const updateCategory = async (
  documentId: string,
  values: Partial<CategoryType>,
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${apiUrl}/categories/${documentId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: values }),
  });

  const result = await response.json();

  return result.data;
};

// Delete category
export const deleteCategory = async (documentId: string): Promise<void> => {
  const token = getToken();
  try {
    const response = await fetch(`${apiUrl}/categories/${documentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Delete category error:", result.error?.message);
    } else {
      console.log("Delete category successful:", result);
    }
  } catch (error) {
    console.error("An error occurred during Delete category:", error);
  }
};
