import type { FC } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  createComments,
  updateComments,
  deleteArticleByDocumentId,
} from "@/services/api/comments";
import { timeAgo } from "@/lib/utils";
import type { ArticleType, CommentsType } from "@/types";
import { toast } from "react-toastify";

interface CommentModalProps {
  article: ArticleType;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

const CommentModal: FC<CommentModalProps> = ({ article, open, setOpen }) => {
  const [comments, setComments] = useState<CommentsType[]>(
    article.comments || [],
  );
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    if (editCommentId) {
      try {
        const response = await updateComments(editCommentId, {
          data: { content: newComment },
        });
        setComments((prev) =>
          prev.map((comment) =>
            comment.documentId === editCommentId
              ? { ...comment, content: newComment, updatedAt: new Date() }
              : comment,
          ),
        );

        // const result = await response.json();

        if (!response.ok) {
          toast.error("gagal memperbarui komentar");
        } else {
          toast.success("berhasil memperbarui komentar");
        }
        setEditCommentId(null);
      } catch (error: unknown) {
        console.error(error);
      }
    } else {
      try {
        const response = await createComments({
          data: {
            content: newComment,
            article: article.id,
          },
        });

        const result = await response.json();

        const newCommentData = result?.data;

        if (!response.ok) {
          toast.error("gagal menambahkan komentar");
        } else {
          toast.success("sukses menambahkan komentar");
        }

        if (newCommentData) {
          setComments((prev) => [...prev, newCommentData]);
        }
      } catch (error: unknown) {
        console.error(error);
      }
    }

    setNewComment("");
  };

  const handleDeleteComment = async (documentId: string) => {
    await deleteArticleByDocumentId(documentId);
    setComments((prev) =>
      prev.filter((comment) => comment.documentId !== documentId),
    );
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" className="text-center">
          {comments.length} Komentar
        </Typography>

        <ScrollArea className="mt-2 h-72 w-full rounded-md">
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.documentId} className="mb-5 last:mb-0">
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <div className="hover:bg-accent flex cursor-context-menu items-center justify-between rounded-md p-2">
                        <div className="flex gap-3">
                          <Avatar className="mt-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium uppercase">
                              {comment.user?.username || "Anonymous"}
                            </p>
                            <p>{comment.content}</p>
                            <span className="text-muted-foreground text-sm">
                              {comment.createdAt
                                ? timeAgo(comment.createdAt)
                                : undefined}
                            </span>
                          </div>
                        </div>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="z-9999 w-48">
                      <ContextMenuItem
                        onClick={() => {
                          setEditCommentId(comment.documentId);
                          setNewComment(comment.content);
                        }}
                      >
                        ✏️ Edit
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => handleDeleteComment(comment.documentId)}
                        className="text-red-500 focus:text-red-500"
                      >
                        🗑️ Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">
              Komentar tidak tersedia
            </p>
          )}
        </ScrollArea>

        <div className="mt-5 flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmitComment();
            }}
            placeholder={
              editCommentId ? "Edit Komentar..." : "Tulis Komentar..."
            }
          />
        </div>
      </Box>
    </Modal>
  );
};

export default CommentModal;
