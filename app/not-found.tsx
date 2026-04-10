import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <Link href="/" className="mb-8 inline-flex" aria-label="HKR Biotech Labs home">
        <BrandLogo size="md" />
      </Link>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-primary">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
        This page could not be resolved
      </h1>
      <p className="mt-4 max-w-md text-text-secondary">
        The resource may have moved, or the link may be outdated. Return to the catalogue or contact our
        team for assistance.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/products" variant="secondary">
          Products
        </ButtonLink>
      </div>
      <Link href="/contact" className="mt-6 text-sm text-accent-primary hover:underline">
        Contact support →
      </Link>
    </div>
  );
}
