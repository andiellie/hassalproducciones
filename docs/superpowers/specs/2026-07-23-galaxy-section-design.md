# Galaxy Section — Design Spec

## Purpose

Add a section to the Cosmos Agency home page that displays 17 brand/service keywords as a dispersed star-cluster ("nebulosa dispersa"), reinforcing the cosmos visual identity already established by `StarfieldBackground`. Each keyword links to `/servicios`.

## Component

`src/components/home/GalaxySection.tsx` — new client component (`'use client'`), following the pattern of `StarfieldBackground.tsx` for mouse-parallax behavior.

Rendered in `src/app/page.tsx` between `Hero` and `AboutSection`.

## Content

Static array of 17 keywords, each with hand-authored layout data (not randomized at runtime, so the layout is stable across reloads):

```
Storytelling, Dirección Creativa, Estética, Omnicanal, Content, Conexión,
Evolución, Producción, Comunidad, Identidad, Iconic, Creatividad,
Cinematográfico, Cultura, Social Listening, Management, Experiencias
```

Each keyword entry defines:
- `label: string`
- `x, y: number` — position as percentage of container (0–100)
- `size: number` — font size in px
- `depth: 'near' | 'mid' | 'far'` — controls opacity, glow intensity, and parallax factor

Positions distributed organically (no grid, no strict geometric pattern) per the approved "nebulosa dispersa" mockup — varied sizes/opacity across the container, denser toward the middle, sparser at the edges.

## Layout & Styling

- Section container: `relative`, dark background `#030712`, fixed height (~500–600px desktop, reduced on mobile, e.g. `h-[380px] sm:h-[500px] lg:h-[600px]`).
- `<h2>` title above the cluster, styled like `AboutSection`'s heading (`text-3xl font-bold sm:text-4xl`, centered): **"Lo que hacemos"**.
- Each keyword rendered as a Next.js `<Link href="/servicios">`, absolutely positioned via inline `style={{ left: x%, top: y% }}`, font size from `size`.
- Color/glow by depth:
  - `near`: `text-white`, higher opacity (~0.9–1), stronger `text-shadow`/glow, larger font.
  - `mid`: light cold white (`#e0eeff`)-ish, medium opacity (~0.6–0.8), subtle glow.
  - `far`: muted slate (`text-slate-500`), lower opacity (~0.4–0.5), no glow.
- Hover state: increase glow/opacity on the hovered word via CSS transition (no layout shift). No underline by default.

## Interactivity (mouse parallax)

Reuse the parallax approach from `StarfieldBackground`:
- Track mouse position relative to container center.
- Apply an eased offset to each word's transform, scaled by a per-depth factor (near words move more than far words), so the cluster reads as having depth.
- Implemented with a `ref` per word or a single container-level `mousemove` listener updating CSS custom properties / inline transforms — implementation detail left to the implementer, matching the smoothing/easing style already used in `StarfieldBackground` (`+= (target - current) * easingFactor`).
- No canvas needed — plain positioned DOM elements (`<Link>`s) are sufficient since there's no per-frame redraw of shapes, just transform updates.

## Responsive Behavior

- On narrow viewports, reduce container height and font sizes (e.g. scale down via a `sm:`/base breakpoint on each word's size, or a global scale transform on the container) so words don't overflow the container or overlap unreadably.
- Since positions are percentage-based, they naturally reflow with container width; font sizes and container height are the main things needing breakpoint adjustments.

## Out of Scope

- No CMS/data-driven content — keywords and layout are hardcoded.
- No animation beyond mouse parallax and hover glow (no auto-orbiting/continuous motion, per the "interactiva con el mouse" choice over "flotante animada").
- No distinct link destinations per word — all 17 link to `/servicios`.
