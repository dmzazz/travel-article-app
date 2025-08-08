import type { FC } from "react";
import type { CommentsType } from "@/types";
import { formatDate } from "@/lib/utils";
import { Card } from "../ui/card";

interface CommentCardProps {
  comment: CommentsType;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  const { content, createdAt, user } = comment;

  return (
    <Card className="mb-4 rounded border bg-white p-4 shadow">
      <div className="space-y-2">
        <div className="font-medium text-gray-900">
          {user?.username || "Anonymous"}
        </div>
        <div className="text-sm leading-relaxed text-gray-700">{content}</div>
        <div className="text-xs text-gray-500">
          Diposting pada: {formatDate(createdAt)}
        </div>
      </div>
    </Card>
  );
};

export default CommentCard;
