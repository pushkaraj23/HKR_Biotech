import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { getAllCategories } from "@/data/catalog";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

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
        "text-sm font-medium text-white/92 transition-colors duration-200 hover:text-primary-mid hover:underline hover:decoration-primary-mid/80 hover:underline-offset-2",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function SectionLabel({
  children,
  variant = "on-gradient",
}: {
  children: ReactNode;
  variant?: "on-gradient" | "on-card";
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-semibold uppercase tracking-[0.22em]",
        variant === "on-gradient" &&
          "text-primary-mid [text-shadow:0_1px_2px_rgba(8,26,120,0.45)]",
        variant === "on-card" && "text-caption-foreground",
      )}
    >
      {children}
    </p>
  );
}

export async function Footer() {
  const year = new Date().getFullYear();
  const categories = await getAllCategories();
  const productFamilies = categories.map((c) => ({
    href: `/products/${c.slug}`,
    label: c.name,
  }));

  return (
    <footer className="relative mt-20">
      <div
        className="relative overflow-hidden rounded-t-[2.5rem] sm:rounded-t-[3rem]"
        style={{ background: "var(--footer-surface-gradient)" }}
      >
        {/* Soft green veils — balances dominant blue without overpowering */}
        <div
          className="pointer-events-none absolute inset-0 opacity-100 mix-blend-soft-light"
          style={{ background: "var(--footer-green-wash)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: "var(--footer-green-wash-soft)" }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute -left-[12%] top-[-8%] h-[min(32rem,65vw)] w-[min(32rem,65vw)] rounded-full blur-[100px] opacity-[0.35]"
            style={{ background: "var(--footer-orb-a)" }}
          />
          <div
            className="absolute -right-[10%] top-[15%] h-[min(28rem,55vw)] w-[min(28rem,55vw)] rounded-full blur-[90px] opacity-[0.3]"
            style={{ background: "var(--footer-orb-b)" }}
          />
          <div
            className="absolute bottom-[-10%] left-[20%] h-[min(24rem,50vw)] w-[min(24rem,50vw)] rounded-full blur-[100px] opacity-[0.25]"
            style={{ background: "var(--footer-orb-c)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "var(--footer-grid)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="h-px w-full" style={{ background: "var(--footer-top-line)" }} aria-hidden />

        <div className="pointer-events-none absolute right-[8%] top-10 hidden sm:block" aria-hidden>
          <div
            className="h-14 w-14 rounded-full animate-float-soft"
            style={{
              background: "var(--footer-float-a)",
              boxShadow: "var(--footer-float-shadow-a)",
            }}
          />
        </div>
        <div className="pointer-events-none absolute bottom-[20%] left-[6%] hidden lg:block" aria-hidden>
          <div
            className="h-8 w-8 rounded-full animate-float-soft"
            style={{
              background: "var(--footer-float-b)",
              boxShadow: "var(--footer-float-shadow-b)",
              animationDelay: "-3s",
            }}
          />
        </div>
        <div className="pointer-events-none absolute bottom-[35%] right-[15%] hidden lg:block" aria-hidden>
          <div
            className="h-6 w-6 rounded-full animate-float-soft"
            style={{
              background: "var(--footer-float-c)",
              boxShadow: "var(--footer-float-shadow-c)",
              animationDelay: "-6s",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="inline-flex transition-transform duration-200 hover:scale-[1.02]"
                aria-label="HKR Biotech Labs home"
              >
                <BrandLogo size="md" priority={false} />
              </Link>
              <h2 className="mt-7 font-display text-xl font-bold tracking-tight text-white [text-shadow:0_2px_16px_rgba(8,26,120,0.35)]">
                Evidence-grade chemistry
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/92">
                Custom synthesis, analytical rigor, and documentation you can defend — from
                early route scouting through GMP-ready packages.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-primary/45 bg-white/95 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-primary-deep shadow-sm">
                  Analytical depth
                </span>
                <span className="rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-primary-deep shadow-sm backdrop-blur-sm">
                  cGMP mindset
                </span>
                <span className="rounded-full border border-white/35 bg-white/90 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground shadow-sm">
                  Global supply
                </span>
              </div>
            </div>

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

            <div className="lg:col-span-3">
              <SectionLabel>Product families</SectionLabel>
              <ul className="mt-5 space-y-3.5">
                {productFamilies.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
                <li>
                  <Link
                    href="/products"
                    className="text-sm font-semibold text-primary-mid transition-colors duration-200 hover:text-white hover:underline hover:decoration-primary-mid/80 hover:underline-offset-2"
                  >
                    Full catalogue →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-[0_12px_40px_-12px_rgba(8,26,120,0.18)] backdrop-blur-sm">
                <SectionLabel variant="on-card">Contact</SectionLabel>
                <address className="mt-5 not-italic">
                  <p className="text-sm leading-relaxed">
                    <span className="text-caption-foreground">Email</span>
                    <br />
                    <a
                      href="mailto:enquiries@hkrbio.tech"
                      className="font-medium text-foreground underline decoration-border-strong underline-offset-2 transition hover:text-primary-deep hover:decoration-primary"
                    >
                      enquiries@hkrbio.tech
                    </a>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed">
                    <span className="text-caption-foreground">Phone</span>
                    <br />
                    <a
                      href="tel:+15550104420"
                      className="font-medium text-foreground underline decoration-border-strong underline-offset-2 transition hover:text-primary-deep hover:decoration-primary"
                    >
                      +1 (555) 010-4420
                    </a>
                  </p>
                  <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                    Headquarters &amp; analytical hub — address available on request.
                  </p>
                </address>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full bg-cta-gradient-diagonal py-2.5 text-xs font-semibold text-primary-foreground shadow-[var(--footer-cta-shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--footer-cta-shadow-hover)]"
                  >
                    Request an RFQ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-2xl border border-white/35 bg-white/55 px-5 py-6 shadow-[0_4px_24px_rgba(8,26,120,0.08)] backdrop-blur-md sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-foreground">
                © {year} HKR Biotech Labs. All rights reserved.
              </p>
              <p className="max-w-xl text-right text-[11px] leading-relaxed text-foreground/85 sm:max-w-md">
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
