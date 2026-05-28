"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function CheckoutPage() {
  const { user, configured } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!configured || !user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/user/cart", { headers: { Authorization: `Bearer ${token}` } });
        const body = (await res.json()) as { items?: CartItem[]; error?: string };
        if (!res.ok) throw new Error(body.error || "Could not load cart");
        if (!cancelled) setItems(body.items ?? []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load cart");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [configured, user]);

  const summary = summarizeCart(items);

  return (
    <div className={COMMERCE_PAGE_SHELL}>
      <PageAmbientGraphics variant="right" opacity="opacity-[0.14]" />
      <div className={cn(COMMERCE_PAGE_INNER, "pt-6")}>
        {!user ? (
          <section className="rounded-[1.5rem] border border-white/15 bg-white/8 p-8 text-center backdrop-blur-md">
            <p className="text-base text-on-dark/88">Sign in to proceed to checkout.</p>
            <Link
              href="/login?callbackUrl=%2Fcheckout"
              className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#5eecc0] via-[#2bc48a] to-[#1aab72] px-8 py-3 text-sm font-bold text-[#053d2c] shadow-[0_12px_32px_-8px_rgba(43,196,138,0.5)] transition hover:-translate-y-0.5"
            >
              Sign in
            </Link>
          </section>
        ) : loading ? (
          <div className="flex items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/5 py-20">
            <p className="text-sm font-medium text-on-dark/75">Loading checkout…</p>
          </div>
        ) : error ? (
          <p className="rounded-[1.25rem] border border-danger/35 bg-danger/15 px-5 py-4 text-sm text-on-dark">
            {error}
          </p>
        ) : items.length === 0 ? (
          <section className="rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-[#f9fcfb] to-[#edf4ff] p-10 text-center">
            <p className="font-display text-xl font-semibold text-[#0d2137]">Your cart is empty</p>
            <p className="mt-2 text-sm text-[#3e5870]">Add products before checkout.</p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#3d9bff] via-[#1a73e8] to-[#1459b8] px-8 py-3 text-sm font-bold text-white"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <div className="relative flex flex-col gap-12 max-lg:gap-14 lg:flex-row lg:items-start lg:gap-6">
            <section className="min-w-0 flex-1 rounded-[1.5rem] border border-white/40 bg-gradient-to-br from-[#f9fcfb] via-[#f2f9f5] to-[#edf4ff] p-6 shadow-[0_16px_48px_-20px_rgba(2,10,99,0.28)]">
              <h2 className="font-display text-lg font-bold text-[#0d2137]">Order review</h2>
              <p className="mt-1 text-sm text-[#3e5870]">
                Confirm line items, then pay securely with Razorpay.
              </p>
              <ul className="mt-5 space-y-4">
                {items.map((item) => {
                  const qty = Math.max(1, Number(item.quantity ?? 1));
                  const unit = parsePriceAmount(item.variantPrice);
                  const lineTotal = unit === null ? null : unit * qty;
                  const productSlug = item.productSlug || item.slug.split("__")[0] || item.slug;

                  return (
                    <li
                      key={item.slug}
                      className="flex flex-col gap-1 border-b border-[#cfddee]/80 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-mono text-[10px] text-[#567089]">{item.catalogNumber}</p>
                        <Link
                          href={`/products/${item.categorySlug}/${productSlug}`}
                          className="font-display text-base font-semibold text-[#0d2137] hover:text-[#1a73e8]"
                        >
                          {item.chemicalName}
                        </Link>
                        {item.variantSize ? (
                          <p className="mt-0.5 text-sm text-[#3e5870]">Size: {item.variantSize}</p>
                        ) : null}
                        <p className="text-xs text-[#7a8aa0]">Qty {qty}</p>
                      </div>
                      <p className="font-mono text-sm font-semibold text-[#1a73e8]">
                        {lineTotal !== null
                          ? formatMoney(lineTotal, summary.currencyHint)
                          : item.variantPrice?.trim() || "Quote on request"}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/cart"
                className="mt-5 inline-flex text-sm font-semibold text-[#1459b8] hover:text-[#1a73e8]"
              >
                ← Edit cart
              </Link>
            </section>

            <CartStickySummary>
              <CartOrderSummary items={items} mode="checkout" />
            </CartStickySummary>
          </div>
        )}
      </div>
    </div>
  );
}
