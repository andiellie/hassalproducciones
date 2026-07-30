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
