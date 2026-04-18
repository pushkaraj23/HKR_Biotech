import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type CtaItem = {
  href: string;
  label: string;
  primary?: boolean;
};

type GlassProductsHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  tagline?: string;
  ctas?: CtaItem[];
  className?: string;
  backgroundImage?: string;
};

export function GlassProductsHero({
  title,
  description,
  eyebrow,
  tagline,
  ctas,
  className,
  backgroundImage,
}: GlassProductsHeroProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Ambient glow blobs — outside card, bleed into background */}
      <div
        className="pointer-events-none absolute -left-[20%] -top-[40%] h-[min(28rem,85vw)] w-[min(28rem,85vw)] rounded-full blur-[100px] opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(15,118,110,0.22) 0%, rgba(20,184,166,0.06) 45%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[15%] top-[10%] h-[min(24rem,75vw)] w-[min(24rem,75vw)] animate-pulse-glow rounded-full blur-[90px] opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(91,33,182,0.16) 0%, rgba(124,58,237,0.08) 50%, transparent 72%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[30%] h-[min(20rem,60vw)] w-[min(20rem,60vw)] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(159,18,57,0.08) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] border border-overlay",
          !backgroundImage && "bg-gradient-to-br from-bg-secondary via-surface to-tint-primary/20",
          "shadow-[0_8px_48px_-12px_rgba(0,0,0,0.4),0_2px_8px_-2px_rgba(0,0,0,0.2)]",
        )}
      >
        {/* Background image with dark wash */}
        {backgroundImage && (
          <>
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(7,14,27,0.85) 0%, rgba(7,14,27,0.75) 45%, rgba(7,14,27,0.5) 100%)",
              }}
            />
          </>
        )}

        {/* Subtle interior gradient wash (no-image fallback) */}
        {!backgroundImage && (
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,118,110,0.05)_0%,transparent_45%,rgba(91,33,182,0.04)_100%)]"
            aria-hidden
          />
        )}

        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />

        {/* Floating decorative orbs */}
        <div
          className="pointer-events-none absolute right-10 top-8 h-10 w-10 animate-orbit-slow rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.7), rgba(20,184,166,0.35) 55%, rgba(15,118,110,0.15))",
            boxShadow:
              "0 8px 24px -4px rgba(20,184,166,0.4), inset 0 -2px 6px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,0.5)",
            animationDelay: "-2s",
            animationDuration: "12s",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-8 right-28 h-6 w-6 animate-orbit-slow rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.7), rgba(124,58,237,0.35) 55%, rgba(91,33,182,0.15))",
            boxShadow:
              "0 6px 18px -3px rgba(91,33,182,0.35), inset 0 -1px 4px rgba(0,0,0,0.06), inset 0 1px 3px rgba(255,255,255,0.5)",
            animationDelay: "-7s",
            animationDuration: "16s",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-12 right-10 h-4 w-4 animate-orbit-slow rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.7), rgba(225,29,72,0.3) 55%, rgba(159,18,57,0.12))",
            boxShadow: "0 4px 14px -3px rgba(159,18,57,0.28)",
            animationDelay: "-4s",
            animationDuration: "14s",
          }}
          aria-hidden
        />

        <div className={cn("relative px-8 py-12 md:px-14 md:py-16", backgroundImage && "lg:max-w-[60%]")}>
          {eyebrow ? (
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              {eyebrow}
            </p>
          ) : null}

          <h1
            className={cn(
              "font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]",
              eyebrow ? "mt-3" : "",
            )}
          >
            <span className="gradient-text-shimmer">{title}</span>
          </h1>

          {tagline ? (
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-primary-mid/90 md:text-lg">
              {tagline}
            </p>
          ) : null}

          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
              tagline ? "mt-4" : "mt-5",
            )}
          >
            {description}
          </p>

          {ctas && ctas.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {ctas.map((cta) =>
                cta.primary ? (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="inline-flex items-center justify-center rounded-full bg-cta-gradient px-8 py-3 text-sm font-semibold text-primary-foreground shadow-primary-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary-glow-lg"
                  >
                    {cta.label}
                  </Link>
                ) : (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="inline-flex items-center justify-center rounded-full border border-overlay-hover bg-on-dark/[0.06] px-8 py-3 text-sm font-semibold text-slate-200 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.4)]"
                  >
                    {cta.label}
                  </Link>
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
