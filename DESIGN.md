# Design System: FoodDash Food Ordering App

## 1. Visual Theme & Atmosphere

The application embodies a **Vibrant, Appetizing Energy** — energetic and modern, built to stimulate appetite and encourage action. The aesthetic is *clean but bold*, using a warm fire-orange palette against bright white surfaces to create urgency and warmth simultaneously. The overall density is medium — cards provide breathing room while the grid layout keeps content rich. The mood is: **"Fast, Fresh, Irresistible."**

Dark mode is fully supported, shifting the surface to near-black deep charcoal, preserving the vivid primary color as a focal anchor.

---

## 2. Color Palette & Roles

| Descriptive Name | Hex | Role |
|---|---|---|
| Searing Flame Orange | `#ff4d00` | Primary CTA buttons, active states, brand identity |
| Deep Ember | `#e64500` | Button hover/pressed state — deeper heat |
| Warm Amber Glow | `#ff8c00` | Secondary highlights, gradients, badges |
| Sunburst Yellow | `#ffcc00` | Accent pops, icons, star ratings |
| Clean Canvas White | `#ffffff` | Base background (light mode) |
| Soft Ash Surface | `#f8f9fa` | Card backgrounds, input fills, subtle zones |
| Midnight Ink | `#1a1a1a` | Primary text — rich black for high contrast |
| Smoky Mist | `#666666` | Muted supporting text, placeholders |
| Crimson Alert | `#ff3333` | Error states, validation messages |
| Forest Confirmation | `#28a745` | Success feedback, order confirmation |
| Whisper Border | `#eeeeee` | Dividers, card strokes, input borders |
| Charcoal Abyss | `#121212` | Dark mode background |
| Dark Surface | `#1e1e1e` | Dark mode card surfaces |

---

## 3. Typography Rules

- **Font Family:** `Inter` (Google Fonts) — humanist sans-serif chosen for its exceptional legibility at all sizes and premium tech feel. Falls back to `system-ui` and `-apple-system`.
- **Headings (h1–h4):** Extra-bold (`font-weight: 800`), tight line-height (`1.6`) — creates a no-nonsense, commanding presence. Food names and section titles feel impactful.
- **Body Copy:** Regular weight, `line-height: 1.5` — comfortable and scannable.
- **Error/Validation Text:** Semi-bold (`font-weight: 600`), small (`0.9rem`), in Crimson Alert pink — visually distinct without being alarming.

---

## 4. Component Stylings

### Buttons
- **Primary Action Buttons (`.btn-primary`):** Pill-ish rounded corners (`border-radius: 12px`), Searing Flame Orange fill, white text, semi-bold. On hover: lifts vertically (`translateY(-2px)`) with a warm orange glow shadow (`rgba(255,77,0,0.3)`). Transition uses a natural ease-in-out cubic bezier for tactile feel.

### Cards (`.card`)
- **Shape:** Gently rounded corners (`12px radius`) — approachable and modern, not overly soft.
- **Background:** Clean Canvas White with a Whisper Border stroke (`1px`).
- **Elevation:** Whisper-soft diffused shadow (`0 4px 20px rgba(0,0,0,0.08)`) — lifts cards off the surface without drama.
- **Interaction:** On hover, cards float upward (`translateY(-8px)`) with a smooth `0.3s ease` transition — creating a sense of "picking up" a menu item.

### Glassmorphism Layer (`.glass`)
- Semi-transparent white (`rgba(255,255,255,0.7)`) with a `10px backdrop blur` — used for overlays, navigation bars, and drawers. Creates a frosted-glass depth effect.

### Forms & Inputs
- Inputs inherit the design token system — Soft Ash Surface background, Whisper Border strokes, `12px` radius corners. Clean, unadorned style that keeps focus on content.

### Error Messages (`.error-message`)
- Rose-tinted background (`#fdf2f2`), hot pink text (`#db2777`), soft pink border — warm and human, not harsh.

---

## 5. Layout Principles

- **Whitespace Strategy:** Generous padding throughout — cards and sections breathe. Content is never cramped.
- **Grid:** Responsive menu grid for food category cards, adapting from multi-column desktop to single-column mobile.
- **Transitions:** All state changes use smooth CSS transitions (`0.2–0.3s`) with natural easing — the UI feels alive and responsive.
- **Dark Mode Toggle:** Implemented via a `data-theme='dark'` attribute on the root — all tokens remap automatically, no component-level overrides needed.
- **Scrolling:** Page transitions reset scroll position to top for clean navigation flow.
