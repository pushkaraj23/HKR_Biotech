import { collection, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { CatalogProduct, ProductAvailability, ProductCategory } from "@/lib/types/catalog";
import { isAvailabilityValue } from "@/lib/catalog/filters";
import { unstable_cache } from "next/cache";

function asString(v: unknown, fallback = ""): string {
  if (typeof v === "string") return v;
  if (v === null || v === undefined) return fallback;
  return String(v);
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.map((x) => asString(x)).filter(Boolean);
  }
  return [];
}

function coerceAvailability(v: unknown): ProductAvailability {
  const s = asString(v);
  if (isAvailabilityValue(s)) return s;
  return "Quote required";
}

function docToCategory(id: string, data: DocumentData): ProductCategory | null {
  const slug = asString(data.slug, id);
  const name = asString(data.name);
  if (!slug || !name) return null;
  return {
    slug,
    name,
    imageUrl: data.imageUrl ? asString(data.imageUrl) : undefined,
    tagline: asString(data.tagline),
    description: asString(data.description),
    overview: asString(data.overview),
    highlights: asStringArray(data.highlights),
  };
}

function docToProduct(id: string, data: DocumentData): CatalogProduct | null {
  const slug = asString(data.slug, id);
  const categorySlug = asString(data.categorySlug);
  const chemicalName = asString(data.chemicalName);
  if (!slug || !categorySlug || !chemicalName) return null;

  return {
    id: asString(data.id, slug),
    slug,
    imageUrl: data.imageUrl ? asString(data.imageUrl) : undefined,
    catalogNumber: asString(data.catalogNumber),
    categorySlug,
    chemicalName,
    casNumber: asString(data.casNumber),
    molecularFormula: asString(data.molecularFormula),
    molecularWeight: asString(data.molecularWeight),
    purity: asString(data.purity),
    appearance: asString(data.appearance),
    shortDescription: asString(data.shortDescription),
    detailedDescription: asString(data.detailedDescription),
    applications: asStringArray(data.applications),
    storageConditions: asString(data.storageConditions),
    packSizes: asStringArray(data.packSizes),
    availability: coerceAvailability(data.availability),
    datasheetUrl: data.datasheetUrl ? asString(data.datasheetUrl) : undefined,
    coaAvailable: Boolean(data.coaAvailable),
    sdsAvailable: Boolean(data.sdsAvailable),
    relatedSlugs: asStringArray(data.relatedSlugs),
  };
}

async function fetchCategoriesFromFirestore(): Promise<ProductCategory[]> {
  const db = getServerFirestoreDb();
  const snap = await getDocs(collection(db, "categories"));
  const raw = snap.docs.map((d) => ({
    id: d.id,
    data: d.data(),
    order: typeof d.data().order === "number" ? d.data().order : 0,
  }));
  raw.sort((a, b) => a.order - b.order || String(a.data.name ?? "").localeCompare(String(b.data.name ?? "")));
  const rows: ProductCategory[] = [];
  for (const { id, data } of raw) {
    const c = docToCategory(id, data);
    if (c) rows.push(c);
  }
  return rows;
}

async function fetchProductsFromFirestore(): Promise<CatalogProduct[]> {
  const db = getServerFirestoreDb();
  const snap = await getDocs(collection(db, "products"));
  const rows: CatalogProduct[] = [];
  for (const doc of snap.docs) {
    const p = docToProduct(doc.id, doc.data());
    if (p) rows.push(p);
  }
  rows.sort((a, b) => a.catalogNumber.localeCompare(b.catalogNumber));
  return rows;
}

export type ResolvedCatalog = {
  categories: ProductCategory[];
  products: CatalogProduct[];
  source: "firestore";
};

async function loadCatalogUncached(): Promise<ResolvedCatalog> {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* variables so categories and products can load from Firestore.",
    );
  }

  const [categories, products] = await Promise.all([fetchCategoriesFromFirestore(), fetchProductsFromFirestore()]);
  return { categories, products, source: "firestore" };
}

export const loadCatalog = unstable_cache(loadCatalogUncached, ["site-catalog"], {
  revalidate: 60,
  tags: ["catalog"],
});
