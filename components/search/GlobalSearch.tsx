"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import {
  getStaticSiteSearchResults,
  mergeSearchIndex,
  search,
  type SearchResult,
  type SearchResultKind,
} from "@/lib/search-index";
import { cn } from "@/lib/cn";

/* ─── icons ─── */

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M12.5 12.5 17 17" />
    </svg>
  );
}

const KIND_ICONS: Record<SearchResultKind, ReactElement> = {
  product: (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="14" height="11" rx="2" />
      <path d="M7 6V4a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  category: (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" />
    </svg>
  ),
  service: (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l2.5 2.5" />
    </svg>
  ),
  industry: (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17V8l4-4v5l4-4v5l4-4v11H3z" />
    </svg>
  ),
  page: (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2h8l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M12 2v4h4" />
    </svg>
  ),
};

const KIND_LABELS: Record<SearchResultKind, string> = {
  product: "Products",
  category: "Categories",
  service: "Services",
  industry: "Industries",
  page: "Pages",
};

const KIND_ORDER: SearchResultKind[] = ["category", "product", "service", "industry", "page"];

/* ─── overlay (always rendered as "open" — parent controls mount) ─── */

export function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [searchIndex, setSearchIndex] = useState<SearchResult[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/catalog/search-index")
      .then((r) => r.json())
      .then((d: { results?: SearchResult[] }) => {
        if (!cancelled && Array.isArray(d.results)) {
          setSearchIndex(d.results);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSearchIndex(mergeSearchIndex([], getStaticSiteSearchResults()));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    const index =
      searchIndex ??
      mergeSearchIndex([], getStaticSiteSearchResults());
    return search(query, 24, index);
  }, [query, searchIndex]);

  const grouped = useMemo(() => {
    const map = new Map<SearchResultKind, SearchResult[]>();
    for (const r of results) {
      const arr = map.get(r.kind) ?? [];
      arr.push(r);
      map.set(r.kind, arr);
    }
    const out: { kind: SearchResultKind; items: SearchResult[] }[] = [];
    for (const k of KIND_ORDER) {
      const items = map.get(k);
      if (items?.length) out.push({ kind: k, items });
    }
    return out;
  }, [results]);

  const flat = results;

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  useEffect(() => setActiveIdx(0), [results]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flat[activeIdx]) {
      e.preventDefault();
      navigate(flat[activeIdx].href);
    }
  }

  let flatIdx = -1;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[min(20vh,10rem)]">
      <div
        className="absolute inset-0 bg-background/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        className="relative mx-4 w-full max-w-xl animate-[fade-up_0.18s_ease-out] overflow-hidden rounded-2xl border border-overlay-hover bg-surface/95 shadow-elevated-lg backdrop-blur-2xl"
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-overlay px-4 py-3">
          <IconSearch className="h-5 w-5 shrink-0 text-caption-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, services, pages…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-caption-foreground"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden shrink-0 rounded-md border border-overlay-hover bg-on-dark/[0.06] px-1.5 py-0.5 font-mono text-[10px] font-medium text-caption-foreground sm:inline">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2">
          {query.trim() && flat.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-caption-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {!query.trim() && (
            <p className="px-3 py-8 text-center text-sm text-caption-foreground">
              Start typing to search the catalogue, services, and pages.
            </p>
          )}

          {grouped.map((group) => (
            <div key={group.kind} className="mb-1">
              <p className="px-3 pb-1.5 pt-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-caption-foreground">
                {KIND_LABELS[group.kind]}
              </p>
              {group.items.map((item) => {
                flatIdx++;
                const idx = flatIdx;
                const isActive = idx === activeIdx;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-idx={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-100",
                      isActive
                        ? "bg-primary/10 text-on-dark"
                        : "text-muted-foreground hover:bg-on-dark/[0.04]",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-100",
                        isActive
                          ? "border-primary/30 bg-primary/15 text-primary"
                          : "border-overlay bg-on-dark/[0.04] text-caption-foreground",
                      )}
                    >
                      {KIND_ICONS[item.kind]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium leading-snug">
                        {item.title}
                      </span>
                      <span className="block truncate text-xs leading-snug text-caption-foreground">
                        {item.subtitle}
                      </span>
                    </span>
                    {isActive && (
                      <kbd className="hidden shrink-0 rounded-md border border-overlay-hover bg-on-dark/[0.06] px-1.5 py-0.5 font-mono text-[10px] font-medium text-caption-foreground sm:inline">
                        ↵
                      </kbd>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        {flat.length > 0 && (
          <div className="flex items-center gap-4 border-t border-overlay px-4 py-2 text-[11px] text-caption-foreground">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-overlay-hover bg-on-dark/[0.06] px-1 py-0.5 font-mono text-[9px]">↑</kbd>
              <kbd className="rounded border border-overlay-hover bg-on-dark/[0.06] px-1 py-0.5 font-mono text-[9px]">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-overlay-hover bg-on-dark/[0.06] px-1 py-0.5 font-mono text-[9px]">↵</kbd>
              open
            </span>
            <span className="ml-auto tabular-nums">{flat.length} result{flat.length !== 1 && "s"}</span>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

/* Trigger button for the Header */
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 items-center gap-2 rounded-full border border-white/20 bg-white/10 pl-3 pr-2.5 text-xs text-secondary-foreground/90 shadow-sm backdrop-blur-lg transition-all duration-200 hover:border-white/30 hover:bg-white/15 hover:text-secondary-foreground hover:shadow-md"
      aria-label="Search"
    >
      <IconSearch className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden rounded-[5px] border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-secondary-foreground/80 sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}
