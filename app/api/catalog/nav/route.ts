import { NextResponse } from "next/server";
import { loadCatalog } from "@/lib/catalog/load-catalog";

export const revalidate = 60;

export type NavSubcategoryItem = {
  href: string;
  label: string;
  slug: string;
};

export type NavCategoryItem = {
  href: string;
  label: string;
  slug: string;
  subcategories: NavSubcategoryItem[];
};

export async function GET() {
  const { categories, subcategories } = await loadCatalog();
  const items: NavCategoryItem[] = categories.map((c) => ({
    href: `/products/${c.slug}`,
    label: c.name,
    slug: c.slug,
    subcategories: subcategories
      .filter((s) => s.categorySlug === c.slug)
      .map((s) => ({
        href: `/products/${c.slug}?subcategory=${encodeURIComponent(s.slug)}`,
        label: s.name,
        slug: s.slug,
      })),
  }));
  return NextResponse.json({ items });
}
