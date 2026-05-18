"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

type CartItem = {
  slug: string;
  productSlug?: string;
  variantSize?: string;
  variantPrice?: string;
  chemicalName: string;
  catalogNumber: string;
  categorySlug: string;
  shortDescription: string;
  purity: string;
  availability: string;
  quantity: number;
};

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

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + Math.max(1, Number(i.quantity ?? 1)), 0),
    [items],
  );

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
    <div className="relative overflow-x-hidden pb-20">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.14]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.58)] p-7 backdrop-blur-xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-mid">Account</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-on-dark">Cart</h1>
          <p className="mt-2 text-sm text-on-dark/80">Saved items: {totalItems}</p>
        </section>

        {!user ? (
          <section className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-6">
            <p className="text-sm text-on-dark/84">Sign in to access your cart.</p>
            <Link href="/login?callbackUrl=%2Fcart" className="mt-4 inline-flex btn-glass btn-glass-blue-dark rounded-full px-6 py-2.5 text-sm font-semibold">
              Sign in
            </Link>
          </section>
        ) : loading ? (
          <p className="text-sm text-on-dark/75">Loading cart...</p>
        ) : error ? (
          <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-on-dark">{error}</p>
        ) : items.length === 0 ? (
          <section className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-6">
            <p className="text-sm text-on-dark/84">Your cart is empty.</p>
            <Link href="/products" className="mt-4 inline-flex rounded-full border border-on-dark/30 px-6 py-2.5 text-sm font-semibold text-on-dark">
              Browse products
            </Link>
          </section>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => {
              const productSlug = item.productSlug || item.slug.split("__")[0] || item.slug;
              return (
              <li key={item.slug} className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] text-on-dark/65">{item.catalogNumber}</p>
                    <h2 className="mt-1 font-display text-lg font-semibold text-on-dark">
                      <Link href={`/products/${item.categorySlug}/${productSlug}`} className="hover:text-primary">
                        {item.chemicalName}
                      </Link>
                    </h2>
                    {item.variantSize ? (
                      <p className="mt-1 text-sm text-on-dark/80">
                        Size: {item.variantSize}
                        {item.variantPrice ? ` · ${item.variantPrice}` : ""}
                      </p>
                    ) : null}
                    <p className="mt-1 text-xs text-on-dark/70">{item.availability}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={busySlug === item.slug}
                      onClick={() => void setQty(item.slug, Math.max(1, Number(item.quantity ?? 1) - 1))}
                      className="rounded-full border border-on-dark/30 px-3 py-1 text-sm text-on-dark"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center font-mono text-sm text-on-dark">{Math.max(1, Number(item.quantity ?? 1))}</span>
                    <button
                      type="button"
                      disabled={busySlug === item.slug}
                      onClick={() => void setQty(item.slug, Math.max(1, Number(item.quantity ?? 1) + 1))}
                      className="rounded-full border border-on-dark/30 px-3 py-1 text-sm text-on-dark"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      disabled={busySlug === item.slug}
                      onClick={() => void removeItem(item.slug)}
                      className="ml-2 rounded-full border border-danger/45 bg-gradient-to-r from-danger/35 to-danger/20 px-3.5 py-1.5 text-xs font-semibold text-on-dark shadow-[0_8px_20px_-10px_rgba(225,29,72,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:from-danger/45 hover:to-danger/28 hover:shadow-[0_12px_26px_-10px_rgba(225,29,72,0.75)] disabled:cursor-not-allowed disabled:opacity-55"
                      aria-label="Remove from cart"
                      title={busySlug === item.slug ? "Removing..." : "Remove from cart"}
                    >
                      {busySlug === item.slug ? (
                        <span className="text-[10px]">...</span>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
