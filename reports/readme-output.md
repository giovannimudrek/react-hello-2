# Task View — Trello-style Kanban Board

A Kanban task management application built with React 18, TypeScript, Tailwind CSS, Zustand and @dnd-kit. The UI is generated pixel-perfect from a Figma design and supports drag-and-drop, real-time search, CRUD modals and column-based task filtering.

---

## Features

- Three-column Kanban board: Backlog, Pendentes (In Progress), Concluidas (Done)
- Drag and drop cards between columns using @dnd-kit
- Real-time search with 300ms debounce
- Filter tabs: All / Pendentes / Concluidas
- Add, edit and delete task cards via modal dialogs
- Task cards with title, description, due date, tags, progress bar and assignee avatars
- Persistent state managed by Zustand store
- Responsive layout — mobile-first with Tailwind CSS
- Pixel-perfect implementation based on Figma design (node 1-2)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| State Management | Zustand 4 |
| Drag and Drop | @dnd-kit/core + @dnd-kit/sortable |
| Build Tool | Vite 5 |
| Package Manager | npm |

---

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

---

## Installation

Clone the repository and install dependencies.

```bash
git clone <repository-url>
cd <repository-folder>
npm install
```

---

## Usage

### Development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production build

```bash
npm run build
```

The compiled output is written to the `dist/` directory.

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```
.
├── index.html                      # Vite HTML entry point
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── reports/                        # Agent-generated implementation reports
└── src/
    ├── main.tsx                    # React entry — mounts <BoardingPage> on #root
    ├── styles/
    │   └── globals.css             # Tailwind base + scrollbar utilities + Inter font
    ├── types/
    │   └── index.ts                # Shared TypeScript interfaces
    ├── store/
    │   └── boardStore.ts           # Zustand store — board state + CRUD actions
    ├── pages/
    │   └── BoardingPage.tsx        # Root page: Header + Sidebar + KanbanBoard + Modals
    └── components/
        ├── Header/
        │   └── Header.tsx          # Top bar with logo, search, avatars and notification bell
        ├── Sidebar/
        │   └── Sidebar.tsx         # Left navigation (204px) with board links
        ├── KanbanBoard/
        │   ├── KanbanBoard.tsx     # DnD context, drag overlay, filter and search logic
        │   └── FilterTabs.tsx      # Tab switcher: All / Pendentes / Concluidas
        ├── Column/
        │   └── Column.tsx          # Kanban column with header, drop zone and card list
        ├── Card/
        │   └── Card.tsx            # Task card with tags, progress, assignees and context menu
        ├── Modals/
        │   ├── AddCardModal.tsx    # Create new task modal
        │   ├── EditCardModal.tsx   # Edit existing task modal
        │   └── DeleteCardModal.tsx # Delete confirmation modal
        └── Common/
            └── icons.tsx           # Inline SVG icon library
```

---

## Architecture Overview

The application follows a component-driven architecture with a single global Zustand store.

```
BoardingPage
├── Header          — search input updates boardStore.searchQuery
├── Sidebar         — navigation only, stateless
└── KanbanBoard     — reads boardStore, wraps DnD context
    ├── FilterTabs  — updates boardStore.activeTab
    ├── Column[]    — droppable zones, renders filtered cards
    │   └── Card[]  — draggable items, opens modal on action
    └── Modals      — Add / Edit / Delete — dispatch store actions
```

### State Management

All application state lives in `src/store/boardStore.ts` (Zustand). The store exposes:

- `board` — columns and cards data
- `searchQuery` — current search string
- `activeTab` — current filter tab
- `modal` — which modal is open and for which card
- Actions: `addCard`, `editCard`, `deleteCard`, `moveCard`, `setSearch`, `setActiveTab`, `openModal`, `closeModal`

### Drag and Drop

Implemented with `@dnd-kit/core` and `@dnd-kit/sortable`. The `KanbanBoard` component handles `onDragStart`, `onDragOver` and `onDragEnd` events and calls `moveCard` on the store when a card is dropped into a new column.

---

## Design Reference

The UI was implemented from the Figma file:

```
https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=1-2
```

### Layout Dimensions

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER — 56px height, px-6, bg-white, border-b #E9EAEB        │
│  Logo (32px) + "Task View" | Search (320px) | Avatars + Bell   │
└─────────────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────────────────────┐
│              │  Content px-6 pt-6                               │
│   SIDEBAR    │  FilterTabs: All | Pendentes | Concluidas        │
│   204px      │  AvatarGroup (5 avatars + "+N" + add button)     │
│  bg-white    │                                                   │
│  border-r    │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│              │  │ Backlog  │ │Pendentes │ │Concluidas│        │
│  Home        │  │ 4 cards  │ │ 2 cards  │ │ 3 cards  │        │
│  Notif       │  └──────────┘ └──────────┘ └──────────┘        │
│  My Tasks    │                                                   │
│  Analytics   │  Drag & Drop between columns via @dnd-kit        │
│  Board       │  Real-time search (debounced 300ms)              │
└──────────────┴──────────────────────────────────────────────────┘
```

---

## Contributing

1. Create a branch from `main` using the convention `feature/<short-description>` or `fix/<short-description>`.
2. Make your changes following the code conventions below.
3. Open a pull request targeting `main` with a clear title and description.

### Code Conventions

- Components: PascalCase filename and export, one component per file
- CSS classes: Tailwind utility-first; custom classes in kebab-case when needed
- Store actions: camelCase verbs (`addCard`, `moveCard`)
- TypeScript: all props and store shapes must be explicitly typed in `src/types/index.ts`
- No default exports from store or utility files — use named exports
- Commits follow the Conventional Commits format: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`

---

## Reports

Agent-generated implementation and audit reports are stored in the `reports/` directory.

| File | Description |
|---|---|
| `reports/boarding_screen_implementation.md` | Full implementation report for the Kanban boarding screen |
| `reports/readme-output.md` | Copy of this README generated by the Figma-to-Code agent |

---

## License

This project is private. All rights reserved.
