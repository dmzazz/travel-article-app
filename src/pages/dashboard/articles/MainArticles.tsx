import { Skeleton } from "@/components/ui/skeleton";
import { useArticles } from "@/hooks/useArticles";
import { type FC } from "react";

import ArticleCategory from "@/components/articles/ArticleCategory";
import ArticleItem from "@/components/articles/ArticleItem";
import ArticleSearchBar from "@/components/articles/ArticleSearch";

import ArticlePagination from "@/components/articles/ArticlePagination";

const MainArticles: FC = () => {
  const {
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
  } = useArticles();

  if (error) return <p>Terjadi kesalahan saat memuat artikel.</p>;
  return (
    <div className="container pt-16">
      <div className="flex flex-col items-center space-y-4 space-x-4 sm:flex-row sm:space-y-0">
        <ArticleCategory
          categories={categories}
          setCategoryName={setCategoryName}
        />
        <ArticleSearchBar
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          handleSearch={handleSearch}
          handleKeyPress={handleKeyPress}
        />
      </div>

      {isLoading ? (
        <div className="mx-auto grid grid-cols-1 gap-4 space-y-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <article key={index} className="px-2">
              <div className="relative overflow-hidden rounded-lg border">
                <Skeleton className="h-40 w-full rounded-t-lg" />
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="mt-4 text-center text-gray-500">
          Data tidak ditemukan
        </div>
      ) : (
        <>
          <div className="mx-auto grid grid-cols-1 gap-4 space-y-5 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          <ArticlePagination
            currentPage={currentPage}
            totalPages={totalPagesCount}
            onPageClick={handlePageChange}
            onPrev={() => handlePageChange(currentPage - 1)}
            onNext={() => handlePageChange(currentPage + 1)}
          />
        </>
      )}
    </div>
  );
};

export default MainArticles;
