"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

export type ProductNavCategory = {
  href: string;
  label: string;
  slug: string;
  subcategories: { href: string; label: string; slug: string }[];
};

type ProductsNavFlyoutProps = {
  open: boolean;
  categories: ProductNavCategory[];
  pathname: string;
  activeSubcategorySlug: string | null;
  hoveredCategorySlug: string | null;
  onHoverCategory: (slug: string) => void;
};

export function ProductsNavFlyout({
  open,
  categories,
  pathname,
  activeSubcategorySlug,
  hoveredCategorySlug,
  onHoverCategory,
}: ProductsNavFlyoutProps) {
  const hoveredCategory =
    categories.find((c) => c.slug === hoveredCategorySlug) ?? null;

  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 pt-3 transition-all duration-200",
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-1 opacity-0",
      )}
    >
      <div className="flex overflow-hidden rounded-2xl border border-white/20 bg-surface/98 text-on-dark shadow-elevated-lg backdrop-blur-2xl">
        <div className="w-[17rem] shrink-0 p-2">
        <p className="px-3 pb-2 pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-on-dark/70">
          Categories
        </p>
        <ul className="space-y-0.5">
          {categories.map((cat) => {
            const catPath = `/products/${cat.slug}`;
            const catActive = pathname === catPath || pathname.startsWith(`${catPath}/`);
            const rowHighlighted =
              hoveredCategorySlug === cat.slug || (catActive && !activeSubcategorySlug);
            return (
              <li key={cat.slug}>
                <Link
                  href={cat.href}
                  onMouseEnter={() => onHoverCategory(cat.slug)}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    rowHighlighted
                      ? "bg-white/12 text-on-dark"
                      : "text-on-dark/90 hover:bg-white/10 hover:text-on-dark",
                    catActive && "font-medium",
                  )}
                >
                  <span className="truncate">{cat.label}</span>
                  {cat.subcategories.length > 0 ? (
                    <span className="shrink-0 text-xs text-on-dark/55" aria-hidden>
                      ›
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/products"
          className="mt-1 block rounded-xl px-3 py-2 text-xs font-semibold text-primary-mid hover:bg-white/10"
        >
          Full catalogue →
        </Link>
      </div>

      {hoveredCategory && hoveredCategory.subcategories.length > 0 ? (
        <div className="w-[15rem] shrink-0 border-l border-white/15 bg-white/[0.04] p-2">
          <p className="px-3 pb-2 pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-on-dark/70">
            Sub-groups
          </p>
          <p className="truncate px-3 pb-1.5 text-xs font-semibold text-on-dark/85">
            {hoveredCategory.label}
          </p>
          <ul className="space-y-0.5">
            {hoveredCategory.subcategories.map((sub) => {
              const subActive =
                pathname === `/products/${hoveredCategory.slug}` &&
                activeSubcategorySlug === sub.slug;
              return (
                <li key={sub.slug}>
                  <Link
                    href={sub.href}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-sm transition-colors",
                      subActive
                        ? "bg-white/12 font-medium text-on-dark"
                        : "text-on-dark/90 hover:bg-white/10 hover:text-on-dark",
                    )}
                  >
                    {sub.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={hoveredCategory.href}
            className="mt-1 block rounded-xl px-3 py-2 text-xs font-semibold text-primary-mid hover:bg-white/10"
          >
            All in {hoveredCategory.label} →
          </Link>
        </div>
      ) : null}
      </div>
    </div>
  );
}

