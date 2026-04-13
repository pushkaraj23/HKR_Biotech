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
        "rounded-2xl border border-teal-500/20 bg-gradient-to-br from-[#0c1526] via-teal-950/10 to-violet-950/5 p-5 shadow-sm backdrop-blur-sm md:p-6",
        className,
      )}
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end md:gap-6">
        <div className="min-w-0">
          <label htmlFor={searchId} className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Search catalogue
          </label>
          <input
            id={searchId}
            type="search"
            value={state.search}
            onChange={(e) => setPartial({ search: e.target.value })}
            placeholder="Name, CAS, formula, catalogue #…"
            className="mt-2 w-full rounded-2xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-slate-100 shadow-inner outline-none ring-teal-500/0 transition placeholder:text-slate-500 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
            autoComplete="off"
          />
        </div>
        {showCategoryFilter ? (
          <div className="min-w-[12rem]">
            <label htmlFor="catalog-category" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
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
              className="mt-2 w-full rounded-2xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-slate-100 outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
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

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Availability</p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by availability">
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
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
        active
          ? "border-teal-500/50 bg-teal-600 text-white shadow-sm"
          : "border-white/[0.1] bg-white/[0.06] text-slate-300 hover:border-teal-500/30 hover:bg-teal-500/10",
      )}
    >
      {children}
    </button>
  );
}
