import React from "react";
import { useFilter } from "../contexts/useFilter";

type SelectedPriority = "All" | "Low" | "Medium" | "High";

export const FilterDropdown: React.FC = () => {
  const { selectedPriority, setSelectedPriority } = useFilter();

  return (
    <label className="filter">
      <span>Priority:</span>
      <select
        value={selectedPriority}
        onChange={(e) =>
          setSelectedPriority(e.target.value as SelectedPriority)
        }
      >
        <option value="All">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </label>
  );
};
