"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { summarizeCart, type CartPricingLine } from "@/lib/commerce/cart-pricing";
import type { RazorpayCheckoutOptions, RazorpaySuccessResponse } from "@/components/commerce/razorpay-types";
import { cn } from "@/lib/cn";

const CHECKOUT_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("Browser only"));
  if (window.Razorpay) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SCRIPT}"]`);
  if (existing?.dataset.loaded === "true" && window.Razorpay) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = existing ?? document.createElement("script");
    script.src = CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("Could not load Razorpay checkout"));
    if (!existing) document.body.appendChild(script);
  });
}

type CreateOrderResponse = {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
  error?: string;
};

type RazorpayCheckoutButtonProps = {
  items: CartPricingLine[];
  className?: string;
};

export function RazorpayCheckoutButton({ items, className }: RazorpayCheckoutButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summary = summarizeCart(items);
  const canPay = summary.pricedLineCount > 0 && summary.quoteLineCount === 0 && summary.subtotal > 0;

  const pay = useCallback(async () => {
    if (!user || !canPay || busy) return;
    setBusy(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      const createRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const created = (await createRes.json()) as CreateOrderResponse;
      if (!createRes.ok) throw new Error(created.error || "Could not start payment");

      await loadRazorpayScript();
      if (!window.Razorpay) throw new Error("Razorpay checkout unavailable");

      const options: RazorpayCheckoutOptions = {
        key: created.keyId,
        amount: created.amount,
        currency: created.currency,
        name: "HKR Biotech Labs",
        description: `Order ${created.orderId}`,
        order_id: created.razorpayOrderId,
        prefill: {
          email: user.email ?? undefined,
          name: user.displayName ?? undefined,
        },
        theme: { color: "#1a73e8" },
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            const verifyRes = await fetch("/api/orders/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: created.orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const verifyBody = (await verifyRes.json()) as { error?: string };
            if (!verifyRes.ok) throw new Error(verifyBody.error || "Payment verification failed");
            router.push(`/checkout/success?orderId=${encodeURIComponent(created.orderId)}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Payment verification failed");
            setBusy(false);
          }
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      };

      const rz = new window.Razorpay(options);
      rz.on("payment.failed", (res) => {
        setError(res.error?.description || "Payment failed");
        setBusy(false);
      });
      rz.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start payment");
      setBusy(false);
    }
  }, [user, canPay, busy, router]);

  if (!canPay) {
    return (
      <div className={className}>
        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white/55"
        >
          Pay with Razorpay
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/60">
          {summary.quoteLineCount > 0
            ? "Quote-only items must be removed before online payment. Contact us for custom pricing."
            : "Add priced items to your cart to pay online."}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        disabled={busy}
        onClick={() => void pay()}
        className={cn(
          "flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#5eecc0] via-[#2bc48a] to-[#1aab72] px-6 py-3.5 text-sm font-bold text-[#053d2c]",
          "shadow-[0_12px_32px_-8px_rgba(43,196,138,0.55)] transition hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0",
        )}
      >
        {busy ? "Opening Razorpay…" : "Pay with Razorpay"}
      </button>
      {error ? (
        <p className="mt-3 rounded-xl border border-red-300/40 bg-red-500/15 px-3 py-2 text-center text-xs text-white">
          {error}
        </p>
      ) : (
        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/55">
          Secure checkout powered by Razorpay (test mode).
        </p>
      )}
    </div>
  );
}
