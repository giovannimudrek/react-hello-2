# Design Tokens - Ferramenta Trello (Kanban Board)

**Date:** 2026-03-27
**Source:** Figma - ik0Qa30O9oNUy3qelJbQO7
**Screen:** Frame 1 - Kanban Task Board

---

## 1. Color Palette

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-white` | `#FFFFFF` | Backgrounds, cards, containers |
| `--color-light-bg` | `#F5F5F5` | Secondary backgrounds, hover states |

### Neutral Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-border-light` | `#E8E8E8` | Borders, dividers, lines |
| `--color-border-medium` | `#D0D0D0` | Darker borders, emphasis |
| `--color-text-dark` | `#1A1A1A` | Primary text, headings |
| `--color-text-medium` | `#666666` | Secondary text, body copy |
| `--color-text-light` | `#999999` | Tertiary text, placeholders |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#10B981` | Success states, positive actions |
| `--color-warning` | `#F59E0B` | Warning states, alerts |
| `--color-error` | `#EF4444` | Error states, destructive actions |
| `--color-info` | `#3B82F6` | Information, neutral actions |

---

## 2. Typography

### Font Family
```css
--font-family-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Font Sizes
| Token | Size | Usage |
|-------|------|-------|
| `--text-h1` | `32px` | Page title |
| `--text-h2` | `24px` | Section headers |
| `--text-h3` | `18px` | Subsection headers |
| `--text-body` | `14px` | Body text, labels |
| `--text-small` | `12px` | Secondary text, captions |
| `--text-xs` | `11px` | Helper text, meta data |

### Font Weights
| Token | Weight | Usage |
|-------|--------|-------|
| `--font-weight-regular` | `400` | Body text, default |
| `--font-weight-medium` | `500` | Emphasize labels, secondary headings |
| `--font-weight-semibold` | `600` | Strong emphasis, medium headers |
| `--font-weight-bold` | `700` | Headings, high emphasis |

### Line Heights
| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | `1.2` | Headings, compact text |
| `--line-height-normal` | `1.5` | Body text, standard content |
| `--line-height-relaxed` | `1.75` | Descriptions, long-form text |

---

## 3. Spacing (Padding, Margin, Gap)

All spacing values follow an 4px base unit system:

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | `4px` | Tight spacing, internal gaps |
| `--spacing-sm` | `8px` | Small spacing, internal padding |
| `--spacing-md` | `16px` | Standard spacing, padding, gaps |
| `--spacing-lg` | `24px` | Large spacing, section gaps |
| `--spacing-xl` | `32px` | Extra large spacing, major sections |
| `--spacing-2xl` | `48px` | Maximum spacing, layout-level gaps |

### Component Padding Reference
- **Header:** `16px (top/bottom) 32px (left/right)`
- **Sidebar:** `20px (top) 32px (left) 855px (bottom) 92px (right)` (asymmetric)
- **Columns:** `16px (top/bottom) 20px (left/right)`
- **Cards:** `16px` standard

### Component Gaps Reference
- **Header items:** `10px`
- **Sidebar items:** `10px`
- **Column cards:** `10px`
- **Avatar group:** `16px` (with `-8px` for overlap effect)

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Subtle rounding, small elements |
| `--radius-md` | `8px` | Standard rounding, cards, buttons |
| `--radius-lg` | `12px` | Large rounding, larger components |
| `--radius-xl` | `16px` | Extra large rounding |
| `--radius-full` | `999px` | Fully rounded, pills, circles |

### Component Border Radius Reference
- **Search input:** `999px` (fully rounded)
- **Cards:** `8px` (standard)
- **Buttons:** `4px` to `8px` (varies)

---

## 5. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | `none` | No shadow |
| `--shadow-xs` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Subtle elevation, hover states |
| `--shadow-sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.1)` | Light shadow, cards |
| `--shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` | Medium elevation, interactive elements |
| `--shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` | Large shadow, modals, dropdowns |
| `--shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` | Extra large shadow, elevated panels |

---

## 6. Layout Specifications

### Screen Dimensions
- **Width:** `1440px` (Desktop)
- **Height:** `1011px` (Viewport height)

### Major Sections

#### Header
- **Height:** `76px`
- **Layout:** Horizontal (Flexbox)
- **Padding:** `16px 32px`
- **Gap:** `10px`
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E8E8E8` (bottom)
- **Position:** Fixed/Sticky (recommended)
- **Z-Index:** `100` (recommended)

