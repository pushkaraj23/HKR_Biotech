import Image from "next/image";
import { cn } from "@/lib/cn";

export const BRAND_LOGO_SRC = "/hkr_logo.png";

type BrandLogoProps = {
  className?: string;
  /** Preset height / max-width for common placements */
  size?: "sm" | "md" | "lg" | "hero";
  priority?: boolean;
};

const sizeStyles: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "h-9 max-w-[180px] sm:max-w-[200px]",
  md: "h-11 max-w-[220px] sm:h-12 sm:max-w-[240px]",
  lg: "h-12 max-w-[240px] sm:h-14 sm:max-w-[280px]",
  hero: "h-14 max-w-[280px] sm:h-16 sm:max-w-[320px] md:h-[4.5rem] md:max-w-[380px] lg:h-20 lg:max-w-[420px]",
};

/**
 * Site logo from `public/hkr_logo.png`. Uses intrinsic dimensions with object-contain for any aspect ratio.
 */
export function BrandLogo({ className, size = "md", priority = false }: BrandLogoProps) {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt="HKR Biotech Labs"
      width={640}
      height={200}
      priority={priority}
      className={cn("w-auto object-contain object-left", sizeStyles[size], className)}
    />
  );
}
