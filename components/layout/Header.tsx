"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
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
        "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200",
        active
          ? "bg-slate-900/[0.06] text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
          : "text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900",
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
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

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
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2 sm:gap-4 sm:px-6 sm:py-2.5",
          "border border-white/60 bg-white/75 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08),0_2px_8px_-2px_rgba(15,23,42,0.04)] backdrop-blur-2xl backdrop-saturate-150",
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
          className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Main"
        >
          {mainNav.map((item) => {
            if (item.href === "/products" && "children" in item && item.children) {
              const active =
                pathname === "/products" || pathname.startsWith("/products/");
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <div className="flex items-center rounded-full px-0.5">
                    <Link
                      href="/products"
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200",
                        active
                          ? "bg-slate-900/[0.06] text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                          : "text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900",
                      )}
                    >
                      {item.label}
                    </Link>
                    <span className="text-sm text-slate-400" aria-hidden>
                      ▾
                    </span>
                  </div>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 mt-3 w-[17rem] -translate-x-1/2 rounded-2xl border border-slate-200/70 bg-white p-2 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)] transition-all duration-200",
                      productsOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <p className="px-3 pb-2 pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                      Browse
                    </p>
                    <ul className="space-y-0.5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-900/[0.04] hover:text-slate-900"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/products"
                      className="mt-1 block rounded-xl px-3 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-50/60"
                    >
                      Full catalogue →
                    </Link>
                  </div>
                </div>
              );
            }
            const href = "href" in item ? item.href : "/";
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <NavItem key={href} href={href} active={!!active}>
                {item.label}
              </NavItem>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden shrink-0 lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f766e,#14b8a6)] px-6 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(15,118,110,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(15,118,110,0.4)]"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur-lg transition-colors hover:bg-slate-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav-landing"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav-landing"
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.12)] backdrop-blur-2xl lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="divide-y divide-slate-100 px-2 py-2">
          {mainNav.map((item) => {
            const href = "href" in item ? item.href : "/";
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {"children" in item && item.children ? (
                  <ul className="pb-2 pl-6">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-sm text-slate-500 transition-colors hover:text-slate-800"
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
            <Link
              href="/contact"
              className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f766e,#14b8a6)] px-6 py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(15,118,110,0.35)]"
              onClick={() => setOpen(false)}
            >
              Enquire
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
