"use client";

import React from "react";
import Link from "next/link";
import { Search, MousePointerClick, CalendarCheck, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { editorialImages } from "@/data/firangi";

const steps = [
  { icon: Search, n: "01", title: "Browse", text: "Explore the curated collection by category, style or shoot type. Search for exactly what your concept needs." },
  { icon: MousePointerClick, n: "02", title: "Choose", text: "Save the pieces that fit your story to a wishlist and refine the edit until the set feels right." },
  { icon: CalendarCheck, n: "03", title: "Request", text: "Pick your rental dates and send a request. We confirm availability and share a tailored quote within 24 hours." },
  { icon: Camera, n: "04", title: "Shoot", text: "Props arrive prepped and camera-ready — delivered to your studio or ready for pickup. Return when you wrap." },
];

const faqs = [
  { q: "What is the minimum rental period?", a: "Rentals start at a single day. Extended rentals are billed per day, with weekly rates available for longer productions." },
  { q: "Do you deliver props to set?", a: "Yes. We offer studio and on-set delivery across the city with 48-hour notice. Complimentary self-pickup from our studio is also available." },
  { q: "Is a deposit required?", a: "A refundable security deposit applies per piece, returned in full once props are returned in their original condition." },
  { q: "Can you source a specific prop?", a: "Absolutely. Our stylists offer a bespoke sourcing service for pieces not currently in the library. Reach out via the contact page." },
  { q: "How far in advance should I book?", a: "We recommend requesting at least a week ahead for larger sets, though we often accommodate last-minute shoots — just ask." },
];

export default function HowItWorks() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <span className="eyebrow text-accent">The process</span>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            From first browse to final frame.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Renting from Studio Frangipani is designed to be effortless — so you can spend
            your energy on the shoot, not the logistics.
          </p>
        </div>
      </section>

      {/* Steps + artistic image */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={editorialImages.studio} alt="Studio Frangipani styling studio" className="editorial-img h-full w-full object-cover" />
            </div>
          </div>
          <div className="space-y-px overflow-hidden border border-border">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="flex items-start gap-6 bg-card p-8 lg:p-10">
                  <span className="font-serif text-5xl leading-none text-border">{s.n}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <s.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                      <h3 className="font-serif text-2xl text-foreground">{s.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image break */}
      <section className="px-5 sm:px-8 lg:px-12">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={editorialImages.flatlayB} alt="Curated styling" className="editorial-img h-full w-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="max-w-2xl font-serif text-4xl leading-tight text-charcoal-foreground sm:text-5xl">Every detail, handled with care.</h2>
            <Button asChild variant="ivory" size="lg" className="mt-8"><Link href="/explore">Explore Props</Link></Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading eyebrow="Questions" title="Good to know" align="center" className="mb-12" />
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-serif text-xl text-foreground hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-14 text-center">
          <p className="text-sm text-muted-foreground">Still have a question?</p>
          <Button asChild variant="editorial" size="lg" className="mt-4"><Link href="/contact">Talk to our team <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>
    </div>
  );
}
