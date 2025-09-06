import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TasksProvider } from "./contexts/TasksProvider.tsx";
import { FilterProvider } from "./contexts/FilterProvider.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasksProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </TasksProvider>
  </StrictMode>
);
