import { apiUrl } from "@/lib/config";
import { getToken } from "@/lib/cookies";
import type { createArticleFormSchema } from "@/lib/form-schema";
import type { ArticleType, UpdatePayloadArticleType } from "@/types";
import type z from "zod";

type CreateArticleFormType = z.infer<typeof createArticleFormSchema>;

export const getArticlesList = async (
  params: {
    title?: string;
    categoryName?: string;
    page?: number;
    pageSize?: number;
    sort?: string;
  } = {},
): Promise<{
  data?: ArticleType[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}> => {
  const token = getToken();

  const queryParams = new URLSearchParams({
    "pagination[page]": String(params.page || 1),
    "pagination[pageSize]": String(params.pageSize || 12),
    "populate[user]": "*",
    "populate[category]": "*",
    "populate[comments][populate][user]": "*",
  });

  // Add filter if any
  if (params.title) {
    queryParams.append("filters[title][$eq]", params.title);
  }

  if (params.categoryName) {
    queryParams.append("filters[category][name][$eq]", params.categoryName);
  }

  if (params.sort) {
    queryParams.append("sort", params.sort);
  }

  const response = await fetch(`${apiUrl}/articles?${queryParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  return { data: result.data, meta: result.meta };
};

export const getArticlesListById = async (
  documentId: string,
): Promise<{ data?: ArticleType }> => {
  const token = getToken();

  const queryParams = new URLSearchParams({
    "populate[user]": "*",
    "populate[category]": "*",
    "populate[comments][populate][user]": "*",
  });

  const response = await fetch(
    `${apiUrl}/articles/${documentId}?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();

  return { data: result.data };
};

export const createArticles = async (
  values: CreateArticleFormType,
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${apiUrl}/articles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: values }),
  });

  return response;
};

export const updateArticles = async (
  documentId: string,
  values: UpdatePayloadArticleType,
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${apiUrl}/articles/${documentId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response;
};

// Delete article
export const deleteArticleByDocumentId = async (
  documentId: string,
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${apiUrl}/articles/${documentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
