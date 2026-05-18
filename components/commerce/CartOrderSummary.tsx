"use client";

import Link from "next/link";
import {
  formatMoney,
  summarizeCart,
  type CartPricingLine,
} from "@/lib/commerce/cart-pricing";
import { cn } from "@/lib/cn";

type CartOrderSummaryProps = {
  items: CartPricingLine[];
  mode?: "cart" | "checkout";
  className?: string;
};

export function CartOrderSummary({ items, mode = "cart", className }: CartOrderSummaryProps) {
  const summary = summarizeCart(items);
  const hasPricedTotal = summary.pricedLineCount > 0;
  const totalLabel = hasPricedTotal
    ? formatMoney(summary.subtotal, summary.currencyHint)
    : "Quote on request";

  return (
    <aside
      aria-label="Order summary"
      className={cn(
        "relative w-full overflow-hidden rounded-[2rem] border border-white/22",
        "shadow-[0_28px_64px_-24px_rgba(26,115,232,0.65)]",
        className,
      )}
    >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3d9bff] via-[#1a73e8] to-[#0c4da8]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/20 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-[#2bc48a]/25 blur-2xl"
          aria-hidden
        />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/35"
              aria-hidden
            >
              <span className="h-4 w-4 rounded-full bg-gradient-to-br from-white to-white/55 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.12)]" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-white">Order summary</h2>
              <p className="mt-0.5 text-sm text-white/78">
                {summary.lineCount} line{summary.lineCount === 1 ? "" : "s"} · {summary.totalUnits} unit
                {summary.totalUnits === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <ul className="commerce-summary-scroll mt-5 max-h-52 space-y-3 overflow-y-auto overscroll-contain pr-0.5 text-sm">
            {summary.lines.map((line) => (
              <li
                key={line.slug}
                className="flex items-start justify-between gap-3 border-b border-white/18 pb-3 last:border-0 last:pb-0"
              >
                <span className="min-w-0 flex-1 text-white/90">
                  <span className="line-clamp-2 font-medium leading-snug">{line.label}</span>
                  <span className="mt-0.5 block text-xs text-white/62">Qty {line.quantity}</span>
                </span>
                <span className="shrink-0 text-right font-mono text-xs font-semibold text-white">
                  {line.lineTotal !== null
                    ? formatMoney(line.lineTotal, summary.currencyHint)
                    : line.priceLabel}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2.5 border-t border-white/20 pt-4 text-sm">
            <div className="flex justify-between gap-3 text-white/85">
              <dt>Subtotal</dt>
              <dd className="font-mono font-semibold text-white">{totalLabel}</dd>
            </div>
            {summary.quoteLineCount > 0 ? (
              <div className="flex justify-between gap-3 text-white/70">
                <dt>Quote items</dt>
                <dd>{summary.quoteLineCount}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-3 text-white/70">
              <dt>Shipping</dt>
              <dd className="text-right text-xs sm:text-sm">Calculated at checkout</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-white/18 pt-3 text-base font-semibold text-white">
              <dt>Estimated total</dt>
              <dd className="font-mono text-lg">{totalLabel}</dd>
            </div>
          </dl>

          {mode === "cart" ? (
            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#5eecc0] via-[#2bc48a] to-[#1aab72] px-6 py-3.5 text-sm font-bold text-[#053d2c] shadow-[0_12px_32px_-8px_rgba(43,196,138,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(43,196,138,0.65)]"
            >
              Proceed to checkout
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="mt-6 flex w-full cursor-not-allowed items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white/55"
            >
              Pay with Razorpay (coming soon)
            </button>
          )}

          {mode === "checkout" ? (
            <Link
              href="/cart"
              className="mt-3 flex w-full items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Back to cart
            </Link>
          ) : (
            <Link
              href="/products"
              className="mt-3 flex w-full items-center justify-center text-xs font-semibold text-white/75 transition hover:text-white"
            >
              Continue shopping
            </Link>
          )}

          {mode === "checkout" ? (
            <p className="mt-4 text-center text-[11px] leading-relaxed text-white/55">
              Razorpay payment integration will be enabled here.
            </p>
          ) : null}
        </div>
    </aside>
  );
}
