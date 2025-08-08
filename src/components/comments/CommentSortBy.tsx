import type { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommentSortByProps {
  value: string;
  onChange: (val: string) => void;
}

const CommentSortBy: FC<CommentSortByProps> = ({ value, onChange }) => (
  <div className="mb-6 flex items-center gap-2">
    <span className="text-sm font-medium">Sort berdasarkan:</span>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select sorting option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="createdAt:desc">Tanggal dibuat (Terbaru)</SelectItem>
        <SelectItem value="createdAt:asc">Tanggal dibuat (Terlama)</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default CommentSortBy;
