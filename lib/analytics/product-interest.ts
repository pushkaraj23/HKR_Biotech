import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";

export type ProductInterestEventType =
  | "view_from_list"
  | "view_detail"
  | "wishlist_add"
  | "cart_add"
  | "enquiry_submit";

type ProductInterestInput = {
  eventType: ProductInterestEventType;
  slug: string;
  categorySlug?: string;
  chemicalName?: string;
  catalogNumber?: string;
  uid?: string | null;
  email?: string | null;
};

const EVENT_WEIGHTS: Record<ProductInterestEventType, number> = {
  view_from_list: 1,
  view_detail: 2,
  wishlist_add: 4,
  cart_add: 5,
  enquiry_submit: 7,
};

function getDayString() {
  return new Date().toISOString().slice(0, 10);
}

export async function trackProductInterest(input: ProductInterestInput): Promise<void> {
  const slug = input.slug.trim();
  if (!slug) return;

  const day = getDayString();
  const key = `${day}__${slug}`;
  const nowIso = new Date().toISOString();
  const db = getServerFirestoreDb();
  const ref = doc(db, "analytics_product_interest", key);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const data = (snap.exists() ? snap.data() : {}) as Record<string, unknown>;
    const counts = (data.counts as Record<string, number> | undefined) ?? {};
    const prevCount = Number(counts[input.eventType] ?? 0);

    tx.set(
      ref,
      {
        slug,
        day,
        categorySlug: input.categorySlug ?? "",
        chemicalName: input.chemicalName ?? "",
        catalogNumber: input.catalogNumber ?? "",
        score: Number(data.score ?? 0) + EVENT_WEIGHTS[input.eventType],
        counts: {
          ...counts,
          [input.eventType]: prevCount + 1,
        },
        totalEvents: Number(data.totalEvents ?? 0) + 1,
        lastEventType: input.eventType,
        lastEventAt: serverTimestamp(),
        lastEventAtIso: nowIso,
        lastUserUid: input.uid ?? "",
        lastUserEmail: input.email ?? "",
      },
      { merge: true },
    );
  });
}
