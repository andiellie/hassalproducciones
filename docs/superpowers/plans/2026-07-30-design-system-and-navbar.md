# Design System Tokens + Navbar Pill Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a design-tokens file + doc reflecting current visual values (no UI changes), then redesign the Navbar into a floating glass "pill" that consumes the new `brand.name` token, adds active-link highlighting, and fixes the missing mobile menu.

**Architecture:** Task 1 creates `src/lib/design-tokens.ts` (plain TS constants, no runtime behavior) and `docs/design-system.md` (reference doc) — purely additive, nothing imports them yet. Task 2 rewrites `src/components/layout/Navbar.tsx` as a client component that imports `brand` from the tokens file, uses `usePathname()` for active-link state and `useState` for the mobile menu.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4.

## Global Constraints

- Design tokens must reflect real values already used in the codebase (see spec Provenance section) — do not invent new colors/sizes.
- `brand.name` must not be rendered anywhere until Task 2 (its first real consumer).
- No existing component other than `Navbar.tsx` is modified.
- Navbar becomes a client component (`'use client'`) since it needs `usePathname()` and `useState`.
- Mobile menu uses React state, not a CSS checkbox hack.

---

### Task 1: Design tokens file + reference doc

**Files:**
- Create: `cosmos-agency/src/lib/design-tokens.ts`
- Create: `docs/design-system.md`

**Interfaces:**
- Produces: `brand.name: string`, `colors.{background, accentLime, starGlow, text.{primary,secondary,muted,faint}, border.{default,subtle}}`, `typography.{heroTitle,pageTitle,sectionTitle,sectionTitleSm,cardTitle,body,small,tiny}`, `spacing.{containerNarrow,containerMd,containerWide,sectionPaddingLg,sectionPaddingMd,containerPaddingX}`, `radii.{card,input,pill}` — all `as const` string/object exports. Task 2 imports `brand` from this file.

- [ ] **Step 1: Create the tokens file**

Create `cosmos-agency/src/lib/design-tokens.ts`:

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

- [ ] **Step 2: Verify the file compiles**

Run: `cd cosmos-agency && npx tsc --noEmit`
Expected: no errors referencing `design-tokens.ts`.

- [ ] **Step 3: Write the reference doc**

Create `docs/design-system.md`:

```markdown
# Cosmos Agency — Design System

Source of truth: `cosmos-agency/src/lib/design-tokens.ts`. Values below reflect what's already in use across the codebase — this doc does not introduce new values.

## Colors

| Token | Value | Usage |
|---|---|---|
| `colors.background` | `#030712` | Page/canvas base — `layout.tsx`, `Navbar.tsx`, `Footer.tsx`, `StarfieldBackground.tsx` |
| `colors.accentLime` | `#d4ff00` | Brand accent — `Hero.tsx`, `StepsSection.tsx`, `EquipmentCard.tsx`, `QuoteForm.tsx`, `RangeSlider.tsx` |
| `colors.starGlow` | `#e0eeff` | Starfield accent-star glow — `StarfieldBackground.tsx` |
| `colors.text.primary` | `#ffffff` | Primary text (white) |
| `colors.text.secondary` | `#cbd5e1` (slate-300) | Navbar links, form labels |
| `colors.text.muted` | `#94a3b8` (slate-400) | Body copy, descriptions |
| `colors.text.faint` | `#64748b` (slate-500) | Footer, captions |
| `colors.border.default` | `#1e293b` (slate-800) | Card/section borders |
| `colors.border.subtle` | `rgba(30,41,59,0.6)` | Header/footer hairline borders |

## Typography

| Token | Tailwind classes | Usage |
|---|---|---|
| `typography.heroTitle` | `text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]` | `Hero.tsx` |
| `typography.pageTitle` | `text-4xl font-bold` | Page `<h1>`s (`contacto`, `cotizaciones`, `renta-equipo`, `servicios`) |
| `typography.sectionTitle` | `text-3xl font-bold sm:text-4xl` | `AboutSection.tsx`, `StepsSection.tsx` |
| `typography.sectionTitleSm` | `text-2xl font-bold sm:text-3xl` | `ContentManagement.tsx`, `PhotoGallery.tsx`, `VideoReel.tsx` |
| `typography.cardTitle` | `text-lg font-semibold` | `StepsSection.tsx`, `EquipmentCard.tsx` |
| `typography.body` | `text-lg text-slate-400 leading-relaxed` | `Hero.tsx`, `AboutSection.tsx` |
| `typography.small` | `text-sm text-slate-400` | `StepsSection.tsx`, `EquipmentCard.tsx` |
| `typography.tiny` | `text-xs` | Badges, fine print |

