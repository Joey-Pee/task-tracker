import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { TasksProvider } from "../contexts/TasksProvider";
import { FilterProvider } from "../contexts/FilterProvider";
import { TaskList } from "../components/TaskList";
import { FilterDropdown } from "../components/FilterDropdown";
import { STORAGE_KEY } from "../contexts/TaskContext";

const sampleTasks = [
  {
    id: "t1",
    title: "Learn",
    description: "Learn for interview",
    priority: "Medium",
    createdAt: 1,
  },
  {
    id: "t2",
    title: "Fix bug",
    description: "Issue #12",
    priority: "High",
    createdAt: 2,
  },
];

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TasksProvider>
      <FilterProvider>{children}</FilterProvider>
    </TasksProvider>
  );
}

describe("Task lists and filtering", () => {
  beforeEach(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks));
  });

  it("renders all tasks and filters by priority", () => {
    render(
      <Providers>
        <FilterDropdown />
        <TaskList />
      </Providers>
    );

    expect(screen.getByText("Learn")).toBeDefined();
    expect(screen.getByText("Fix bug")).toBeDefined();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "High" },
    });

    expect(screen.queryByTestId("Learn")).toBeNull();
    expect(screen.getByText("Fix bug")).toBeDefined();
  });
});
