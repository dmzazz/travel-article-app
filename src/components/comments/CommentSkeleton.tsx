import { Skeleton } from "@/components/ui/skeleton";

const CommentSkeleton = () => (
  <div className="mb-4 space-y-2 rounded border bg-white p-4 shadow">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-3 w-3/4" />
    <Skeleton className="h-3 w-1/4" />
  </div>
);

export default CommentSkeleton;