## Spacing

| Token | Value | Usage |
|---|---|---|
| `spacing.containerNarrow` | `max-w-2xl` | `Hero.tsx` copy, `QuoteForm.tsx` |
| `spacing.containerMd` | `max-w-4xl` | `AboutSection.tsx`, service sections |
| `spacing.containerWide` | `max-w-6xl` | `StepsSection.tsx`, `Navbar.tsx`, `Footer.tsx` |
| `spacing.sectionPaddingLg` | `py-24` | `AboutSection.tsx`, `StepsSection.tsx` |
| `spacing.sectionPaddingMd` | `py-16` | Service sections, `QuoteForm.tsx` |
| `spacing.containerPaddingX` | `px-6` | Universal horizontal container padding |

## Radii

| Token | Value | Usage |
|---|---|---|
| `radii.card` | `rounded-xl` | Cards, hero buttons |
| `radii.input` | `rounded-lg` | Form inputs/buttons |
| `radii.pill` | `rounded-full` | Badges, glow blobs, sliders |

## Brand

`brand.name` = `"Cosmos Agency"`. Reserved for future use — not rendered anywhere until the Navbar pill redesign consumes it as the logo label.
```

- [ ] **Step 4: Commit**

```bash
git add cosmos-agency/src/lib/design-tokens.ts docs/design-system.md
git commit -m "$(cat <<'EOF'
Add design system tokens and reference doc

Documents colors, typography, spacing, and radii already in use across
the site as importable constants + a human-readable reference. Purely
additive: no component imports these yet, and brand.name is not
rendered anywhere in this commit.
EOF
)"
```

---

### Task 2: Navbar pill redesign

**Files:**
- Modify: `cosmos-agency/src/components/layout/Navbar.tsx` (full rewrite)

**Interfaces:**
- Consumes: `brand.name` from `@/lib/design-tokens` (Task 1).
- Produces: default-exported `Navbar` component, same as before (no signature change — no props).

- [ ] **Step 1: Rewrite Navbar.tsx as a client component with the pill shape, logo, active-link state, and mobile menu**

Replace the full contents of `cosmos-agency/src/components/layout/Navbar.tsx`:

```tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/design-tokens";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/renta-equipo", label: "Renta de Equipo" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border border-white/10 bg-slate-900/55 px-5 py-2.5 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white">
          <span
            className="text-base leading-none text-[#d4ff00]"
            style={{ textShadow: "0 0 8px rgba(212,255,0,0.7)" }}
          >
            ✦
          </span>
          {brand.name}
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-white ${
                    isActive ? "text-[#d4ff00]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex flex-col gap-1 sm:hidden"
        >
          <span className="h-px w-4 bg-slate-300" />
          <span className="h-px w-4 bg-slate-300" />
          <span className="h-px w-4 bg-slate-300" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute top-16 w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-md sm:hidden">
          <ul className="flex flex-col gap-3 text-sm text-slate-300">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block transition-colors hover:text-white ${
                      isActive ? "text-[#d4ff00]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd cosmos-agency && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify in the running dev server**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/`
Expected: `200`. Then visually confirm in the browser: pill-shaped floating navbar with glowing ✦ + "Cosmos Agency" logo, active link in lime on the current page, and on a narrow viewport the hamburger toggles the mobile panel.

- [ ] **Step 4: Commit**

```bash
git add cosmos-agency/src/components/layout/Navbar.tsx
git commit -m "$(cat <<'EOF'
Redesign Navbar as a floating glass pill

Replaces the full-width bordered bar with a sticky glass pill,
consumes the brand.name design-system token for the logo, highlights
the active route in lime, and adds a working mobile menu (the old
navbar hid links below sm with no alternative).
EOF
)"
```

---

## Self-Review Notes

- Spec coverage: design-system spec → Task 1 (all four token groups + brand + doc). Navbar spec → Task 2 (pill shape, glass, logo+brand.name, active link via usePathname, mobile menu via useState, no CTA buttons, no other files touched).
- No placeholders — both file bodies are complete, copy-pasteable code.
- Type consistency: `brand.name` defined in Task 1 matches the import in Task 2 exactly (`import { brand } from "@/lib/design-tokens"` → `brand.name`).
