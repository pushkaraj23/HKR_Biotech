import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function CategoryNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-teal-800">Catalogue</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-light-foreground">Category not found</h1>
      <p className="mt-3 text-caption-foreground">
        This product family is not in our catalogue. Check the URL or return to the full listing.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <ButtonLink href="/products" variant="primary">
          All products
        </ButtonLink>
        <Link href="/contact" className="text-sm font-semibold text-teal-800 hover:underline">
          Contact us
        </Link>
      </div>
    </div>
  );
}
