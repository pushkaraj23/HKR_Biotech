"use client";

import { useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProductCategory } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

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

  const fieldClass =
    "h-11 w-full rounded-xl border border-primary/20 bg-white/95 px-3 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/18";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/45 shadow-[0_14px_36px_-16px_rgba(18,50,90,0.32)] backdrop-blur-md",
        className,
      )}
      style={{
        background:
          "linear-gradient(125deg, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 0%, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 25%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-end lg:gap-6">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center justify-between gap-3 lg:justify-start lg:gap-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-deep/90">
              Catalogue
            </p>
            <Link
              href="/products"
              className="shrink-0 text-xs font-semibold text-primary-deep underline-offset-2 transition hover:text-primary hover:underline lg:hidden"
            >
              Full catalogue
            </Link>
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-foreground/40" aria-hidden>
              <SearchGlyph className="h-4 w-4" />
            </span>
            <input
              id={searchId}
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Name, CAS, formula, catalogue #…"
              autoComplete="off"
              aria-label="Search products in this family"
              className={cn(fieldClass, "pl-10 pr-3")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end lg:shrink-0">
          <div className="w-full min-w-0 sm:min-w-[13.5rem] lg:w-[min(100%,17.5rem)]">
            <label
              htmlFor={familyId}
              className="mb-1 block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55"
            >
              Browse by family
            </label>
            <div className="relative">
              <select
                id={familyId}
                value={activeCategory.slug}
                onChange={(e) => onFamilyChange(e.target.value)}
                aria-label="Switch product family"
                className={cn(
                  fieldClass,
                  "cursor-pointer appearance-none bg-white pr-10 font-semibold text-foreground/95",
                )}
              >
                <option value={ALL_VALUE}>All products — full catalogue</option>
                {allCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground/45"
                aria-hidden
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
          </div>

          <Link
            href="/products"
            className="hidden h-11 shrink-0 items-center justify-center rounded-xl border border-primary/22 bg-white/80 px-4 text-sm font-semibold text-primary-deep shadow-sm transition hover:border-primary/40 hover:bg-white hover:text-primary lg:inline-flex"
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

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
