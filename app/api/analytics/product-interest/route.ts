import { NextResponse } from "next/server";
import { verifyFirebaseIdTokenPublic } from "@/lib/firebase/verify-id-token";
import { trackProductInterest, type ProductInterestEventType } from "@/lib/analytics/product-interest";

type Payload = {
  eventType?: unknown;
  slug?: unknown;
  categorySlug?: unknown;
  chemicalName?: unknown;
  catalogNumber?: unknown;
};

const ALLOWED: ProductInterestEventType[] = [
  "view_from_list",
  "view_detail",
  "wishlist_add",
  "cart_add",
  "enquiry_submit",
];

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const eventType = String(body.eventType ?? "") as ProductInterestEventType;
  const slug = String(body.slug ?? "").trim();
  if (!slug || !ALLOWED.includes(eventType)) {
    return NextResponse.json({ error: "slug and valid eventType required" }, { status: 400 });
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  const auth = token ? await verifyFirebaseIdTokenPublic(token).catch(() => null) : null;

  await trackProductInterest({
    eventType,
    slug,
    categorySlug: String(body.categorySlug ?? "").trim(),
    chemicalName: String(body.chemicalName ?? "").trim(),
    catalogNumber: String(body.catalogNumber ?? "").trim(),
    uid: auth?.uid ?? null,
    email: auth?.email ?? null,
  });
  return NextResponse.json({ ok: true });
}
