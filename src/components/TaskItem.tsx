import React, { useState } from "react";
import type { Task } from "../types/types";
import { useTasks } from "../contexts/useTask";
import { TaskForm } from "./TaskForm";
import { Modal } from "./Modal";

interface TaskItemProps {
  task: Task;
  isDragging?: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  isDragging = false, 
  onDragStart, 
  onDrop, 
  onDragEnd 
}) => {
  const { deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const handleConfirmDelete = () => {
    deleteTask(task.id);
    setConfirmDelete(false);
  };

  const formattedDate = new Date(task.createdAt).toLocaleString();

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={`task-item ${isDragging ? 'dragging' : ''}`}
    >
      <div className="meta">
        <h3>{task.title}</h3>
        <div className="priority">{task.priority}</div>
      </div>
      <p className="mainDesc">{task.description}</p>
      <div className="task-actions">
        <div>
          <button className="view" onClick={() => setIsViewing(true)}>
            View
          </button>
        </div>

        <div className="task-actions-right">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button className="danger" onClick={() => setConfirmDelete(true)}>
            Delete
          </button>
        </div>
      </div>
      
      <Modal
        isOpen={isViewing}
        onClose={() => setIsViewing(false)}
        title="Task details"
      >
        <div className="task-details">
          <div className="meta" style={{ marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>{task.title}</h3>
            <div className="priority">{task.priority}</div>
          </div>
          {task.description && (
            <p className="desc" style={{ marginTop: 4 }}>
              {task.description}
            </p>
          )}
          <div className="muted" style={{ fontSize: 12, marginTop: 10 }}>
            Created: {formattedDate}
          </div>
          <div className="actions" style={{ marginTop: 12 }}>
            <button className="muted" onClick={() => setIsViewing(false)}>
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit task"
      >
        <TaskForm initial={task} onClose={() => setIsEditing(false)} />
      </Modal>

      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete task?"
      >
        <p style={{ marginBottom: 12 }}>
          This action cannot be undone. Are you sure you want to delete
          <strong> {task.title}</strong>?
        </p>
        <div className="actions">
          <button className="danger" onClick={handleConfirmDelete}>
            Delete
          </button>
          <button className="muted" onClick={() => setConfirmDelete(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
