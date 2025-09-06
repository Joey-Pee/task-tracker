import { createContext } from "react";
import type { Task } from "../types/types";

export type TasksContextValue = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ) => void;
  deleteTask: (id: string) => void;
};

export const TasksContext = createContext<TasksContextValue | undefined>(
  undefined
);

export const STORAGE_KEY = "task-tracker.tasks";
