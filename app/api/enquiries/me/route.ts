import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";
import { verifyFirebaseIdTokenPublic } from "@/lib/firebase/verify-id-token";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return NextResponse.json({ error: "Missing Authorization bearer token" }, { status: 401 });
  }

  const auth = await verifyFirebaseIdTokenPublic(token).catch(() => null);
  if (!auth) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  try {
    const db = getServerFirestoreDb();
    let snap;
    if (auth.uid) {
      snap = await getDocs(
        query(collection(db, "enquiries"), where("customerUid", "==", auth.uid), orderBy("createdAt", "desc"), limit(100)),
      );
    } else if (auth.email) {
      snap = await getDocs(
        query(
          collection(db, "enquiries"),
          where("emailLower", "==", auth.email.toLowerCase()),
          orderBy("createdAt", "desc"),
          limit(100),
        ),
      );
    } else {
      return NextResponse.json({ enquiries: [] });
    }

    const enquiries = snap.docs.map((doc) => {
      const data = doc.data() as Record<string, unknown>;
      const createdAt = data.createdAt as { toDate?: () => Date } | undefined;
      const updatedAt = data.updatedAt as { toDate?: () => Date } | undefined;
      return {
        id: doc.id,
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        phone: String(data.phone ?? ""),
        organization: String(data.organization ?? ""),
        reference: String(data.reference ?? ""),
        message: String(data.message ?? ""),
        source: String(data.source ?? "website"),
        status: String(data.status ?? "new"),
        createdAtIso: createdAt?.toDate ? createdAt.toDate().toISOString() : String(data.createdAtIso ?? ""),
        updatedAtIso: updatedAt?.toDate ? updatedAt.toDate().toISOString() : "",
      };
    });
    return NextResponse.json({ enquiries });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load enquiries" },
      { status: 500 },
    );
  }
}
