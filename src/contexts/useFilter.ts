import { useContext } from "react";
import { FilterContext } from "./FilterContext";

export const useFilter = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be used within FilterProvider");
  return ctx;
};
