# Architecture Decisions

_Agents will append decisions here during development._

---

## 2026-03-23 — US-1: Kanban Board as Single HTML File

**Decision:** Implement the Kanban board as a self-contained `index.html` with inline CSS and JavaScript, with no build tooling or external dependencies.

**Rationale:** The project (`react-hello-2`) started as a plain `index.html` with no `package.json`, no bundler, and no framework installed. The task directory `tasks/1/` did not exist at the time of implementation (spec step had not run), so the scope was inferred from: (a) the KAN Jira project theme (Trello-like Kanban board), (b) the CLAUDE.md pipeline (DEV step), and (c) the existing project structure. Rather than introducing a build pipeline without a spec, the simplest approach that delivers a working, visually complete Kanban board was chosen. This avoids breaking a working project while providing all core features: drag-and-drop, card CRUD, column management, search, filters, and toast notifications with undo.

**Key choices:**
- No external JS libraries; native HTML5 drag-and-drop API
- Design tokens via CSS custom properties aligned with Figma Ferramenta-Trello color system
- Column capacity limits with visual error feedback (red border + toast) for drag-and-drop validation
- Undo support via toast action button restoring in-memory state
