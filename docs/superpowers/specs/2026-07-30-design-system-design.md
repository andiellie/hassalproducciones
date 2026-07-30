# Design System (Cosmos Agency) — Design Spec

## Purpose

Capture the visual language already implicit in the Cosmos Agency codebase (colors, typography scale, spacing scale, border radii) as an explicit, referenceable design system — both as importable code tokens and as a human-readable doc. This is a documentation/foundation task: it reflects current reality, it does not change any existing UI.

It also introduces a `brand.name` token ("Cosmos Agency") into the tokens file for future use (e.g. an upcoming Navbar redesign, branded exports, etc.). This token is not wired into any component or rendered anywhere on the site as part of this work.

## Files

### `src/lib/design-tokens.ts`

Code tokens — the source of truth, importable by future components. Not imported anywhere yet.

```ts
export const brand = {
  name: "Cosmos Agency",
} as const;

export const colors = {
  background: "#030712",
  accentLime: "#d4ff00",
  starGlow: "#e0eeff",
  text: {
    primary: "#ffffff",
    secondary: "#cbd5e1",
    muted: "#94a3b8",
    faint: "#64748b",
  },
  border: {
    default: "#1e293b",
    subtle: "rgba(30,41,59,0.6)",
  },
} as const;

export const typography = {
  heroTitle: "text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]",
  pageTitle: "text-4xl font-bold",
  sectionTitle: "text-3xl font-bold sm:text-4xl",
  sectionTitleSm: "text-2xl font-bold sm:text-3xl",
  cardTitle: "text-lg font-semibold",
  body: "text-lg text-slate-400 leading-relaxed",
  small: "text-sm text-slate-400",
  tiny: "text-xs",
} as const;

export const spacing = {
  containerNarrow: "max-w-2xl",
  containerMd: "max-w-4xl",
  containerWide: "max-w-6xl",
  sectionPaddingLg: "py-24",
  sectionPaddingMd: "py-16",
  containerPaddingX: "px-6",
} as const;

export const radii = {
  card: "rounded-xl",
  input: "rounded-lg",
  pill: "rounded-full",
} as const;
```

Values are derived directly from current usage across the codebase (see Provenance below), not invented.

### `docs/design-system.md`

Human-readable reference documenting the same tokens:

- **Colors** — table of each token, its hex/rgba value, and its current usage (e.g. `background` → page/canvas base, used in `layout.tsx`, `Navbar.tsx`, `Footer.tsx`, `StarfieldBackground.tsx`).
- **Typography** — table of each scale name, its Tailwind class string, and where it's currently applied (e.g. `sectionTitle` → `AboutSection.tsx`, `StepsSection.tsx`).
- **Spacing** — table of container widths and vertical rhythm values with usage examples.
- **Radii** — table of the three radius tokens and their typical use (cards, inputs, pills/badges).
- **Brand** — a short note: `brand.name` ("Cosmos Agency") is reserved for future use (e.g. the planned Navbar redesign) and is **not currently rendered anywhere** — this is intentional, not an oversight.

## Provenance (for the doc's usage notes)

Real values were extracted from the current codebase:

- Colors: `#030712` background across `layout.tsx`, `Navbar.tsx`, `Footer.tsx`, `StarfieldBackground.tsx`; `#d4ff00` lime accent across `Hero.tsx`, `StepsSection.tsx`, `EquipmentCard.tsx`, `QuoteForm.tsx`, `RangeSlider.tsx`; `#e0eeff` starfield glow; slate-300/400/500 text hierarchy; slate-800 borders.
- Typography: hero (`text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]`), page titles (`text-4xl font-bold`), section titles (`text-3xl font-bold sm:text-4xl` and the smaller `text-2xl font-bold sm:text-3xl` variant), card titles (`text-lg font-semibold`), body (`text-lg text-slate-400 leading-relaxed`), small/tiny text.
- Spacing: container widths (`max-w-2xl/4xl/6xl`), vertical rhythm (`py-24`, `py-16`), universal `px-6` horizontal padding.
- Radii: `rounded-xl` (cards/buttons), `rounded-lg` (inputs), `rounded-full` (badges/pills/sliders).

## Out of Scope

- No existing component is modified — `Hero.tsx`, `Footer.tsx`, `Navbar.tsx`, etc. keep their current hardcoded classes/values as-is.
- No component imports or consumes these tokens yet.
- The Navbar glassmorphism redesign (separate request) is explicitly deferred to its own future spec, which may extend this design system with new tokens (blur, glass gradients) at that time.
