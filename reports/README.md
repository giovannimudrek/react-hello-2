# Task View — Trello-style Kanban Board

A pixel-perfect Kanban task management application built from a Figma design using React 18, TypeScript, Tailwind CSS, Zustand and @dnd-kit. The interface replicates a Trello-style board with drag-and-drop columns, task cards, modals for CRUD operations, real-time search and tab filters.

---

## Features

- Kanban board with three columns: Backlog, Pendentes (Pending) and Concluidas (Done)
- Drag-and-drop cards between columns powered by @dnd-kit
- Create, edit, delete and duplicate task cards
- Real-time search with debouncing in the header
- Tab filters: All / Pending / Done
- Global state management with Zustand
- Lazy-loaded modals for Add Card, Edit Card and Delete Card
- Sidebar navigation with Home, Notifications, My Tasks, Analytics and Board items
- Member avatar groups per card with assignee support
- Tag labels (Urgente, Interno, Feature, Design) with color variants (red, yellow, green)
- Subtask progress bar and attachment / comment counters per card
- Responsive layout with Inter font and brand purple color tokens
- Strict TypeScript throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| State management | Zustand 4 |
| Drag and drop | @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities |
| Build tool | Vite 5 |
| CSS post-processing | PostCSS + Autoprefixer |

---

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x (or yarn / pnpm equivalent)

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-folder>

# Install dependencies
npm install
```

---

## Running the Project

### Development server

```bash
npm run dev
```

Vite starts a local dev server at `http://localhost:5173` with hot module replacement.

### Production build

```bash
npm run build
```

Runs `tsc` type-checking then bundles to `dist/`.

### Preview production build locally

```bash
npm run preview
```

Serves the `dist/` folder at `http://localhost:4173`.

---

## Project Structure

```
.
├── index.html                        # App entry point (mounts #root)
├── package.json                      # Dependencies and scripts
├── vite.config.ts                    # Vite configuration
├── tailwind.config.js                # Tailwind theme tokens
├── tsconfig.json                     # TypeScript root config
├── tsconfig.node.json                # TypeScript config for Vite config file
├── postcss.config.js                 # PostCSS plugins
├── reports/                          # Pipeline reports and audit outputs
└── src/
    ├── main.tsx                      # React entry — mounts BoardingPage
    ├── styles/
    │   └── globals.css               # Tailwind directives + scrollbar utilities
    ├── types/
    │   └── index.ts                  # Shared TypeScript interfaces
    ├── store/
    │   └── boardStore.ts             # Zustand store — board state + all actions
    ├── pages/
    │   └── BoardingPage.tsx          # Main page: Header + Sidebar + KanbanBoard + Modals
    └── components/
        ├── Header/
        │   └── Header.tsx            # Top bar: logo, search, avatars, notifications
        ├── Sidebar/
        │   └── Sidebar.tsx           # Left navigation (204px fixed width)
        ├── KanbanBoard/
        │   ├── KanbanBoard.tsx       # DnD context, column layout, drag overlay
        │   └── FilterTabs.tsx        # Todos / Pendentes / Concluidas tabs
        ├── Column/
        │   └── Column.tsx            # Single Kanban column with droppable zone
        ├── Card/
        │   └── Card.tsx              # Task card: tags, dates, subtasks, assignees, menu
        ├── Modals/
        │   ├── AddCardModal.tsx      # Create new task modal
        │   ├── EditCardModal.tsx     # Edit existing task modal
        │   └── DeleteCardModal.tsx   # Confirm delete modal
        └── Common/
            └── icons.tsx             # Inline SVG icon library
```

---

## Key Design Tokens

These tokens are defined in `tailwind.config.js` and used consistently throughout the application:

| Token | Value | Usage |
|---|---|---|
| `brand.DEFAULT` | `#7F56D9` | Primary brand purple |
| `brand.light` | `#F4EBFF` | Hover backgrounds |
| `brand.dark` | `#6941C6` | Active states |
| `text-primary` | `#0A0D12` | Main text |
| `text-secondary` | `#414651` | Secondary text |
| `text-tertiary` | `#717680` | Muted labels |
| `border` | `#E9EAEB` | Default borders |

---

## State Management

The Zustand store (`src/store/boardStore.ts`) holds the complete board state and exposes the following actions:

| Action | Description |
|---|---|
| `setSearchQuery(q)` | Update the real-time search filter |
| `toggleSidebar()` | Show or hide the sidebar |
| `setActiveTab(tab)` | Switch between All / Pending / Done tabs |
| `openModal(type, columnId?, card?)` | Open Add, Edit or Delete modal |
| `closeModal()` | Dismiss the active modal |
| `addCard(columnId, card)` | Add a new card to a column |
| `updateCard(columnId, cardId, updates)` | Partially update a card |
| `deleteCard(columnId, cardId)` | Remove a card from a column |
| `duplicateCard(columnId, cardId)` | Clone an existing card |
| `moveCard(cardId, from, to, overId?)` | Move a card via drag-and-drop |
| `addColumn(name)` | Add a new column to the board |
| `deleteColumn(columnId)` | Remove a column and all its cards |

---

## Data Model

```typescript
interface Card {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subtasks: { completed: number; total: number };
  tags: Tag[];
  assignees: string[];     // Member ids
  attachmentCount: number;
  commentCount: number;
}

interface Column {
  id: string;
  name: string;
  taskCount: number;
  cards: Card[];
}

interface Board {
  id: string;
  name: string;
  members: Member[];
  columns: Column[];
}
```

---

## Design Source

The UI was generated pixel-perfect from the Figma file:

**Ferramenta Trello** — node-id `1:2`
`https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=1-2`

---

## Contributing

1. Create a feature branch from `main`: `git checkout -b feat/your-feature`
2. Follow the existing component structure and naming conventions (PascalCase for components, camelCase for utilities, kebab-case for CSS classes)
3. Keep TypeScript strict — no `any` types
4. Use Tailwind utility classes; avoid inline styles
5. Run `npm run build` to verify there are no type errors before opening a pull request
6. Open a pull request targeting `main` with a clear description of what changes were made and why

---

## License

This project is private. All rights reserved.
