"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

type WishlistItem = {
  slug: string;
  chemicalName: string;
  catalogNumber: string;
  categorySlug: string;
  shortDescription: string;
  purity: string;
  availability: string;
  imageUrl?: string;
};

export default function WishlistPage() {
  const { user, configured } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busySlug, setBusySlug] = useState<string | null>(null);

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
        const res = await fetch("/api/user/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = (await res.json()) as { items?: WishlistItem[]; error?: string };
        if (!res.ok) throw new Error(body.error || "Could not load wishlist");
        if (!cancelled) setItems(body.items ?? []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load wishlist");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [configured, user]);

  async function moveToCart(item: WishlistItem) {
    if (!user) return;
    setBusySlug(item.slug);
    setError(null);
    try {
      const token = await user.getIdToken();
      const addRes = await fetch("/api/user/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...item, quantity: 1 }),
      });
      const addBody = (await addRes.json().catch(() => null)) as { error?: string } | null;
      if (!addRes.ok) throw new Error(addBody?.error || "Could not add to cart");

      const delRes = await fetch(`/api/user/wishlist?slug=${encodeURIComponent(item.slug)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const delBody = (await delRes.json().catch(() => null)) as { error?: string } | null;
      if (!delRes.ok) throw new Error(delBody?.error || "Added to cart, but failed to remove from wishlist");

      setItems((prev) => prev.filter((x) => x.slug !== item.slug));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not move item to cart");
    } finally {
      setBusySlug(null);
    }
  }

  async function removeFromWishlist(slug: string) {
    if (!user) return;
    setBusySlug(slug);
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/user/wishlist?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(body?.error || "Could not remove from wishlist");
      setItems((prev) => prev.filter((x) => x.slug !== slug));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not remove from wishlist");
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
          <h1 className="mt-2 font-display text-3xl font-bold text-on-dark">Wishlist</h1>
          <p className="mt-2 text-sm text-on-dark/80">Saved products are tied to your account.</p>
        </section>

        {!user ? (
          <section className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-6">
            <p className="text-sm text-on-dark/84">
              Sign in to view your wishlist.
            </p>
            <Link href="/login?callbackUrl=%2Fwishlist" className="mt-4 inline-flex btn-glass btn-glass-blue-dark rounded-full px-6 py-2.5 text-sm font-semibold">
              Sign in
            </Link>
          </section>
        ) : loading ? (
          <p className="text-sm text-on-dark/75">Loading wishlist...</p>
        ) : error ? (
          <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-on-dark">{error}</p>
        ) : items.length === 0 ? (
          <section className="rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)] p-6">
            <p className="text-sm text-on-dark/84">No saved products yet.</p>
            <Link href="/products" className="mt-4 inline-flex rounded-full border border-on-dark/30 px-6 py-2.5 text-sm font-semibold text-on-dark">
              Browse products
            </Link>
          </section>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <li key={item.slug} className="relative overflow-hidden rounded-2xl border border-on-dark/20 bg-[rgba(18,25,35,0.5)]">
                <div className="p-5">
                  <button
                    type="button"
                    disabled={busySlug === item.slug}
                    onClick={() => void removeFromWishlist(item.slug)}
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-danger/40 bg-danger/12 text-danger transition hover:border-danger/55 hover:bg-danger/20 disabled:opacity-60"
                    aria-label="Remove from wishlist"
                    title={busySlug === item.slug ? "Removing..." : "Remove from wishlist"}
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
                  <p className="font-mono text-[10px] text-on-dark/65">{item.catalogNumber}</p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-on-dark">
                    <Link href={`/products/${item.categorySlug}/${item.slug}`} className="hover:text-primary">
                      {item.chemicalName}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-on-dark/78">{item.shortDescription}</p>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/products/${item.categorySlug}/${item.slug}`} className="rounded-full border border-on-dark/30 px-4 py-1.5 text-xs font-semibold text-on-dark/90">
                      View
                    </Link>
                    <button
                      type="button"
                      disabled={busySlug === item.slug}
                      onClick={() => void moveToCart(item)}
                      className="rounded-full border border-on-dark/30 bg-[rgba(18,25,35,0.52)] px-4 py-1.5 text-xs font-semibold text-on-dark/90 disabled:opacity-60"
                    >
                      {busySlug === item.slug ? "Moving..." : "Move to cart"}
                    </button>
                    <Link href={`/contact?product=${encodeURIComponent(item.catalogNumber)}`} className="btn-glass btn-glass-green-light rounded-full px-4 py-1.5 text-xs font-semibold">
                      Enquire
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
