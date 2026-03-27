# Architecture Decisions

_Agents will append decisions here during development._

---

## ADR-001: Single-file HTML/CSS Implementation

**Date:** 2026-03-27
**Status:** Accepted

**Context:** The task requires a pixel-perfect implementation of the Figma design at `/tmp/fusion-worktrees/run-1774621616717/index.html`. The design is a Kanban board (1440x1011px in Figma, displayed as a full-viewport app).

**Decision:** Implement as a single self-contained `index.html` file with embedded CSS (no external CSS files) and a minimal inline `<script>` for tab/nav interactivity. Google Fonts (Inter) is loaded via CDN link tag.

**Rationale:**
- Requirement explicitly asks for a single self-contained file
- No build tooling or framework overhead
- Google Fonts CDN provides Inter font matching Figma's `fontFamily: "Inter"` spec

---

## ADR-002: Design Token Mapping

**Date:** 2026-03-27
**Status:** Accepted

**Figma tokens extracted and mapped to CSS custom properties:**

| Token | Figma value | CSS variable |
|---|---|---|
| Background | #f5f5f5 | `--color-bg` |
| Surface (white) | #ffffff | `--color-surface` |
| Border | #e9eaeb | `--color-border` |
| Text primary | r:0.039 g:0.051 b:0.071 = #0a0d12 | `--color-text-primary` |
| Text secondary | r:0.443 g:0.463 b:0.502 = #717680 | `--color-text-secondary` |
| Brand accent | r:0.498 g:0.337 b:0.851 = #7f56d9 | `--color-brand` |

**Typography (from Figma character nodes):**
- Brand title: Inter Semi Bold 16px / lh 24px
- Nav items: Inter Regular 14px / lh 20px
- Card title: Inter Semi Bold 14px / lh 20px
- Card body/meta: Inter Regular 14px / lh 20px

---

## ADR-003: Layout Architecture

**Date:** 2026-03-27
**Status:** Accepted

**Header:** `height: 76px`, flexbox horizontal, `justify-content: space-between`, `padding: 16px 32px`, gap 10px — exact Figma values.

**Sidebar (Menu):** `width: 224px`, vertical flex, `border-right: 1px solid #e9eaeb` — Figma dimensions preserved.

**Filter bar (Frame 10):** `height: 52px`, `border-radius: 9999px` (Figma cornerRadius 999), `padding: 8px 16px`. Positioned inside main content with 16px margin from edges.

**Board:** Horizontal flex, `align-items: flex-start`, `gap: 16px`, horizontal scroll.

**List columns (Frame 18/19/20):** `width: 378px` each, `border-radius: 16px`, `border: 1px solid #e9eaeb`.

**Cards (_Frame 4):** `border-radius: 16px`, `padding: 16px`, `gap: 16px`. Inner content matches Figma padding 16px on all sides.

---

## ADR-004: Avatar Rendering

**Date:** 2026-03-27
**Status:** Accepted

Figma uses imported avatar images which are not accessible without authentication. Decision: render colored gradient circles to represent the avatar silhouettes. Each avatar uses unique gradient colors matching the colorful palette visible in the screenshot. The `Line_avatar` component uses `margin-left: -8px` overlap matching Figma's `itemSpacing: -8`.

---

## ADR-005: Badge Colors

**Date:** 2026-03-27
**Status:** Accepted

The Figma badge components reference semantic color tokens. From the screenshot:
- "Urgente": orange text on light orange bg — mapped to `#e04f16` / `#fff1ee`
- "Interno" (amber): amber text on light amber bg — mapped to `#b54708` / `#fffaeb`
- "Interno" (green): green text on light green bg — mapped to `#067647` / `#ecfdf3`

These match standard Untitled UI / design system color scales.

---

## ADR-006: Icons

**Date:** 2026-03-27
**Status:** Accepted

All icons are implemented as inline SVG paths to avoid external dependencies. Icons are designed to match the stroke weight and style visible in the Figma screenshot (stroke-width 1.25–1.5, rounded caps/joins).
