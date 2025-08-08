import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDetailArticles } from "@/hooks/useArticleDetail";
import { formatDate } from "@/lib/utils";
import { type FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const DetailArticles: FC = () => {
  const {
    article,
    loading,
    currentUser,
    categories,
    editTitle,
    editDescription,
    editCoverImage,
    editCategoryId,
    setEditTitle,
    setEditDescription,
    setEditCoverImage,
    setEditCategoryId,
    handleUpdate,
    handleDelete,
  } = useDetailArticles();

  return (
    <>
      {loading ? (
        <div className="container pt-16">
          <Card className="space-y-4 p-5">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </Card>

          <Card className="mt-4 space-y-4 p-5">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        </div>
      ) : article ? (
        <div className="container pt-16">
          <Card className="p-5">
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="h-100"
            />
            <Separator />
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">{article?.title}</h1>
              {article.user?.id === currentUser && (
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setEditTitle(article.title);
                          setEditDescription(article.description);
                          setEditCoverImage(article?.cover_image_url || "");
                          setEditCategoryId(
                            article.category?.id?.toString() || "",
                          );
                        }}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Artikel</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Label>Judul</Label>
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Judul"
                        />

                        <Label>Deskripsi</Label>
                        <Textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Deskripsi"
                        />

                        <Label>Cover Image</Label>
                        <Input
                          value={editCoverImage}
                          onChange={(e) => setEditCoverImage(e.target.value)}
                          placeholder="Cover Image URL"
                        />

                        <Label>Kategori</Label>
                        <Select
                          value={editCategoryId}
                          onValueChange={(value) => setEditCategoryId(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter className="pt-4">
                        <Button onClick={handleUpdate}>Simpan Perubahan</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Delete article */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hapus Artikel?</DialogTitle>
                      </DialogHeader>
                      <p>
                        Apakah kamu yakin ingin menghapus artikel ini? Tindakan
                        ini tidak bisa dibatalkan.
                      </p>
                      <DialogFooter className="pt-4">
                        <Button variant="destructive" onClick={handleDelete}>
                          Hapus
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              By: {article.user?.username || undefined}
            </p>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />

            <Separator />
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <p className="font-semibold">
                  Category: {article.category?.name || "undefined"}
                </p>
              </div>
              <div className="flex flex-col gap-1 text-sm text-gray-500 sm:flex-row">
                <p>Created: {formatDate(article.createdAt)}</p>
                <p>Updated: {formatDate(article.updatedAt)}</p>
                <p>Published: {formatDate(article.publishedAt)}</p>
              </div>
            </div>
          </Card>

          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Show {article.comments?.length} Comments
              </AccordionTrigger>
              <AccordionContent>
                {article.comments && article.comments.length > 0 ? (
                  <div className="space-y-2">
                    {article.comments?.map((comment) => (
                      <Card key={comment.id} className="p-4">
                        <p className="text-sm font-semibold">
                          {comment.user?.username || "Anon"}
                        </p>
                        <p className="text-sm text-gray-700">
                          {comment.content}
                        </p>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Belum ada komentar.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <p>Artikel tidak ditemukan.</p>
      )}
    </>
  );
};

export default DetailArticles;
