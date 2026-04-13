import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/types";

type CategoryCardProps = {
  category: ProductCategory;
  className?: string;
};

const CARD_ACCENTS = [
  {
    tint: "from-teal-950/30 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
    orbShadow: "0 8px 24px -4px rgba(20,184,166,0.3), inset 0 -2px 5px rgba(0,0,0,0.06)",
    blob: "radial-gradient(circle, rgba(20,184,166,0.22) 0%, transparent 70%)",
    eyebrow: "text-teal-400",
    arrow: "text-teal-400 group-hover:text-teal-300",
  },
  {
    tint: "from-violet-950/30 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.6) 55%, rgba(91,33,182,0.4))",
    orbShadow: "0 8px 24px -4px rgba(91,33,182,0.25), inset 0 -2px 5px rgba(0,0,0,0.06)",
    blob: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
    eyebrow: "text-violet-400",
    arrow: "text-violet-400 group-hover:text-violet-300",
  },
  {
    tint: "from-rose-950/30 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.85), rgba(225,29,72,0.6) 55%, rgba(159,18,57,0.4))",
    orbShadow: "0 8px 24px -4px rgba(159,18,57,0.22), inset 0 -2px 5px rgba(0,0,0,0.06)",
    blob: "radial-gradient(circle, rgba(225,29,72,0.15) 0%, transparent 70%)",
    eyebrow: "text-rose-400",
    arrow: "text-rose-400 group-hover:text-rose-300",
  },
  {
    tint: "from-teal-950/25 via-violet-950/20 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(167,243,208,0.85), rgba(20,184,166,0.5) 50%, rgba(91,33,182,0.3))",
    orbShadow: "0 8px 24px -4px rgba(20,184,166,0.25), inset 0 -2px 5px rgba(0,0,0,0.06)",
    blob: "radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)",
    eyebrow: "text-teal-400",
    arrow: "text-teal-400 group-hover:text-teal-300",
  },
  {
    tint: "from-violet-950/25 via-rose-950/20 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.8), rgba(167,139,250,0.55) 50%, rgba(124,58,237,0.35))",
    orbShadow: "0 8px 24px -4px rgba(124,58,237,0.25), inset 0 -2px 5px rgba(0,0,0,0.06)",
    blob: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
    eyebrow: "text-violet-400",
    arrow: "text-violet-400 group-hover:text-violet-300",
  },
] as const;

export function CategoryCard({ category, className }: CategoryCardProps) {
  const accent = CARD_ACCENTS[Math.abs(category.slug.charCodeAt(0) + category.slug.charCodeAt(1)) % CARD_ACCENTS.length];

  return (
    <Link href={`/products/${category.slug}`} className={cn("group block", className)}>
      <div
        className={cn(
          `relative h-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b ${accent.tint}`,
          "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] backdrop-blur-xl",
          "transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.3)]",
        )}
      >
        {/* Ambient glow blob */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: accent.blob }}
          aria-hidden
        />

        <div className="relative p-7">
          {/* Orb icon */}
          <div
            className="mb-5 h-11 w-11 rounded-full ring-2 ring-white/20"
            style={{
              background: accent.orb,
              boxShadow: accent.orbShadow,
            }}
            aria-hidden
          />

          <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.22em]", accent.eyebrow)}>
            Category
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
            {category.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{category.tagline}</p>
          <span
            className={cn(
              "mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200",
              accent.arrow,
            )}
          >
            Browse catalogue
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
