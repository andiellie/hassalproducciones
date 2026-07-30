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
