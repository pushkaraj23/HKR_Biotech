"use client";

import { useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProductCategory } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";
import {
  catalogFieldClass,
  catalogFieldLabelClass,
  CatalogFieldChevron,
  CatalogFieldGlow,
} from "./catalog-filter-fields";

const ALL_VALUE = "__all__";

type CategoryBrowseToolbarProps = {
  allCategories: ProductCategory[];
  activeCategory: ProductCategory;
  search: string;
  onSearchChange: (value: string) => void;
  className?: string;
};

export function CategoryBrowseToolbar({
  allCategories,
  activeCategory,
  search,
  onSearchChange,
  className,
}: CategoryBrowseToolbarProps) {
  const router = useRouter();
  const searchId = useId();
  const familyId = useId();

  function onFamilyChange(slug: string) {
    if (slug === ALL_VALUE) {
      router.push("/products");
      return;
    }
    router.push(`/products/${slug}`);
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 lg:justify-start lg:gap-4">
            <label htmlFor={searchId} className={catalogFieldLabelClass}>
              Search this family
            </label>
            <Link
              href="/products"
              className="shrink-0 text-xs font-semibold text-on-dark/80 underline-offset-2 transition hover:text-accent hover:underline lg:hidden"
            >
              Full catalogue
            </Link>
          </div>
          <CatalogFieldGlow>
            <span
              className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 text-on-dark/45"
              aria-hidden
            >
              <SearchGlyph className="h-5 w-5" />
            </span>
            <input
              id={searchId}
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Name, CAS, formula, catalogue #…"
              autoComplete="off"
              aria-label="Search products in this family"
              className={cn(catalogFieldClass, "pl-12")}
            />
          </CatalogFieldGlow>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end lg:shrink-0 lg:gap-5">
          <div className="w-full min-w-0 sm:min-w-[14rem] lg:w-[min(100%,17.5rem)]">
            <label htmlFor={familyId} className={catalogFieldLabelClass}>
              Browse by family
            </label>
            <CatalogFieldGlow>
              <select
                id={familyId}
                value={activeCategory.slug}
                onChange={(e) => onFamilyChange(e.target.value)}
                aria-label="Switch product family"
                className={cn(catalogFieldClass, "cursor-pointer appearance-none pr-12")}
              >
                <option value={ALL_VALUE} className="bg-[#0d2137] text-on-dark">
                  All products — full catalogue
                </option>
                {allCategories.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-[#0d2137] text-on-dark">
                    {c.name}
                  </option>
                ))}
              </select>
              <CatalogFieldChevron className="pointer-events-none absolute right-4 top-1/2 z-20 h-5 w-5 -translate-y-1/2 text-on-dark/70" />
            </CatalogFieldGlow>
          </div>

          <Link
            href="/products"
            className="hidden h-[3.25rem] shrink-0 items-center justify-center rounded-full border border-white/35 bg-transparent px-6 text-sm font-semibold text-on-dark shadow-[0_0_22px_-4px_rgba(43,196,138,0.32),0_0_36px_-10px_rgba(26,115,232,0.22)] transition hover:border-white/55 hover:shadow-[0_0_28px_-4px_rgba(43,196,138,0.42),0_0_44px_-8px_rgba(26,115,232,0.3)] lg:inline-flex"
          >
            Full catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
    </svg>
  );
}
