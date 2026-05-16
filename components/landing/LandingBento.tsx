import Link from "next/link";
import { serviceSections } from "@/data/servicesPageContent";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { LANDING_CONTAINER, LANDING_SECTION } from "@/components/landing/landingSection";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";
import { cn } from "@/lib/cn";

export function LandingBento() {
  return (
    <section className={LANDING_SECTION} aria-labelledby="landing-services-heading">
      <div className={LANDING_CONTAINER}>
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/45 px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 74%, var(--primary-mid) 26%) 45%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
            }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/70">Services</p>
            <h2
              id="landing-services-heading"
              className="mt-2 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              Precision carbohydrate &{" "}
              <span className="text-primary-deep">nucleoside chemistry</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              Custom synthesis, DNA/RNA building blocks, NMR analysis, and glycoconjugation — from R&D to documented release.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:gap-6">
          {serviceSections.map((section, i) => {
            const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
            const light = v.surface === "#e8f4ef";
            return (
              <RevealOnScroll key={section.number} delay={i * 70}>
                <Link
                  href="/services"
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 transition-all duration-300 sm:p-7",
                    "hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(2,10,99,0.45)]",
                    v.shell,
                  )}
                  style={{ backgroundColor: v.surface }}
                >
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold tabular-nums",
                      light ? "bg-primary/14 text-[#1459b8]" : "bg-white/16 text-white ring-1 ring-white/22",
                    )}
                  >
                    {section.number}
                  </span>
                  <h3 className={cn("mt-4 font-display text-xl font-extrabold leading-snug sm:text-2xl", v.title)}>
                    {section.heading}
                  </h3>
                  <p className={cn("mt-3 flex-1 text-base leading-relaxed sm:text-lg", v.body)}>{section.intro}</p>
                  <p className={cn("mt-5 text-sm font-semibold", light ? "text-[#1459b8]" : "text-white/90")}>
                    View on services page →
                  </p>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-[color-mix(in_srgb,var(--light)_78%,var(--primary)_22%)] px-8 py-3.5 text-base font-semibold text-foreground shadow-[0_10px_28px_-14px_rgba(18,50,90,0.5)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/45"
          >
            Explore all services
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
