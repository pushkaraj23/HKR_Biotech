import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

function getProductFamilyLinks() {
  const item = mainNav.find((i) => i.href === "/products");
  return item && "children" in item ? item.children : [];
}

const productFamilies = getProductFamilyLinks();

const exploreLinks = mainNav.map((item) => ({
  href: item.href,
  label: item.label,
}));

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-slate-300/90 transition-colors duration-200 hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
      {children}
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Outer gradient wrapper */}
      <div
        className="relative overflow-hidden rounded-t-[2.5rem] sm:rounded-t-[3rem]"
        style={{
          background:
            "linear-gradient(155deg, #121f38 0%, #162847 30%, #1a2540 60%, #1e1a32 100%)",
        }}
      >
        {/* Vivid ambient orbs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute -left-[12%] top-[-8%] h-[min(32rem,65vw)] w-[min(32rem,65vw)] rounded-full blur-[100px] opacity-[0.35]"
            style={{
              background:
                "radial-gradient(circle at 45% 40%, rgba(20,184,166,0.7), rgba(15,118,110,0.2) 48%, transparent 68%)",
            }}
          />
          <div
            className="absolute -right-[10%] top-[15%] h-[min(28rem,55vw)] w-[min(28rem,55vw)] rounded-full blur-[90px] opacity-[0.3]"
            style={{
              background:
                "radial-gradient(circle at 55% 45%, rgba(91,33,182,0.65), rgba(124,58,237,0.15) 46%, transparent 65%)",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-[20%] h-[min(24rem,50vw)] w-[min(24rem,50vw)] rounded-full blur-[100px] opacity-[0.25]"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(159,18,57,0.6), rgba(190,24,93,0.12) 48%, transparent 68%)",
            }}
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Top gradient glow line */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(20,184,166,0.6) 25%, rgba(91,33,182,0.5) 50%, rgba(159,18,57,0.4) 75%, transparent 95%)",
          }}
          aria-hidden
        />

        {/* Floating glass orbs (decorative) */}
        <div className="pointer-events-none absolute right-[8%] top-10 hidden sm:block" aria-hidden>
          <div
            className="h-14 w-14 rounded-full animate-float-soft"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25), rgba(20,184,166,0.4) 55%, rgba(15,118,110,0.2))",
              boxShadow: "0 8px 28px -6px rgba(20,184,166,0.4), inset 0 -2px 6px rgba(0,0,0,0.15)",
            }}
          />
        </div>
        <div className="pointer-events-none absolute bottom-[20%] left-[6%] hidden lg:block" aria-hidden>
          <div
            className="h-8 w-8 rounded-full animate-float-soft"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25), rgba(124,58,237,0.4) 55%, rgba(91,33,182,0.2))",
              boxShadow: "0 6px 20px -4px rgba(91,33,182,0.35), inset 0 -1px 4px rgba(0,0,0,0.15)",
              animationDelay: "-3s",
            }}
          />
        </div>
        <div className="pointer-events-none absolute bottom-[35%] right-[15%] hidden lg:block" aria-hidden>
          <div
            className="h-6 w-6 rounded-full animate-float-soft"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25), rgba(225,29,72,0.35) 55%, rgba(159,18,57,0.15))",
              boxShadow: "0 4px 16px -3px rgba(159,18,57,0.3), inset 0 -1px 3px rgba(0,0,0,0.15)",
              animationDelay: "-6s",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="inline-flex transition-transform duration-200 hover:scale-[1.02]"
                aria-label="HKR Biotech Labs home"
              >
                <BrandLogo size="md" priority={false} />
              </Link>
              <h2 className="mt-7 font-display text-xl font-bold tracking-tight text-white">
                Evidence-grade chemistry
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                Custom synthesis, analytical rigor, and documentation you can defend — from
                early route scouting through GMP-ready packages.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-teal-500/25 bg-teal-500/[0.08] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-teal-300 shadow-[0_0_12px_-2px_rgba(20,184,166,0.2)]">
                  Analytical depth
                </span>
                <span className="rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-violet-300 shadow-[0_0_12px_-2px_rgba(91,33,182,0.2)]">
                  cGMP mindset
                </span>
                <span className="rounded-full border border-rose-500/25 bg-rose-500/[0.08] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-rose-300 shadow-[0_0_12px_-2px_rgba(159,18,57,0.2)]">
                  Global supply
                </span>
              </div>
            </div>

            {/* Explore links */}
            <nav className="lg:col-span-2" aria-label="Site sections">
              <SectionLabel>Explore</SectionLabel>
              <ul className="mt-5 space-y-3.5">
                {exploreLinks.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Product families */}
            <div className="lg:col-span-3">
              <SectionLabel>Product families</SectionLabel>
              <ul className="mt-5 space-y-3.5">
                {productFamilies.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
                <li>
                  <FooterLink
                    href="/products"
                    className="font-medium text-teal-400 hover:text-teal-300"
                  >
                    Full catalogue →
                  </FooterLink>
                </li>
              </ul>
            </div>

            {/* Contact — glass card */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                <SectionLabel>Contact</SectionLabel>
                <address className="mt-5 not-italic">
                  <p className="text-sm leading-relaxed">
                    <span className="text-white/35">Email</span>
                    <br />
                    <a
                      href="mailto:enquiries@hkrbio.tech"
                      className="text-white underline decoration-white/20 underline-offset-2 transition hover:decoration-teal-400/70"
                    >
                      enquiries@hkrbio.tech
                    </a>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed">
                    <span className="text-white/35">Phone</span>
                    <br />
                    <a
                      href="tel:+15550104420"
                      className="text-white underline decoration-white/20 underline-offset-2 transition hover:decoration-teal-400/70"
                    >
                      +1 (555) 010-4420
                    </a>
                  </p>
                  <p className="mt-4 text-[11px] leading-relaxed text-white/30">
                    Headquarters &amp; analytical hub — address available on request.
                  </p>
                </address>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full py-2.5 text-xs font-semibold text-white shadow-[0_12px_28px_-8px_rgba(20,184,166,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(20,184,166,0.5)]"
                    style={{
                      background:
                        "linear-gradient(135deg, #14b8a6 0%, #2dd4bf 50%, #7c3aed 100%)",
                    }}
                  >
                    Request an RFQ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 border-t border-white/[0.06] pt-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/30">
                © {year} HKR Biotech Labs. All rights reserved.
              </p>
              <p className="max-w-xl text-right text-[11px] leading-relaxed text-white/25 sm:max-w-md">
                Carbohydrates · API impurities · nucleotide building blocks — manufactured
                with traceable documentation and QC you can audit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
