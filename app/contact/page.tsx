import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact HKR Biotech Labs for quotations, custom synthesis, and technical partnership.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1400&h=600&fit=crop&q=80&auto=format";

type PageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const productRef =
    typeof sp.product === "string"
      ? sp.product
      : Array.isArray(sp.product)
        ? sp.product[0]
        : "";

  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="right" opacity="opacity-[0.16]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pt-6 pb-28 sm:px-6 md:space-y-20 lg:px-8">

        {/* Hero — photo with dark wash */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[2rem] border border-on-dark/22 shadow-[0_12px_48px_-12px_rgba(18,25,35,0.58)]">
            <Image
              src={HERO_IMAGE}
              alt="Laboratory discussion"
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

            <div
              className="pointer-events-none absolute right-[8%] top-8 h-12 w-12 animate-orbit-slow rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(20,184,166,0.3) 55%, rgba(15,118,110,0.1))",
                boxShadow: "0 6px 20px -4px rgba(20,184,166,0.35)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-10 right-[20%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(124,58,237,0.3) 55%, rgba(91,33,182,0.1))",
                boxShadow: "0 4px 14px -3px rgba(91,33,182,0.3)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-primary-mid">
                Get in touch
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-on-dark md:text-5xl">
                Enquiries & RFQ
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-dark/84">
                Share your target structure, quantity band, and analytical expectations
                — our team will respond with scientific questions, not just pricing.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Two-column layout: info cards + form */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-10">

          {/* Left column: info cards */}
          <div className="space-y-6 lg:col-span-2">
            <RevealOnScroll>
              <div className="rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.52)] p-7 shadow-[0_8px_32px_-12px_rgba(18,25,35,0.68)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_16px_44px_-14px_rgba(18,25,35,0.76)]">
                <div
                  className="mb-5 h-10 w-10 rounded-full ring-2 ring-white/[0.08]"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
                    boxShadow: "0 8px 24px -4px rgba(20,184,166,0.3), inset 0 -2px 5px rgba(0,0,0,0.06)",
                  }}
                  aria-hidden
                />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Direct contact
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold text-on-dark">
                  Reach Us
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-on-dark/82">
                  <li>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-on-dark/65">Email</span>
                    <br />
                    <span className="font-medium text-on-dark">enquiries@hkrbio.tech</span>
                  </li>
                  <li>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-on-dark/65">Phone</span>
                    <br />
                    <span className="font-medium text-on-dark">+1 (555) 010-4420</span>
                  </li>
                  <li>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-on-dark/65">Hours</span>
                    <br />
                    <span className="font-medium text-on-dark">Mon–Fri, 08:00–18:00 (local)</span>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={60}>
              <div className="rounded-[1.75rem] border border-on-dark/20 bg-[rgba(18,25,35,0.52)] p-7 shadow-[0_8px_32px_-12px_rgba(18,25,35,0.68)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_16px_44px_-14px_rgba(18,25,35,0.76)]">
                <div
                  className="mb-5 h-10 w-10 rounded-full ring-2 ring-white/[0.08]"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.6) 55%, rgba(91,33,182,0.4))",
                    boxShadow: "0 8px 24px -4px rgba(91,33,182,0.25), inset 0 -2px 5px rgba(0,0,0,0.06)",
                  }}
                  aria-hidden
                />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Product enquiry
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold text-on-dark">
                  From the Catalogue?
                </h2>
                <p className="mt-3 text-sm text-on-dark/82">
                  Visiting from a catalogue entry? Your product reference is
                  pre-filled in the form automatically.
                </p>
                <ButtonLink
                  href="/products"
                  variant="secondary"
                  className="mt-5 rounded-full border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-6 text-xs text-on-dark hover:border-on-dark/55 hover:bg-[rgba(18,25,35,0.66)]"
                >
                  Browse catalogue
                </ButtonLink>
              </div>
            </RevealOnScroll>

          </div>

          {/* Right column: form in dark gradient panel */}
          <div className="lg:col-span-3">
            <RevealOnScroll>
              <div
                className="relative overflow-hidden rounded-[2rem] border border-on-dark/22 p-7 shadow-[0_16px_64px_-16px_rgba(18,25,35,0.58)] backdrop-blur-xl sm:p-10"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(18,25,35,0.76) 0%, rgba(27,38,50,0.62) 35%, rgba(44,59,77,0.56) 62%, rgba(74,93,114,0.5) 100%)",
                }}
              >
                {/* Subtle grid */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                  aria-hidden
                />

                <div
                  className="pointer-events-none absolute -right-6 top-6 h-16 w-16 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6), rgba(20,184,166,0.35) 55%, rgba(15,118,110,0.15))",
                    boxShadow: "0 8px 24px -4px rgba(20,184,166,0.3)",
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -left-4 bottom-10 h-10 w-10 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6), rgba(124,58,237,0.35) 55%, rgba(91,33,182,0.15))",
                    boxShadow: "0 6px 18px -3px rgba(91,33,182,0.25)",
                  }}
                  aria-hidden
                />

                <div className="relative">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-mid">
                    Send a message
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-on-dark md:text-3xl">
                    Submit Your Enquiry
                  </h2>
                  <p className="mt-3 max-w-lg text-sm text-on-dark/84">
                    Include your target, quantity, purity requirements, and timeline
                    for the fastest technical response.
                  </p>
                  <ContactForm
                    className="mt-8 border-0 bg-transparent p-0 shadow-none"
                    defaultProductRef={productRef}
                    enquirySource="contact-page"
                    dark
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Full-width location map */}
        <RevealOnScroll>
          <section
            aria-labelledby="location-heading"
            className="overflow-hidden rounded-[2rem] border border-on-dark/20 bg-[rgba(18,25,35,0.58)] py-10 shadow-[0_16px_48px_-24px_rgba(18,25,35,0.7)] backdrop-blur-md"
          >
            <div className="px-6 sm:px-8 lg:px-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-mid">
                Location
              </p>
              <h2
                id="location-heading"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-on-dark md:text-3xl"
              >
                Visit Our Facility
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-on-dark/80 md:text-base">
                Purpose-built laboratories for traceable science.
              </p>
            </div>

            <div className="mt-6">
              <iframe
                title="HKR Biotech Labs location"
                src="https://www.google.com/maps?q=HKR+Biotech+Labs&output=embed"
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
