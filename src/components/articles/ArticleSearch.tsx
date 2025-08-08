import type { FC } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ArticleSearchProps {
  searchTitle: string;
  setSearchTitle: (value: string) => void;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const ArticleSearchBar: FC<ArticleSearchProps> = ({
  searchTitle,
  setSearchTitle,
  handleSearch,
  handleKeyPress,
}) => {
  return (
    <>
      <div className="relative w-full sm:w-[20rem]">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
          <FiSearch />
        </span>
        <Input
          type="text"
          placeholder="Search title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10"
        />
      </div>

      <Button onClick={handleSearch} className="hover:cursor-pointer">
        Search
      </Button>
    </>
  );
};

export default ArticleSearchBar;
