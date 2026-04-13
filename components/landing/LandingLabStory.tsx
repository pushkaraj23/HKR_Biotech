import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const LAB_IMAGE =
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=900&h=700&fit=crop&q=80&auto=format";

const BULLET_COLORS = [
  "from-teal-400 to-teal-600",
  "from-violet-400 to-violet-600",
  "from-rose-400 to-rose-600",
] as const;

export function LandingLabStory() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <RevealOnScroll className="relative order-2 lg:order-1">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_12px_48px_-12px_rgba(0,0,0,0.3)] sm:min-h-[420px]">
            <Image
              src={LAB_IMAGE}
              alt="Laboratory research work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.35) 35%, rgba(15,23,42,0.05) 70%, transparent 100%)",
              }}
            />

            <div
              className="absolute right-6 top-6 h-12 w-12 rounded-full animate-orbit-slow"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(20,184,166,0.3) 55%, rgba(15,118,110,0.1))",
                boxShadow: "0 6px 20px -4px rgba(20,184,166,0.35), inset 0 -2px 5px rgba(0,0,0,0.1)",
              }}
              aria-hidden
            />
            <div
              className="absolute left-8 top-1/3 h-7 w-7 rounded-full animate-orbit-slow"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(124,58,237,0.3) 55%, rgba(91,33,182,0.1))",
                boxShadow: "0 4px 14px -3px rgba(91,33,182,0.3), inset 0 -1px 4px rgba(0,0,0,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-teal-300">
                Operations
              </p>
              <p className="mt-3 max-w-sm font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                Controlled environments, redundant characterization, traceable release.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="order-1 space-y-6 lg:order-2">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-400">
              Inside HKR
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Infrastructure Built for Reproducibility
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Dedicated project leadership, redundant characterization, and digital batch
              records — an environment designed for traceable science.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <ul className="space-y-3.5 text-sm font-medium text-slate-300">
              {[
                "Phase-appropriate documentation with ALCOA+ alignment",
                "Segregated synthesis lines with inert gas distribution",
                "Prep HPLC & crystallization with barcode traceability",
              ].map((line, i) => (
                <li key={line} className="flex gap-3">
                  <span
                    className={`mt-2 h-1.5 w-5 shrink-0 rounded-full bg-gradient-to-r ${BULLET_COLORS[i]} shadow-sm`}
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="flex items-center gap-4">
              <ButtonLink href="/about" variant="secondary" className="rounded-full">
                Company story
              </ButtonLink>
              <Link
                href="/contact"
                className="text-sm font-semibold text-rose-400 transition hover:text-rose-300 hover:underline"
              >
                Talk to us →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
