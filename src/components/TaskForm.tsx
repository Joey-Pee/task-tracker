import React, { useState } from "react";
import type { Priority, Task } from "../types/types";
import { useTasks } from "../contexts/useTask";

type Props = {
  initial?: Partial<Task>;
  onClose?: () => void;
};

export const TaskForm: React.FC<Props> = ({ initial = {}, onClose }) => {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState(initial.title ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [priority, setPriority] = useState<Priority>(
    (initial.priority as Priority) ?? "Medium"
  );

  const isEdit = !!initial.id;
  const isValid = title.trim().length > 0 && description.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    if (isEdit) {
      updateTask(initial.id!, { title, description, priority });
      if (onClose) {
        onClose();
      }
    } else {
      addTask({ title, description, priority });
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        aria-required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <div className="actions">
        <button type="submit" disabled={!isValid}>
          {isEdit ? "Save" : "Add Task"}
        </button>
        {isEdit && (
          <button
            type="button"
            className="muted"
            onClick={() => onClose && onClose()}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
