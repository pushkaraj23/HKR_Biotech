import type { OrderRecord } from "@/lib/commerce/order-types";
import { resolveOrderCustomerName } from "@/lib/commerce/order-customer";
import { BRAND_LOGO_SRC } from "@/components/brand/BrandLogo";

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

type DownloadInvoiceOptions = {
  /** Signed-in display name when the order was placed before `userName` was stored. */
  customerNameFallback?: string | null;
};

/** Generate and download a PDF invoice for a paid order (client-only). */
export async function downloadOrderInvoicePdf(
  order: OrderRecord,
  options?: DownloadInvoiceOptions,
): Promise<void> {
  if (order.status !== "paid" && order.status !== "delivered") {
    throw new Error("Invoice is available after payment is confirmed.");
  }

  const [{ pdf }, { OrderInvoiceDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/lib/commerce/order-invoice-document"),
  ]);

  const origin = window.location.origin;
  const logoSrc = await loadImageAsDataUrl(`${origin}${BRAND_LOGO_SRC}`);

  const orderForPdf: OrderRecord = {
    ...order,
    userName: resolveOrderCustomerName(order, options?.customerNameFallback),
  };

  const blob = await pdf(<OrderInvoiceDocument order={orderForPdf} logoSrc={logoSrc} />).toBlob();
  const safeId = order.id.replace(/[^\w.-]+/g, "_");
  triggerBlobDownload(blob, `HKR-Invoice-${safeId}.pdf`);
}

export function canDownloadOrderInvoice(order: OrderRecord): boolean {
  return order.status === "paid" || order.status === "delivered";
}
