/**
 * HKR Biotech Labs — design tokens (mirror `app/globals.css` :root / @theme).
 * Prefer Tailwind semantic classes in components; this object is for TS-only use.
 */
export const theme = {
  colors: {
    background: "#101c33",
    foreground: "#f1f5f9",
    mutedForeground: "#94a3b8",
    captionForeground: "#64748b",
    surface: "#162847",
    surface2: "#1c3354",
    card: "#162847",
    cardForeground: "#f1f5f9",
    popover: "rgba(22, 40, 71, 0.82)",
    primary: "#2dd4bf",
    primaryForeground: "#0f172a",
    secondary: "#1c3354",
    secondaryForeground: "#f1f5f9",
    accent: "#8b5cf6",
    accentForeground: "#f8fafc",
    border: "rgba(45, 212, 191, 0.18)",
    borderStrong: "rgba(139, 92, 246, 0.28)",
    success: "#2dd4bf",
    warning: "#fbbf24",
    danger: "#fb7185",
    info: "#38bdf8",
  },
  gradients: {
    hero: "linear-gradient(135deg, #14b8a6 0%, #2dd4bf 26%, #8b5cf6 62%, #fb7185 100%)",
    cta: "linear-gradient(90deg, #14b8a6, #2dd4bf, #5eead4)",
  },
  radii: {
    card: "1.5rem",
    pill: "9999px",
    input: "0.875rem",
  },
} as const;

export type Theme = typeof theme;
