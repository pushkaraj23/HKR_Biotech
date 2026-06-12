"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState, type FormEvent } from "react";
import type { ProductCategorySlug } from "@/lib/types/catalog";
import {
  catalogFieldClass,
  CatalogFieldChevron,
  CatalogFieldGlow,
} from "@/components/products/catalog/catalog-filter-fields";
import { cn } from "@/lib/cn";

type CategoryOption = { slug: ProductCategorySlug; name: string };

type HeroCatalogSearchProps = {
  categories?: CategoryOption[];
  className?: string;
};

const heroFieldClass = cn(
  catalogFieldClass,
  "px-3 py-1.5 text-xs placeholder:text-xs sm:px-4 sm:py-2 sm:text-sm sm:placeholder:text-sm",
);

export function HeroCatalogSearch({ categories: categoriesProp, className }: HeroCatalogSearchProps) {
  const router = useRouter();
  const searchId = useId();
  const categoryId = useId();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategorySlug | "all">("all");
  const [categories, setCategories] = useState<CategoryOption[]>(categoriesProp ?? []);

  useEffect(() => {
    if (categoriesProp?.length) {
      setCategories(categoriesProp);
      return;
    }
    let cancelled = false;
    void fetch("/api/catalog/nav")
      .then((r) => r.json())
      .then((d: { items?: Array<{ slug: string; label: string }> }) => {
        if (cancelled || !Array.isArray(d.items)) return;
        setCategories(d.items.map((item) => ({ slug: item.slug, name: item.label })));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [categoriesProp]);

  function goToCatalog(nextSearch: string, nextCategory: ProductCategorySlug | "all") {
    const params = new URLSearchParams();
    const trimmed = nextSearch.trim();
    if (trimmed) params.set("search", trimmed);
    if (nextCategory !== "all") params.set("category", nextCategory);
    const query = params.toString();
    router.push(query ? `/products?${query}#catalog-grid-heading` : "/products#catalog-grid-heading");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    goToCatalog(search, category);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("mx-auto w-full max-w-3xl", className)}
      aria-label="Search catalogue"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(7.5rem,38%)] items-center gap-2 sm:grid-cols-[1fr_minmax(11rem,14rem)] sm:gap-4">
        <div className="min-w-0">
          <label htmlFor={searchId} className="sr-only">
            Search catalogue
          </label>
          <CatalogFieldGlow className="mt-0" compact>
            <input
              id={searchId}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Name, CAS, formula..."
              className={heroFieldClass}
              autoComplete="off"
            />
          </CatalogFieldGlow>
        </div>

        <div className="min-w-0 sm:min-w-[12rem]">
          <label htmlFor={categoryId} className="sr-only">
            Product family
          </label>
          <CatalogFieldGlow className="mt-0" compact>
            <select
              id={categoryId}
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategorySlug | "all")}
              className={cn(heroFieldClass, "cursor-pointer appearance-none truncate pr-8 sm:pr-10")}
            >
              <option value="all" className="bg-[#0d2137] text-on-dark">
                All categories
              </option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-[#0d2137] text-on-dark">
                  {c.name}
                </option>
              ))}
            </select>
            <CatalogFieldChevron className="pointer-events-none absolute right-2.5 top-1/2 z-20 h-3.5 w-3.5 -translate-y-1/2 text-on-dark/70 sm:right-3.5 sm:h-4 sm:w-4" />
          </CatalogFieldGlow>
        </div>
      </div>
    </form>
  );
}
