import { createContext } from "react";

export type SelectedPriority = "All" | "Low" | "Medium" | "High";

export type FilterContextValue = {
  selectedPriority: SelectedPriority;
  setSelectedPriority: (p: SelectedPriority) => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
};

export const FILTER_KEY = "task-tracker.filter";

export const FilterContext = createContext<FilterContextValue | undefined>(
  undefined
);
