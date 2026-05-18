"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { PRODUCT_DETAIL_ORDERING_PANEL } from "@/components/products/catalog/productDetailStyles";
import { cartLineId, getDisplayVariants } from "@/lib/catalog/product-variants";
import { loginPathWithCallback } from "@/lib/auth/return-url";
import { trackProductInterestClient } from "@/lib/analytics/track-product-interest";
import { glassButtonCn } from "@/lib/ui/glassButton";
import type { CatalogProduct } from "@/lib/types/catalog";
import { cn } from "@/lib/cn";

type ProductOrderingPanelProps = {
  product: CatalogProduct;
};

export function ProductOrderingPanel({ product }: ProductOrderingPanelProps) {
  const variants = useMemo(() => getDisplayVariants(product), [product]);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(variants.map((v) => [v.size, 0])),
  );
  const [singleLot, setSingleLot] = useState(Boolean(product.showSingleLotAvailability));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function setQty(size: string, raw: string) {
    const n = Math.max(0, Math.floor(Number(raw) || 0));
    setQuantities((prev) => ({ ...prev, [size]: n }));
  }

  function bump(size: string, delta: number) {
    setQuantities((prev) => ({
      ...prev,
      [size]: Math.max(0, (prev[size] ?? 0) + delta),
    }));
  }

  async function addToCart() {
    const lines = variants.filter((v) => (quantities[v.size] ?? 0) > 0);
    if (lines.length === 0) {
      setMessage("Enter a quantity for at least one pack size.");
      return;
    }
    if (!user) {
      router.push(loginPathWithCallback(pathname || "/products"));
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const token = await user.getIdToken();
      for (const line of lines) {
        const qty = quantities[line.size] ?? 1;
        const lineId = cartLineId(product.slug, line.size);
        const res = await fetch("/api/user/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            slug: lineId,
            productSlug: product.slug,
            variantSize: line.size,
            variantPrice: line.price,
            catalogNumber: product.catalogNumber,
            categorySlug: product.categorySlug,
            chemicalName: product.chemicalName,
            shortDescription: product.shortDescription,
            purity: product.purity,
            availability: line.availabilityLabel || product.availability,
            imageUrl: product.imageUrl ?? "",
            quantity: qty,
            singleLot,
          }),
        });
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        if (!res.ok) throw new Error(body?.error || "Could not add to cart");
      }
      await trackProductInterestClient(
        "cart_add",
        {
          slug: product.slug,
          categorySlug: product.categorySlug,
          chemicalName: product.chemicalName,
          catalogNumber: product.catalogNumber,
        },
        token,
      );
      setMessage(`Added ${lines.length} line${lines.length === 1 ? "" : "s"} to cart.`);
      setQuantities(Object.fromEntries(variants.map((v) => [v.size, 0])));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not add to cart");
    } finally {
      setSaving(false);
    }
  }

  const totalQty = useMemo(
    () => Object.values(quantities).reduce((s, n) => s + (n || 0), 0),
    [quantities],
  );

  return (
    <section aria-label="Order this product" className={PRODUCT_DETAIL_ORDERING_PANEL}>
      <div className="overflow-x-auto p-5 sm:p-6 md:p-8">
        <table className="w-full min-w-[520px] text-left text-base">
          <thead>
            <tr className="border-b border-[#dbe6f2] bg-gradient-to-r from-[#eef4fc] via-white to-[#e8f6ef] text-xs font-bold uppercase tracking-[0.14em] text-[#1459b8]">
              <th className="px-5 py-4">Size</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Availability</th>
              <th className="w-36 px-5 py-4 text-center">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8eef5]">
            {variants.map((v) => {
              const qty = quantities[v.size] ?? 0;
              return (
                <tr key={v.size} className="transition-colors hover:bg-[#f7faff]/80">
                  <td className="px-5 py-4 font-semibold text-[#0d2137]">{v.size}</td>
                  <td className="px-5 py-4 font-mono text-[#1459b8]">
                    {v.price.trim() ? (
                      v.price
                    ) : (
                      <span className="font-sans text-[#7a8aa0]">Quote on request</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[#3e5870]">{v.availabilityLabel}</td>
                  <td className="px-5 py-4">
                    <div className="mx-auto flex w-fit items-center rounded-full border border-[#cfddee] bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => bump(v.size, -1)}
                        disabled={qty === 0}
                        className="flex h-9 w-9 items-center justify-center rounded-l-full text-lg text-[#1459b8] transition hover:bg-[#eef4fc] disabled:opacity-40"
                        aria-label={`Decrease ${v.size}`}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={qty}
                        onChange={(e) => setQty(v.size, e.target.value)}
                        className="h-9 w-12 border-0 bg-transparent text-center text-base font-semibold text-[#0d2137] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        aria-label={`Quantity for ${v.size}`}
                      />
                      <button
                        type="button"
                        onClick={() => bump(v.size, 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-r-full text-lg text-[#1459b8] transition hover:bg-[#eef4fc]"
                        aria-label={`Increase ${v.size}`}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e8eef5] px-5 py-4 sm:px-8">
        <label className="flex cursor-pointer items-center gap-2.5 text-base text-[#3e5870]">
          <input
            type="checkbox"
            checked={singleLot}
            onChange={(e) => setSingleLot(e.target.checked)}
            className="h-4 w-4 rounded border-[#cfddee] accent-[#1a73e8]"
          />
          Show availability for single lot
        </label>
        {totalQty > 0 ? (
          <p className="text-sm font-semibold text-[#1459b8]">
            {totalQty} unit{totalQty === 1 ? "" : "s"} selected
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4 border-t border-[#e8eef5] px-5 py-5 sm:px-8">
        {message ? (
          <p
            className={cn(
              "text-base font-medium",
              message.includes("Added") ? "text-[#0d8f62]" : "text-[#1459b8]",
            )}
          >
            {message}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => void addToCart()}
          disabled={saving}
          className={cn(
            glassButtonCn("green", "light", "rounded-full px-10 py-3 text-base uppercase tracking-wide"),
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          <CartIcon />
          {saving ? "Adding…" : "Add to cart"}
        </button>
      </div>
    </section>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 3h2l1.6 9.59A2 2 0 0 0 8.57 14H18a2 2 0 0 0 1.97-1.65L21 7H6" />
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="17" cy="20" r="1.6" />
    </svg>
  );
}
