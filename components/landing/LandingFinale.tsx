import Link from "next/link";
import { servicesPartnerCta } from "@/data/servicesPageContent";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { LANDING_CONTAINER, LANDING_SECTION } from "@/components/landing/landingSection";
import { ButtonLink } from "@/components/ui/ButtonLink";

const PROMISES = ["CoA + NMR on release", "NDA/CDA available", "Route-level dialogue"] as const;

export function LandingFinale() {
  return (
    <section className={LANDING_SECTION} aria-labelledby="landing-partner-heading">
      <div className={LANDING_CONTAINER}>
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-white/50 p-10 shadow-[var(--elev-card-stack)] sm:p-14 md:p-16"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--light) 84%, var(--primary) 16%) 0%, color-mix(in srgb, var(--light) 70%, var(--primary-mid) 30%) 48%, color-mix(in srgb, var(--light) 72%, var(--accent) 28%) 100%)",
          }}
        >
          {/* Decorative glowing orbs */}
          <div
            className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,177,98,0.55), rgba(255,177,98,0.12) 55%, transparent 75%)",
              filter: "blur(4px)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-16 h-60 w-60 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(163,81,57,0.45), rgba(163,81,57,0.08) 55%, transparent 75%)",
              filter: "blur(6px)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-1/3 top-8 h-24 w-24 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), rgba(74,93,114,0.2) 55%, transparent 75%)",
              filter: "blur(2px)",
            }}
            aria-hidden
          />

          {/* Fine dot grid */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />

          {/* Faint hairline ring */}
          <div
            className="pointer-events-none absolute inset-4 rounded-[2.2rem] border border-on-dark/10"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            {/* Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/70 px-3 py-1 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/80">
                  Get started
                </span>
              </div>

              <h2
                id="landing-partner-heading"
                className="mt-4 font-display text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]"
              >
                {servicesPartnerCta.title}
              </h2>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">
                {servicesPartnerCta.body}
              </p>

              {/* Promise chips */}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {PROMISES.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/76 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wide text-foreground backdrop-blur-md"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2.5 6.5l2.5 2.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {p}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={servicesPartnerCta.buttonHref} className="rounded-full px-9 shadow-primary-glow-lg">
                  {servicesPartnerCta.buttonLabel}
                </ButtonLink>
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-white/80 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/55 hover:bg-white"
                >
                  Browse Products
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right side: contact-card style panel */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-primary/22 bg-white/70 p-7 backdrop-blur-md">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                  Direct line
                </p>
                <p className="mt-3 font-display text-lg font-bold text-foreground">
                  Science desk — not a sales funnel
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/82">
                  Every inbound reaches a chemist first. Expect questions about
                  purity bands, analytical scope, and scale before anything else.
                </p>

                {/* Mini stats */}
                <dl className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-primary/20 bg-white/72 p-3">
                    <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/75">
                      First reply
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-foreground">
                      &lt; 48h
                    </dd>
                  </div>
                  <div className="rounded-xl border border-primary/20 bg-white/72 p-3">
                    <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/75">
                      QC pass
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-foreground">
                      99.7%
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Floating glow */}
              <div
                className="pointer-events-none absolute -right-4 -top-4 h-12 w-12 rounded-full animate-orbit-slow"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(255,177,98,0.38) 55%, rgba(163,81,57,0.1))",
                  boxShadow:
                    "0 6px 20px -4px rgba(255,177,98,0.35), inset 0 -2px 5px rgba(27,38,50,0.1)",
                }}
                aria-hidden
              />
            </div>
          </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
