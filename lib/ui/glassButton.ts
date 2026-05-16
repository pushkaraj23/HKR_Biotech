import { cn } from "@/lib/cn";

/** Liquid glass tint: blue (primary CTAs), green (secondary), white (tertiary). */
export type GlassButtonColor = "blue" | "green" | "white";

/** Background behind the button — light surfaces use deeper glass; dark surfaces use luminous glass. */
export type GlassButtonSurface = "light" | "dark";

/** Semantic aliases mapped to colors: primary→blue, secondary→green, ghost→white. */
export type GlassButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_TO_COLOR: Record<GlassButtonVariant, GlassButtonColor> = {
  primary: "blue",
  secondary: "green",
  ghost: "white",
};

const colorSurfaceClass: Record<GlassButtonColor, Record<GlassButtonSurface, string>> = {
  blue: {
    light: "btn-glass btn-glass-blue-light",
    dark: "btn-glass btn-glass-blue-dark",
  },
  green: {
    light: "btn-glass btn-glass-green-light",
    dark: "btn-glass btn-glass-green-dark",
  },
  white: {
    light: "btn-glass btn-glass-white-light",
    dark: "btn-glass btn-glass-white-dark",
  },
};

export const glassButtonBase =
  "relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300";

export function resolveGlassButtonColor(
  variant: GlassButtonVariant = "primary",
  color?: GlassButtonColor,
): GlassButtonColor {
  return color ?? VARIANT_TO_COLOR[variant];
}

export function glassButtonClasses(options: {
  variant?: GlassButtonVariant;
  color?: GlassButtonColor;
  surface?: GlassButtonSurface;
}): string {
  const surface = options.surface ?? "light";
  const color = resolveGlassButtonColor(options.variant ?? "primary", options.color);
  return colorSurfaceClass[color][surface];
}

/** @deprecated Use glassButtonClasses({ variant, surface }) */
export function glassButtonClassesLegacy(
  variant: GlassButtonVariant = "primary",
  surface: GlassButtonSurface = "light",
): string {
  return glassButtonClasses({ variant, surface });
}

export function glassButtonCn(
  variantOrColor: GlassButtonVariant | GlassButtonColor,
  surface: GlassButtonSurface,
  className?: string,
): string;
export function glassButtonCn(
  options: { variant?: GlassButtonVariant; color?: GlassButtonColor; surface?: GlassButtonSurface },
  className?: string,
): string;
export function glassButtonCn(
  arg1:
    | GlassButtonVariant
    | GlassButtonColor
    | { variant?: GlassButtonVariant; color?: GlassButtonColor; surface?: GlassButtonSurface },
  arg2?: GlassButtonSurface | string,
  arg3?: string,
): string {
  if (typeof arg1 === "object") {
    return cn(glassButtonBase, glassButtonClasses(arg1), typeof arg2 === "string" ? arg2 : undefined);
  }

  const surface: GlassButtonSurface =
    arg2 === "light" || arg2 === "dark" ? arg2 : "light";
  const extraClass = arg2 === "light" || arg2 === "dark" ? arg3 : typeof arg2 === "string" ? arg2 : undefined;

  const colors: GlassButtonColor[] = ["blue", "green", "white"];
  if (colors.includes(arg1 as GlassButtonColor)) {
    return cn(glassButtonBase, glassButtonClasses({ color: arg1 as GlassButtonColor, surface }), extraClass);
  }

  return cn(
    glassButtonBase,
    glassButtonClasses({ variant: arg1 as GlassButtonVariant, surface }),
    extraClass,
  );
}
