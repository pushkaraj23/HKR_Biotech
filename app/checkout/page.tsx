"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { CartOrderSummary } from "@/components/commerce/CartOrderSummary";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import type { CartItem } from "@/lib/commerce/cart-types";
import {
  formatMoney,
  parsePriceAmount,
  summarizeCart,
} from "@/lib/commerce/cart-pricing";

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
    <div className="relative overflow-x-hidden pb-20">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.14]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.58)] p-7 backdrop-blur-xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-mid">Checkout</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-on-dark">Complete your order</h1>
          <p className="mt-2 text-sm text-on-dark/80">
            Review your cart below. Razorpay payment will be connected in a future update.
          </p>
        </section>

        {!user ? (
          <section className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-6">
            <p className="text-sm text-on-dark/84">Sign in to proceed to checkout.</p>
            <Link
              href="/login?callbackUrl=%2Fcheckout"
              className="mt-4 inline-flex btn-glass btn-glass-blue-dark rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Sign in
            </Link>
          </section>
        ) : loading ? (
          <p className="text-sm text-on-dark/75">Loading checkout...</p>
        ) : error ? (
          <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-on-dark">{error}</p>
        ) : items.length === 0 ? (
          <section className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-6">
            <p className="text-sm text-on-dark/84">Your cart is empty. Add products before checkout.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex rounded-full border border-on-dark/30 px-6 py-2.5 text-sm font-semibold text-on-dark"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            <section className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-6">
              <h2 className="font-display text-lg font-semibold text-on-dark">Order review</h2>
              <ul className="mt-4 space-y-4">
                {items.map((item) => {
                  const qty = Math.max(1, Number(item.quantity ?? 1));
                  const unit = parsePriceAmount(item.variantPrice);
                  const lineTotal = unit === null ? null : unit * qty;
                  const productSlug = item.productSlug || item.slug.split("__")[0] || item.slug;

                  return (
                    <li
                      key={item.slug}
                      className="flex flex-col gap-1 border-b border-on-dark/15 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-mono text-[10px] text-on-dark/65">{item.catalogNumber}</p>
                        <Link
                          href={`/products/${item.categorySlug}/${productSlug}`}
                          className="font-display text-base font-semibold text-on-dark hover:text-primary"
                        >
                          {item.chemicalName}
                        </Link>
                        {item.variantSize ? (
                          <p className="mt-0.5 text-sm text-on-dark/75">Size: {item.variantSize}</p>
                        ) : null}
                        <p className="text-xs text-on-dark/60">Qty {qty}</p>
                      </div>
                      <p className="font-mono text-sm font-semibold text-on-dark">
                        {lineTotal !== null
                          ? formatMoney(lineTotal, summary.currencyHint)
                          : item.variantPrice?.trim() || "Quote on request"}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>

            <CartOrderSummary items={items} mode="checkout" />
          </div>
        )}
      </div>
    </div>
  );
}
