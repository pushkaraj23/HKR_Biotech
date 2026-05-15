"use client";

import { useId } from "react";
import type { ProductCategorySlug } from "@/lib/types/catalog";
import type { CatalogFilterState } from "@/lib/catalog/filters";
import { cn } from "@/lib/cn";

type ProductFiltersProps = {
  state: CatalogFilterState;
  onChange: (next: CatalogFilterState) => void;
  categoryOptions: { slug: ProductCategorySlug; name: string }[];
  showCategoryFilter: boolean;
  className?: string;
};

export function ProductFilters({
  state,
  onChange,
  categoryOptions,
  showCategoryFilter,
  className,
}: ProductFiltersProps) {
  const searchId = useId();

  function setPartial(partial: Partial<CatalogFilterState>) {
    onChange({ ...state, ...partial });
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-white/40 bg-white/90 p-3 shadow-sm backdrop-blur-sm md:p-4",
        className,
      )}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end md:gap-4">
        <div className="min-w-0">
          <label htmlFor={searchId} className="text-xs font-semibold text-foreground/55">
            Search
          </label>
          <input
            id={searchId}
            type="search"
            value={state.search}
            onChange={(e) => setPartial({ search: e.target.value })}
            placeholder="Name, CAS, formula…"
            className="mt-1.5 w-full rounded-lg border border-primary/18 bg-white px-3 py-2.5 text-base text-foreground outline-none transition placeholder:text-muted-foreground/80 focus:border-primary/45 focus:ring-2 focus:ring-primary/15"
            autoComplete="off"
          />
        </div>
        {showCategoryFilter ? (
          <div className="min-w-[12rem]">
            <label htmlFor="catalog-category" className="text-xs font-semibold text-foreground/55">
              Family
            </label>
            <select
              id="catalog-category"
              value={state.category}
              onChange={(e) =>
                setPartial({
                  category: e.target.value as CatalogFilterState["category"],
                })
              }
              className="mt-1.5 w-full rounded-lg border border-primary/18 bg-white px-3 py-2.5 text-base text-foreground outline-none focus:border-primary/45 focus:ring-2 focus:ring-primary/15"
            >
              <option value="all">All categories</option>
              {categoryOptions.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
}
