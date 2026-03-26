# Architecture Decisions

_Agents will append decisions here during development._

---

## 2026-03-26: Pixel-perfect Board Implementation from Figma (US-4444)

**Decision:** Complete fresh implementation of the Task View board screen from scratch, overwriting `index.html` and `style.css` in `/tmp/fusion-worktrees/run-1774566826387/`. All values extracted directly from Figma file `ik0Qa30O9oNUy3qelJbQO7` node `1:2`.

**Rationale:** User story US-4444 requested an exact replica of the Trello board screen from the Figma design. All design tokens, layout measurements, colors, typography and spacing were extracted programmatically from the Figma API JSON. The implementation uses pure HTML/CSS with no framework beyond Google Fonts (Inter), and follows semantic HTML5 structure with ARIA labels.

**Design tokens extracted (exact Figma values):**
- Page background: `#f5f5f5` (Frame 1 solid fill)
- Surface (header, sidebar, columns, cards): `#ffffff`
- Border: `#e9eaeb` (strokeWeight: 1, all containers)
- Brand primary: `#7f56d9` (r:0.498, g:0.337, b:0.851)
- Brand light: `#f4ebff` (avatar background)
- Text primary: `#0a0d12` (r:0.039, g:0.051, b:0.071)
- Text secondary: `#414651` (r:0.255, g:0.275, b:0.318)
- Text muted: `#717680`
- Badge red bg/text: `#fef3f2` / `#d92d20`
- Badge orange bg/text: `#fffaeb` / `#dc6803`
- Badge green bg/text: `#ecfdf3` / `#039855`
- Font family: `Inter` (400, 500, 600 weights)
- Font sizes: 12px (badges/count), 14px (body/labels), 16px (brand/search)
- Line heights: 18px (xs), 20px (sm), 24px (md)
- Header: 76px tall, `padding: 16px 32px`, horizontal flex, `justify-content: space-between`
- Sidebar: 224px wide, `padding: 20px 0 0 32px`, vertical flex, `gap: 20px`
- Search input: `width: 320px`, `height: 44px`, `border-radius: 9999px`, `padding: 10px 14px`
- Tab bar: `border-radius: 9999px`, `padding: 8px 16px`, `height: 52px`, active tab `#7f56d9`
- Column: `width: 378px`, `border-radius: 12px 12px 0 0`, `padding: 16px 20px`
- Card: `width: 338px`, `border-radius: 16px`, `padding: 16px`, `gap: 16px`
- Avatar overlap (toolbar): 32x32, `margin-left: -8px`
- Avatar overlap (card): 24x24, `margin-left: -4px`
- Column count: 3 (Backlog 4 cards / Pendentes 2 cards / Concluídas 3 cards)

**Architecture choices:**
- Pure HTML + CSS custom properties (CSS variables) — zero runtime dependencies
- Semantic HTML5 (`header`, `aside`, `main`, `section`, `article`, `nav`, `time`)
- Full ARIA labels and `role` attributes for accessibility
- Inline SVG icons for zero external icon dependency and precise 16x16/20x20 sizing
- BEM-like class naming based on Figma node names (`.card`, `.card__header`, `.badge`, etc.)
- Flexbox throughout to reproduce Figma auto-layout (HORIZONTAL/VERTICAL modes)
- CSS hover states on cards (brand border + shadow) matching expected interactive behavior

**Files created:**
- `index.html` — Full board HTML with header, sidebar, toolbar, 3 kanban columns and 9 cards total
- `style.css` — Complete CSS with design tokens as CSS custom properties

---

## 2026-03-26: Created Trello Board Screen from Figma Design

**Decision:** Created a Trello-like kanban board screen (Task View) from the Figma design `ik0Qa30O9oNUy3qelJbQO7` node `1-2`.

**Rationale:** User requested a Figma-to-code conversion of the Trello board design. The implementation uses pure HTML/CSS/JS with no framework, matching the project's existing simple structure. All design tokens (colors, spacing, typography) were extracted directly from the Figma file data.

**Files created:**
- `src/index.html` — Full board HTML structure with header, sidebar, and 4 kanban columns
- `src/style.css` — Complete CSS using custom properties matching Figma design tokens
- `src/board.js` — Interactive drag-and-drop and add card/column functionality
- `reports/figma-to-code-report.md` — Full implementation report

**Tech stack chosen:** Vanilla HTML/CSS/JS (no build toolchain required, consistent with existing project structure).

---

## 2026-03-26: Implemented Trello Board UI from Figma

**Decision:** Implemented the Trello board UI from Figma design `ik0Qa30O9oNUy3qelJbQO7` node `1-2`, pixel-perfect, from scratch.

**Rationale:** Task requirement to replicate the Figma design exactly. The implementation uses pure HTML/CSS with no framework, extracting all design tokens (colors, spacing, typography, border radius, shadows) directly from the Figma file. The board renders 3 kanban columns (A fazer, Em progresso, Revisão) with cards containing badges, titles, descriptions, metadata, avatars and stats — matching the Figma specification exactly.

