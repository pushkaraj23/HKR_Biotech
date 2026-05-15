"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { CategoryCatalogView } from "@/lib/catalog/category-view";
import type { ProductCategorySlug, ProductSubcategory } from "@/lib/types/catalog";

type CategorySubcategoryNavProps = {
  categorySlug: ProductCategorySlug;
  subcategories: ProductSubcategory[];
  view: CategoryCatalogView;
  activeSubcategory: string;
  directProductCount: number;
  className?: string;
};

export function CategorySubcategoryNav({
  categorySlug,
  subcategories,
  view,
  activeSubcategory,
  directProductCount,
  className,
}: CategorySubcategoryNavProps) {
  if (subcategories.length === 0 || view === "hub" || view === "flat") return null;

  const baseHref = `/products/${categorySlug}`;

  return (
    <nav
      aria-label="Subcategory navigation"
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5",
        className,
      )}
    >
      <Link
        href={baseHref}
        className="w-fit text-sm font-semibold text-primary-deep underline-offset-2 hover:underline"
      >
        ← Browse all groups
      </Link>
      <div className="flex flex-wrap gap-2">
        {subcategories.map((s) => (
          <NavPill
            key={s.slug}
            href={`${baseHref}?subcategory=${encodeURIComponent(s.slug)}`}
            active={view === "subcategory" && activeSubcategory === s.slug}
            label={s.name}
          />
        ))}
        {directProductCount > 0 ? (
          <NavPill
            href={`${baseHref}?view=direct`}
            active={view === "direct"}
            label="Direct catalogue"
          />
        ) : null}
        <NavPill href={`${baseHref}?view=all`} active={view === "all"} label="Entire family" />
      </div>
    </nav>
  );
}

function NavPill({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition",
        active
          ? "border-primary/40 bg-primary/12 text-primary-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
          : "border-white/50 bg-white/88 text-foreground/85 hover:border-primary/30 hover:bg-white hover:text-primary-deep",
      )}
    >
      {label}
    </Link>
  );
}
