"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  ChevronLeft, Check, Truck, ShieldCheck, Sparkles, ArrowRight,
  CalendarIcon, Heart, ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AvailabilityBadge } from "@/components/common/AvailabilityBadge";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { cn } from "@/lib/utils";
import {
  getPropById, getRelatedProps, props as allProps, categoryName, formatINR,
} from "@/data/firangi";
import { useWishlist } from "@/context/WishlistContext";
import { useRequest } from "@/context/RequestContext";

const SpecRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-6 border-b border-border py-3.5">
    <span className="eyebrow text-muted-foreground">{label}</span>
    <span className="text-right text-sm text-foreground">{value}</span>
  </div>
);

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const prop = getPropById(id);

  const { isWishlisted, toggle } = useWishlist();
  const { add: addToRequest, has: inRequest } = useRequest();

  const [activeImg, setActiveImg] = useState(0);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const related = useMemo(() => {
    if (!prop) return [];
    let list = getRelatedProps(prop, 6);
    if (list.length < 4) {
      const fill = allProps.filter((p) => p.id !== prop.id && !list.includes(p));
      list = [...list, ...fill].slice(0, 6);
    }
    return list.slice(0, 6);
  }, [prop]);

  if (!prop) {
    return (
      <div className="pt-[72px]">
        <EmptyState
          icon={Sparkles}
          title="Prop not found"
          description="This piece may have been retired from the library."
          action={<Button asChild variant="editorial"><Link href="/explore">Back to library</Link></Button>}
          className="min-h-[70vh]"
        />
      </div>
    );
  }

  const images = prop.images;
  const days = start && end ? Math.max(1, Math.round((end - start) / 86400000) + 1) : 0;
  const total = days > 0 ? days * prop.pricePerDay : prop.pricePerDay;
  const wished = isWishlisted(prop.id);
  const added = inRequest(prop.id);

  const handleAddToRequest = () => {
    addToRequest(prop.id, {
      start: start ? start.toISOString() : null,
      end: end ? end.toISOString() : null,
    });
    toast("Added to your request", {
      description: days > 0 ? `${prop.name} \u2014 ${days} ${days === 1 ? "day" : "days"}` : prop.name,
    });
  };

  const handleWishlist = () => {
    toggle(prop.id);
    toast(wished ? "Removed from wishlist" : "Saved to wishlist", { description: prop.name });
  };

  return (
    <div className="pt-[72px]">
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12">
        <button onClick={() => router.back()} className="mb-8 inline-flex items-center gap-1.5 font-label text-[0.7rem] tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> BACK
        </button>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* LEFT — Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex gap-3 sm:flex-col">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn("h-20 w-16 overflow-hidden border transition-all sm:h-24 sm:w-20", activeImg === i ? "border-accent opacity-100" : "border-border opacity-70 hover:opacity-100")}
                >
                  <img src={img} alt={`${prop.name} view ${i + 1}`} className="editorial-img h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 overflow-hidden bg-muted">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={prop.name}
                  className={cn(
                    "editorial-img aspect-[4/5] h-full w-full object-cover transition-opacity duration-700",
                    i === activeImg ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                  )}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Details + rental */}
          <div className="lg:pt-2">
            <div className="flex items-center justify-between">
              <Link href={`/explore?category=${prop.category}`} className="eyebrow text-accent hover:underline">
                {categoryName(prop.category)}
              </Link>
              <AvailabilityBadge status={prop.availability} />
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">{prop.name}</h1>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-serif text-3xl text-foreground">{formatINR(prop.pricePerDay)}</span>
              <span className="text-sm text-muted-foreground">per day</span>
            </div>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{prop.description}</p>

            {prop.availability !== "available" && prop.availableFrom && (
              <p className="mt-4 text-sm text-burgundy">
                Currently {prop.availability}. Next available from {new Date(prop.availableFrom).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}.
              </p>
            )}

            {/* Rental date selection */}
            <div className="mt-8 border border-border bg-card p-5">
              <h3 className="eyebrow text-foreground">Select rental dates</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted-foreground">Start date</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className={cn("h-11 justify-start rounded-sm font-normal", !start && "text-muted-foreground")}>
                        <CalendarIcon className="h-4 w-4" />{start ? format(start, "dd MMM yyyy") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={start} onSelect={setStart} disabled={(d) => d < new Date().setHours(0, 0, 0, 0)} initialFocus /></PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted-foreground">End date</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className={cn("h-11 justify-start rounded-sm font-normal", !end && "text-muted-foreground")}>
                        <CalendarIcon className="h-4 w-4" />{end ? format(end, "dd MMM yyyy") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={end} onSelect={setEnd} disabled={(d) => d < (start || new Date().setHours(0, 0, 0, 0))} initialFocus /></PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily price</span>
                  <span className="text-foreground">{formatINR(prop.pricePerDay)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rental days</span>
                  <span className="text-foreground">{days > 0 ? days : "\u2014"}</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="eyebrow text-muted-foreground">Estimated total</span>
                  <span className="font-serif text-2xl text-foreground">{days > 0 ? formatINR(total) : "Select dates"}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={handleAddToRequest} variant="editorial" size="lg" className="flex-1 min-w-[200px]">
                {added ? <><Check className="h-4 w-4" /> Added to Request</> : <><ClipboardList className="h-4 w-4" /> Add to Request</>}
              </Button>
              <Button onClick={handleWishlist} variant="line" size="lg" className="flex-1 min-w-[180px]">
                <Heart className={cn("h-4 w-4", wished && "fill-burgundy text-burgundy")} /> {wished ? "Saved" : "Add to Wishlist"}
              </Button>
            </div>
            {added && (
              <Link href="/rental-request" className="mt-4 inline-flex items-center gap-1.5 font-label text-[0.7rem] tracking-[0.14em] text-accent hover:underline">
                REVIEW YOUR REQUEST <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}

            {/* Trust row */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-border py-6">
              {[{ i: Truck, t: "Studio delivery" }, { i: ShieldCheck, t: "Condition assured" }, { i: Sparkles, t: "Shoot-ready prep" }].map((f) => (
                <div key={f.t} className="flex flex-col items-center gap-2 text-center">
                  <f.i className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <span className="text-xs text-muted-foreground">{f.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DETAILS + SUITABLE FOR */}
        <div className="mt-16 grid gap-12 border-t border-border pt-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="The details" title="Specifications" titleClassName="text-3xl sm:text-4xl" />
            <div className="mt-8">
              <SpecRow label="Material" value={prop.material} />
              <SpecRow label="Colour" value={prop.color} />
              <SpecRow label="Dimensions" value={prop.dimensions} />
              <SpecRow label="Condition" value={prop.condition} />
              <SpecRow label="Style" value={prop.style} />
              <SpecRow label="Times rented" value={`${prop.rentalCount}+`} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Suitable for" title="At home in every set" titleClassName="text-3xl sm:text-4xl" />
            <div className="mt-8 flex flex-wrap gap-2.5">
              {prop.shootTypes.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 border border-border bg-card px-3.5 py-2 text-sm text-foreground">
                  <Check className="h-3.5 w-3.5 text-accent" /> {s}
                </span>
              ))}
            </div>
            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="terms" className="border-border">
                <AccordionTrigger className="font-label text-xs tracking-[0.14em]">RENTAL TERMS</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  Minimum one-day rental. A refundable security deposit applies per piece. Props are dispatched cleaned and styled; please return in the same condition. Extended rentals are billed per day.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery" className="border-border">
                <AccordionTrigger className="font-label text-xs tracking-[0.14em]">DELIVERY &amp; PICKUP</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  Studio delivery available across the city with 48-hour notice. Self-pickup from the Studio Frangipani studio is complimentary.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <Separator className="my-16" />

        {/* RELATED */}
        <div>
          <SectionHeading eyebrow="You may also like" title="Related props" />
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
            {related.map((p, i) => (<ProductCard key={p.id} prop={p} index={i} />))}
          </div>
        </div>
      </div>
    </div>
  );
}
