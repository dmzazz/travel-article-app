// components/category/CategoryItem.tsx

import { Button } from "@/components/ui/button";
import type { CategoryType } from "@/types";

interface CategoryItemProps {
  categories: CategoryType[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <ul className="space-y-2">
      {categories.map((cat) => (
        <li
          key={cat.id}
          className="flex items-center justify-between rounded border p-2"
        >
          <span>{cat.name}</span>
          <div className="space-x-2">
            <Button size="sm" onClick={() => onEdit(cat.documentId!)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(cat.documentId!)}
            >
              Hapus
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryItem;
