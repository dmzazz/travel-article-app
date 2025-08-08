import { useEffect, useState } from "react";
import {
  getCategoriesList,
  getCategoryByDocumentId,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/api/categories";
import { useForm } from "react-hook-form";

import type { CategoryType } from "@/types";
import { toast } from "react-toastify";

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const { register, handleSubmit, reset, setValue } = useForm<CategoryType>();

  //   Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await getCategoriesList();
      setCategories(response?.data ?? []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  //   Handle submit
  const onSubmit = async (data: CategoryType) => {
    try {
      // Check if category name already exists
      const nameExists = categories.some(
        (category) => category.name.toLowerCase() === data.name.toLowerCase(),
      );

      if (!editId && nameExists) {
        toast.error("Kategori sudah ada!");
        return;
      }

      if (editId) {
        const response = await updateCategory(editId, { name: data.name });
        if (!response.ok) {
          toast.error("Gagal memperbarui kategori");
          setEditId(null);
        }
      } else {
        const response = await createCategory({ name: data.name });
        const result = await response.json();
        if (!response.ok) {
          toast.error(result);
        } else {
          toast.success("Berhasil menambahkan kategori");
        }
      }
      await fetchCategories();
      reset();
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  // Handle edit
  const handleEdit = async (documentId: string) => {
    try {
      const res = await getCategoryByDocumentId(documentId);
      const category = res.data;
      setValue("name", category.name);
      setEditId(documentId);
    } catch (error) {
      console.error("Failed to get category:", error);
    }
  };

  // Handle delete
  const handleDelete = async (documentId: string) => {
    try {
      await deleteCategory(documentId);
      await fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    categories,
    currentCategories,
    editId,
    setEditId,
    currentPage,
    handlePageChange,
    totalPages,
    loading,
    register,
    handleSubmit,
    onSubmit,
    reset,
    handleEdit,
    handleDelete,
  };
};
