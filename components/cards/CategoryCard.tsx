import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/types";

type CategoryCardProps = {
  category: ProductCategory;
  className?: string;
  /** Fewer lines and larger type — for catalogue landing. */
  minimal?: boolean;
  /** Wider / hero tiles in a bento grid — larger title and padding. */
  emphasis?: boolean;
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

export function CategoryCard({ category, className, minimal, emphasis }: CategoryCardProps) {
  const style =
    CARD_STYLES[Math.abs(category.slug.charCodeAt(0) + category.slug.charCodeAt(1)) % CARD_STYLES.length];

  return (
    <Link href={`/products/${category.slug}`} className={cn("group block h-full", className)}>
      <div
        className={cn(
          "relative flex h-full min-h-[168px] flex-col overflow-hidden rounded-2xl border transition-all duration-300 md:min-h-[188px]",
          "hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.28)]",
          minimal && emphasis && "min-h-[196px] md:min-h-[220px]",
          minimal ? (emphasis ? "p-7 md:p-8 xl:p-9" : "p-6 md:p-7") : "p-7",
        )}
        style={{
          background: style.background,
          borderColor: style.dark ? "rgba(255,255,255,0.18)" : "rgba(23, 50, 77, 0.1)",
          boxShadow: style.shadow,
        }}
      >
        {/* Top-left corner glow (solid card only — no full-card gradient) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: style.cornerGlow }}
          aria-hidden
        />

        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "shrink-0 rounded-xl ring-2",
                minimal && emphasis ? "h-11 w-11 md:h-12 md:w-12" : minimal ? "h-9 w-9 md:h-10 md:w-10" : "h-11 w-11",
                style.orbRing,
              )}
              style={{
                background: style.orb,
                boxShadow: style.orbShadow,
              }}
              aria-hidden
            />
          </div>

          {!minimal ? (
            <p className={cn("mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.26em]", style.eyebrow)}>
              Category
            </p>
          ) : null}
          <h3
            className={cn(
              "font-display font-bold tracking-tight",
              minimal && emphasis
                ? "mt-4 text-2xl leading-[1.15] md:text-3xl xl:text-[2.125rem]"
                : minimal
                  ? "mt-4 text-xl leading-snug md:text-2xl"
                  : "mt-2 text-xl md:text-2xl",
              style.title,
            )}
          >
            {category.name}
          </h3>
          {!minimal ? (
            <p className={cn("mt-3 text-sm font-medium leading-relaxed md:text-[15px]", style.body)}>
              {category.tagline}
            </p>
          ) : null}
          {minimal ? (
            <span
              className={cn(
                "mt-auto inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-200",
                style.dark
                  ? "border-white/25 bg-white/10 text-white/95 group-hover:border-white/40 group-hover:bg-white/16"
                  : "border-[#17324d]/14 bg-white/70 text-[#0d2137] group-hover:border-[#17324d]/22 group-hover:bg-white/90",
              )}
            >
              View range
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </span>
          ) : (
            <span
              className={cn(
                "mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold underline decoration-2 underline-offset-[5px] transition-colors duration-200",
                style.arrow,
              )}
            >
              Browse catalogue
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
