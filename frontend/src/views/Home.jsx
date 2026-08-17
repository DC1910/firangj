"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryCard } from "@/components/common/CategoryCard";
import {
  editorialImages,
  categories,
  props as allProps,
  getFeaturedProps,
} from "@/data/firangi";

const catImg = (slug) => categories.find((c) => c.slug === slug)?.image;

// Featured homepage categories (display names mapped to new dataset slugs)
const featuredCategories = [
  { name: "Tableware & Serving",               slug: "tableware-serving",  description: "Bowls, cake stands, cups, plates & platters." },
  { name: "Glassware & Drinkware",             slug: "glassware",          description: "Bottles, drinking glasses, jars & perfume bottles." },
  { name: "Decorative Objects & Display",      slug: "decorative-objects", description: "Vases, frames, mirrors, prisms & vintage pieces." },
  { name: "Metal Objects",                     slug: "metal-objects",      description: "Brass, copper & silver props for any shoot." },
  { name: "Marble, Stone & Natural Materials", slug: "marble-stone",       description: "Marble props, stones & wooden boards." },
  { name: "Jewellery & Fashion Display",       slug: "jewellery-fashion",  description: "Jewellery display stands & boxes." },
  { name: "Themed / Special Props",            slug: "themed-props",       description: "Party, pooja, school, sea/ocean & more." },
  { name: "Product Shoot Essentials",          slug: "product-shoot",      description: "Backgrounds, textures, risers & acrylic blocks." },
].map((c) => ({ ...c, image: catImg(c.slug) }));

const steps = [
  { n: "01", title: "Discover", text: "Browse our curated collection of objects with genuine character." },
  { n: "02", title: "Select", text: "Choose the props that fit your concept and save them to a wishlist." },
  { n: "03", title: "Request", text: "Send a rental request with your preferred shoot dates." },
  { n: "04", title: "Create", text: "Props arrive prepped and camera-ready. Bring your vision to life." },
];

const showcase = [
  { src: editorialImages.heroSecondary, span: "row-span-2" },
  { src: allProps.find((p) => p.slug === "pearl-statement-necklace").images[0], span: "" },
  { src: allProps.find((p) => p.slug === "antique-gold-mirror").images[0], span: "" },
  { src: editorialImages.flatlayA, span: "" },
  { src: allProps.find((p) => p.slug === "white-hydrangea-arrangement").images[0], span: "row-span-2" },
  { src: editorialImages.studio, span: "" },
  { src: allProps.find((p) => p.slug === "marble-jewellery-tray").images[0], span: "" },
  { src: editorialImages.neutralProps, span: "" },
];

export default function Home() {
  const collection = [...getFeaturedProps(), ...allProps.filter((p) => !p.featured)].slice(0, 10);

  return (
    <div className="grain relative">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] items-center gap-0 px-5 pt-[112px] sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-12 lg:pt-[132px]">
          <div className="flex flex-col justify-center pb-14 lg:col-span-5 lg:pb-16">
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow text-accent"
            >
              The Studio Frangipani Prop Library
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="mt-6 font-serif text-5xl leading-[0.98] text-foreground sm:text-6xl lg:text-7xl"
            >
              Props for <span className="italic text-accent">Every</span> Creative Vision.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              Curated objects, accessories and styling pieces for photography,
              film, fashion and everything in between.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button asChild variant="editorial" size="lg">
                <Link href="/explore">Explore Collection <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="line" size="lg">
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </motion.div>
          </div>

          <div className="relative lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[440px] overflow-hidden sm:h-[560px] lg:h-[80vh] lg:min-h-[600px]"
            >
              <img src={editorialImages.heroPrimary} alt="Editorial styled prop arrangement" className="editorial-img h-full w-full object-cover" />
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-5 left-5 hidden bg-background/90 px-5 py-4 backdrop-blur-sm sm:block"
              >
                <span className="eyebrow text-muted-foreground">Featured styling</span>
                <p className="mt-1 font-serif text-lg text-foreground">The Ivory Editorial Set</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED CATEGORIES ===================== */}
      <section id="categories" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Browse by category" title={<>A library organised<br />for the frame.</>} />
          <Button asChild variant="line" className="mb-1"><Link href="/explore">View all props</Link></Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {featuredCategories.map((c) => (<CategoryCard key={c.slug} category={c} />))}
        </div>
      </section>

      {/* ===================== FEATURED COLLECTION ===================== */}
      <section className="bg-secondary/30 py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="The editors’ selection" title="Curated for Your Next Shoot" lede="A rotating edit of the pieces our stylists reach for most." />
            <Button asChild variant="line"><Link href="/explore">Shop all props</Link></Button>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
            {collection.map((p, i) => (<ProductCard key={p.id} prop={p} index={i} />))}
          </div>
        </div>
      </section>

      {/* ===================== EDITORIAL BANNER ===================== */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
          <img src={editorialImages.flatlayB} alt="Curated styling detail" className="editorial-img h-full w-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/55" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
              <Reveal className="max-w-2xl">
                <span className="eyebrow text-charcoal-foreground/70">Editorial</span>
                <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-charcoal-foreground sm:text-6xl">
                  Small details.<br /><span className="italic">Big visual stories.</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-foreground/80">
                  Find the pieces that transform a frame — the quiet objects that
                  give an image its atmosphere and its edge.
                </p>
                <Button asChild variant="ivory" size="lg" className="mt-9">
                  <Link href="/explore">Explore the Collection <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading eyebrow="How it works" title="From first browse to final frame." />
        <div className="mt-14 grid gap-px overflow-hidden border border-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="flex h-full flex-col bg-card p-8 lg:p-9">
                <span className="font-serif text-5xl text-border">{s.n}</span>
                <h3 className="mt-6 font-serif text-2xl text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CREATIVE SHOWCASE ===================== */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <span className="eyebrow text-gold">In the frame</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal-foreground sm:text-5xl">
              Props, styled for the shoot.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-foreground/65">
              A glimpse of the Studio Frangipani library at work across editorials, campaigns
              and lifestyle sets.
            </p>
          </div>
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
            {showcase.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.05 }}
                className={`group relative overflow-hidden ${img.span}`}
              >
                <img src={img.src} alt="Studio Frangipani styled prop" loading="lazy" className="editorial-img h-full w-full object-cover transition-transform [transition-duration:900ms] ease-editorial group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 text-center sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <span className="eyebrow text-accent">Ready when you are</span>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-foreground sm:text-6xl">
            Planning Your Next Shoot?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Find the pieces that make the frame.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="editorial" size="xl"><Link href="/explore">Explore Props <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="line" size="xl"><Link href="/contact">Talk to a stylist</Link></Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
