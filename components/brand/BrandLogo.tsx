import Image from "next/image";
import { cn } from "@/lib/cn";

export const BRAND_LOGO_SRC = "/hkr_logo.png";

type BrandLogoProps = {
  className?: string;
  /** Preset height; width follows the logo aspect ratio (no wide empty tray). */
  size?: "sm" | "md" | "lg" | "hero";
  priority?: boolean;
};

/** Max widths cap very wide bitmaps; image stays height-driven + auto width. */
const sizeStyles: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "h-8 max-h-8 sm:h-9 sm:max-h-9",
  md: "h-9 max-h-9 sm:h-10 sm:max-h-10",
  lg: "h-10 max-h-10 sm:h-11 sm:max-h-11",
  hero:
    "h-12 max-h-12 sm:h-14 sm:max-h-14 md:h-16 md:max-h-16 lg:h-[4.25rem] lg:max-h-[4.25rem]",
};

const imageMaxW: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "max-w-[9.5rem] sm:max-w-[10.5rem]",
  md: "max-w-[11rem] sm:max-w-[12.5rem]",
  lg: "max-w-[12rem] sm:max-w-[13.5rem]",
  hero: "max-w-[14rem] sm:max-w-[17rem] md:max-w-[19rem] lg:max-w-[21rem]",
};

/** Tight horizontal inset so the plate hugs the wordmark without a wide empty field */
const platePad: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "px-1.5 py-1 sm:px-2 sm:py-1",
  md: "px-2 py-1 sm:px-2.5 sm:py-1.5",
  lg: "px-2 py-1 sm:px-3 sm:py-1.5",
  hero: "px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5",
};

/**
 * Site logo from `public/hkr_logo.png`.
 * White plate so dark type and icon colors read clearly on the glass header.
 */
export function BrandLogo({ className, size = "md", priority = false }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center leading-none",
        "rounded-xl border border-slate-200/90 bg-white",
        "shadow-[inset_0_1px_0_rgba(255,255,255,1),0_10px_32px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(15,23,42,0.04)]",
        platePad[size],
        className,
      )}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt="HKR Biotech Labs"
        width={640}
        height={200}
        priority={priority}
        sizes="(max-width: 640px) 220px, 280px"
        className={cn(
          sizeStyles[size],
          "w-auto object-contain object-left",
          imageMaxW[size],
          "contrast-[1.06] saturate-[1.05]",
          "drop-shadow-[0_1px_2px_rgba(15,23,42,0.2)]",
        )}
      />
    </span>
  );
}
