"use client";

import { useId } from "react";
import type { ProductCategorySlug } from "@/lib/types/catalog";
import type { CatalogFilterState } from "@/lib/catalog/filters";
import { cn } from "@/lib/cn";
import {
  catalogFieldClass,
  catalogFieldLabelClass,
  CatalogFieldChevron,
  CatalogFieldGlow,
} from "./catalog-filter-fields";

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
  const categoryId = useId();

  function setPartial(partial: Partial<CatalogFilterState>) {
    onChange({ ...state, ...partial });
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-4 sm:grid-cols-[1fr_minmax(12rem,16rem)] sm:items-end sm:gap-5">
        <div className="min-w-0">
          <label htmlFor={searchId} className={catalogFieldLabelClass}>
            Search
          </label>
          <CatalogFieldGlow>
            <input
              id={searchId}
              type="search"
              value={state.search}
              onChange={(e) => setPartial({ search: e.target.value })}
              placeholder="Name, CAS, formula…"
              className={catalogFieldClass}
              autoComplete="off"
            />
          </CatalogFieldGlow>
        </div>

        {showCategoryFilter ? (
          <div className="min-w-0 sm:min-w-[14rem]">
            <label htmlFor={categoryId} className={catalogFieldLabelClass}>
              Family
            </label>
            <CatalogFieldGlow>
              <select
                id={categoryId}
                value={state.category}
                onChange={(e) =>
                  setPartial({
                    category: e.target.value as CatalogFilterState["category"],
                  })
                }
                className={cn(catalogFieldClass, "cursor-pointer appearance-none pr-12")}
              >
                <option value="all" className="bg-[#0d2137] text-on-dark">
                  All categories
                </option>
                {categoryOptions.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-[#0d2137] text-on-dark">
                    {c.name}
                  </option>
                ))}
              </select>
              <CatalogFieldChevron className="pointer-events-none absolute right-4 top-1/2 z-20 h-5 w-5 -translate-y-1/2 text-on-dark/70" />
            </CatalogFieldGlow>
          </div>
        ) : null}
      </div>
    </div>
  );
}
