"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { CartOrderSummary } from "@/components/commerce/CartOrderSummary";
import { CartStickySummary } from "@/components/commerce/CartStickySummary";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import type { CartItem } from "@/lib/commerce/cart-types";
import {
  formatMoney,
  parsePriceAmount,
  summarizeCart,
} from "@/lib/commerce/cart-pricing";
import {
  COMMERCE_PAGE_INNER,
  COMMERCE_PAGE_SHELL,
} from "@/components/products/catalog/productDetailStyles";
import { cn } from "@/lib/cn";

function CartLineCard({
  item,
  summaryCurrency,
  busy,
  onDecrement,
  onIncrement,
  onRemove,
}: {
  item: CartItem;
  summaryCurrency: string | null;
  busy: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}) {
  const productSlug = item.productSlug || item.slug.split("__")[0] || item.slug;
  const qty = Math.max(1, Number(item.quantity ?? 1));
  const unit = parsePriceAmount(item.variantPrice);
  const lineTotal = unit === null ? null : unit * qty;

  return (
    <li
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-white/40",
        "bg-gradient-to-br from-[#f9fcfb] via-[#f2f9f5] to-[#edf4ff]",
        "shadow-[0_16px_48px_-20px_rgba(2,10,99,0.28)]",
        "transition duration-300 hover:shadow-[0_22px_56px_-18px_rgba(26,115,232,0.22)]",
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#2bc48a]/12 blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#567089]">
            {item.catalogNumber}
          </p>
          <h2 className="mt-1.5 font-display text-lg font-bold leading-snug text-[#0d2137] sm:text-xl">
            <Link
              href={`/products/${item.categorySlug}/${productSlug}`}
              className="transition hover:text-[#1a73e8]"
            >
              {item.chemicalName}
            </Link>
          </h2>
          {item.variantSize ? (
            <p className="mt-1.5 text-sm text-[#3e5870]">
              Size: <span className="font-medium text-[#17324d]">{item.variantSize}</span>
              {item.variantPrice ? (
                <>
                  {" "}
                  · <span className="text-[#567089]">{item.variantPrice} each</span>
                </>
              ) : null}
            </p>
          ) : null}
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#7a8aa0]">
            {item.availability}
          </p>
          <p className="mt-3 font-mono text-base font-bold text-[#1a73e8] sm:text-lg">
            {lineTotal !== null
              ? formatMoney(lineTotal, summaryCurrency)
              : item.variantPrice?.trim() || "Quote on request"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
          <div className="flex items-center rounded-full border border-[#cfddee] bg-white/90 p-1 shadow-sm">
            <button
              type="button"
              disabled={busy || qty <= 1}
              onClick={onDecrement}
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-medium text-[#1459b8] transition hover:bg-[#eef4fc] disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-9 text-center font-mono text-sm font-semibold text-[#0d2137]">{qty}</span>
            <button
              type="button"
              disabled={busy}
              onClick={onIncrement}
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-medium text-[#1459b8] transition hover:bg-[#eef4fc] disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={onRemove}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f5c4c4] bg-gradient-to-br from-[#fff5f5] to-[#ffe8e8] text-[#c41e3a] shadow-[0_8px_20px_-10px_rgba(196,30,58,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(196,30,58,0.5)] disabled:opacity-55"
            aria-label="Remove from cart"
            title={busy ? "Removing…" : "Remove from cart"}
          >
            {busy ? (
              <span className="text-[10px] font-bold">…</span>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </li>
  );
}

export default function CartPage() {
  const { user, configured } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busySlug, setBusySlug] = useState<string | null>(null);

  async function load() {
    if (!configured || !user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/user/cart", { headers: { Authorization: `Bearer ${token}` } });
      const body = (await res.json()) as { items?: CartItem[]; error?: string };
      if (!res.ok) throw new Error(body.error || "Could not load cart");
      setItems(body.items ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load cart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [configured, user]);

  const summary = useMemo(() => summarizeCart(items), [items]);

  async function setQty(slug: string, quantity: number) {
    if (!user) return;
    setBusySlug(slug);
    try {
      const token = await user.getIdToken();
      await fetch("/api/user/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ slug, quantity }),
      });
      await load();
    } finally {
      setBusySlug(null);
    }
  }

  async function removeItem(slug: string) {
    if (!user) return;
    setBusySlug(slug);
    try {
      const token = await user.getIdToken();
      await fetch(`/api/user/cart?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await load();
    } finally {
      setBusySlug(null);
    }
  }

  return (
    <div className={COMMERCE_PAGE_SHELL}>
      <PageAmbientGraphics variant="right" opacity="opacity-[0.16]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#1a73e8]/12 to-transparent"
        aria-hidden
      />

      <div className={cn(COMMERCE_PAGE_INNER, "pt-6")}>
          {!user ? (
            <section className="rounded-[1.5rem] border border-white/15 bg-white/8 p-8 text-center backdrop-blur-md">
              <p className="text-base text-on-dark/88">Sign in to access your cart and saved quantities.</p>
              <Link
                href="/login?callbackUrl=%2Fcart"
                className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#5eecc0] via-[#2bc48a] to-[#1aab72] px-8 py-3 text-sm font-bold text-[#053d2c] shadow-[0_12px_32px_-8px_rgba(43,196,138,0.5)] transition hover:-translate-y-0.5"
              >
                Sign in
              </Link>
            </section>
          ) : loading ? (
            <div className="flex items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/5 py-20">
              <p className="text-sm font-medium text-on-dark/75">Loading your cart…</p>
            </div>
          ) : error ? (
            <p className="rounded-[1.25rem] border border-danger/35 bg-danger/15 px-5 py-4 text-sm text-on-dark">
              {error}
            </p>
          ) : items.length === 0 ? (
            <section className="rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-[#f9fcfb] to-[#edf4ff] p-10 text-center">
              <p className="font-display text-xl font-semibold text-[#0d2137]">Your cart is empty</p>
              <p className="mt-2 text-sm text-[#3e5870]">
                Browse the catalogue and add pack sizes from any product page.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#3d9bff] via-[#1a73e8] to-[#1459b8] px-8 py-3 text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(26,115,232,0.5)] transition hover:-translate-y-0.5"
              >
                Browse products
              </Link>
            </section>
          ) : (
            <div className="relative lg:flex lg:items-stretch lg:gap-6">
              <ul className="min-w-0 flex-1 space-y-4">
                {items.map((item) => (
                  <CartLineCard
                    key={item.slug}
                    item={item}
                    summaryCurrency={summary.currencyHint}
                    busy={busySlug === item.slug}
                    onDecrement={() =>
                      void setQty(item.slug, Math.max(1, Number(item.quantity ?? 1) - 1))
                    }
                    onIncrement={() => void setQty(item.slug, Math.max(1, Number(item.quantity ?? 1)) + 1)}
                    onRemove={() => void removeItem(item.slug)}
                  />
                ))}
              </ul>

              <CartStickySummary>
                <CartOrderSummary items={items} mode="cart" />
              </CartStickySummary>
            </div>
          )}
      </div>
    </div>
  );
}
