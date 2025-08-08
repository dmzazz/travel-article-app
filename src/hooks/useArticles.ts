import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesList } from "@/services/api/articles";
import { getCategoriesList } from "@/services/api/categories";

import type { ArticleType, CategoryType } from "@/types";
import { ARTICLES_PER_PAGE } from "@/constant";

export const useArticles = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [totalPagesCount, setTotalPagesCount] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page") || "1");
  const titleParam = searchParams.get("title") || "";
  const categoryParam = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(pageParam);
  const [searchTitle, setSearchTitle] = useState(titleParam);
  const [title, setTitle] = useState(titleParam);
  const [categoryName, setCategoryName] = useState(categoryParam);

  const fetchCategories = async () => {
    try {
      const response = await getCategoriesList();
      setCategories(response.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchArticles = async (
    page: number,
    title: string,
    categoryName: string,
  ) => {
    try {
      setIsLoading(true);
      const response = await getArticlesList({
        title,
        categoryName,
        page,
        pageSize: ARTICLES_PER_PAGE,
        sort: "createdAt:desc", // backend already returns sorted data
      });

      const data = response.data || [];
      setArticles(data);
      setTotalPagesCount(response?.meta?.pagination?.pageCount || 1);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSearchParams(() => {
      const newParams: Record<string, string> = {
        page: currentPage.toString(),
      };
      if (title) newParams.title = title;
      if (categoryName) newParams.category = categoryName;
      return newParams;
    });

    fetchArticles(currentPage, title, categoryName);
  }, [currentPage, title, categoryName]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = () => {
    setTitle(searchTitle);
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPagesCount) {
      setCurrentPage(newPage);
    }
  };

  return {
    articles,
    categories,
    searchTitle,
    setSearchTitle,
    setCategoryName,
    handleSearch,
    handleKeyPress,
    handlePageChange,
    currentPage,
    totalPagesCount,
    isLoading,
    error,
  };
};
