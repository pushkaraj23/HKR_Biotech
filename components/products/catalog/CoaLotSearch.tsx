"use client";

import { useState } from "react";
import Link from "next/link";
import { glassButtonCn } from "@/lib/ui/glassButton";
import {
  PRODUCT_DETAIL_INSET_SURFACE,
  PRODUCT_DETAIL_INSET_SURFACE_LIGHT,
} from "@/components/products/catalog/productDetailStyles";
import { cn } from "@/lib/cn";

type CoaLotSearchProps = {
  catalogNumber: string;
  enquiryHref: string;
  lotFormat?: string;
  coaAvailable: boolean;
  /** When true, parent card is blue/green — use white inset. */
  onDark?: boolean;
};

export function CoaLotSearch({
  catalogNumber,
  enquiryHref,
  lotFormat,
  coaAvailable,
  onDark = false,
}: CoaLotSearchProps) {
  const [lot, setLot] = useState("");
  const [hint, setHint] = useState<string | null>(null);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!lot.trim()) {
      setHint("Enter a lot number to search.");
      return;
    }
    setHint(null);
  }

  const enquiryWithLot = `${enquiryHref}${enquiryHref.includes("?") ? "&" : "?"}lot=${encodeURIComponent(
    lot.trim(),
  )}&ref=${encodeURIComponent(catalogNumber)}`;

  return (
    <div
      className={cn(
        "p-4",
        onDark ? PRODUCT_DETAIL_INSET_SURFACE : PRODUCT_DETAIL_INSET_SURFACE_LIGHT,
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.14em]",
          onDark ? "text-[#1459b8]" : "text-[#1459b8]",
        )}
      >
        Search for COA
      </p>
      <form onSubmit={onSearch} className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          type="search"
          value={lot}
          onChange={(e) => setLot(e.target.value)}
          placeholder="Lot number"
          disabled={!coaAvailable}
          className="min-w-0 flex-1 rounded-xl border border-[#cfddee] bg-white px-4 py-3 text-base text-[#0d2137] outline-none transition focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/25 disabled:bg-[#f0f3f7] disabled:text-[#7a8aa0]"
        />
        <button
          type="submit"
          disabled={!coaAvailable}
          className={cn(
            glassButtonCn("blue", "light", "rounded-xl px-5 py-3 text-base"),
            "shrink-0 disabled:cursor-not-allowed disabled:opacity-50",
          )}
          aria-label="Search COA"
        >
          <span className="inline-flex items-center gap-2">
            <SearchIcon />
            Search
          </span>
        </button>
      </form>
      {lotFormat ? (
        <p className="mt-2 text-sm text-[#567089]">
          Lot format: <span className="font-mono text-[#1459b8]">{lotFormat}</span>
        </p>
      ) : null}
      {hint ? <p className="mt-2 text-sm font-medium text-[#1459b8]">{hint}</p> : null}
      {lot.trim() && coaAvailable ? (
        <Link
          href={enquiryWithLot}
          className="mt-3 inline-flex items-center gap-1 text-base font-semibold text-[#0d8f62] transition hover:text-[#0a7a52] hover:underline"
        >
          Request COA for lot {lot.trim()} →
        </Link>
      ) : null}
      {!coaAvailable ? (
        <p className="mt-2 text-sm leading-relaxed text-[#567089]">
          COA available on request for this product.
        </p>
      ) : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}
