import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, PackageSearch, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/components/common/SearchInput";
import { FilterControls } from "@/components/common/FilterControls";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import {
  catalogue, priceBands, sortOptions, slugToFilterCategory,
} from "@/data/firangi";

const defaultFilters = () => ({
  categories: [], prices: [], colours: [], styles: [], shootTypes: [], availability: [],
});

const groupLabels = {
  categories: "Category", prices: "Price", colours: "Colour",
  styles: "Style", shootTypes: "Shoot", availability: "Availability",
};

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => {
    const slug = searchParams.get("category");
    const mapped = slug ? slugToFilterCategory(slug) : null;
    return { ...defaultFilters(), categories: mapped ? [mapped] : [] };
  });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");

  useEffect(() => {
    const slug = searchParams.get("category");
    const mapped = slug ? slugToFilterCategory(slug) : null;
    if (mapped) setFilters((p) => ({ ...p, categories: [mapped] }));
  }, [searchParams]);

  const reset = () => { setFilters(defaultFilters()); setQuery(""); setSearchParams({}); };

  const priceLabel = (id) => priceBands.find((b) => b.id === id)?.label || id;

  const results = useMemo(() => {
    let list = catalogue.filter((p) => {
      if (filters.categories.length && !p.filterCategories.some((c) => filters.categories.includes(c))) return false;
      if (filters.prices.length) {
        const ok = filters.prices.some((id) => {
          const b = priceBands.find((x) => x.id === id);
          return b && p.pricePerDay >= b.min && p.pricePerDay <= b.max;
        });
        if (!ok) return false;
      }
      if (filters.colours.length && !p.colourTags.some((c) => filters.colours.includes(c))) return false;
      if (filters.styles.length && !filters.styles.includes(p.styleTag)) return false;
      if (filters.shootTypes.length && !p.shootTags.some((s) => filters.shootTypes.includes(s))) return false;
      if (filters.availability.length && !filters.availability.includes(p.availabilityGroup)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${p.name} ${p.category} ${p.material} ${p.color} ${p.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    switch (sort) {
      case "newest": list = [...list].sort((a, b) => b.addedOrder - a.addedOrder); break;
      case "price-asc": list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay); break;
      case "price-desc": list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case "popular": list = [...list].sort((a, b) => b.rentalCount - a.rentalCount); break;
      default:
        list = [...list].sort((a, b) =>
          b.featured === a.featured ? b.rentalCount - a.rentalCount : b.featured ? 1 : -1
        );
    }
    return list;
  }, [filters, query, sort]);

  // Build active-filter chips for quick removal.
  const chips = [];
  Object.entries(filters).forEach(([key, arr]) => {
    arr.forEach((val) => {
      chips.push({ key, val, label: key === "prices" ? priceLabel(val) : val });
    });
  });
  const removeChip = (key, val) =>
    setFilters((p) => ({ ...p, [key]: p[key].filter((v) => v !== val) }));

  return (
    <div className="pt-[72px]">
      {/* Editorial header */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <span className="eyebrow text-accent">The catalogue</span>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1] text-foreground sm:text-6xl">
            Explore the Collection
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Objects, accessories and details curated for your next visual story.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput value={query} onChange={setQuery} placeholder="Search by name, material or colour…" className="w-full lg:max-w-md" />
          <div className="flex items-center justify-between gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="line" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> Filters{chips.length ? ` (${chips.length})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[90%] max-w-sm overflow-y-auto bg-background">
                <div className="mt-4 pb-10"><FilterControls filters={filters} setFilters={setFilters} onReset={reset} /></div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-3">
              <span className="hidden font-label text-[0.68rem] tracking-[0.14em] text-muted-foreground sm:inline">SORT</span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-11 w-[190px] rounded-sm border-input text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {sortOptions.map((o) => (<SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Count + chips */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-border pb-6">
          <p className="text-sm text-muted-foreground">
            Displaying <span className="font-medium text-foreground">{results.length}</span> of {catalogue.length} props
          </p>
          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <button key={`${c.key}-${c.val}`} onClick={() => removeChip(c.key, c.val)}
                  className="group inline-flex items-center gap-1.5 border border-border bg-card px-2.5 py-1 text-xs text-foreground transition-colors hover:border-foreground/40">
                  <span className="text-[0.6rem] uppercase tracking-wide text-muted-foreground">{groupLabels[c.key]}:</span>
                  {c.label}
                  <X className="h-3 w-3 text-muted-foreground group-hover:text-burgundy" />
                </button>
              ))}
              <button onClick={reset} className="font-label text-[0.64rem] tracking-[0.14em] text-accent hover:underline">CLEAR</button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[270px_1fr] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-[96px] max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
              <FilterControls filters={filters} setFilters={setFilters} onReset={reset} />
            </div>
          </aside>

          <div>
            {results.length ? (
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
                {results.map((p, i) => (<ProductCard key={p.id} prop={p} index={i} />))}
              </div>
            ) : (
              <EmptyState
                icon={PackageSearch}
                title="No props match your filters"
                description="Try removing a filter or widening your price range to see more of the library."
                action={<Button variant="editorial" onClick={reset}>Clear all filters</Button>}
                className="min-h-[40vh] border border-dashed border-border"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
