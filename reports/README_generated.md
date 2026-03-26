# react-hello-2

A self-contained, client-side Kanban board application built with vanilla HTML, CSS, and JavaScript — no build tools or external dependencies required. The project was bootstrapped from a simple Hello World page and evolved into a fully featured Trello-style task management interface driven by Figma designs.

---

## Technologies / Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Markup     | HTML5 (semantic elements)                    |
| Styling    | CSS3 (custom properties, Flexbox, Grid)      |
| Behaviour  | Vanilla JavaScript (ES6+)                    |
| Typography | Inter (Google Fonts)                         |
| Icons      | Inline SVG                                   |
| Drag & Drop| Native HTML5 Drag-and-Drop API               |
| Build      | None — single `index.html`, zero dependencies|
| CI / CD    | GitHub Actions (not configured)              |

The design source of truth is a Figma file using the **Ferramenta-Trello** color system. All design tokens (colors, spacing, typography) are exposed as CSS custom properties in `:root`.

---

## Project Structure

```
react-hello-2/
├── index.html                   # Application entry point (all HTML, CSS, JS inline)
├── .fusion-plugin/              # FusionCode squad plugin configuration
│   ├── .claude-plugin/
│   │   └── plugin.json          # Plugin metadata (name, version)
│   ├── .mcp.json                # MCP server config (Figma + Jira integrations)
│   └── skills/                  # Agent skill definitions
│       ├── analyze-codebase/
│       ├── close-issue/
│       ├── code-review/
│       ├── create-issue/
│       ├── db-migration/
│       ├── deploy-check/
│       ├── figma-extract/
│       ├── git-commit/
│       ├── git-push-pr/
│       ├── jira-sync/
│       ├── mobile-news/
│       ├── report-accessibility/
│       ├── squad/
│       └── test-runner/
└── reports/                     # Generated agent reports
```

---

## Features

- **Kanban board** with three default columns: To Do, In Progress, Done
- **Native HTML5 drag-and-drop** with visual feedback (column highlight, card opacity)
- **Column capacity validation** — red border and error toast when the card limit is exceeded
- **Card CRUD** — create, edit, and delete cards via modal dialog
- **Undo on delete** — toast notification with an action button to restore the last removed card
- **Real-time search** filtering across all cards
- **Tab filters** — All / Pending / Completed views
- **Dynamic columns** — add new columns at runtime
- **Labels and assignees** per card
- **Due dates** (ISO `YYYY-MM-DD` format)
- **Toast notification system** with auto-dismiss
- **Design tokens** aligned to the Figma Ferramenta-Trello color system (purple brand `#7f56d9`)

---

## Setup and Installation

No build step is required. The entire application runs directly in the browser.

### Prerequisites

- Any modern browser (Chrome, Firefox, Safari, Edge)
- A local HTTP server (optional, but recommended to avoid CORS restrictions on local fonts)

### Running locally

**Option 1 — Open directly**

```bash
open index.html
```

**Option 2 — Simple HTTP server (Python)**

```bash
python3 -m http.server 8080
# then open http://localhost:8080 in your browser
```

**Option 3 — Simple HTTP server (Node.js)**

```bash
npx serve .
# then open the printed URL in your browser
```

---

## How to Run

| Task        | Command                     |
|-------------|-----------------------------|
| Dev server  | `npx serve .`               |
| Build       | N/A (no build step)         |
| Tests       | N/A (no test suite yet)     |
| Lint        | N/A (no linter configured)  |

---

## API / Data Models

This is a fully client-side application. All state is managed in-memory via JavaScript. There is no backend or persistence layer. Data resets on page refresh.

### Card

| Field         | Type                | Description                                  |
|---------------|---------------------|----------------------------------------------|
| `id`          | `string`            | Unique identifier (e.g. `"c1"`)              |
| `colId`       | `string`            | Parent column identifier                     |
| `title`       | `string`            | Card title (required)                        |
| `description` | `string`            | Card description text                        |
| `due`         | `string` (ISO date) | Due date in `YYYY-MM-DD` format              |
| `labels`      | `Label[]`           | Array of label objects                       |
| `assignees`   | `string[]`          | Array of member initials                     |

### Label

| Field   | Type     | Allowed values                                                    |
|---------|----------|-------------------------------------------------------------------|
| `text`  | `string` | Display text                                                      |
| `style` | `string` | `"filled"`, `"outline"`, `"success"`, `"warning"`, `"error"`     |

### Column

| Field       | Type            | Description                              |
|-------------|-----------------|------------------------------------------|
| `id`        | `string`        | Unique identifier (e.g. `"col-1"`)       |
| `title`     | `string`        | Column display name                      |
| `badgeBg`   | `string` (hex)  | Badge background color                   |
| `badgeText` | `string` (hex)  | Badge text color                         |
| `filter`    | `string`        | `"pending"` or `"done"` — tab filter key |
| `limit`     | `number\|null`  | Maximum cards allowed in the column      |

---

## Architecture Overview

The application follows a **single-file, no-dependency** architecture. All concerns (HTML structure, CSS styles, and JavaScript logic) are co-located in `index.html`.

### Design Decisions

**Single HTML file** — The project started as a plain `index.html` with no `package.json` or bundler. Introducing a build pipeline without a formal spec would add unnecessary complexity. The self-contained approach delivers all required features while keeping the barrier to entry at zero.

**Native drag-and-drop** — The HTML5 Drag-and-Drop API is used directly to avoid pulling in third-party libraries. Drag events update in-memory state and re-render the affected columns.

**CSS custom properties** — All design tokens (colors, spacing, border radii, shadows) are declared in `:root` and reference the Figma Ferramenta-Trello color palette. This makes visual adjustments predictable and traceable back to the design source.

**In-memory state** — Data is held in plain JavaScript objects. No `localStorage`, IndexedDB, or remote persistence is used in the current version. The undo system for card deletion operates on a short-lived snapshot stored in a closure.

### Agent Pipeline (FusionCode Squad)

The project is operated by a squad of AI agents orchestrated through the `.fusion-plugin/` directory:

```
Figma to Code  →  Figma Audit
```

Each agent reads from and writes to `.pipeline/` during a run. Available skills include Figma extraction, code review, accessibility reporting, Jira sync, database migrations, deploy checks, and more. Agent configuration is in `.fusion-plugin/.mcp.json` and each skill is defined by a `SKILL.md` file inside `.fusion-plugin/skills/<skill-name>/`.

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Keep each pull request focused on a single concern.
3. Follow the CSS naming convention: **kebab-case** class names, descriptive and scoped to their component.
4. Do not introduce external dependencies without discussion — the zero-dependency constraint is intentional.
5. Align colors and spacing to the Figma design tokens already defined in `:root`.
6. Commit messages must follow the **Conventional Commits** format:

   ```
   <type>(<scope>): <short description>

   feat(board): add column reordering via drag-and-drop
   fix(modal): close on Escape key press
   docs(readme): update setup instructions
   ```

7. Open a pull request against `main` with a clear description of what changed and why.

---

## License

This project does not currently declare a license. All rights are reserved by the repository owner unless otherwise stated.
