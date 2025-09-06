import React, { useState } from "react";
import { useTasks } from "../contexts/useTask";
import { useFilter } from "../contexts/useFilter";
import { TaskItem } from "./TaskItem";

export const TaskList: React.FC = () => {
  const { tasks, reorderTasks } = useTasks();
  const { selectedPriority, searchQuery } = useFilter();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    // Find the actual indices in the original tasks array
    const sourceTask = filtered[draggedIndex];
    const destinationTask = filtered[dropIndex];
    
    const sourceOriginalIndex = tasks.findIndex(t => t.id === sourceTask.id);
    const destinationOriginalIndex = tasks.findIndex(t => t.id === destinationTask.id);

    reorderTasks(sourceOriginalIndex, destinationOriginalIndex);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (!filtered.length) return <div className="empty">No tasks found.</div>;

  return (
    <div 
      className="task-list"
      onDragOver={handleDragOver}
    >
      {filtered.map((task, index) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          isDragging={draggedIndex === index}
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};
