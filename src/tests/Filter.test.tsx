import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FilterProvider } from "../contexts/FilterProvider";
import { FilterDropdown } from "../components/FilterDropdown";

describe("FilterDropdown", () => {
  it("changes selected priority in context", () => {
    render(
      <FilterProvider>
        <FilterDropdown />
      </FilterProvider>
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Low" } });
    expect((select as HTMLSelectElement).value).toBe("Low");
  });
});
