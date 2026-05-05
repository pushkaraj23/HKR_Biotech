"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Soft navigations can leave the window partway scrolled. Snap to the top on
 * each route change, except when the URL has a hash (in-page / cross-route anchor).
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    /*
     * `scroll-smooth` on <html> makes programmatic scroll honor smooth scrolling,
     * which can leave the window mid-transition after a client navigation.
     */
    html.style.scrollBehavior = "auto";

    const hash = window.location.hash;
    if (hash.length > 1) {
      const id = decodeURIComponent(hash.slice(1));
      const rafId = requestAnimationFrame(() => {
        try {
          document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
        } finally {
          html.style.scrollBehavior = prevBehavior;
        }
      });
      return () => {
        cancelAnimationFrame(rafId);
        html.style.scrollBehavior = prevBehavior;
      };
    }

    try {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
    } finally {
      html.style.scrollBehavior = prevBehavior;
    }
  }, [pathname]);

  return null;
}
