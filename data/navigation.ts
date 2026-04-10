export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/products",
    label: "Products",
    children: [
      { href: "/products/carbohydrates", label: "Carbohydrates" },
      { href: "/products/api-impurities", label: "API Impurities" },
      { href: "/products/nucleotides-linkers", label: "Nucleotides / Linkers" },
      { href: "/products/research-intermediates", label: "Research Intermediates" },
      { href: "/products/protecting-groups", label: "Protecting Groups" },
    ],
  },
  { href: "/services", label: "Services" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
] as const;
