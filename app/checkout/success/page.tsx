"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import {
  COMMERCE_PAGE_INNER,
  COMMERCE_PAGE_SHELL,
} from "@/components/products/catalog/productDetailStyles";
import { cn } from "@/lib/cn";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <section className="rounded-[1.75rem] border border-white/20 bg-gradient-to-br from-[#f9fcfb] to-[#edf4ff] p-10 text-center shadow-[0_20px_56px_-20px_rgba(2,10,99,0.35)]">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1a73e8]">
        Payment received
      </p>
      <h1 className="mt-3 font-display text-2xl font-bold text-[#0d2137] sm:text-3xl">Thank you for your order</h1>
      <p className="mt-3 text-sm text-[#3e5870]">
        Your payment was successful. Our team will process your order and contact you with shipping details.
      </p>
      {orderId ? (
        <p className="mt-4 font-mono text-xs text-[#567089]">
          Order reference: <span className="font-semibold text-[#0d2137]">{orderId}</span>
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/products"
          className="inline-flex rounded-full bg-gradient-to-r from-[#3d9bff] via-[#1a73e8] to-[#1459b8] px-8 py-3 text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(26,115,232,0.5)] transition hover:-translate-y-0.5"
        >
          Continue shopping
        </Link>
        <Link
          href="/profile"
          className="inline-flex rounded-full border border-[#cfddee] bg-white px-8 py-3 text-sm font-semibold text-[#1459b8] transition hover:bg-[#eef4fc]"
        >
          View profile
        </Link>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className={COMMERCE_PAGE_SHELL}>
      <PageAmbientGraphics variant="right" opacity="opacity-[0.14]" />
      <div className={cn(COMMERCE_PAGE_INNER, "pt-6")}>
        <Suspense
          fallback={
            <p className="text-center text-sm text-on-dark/75">Loading confirmation…</p>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
