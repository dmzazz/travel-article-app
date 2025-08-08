import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createArticleFormSchema } from "@/lib/form-schema";
import { createArticles } from "@/services/api/articles";
import { getCategoriesList } from "@/services/api/categories";
import type { CategoryType } from "@/types";
import { upload } from "@/services/api/upload";

// Define form type based on Zod schema
type CreateArticleFormType = z.infer<typeof createArticleFormSchema>;

interface UseArticleCreateReturn {
  form: ReturnType<typeof useForm<CreateArticleFormType>>;
  categories: CategoryType[];
  onSubmit: (values: CreateArticleFormType) => Promise<void>;
}

export const useArticleCreate = (): UseArticleCreateReturn => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const form = useForm<CreateArticleFormType>({
    resolver: zodResolver(createArticleFormSchema),
    defaultValues: {
      title: "",
      description: "",
      cover_image_url: "",
      category: "",
    },
  });

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await getCategoriesList();

      if (!response || !Array.isArray(response.data)) {
        throw new Error("Invalid category data");
      }

      setCategories(response.data);
    } catch (error) {
      toast.error(`Failed to fetch categories: ${String(error)}`);
    }
  };

  const onSubmit = async (values: CreateArticleFormType): Promise<void> => {
    try {
      // if cover_image_url is file, upload first
      if (values.cover_image_url instanceof File) {
        const uploadRes = await upload(values.cover_image_url);
        // API upload return array file(s)
        const uploadedFile = uploadRes[0];
        values.cover_image_url = uploadedFile?.url || "";
      }

      const response = await createArticles(values);
      const result = await response.json();

      if (!response.ok) {
        toast.error(
          `Failed to create article: ${result?.error?.message || "Unknown error"}`,
        );
      } else {
        toast.success("Article created successfully!");
      }
    } catch (error) {
      toast.error(`Failed to create article: ${String(error)}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    form,
    categories,
    onSubmit,
  };
};
