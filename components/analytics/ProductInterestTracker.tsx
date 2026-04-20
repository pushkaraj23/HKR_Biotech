"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { trackProductInterestClient } from "@/lib/analytics/track-product-interest";

export function ProductInterestTracker({
  slug,
  categorySlug,
  chemicalName,
  catalogNumber,
}: {
  slug: string;
  categorySlug: string;
  chemicalName: string;
  catalogNumber: string;
}) {
  const { user } = useAuth();
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void (async () => {
      const token = user ? await user.getIdToken().catch(() => null) : null;
      await trackProductInterestClient(
        "view_detail",
        { slug, categorySlug, chemicalName, catalogNumber },
        token,
      );
    })();
  }, [catalogNumber, categorySlug, chemicalName, slug, user]);

  return null;
}
