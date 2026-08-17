"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { editorialImages, allShootTypes } from "@/data/firangi";

const details = [
  { icon: Mail, label: "Email", value: "studio@studiofrangipani.rentals" },
  { icon: Phone, label: "Phone", value: "+91 98200 40040" },
  { icon: MapPin, label: "Location", value: "14 Atelier Lane, Bandra West, Mumbai 400050" },
  { icon: Clock, label: "Business hours", value: "Mon–Sat, 10am – 7pm IST" },
];

const empty = { name: "", email: "", phone: "", company: "", shootType: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [submitted, setSubmitted] = useState(false);
  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast("Please complete the required fields", { description: "Name, email and a message are required." });
      return;
    }
    setSubmitted(true);
    setForm(empty);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="pt-[72px]">
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <span className="eyebrow text-accent">Say hello</span>
          <h1 className="mt-4 font-serif text-5xl leading-[1] text-foreground sm:text-6xl">Contact the studio</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Planning a shoot, need a custom set, or want to visit the library in
            person? We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Form / success */}
          <div className="order-2 lg:order-1">
            {submitted ? (
              <div className="flex flex-col items-start border border-border bg-card p-8 lg:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-6 w-6" />
                </div>
                <span className="eyebrow mt-7 text-accent">Enquiry sent</span>
                <h2 className="mt-3 font-serif text-4xl text-foreground">Thank you for reaching out.</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  We&rsquo;ve received your enquiry and a member of the Studio Frangipani team will
                  be in touch within one business day.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="editorial" onClick={() => setSubmitted(false)}>Send another enquiry</Button>
                  <Button asChild variant="line"><Link href="/explore">Explore Props</Link></Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Name *</Label><Input value={form.name} onChange={(e) => setField("name", e.target.value)} className="h-11 rounded-sm" placeholder="Your name" /></div>
                  <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Email *</Label><Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className="h-11 rounded-sm" placeholder="you@studio.com" /></div>
                  <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Phone</Label><Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} className="h-11 rounded-sm" placeholder="+91 98200 00000" /></div>
                  <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Company / Production House</Label><Input value={form.company} onChange={(e) => setField("company", e.target.value)} className="h-11 rounded-sm" placeholder="Studio Noir" /></div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Label className="eyebrow text-foreground">Shoot type</Label>
                  <Select value={form.shootType} onValueChange={(v) => setField("shootType", v)}>
                    <SelectTrigger className="h-11 rounded-sm"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>{allShootTypes.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <div className="mt-6 flex flex-col gap-2"><Label className="eyebrow text-foreground">Message *</Label><Textarea value={form.message} onChange={(e) => setField("message", e.target.value)} rows={6} className="rounded-sm resize-none" placeholder="Tell us about your project..." /></div>
                <Button type="submit" variant="editorial" size="lg" className="mt-8">Send Enquiry <ArrowRight className="h-4 w-4" /></Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={editorialImages.neutralProps} alt="Studio Frangipani studio" className="editorial-img h-full w-full object-cover" />
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="border-t border-border pt-5">
                  <div className="flex items-center gap-2 text-accent"><d.icon className="h-4 w-4" strokeWidth={1.6} /><span className="eyebrow text-muted-foreground">{d.label}</span></div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
