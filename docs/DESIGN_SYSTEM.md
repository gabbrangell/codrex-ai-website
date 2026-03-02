# Codrex AI Design System

**IMPORTANT: Do not change these design guidelines without explicit customer approval.**

## Brand Identity

- **App Name**: Codrex AI
- **Domain**: codrexai.com
- **Logo**: Code brackets icon `</>` in solid cyan (#06B6D4)
- **Logo Asset**: `codrex-logo-flat-cyan.png`

## Color Palette

### Primary Colors
| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Primary Cyan | 190 95% 50% | #06B6D4 | Buttons, links, accents, logo |
| Background | 222 47% 6% | #0B1120 | Page backgrounds |
| Foreground | 210 40% 98% | #F8FAFC | Primary text |

### Secondary Colors
| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Card | 222 47% 8% | - | Card backgrounds |
| Secondary | 217 33% 17% | - | Secondary elements |
| Muted | 215 20% 65% | - | Muted/subtle text |
| Border | 217 33% 20% | - | Borders, dividers |
| Destructive | 0 72% 51% | - | Error states, delete actions |

## Typography

### Font Family
- **Primary Font**: Inter Variable, Inter, system-ui, sans-serif
- **No other fonts should be used**

### Text Colors
- Primary text: `text-foreground` (light gray/white)
- Muted text: `text-muted-foreground` (subtle gray)
- Accent text: `text-primary` (cyan)

## Theme Configuration

This is a **dark theme only** website. Do not add light mode support.

### CSS Variables (index.css)
All colors are defined as CSS variables in `:root` and `.dark` selectors.
Do not modify these values without explicit approval.

## Component Styling Guidelines

### Buttons
- Primary buttons: `bg-primary text-primary-foreground` (cyan background, dark text)
- Secondary buttons: `bg-secondary text-secondary-foreground`
- Ghost buttons: transparent background with hover states

### Cards
- Background: `bg-card` (slightly lighter than page background)
- Border: `border-border` (subtle border)
- Border radius: `rounded-lg` or `rounded-xl`

### Links
- Default: `text-primary` (cyan)
- Hover: `hover:text-primary/80` or underline

### Inputs
- Background: `bg-input` or `bg-secondary`
- Border: `border-border`
- Focus ring: `ring-primary` (cyan)

## Layout Guidelines

### Spacing
- Page padding: `px-4` (mobile) to `px-6` or `px-8` (desktop)
- Section spacing: `py-16` to `py-24`
- Component gaps: `gap-4`, `gap-6`, `gap-8`

### Container
- Max width: Use container class or `max-w-7xl mx-auto`

### Border Radius
- Default: `--radius: 0.5rem`
- Large: `rounded-lg`
- Extra large: `rounded-xl`, `rounded-2xl`

## Visual Effects

### Gradients (when used)
- Primary gradient: From cyan to teal
- Background gradients: Subtle, using background colors

### Shadows
- Cards may use subtle shadows
- Glow effects use cyan (`shadow-cyan-500/20`)

### Animations
- Keep animations subtle and professional
- Use `transition-all duration-200` for hover states

## Logo Usage

- Header logo: 32x32px (`h-8 w-8`)
- Footer logo: 32x32px (`h-8 w-8`)
- Logo file: `codrex-logo-flat-cyan.png`
- URL: `https://019c7654-4730-764c-8284-efa1d6013897.mochausercontent.com/codrex-logo-flat-cyan.png`

## Do NOT Change

1. Color palette (especially the cyan primary color)
2. Dark theme (do not add light mode)
3. Font family (Inter)
4. Logo and branding
5. Overall dark aesthetic with cyan accents

## Approved Changes

Only make design changes when the customer explicitly requests them.
When in doubt, ask before changing any visual elements.
