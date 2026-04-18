import { NextResponse } from "next/server";
import { loadCatalog } from "@/lib/catalog/load-catalog";

export const revalidate = 60;

export async function GET() {
  const { categories } = await loadCatalog();
  const items = categories.map((c) => ({
    href: `/products/${c.slug}`,
    label: c.name,
  }));
  return NextResponse.json({ items });
}
