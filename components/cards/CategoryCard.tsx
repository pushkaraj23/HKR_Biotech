import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/types";

type CategoryCardProps = {
  category: ProductCategory;
  className?: string;
};

/** Solid fills (no gradients): royal blue, teal, cool mint — cycle by slug for variety. */
const CARD_STYLES = [
  {
    background: "#1a73e8",
    cornerGlow:
      "radial-gradient(ellipse 95% 85% at 0% 0%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 38%, transparent 62%)",
    orb: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.12) 100%)",
    orbRing: "ring-white/35",
    orbShadow: "0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
    shadow: "0 14px 36px -12px rgba(13, 71, 161, 0.45)",
    eyebrow: "text-white/90",
    title: "text-white",
    body: "text-white/92",
    arrow: "text-white decoration-white/45 underline-offset-4 hover:decoration-white",
    dark: true,
  },
  {
    background: "#22a884",
    cornerGlow:
      "radial-gradient(ellipse 95% 85% at 0% 0%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.1) 40%, transparent 62%)",
    orb: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(200,255,235,0.5) 50%, rgba(255,255,255,0.15) 100%)",
    orbRing: "ring-white/40",
    orbShadow: "0 4px 16px rgba(0,60,45,0.2), inset 0 1px 0 rgba(255,255,255,0.45)",
    shadow: "0 14px 36px -12px rgba(8, 105, 78, 0.4)",
    eyebrow: "text-white/90",
    title: "text-white",
    body: "text-white/92",
    arrow: "text-white decoration-white/45 underline-offset-4 hover:decoration-white",
    dark: true,
  },
  {
    background: "#e8f4ef",
    cornerGlow:
      "radial-gradient(ellipse 95% 85% at 0% 0%, rgba(255,255,255,0.95) 0%, rgba(43,196,138,0.18) 42%, transparent 65%)",
    orb: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), color-mix(in srgb, var(--accent) 42%, white) 55%, color-mix(in srgb, var(--primary) 22%, white) 100%)",
    orbRing: "ring-[#17324d]/12",
    orbShadow: "0 4px 14px rgba(23,50,77,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
    shadow: "0 14px 36px -14px rgba(23, 50, 77, 0.18)",
    eyebrow: "text-[#1459b8] font-bold tracking-[0.24em]",
    title: "text-[#0d2137]",
    body: "text-[#234a62]",
    arrow: "text-[#1459b8] decoration-[#1459b8]/35 underline-offset-4 hover:text-[#0d2137]",
    dark: false,
  },
] as const;

export function CategoryCard({ category, className }: CategoryCardProps) {
  const style =
    CARD_STYLES[Math.abs(category.slug.charCodeAt(0) + category.slug.charCodeAt(1)) % CARD_STYLES.length];

  return (
    <Link href={`/products/${category.slug}`} className={cn("group block", className)}>
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-[0_22px_48px_-14px_rgba(0,0,0,0.22)]",
        )}
        style={{
          background: style.background,
          borderColor: style.dark ? "rgba(255,255,255,0.22)" : "rgba(23, 50, 77, 0.12)",
          boxShadow: style.shadow,
        }}
      >
        {/* Top-left corner glow (solid card only — no full-card gradient) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{ background: style.cornerGlow }}
          aria-hidden
        />

        <div className="relative">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div
              className={cn("h-11 w-11 shrink-0 rounded-xl ring-2", style.orbRing)}
              style={{
                background: style.orb,
                boxShadow: style.orbShadow,
              }}
              aria-hidden
            />
          </div>

          <p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.26em]", style.eyebrow)}>
            Category
          </p>
          <h3 className={cn("mt-2 font-display text-xl font-bold tracking-tight md:text-2xl", style.title)}>
            {category.name}
          </h3>
          <p className={cn("mt-3 text-sm font-medium leading-relaxed md:text-[15px]", style.body)}>
            {category.tagline}
          </p>
          <span
            className={cn(
              "mt-6 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-[5px] transition-colors duration-200",
              style.arrow,
            )}
          >
            Browse catalogue
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