#### Sidebar
- **Width:** `224px`
- **Layout:** Vertical (Flexbox)
- **Padding:** `20px 32px`
- **Gap:** `10px`
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E8E8E8` (right)
- **Position:** Fixed or Sticky
- **Z-Index:** `90` (recommended)

#### Main Content Area
- **Layout:** Horizontal (Flexbox/Grid)
- **Margin-left:** `224px` (accounts for sidebar)
- **Margin-top:** `76px` (accounts for header)
- **Display:** `flex` or `grid`
- **Gap:** `10px`

#### Kanban Columns (x3)
- **Width:** `378px` each
- **Height:** `846px`
- **Layout:** Vertical (Flexbox)
- **Padding:** `16px 20px`
- **Gap:** `10px` (between cards)
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E8E8E8` (right side)
- **Overflow:** `auto` (for scrollable content)

---

## 7. Components Reference

### 1. Header Component
```
├─ Brand/Logo (Frame, 117x32, HORIZONTAL)
├─ Search Input (Instance, 320x44, rounded: 999px)
└─ User Controls (Frame, 86x40, HORIZONTAL)
```

### 2. Sidebar Menu
```
└─ Menu Items (Vertical list, 224px width)
```

### 3. Kanban Column (x3)
```
├─ Column Title (Text)
├─ Add Card Button
└─ Task Cards (Vertical stack, 10px gap)
    ├─ Card 1
    ├─ Card 2
    └─ ... (multiple cards)
```

### 4. Avatar Group
- **Layout:** Horizontal with `-8px` overlap
- **Size:** 32x32 per avatar
- **Count:** Multiple avatars in group

---

## 8. Responsive Breakpoints

The design is currently optimized for desktop (1440px). For responsive implementation:

```css
/* Desktop (current design) */
@media (min-width: 1440px) {
  /* Current layout */
}

/* Tablet */
@media (max-width: 1024px) {
  --sidebar-width: 180px;
  --column-width: 280px;
  --header-padding: 12px 16px;
}

/* Mobile */
@media (max-width: 768px) {
  --sidebar-display: none; /* or collapsed */
  --columns-layout: vertical; /* stack instead of row */
  --main-margin-left: 0;
  --header-padding: 12px;
}
```

---

## 9. CSS Variables Declaration

```css
:root {
  /* Colors */
  --color-white: #FFFFFF;
  --color-light-bg: #F5F5F5;
  --color-border-light: #E8E8E8;
  --color-border-medium: #D0D0D0;
  --color-text-dark: #1A1A1A;
  --color-text-medium: #666666;
  --color-text-light: #999999;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Typography */
  --font-family-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --text-h1: 32px;
  --text-h2: 24px;
  --text-h3: 18px;
  --text-body: 14px;
  --text-small: 12px;
  --text-xs: 11px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Layout */
  --header-height: 76px;
  --sidebar-width: 224px;
  --column-width: 378px;
}
```

---

## 10. Implementation Notes

### Key Considerations
1. **Fixed Header:** Recommended for UX to keep search and navigation always visible
2. **Sticky Sidebar:** Allow sidebar to scroll with content but stay visible
3. **Scrollable Columns:** Use `overflow-y: auto` for task cards
4. **Drag & Drop:** Implement with libraries like react-beautiful-dnd for smooth interaction
5. **Responsive:** Consider collapsing sidebar on mobile devices

### Typography Implementation
```css
body {
  font-family: var(--font-family-primary);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-text-dark);
}

h1 { font-size: var(--text-h1); font-weight: var(--font-weight-bold); }
h2 { font-size: var(--text-h2); font-weight: var(--font-weight-semibold); }
h3 { font-size: var(--text-h3); font-weight: var(--font-weight-semibold); }
```

### Component Styling Example
```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

---

## 11. Export Summary

- **Total Colors:** 13
- **Typography Styles:** 6 sizes + 4 weights + 3 line heights
- **Spacing Values:** 6 base units
- **Border Radius Values:** 5 variants
- **Shadow Variants:** 5 levels
- **Layout Sections:** 4 (Header, Sidebar, Main, Columns)
- **Responsive Breakpoints:** 3 (Desktop, Tablet, Mobile)

---

**Last Updated:** 2026-03-27
