import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "@/services/api/auth";
import {
  getArticlesListById,
  updateArticles,
  deleteArticleByDocumentId,
} from "@/services/api/articles";
import { getCategoriesList } from "@/services/api/categories";
import { toast } from "react-toastify";
import type { ArticleType, CategoryType, UpdatePayloadArticleType } from "@/types";



export const useDetailArticles = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<ArticleType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const [currentUser, setCurrentUser] = useState<number | undefined>();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editCoverImage, setEditCoverImage] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<string>("");

  // Get detail article
  const fetchArticleById = async (): Promise<void> => {
    if (!documentId) return;
    setLoading(true);
    try {
      const response = await getArticlesListById(documentId);
      setArticle(response.data);
    } catch (err: unknown) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Get user
  const fetchCurrentUser = async (): Promise<void> => {
    try {
      const response = await getUser();

      if (!response) {
        console.error("User tidak ditemukan.");
        return;
      }

      setCurrentUser(response.id);
    } catch (err: unknown) {
      console.error("Gagal mengambil user:", err);
    }
  };

  // Get categories
  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await getCategoriesList();
      setCategories(response.data ?? []);
    } catch (err: unknown) {
      console.error("Gagal mengambil kategori:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchCategories();
    fetchArticleById();
  }, []);

  // Handle update
  const handleUpdate = async (): Promise<void> => {
    if (!documentId || !article) return;

    const payload: UpdatePayloadArticleType = {
      data: {
        title: editTitle,
        description: editDescription,
        cover_image_url: article.cover_image_url,
        category: article.category?.id,
      },
    };

    try {
      const response = await updateArticles(documentId, payload);

      if (!response.ok) {
        const result = await response.json();
        toast.error(result?.message?.error || "Update gagal");
      } else {
        toast.success("Berhasil update artikel");
        await fetchArticleById();
      }
    } catch (err: unknown) {
      console.error("Update gagal:", err);
    }
  };

  // Handle delete
  const handleDelete = async (): Promise<void> => {
    if (!documentId) return;
    try {
      await deleteArticleByDocumentId(documentId);
      toast.success("Artikel berhasil dihapus");
      navigate("/articles");
    } catch (err: unknown) {
      console.error("Delete gagal:", err);
    }
  };

  return {
    article,
    loading,
    error,
    currentUser,
    categories,
    editTitle,
    editDescription,
    editCoverImage,
    editCategoryId,
    setEditTitle,
    setEditDescription,
    setEditCoverImage,
    setEditCategoryId,
    handleUpdate,
    handleDelete,
  };
};
