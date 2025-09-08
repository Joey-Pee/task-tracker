## Task Tracker

### Overview
- **Stack**: React 19 + TypeScript + Vite, tested with Vitest and Testing Library.
- **Approach**: Clean component structure with Context-based state management. Tasks are persisted to `localStorage` via a small `useLocalStorage` hook, keeping the app fast and dependency-light. Filtering (by priority) and searching are managed in a separate provider to keep concerns isolated and components predictable.

### Run locally
   
1. Clone the repository
    ```bash
    git clone https://github.com/Joey-Pee/task-tracker.git
    cd task-tracker
    ````

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Then open the printed local URL (e.g., `http://localhost:5173`).
4. Run tests:
   ```bash
   npm test
   ```


### Code structure
- `src/components/`: Presentation and UI logic
  - `TaskList`, `TaskItem`, `TaskForm`, `SearchBar`, `FilterDropdown`, `Modal`
- `src/contexts/`: Contexts and providers
  - `TasksProvider` and `TaskContext` for task CRUD and ordering
  - `FilterProvider` and `FilterContext` for priority filter and search query
  - Hooks `useTask` and `useFilter` provide typed, ergonomic accessors
- `src/hooks/useLocalStorage.ts`: Simple persistence abstraction for tasks
- `src/types/types.ts`: Centralized TypeScript types
- `src/tests/`: Component tests using Vitest + Testing Library

### State management
- **Tasks state** lives in `TasksProvider` (`src/contexts/TasksProvider.tsx`). It exposes:
  - `tasks`: array of tasks (persisted with `localStorage` under a single key)
  - `addTask`, `updateTask`, `deleteTask`, `reorderTasks`: pure, immutable operations
  - New tasks get a stable id and a `createdAt` timestamp.
- **Filter/search state** lives in `FilterProvider` (`src/contexts/FilterProvider.tsx`). It exposes:
  - `selectedPriority` with persistence to `localStorage`
  - `searchQuery` for quick client-side filtering
- **Why Context**: Keeps global app state cohesive without prop drilling. Splitting tasks and filters into separate providers isolates concerns and avoids unnecessary rerenders.

