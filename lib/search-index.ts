import { getAllCategories, getAllProducts } from "@/data/catalog";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

export type SearchResultKind = "product" | "category" | "service" | "industry" | "page";

export type SearchResult = {
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  href: string;
};

const PAGES: SearchResult[] = [
  { kind: "page", title: "Home", subtitle: "HKR Biotech Labs homepage", href: "/" },
  { kind: "page", title: "About Us", subtitle: "Our story and mission", href: "/about" },
  { kind: "page", title: "Products", subtitle: "Full product catalogue", href: "/products" },
  { kind: "page", title: "Services", subtitle: "Synthesis, analysis, and research", href: "/services" },
  { kind: "page", title: "Capabilities", subtitle: "Lab infrastructure and instruments", href: "/capabilities" },
  { kind: "page", title: "Industries", subtitle: "Sectors we serve", href: "/industries" },
  { kind: "page", title: "Contact", subtitle: "Get in touch / enquire", href: "/contact" },
];

let _cache: SearchResult[] | null = null;

export function getSearchIndex(): SearchResult[] {
  if (_cache) return _cache;

  const results: SearchResult[] = [];

  for (const cat of getAllCategories()) {
    results.push({
      kind: "category",
      title: cat.name,
      subtitle: cat.tagline,
      href: `/products/${cat.slug}`,
    });
  }

  for (const p of getAllProducts()) {
    results.push({
      kind: "product",
      title: p.chemicalName,
      subtitle: `${p.catalogNumber} · CAS ${p.casNumber}`,
      href: `/products/${p.categorySlug}/${p.slug}`,
    });
  }

  for (const s of services) {
    results.push({
      kind: "service",
      title: s.title,
      subtitle: s.summary,
      href: `/services/${s.slug}`,
    });
  }

  for (const ind of industries) {
    results.push({
      kind: "industry",
      title: ind.title,
      subtitle: ind.description,
      href: `/industries#${ind.slug}`,
    });
  }

  results.push(...PAGES);

  _cache = results;
  return results;
}

export function search(query: string, limit = 20): SearchResult[] {
  if (!query.trim()) return [];
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const index = getSearchIndex();

  const scored: { result: SearchResult; score: number }[] = [];

  for (const result of index) {
    const haystack = `${result.title} ${result.subtitle}`.toLowerCase();
    let score = 0;
    let allMatch = true;

    for (const term of terms) {
      const titleLower = result.title.toLowerCase();
      if (titleLower === term) {
        score += 100;
      } else if (titleLower.startsWith(term)) {
        score += 60;
      } else if (titleLower.includes(term)) {
        score += 40;
      } else if (haystack.includes(term)) {
        score += 15;
      } else {
        allMatch = false;
        break;
      }
    }

    if (allMatch && score > 0) {
      const kindBonus: Record<SearchResultKind, number> = {
        product: 5,
        category: 10,
        service: 4,
        industry: 3,
        page: 2,
      };
      score += kindBonus[result.kind];
      scored.push({ result, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.result);
}
