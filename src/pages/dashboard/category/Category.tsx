import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategory } from "@/hooks/useCategory";

import CategoryPagination from "@/components/category/CategoryPagination";
import CategoryItem from "@/components/category/CategoryItem";

const Category: React.FC = () => {
  const {
    categories,
    currentCategories,
    editId,
    setEditId,
    currentPage,
    handlePageChange,
    totalPages,
    loading,
    register,
    handleSubmit,
    onSubmit,
    reset,
    handleEdit,
    handleDelete,
  } = useCategory();

  return (
    <div className="container space-y-6 pt-16">
      <h1 className="text-xl font-bold">
        {editId ? "Edit Kategori" : "Tambah Kategori"}
      </h1>

      {loading ? (
        <>
          <Skeleton className="h-10 w-[250px]" />
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 className="mt-6 mb-2 font-semibold">List Kategori</h2>
            <Select>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center space-x-4"
          >
            <Input
              type="text"
              placeholder="Nama kategori"
              {...register("name", { required: true })}
              className="w-[250px]"
            />
            <Button type="submit">{editId ? "Update" : "Tambah"}</Button>
            {editId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setEditId(null);
                }}
              >
                Batal
              </Button>
            )}
          </form>

          <div>
            <h2 className="mt-6 font-semibold">Daftar Kategori</h2>
            <ul className="space-y-2">
              <CategoryItem
                categories={currentCategories}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </ul>
          </div>

          {totalPages > 1 && (
            <CategoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Category;
