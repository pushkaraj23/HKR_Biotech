import type { Metadata } from "next";
import {
  serviceAreas,
  servicesCommitmentColumns,
  servicesCommitmentHeading,
  servicesPageHero,
  servicesPartnerCta,
} from "@/data/servicesPageContent";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";

function IconCommitmentShip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 22.08V12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCommitmentQuality({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCommitmentLock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconProjectSpark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m12 3 1.09 3.36L16.5 7.5l-3.41 1.14L12 12l-1.09-3.36L7.5 7.5l3.41-1.14L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 19.5 6.5 18M18 6l1.5-1.5M5 4.5 6.5 6M18 19.5l-1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const COMMITMENT_ICONS = [IconCommitmentShip, IconCommitmentQuality, IconCommitmentLock] as const;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Precision carbohydrate and nucleoside chemistry: custom glycan synthesis, DNA/RNA building blocks, NMR analysis, glycoconjugation, global shipping with CoA/NMR/MS, and confidentiality at HKR Biotech Pvt. Ltd.",
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pb-28 pt-6 sm:px-6 md:space-y-20 lg:px-8">
        {/* Hero */}
        <RevealOnScroll>
          <div
            className="relative min-h-[260px] overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)] sm:min-h-[300px] md:min-h-[320px]"
            style={{
              background:
                "linear-gradient(115deg, #052066 0%, #06124a 42%, color-mix(in srgb, var(--primary) 38%, #030a40) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute right-[8%] top-8 h-12 w-12 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--accent) 35%, transparent) 55%, transparent)",
                boxShadow: "0 6px 20px -4px rgba(43,196,138,0.35), inset 0 -2px 5px rgba(0,0,0,0.1)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-10 right-[20%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--primary) 40%, transparent) 55%, transparent)",
                boxShadow: "0 4px 14px -3px rgba(26,115,232,0.35), inset 0 -1px 4px rgba(0,0,0,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[85%]">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-mid">{servicesPageHero.eyebrow}</p>
              <h1 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-on-dark md:text-5xl lg:text-6xl">
                {servicesPageHero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-on-dark/82 md:text-lg">{servicesPageHero.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={servicesPageHero.primaryCtaHref} className="rounded-full px-10 shadow-primary-glow">
                  {servicesPageHero.primaryCtaLabel}
                </ButtonLink>
                <ButtonLink
                  href={servicesPageHero.secondaryAnchor}
                  variant="secondary"
                  className="rounded-full border-white/30 bg-white/10 px-10 text-on-dark backdrop-blur-sm hover:border-white/45 hover:bg-white/16"
                >
                  {servicesPageHero.secondaryCtaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Four service pillars */}
        <section id="service-areas" aria-labelledby="service-areas-heading" className="scroll-mt-28">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Detailed offerings</p>
            <h2 id="service-areas-heading" className="sr-only">
              Service areas one through four
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-8 md:gap-10">
            {serviceAreas.map((area, i) => {
              const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
              const light = v.surface === "#e8f4ef";
              const accentBar = light
                ? "h-1.5 w-8 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent"
                : "h-1.5 w-8 shrink-0 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.45)]";
              const step = String(i + 1).padStart(2, "0");

              return (
                <RevealOnScroll key={area.heading} delay={i * 60}>
                  <article
                    style={{ backgroundColor: v.surface }}
                    className={cn(
                      "group relative overflow-hidden rounded-[1.75rem] border transition-all duration-300",
                      "shadow-[0_20px_50px_-24px_rgba(2,10,99,0.45)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgba(2,10,99,0.55)]",
                      v.shell,
                    )}
                  >
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                      style={{
                        background:
                          light
                            ? "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)"
                            : "radial-gradient(circle, rgba(255,255,255,0.45), transparent 68%)",
                      }}
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full opacity-20 blur-2xl"
                      style={{
                        background:
                          light
                            ? "radial-gradient(circle, color-mix(in srgb, var(--primary) 35%, transparent), transparent 70%)"
                            : "radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)",
                      }}
                      aria-hidden
                    />

                    <div className="relative flex flex-col p-7 sm:p-8 lg:p-9">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                        <div
                          className={cn("h-12 w-12 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-[1.03]", v.orbShell)}
                          style={{ background: v.orb }}
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span
                              className={cn(
                                "inline-flex min-w-[2.25rem] items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums tracking-tight",
                                light ? "bg-primary/14 text-[#1459b8]" : "bg-white/16 text-white ring-1 ring-white/22",
                              )}
                            >
                              {step}
                            </span>
                            <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.22em]", v.eyebrow)}>{area.tagline}</p>
                          </div>
                          <h3
                            className={cn(
                              "mt-3 text-balance font-display text-2xl font-extrabold leading-[1.15] tracking-tight transition-colors md:text-[1.65rem] lg:text-3xl",
                              v.title,
                              v.titleGroupHover,
                            )}
                          >
                            {area.heading}
                          </h3>
                        </div>
                      </div>

                      <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-3.5">
                        {area.bullets.map((b) => (
                          <li
                            key={b.title}
                            className={cn(
                              "flex min-h-full flex-col rounded-xl border px-3.5 py-3.5 backdrop-blur-[2px] transition-[border-color,background-color] duration-300",
                              light
                                ? "border-[#17324d]/10 bg-white/60 shadow-sm group-hover:border-primary/18"
                                : "border-white/16 bg-black/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] group-hover:border-white/26",
                            )}
                          >
                            <span className={accentBar} aria-hidden />
                            <p className={cn("mt-2.5 font-display text-[15px] font-semibold leading-snug tracking-tight", v.title)}>{b.title}</p>
                            <p className={cn("mt-1.5 text-xs leading-snug sm:text-[13px]", v.body)}>{b.body}</p>
                            {b.subpoints && b.subpoints.length > 0 ? (
                              <ul
                                className={cn(
                                  "mt-2 space-y-1 border-l border-dashed pl-3 text-[11px] leading-snug sm:text-xs",
                                  light ? "border-[#17324d]/18" : "border-white/28",
                                  v.body,
                                )}
                              >
                                {b.subpoints.map((sp) => (
                                  <li key={sp}>{sp}</li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        ))}
                      </ul>

                      <div
                        className={cn(
                          "mt-8 flex flex-col gap-2.5 border-t pt-6 sm:flex-row sm:flex-wrap sm:items-center",
                          light ? "border-[#17324d]/12" : "border-white/18",
                        )}
                      >
                        <ButtonLink href={area.ctas.primary.href} className="rounded-full px-8 shadow-primary-glow sm:px-9">
                          {area.ctas.primary.label}
                        </ButtonLink>
                        <ButtonLink
                          href={area.ctas.secondary.href}
                          variant="secondary"
                          className={cn(
                            "rounded-full px-8 sm:px-9",
                            light
                              ? "border-[#17324d]/18 bg-white/92 text-[#0d2137] hover:border-primary/35 hover:bg-white"
                              : "border-white/35 bg-white/10 text-on-dark backdrop-blur-sm hover:border-white/48 hover:bg-white/16",
                          )}
                        >
                          {area.ctas.secondary.label}
                        </ButtonLink>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>

        {/* Our Service Commitment */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/35 shadow-[0_16px_42px_-14px_rgba(2,10,99,0.35)] backdrop-blur-md">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.88]"
              style={{
                background:
                  "linear-gradient(125deg, color-mix(in srgb, var(--light) 88%, var(--primary) 12%) 0%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 52%, #e8f4ef 100%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(23,50,77,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,50,77,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-45 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 32%, transparent), transparent 70%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent), transparent 72%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#1a73e8]/35 to-transparent"
              aria-hidden
            />

            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
              <div className="text-center">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">Operations</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0d2137] md:text-4xl">{servicesCommitmentHeading}</h2>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-5 lg:gap-6">
                {servicesCommitmentColumns.map((col, i) => {
                  const Icon = COMMITMENT_ICONS[i % COMMITMENT_ICONS.length];
                  const ring =
                    i % 3 === 0
                      ? "from-[#1a73e8]/25 via-white/80 to-[#2bc48a]/20 ring-[#1a73e8]/20"
                      : i % 3 === 1
                        ? "from-[#2bc48a]/22 via-white/80 to-[#1a73e8]/18 ring-[#2bc48a]/22"
                        : "from-[#17324d]/12 via-white/85 to-[#1a73e8]/15 ring-[#17324d]/14";
                  return (
                    <div
                      key={col.title}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/52 p-6 text-left shadow-[0_12px_36px_-18px_rgba(23,50,77,0.22)] backdrop-blur-md transition-all duration-300",
                        "hover:-translate-y-1 hover:border-white/85 hover:bg-white/72 hover:shadow-[0_20px_44px_-16px_rgba(23,50,77,0.28)] sm:p-7",
                      )}
                    >
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            i % 3 === 1
                              ? "radial-gradient(circle, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)"
                              : "radial-gradient(circle, color-mix(in srgb, var(--primary) 30%, transparent), transparent 70%)",
                        }}
                        aria-hidden
                      />
                      <div
                        className={cn(
                          "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm ring-1 transition-transform duration-300 group-hover:scale-[1.06]",
                          ring,
                        )}
                      >
                        <Icon className="h-6 w-6 text-[#0d2137]" />
                      </div>
                      <p className="relative mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1459b8]">{col.title}</p>
                      <p className="relative mt-2 text-sm font-medium leading-relaxed text-[#234a62]">{col.body}</p>
                      <div
                        className="relative mt-6 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-accent opacity-80 transition-all duration-300 group-hover:w-14 group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Partner CTA */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/45 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.28)] backdrop-blur-md">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.92]"
              style={{
                background:
                  "linear-gradient(125deg, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 0%, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 55%, #e8f4ef 100%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.22]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(23,50,77,0.11) 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 68%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--primary) 28%, transparent), transparent 70%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-8 h-2 w-2 -translate-x-1/2 rounded-full bg-[#2bc48a]/40 blur-[1px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-12 left-[18%] h-1.5 w-1.5 rounded-full bg-[#1a73e8]/35"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-[22%] top-1/3 h-1 w-1 rounded-full bg-[#2bc48a]/50"
              aria-hidden
            />

            <div className="relative px-6 py-11 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:text-left">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center gap-2 lg:justify-start">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#17324d]/10 bg-white/70 text-[#1459b8] shadow-sm backdrop-blur-sm"
                      aria-hidden
                    >
                      <IconProjectSpark className="h-4 w-4" />
                    </span>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-[#1459b8]">Partner with us</p>
                  </div>
                  <h2 className="mx-auto mt-4 max-w-xl text-balance font-display text-3xl font-extrabold tracking-tight text-[#0d2137] md:text-4xl lg:mx-0">
                    {servicesPartnerCta.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-[#234a62] md:text-base lg:mx-0">
                    {servicesPartnerCta.body}
                  </p>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div
                    className={cn(
                      "relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/55 bg-white/45 p-7 shadow-[0_16px_40px_-20px_rgba(23,50,77,0.25)] backdrop-blur-md transition-all duration-300",
                      "hover:border-white/75 hover:bg-white/58 hover:shadow-[0_22px_48px_-18px_rgba(23,50,77,0.3)]",
                    )}
                  >
                    <div
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-50 blur-2xl"
                      style={{
                        background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 25%, transparent), transparent 72%)",
                      }}
                      aria-hidden
                    />
                    <div className="relative flex flex-col gap-3">
                      <ButtonLink
                        href={servicesPartnerCta.buttonHref}
                        className="w-full rounded-full px-10 py-3.5 text-[15px] shadow-primary-glow transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
                      >
                        {servicesPartnerCta.buttonLabel}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
