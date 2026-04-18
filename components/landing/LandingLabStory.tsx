import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const LAB_IMAGE =
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=900&h=700&fit=crop&q=80&auto=format";

const BULLET_COLORS = [
  "from-primary to-primary-deep",
  "from-accent to-secondary",
  "from-primary-mid to-danger",
] as const;

export function LandingLabStory() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <RevealOnScroll className="relative order-2 lg:order-1">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-border-strong/45 shadow-[var(--elev-card-stack)] sm:min-h-[420px]">
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
                  "linear-gradient(to top, rgba(27,38,50,0.78) 0%, rgba(27,38,50,0.32) 35%, rgba(27,38,50,0.04) 70%, transparent 100%)",
              }}
            />

            <div
              className="absolute right-6 top-6 h-12 w-12 rounded-full animate-orbit-slow"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(255,177,98,0.32) 55%, rgba(163,81,57,0.1))",
                boxShadow: "0 6px 20px -4px rgba(255,177,98,0.3), inset 0 -2px 5px rgba(27,38,50,0.1)",
              }}
              aria-hidden
            />
            <div
              className="absolute left-8 top-1/3 h-7 w-7 rounded-full animate-orbit-slow"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(74,93,114,0.35) 55%, rgba(44,59,77,0.1))",
                boxShadow: "0 4px 14px -3px rgba(44,59,77,0.28), inset 0 -1px 4px rgba(27,38,50,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-primary-mid">
                Operations
              </p>
              <p className="mt-3 max-w-sm font-display text-xl font-bold leading-snug text-on-dark sm:text-2xl">
                Controlled environments, redundant characterization, traceable release.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="order-1 space-y-6 lg:order-2">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
              Inside HKR
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Infrastructure Built for Reproducibility
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Dedicated project leadership, redundant characterization, and digital batch
              records — an environment designed for traceable science.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <ul className="space-y-3.5 text-sm font-medium text-muted-foreground">
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
                className="text-sm font-semibold text-danger transition hover:text-primary-deep hover:underline"
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
