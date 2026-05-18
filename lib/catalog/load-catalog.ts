import { collection, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { getServerFirestoreDb } from "@/lib/firebase/server-firestore";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type {
  CatalogProduct,
  ProductAvailability,
  ProductCategory,
  ProductSubcategory,
  ProductVariant,
} from "@/lib/types/catalog";
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

function variantPrice(row: Record<string, unknown>): string {
  for (const key of ["price", "listPrice", "unitPrice", "priceUsd", "amount"] as const) {
    const value = asString(row[key]).trim();
    if (value) return value;
  }
  return "";
}

function asVariants(v: unknown): ProductVariant[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const rows: ProductVariant[] = [];
  for (const item of v) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const size = asString(row.size).trim();
    if (!size) continue;
    rows.push({
      size,
      price: variantPrice(row),
      availabilityLabel: asString(
        row.availabilityLabel ?? row.availability,
        "Quote required",
      ),
    });
  }
  return rows.length ? rows : undefined;
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

function docToSubcategory(id: string, data: DocumentData): ProductSubcategory | null {
  const slug = asString(data.slug, id);
  const categorySlug = asString(data.categorySlug);
  const name = asString(data.name);
  if (!slug || !categorySlug || !name) return null;
  return {
    slug,
    categorySlug,
    name,
    description: data.description ? asString(data.description) : undefined,
    order: typeof data.order === "number" ? data.order : undefined,
  };
}

function docToProduct(id: string, data: DocumentData): CatalogProduct | null {
  const slug = asString(data.slug, id);
  const categorySlug = asString(data.categorySlug);
  const chemicalName = asString(data.chemicalName);
  if (!slug || !categorySlug || !chemicalName) return null;

  const subcategorySlug = asString(data.subcategorySlug);

  return {
    id: asString(data.id, slug),
    slug,
    imageUrl: data.imageUrl ? asString(data.imageUrl) : undefined,
    catalogNumber: asString(data.catalogNumber),
    categorySlug,
    subcategorySlug: subcategorySlug || undefined,
    chemicalName,
    alternativeName: data.alternativeName ? asString(data.alternativeName) : undefined,
    casNumber: asString(data.casNumber),
    molecularFormula: asString(data.molecularFormula),
    molecularWeight: asString(data.molecularWeight),
    purity: asString(data.purity),
    appearance: asString(data.appearance),
    solubility: data.solubility ? asString(data.solubility) : undefined,
    shortDescription: asString(data.shortDescription),
    detailedDescription: asString(data.detailedDescription),
    applications: asStringArray(data.applications),
    storageConditions: asString(data.storageConditions),
    packSizes: asStringArray(data.packSizes),
    variants: asVariants(data.variants),
    availability: coerceAvailability(data.availability),
    coaAvailable: Boolean(data.coaAvailable),
    sdsAvailable: Boolean(data.sdsAvailable),
    sdsUrl: data.sdsUrl ? asString(data.sdsUrl) : undefined,
    dslStatus: data.dslStatus ? asString(data.dslStatus) : undefined,
    tscaCertification: data.tscaCertification ? asString(data.tscaCertification) : undefined,
    rtecsNumber: data.rtecsNumber ? asString(data.rtecsNumber) : undefined,
    coaLotFormat: data.coaLotFormat ? asString(data.coaLotFormat) : undefined,
    shippingConditions: data.shippingConditions ? asString(data.shippingConditions) : undefined,
    tariffCode: data.tariffCode ? asString(data.tariffCode) : undefined,
    safetyStatement: data.safetyStatement ? asString(data.safetyStatement) : undefined,
    showSingleLotAvailability: Boolean(data.showSingleLotAvailability),
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

async function fetchSubcategoriesFromFirestore(): Promise<ProductSubcategory[]> {
  const db = getServerFirestoreDb();
  const snap = await getDocs(collection(db, "subcategories"));
  const raw = snap.docs.map((d) => ({
    id: d.id,
    data: d.data(),
    order: typeof d.data().order === "number" ? d.data().order : 0,
  }));
  raw.sort(
    (a, b) =>
      a.order - b.order ||
      String(a.data.categorySlug ?? "").localeCompare(String(b.data.categorySlug ?? "")) ||
      String(a.data.name ?? "").localeCompare(String(b.data.name ?? "")),
  );
  const rows: ProductSubcategory[] = [];
  for (const { id, data } of raw) {
    const s = docToSubcategory(id, data);
    if (s) rows.push(s);
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
  subcategories: ProductSubcategory[];
  products: CatalogProduct[];
  source: "firestore";
};

async function loadCatalogUncached(): Promise<ResolvedCatalog> {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* variables so categories and products can load from Firestore.",
    );
  }

  const [categories, subcategories, products] = await Promise.all([
    fetchCategoriesFromFirestore(),
    fetchSubcategoriesFromFirestore(),
    fetchProductsFromFirestore(),
  ]);
  return { categories, subcategories, products, source: "firestore" };
}

export const loadCatalog = unstable_cache(loadCatalogUncached, ["site-catalog"], {
  revalidate: 60,
  tags: ["catalog"],
});
