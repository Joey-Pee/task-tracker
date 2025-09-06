import React from "react";
import { useFilter } from "../contexts/useFilter";

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useFilter();
  return (
    <div className="search">
      <input
        placeholder="Search by title or description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
