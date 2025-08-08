import type { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ArticlePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const ArticlePagination: FC<ArticlePaginationProps> = ({
  currentPage,
  totalPages,
  onPageClick,
  onPrev,
  onNext,
}) => {
  const visiblePages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page >= 1 && page <= totalPages,
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onPrev}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={`page-${page}`}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageClick(page)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={onNext}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ArticlePagination;
