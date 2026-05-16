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
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <header className="py-10 md:py-12">
            <div
              className="relative overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)]"
              style={{
                background:
                  "linear-gradient(115deg, #052066 0%, #06124a 42%, color-mix(in srgb, var(--primary) 38%, #030a40) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute right-[8%] top-6 h-10 w-10 animate-orbit-slow rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--accent) 35%, transparent) 55%, transparent)",
                  boxShadow: "0 6px 20px -4px rgba(43,196,138,0.35), inset 0 -2px 5px rgba(0,0,0,0.1)",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute bottom-8 right-[18%] h-6 w-6 animate-orbit-slow rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--primary) 40%, transparent) 55%, transparent)",
                  boxShadow: "0 4px 14px -3px rgba(26,115,232,0.35), inset 0 -1px 4px rgba(0,0,0,0.1)",
                  animationDelay: "-4s",
                  animationDuration: "14s",
                }}
                aria-hidden
              />
              <div className="relative px-8 py-10 sm:px-10 sm:py-11 md:px-12 md:py-12 lg:max-w-[62%]">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-primary-mid sm:text-[11px]">
                  Leadership
                </p>
                <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-on-dark sm:text-4xl md:text-5xl">
                  Our team
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-dark/88 md:text-xl md:leading-relaxed">
                  PhD-led synthesis and analytics for carbohydrates and nucleic-acid programs.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                  <ButtonLink href="/contact" color="blue" surface="dark" className="rounded-full px-10 py-3.5 text-base">
                    Partner with HKR
                  </ButtonLink>
                  <ButtonLink
                    href="#meet-experts-heading"
                    color="green"
                    surface="dark"
                    className="rounded-full px-10 py-3.5 text-base"
                  >
                    Meet the team
                  </ButtonLink>
                </div>
              </div>
            </div>
          </header>
        </RevealOnScroll>

        <div className="space-y-10 md:space-y-12">
          <LeadershipTeamSection />

          <RevealOnScroll>
            <div
              className="relative overflow-hidden rounded-[1.75rem] border border-white/45 px-8 py-10 text-center shadow-[0_16px_42px_-14px_rgba(18,50,90,0.28)] backdrop-blur-md sm:px-12 sm:py-12 md:py-14"
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
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1459b8]/90 sm:text-[11px]">
                  Contact
                </p>
                <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-extrabold text-[#0d2137] sm:text-4xl md:text-4xl">
                  Work with this team
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#234a62] sm:mt-5 sm:text-xl sm:leading-relaxed">
                  Structure, purity bar, timeline — feasibility and next steps in one reply.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
                  <ButtonLink href="/contact" color="blue" surface="light" className="rounded-full px-10 py-3.5 text-base">
                    Start a conversation
                  </ButtonLink>
                  <ButtonLink href="/services" color="green" surface="light" className="rounded-full px-10 py-3.5 text-base">
                    View services
                  </ButtonLink>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
