"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeaderAccountMenu } from "@/components/auth/HeaderAccountMenu";
import { EnquireGateLink } from "@/components/auth/EnquireGateLink";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useAuth } from "@/components/providers/AuthProvider";
import { GlobalSearch, SearchTrigger } from "@/components/search/GlobalSearch";
import { ProductsNavFlyout } from "@/components/layout/ProductsNavFlyout";
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
          ? "bg-white/15 text-on-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          : "text-on-dark/90 hover:bg-white/10 hover:text-on-dark",
      )}
    >
      {children}
    </Link>
  );
}

const SCROLL_DOWN_THRESHOLD = 6;
const SCROLL_UP_THRESHOLD = 4;
const TOP_REVEAL_PX = 24;

import type { ProductNavCategory } from "@/components/layout/ProductsNavFlyout";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, signOut, configured } = useAuth();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [productNavItems, setProductNavItems] = useState<ProductNavCategory[]>([]);
  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  const activeSubcategorySlug = searchParams.get("subcategory");

  const openSearch = useCallback(() => setSearchOpen(true), []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/catalog/nav")
      .then((r) => r.json())
      .then((d: { items?: ProductNavCategory[] }) => {
        if (!cancelled && Array.isArray(d.items)) {
          setProductNavItems(
            d.items.map((c) => ({
              href: String(c.href ?? ""),
              label: String(c.label ?? ""),
              slug: String(c.slug ?? ""),
              subcategories: Array.isArray(c.subcategories)
                ? c.subcategories.map((s) => ({
                    href: String(s.href ?? ""),
                    label: String(s.label ?? ""),
                    slug: String(s.slug ?? ""),
                  }))
                : [],
            })),
          );
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
        setHoveredCategorySlug(null);
      } else if (currentY < prevY - SCROLL_UP_THRESHOLD) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setMobileProductsOpen(false);
    }
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
              className="truncate rounded-full border border-white/25 bg-surface/90 px-3 py-2 text-[12px] text-on-dark/95 shadow-elevated-lg backdrop-blur-xl xl:px-3.5 xl:text-[13px]"
              title={user.email ?? undefined}
            >
              Hi, <span className="font-semibold text-on-dark">{firstName}</span>!
            </p>
          </div>
        ) : null}

        <div className={cn("min-w-0", user && configured ? "flex-1" : "w-full")}>
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-full px-4 py-2 sm:gap-4 sm:px-6 sm:py-2.5",
              "border border-white/20 bg-surface/85 text-on-dark shadow-[0_8px_32px_-8px_rgba(8,26,120,0.25),0_2px_8px_-2px_rgba(8,26,120,0.12)] backdrop-blur-2xl backdrop-saturate-150",
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
                  onMouseLeave={() => {
                    setProductsOpen(false);
                    setHoveredCategorySlug(null);
                  }}
                >
                  <div className="flex shrink-0 items-center rounded-full px-0.5">
                    <Link
                      href="/products"
                      className={cn(
                        "whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-200 xl:px-3.5 xl:text-[13px]",
                        active
                          ? "bg-white/15 text-on-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                          : "text-on-dark/90 hover:bg-white/10 hover:text-on-dark",
                      )}
                    >
                      {item.label}
                    </Link>
                    <span className="shrink-0 pr-1 text-xs text-on-dark/75" aria-hidden>
                      ▾
                    </span>
                  </div>

                  <ProductsNavFlyout
                    open={productsOpen}
                    categories={productNavItems}
                    pathname={pathname}
                    activeSubcategorySlug={activeSubcategorySlug}
                    hoveredCategorySlug={hoveredCategorySlug}
                    onHoverCategory={setHoveredCategorySlug}
                  />
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
            className="inline-flex items-center justify-center btn-glass btn-glass-green-dark rounded-full px-6 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact
          </EnquireGateLink>
        </div>

        {/* Mobile: search + burger */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-on-dark shadow-sm backdrop-blur-lg transition-colors hover:bg-white/15 hover:text-on-dark"
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-on-dark shadow-sm backdrop-blur-lg transition-colors hover:bg-white/15"
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
          "mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/20 bg-surface/95 text-on-dark shadow-elevated-lg backdrop-blur-2xl lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="divide-y divide-white/15 px-2 py-2">
          {mainNav.map((item) => {
            const href = item.href;
            const isProducts = "productDropdown" in item && item.productDropdown;
            return (
              <li key={href}>
                {isProducts ? (
                  <div className="flex items-center gap-2 rounded-xl px-3 py-1">
                    <Link
                      href={href}
                      className="flex-1 rounded-xl py-2 text-sm font-medium text-on-dark transition-colors hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {productNavItems.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setMobileProductsOpen((v) => !v)}
                        aria-expanded={mobileProductsOpen}
                        aria-label={mobileProductsOpen ? "Collapse product categories" : "Expand product categories"}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-on-dark/80 transition hover:bg-white/10 hover:text-on-dark"
                      >
                        <span
                          className={cn(
                            "text-sm transition-transform duration-200",
                            mobileProductsOpen ? "rotate-180" : "rotate-0",
                          )}
                          aria-hidden
                        >
                          ▾
                        </span>
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    href={href}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-on-dark transition-colors hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {isProducts && productNavItems.length > 0 && mobileProductsOpen ? (
                  <ul className="space-y-1 pb-2 pl-4">
                    {productNavItems.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={cat.href}
                          className="block py-2 text-sm font-medium text-on-dark/90 transition-colors hover:text-on-dark"
                          onClick={() => setOpen(false)}
                        >
                          {cat.label}
                        </Link>
                        {cat.subcategories.length > 0 ? (
                          <ul className="space-y-0.5 border-l border-white/15 pl-3">
                            {cat.subcategories.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  href={sub.href}
                                  className="block py-1.5 text-sm text-on-dark/75 transition-colors hover:text-on-dark"
                                  onClick={() => setOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
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
              className="flex w-full items-center justify-center btn-glass btn-glass-green-dark rounded-full px-6 py-2.5 text-xs font-semibold"
              onClick={() => setOpen(false)}
            >
              Contact
            </EnquireGateLink>
          </li>
        </ul>
      </div>
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
