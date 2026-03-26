# Squad Project — Figma to Code Pipeline

A multi-agent automation platform that converts Figma designs into production-ready frontend code. The project orchestrates a squad of specialized AI agents, each responsible for a stage of the design-to-code pipeline, from design extraction to accessibility auditing.

---

## Overview

This project is a squad-based AI pipeline built on top of Claude Code (Anthropic). It reads a Figma file, extracts design tokens, generates semantic HTML/CSS, audits accessibility, manages GitHub issues, integrates with Jira, and handles git workflows — all autonomously.

The platform is designed for frontend teams that want to accelerate the transition from design to implementation without losing fidelity to the original Figma spec.

---

## Tech Stack

| Layer | Technology |
|---|---|
| AI Agent Runtime | Claude Code (claude-sonnet-4-6) |
| Design Source | Figma (via MCP — `mcp-figma`) |
| Project Management | Jira (via MCP — `mcp-atlassian`) |
| Version Control | Git + GitHub (`gh` CLI) |
| Frontend Output | HTML5 + CSS3 (vanilla, no frameworks) |
| React Output | React + TypeScript + Tailwind CSS |
| Node runtime | Node.js (for `fusion.js` CLI) |
| Shell | zsh / bash |

---

## Project Structure

```
repo/
├── index.html                     # Entry point (Hello World / generated output)
├── README.md                      # This file
├── reports/                       # Agent-generated reports
│   └── README_generated.md        # Copy of this README
└── .fusion-plugin/                # Plugin configuration and skills
    ├── .claude-plugin/
    │   └── plugin.json            # Plugin metadata (name, version)
    ├── .mcp.json                  # MCP server config (Figma + Jira tokens)
    └── skills/                    # Agent skill definitions
        ├── analyze-codebase/      # Analyzes project structure and dependencies
        ├── close-issue/           # Closes GitHub issues and cleans branches
        ├── code-review/           # Reviews code quality, security, best practices
        ├── create-issue/          # Creates GitHub issues
        ├── db-migration/          # Manages database migrations (TypeORM/Prisma/Knex)
        ├── deploy-check/          # Pre-deploy checklist (build, lint, tests, types)
        ├── figma-extract/         # Extracts design data from Figma via MCP
        ├── git-commit/            # Stages and commits with semantic messages
        ├── git-push-pr/           # Pushes branch and opens GitHub/GitLab PR
        ├── jira-sync/             # Syncs status and comments with Jira via MCP
        ├── mobile-news/           # Fetches recent mobile tech news
        ├── report-accessibility/  # WCAG 2.2 accessibility audit, outputs HTML report
        ├── squad/                 # Runs the full agent squad pipeline
        └── test-runner/           # Detects and runs tests (Jest, Playwright, Vitest)
```

---

## Agent Pipeline

The squad runs in the following order:

```
Figma to Code  →  Figma Audit
```

1. **Figma to Code** — Extracts the Figma design and generates pixel-perfect HTML/CSS (or React/TS/Tailwind).
2. **Figma Audit** — Audits the generated code for accessibility and design fidelity.

Each skill is defined in `.fusion-plugin/skills/<skill-name>/SKILL.md` and can also be triggered individually.

---

## Setup and Installation

### Prerequisites

- Node.js (v18+)
- Git
- GitHub CLI (`gh`) — authenticated
- Python with `uvx` (for Jira MCP)
- Figma personal access token
- Jira API token

### Clone the repository

```bash
git clone <repository-url>
cd repo
```

### Configure MCP credentials

Edit `.fusion-plugin/.mcp.json` with your own tokens:

```json
{
  "mcpServers": {
    "jira": {
      "args": ["mcp-atlassian"],
      "type": "stdio",
      "command": "uvx",
      "env": {
        "JIRA_URL": "https://your-org.atlassian.net/",
        "JIRA_USERNAME": "your-email@example.com",
        "JIRA_API_TOKEN": "<your-jira-api-token>"
      }
    },
    "figma": {
      "args": ["-y", "mcp-figma"],
      "type": "stdio",
      "command": "npx",
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "<your-figma-token>"
      }
    }
  }
}
```

---

## How to Run

### Run the full squad pipeline

```bash
node cli/bin/fusion.js squad --cwd .
```

### Run individual skills via Claude Code

