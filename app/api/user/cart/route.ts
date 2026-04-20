import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { requireUserAuth } from "@/lib/api/user-auth";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";

type CartPayload = {
  slug?: unknown;
  catalogNumber?: unknown;
  categorySlug?: unknown;
  chemicalName?: unknown;
  shortDescription?: unknown;
  purity?: unknown;
  availability?: unknown;
  imageUrl?: unknown;
  quantity?: unknown;
};

type CartItem = {
  id: string;
  updatedAtIso?: string;
} & Record<string, unknown>;

export async function GET(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const db = getServerFirestoreDb();
    const snap = await getDocs(collection(db, "users", auth.uid, "cart"));
    const items: CartItem[] = snap.docs
      .map<CartItem>((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }))
      .sort((a, b) => String(b.updatedAtIso ?? "").localeCompare(String(a.updatedAtIso ?? "")));
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load cart" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = (await req.json()) as CartPayload;
  const slug = String(body.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const qtyIncoming = Number(body.quantity ?? 1);
  const quantityToAdd = Number.isFinite(qtyIncoming) ? Math.max(1, Math.floor(qtyIncoming)) : 1;

  try {
    const db = getServerFirestoreDb();
    const ref = doc(db, "users", auth.uid, "cart", slug);
    const existing = await getDoc(ref);
    const currentQty = existing.exists() ? Number(existing.data().quantity ?? 1) : 0;
    const nextQty = Math.max(1, currentQty + quantityToAdd);
    const nowIso = new Date().toISOString();

    await setDoc(
      ref,
      {
        slug,
        catalogNumber: String(body.catalogNumber ?? ""),
        categorySlug: String(body.categorySlug ?? ""),
        chemicalName: String(body.chemicalName ?? ""),
        shortDescription: String(body.shortDescription ?? ""),
        purity: String(body.purity ?? ""),
        availability: String(body.availability ?? "Quote required"),
        imageUrl: String(body.imageUrl ?? ""),
        quantity: nextQty,
        updatedAt: serverTimestamp(),
        updatedAtIso: nowIso,
      },
      { merge: true },
    );
    return NextResponse.json({ ok: true, quantity: nextQty });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add cart item" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = (await req.json()) as CartPayload;
  const slug = String(body.slug ?? "").trim();
  const qtyRaw = Number(body.quantity ?? 1);
  const qty = Number.isFinite(qtyRaw) ? Math.floor(qtyRaw) : 1;
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  try {
    const db = getServerFirestoreDb();
    const ref = doc(db, "users", auth.uid, "cart", slug);
    if (qty <= 0) {
      await deleteDoc(ref);
      return NextResponse.json({ ok: true, removed: true });
    }
    await setDoc(
      ref,
      {
        quantity: qty,
        updatedAt: serverTimestamp(),
        updatedAtIso: new Date().toISOString(),
      },
      { merge: true },
    );
    return NextResponse.json({ ok: true, quantity: qty });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update cart item" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;
  const url = new URL(req.url);
  const slug = String(url.searchParams.get("slug") ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  try {
    const db = getServerFirestoreDb();
    await deleteDoc(doc(db, "users", auth.uid, "cart", slug));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to remove cart item" },
      { status: 500 },
    );
  }
}
