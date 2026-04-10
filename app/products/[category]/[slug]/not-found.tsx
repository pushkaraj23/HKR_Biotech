import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-teal-800">Catalogue</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-slate-950">Product not found</h1>
      <p className="mt-3 text-slate-600">
        This catalogue entry does not exist or the link may be outdated.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <ButtonLink href="/products" variant="primary">
          Browse catalogue
        </ButtonLink>
        <Link href="/contact" className="text-sm font-semibold text-teal-800 hover:underline">
          Request a quote
        </Link>
      </div>
    </div>
  );
}