Each skill can be invoked as a command inside Claude Code. Examples:

| Command | Description |
|---|---|
| `figma-extract <figma-url>` | Extract design data from a Figma file |
| `squad <issue-number>` | Run the full squad pipeline for a GitHub issue |
| `git-commit` | Stage and commit with an auto-generated semantic message |
| `git-push-pr <title>` | Push branch and open a pull request |
| `create-issue <description>` | Create a new GitHub issue |
| `close-issue <number>` | Close a GitHub issue and clean up the branch |
| `deploy-check` | Run pre-deploy checks (build, lint, tests, types, deps) |
| `report-accessibility` | Run a WCAG 2.2 accessibility audit and generate HTML report |
| `db-migration create <name>` | Create a new database migration |
| `db-migration run` | Execute pending migrations |
| `code-review` | Review code for quality, security and best practices |
| `test-runner` | Detect and run the project's test suite |
| `analyze-codebase` | Analyze project structure, dependencies and architecture |
| `jira-sync <PROJ-123>` | Sync issue status or add a comment in Jira |
| `mobile-news` | Fetch a recent mobile tech news article |

---

## Generated Application — Task View Kanban Board

The latest output generated by the Figma to Code agent is a **Trello-style Kanban board** (`Task View`) built from the Figma file `Ferramenta Trello` (node `1-2`).

### Features

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

### Stack (generated output)

| Layer | Technology | Version |
|---|---|---|
| UI Library | React | ^18.3.0 |
| Language | TypeScript | ^5.3.0 |
| Styling | Tailwind CSS | ^3.4.0 |
| Build Tool | Vite | ^5.0.0 |
| State Management | Zustand | ^4.4.0 |
| Drag and Drop | @dnd-kit/core + sortable | ^6.3 / ^8.0 |

### Layout

```
┌─ HEADER (64px) ─────────────────────────────────────────────┐
│  Brand Logo  |  Search Input  |  Avatar Group  |  User Menu  │
├──────────────┬──────────────────────────────────────────────┤
│              │  Filter Tabs (All / Pending / Done)           │
│  SIDEBAR     ├──────────────────────────────────────────────┤
│  (240px)     │  KANBAN BOARD                                 │
│              │                                               │
│  Home        │  ┌─ Backlog ─┐  ┌─ Pendentes ┐  ┌─ Done ──┐ │
│  My Tasks    │  │  cards... │  │  cards...  │  │ cards.. │ │
│  Analytics   │  └───────────┘  └────────────┘  └─────────┘ │
│  Board       │                                               │
└──────────────┴──────────────────────────────────────────────┘
```

### Source structure (generated output)

```
src/
├── main.tsx
├── styles/globals.css
├── types/index.ts
├── store/boardStore.ts
├── pages/BoardingPage.tsx
└── components/
    ├── Header/Header.tsx
    ├── Sidebar/Sidebar.tsx
    ├── KanbanBoard/KanbanBoard.tsx
    ├── KanbanBoard/FilterTabs.tsx
    ├── Column/Column.tsx
    ├── Card/Card.tsx
    ├── Modals/AddCardModal.tsx
    ├── Modals/EditCardModal.tsx
    ├── Modals/DeleteCardModal.tsx
    └── Common/icons.tsx
```

