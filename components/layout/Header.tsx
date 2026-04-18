"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeaderAccountMenu } from "@/components/auth/HeaderAccountMenu";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useAuth } from "@/components/providers/AuthProvider";
import { GlobalSearch, SearchTrigger } from "@/components/search/GlobalSearch";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

function NavItem({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-200 xl:px-3.5 xl:text-[13px]",
        active
          ? "bg-white/15 text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          : "text-secondary-foreground/85 hover:bg-white/10 hover:text-secondary-foreground",
      )}
    >
      {children}
    </Link>
  );
}

const SCROLL_DOWN_THRESHOLD = 6;
const SCROLL_UP_THRESHOLD = 4;
const TOP_REVEAL_PX = 24;

export function Header() {
  const pathname = usePathname();
  const { user, signOut, configured } = useAuth();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [productNavItems, setProductNavItems] = useState<{ href: string; label: string }[]>([]);
  const lastScrollY = useRef(0);

  const openSearch = useCallback(() => setSearchOpen(true), []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/catalog/nav")
      .then((r) => r.json())
      .then((d: { items?: { href: string; label: string }[] }) => {
        if (!cancelled && Array.isArray(d.items)) {
          setProductNavItems(d.items);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  /* Cmd/Ctrl+K to toggle search */
  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const prevY = lastScrollY.current;

      if (open || currentY <= TOP_REVEAL_PX) {
        setIsHidden(false);
      } else if (currentY > prevY + SCROLL_DOWN_THRESHOLD) {
        setIsHidden(true);
        setProductsOpen(false);
      } else if (currentY < prevY - SCROLL_UP_THRESHOLD) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  const firstName =
    user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "there";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transform-gpu px-3 pt-[max(0.75rem,env(safe-area-inset-top))] will-change-transform sm:px-5 sm:pt-[max(1rem,env(safe-area-inset-top))] lg:px-8",
        "transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none",
        isHidden && !open
          ? "pointer-events-none -translate-y-full"
          : "translate-y-0",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 sm:gap-3 lg:gap-4">
        {configured && user ? (
          <div className="hidden min-w-0 max-w-[13rem] shrink-0 lg:block">
            <p
              className="truncate rounded-full border border-white/25 bg-surface/90 px-3 py-2 text-[12px] text-secondary-foreground/90 shadow-elevated-lg backdrop-blur-xl xl:px-3.5 xl:text-[13px]"
              title={user.email ?? undefined}
            >
              Hi, <span className="font-semibold text-secondary-foreground">{firstName}</span>!
            </p>
          </div>
        ) : null}

        <div className={cn("min-w-0", user && configured ? "flex-1" : "w-full")}>
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-full px-4 py-2 sm:gap-4 sm:px-6 sm:py-2.5",
              "border border-white/20 bg-surface/85 text-secondary-foreground shadow-[0_8px_32px_-8px_rgba(8,26,120,0.25),0_2px_8px_-2px_rgba(8,26,120,0.12)] backdrop-blur-2xl backdrop-saturate-150",
            )}
          >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.02]"
          aria-label="HKR Biotech Labs home"
        >
          <BrandLogo size="md" priority />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 lg:flex"
          aria-label="Main"
        >
          {mainNav.map((item) => {
            if ("productDropdown" in item && item.productDropdown) {
              const active =
                pathname === "/products" || pathname.startsWith("/products/");
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <div className="flex shrink-0 items-center rounded-full px-0.5">
                    <Link
                      href="/products"
                      className={cn(
                        "whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-200 xl:px-3.5 xl:text-[13px]",
                        active
                          ? "bg-white/15 text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                          : "text-secondary-foreground/85 hover:bg-white/10 hover:text-secondary-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                    <span className="shrink-0 pr-1 text-xs text-secondary-foreground/70" aria-hidden>
                      ▾
                    </span>
                  </div>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 mt-3 w-[17rem] -translate-x-1/2 rounded-2xl border border-white/20 bg-surface/98 p-2 text-secondary-foreground shadow-elevated-lg backdrop-blur-2xl transition-all duration-200",
                      productsOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <p className="px-3 pb-2 pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-secondary-foreground/65">
                      Browse
                    </p>
                    <ul className="space-y-0.5">
                      {productNavItems.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-xl px-3 py-2.5 text-sm text-secondary-foreground/90 transition-colors hover:bg-white/10 hover:text-secondary-foreground"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/products"
                      className="mt-1 block rounded-xl px-3 py-2 text-xs font-semibold text-primary-mid hover:bg-white/10"
                    >
                      Full catalogue →
                    </Link>
                  </div>
                </div>
              );
            }
            const href = item.href;
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <NavItem key={href} href={href} active={!!active}>
                {item.label}
              </NavItem>
            );
          })}
        </nav>

        {/* Search + CTA */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <SearchTrigger onClick={openSearch} />
          <EnquireGateLink
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-cta-gradient px-6 py-2 text-xs font-semibold text-primary-foreground shadow-primary-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary-glow-lg"
          >
            Enquire
          </EnquireGateLink>
        </div>

        {/* Mobile: search + burger */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-secondary-foreground shadow-sm backdrop-blur-lg transition-colors hover:bg-white/15 hover:text-secondary-foreground"
            aria-label="Search"
            onClick={openSearch}
          >
            <svg className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="M12.5 12.5 17 17" />
            </svg>
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-secondary-foreground shadow-sm backdrop-blur-lg transition-colors hover:bg-white/15"
            aria-expanded={open}
            aria-controls="mobile-nav-landing"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
          </div>
        </div>

        {configured && user ? <HeaderAccountMenu user={user} signOut={signOut} /> : null}
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav-landing"
        className={cn(
          "mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/20 bg-surface/95 text-secondary-foreground shadow-elevated-lg backdrop-blur-2xl lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="divide-y divide-white/15 px-2 py-2">
          {mainNav.map((item) => {
            const href = item.href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {"productDropdown" in item && item.productDropdown && productNavItems.length > 0 ? (
                  <ul className="pb-2 pl-6">
                    {productNavItems.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-sm text-secondary-foreground/80 transition-colors hover:text-secondary-foreground"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
          <li className="px-2 pt-2">
            <EnquireGateLink
              href="/contact"
              className="flex w-full items-center justify-center rounded-full bg-cta-gradient px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-primary-glow"
              onClick={() => setOpen(false)}
            >
              Enquire
            </EnquireGateLink>
          </li>
        </ul>
      </div>
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
