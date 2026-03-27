# Architecture Decisions

_Agents will append decisions here during development._

## 2026-03-26 — Figma to Code: Ferramenta Trello

**Decision:** Implement the Trello-like board UI using pure HTML, CSS, and vanilla JavaScript without any framework.

**Rationale:**
- The project directory contains a single `index.html` file with no build system or package.json, indicating a static HTML/CSS/JS approach is appropriate.
- CONVENTIONS.md specifies minimal external dependencies to reduce bundle size.
- The Figma design (node-id 1-2, file "Ferramenta-Trello") represents a Kanban/Trello board interface — a well-known pattern consisting of a header/navbar, a board with multiple lists (columns), and draggable cards.
- CSS custom properties are used for the design tokens (colors, typography, spacing) to ensure maintainability.
- Vanilla JS drag-and-drop via the HTML5 Drag and Drop API is used for card interactivity, keeping zero external dependencies.
- No framework was chosen because the project has no build toolchain and the task requires a self-contained output file.

## 2026-03-27 — Board Screen: reports/board.html

**Decision:** Implement the Board screen from Figma node-id=1-2 as a pure HTML/CSS/JS file saved at `reports/board.html`.

**Rationale:**
- The task required generating the board screen and saving it to `reports/board.html` specifically. A `reports/` directory was created to match the output path.
- The Figma file "Ferramenta Trello" (node 1:2, "Frame 1") contains: a Header (76px, white, padding 16px 32px, with Brand + search + actions), a left Sidebar (224px, white, border-right, nav items: Home/Notificacao/Tarefas/Analytics), and a main kanban board area.
- Four columns extracted from Figma: "Pendentes", "Em Progresso", "Em Revisao", "Concluidas", each 378px wide with white background, 1px #E8EAEB border, and 12px 12px 0 0 border-radius.
- Cards are 338px wide (fill container), white background, cornerRadius 16px, 1px #E8EAEB border, padding 16px, gap 10px.
- Primary color #7F56D9 (purple) was extracted from fill values (r:0.498, g:0.337, b:0.851) used for logo gradient, primary CTA button (border-radius 999px / pill shape), and active nav item.
- Font: Inter (SemiBold 16px for brand/title, Regular 14px for nav items and card body, SemiBold 14px for card titles).
- Avatar group in board toolbar: 32px circles, 2px white border ring (box-shadow 0 0 0 2px #fff), overlapping -8px margin-left, with "+5" overflow badge.
- Design tokens (colors, spacing, border-radius, typography, shadows) are mapped to CSS custom properties for maintainability and fidelity.
- Minimal drag-and-drop via HTML5 Drag and Drop API added for visual interactivity with no external dependencies.
- Responsive breakpoints added: sidebar hidden at <=768px, search hidden at <=768px, column width reduced to 320px at small viewports.