### Run the Kanban app

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production bundle
```

### Figma source

```
https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=1-2
```

---

## Figma to Code — How It Works

1. Provide a Figma URL in the format:
   ```
   https://www.figma.com/design/<file_key>/<name>?node-id=<node_id>
   ```

2. The agent uses `mcp__figma__get_figma_data` to extract:
   - Layout (width, height, padding, gap)
   - Colors and design tokens
   - Typography (font family, size, weight, line-height)
   - Component hierarchy

3. It generates:
   - `index.html` — semantic HTML5 structure faithful to the design
   - `style.css` — pure CSS with custom properties for colors and fonts

4. Output rules:
   - Pixel-perfect replication of the Figma design
   - CSS custom properties (no frameworks)
   - Mobile-first and responsive
   - Descriptive kebab-case class names
   - Placeholder images with correct dimensions and alt text

---

## API / Data Models

This project does not expose a REST API. All state is managed client-side in-memory. The application integrates with two external APIs via MCP servers.

### Kanban Data Models

#### Card

| Field         | Type                | Description                                  |
|---------------|---------------------|----------------------------------------------|
| `id`          | `string`            | Unique identifier (e.g. `"c1"`)              |
| `colId`       | `string`            | Parent column identifier                     |
| `title`       | `string`            | Card title (required)                        |
| `description` | `string`            | Card description text                        |
| `due`         | `string` (ISO date) | Due date in `YYYY-MM-DD` format              |
| `labels`      | `Label[]`           | Array of label objects                       |
| `assignees`   | `string[]`          | Array of member initials                     |

#### Label

| Field   | Type     | Allowed values                                                |
|---------|----------|---------------------------------------------------------------|
| `text`  | `string` | Display text                                                  |
| `style` | `string` | `"filled"`, `"outline"`, `"success"`, `"warning"`, `"error"` |

#### Column

| Field       | Type            | Description                              |
|-------------|-----------------|------------------------------------------|
| `id`        | `string`        | Unique identifier (e.g. `"col-1"`)       |
| `title`     | `string`        | Column display name                      |
| `badgeBg`   | `string` (hex)  | Badge background color                   |
| `badgeText` | `string` (hex)  | Badge text color                         |
| `filter`    | `string`        | `"pending"` or `"done"` — tab filter key |
| `limit`     | `number\|null`  | Maximum cards allowed in the column      |

### Figma MCP (`mcp-figma`)

- `mcp__figma__get_figma_data` — retrieve full file data
- `mcp__figma__get_file_nodes` — retrieve specific nodes by ID
- `mcp__figma__get_image` — render a node as PNG

### Jira MCP (`mcp-atlassian`)

- Sync issue status transitions
- Add comments to issues
- Read issue details

---

## Architecture Overview

The application follows a **single-file, no-dependency** architecture for the generated frontend. All concerns (HTML structure, CSS styles, and JavaScript logic) are co-located in `index.html`.

### Key decisions

**Single HTML file** — The project started as a plain `index.html` with no `package.json` or bundler. Introducing a build pipeline without a formal spec would add unnecessary complexity. The self-contained approach delivers all required features while keeping the barrier to entry at zero.

**Native drag-and-drop** — The HTML5 Drag-and-Drop API is used directly to avoid pulling in third-party libraries. Drag events update in-memory state and re-render the affected columns.

**CSS custom properties** — All design tokens (colors, spacing, border radii, shadows) are declared in `:root` and reference the Figma Ferramenta-Trello color palette (`--color-brand-primary: #7f56d9`). This makes visual adjustments predictable and traceable back to the design source.

**In-memory state** — Data is held in plain JavaScript objects. No `localStorage`, IndexedDB, or remote persistence is used in the current version. The undo system for card deletion operates on a short-lived snapshot stored in a closure.

---

## Deploy Check

The `deploy-check` skill runs a full pre-deploy verification:

- Build — production build passes without errors
- Lint — no linting errors or blocking warnings
- Tests — full test suite passes
- Types — TypeScript type-check with `tsc --noEmit`
- Dependencies — vulnerability scan via `npm audit`
- Environment — `.env.example` is up to date

Results are saved to `.pipeline/deploy-check.md` if the directory exists.

---

## Contributing

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```

2. Make your changes and commit using semantic messages:
   ```bash
   git commit -m "feat: add new agent skill"
   ```

3. Push and open a pull request:
   ```bash
   git push -u origin feat/my-feature
   gh pr create --title "feat: add new agent skill" --body "Description of changes"
   ```

4. Ensure the `deploy-check` skill passes before requesting a review.

5. Follow the CSS naming convention: **kebab-case** class names, descriptive and scoped to their component.

6. Do not introduce external dependencies without discussion — the zero-dependency constraint for generated frontend code is intentional.

### Commit message conventions

| Prefix | Use case |
|---|---|
| `feat:` | New feature or agent skill |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring without behavior change |
| `docs:` | Documentation updates |
| `test:` | Test additions or fixes |
| `chore:` | Maintenance tasks |

---

## License

No license file was found in this repository. Please contact the maintainers for licensing information.

---

## Maintainers

This project is maintained by the BRQ squad team. MCP integration configured for the `code-agents-brq` Atlassian workspace.

---

*Generated by the readme-do-projeto agent — 2026-03-26*
