"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { trackProductInterestClient } from "@/lib/analytics/track-product-interest";
import { loginPathWithCallback } from "@/lib/auth/return-url";
import { cn } from "@/lib/cn";

type ProductLite = {
  slug: string;
  catalogNumber: string;
  categorySlug: string;
  chemicalName: string;
  shortDescription: string;
  purity: string;
  availability: string;
  imageUrl?: string;
};

export function UserProductActions({
  product,
  className,
  compact,
  surface = "dark",
  showCart = true,
}: {
  product: ProductLite;
  className?: string;
  compact?: boolean;
  /** Wishlist row: match product card glass (catalogue) or default dark glass (PDP). */
  surface?: "dark" | "light";
  /** Hide cart control (e.g. product detail page uses the ordering panel for cart). */
  showCart?: boolean;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [savingWish, setSavingWish] = useState(false);
  const [savingCart, setSavingCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [wishLoaded, setWishLoaded] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Resolve current wishlist status for this product so the heart icon can be filled/empty.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (!user) {
        if (!cancelled) {
          setWishlisted(false);
          setWishLoaded(true);
        }
        return;
      }
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/user/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = (await res.json().catch(() => null)) as { items?: Array<{ slug?: string }> } | null;
        const exists = Boolean(body?.items?.some((item) => item.slug === product.slug));
        if (!cancelled) {
          setWishlisted(exists);
        }
      } catch {
        if (!cancelled) {
          setWishlisted(false);
        }
      } finally {
        if (!cancelled) {
          setWishLoaded(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [product.slug, user]);

  useEffect(() => {
    if (!showCart) {
      setInCart(false);
      setCartLoaded(true);
      return;
    }
    let cancelled = false;
    void (async () => {
      if (!user) {
        if (!cancelled) {
          setInCart(false);
          setCartLoaded(true);
        }
        return;
      }
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/user/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = (await res.json().catch(() => null)) as { items?: Array<{ slug?: string }> } | null;
        const exists = Boolean(body?.items?.some((item) => item.slug === product.slug));
        if (!cancelled) {
          setInCart(exists);
        }
      } catch {
        if (!cancelled) {
          setInCart(false);
        }
      } finally {
        if (!cancelled) {
          setCartLoaded(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [product.slug, showCart, user]);

  async function withAuth(action: () => Promise<void>) {
    if (!user) {
      router.push(loginPathWithCallback(pathname || "/products"));
      return;
    }
    await action();
  }

  async function addWishlist() {
    await withAuth(async () => {
      setSavingWish(true);
      setMsg(null);
      try {
        const token = await user!.getIdToken();
        const res = await fetch("/api/user/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(product),
        });
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        if (!res.ok) throw new Error(body?.error || "Could not add to wishlist");
        setWishlisted(true);
        await trackProductInterestClient(
          "wishlist_add",
          {
            slug: product.slug,
            categorySlug: product.categorySlug,
            chemicalName: product.chemicalName,
            catalogNumber: product.catalogNumber,
          },
          token,
        );
        setMsg("Added to wishlist");
      } catch (error) {
        setMsg(error instanceof Error ? error.message : "Could not add to wishlist");
      } finally {
        setSavingWish(false);
      }
    });
  }

  async function removeWishlist() {
    await withAuth(async () => {
      setSavingWish(true);
      setMsg(null);
      try {
        const token = await user!.getIdToken();
        const res = await fetch(`/api/user/wishlist?slug=${encodeURIComponent(product.slug)}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        if (!res.ok) throw new Error(body?.error || "Could not remove from wishlist");
        setWishlisted(false);
        setMsg("Removed from wishlist");
      } catch (error) {
        setMsg(error instanceof Error ? error.message : "Could not remove from wishlist");
      } finally {
        setSavingWish(false);
      }
    });
  }

  const stateLoading = !wishLoaded || (showCart && !cartLoaded);

  async function addCart() {
    await withAuth(async () => {
      if (inCart) return;
      setSavingCart(true);
      setMsg(null);
      try {
        const token = await user!.getIdToken();
        const res = await fetch("/api/user/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ...product, quantity: 1 }),
        });
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        if (!res.ok) throw new Error(body?.error || "Could not add to cart");
        setInCart(true);
        await trackProductInterestClient(
          "cart_add",
          {
            slug: product.slug,
            categorySlug: product.categorySlug,
            chemicalName: product.chemicalName,
            catalogNumber: product.catalogNumber,
          },
          token,
        );
        setMsg("Added to cart");
      } catch (error) {
        setMsg(error instanceof Error ? error.message : "Could not add to cart");
      } finally {
        setSavingCart(false);
      }
    });
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void (wishlisted ? removeWishlist() : addWishlist())}
          disabled={savingWish || stateLoading}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full border transition disabled:opacity-60",
            surface === "light"
              ? "border-[#17324d]/20 bg-white/88 text-[#17324d] hover:border-primary/45 hover:text-[#0d2137]"
              : "border-on-dark/30 bg-[rgba(18,25,35,0.48)] text-on-dark/90 hover:border-primary/40 hover:text-on-dark",
            compact && "h-8 w-8",
            wishlisted &&
              (surface === "light"
                ? "border-primary/50 bg-primary/12 text-primary"
                : "border-primary/55 bg-primary/20 text-primary-mid"),
          )}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={wishlisted ? "Wishlisted" : "Add to wishlist"}
        >
          {savingWish ? (
            <span className="text-[10px]">...</span>
          ) : (
            <HeartIcon filled={wishlisted} />
          )}
        </button>
        {showCart ? (
          <button
            type="button"
            onClick={() => void addCart()}
            disabled={savingCart || inCart || stateLoading}
            className={cn(
              "btn-glass btn-glass-green-light rounded-full px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 disabled:opacity-60",
              inCart && "cursor-default opacity-75",
              compact && "px-3 py-1.5 text-[11px]",
            )}
          >
            {savingCart ? "Adding..." : inCart ? "Added" : "Add to cart"}
          </button>
        ) : null}
      </div>
      {msg ? (
        <p className={cn("text-[11px]", surface === "light" ? "text-[#234a62]/85" : "text-on-dark/75")}>{msg}</p>
      ) : null}
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-6.7-4.35-9.2-8.09C.56 9.58 2.34 5.5 6.08 4.77A5.44 5.44 0 0 1 12 7.42a5.44 5.44 0 0 1 5.92-2.65c3.74.73 5.52 4.81 3.28 8.14C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}
