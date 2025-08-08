import type { FC } from "react";
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import type { CommentsType } from "@/types";

interface CommentItemProps {
  comments: CommentsType[];
  isLoading: boolean;
  skeletonCount?: number;
}

const CommentItem: FC<CommentItemProps> = ({
  comments,
  isLoading,
  skeletonCount = 10,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <CommentSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard key={`comment-${comment.id}`} comment={comment} />
          ))}
        </div>
      )}

      {comments.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500">Komentar tidak ditemukan.</p>
        </div>
      )}
    </>
  );
};

export default CommentItem;
