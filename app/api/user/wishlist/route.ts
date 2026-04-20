import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { requireUserAuth } from "@/lib/api/user-auth";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";

type WishlistPayload = {
  slug?: unknown;
  catalogNumber?: unknown;
  categorySlug?: unknown;
  chemicalName?: unknown;
  shortDescription?: unknown;
  purity?: unknown;
  availability?: unknown;
  imageUrl?: unknown;
};

export async function GET(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const db = getServerFirestoreDb();
    const snap = await getDocs(collection(db, "users", auth.uid, "wishlist"));
    const items = snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }))
      .sort((a, b) => String(b.updatedAtIso ?? "").localeCompare(String(a.updatedAtIso ?? "")));
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load wishlist" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = (await req.json()) as WishlistPayload;
  const slug = String(body.slug ?? "").trim();
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  try {
    const db = getServerFirestoreDb();
    const nowIso = new Date().toISOString();
    await setDoc(
      doc(db, "users", auth.uid, "wishlist", slug),
      {
        slug,
        catalogNumber: String(body.catalogNumber ?? ""),
        categorySlug: String(body.categorySlug ?? ""),
        chemicalName: String(body.chemicalName ?? ""),
        shortDescription: String(body.shortDescription ?? ""),
        purity: String(body.purity ?? ""),
        availability: String(body.availability ?? "Quote required"),
        imageUrl: String(body.imageUrl ?? ""),
        updatedAt: serverTimestamp(),
        updatedAtIso: nowIso,
      },
      { merge: true },
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add wishlist item" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const auth = await requireUserAuth(req);
  if (auth instanceof NextResponse) return auth;
  const url = new URL(req.url);
  const slug = String(url.searchParams.get("slug") ?? "").trim();
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }
  try {
    const db = getServerFirestoreDb();
    await deleteDoc(doc(db, "users", auth.uid, "wishlist", slug));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to remove wishlist item" },
      { status: 500 },
    );
  }
}
