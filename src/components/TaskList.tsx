import React from "react";
import { useTasks } from "../contexts/useTask";
import { useFilter } from "../contexts/useFilter";
import { TaskItem } from "./TaskItem";

export const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  const { selectedPriority, searchQuery } = useFilter();

  const filtered = React.useMemo(() => {
    return tasks.filter((t) => {
      if (selectedPriority !== "All" && t.priority !== selectedPriority)
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !t.title.toLowerCase().includes(q) &&
          !t.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [tasks, selectedPriority, searchQuery]);

  if (!filtered.length) return <div className="empty">No tasks found.</div>;

  return (
    <div className="task-list">
      {filtered.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </div>
  );
};
