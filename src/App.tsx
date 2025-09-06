import React from "react";
import { FilterDropdown } from "./components/FilterDropdown";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import { Modal } from "./components/Modal";

export default function App() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>Task Tracker</h1>
        </header>

        <section className="filterAndSearch">
          <FilterDropdown />
          <SearchBar />
          <button onClick={() => setIsCreateOpen(true)}>Add New Task</button>
        </section>

        <section className="list">
          <h2>Your tasks</h2>
          <TaskList />
        </section>
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add a task"
      >
        <TaskForm onClose={() => setIsCreateOpen(false)} />
      </Modal>
    </div>
  );
}
