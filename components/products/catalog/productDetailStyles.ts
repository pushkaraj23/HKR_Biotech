import { BRAND_SOLID_CARD_CYCLE, type BrandSolidCardVariant } from "@/lib/ui/brandSolidCardCycle";
import { cn } from "@/lib/cn";

/** Shared layout and typography for product detail subpages. */
export const PRODUCT_DETAIL_CONTAINER = "mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8";

export const PRODUCT_DETAIL_STACK = "space-y-10 md:space-y-12";

export const PRODUCT_DETAIL_SOLID_PANEL =
  "overflow-hidden rounded-[1.75rem] border transition-all duration-300 shadow-[0_12px_36px_-14px_rgba(2,10,99,0.38)]";

/** Section heading on navy (no pale intro strip). */
export const PRODUCT_DETAIL_SECTION_HEADING = {
  eyebrow: "font-mono text-[10px] font-semibold uppercase tracking-[0.28em]",
  title: "mt-2 font-display text-2xl font-extrabold tracking-tight text-on-dark sm:text-3xl md:text-4xl",
  body: "mt-3 max-w-2xl text-lg leading-relaxed text-on-dark/82 md:text-xl",
};

export function productDetailBrandVariant(index: number): {
  v: BrandSolidCardVariant;
  light: boolean;
  index: number;
} {
  const i = ((index % 3) + 3) % 3;
  const v = BRAND_SOLID_CARD_CYCLE[i]!;
  return { v, light: v.surface === "#e8f4ef", index: i };
}

export function productDetailSolidPanelClass(v: BrandSolidCardVariant, light: boolean) {
  return cn(PRODUCT_DETAIL_SOLID_PANEL, v.shell, light ? "text-[#0d2137]" : "text-white");
}

export const PRODUCT_DETAIL_EYEBROW_ON_DARK = "font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-200/95";

export const PRODUCT_DETAIL_EYEBROW_BLUE_ON_DARK =
  "font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9ec8ff]";

export const PRODUCT_DETAIL_TITLE_ON_DARK =
  "font-display text-2xl font-extrabold tracking-tight text-on-dark sm:text-3xl md:text-4xl";

export const PRODUCT_DETAIL_BODY_ON_DARK = "mt-3 max-w-2xl text-lg leading-relaxed text-on-dark/85 md:text-xl";

/** Inset surface for forms/tables on solid blue or green panels. */
export const PRODUCT_DETAIL_INSET_SURFACE =
  "rounded-2xl border border-white/25 bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-sm";

export const PRODUCT_DETAIL_INSET_SURFACE_LIGHT =
  "rounded-2xl border border-[#17324d]/10 bg-white shadow-sm";

/** Full-width ordering table panel (no solid brand fill). */
export const PRODUCT_DETAIL_ORDERING_PANEL =
  "overflow-hidden rounded-[1.75rem] border border-white/40 bg-white shadow-[0_16px_40px_-16px_rgba(2,10,99,0.35)]";
