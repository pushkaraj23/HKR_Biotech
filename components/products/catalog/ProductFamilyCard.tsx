import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ProductCategory, ProductSubcategory } from "@/lib/types/catalog";

export type SubcategoryLink = ProductSubcategory & { productCount: number };

type ProductFamilyCardProps = {
  category: ProductCategory;
  subcategories: SubcategoryLink[];
  styleIndex: number;
  className?: string;
};

const CARD_STYLES = [
  {
    background: "#1a73e8",
    cornerGlow:
      "radial-gradient(ellipse 95% 85% at 0% 0%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 38%, transparent 62%)",
    orb: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.12) 100%)",
    orbRing: "ring-white/35",
    orbShadow: "0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
    shadow: "0 14px 36px -12px rgba(13, 71, 161, 0.45)",
    title: "text-white",
    label: "text-white/70",
    pill: "border-white/25 bg-white/12 text-white/95 hover:border-white/40 hover:bg-white/18",
    cta: "text-white/90 hover:text-white",
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
    title: "text-white",
    label: "text-white/70",
    pill: "border-white/25 bg-white/12 text-white/95 hover:border-white/40 hover:bg-white/18",
    cta: "text-white/90 hover:text-white",
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
    title: "text-[#0d2137]",
    label: "text-[#1459b8]",
    pill: "border-[#17324d]/14 bg-white/80 text-[#0d2137] hover:border-[#17324d]/24 hover:bg-white",
    cta: "text-[#1459b8] hover:text-[#0d2137]",
    dark: false,
  },
] as const;

export function ProductFamilyCard({ category, subcategories, styleIndex, className }: ProductFamilyCardProps) {
  const style = CARD_STYLES[styleIndex % CARD_STYLES.length];
  const baseHref = `/products/${category.slug}`;
  const hasSubs = subcategories.length > 0;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.28)]",
        className,
      )}
      style={{
        background: style.background,
        borderColor: style.dark ? "rgba(255,255,255,0.18)" : "rgba(23, 50, 77, 0.1)",
        boxShadow: style.shadow,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: style.cornerGlow }} aria-hidden />

      <div className="relative flex min-h-0 flex-1 flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn("h-10 w-10 shrink-0 rounded-xl ring-2", style.orbRing)}
            style={{ background: style.orb, boxShadow: style.orbShadow }}
            aria-hidden
          />
          <Link
            href={baseHref}
            className={cn(
              "shrink-0 text-sm font-semibold underline-offset-2 transition-colors hover:underline",
              style.cta,
            )}
          >
            View all
            <span className="sr-only"> in {category.name}</span>
            <span aria-hidden> →</span>
          </Link>
        </div>

        <h3 className={cn("mt-5 font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl", style.title)}>
          <Link href={baseHref} className="hover:opacity-90">
            {category.name}
          </Link>
        </h3>

        {hasSubs ? (
          <div className="mt-6 border-t border-white/15 pt-5" style={style.dark ? undefined : { borderColor: "rgba(23,50,77,0.12)" }}>
            <p className={cn("font-mono text-[11px] font-semibold uppercase tracking-[0.22em]", style.label)}>Sub-groups</p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {subcategories.map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={`${baseHref}?subcategory=${encodeURIComponent(sub.slug)}`}
                    className={cn(
                      "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors md:text-base",
                      style.pill,
                    )}
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-auto pt-6">
            <Link
              href={baseHref}
              className={cn(
                "inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all md:text-base",
                style.pill,
              )}
            >
              Browse catalogue
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
