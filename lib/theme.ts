/**
 * HKR Biotech Labs — design tokens (single source of truth).
 * Mirror these values in `app/globals.css` @theme for Tailwind utilities.
 */
export const theme = {
  colors: {
    bgPrimary: "#ffffff",
    bgSecondary: "#f4f4f5",
    bgTertiary: "#e4e4e7",
    surfaceGlass: "rgba(255, 255, 255, 0.92)",
    surfaceGlassStrong: "#ffffff",
    accentPrimary: "#0369a1",
    accentSecondary: "#0284c7",
    accentDeep: "#1e40af",
    violetGlow: "#4f46e5",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    textMuted: "#64748b",
    borderSubtle: "rgba(15, 23, 42, 0.1)",
    borderGlow: "rgba(3, 105, 161, 0.25)",
    headerBg: "#0f172a",
    headerText: "#e2e8f0",
    headerTextMuted: "#94a3b8",
  },
  gradients: {
    hero: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 52%, #4338ca 100%)",
    cta: "linear-gradient(90deg, #0284c7, #1d4ed8)",
    band: "linear-gradient(180deg, rgba(244, 244, 245, 0.98) 0%, rgba(255, 255, 255, 1) 100%)",
    partners:
      "linear-gradient(90deg, rgba(244, 244, 245, 0.95) 0%, rgba(14, 165, 233, 0.06) 50%, rgba(244, 244, 245, 0.95) 100%)",
  },
  radii: {
    card: "1.5rem",
    pill: "9999px",
    input: "0.875rem",
  },
} as const;

export type Theme = typeof theme;
