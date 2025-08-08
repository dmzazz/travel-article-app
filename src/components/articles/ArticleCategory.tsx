import type { FC } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

interface ArticleCategoryProps {
  categories: { id: number; name: string }[];
  setCategoryName: (name: string) => void;
}

const ArticleCategory: FC<ArticleCategoryProps> = ({
  categories,
  setCategoryName,
}) => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  return (
    <Select
      value={selectedCategory || "all"}
      onValueChange={(value) => {
        if (value === "all") {
          setCategoryName("");
        } else {
          setCategoryName(value);
        }
      }}
    >
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Pilih Kategori" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua Kategori</SelectItem>
        {/* Reset option */}
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ArticleCategory;
