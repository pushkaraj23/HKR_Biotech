"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UserAvatar } from "@/components/auth/UserAvatar";
import type { User } from "firebase/auth";
import { cn } from "@/lib/cn";

type HeaderAccountMenuProps = {
  user: User;
  signOut: () => void | Promise<void>;
  className?: string;
};

export function HeaderAccountMenu({ user, signOut, className }: HeaderAccountMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const token = await user.getIdToken();
        const [wishlistRes, cartRes] = await Promise.all([
          fetch("/api/user/wishlist", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/user/cart", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const wishlistBody = (await wishlistRes.json().catch(() => null)) as
          | { items?: unknown[] }
          | null;
        const cartBody = (await cartRes.json().catch(() => null)) as
          | { items?: Array<{ quantity?: unknown }> }
          | null;

        if (!cancelled) {
          setWishlistCount(Array.isArray(wishlistBody?.items) ? wishlistBody!.items.length : 0);
          const cartItems = Array.isArray(cartBody?.items) ? cartBody.items : [];
          const totalQty = cartItems.reduce(
            (sum, item) => sum + Math.max(1, Number(item?.quantity ?? 1)),
            0,
          );
          setCartCount(totalQty);
        }
      } catch {
        if (!cancelled) {
          setWishlistCount(0);
          setCartCount(0);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [menuOpen, user]);

  const totalSavedCount = useMemo(
    () => (wishlistCount ?? 0) + (cartCount ?? 0),
    [wishlistCount, cartCount],
  );

  const onSignOut = useCallback(() => {
    setMenuOpen(false);
    void signOut();
  }, [signOut]);

  const firstName = user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "there";

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        className="relative rounded-full shadow-[0_8px_28px_-8px_rgba(8,26,120,0.35)] ring-2 ring-white/25 transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label="Account menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <UserAvatar user={user} size="lg" />
        {totalSavedCount > 0 ? (
          <span className="absolute -right-1 -top-1.5 inline-flex min-w-5 items-center justify-center rounded-full border border-primary/45 bg-cta-gradient p-1 text-[10px] font-bold leading-none text-primary-foreground shadow-primary-glow">
            {totalSavedCount}
          </span>
        ) : null}
      </button>
      {menuOpen ? (
        <div
          className="absolute right-0 z-[60] mt-2 w-[min(calc(100vw-2rem),14rem)] rounded-2xl border border-white/20 bg-surface/98 py-1 text-on-dark shadow-elevated-lg backdrop-blur-xl"
          role="menu"
        >
          <p className="border-b border-white/15 px-4 py-2.5 text-sm text-on-dark/95 lg:hidden">
            Hi, <span className="font-semibold text-on-dark">{firstName}</span>!
          </p>
          <p className="border-b border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-on-dark/70 lg:hidden">
            {user.email}
          </p>
          <Link
            href="/profile"
            className="block px-4 py-2.5 text-sm text-on-dark/90 transition-colors hover:bg-white/10 hover:text-on-dark"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            My profile
          </Link>
          <Link
            href="/wishlist"
            className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-on-dark/90 transition-colors hover:bg-white/10 hover:text-on-dark"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            <span>Wishlist</span>
            {wishlistCount !== null ? (
              <span className="ml-auto rounded-full border border-primary/35 bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary-mid">
                {wishlistCount}
              </span>
            ) : null}
          </Link>
          <Link
            href="/cart"
            className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-on-dark/90 transition-colors hover:bg-white/10 hover:text-on-dark"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            <span>Cart</span>
            {cartCount !== null ? (
              <span className="ml-auto rounded-full border border-primary/35 bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary-mid">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2.5 text-sm text-on-dark/90 transition-colors hover:bg-white/10 hover:text-on-dark"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            Contact / Enquire
          </Link>
          <button
            type="button"
            className="w-full px-4 py-2.5 text-left text-sm text-on-dark/90 transition-colors hover:bg-white/10 hover:text-on-dark"
            role="menuitem"
            onClick={onSignOut}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
