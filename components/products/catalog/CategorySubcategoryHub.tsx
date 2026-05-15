"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ProductCategorySlug, ProductSubcategory } from "@/lib/types/catalog";

type SubcategoryWithCount = ProductSubcategory & { productCount: number };

type CategorySubcategoryHubProps = {
  categorySlug: ProductCategorySlug;
  categoryName: string;
  subcategories: SubcategoryWithCount[];
  directProductCount: number;
  className?: string;
};

const CARD_STYLES = [
  {
    background: "#1a73e8",
    dark: true,
    title: "text-white",
    badge: "border-white/25 bg-white/12 text-white/95",
  },
  {
    background: "#22a884",
    dark: true,
    title: "text-white",
    badge: "border-white/25 bg-white/12 text-white/95",
  },
  {
    background: "#e8f4ef",
    dark: false,
    title: "text-[#0d2137]",
    badge: "border-[#17324d]/14 bg-white/75 text-[#0d2137]",
  },
] as const;

export function CategorySubcategoryHub({
  categorySlug,
  categoryName,
  subcategories,
  directProductCount,
  className,
}: CategorySubcategoryHubProps) {
  const baseHref = `/products/${categorySlug}`;
  const totalInSubs = subcategories.reduce((n, s) => n + s.productCount, 0);
  const totalAll = totalInSubs + directProductCount;

  return (
    <section aria-labelledby="subcategory-hub-heading" className={className}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-mid">
            {categoryName}
          </p>
          <h2
            id="subcategory-hub-heading"
            className="mt-1.5 font-display text-xl font-bold tracking-tight text-on-dark md:text-2xl"
          >
            Browse by <span className="text-accent">group</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-on-dark/78">
            Pick a group to focus the list, or browse all entries below.
          </p>
        </div>
        {totalAll > 0 ? (
          <Link
            href={`${baseHref}?view=all`}
            className="shrink-0 text-sm font-semibold text-on-dark underline-offset-2 hover:text-accent hover:underline"
          >
            View entire family ({totalAll})
          </Link>
        ) : null}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subcategories.map((s, i) => {
          const style = CARD_STYLES[i % CARD_STYLES.length];
          return (
            <li key={s.slug}>
              <Link
                href={`${baseHref}?subcategory=${encodeURIComponent(s.slug)}`}
                className="group block h-full"
              >
                <div
                  className={cn(
                    "relative flex h-full min-h-[120px] flex-col justify-between gap-4 overflow-hidden rounded-2xl border p-6 transition-all duration-300 md:min-h-[128px] md:p-7",
                    "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.28)]",
                  )}
                  style={{
                    background: style.background,
                    borderColor: style.dark ? "rgba(255,255,255,0.2)" : "rgba(23,50,77,0.12)",
                  }}
                >
                  <h3
                    className={cn(
                      "font-display text-2xl font-bold leading-[1.12] tracking-tight md:text-[1.65rem] lg:text-[1.75rem]",
                      style.title,
                    )}
                  >
                    {s.name}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold",
                      style.badge,
                    )}
                  >
                    {s.productCount === 1 ? "1 product" : `${s.productCount} products`}
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
        {directProductCount > 0 ? (
          <li>
            <Link href={`${baseHref}?view=direct`} className="group block h-full">
              <div
                className={cn(
                  "flex h-full min-h-[120px] flex-col justify-between gap-4 rounded-2xl border border-dashed border-white/45 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 md:min-h-[128px] md:p-7",
                  "hover:border-white/60 hover:bg-white/14",
                )}
              >
                <h3 className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-on-dark md:text-[1.65rem]">
                  Direct catalogue
                </h3>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/12 px-3.5 py-2 text-xs font-semibold text-on-dark">
                  {directProductCount === 1 ? "1 product" : `${directProductCount} products`}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </li>
        ) : null}
      </ul>
    </section>
  );
}
