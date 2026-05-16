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
                <ButtonLink href={servicesPartnerCta.buttonHref} color="blue" surface="light" className="rounded-full px-9">
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

            </div>
          </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
