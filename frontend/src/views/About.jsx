"use client";

import React from "react";
import Link from "next/link";
import { Camera, Clapperboard, Shirt, Megaphone, Building2, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { editorialImages } from "@/data/firangi";

const audience = [
  { icon: Camera, label: "Photographers" },
  { icon: Clapperboard, label: "Filmmakers" },
  { icon: Shirt, label: "Fashion Stylists" },
  { icon: Megaphone, label: "Advertising Agencies" },
  { icon: Building2, label: "Production Houses" },
  { icon: Sparkles, label: "Content Creators & Brands" },
];

const differentiators = [
  { n: "01", title: "Curated, never generic", text: "Every piece is chosen by our stylists for its character, patina and presence on camera." },
  { n: "02", title: "Prepped to perfection", text: "Steamed, polished and condition-checked before every dispatch so it arrives shoot-ready." },
  { n: "03", title: "Built for creatives", text: "Flexible rentals, styling notes and a team that speaks the language of the frame." },
];

const stats = [
  { value: "300+", label: "Props in the library" },
  { value: "1,200+", label: "Shoots styled" },
  { value: "180+", label: "Studios & agencies" },
  { value: "2019", label: "Founded" },
];

export default function About() {
  return (
    <div className="pt-[72px]">
      {/* Brand story intro */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="eyebrow text-accent">Our story</span>
            <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
              A prop library with a<br /><span className="italic text-accent">stylist&rsquo;s eye.</span>
            </h1>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="text-base leading-relaxed text-muted-foreground">
              Studio Frangipani is a curated prop rental studio, created to make professional
              styling pieces accessible to creative teams. It began as a corner of
              a Mumbai studio — a growing collection of objects too beautiful to let
              sit idle between shoots — and grew into a library serving photographers,
              filmmakers and stylists who care about the details in every frame.
            </p>
          </div>
        </div>
      </section>

      {/* Full-bleed image */}
      <section className="px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img src={editorialImages.heroSecondary} alt="Studio Frangipani curated arrangement" className="editorial-img h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:px-12 lg:py-28">
        <span className="eyebrow text-accent">Our mission</span>
        <p className="mt-6 font-serif text-3xl leading-snug text-foreground sm:text-4xl">
          To give every creative team access to objects with genuine character —
          beautifully maintained, thoughtfully curated and ready for the frame,
          without the cost of owning them.
        </p>
      </section>

      {/* Who we serve */}
      <section className="bg-secondary/30 py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <SectionHeading eyebrow="Who we serve" title="Made for the people behind the image." />
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-border sm:grid-cols-3">
            {audience.map((a) => (
              <div key={a.label} className="flex flex-col items-start gap-4 bg-card p-8">
                <a.icon className="h-6 w-6 text-accent" strokeWidth={1.4} />
                <span className="font-serif text-xl text-foreground">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes the collection different */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading eyebrow="What makes us different" title="The principles behind the library." />
        <div className="mt-14 grid gap-px overflow-hidden border border-border sm:grid-cols-3">
          {differentiators.map((v) => (
            <div key={v.n} className="bg-card p-8 lg:p-10">
              <span className="font-serif text-5xl text-border">{v.n}</span>
              <h3 className="mt-6 font-serif text-2xl text-foreground">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-charcoal py-16 text-charcoal-foreground lg:py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl text-charcoal-foreground sm:text-5xl">{s.value}</div>
              <div className="eyebrow mt-2 text-charcoal-foreground/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA split */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="eyebrow text-accent">The studio</span>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">Where objects are chosen, restored and readied.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Our Mumbai studio is part archive, part workshop. Pieces are sourced
              from estate sales, artisans and travels, then restored and
              catalogued. When a shoot calls, they&rsquo;re styled and prepped by hand.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="editorial" size="lg"><Link href="/explore">Explore the collection <ArrowUpRight className="h-4 w-4" /></Link></Button>
              <Button asChild variant="line" size="lg"><Link href="/contact">Visit the studio</Link></Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden"><img src={editorialImages.studio} alt="Studio Frangipani workshop" className="editorial-img h-full w-full object-cover" /></div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
