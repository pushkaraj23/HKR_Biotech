import { NextResponse } from "next/server";
import { loadCatalog } from "@/lib/catalog/load-catalog";
import {
  buildCatalogSearchResults,
  getStaticSiteSearchResults,
  mergeSearchIndex,
  type SearchResult,
} from "@/lib/search-index";

export const revalidate = 60;

export async function GET() {
  const { categories, products } = await loadCatalog();
  const catalogPart = buildCatalogSearchResults(categories, products);
  const staticPart = getStaticSiteSearchResults();
  const results: SearchResult[] = mergeSearchIndex(catalogPart, staticPart);
  return NextResponse.json({ results });
}
