# Navbar Pill Redesign — Design Spec

## Purpose

Redesign the site Navbar (`src/components/layout/Navbar.tsx`) from a full-width bordered bar into a floating "pill" navbar with a glassmorphism effect, inspired by a reference example the user shared. Also fixes a real gap in the current navbar: on mobile, nav links are hidden (`hidden sm:flex`) with no alternative way to reach them — this redesign adds a working mobile menu.

This is the deferred follow-up to [2026-07-30-design-system-design.md](2026-07-30-design-system-design.md): it is the first real consumer of the `brand.name` token ("Cosmos Agency") introduced there.

## Shape & Glass Effect

- The navbar is no longer a full-width bar with a bottom border. It becomes a floating pill: a horizontally-constrained, fully-rounded (`rounded-full`) bar, sticky at the top with margin/gap from the viewport edges (not flush against them).
- Glass styling: semi-transparent dark background (`bg-slate-900/55`-equivalent), `backdrop-blur-md`, thin subtle border (`border border-white/10`-equivalent, matching `colors.border.subtle` from the design system conceptually — exact Tailwind classes are the implementer's call, consistent with existing conventions).
- Approved visual reference: mockup **A** ("glow lima") from the brainstorming session — glass pill, lime-glow icon, lime active-link color.

## Logo

- Icon: a `✦` glyph in the brand accent lime color (`#d4ff00` / `colors.accentLime`), with a subtle glow (`text-shadow`/drop-shadow), matching the approved mockup.
- Label: the text "Cosmos Agency", sourced from `brand.name` in `src/lib/design-tokens.ts` (import it — this is the token's first real usage).
- Together: `<Link href="/"><span class="glow-icon">✦</span> {brand.name}</Link>`, replacing the current plain-text `COSMOSAGENCYMX` logo.

## Links

- Same 4 links as today, unchanged destinations: Servicios (`/servicios`), Renta de Equipo (`/renta-equipo`), Cotizaciones (`/cotizaciones`), Contacto (`/contacto`).
- Rendered as plain text links inside the pill (no ghost/primary button treatment — user explicitly opted out of that).
- **Active link highlighting**: use `usePathname()` from `next/navigation` to detect the current route and apply the lime accent color to the matching link; other links stay in the existing muted `slate-300`/`hover:text-white` treatment.

## Mobile Behavior

- Below the `sm` breakpoint, the pill collapses to just `[logo] [hamburger icon]` — the 4 links are not shown inline.
- Tapping the hamburger toggles a dropdown/panel (implemented with React `useState`, not the checkbox-input CSS hack from the reference example — this is a React component, state belongs in the component) showing the 4 links stacked vertically.
- The panel closes when: a link is clicked (navigation happens), or the user taps outside the panel.
- The component must be a client component (`'use client'`) since it now needs `usePathname()` and `useState`.

## Out of Scope

- No ghost/primary CTA buttons (e.g. "Contacto"/"Cotizar" as distinct buttons) — links stay uniform in style aside from the active-state color.
- No changes to the link destinations or the set of pages linked.
- No changes to other layout components (`Footer.tsx`, page content) — this spec is scoped to `Navbar.tsx` only.
- Desktop breakpoint behavior beyond showing all 4 links inline is not specified further (no additional responsive tiers between mobile-collapsed and full-pill).
