import { useState } from "react";

import { formatDate } from "@/lib/utils";
import type { ArticleType } from "@/types";

import { CiCalendar } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

import { Link } from "react-router-dom";

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import CommentModal from "../comments/CommentModal";

const ArticleItem = ({ article }: { article: ArticleType }) => {
  // state for open modal
  const [open, setOpen] = useState(false);

  return (
    <Card className="relative flex h-[500px] max-h-[500px] flex-col overflow-hidden rounded-lg border bg-gray-100">
      <article className="flex h-full flex-col">
        {/* Image */}
        <img
          src={article.cover_image_url}
          alt={article.title}
          className="max-h-[180px] rounded-lg object-cover duration-300 hover:scale-105 hover:transition-transform"
        />

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* User and Date */}
          <div className="mb-2 flex items-center justify-between">
            <p>{article.user?.username}</p>
            <div className="flex items-center">
              <CiCalendar className="mr-1 h-5 w-5" />
              {formatDate(article.publishedAt)}
            </div>
          </div>

          {/* Title */}
          <CardTitle>{article.title}</CardTitle>

          {/* Description */}
          <CardDescription
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />

          {/* Spacer */}
          <div className="flex-1" />

          {/* Read more & Footer */}
          <div className="flex flex-col">
            <p className="text-end font-semibold">
              <Link to={`/articles/${article.documentId}`}>Selengkapnya</Link>
            </p>

            <CardFooter>
              <p className="text-accent-content">
                {article.category?.name || "Kategori tidak tersedia"}
              </p>

              <span
                className="inline-flex items-center hover:cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <FaRegComment className="mr-1 h-5 w-5" />
                <span className="text-lg">{article.comments?.length ?? 0}</span>
              </span>
            </CardFooter>

            {/* Modal comments */}
            <CommentModal open={open} setOpen={setOpen} article={article} />
          </div>
        </div>
      </article>
    </Card>
  );
};

export default ArticleItem;
