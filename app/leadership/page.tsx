import type { Metadata } from "next";
import { LeadershipTeamSection } from "@/components/leadership/LeadershipTeamSection";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the scientists and leadership behind HKR Biotech — glycan synthesis, analytical depth, and scientific partnership.",
};

export default function LeadershipPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#020A63] pb-28">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      <section className="relative z-10 px-4 pt-6 sm:px-6 lg:px-8">
        <div
          className="relative mx-auto max-w-6xl min-h-[280px] overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)] sm:min-h-[300px]"
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
            className="pointer-events-none absolute bottom-10 right-[18%] h-7 w-7 animate-orbit-slow rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--primary) 40%, transparent) 55%, transparent)",
              boxShadow: "0 4px 14px -3px rgba(26,115,232,0.35), inset 0 -1px 4px rgba(0,0,0,0.1)",
              animationDelay: "-4s",
              animationDuration: "14s",
            }}
            aria-hidden
          />
          <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
            <RevealOnScroll>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-primary-mid">Leadership</p>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-dark md:text-5xl lg:text-6xl">Our team</h1>
              <p className="mt-5 max-w-xl text-base text-on-dark/82 md:text-lg">
                PhD-led synthesis and analytics for carbohydrates and nucleic-acid programs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow">
                  Partner with HKR
                </ButtonLink>
                <ButtonLink
                  href="#meet-experts-heading"
                  variant="secondary"
                  className="rounded-full border-white/30 bg-white/10 px-10 text-on-dark backdrop-blur-sm hover:border-white/45 hover:bg-white/16"
                >
                  Meet the team
                </ButtonLink>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <LeadershipTeamSection />

      <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <div
              className="relative overflow-hidden rounded-[1.75rem] border border-white/45 px-8 py-12 text-center shadow-[0_16px_42px_-14px_rgba(18,50,90,0.28)] backdrop-blur-md sm:px-12 sm:py-14"
              style={{
                background:
                  "linear-gradient(125deg, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 0%, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 55%, #e8f4ef 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-50 blur-3xl"
                style={{
                  background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 68%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1459b8]/90">Contact</p>
                <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-extrabold text-[#0d2137] md:text-4xl">
                  Work with this team
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm text-[#234a62] md:text-base">
                  Structure, purity bar, timeline — feasibility and next steps in one reply.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow">
                    Start a conversation
                  </ButtonLink>
                  <ButtonLink
                    href="/services"
                    variant="secondary"
                    className="rounded-full border-[#17324d]/18 bg-white/90 px-10 text-[#0d2137] hover:border-primary/35 hover:bg-white"
                  >
                    View services
                  </ButtonLink>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
