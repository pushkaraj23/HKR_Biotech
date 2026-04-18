"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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

  const onSignOut = useCallback(() => {
    setMenuOpen(false);
    void signOut();
  }, [signOut]);

  const firstName = user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "there";

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        className="rounded-full shadow-[0_8px_28px_-8px_rgba(8,26,120,0.35)] ring-2 ring-white/25 transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label="Account menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <UserAvatar user={user} size="lg" />
      </button>
      {menuOpen ? (
        <div
          className="absolute right-0 z-[60] mt-2 w-[min(calc(100vw-2rem),14rem)] rounded-2xl border border-white/20 bg-surface/98 py-1 text-secondary-foreground shadow-elevated-lg backdrop-blur-xl"
          role="menu"
        >
          <p className="border-b border-white/15 px-4 py-2.5 text-sm text-secondary-foreground/95 lg:hidden">
            Hi, <span className="font-semibold text-secondary-foreground">{firstName}</span>!
          </p>
          <p className="border-b border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-secondary-foreground/65 lg:hidden">
            {user.email}
          </p>
          <Link
            href="/contact"
            className="block px-4 py-2.5 text-sm text-secondary-foreground/90 transition-colors hover:bg-white/10 hover:text-secondary-foreground"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            Contact / Enquire
          </Link>
          <button
            type="button"
            className="w-full px-4 py-2.5 text-left text-sm text-secondary-foreground/90 transition-colors hover:bg-white/10 hover:text-secondary-foreground"
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
