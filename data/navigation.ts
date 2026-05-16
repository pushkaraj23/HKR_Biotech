export type MainNavItem =
  | { href: string; label: string }
  | { href: string; label: string; productDropdown: true };

/** Top-level routes; product family links are loaded from Firestore via `/api/catalog/nav`. Contact is the header CTA, not a text nav item. */
export const mainNav: MainNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products", productDropdown: true },
  { href: "/services", label: "Services" },
  { href: "/leadership", label: "Leadership" },
];
