"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
          ? "bg-white/16 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
          : "text-slate-300/90 hover:bg-white/[0.08] hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}

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

      if (open || currentY <= 8) {
        setIsHidden(false);
      } else if (currentY > lastScrollY.current + 4) {
        setIsHidden(true);
        setProductsOpen(false);
      } else if (currentY < lastScrollY.current - 4) {
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
        "sticky top-0 z-50 px-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:px-5 sm:pt-4 lg:px-8",
        isHidden ? "pointer-events-none -translate-y-[120%] opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-4 py-2 shadow-[0_18px_44px_-16px_rgba(2,6,23,0.65)] sm:gap-4 sm:px-6 sm:py-2.5",
          "border-white/15 bg-[linear-gradient(120deg,rgba(15,23,42,0.9),rgba(15,23,42,0.82)_42%,rgba(30,41,59,0.86))] backdrop-blur-2xl backdrop-saturate-150",
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-full bg-white px-3 py-1.5 shadow-[0_8px_22px_-12px_rgba(2,6,23,0.55)] ring-1 ring-white/40 transition-transform duration-200 hover:scale-[1.02]"
          aria-label="HKR Biotech Labs home"
        >
          <BrandLogo size="md" priority />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 rounded-full px-2 py-1 lg:flex"
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
                  <div className="flex items-center rounded-full px-1">
                    <Link
                      href="/products"
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200",
                        active
                          ? "bg-white/16 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
                          : "text-slate-300/90 hover:bg-white/[0.08] hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                    <span className="text-slate-400/90" aria-hidden>
                      ▾
                    </span>
                  </div>
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 mt-3 w-[17rem] -translate-x-1/2 rounded-2xl border border-white/60 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-2 shadow-[0_28px_54px_-14px_rgba(15,23,42,0.28)] transition",
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
                            className="block rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-sky-50 hover:text-sky-900"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/products"
                      className="mt-1 block rounded-xl px-3 py-2 text-xs font-semibold text-sky-700 hover:bg-slate-50"
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

        <div className="hidden shrink-0 lg:block">
          <ButtonLink
            href="/contact"
            className="rounded-full border border-sky-300/35 px-6 py-2 text-xs shadow-[0_12px_28px_-12px_rgba(14,165,233,0.65)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Enquire
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-500/50 bg-slate-900/60 text-slate-200 shadow-inner backdrop-blur-md lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav-landing"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      <div
        id="mobile-nav-landing"
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-slate-600/40 bg-slate-950/75 shadow-xl backdrop-blur-2xl lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="divide-y divide-slate-800/90 px-2 py-2">
          {mainNav.map((item) => {
            const href = "href" in item ? item.href : "/";
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-200"
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
                          className="block py-2 text-sm text-slate-400"
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
            <ButtonLink href="/contact" className="w-full justify-center rounded-full text-xs">
              Enquire
            </ButtonLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
