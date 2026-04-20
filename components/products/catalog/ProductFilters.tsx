"use client";

import { useId } from "react";
import type { ProductCategorySlug } from "@/lib/types/catalog";
import type { CatalogFilterState } from "@/lib/catalog/filters";
import { AVAILABILITY_OPTIONS } from "@/lib/catalog/filters";
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
        "rounded-2xl border border-on-dark/18 bg-[rgba(18,25,35,0.44)] p-4 shadow-[0_8px_22px_-14px_rgba(18,25,35,0.62)] backdrop-blur-md md:p-5",
        className,
      )}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end md:gap-4">
        <div className="min-w-0">
          <label htmlFor={searchId} className="text-xs font-semibold uppercase tracking-wider text-on-dark/80">
            Search catalogue
          </label>
          <input
            id={searchId}
            type="search"
            value={state.search}
            onChange={(e) => setPartial({ search: e.target.value })}
            placeholder="Name, CAS, formula, catalogue #…"
            className="mt-1.5 w-full rounded-xl border border-on-dark/30 bg-[rgba(18,25,35,0.5)] px-4 py-2.5 text-sm text-on-dark shadow-inner outline-none ring-primary/0 transition placeholder:text-on-dark/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
            autoComplete="off"
          />
        </div>
        {showCategoryFilter ? (
          <div className="min-w-[12rem]">
            <label htmlFor="catalog-category" className="text-xs font-semibold uppercase tracking-wider text-on-dark/80">
              Category
            </label>
            <select
              id="catalog-category"
              value={state.category}
              onChange={(e) =>
                setPartial({
                  category: e.target.value as CatalogFilterState["category"],
                })
              }
              className="mt-1.5 w-full rounded-xl border border-on-dark/30 bg-[rgba(18,25,35,0.5)] px-4 py-2.5 text-sm text-on-dark outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
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

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-on-dark/80">Availability</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5" role="group" aria-label="Filter by availability">
          <FilterChip
            active={state.availability === "all"}
            onClick={() => setPartial({ availability: "all" })}
          >
            Any
          </FilterChip>
          {AVAILABILITY_OPTIONS.map((a) => (
            <FilterChip
              key={a}
              active={state.availability === a}
              onClick={() => setPartial({ availability: a })}
            >
              {a}
            </FilterChip>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-[11px] font-semibold transition",
        active
          ? "border-primary/55 bg-primary-deep text-primary-foreground shadow-sm"
          : "border-on-dark/30 bg-[rgba(18,25,35,0.45)] text-on-dark/85 hover:border-primary/40 hover:bg-[rgba(18,25,35,0.62)]",
      )}
    >
      {children}
    </button>
  );
}
