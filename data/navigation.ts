export type MainNavItem =
  | { href: string; label: string }
  | { href: string; label: string; productDropdown: true };

/** Top-level routes; product family links are loaded from Firestore via `/api/catalog/nav`. */
export const mainNav: MainNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products", productDropdown: true },
  { href: "/services", label: "Services" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];
