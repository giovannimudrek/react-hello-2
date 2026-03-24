# Board Specification - Quick Reference

## Project: Kanban Task Board (Trello-style)
**Date**: 2026-03-24 | **Status**: Spec Complete | **Build Tool**: Vite

---

## Core Stack

```
React 18 + TypeScript + Tailwind CSS
@dnd-kit (Drag/Drop) + Zustand (State) + TanStack Query (Data)
```

---

## Visual Design

### Colors (from Figma)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #7F56D9 | Buttons, focus, links |
| Dark | #0A0D12 | Dark text, accents |
| Secondary | #414651 | Secondary text |
| Light Gray | #F5F5F5 | Column bg, cards |
| Divider | #E9EAEB | Borders, separators |
| White | #FFFFFF | Main backgrounds |

### Typography
- **Font**: Inter (400, 500, 600, 700)
- **Body**: 14px/16px
- **Heading**: 20px-28px
- **Caption**: 12px

---

## Page Layout

```
┌─ HEADER (64px) ────────────────────────┐
│ Brand | Search Input | Avatar | Menu   │
├──────────┬──────────────────────────────┤
│          │     BOARD (3 COLUMNS)        │
│ SIDEBAR  │                              │
│ (240px)  │ • Backlog   • Pending        │
│          │   (cards)   (cards)          │
│          │           • Done (cards)     │
│          │                              │
└──────────┴──────────────────────────────┘
```

---

## Components Hierarchy

```
App
├── Header
│   ├── Brand (logo + "Task View")
│   ├── SearchInput (debounced, filterable)
│   ├── AvatarGroup (assignees)
│   └── UserMenu
├── Sidebar
│   ├── NavItems
│   ├── UserProfile
│   └── LogoutButton
└── Board
    ├── Column (Backlog)
    │   ├── ColumnHeader (title + count)
    │   └── Card[] (draggable)
    ├── Column (Pendentes)
    │   ├── ColumnHeader
    │   └── Card[]
    └── Column (Concluídas)
        ├── ColumnHeader
        └── Card[]
```

---

## Card Component

```
┌─────────────────────────┐
│ 🔴 Task Title (priority)│
├─────────────────────────┤
│ Task description text.. │
├─────────────────────────┤
│ 🏷️ Label  📅 Due date   │
├─────────────────────────┤
│ 👤 Assignees    💬 2     │
└─────────────────────────┘
```

**States**: Normal | Hover | Dragging | Selected

---

## Key Features

1. **Drag & Drop**: Cards between columns (@dnd-kit)
2. **Search**: Real-time filtering on title/description
3. **Edit Modal**: Update task properties
4. **Delete Modal**: Confirm before delete
5. **Avatar Group**: Show assignees (max 4 visible)
6. **Priority Badge**: Low/Medium/High with colors
7. **Undo/Redo**: History of last 10 actions
8. **Responsive**: Mobile (1 col), Tablet (2 col), Desktop (3 col)

---

## API Endpoints (to implement)

```
GET    /api/columns         → List columns
GET    /api/tasks           → List tasks
POST   /api/tasks           → Create task
PUT    /api/tasks/:id       → Update task
DELETE /api/tasks/:id       → Delete task
PUT    /api/tasks/:id/column → Move task
```

---

## File Structure

```
src/
├── components/Board/Column/Card/Header/Sidebar/Modals
├── hooks/useBoardData.ts, useDragDrop.ts, useSearch.ts
├── stores/boardStore.ts, uiStore.ts, historyStore.ts
├── api/client.ts, taskApi.ts
├── types/task.ts, column.ts, user.ts
├── utils/colors.ts, validation.ts, formatters.ts
├── styles/globals.css (Tailwind)
├── App.tsx
└── main.tsx
```

---

## Responsive Breakpoints

| Device | Width | Columns | Sidebar |
|--------|-------|---------|---------|
| Mobile | <640px | 1 | Drawer |
| Tablet | 640-1024px | 2 | Collapsed |
| Desktop | >1024px | 3 | Fixed |

---

## Acceptance Criteria (Key)

- [ ] Board renders with header, sidebar, 3 columns
- [ ] Drag & drop works between columns
- [ ] Search filters cards in real-time
- [ ] Edit modal updates task
- [ ] Delete shows confirmation
- [ ] Responsive on all breakpoints
- [ ] Colors match Figma palette exactly
- [ ] Typography uses Inter 14px/16px
- [ ] Loading/error states handled
- [ ] WCAG 2.1 AA accessibility
- [ ] 80%+ test coverage
- [ ] Performance <100ms render

---

## TypeScript Interfaces (Main)

```typescript
interface Task {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  assignees: User[];
  labels: Label[];
  dueDate?: string;
  position: number;
}

interface Column {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
}

interface BoardState {
  columns: Column[];
  tasks: Task[];
  searchQuery: string;
  loading: boolean;
  // Actions: setColumns, updateTask, moveCard, etc.
}
```

---

## Next Steps

1. ✅ Spec approved
2. ⏳ Project setup (Vite + dependencies)
3. ⏳ Build base components
4. ⏳ Connect API (mock server)
5. ⏳ Add tests
6. ⏳ QA & deploy

---

**Full Spec**: See `SPEC.md` (909 lines, 25KB)
**Figma Link**: https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello
