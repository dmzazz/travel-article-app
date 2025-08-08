import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCommentsList } from "@/services/api/comments";
import type { CommentsType } from "@/types";
import { COMMENTS_PER_PAGE } from "@/constant";

export const useComments = () => {
  const [commentsList, setCommentsList] = useState<CommentsType[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [totalPagesCount, setTotalPagesCount] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1");
  const sortParam = searchParams.get("sort") || "createdAt:desc";

  const [currentPage, setCurrentPage] = useState(pageParam);
  const [sortOption, setSortOption] = useState(sortParam);

  const fetchComments = async () => {
    try {
      const response = await getCommentsList({
        page: currentPage,
        pageSize: COMMENTS_PER_PAGE,
        sort: sortOption,
      });

      setCommentsList(response?.data || []);
      setTotalPagesCount(response?.meta?.pagination?.pageCount || 1);
    } catch (err) {
      console.error(err);
      setCommentsList([]);
      setTotalPagesCount(1);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), sort: sortOption });
    setIsLoadingComments(true);
    fetchComments();
  }, [currentPage, sortOption]);

  return {
    commentsList,
    isLoadingComments,
    totalPagesCount,
    currentPage,
    sortOption,
    setCurrentPage,
    setSortOption,
  };
};
