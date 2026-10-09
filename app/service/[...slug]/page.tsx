import { permanentRedirect, notFound } from "next/navigation";
import { getProductByCasNumber } from "@/data/catalog";
import { extractCasFromSlug } from "@/lib/seo/cas";
import { productPath } from "@/lib/seo/product-metadata";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

/**
 * Legacy WordPress URLs were `/service/{cas}-{chemical-name}/`.
 * 301 to the matching Next.js product page when CAS is found in the catalogue.
 */
export default async function LegacyServiceProductRedirect({ params }: PageProps) {
  const { slug: parts } = await params;
  if (!parts?.length) notFound();

  const joined = parts.join("/");
  const cas = extractCasFromSlug(joined);
  if (!cas) {
    permanentRedirect("/products");
  }

  const product = await getProductByCasNumber(cas);
  if (product) {
    permanentRedirect(productPath(product));
  }

  // CAS present but not in current catalogue — send users to searchable catalogue.
  permanentRedirect(`/products?search=${encodeURIComponent(cas)}`);
}
