import { apiUrl } from "@/lib/config";
import { getToken } from "@/lib/cookies";
import type {
  CommentsType,
  CreateCommentsType,
  UpdateCommentsType,
} from "@/types";

export const getCommentsList = async (
  params: {
    page?: number;
    pageSize?: number;
    sort?: string;
  } = {},
): Promise<{
  data?: CommentsType[];
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
    "pagination[page]": params.page?.toString() || "1",
    "pagination[pageSize]": params.pageSize?.toString() || "10",
    "populate[article]": "*",
    "populate[user]": "*",
  });

  if (params.sort) {
    queryParams.set("sort[0]", params.sort);
  }

  const response = await fetch(`${apiUrl}/comments?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  return {
    data: result.data,
    meta: result.meta,
  };
};

export const getCommentsListById = async (
  documentId: string,
): Promise<Response> => {
  const token = getToken();
  const response = await fetch(`${apiUrl}/comments/${documentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const createComments = async (
  values: CreateCommentsType,
): Promise<Response> => {
  const token = getToken();
  const response = await fetch(`${apiUrl}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response;
};

export const updateComments = async (
  documentId: string,
  values: UpdateCommentsType,
): Promise<Response> => {
  const token = getToken();

  const response = await fetch(`${apiUrl}/comments/${documentId}`, {
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
  const response = await fetch(`${apiUrl}/comments/${documentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
