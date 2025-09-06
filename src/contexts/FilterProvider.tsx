import React, { useEffect, useState } from "react";
import { FilterContext, FILTER_KEY } from "./FilterContext";
import type { SelectedPriority } from "./FilterContext";

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<SelectedPriority>(
    () => {
      try {
        const raw = localStorage.getItem(FILTER_KEY);
        return raw ? (JSON.parse(raw) as SelectedPriority) : "All";
      } catch {
        return "All";
      }
    }
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    try {
      localStorage.setItem(FILTER_KEY, JSON.stringify(selectedPriority));
    } catch (e) {
      console.error("Filter persist error", e);
    }
  }, [selectedPriority]);

  return (
    <FilterContext.Provider
      value={{
        selectedPriority,
        setSelectedPriority,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
