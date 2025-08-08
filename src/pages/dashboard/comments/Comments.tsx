import type { FC } from "react";
import CommentItem from "@/components/comments/CommentItem";
import CommentSortBy from "@/components/comments/CommentSortBy";
import CommentPagination from "@/components/comments/CommentPagination";
import { useComments } from "@/hooks/useComments";

const Comments: FC = () => {
  const {
    commentsList,
    isLoadingComments,
    totalPagesCount,
    currentPage,
    sortOption,
    setCurrentPage,
    setSortOption,
  } = useComments();

  return (
    <div className="container pt-16">
      <h2 className="mb-4 text-2xl font-bold">Manajemen Komentar</h2>

      <CommentSortBy
        value={sortOption}
        onChange={(val) => {
          setSortOption(val);
          setCurrentPage(1);
        }}
      />

      <CommentItem comments={commentsList} isLoading={isLoadingComments} />

      {totalPagesCount > 1 && (
        <div className="mt-8">
          <CommentPagination
            currentPage={currentPage}
            totalPages={totalPagesCount}
            onPageClick={setCurrentPage}
            onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
            onNext={() =>
              setCurrentPage((p) => Math.min(totalPagesCount, p + 1))
            }
          />
        </div>
      )}
    </div>
  );
};

export default Comments;
