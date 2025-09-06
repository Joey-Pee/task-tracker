import React from "react";
import type { Task } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TasksContext, STORAGE_KEY } from "./TaskContext";
import type { TasksContextValue } from "./TaskContext";

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);

  const addTask: TasksContextValue["addTask"] = (task) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 9),
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask: TasksContextValue["updateTask"] = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask: TasksContextValue["deleteTask"] = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const reorderTasks: TasksContextValue["reorderTasks"] = (startIndex, endIndex) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, reorderTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
