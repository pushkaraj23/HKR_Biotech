import Image from "next/image";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function LandingFounderNote() {
  return (
    <section className="relative px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <RevealOnScroll>
        <div
          className="relative mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[2.2rem] border border-white/50 p-6 shadow-[var(--elev-card-stack)] sm:p-10 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-12"
          style={{
            background:
              "linear-gradient(140deg, color-mix(in srgb, var(--light) 82%, var(--primary) 18%) 0%, color-mix(in srgb, var(--light) 72%, var(--primary-mid) 28%) 52%, color-mix(in srgb, var(--light) 76%, var(--accent) 24%) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -left-14 -top-20 h-52 w-52 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(125,255,219,0.24) 55%, transparent 75%)",
              filter: "blur(6px)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/45 shadow-[0_16px_34px_-14px_rgba(18,50,90,0.55)]">
              <Image
                src="/team/Kishor Harale.jpg"
                alt="Kishor R. Harale, PhD"
                fill
                sizes="(max-width: 1024px) 280px, 320px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/75">
              Founder
            </p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Clarity, speed, accountability.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              Complex chemistry with transparent execution — synthesis, communication, and analytics you can rely on.
            </p>
            <div className="mt-6">
              <p className="font-display text-lg font-semibold text-foreground">
                Kishor R. Harale, PhD
              </p>
              <p className="text-sm font-medium text-foreground/75">
                Director, HKR Biotech Pvt. Ltd.
              </p>
            </div>
            <div className="mt-7">
              <ButtonLink href="/contact" className="rounded-full px-8">
                Speak with our team
              </ButtonLink>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
