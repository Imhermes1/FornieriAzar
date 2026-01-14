# Fornieri & Azar Brand Guidelines

## Typography

### Fonts

| Purpose | Font | Weights | Import |
|---------|------|---------|--------|
| **Headings** | Outfit | 300, 400, 500, 600, 700, 800 | Google Fonts |
| **Body** | Manrope | 300, 400, 500, 600, 700, 800 | Google Fonts |
| **Fallback** | -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif | — | — |

### CSS Variables
```css
--font-heading: var(--font-outfit), 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: var(--font-manrope), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Styles

| Element | Letter Spacing | Case | Weight |
|---------|----------------|------|--------|
| Headings (H1-H6) | 0.02em – 0.03em | Uppercase | 500 |
| Body | 0.01em | Normal | 400 |
| Navigation | 0.04em | Normal | 500 |
| Buttons | 0.12em | Uppercase | 600 |
| Eyebrow/Labels | 0.26em | Uppercase | 500 |

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Off Black** | `#1A1A1A` | Primary text, buttons, logo |
| **Off White** | `#FAFAFA` | Background, cards |
| **White** | `#FFFFFF` | Pure white backgrounds |
| **Black** | `#000000` | Absolute black accents |

### Neutral Grays

| Name | Hex | CSS Variable |
|------|-----|--------------|
| Gray 100 | `#F5F5F5` | `--gray-100` |
| Gray 200 | `#E8E8E8` | `--gray-200` |
| Gray 300 | `#D4D4D4` | `--gray-300` |
| Gray 400 | `#A3A3A3` | `--gray-400` |
| Gray 500 | `#737373` | `--gray-500` |
| Gray 600 | `#525252` | `--gray-600` |
| Gray 700 | `#404040` | `--gray-700` |
| Gray 800 | `#262626` | `--gray-800` |
| Gray 900 | `#171717` | `--gray-900` |

### Legacy Colors (from `style.css`)

| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#050608` | Dark backgrounds |
| Navy Light | `#11151C` | Secondary dark |
| Gold | `#C8B48B` | Accent/CTA (legacy) |
| Charcoal | `#1A1E26` | Dark surfaces |
| Gunmetal | `#12161E` | Dark surfaces |
| Stone | `#F6F4EF` | Warm off-white |
| Pearl | `#FAF9F6` | Page background |
| Cloud | `#E7E3DA` | Light borders |
| Slate | `#7C7F86` | Subtle text |

---

## Design Tokens

### Spacing & Layout

| Token | Value |
|-------|-------|
| Max Width | `1320px` |
| Gutter | `clamp(20px, 3.6vw, 52px)` |
| Topbar Height | `clamp(48px, 6vh, 58px)` |

### Border Radius

| Size | Value |
|------|-------|
| Large | `50px` / `100px` (pill buttons) |
| Medium | `25px` |
| Small | `12px` |

### Shadows

| Name | Value |
|------|-------|
| Soft | `0 20px 50px rgba(0, 0, 0, 0.08)` |
| Card | `0 10px 30px rgba(0, 0, 0, 0.06)` |
| Button Hover | `0 8px 20px rgba(0, 0, 0, 0.15)` |

### Transitions

| Property | Value |
|----------|-------|
| Default | `0.32s cubic-bezier(0.4, 0, 0.2, 1)` |
| Fast | `0.2s ease` |
| Scroll | `0.4s ease` |

---

## Button Styles

### Primary Button
- **Background:** Off Black (`#1A1A1A`)
- **Text:** White
- **Border Radius:** 100px (pill)
- **Hover:** Slight lift (`translateY(-2px)`), enhanced shadow

### Ghost Button (Dark)
- **Background:** Transparent
- **Text:** Off Black
- **Border:** Gray 300
- **Hover:** Gray 100 background, Gray 400 border

### Ghost Button (Light)
- **Background:** Transparent
- **Text:** White
- **Border:** `rgba(255, 255, 255, 0.3)`
- **Hover:** Subtle white background tint

---

## Logo Usage

### Text Logo
- **Format:** `FORNIERI & AZAR`
- **Separator:** Ampersand styled in Gray 400, Thin weight (300)
- **Font:** Outfit
- **Letter Spacing:** 0.25em
- **Weight:** 500 (name), 300 (ampersand)

### SVG Logo & Favicon
- **Icon File:** `/images/F&A_Logo_V1.svg`
- **Favicon/Apple Icon:** Primary logo used for app icons.
- **PWA:** Referenced in `/site.webmanifest`

---

## Brand Voice

### Positioning
- **Premium boutique real estate**
- **East and South East Melbourne focus**
- **Personal, refined service**

### Keywords
- Premium
- Boutique
- Personal
- Expert
- Trusted

---

## Technical Reference

### Files
| File | Purpose |
|------|---------|
| `app/globals.css` | Main stylesheet (CSS variables, components) |
| `app/layout.jsx` | Font configuration, metadata |
| `public/css/style.css` | Legacy/static styles |

### Theme Color
- **PWA/Browser:** `#FAFAFA` (Off White)