**Files created:**
- `index.html` — Full board HTML structure with header, sidebar, tabs bar, and 3 kanban columns with cards
- `style.css` — Complete CSS using custom properties matching Figma design tokens (colors, spacing, typography)
- `reports/figma-to-code-report.md` — Implementation report with design token inventory

---

## 2026-03-26: Re-implemented Board Screen from Figma (US-222)

**Decision:** Complete re-implementation of the board screen from scratch, overwriting `index.html` and `style.css` with a fresh implementation derived from the Figma node `1:2` (file `ik0Qa30O9oNUy3qelJbQO7`).

**Rationale:** The task instructions required implementing the screen from zero without reusing prior work. The new implementation improves on the previous version by:
- Using semantic HTML5 elements (`header`, `aside`, `main`, `section`, `article`, `nav`, `time`) for better accessibility and structure
- Adding proper ARIA labels, `aria-label`, `aria-current`, and `role` attributes throughout
- Extracting all design tokens directly from the Figma JSON (exact hex values, pixel measurements)
- Using a two-layer card structure (`.card` outer + `.card-inner` inner) to faithfully reproduce the Figma nested frame pattern (outer `cornerRadius: 16px` clip + inner `_Frame 4` with `padding: 16px`, `border: 1px #E9EAEB`)
- Adding interactive hover states (card border highlights to brand purple on hover)
- Including custom scrollbar styling for the horizontal kanban board area

**Design tokens extracted (key values):**
- Background: `#F5F5F5`
- Surface/cards: `#FFFFFF`
- Border: `#E9EAEB` (r:0.914, g:0.918, b:0.922 from Figma)
- Brand: `#7F56D9` (r:0.498, g:0.337, b:0.851 from Figma)
- Text primary: `#0A0D12` (r:0.039, g:0.051, b:0.071 from Figma)
- Text secondary: `#414651` (r:0.255, g:0.275, b:0.318 from Figma)
- Card border-radius: `16px` (from `cornerRadius: 16`)
- Header height: `76px` (padding 16px + content 44px + 16px)
- Sidebar width: `224px` (from `absoluteBoundingBox.width: 224`)
- Column width: `378px` (card 338px + 20px padding each side)
- Card padding: `16px` all sides (from `paddingLeft/Top/Right/Bottom: 16`)
- Font: `Inter`, sizes 12/14/16px, weights 400/500/600

**Files modified:**
- `/home/ec2-user/fusion-projects/testeeee/index.html` — Complete HTML re-implementation
- `/home/ec2-user/fusion-projects/testeeee/style.css` — Complete CSS re-implementation

---

## 2026-03-26: Pixel-perfect Re-implementation of Board Screen (US-333)

**Decision:** Complete fresh implementation of the board screen (Task View) from scratch, overwriting `index.html` and `style.css`, derived directly from Figma file `ik0Qa30O9oNUy3qelJbQO7` node `1:2`.

**Rationale:** Task US-333 required implementing the Trello board screen exactly as specified in Figma. All values extracted programmatically from the Figma API JSON using Python scripts. The implementation uses pure HTML/CSS with zero dependencies beyond Google Fonts (Inter), following the BEM-like naming convention.

**Design tokens extracted (all exact Figma values):**
- Page background: `#f5f5f5`
- Surface (header, sidebar, columns, cards): `#ffffff`
- Border: `#e9eaeb` (strokeWeight: 1)
- Brand primary: `#7f56d9`
- Brand light: `#f4ebff`
- Text primary: `#0a0d12`
- Text secondary: `#414651`
- Text tertiary / supporting: `#717680`
- Badge "Urgente": bg `#fef3f2`, text `#d92d20`
- Badge "Interno" (orange): bg `#fffaeb`, text `#dc6803`
- Badge "Interno" (green): bg `#ecfdf3`, text `#039855`
- Font family: `Inter` (400, 500, 600)
- Font sizes: 12px (badges/count), 14px (body), 16px (headings)
- Line heights: 18px (xs), 20px (sm), 24px (md)
- Header height: 76px; padding 16px/32px
- Sidebar width: 224px; padding 20px/32px; border-right
- Column width: 378px; pad 16/20; border-radius 12 12 0 0
- Card: 338px wide, r:16, pad:16 all sides, border #e9eaeb
- Card gap: 16px between cards
- Tab bar: r:999 (pill), pad:8/16; active tab r:999 bg:#7f56d9
- Avatar stacked: 32x32 (toolbar), 24x24 (card), overlap margin -8px / -4px

**Structure implemented:**
- Header: logo + brand name + search (pill, 320px) + bell button + DS avatar
- Sidebar: Home, Notificação, Tarefas, Analytics nav items
- Toolbar: tab bar (Todos active / Pendentes / Concluídas) + avatar group (11 avatars + +5 badge + add button)
- Board: 3 columns (Backlog 10 tarefas / Pendentes 2 tarefas / Concluídas 3 tarefas)
- Cards: badges row + title/description + date+checklist meta + avatar stack + attachments/comments

**Files created:**
- `index.html` — Complete HTML implementation (860 lines)
- `style.css` — Complete CSS using CSS custom properties (781 lines)
- `assets/design-reference.png` — Figma design reference screenshot
