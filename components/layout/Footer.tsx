import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { getAllCategories } from "@/data/catalog";
import { mainNav } from "@/data/navigation";

const exploreLinks = [
  ...mainNav
    .filter((item) => item.href !== "/")
    .map((item) => ({ href: item.href, label: item.label })),
  { href: "/contact", label: "Contact" },
];

function FooterListLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-on-dark/90 transition-colors hover:text-on-dark"
    >
      {label}
    </Link>
  );
}

function FooterTitle({ children }: { children: string }) {
  return (
    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-on-dark/80">
      {children}
    </p>
  );
}

export async function Footer() {
  const year = new Date().getFullYear();
  const categories = await getAllCategories();
  const productFamilies = categories.slice(0, 6).map((c) => ({
    href: `/products/${c.slug}`,
    label: c.name,
  }));

  return (
    <footer className="mt-20 border-t border-on-dark/25 bg-[color-mix(in_srgb,var(--surface)_88%,#01084e_12%)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex transition-transform duration-200 hover:scale-[1.02]"
              aria-label="HKR Biotech Labs home"
            >
              <BrandLogo size="md" priority={false} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-dark/90">
              HKR Biotech Pvt. Ltd. delivers complex carbohydrate synthesis, API
              impurity standards, nucleotide/linker chemistry, and analytical support
              from Pune, India.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center btn-glass btn-glass-green-dark rounded-full px-5 py-2 text-xs font-semibold transition hover:-translate-y-0.5"
            >
              Request an RFQ
            </Link>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer explore links">
            <FooterTitle>Explore</FooterTitle>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <FooterListLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Footer product families">
            <FooterTitle>Product families</FooterTitle>
            <ul className="mt-4 space-y-2.5">
              {productFamilies.map((family) => (
                <li key={family.href}>
                  <FooterListLink href={family.href} label={family.label} />
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-sm font-semibold text-on-dark transition-colors hover:text-accent"
                >
                  Full catalogue →
                </Link>
              </li>
            </ul>
          </nav>

          <div className="rounded-2xl border border-on-dark/20 bg-white p-6 text-foreground shadow-[0_12px_30px_-16px_rgba(18,50,90,0.6)] lg:col-span-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Contact</p>
            <address className="mt-4 not-italic text-sm leading-relaxed">
              <p className="text-muted-foreground">Email</p>
              <a
                href="mailto:kishor@hkrbiotechlabs.com"
                className="font-medium text-foreground underline decoration-border-strong underline-offset-2 transition hover:text-primary"
              >
                kishor@hkrbiotechlabs.com
              </a>
              <p className="mt-4 text-muted-foreground">Phone</p>
              <a
                href="tel:+919212123868"
                className="font-medium text-foreground underline decoration-border-strong underline-offset-2 transition hover:text-primary"
              >
                +91 9212123868
              </a>
              <p className="mt-4 text-muted-foreground">Address</p>
              <p className="font-medium text-foreground">
                NCL Innovation Park, Pashan Road, Pune - 411008
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-on-dark/25 pt-6">
          <div className="flex flex-col gap-3 text-xs text-on-dark/85 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} HKR Biotech Labs. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/privacy-policy" className="text-on-dark/90 underline decoration-on-dark/40 underline-offset-2 hover:text-on-dark">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-on-dark/90 underline decoration-on-dark/40 underline-offset-2 hover:text-on-dark">
                Terms & Conditions
              </Link>
              <Link href="/cookie-policy" className="text-on-dark/90 underline decoration-on-dark/40 underline-offset-2 hover:text-on-dark">
                Cookie Policy
              </Link>
            </div>
          </div>
          <a
            href="https://www.fibonce.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-xs font-medium text-on-dark/90 underline decoration-on-dark/50 underline-offset-2 transition hover:text-on-dark"
          >
            Designed and developed by Fibonce Tech Solutions Pvt. Ltd.
          </a>
        </div>
      </div>
    </footer>
  );
}
