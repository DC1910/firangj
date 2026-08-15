import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Check, X, ArrowRight, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState } from "@/components/common/EmptyState";
import { getPropById, allShootTypes, formatINR } from "@/data/firangi";
import { useRequest } from "@/context/RequestContext";
import { cn } from "@/lib/utils";

const Field = ({ label, children, required }) => (
  <div className="flex flex-col gap-2">
    <Label className="eyebrow text-foreground">{label}{required && <span className="text-burgundy"> *</span>}</Label>
    {children}
  </div>
);

const DatePick = ({ value, onChange, minDate, placeholder = "Pick date" }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button type="button" variant="outline" className={cn("h-11 justify-start rounded-sm font-normal", !value && "text-muted-foreground")}>
        <CalendarIcon className="h-4 w-4" />{value ? format(value, "dd MMM yyyy") : placeholder}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar mode="single" selected={value} onSelect={onChange} disabled={(d) => d < (minDate || new Date().setHours(0, 0, 0, 0))} initialFocus />
    </PopoverContent>
  </Popover>
);

export default function RentalRequest() {
  const { items, range, remove, clear, setRange } = useRequest();
  const props = items.map(getPropById).filter(Boolean);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", shootType: "", delivery: "Delivery", location: "", notes: "",
  });
  const [start, setStart] = useState(range.start ? new Date(range.start) : undefined);
  const [end, setEnd] = useState(range.end ? new Date(range.end) : undefined);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const days = useMemo(() => (start && end ? Math.max(1, Math.round((end - start) / 86400000) + 1) : 1), [start, end]);
  const dailySum = props.reduce((s, p) => s + p.pricePerDay, 0);
  const subtotal = dailySum * days;

  const onStart = (d) => { setStart(d); setRange(d, end); };
  const onEnd = (d) => { setEnd(d); setRange(start, d); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !props.length || !start || !end) {
      toast("Please complete the required fields", {
        description: "Name, email, rental dates and at least one prop are required.",
      });
      return;
    }
    const ref = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const payload = {
      reference: ref, ...form, start: start.toISOString(), end: end.toISOString(),
      days, subtotal, props: props.map((p) => p.name), createdAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem("firangi_requests");
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(payload);
      localStorage.setItem("firangi_requests", JSON.stringify(arr));
    } catch (err) { /* ignore */ }
    setReference(ref);
    setSubmitted(true);
    clear();
    window.scrollTo({ top: 0 });
  };

  // ---- SUCCESS STATE ----
  if (submitted) {
    return (
      <div className="pt-[72px]">
        <div className="mx-auto flex min-h-[72vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Check className="h-7 w-7" />
          </div>
          <span className="eyebrow mt-8 text-accent">Confirmation</span>
          <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">Request Received</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Thank you. Our team will review your request and get in touch shortly.
          </p>
          <div className="mt-8 w-full border border-border bg-card p-6 text-left">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="eyebrow text-muted-foreground">Reference</span>
              <span className="font-label text-sm tracking-[0.12em] text-foreground">{reference}</span>
            </div>
            <div className="flex justify-between py-3"><span className="eyebrow text-muted-foreground">Duration</span><span className="text-sm text-foreground">{days} {days === 1 ? "day" : "days"}</span></div>
            <div className="flex items-baseline justify-between border-t border-border pt-3"><span className="eyebrow text-muted-foreground">Est. total</span><span className="font-serif text-xl text-foreground">{formatINR(subtotal)}</span></div>
          </div>
          <div className="mt-8 flex gap-3">
            <Button asChild variant="editorial"><Link to="/explore">Return to Explore</Link></Button>
            <Button asChild variant="line"><Link to="/">Back home</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  // ---- EMPTY STATE ----
  if (!props.length) {
    return (
      <div className="pt-[72px]">
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
            <span className="eyebrow text-accent">Reserve your props</span>
            <h1 className="mt-4 font-serif text-5xl leading-[1] text-foreground sm:text-6xl">Rental request</h1>
          </div>
        </section>
        <EmptyState
          icon={ClipboardList}
          title="Your request is empty"
          description="Add props from the library to build a rental request. Pick your dates on each product and add them here."
          action={<Button asChild variant="editorial"><Link to="/explore">Browse the library</Link></Button>}
          className="min-h-[45vh]"
        />
      </div>
    );
  }

  // ---- FORM ----
  return (
    <div className="pt-[72px]">
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <span className="eyebrow text-accent">Reserve your props</span>
          <h1 className="mt-4 font-serif text-5xl leading-[1] text-foreground sm:text-6xl">Rental request</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Share your shoot details and selected props. We&rsquo;ll confirm availability
            and send a tailored quote &mdash; no payment required to enquire.
          </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Form */}
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-2xl text-foreground">Your details</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="Name" required><Input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Aarav Mehta" className="h-11 rounded-sm" /></Field>
              <Field label="Email" required><Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@studio.com" className="h-11 rounded-sm" /></Field>
              <Field label="Phone"><Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="+91 98200 00000" className="h-11 rounded-sm" /></Field>
              <Field label="Company / Production House"><Input value={form.company} onChange={(e) => setField("company", e.target.value)} placeholder="Studio Noir" className="h-11 rounded-sm" /></Field>
            </div>

            <h2 className="mt-10 font-serif text-2xl text-foreground">Shoot details</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="Shoot type">
                <Select value={form.shootType} onValueChange={(v) => setField("shootType", v)}>
                  <SelectTrigger className="h-11 rounded-sm"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{allShootTypes.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                </Select>
              </Field>
              <Field label="Delivery / Pickup">
                <Select value={form.delivery} onValueChange={(v) => setField("delivery", v)}>
                  <SelectTrigger className="h-11 rounded-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delivery">Studio delivery</SelectItem>
                    <SelectItem value="Pickup">Self pickup</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Start date" required><DatePick value={start} onChange={onStart} /></Field>
              <Field label="End date" required><DatePick value={end} onChange={onEnd} minDate={start} /></Field>
              <div className="sm:col-span-2">
                <Field label={form.delivery === "Delivery" ? "Delivery location" : "Pickup notes (optional)"}>
                  <Input value={form.location} onChange={(e) => setField("location", e.target.value)} placeholder={form.delivery === "Delivery" ? "Studio address, city" : "Preferred pickup time"} className="h-11 rounded-sm" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Additional notes">
                  <Textarea value={form.notes} onChange={(e) => setField("notes", e.target.value)} rows={4} placeholder="Tell us about the concept, palette or any specific styling needs..." className="rounded-sm resize-none" />
                </Field>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="order-1 lg:order-2">
            <div className="sticky top-[96px] border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-foreground">Your request</h3>
                <span className="font-label text-[0.62rem] tracking-[0.12em] text-muted-foreground">{props.length} {props.length === 1 ? "PROP" : "PROPS"}</span>
              </div>

              <ul className="mt-5 space-y-4">
                {props.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="h-16 w-13 flex-shrink-0 object-cover" style={{ width: "3.25rem" }} />
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${p.id}`} className="block truncate text-sm text-foreground hover:text-accent">{p.name}</Link>
                      <p className="text-xs text-muted-foreground">{formatINR(p.pricePerDay)} / day</p>
                    </div>
                    <button type="button" aria-label="Remove" onClick={() => remove(p.id)} className="text-muted-foreground transition-colors hover:text-burgundy"><X className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2 border-t border-border pt-5">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Daily total</span><span className="text-foreground">{formatINR(dailySum)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Rental days</span><span className="text-foreground">{start && end ? days : "\u2014"}</span></div>
                <div className="flex items-baseline justify-between pt-1"><span className="eyebrow text-muted-foreground">Est. subtotal</span><span className="font-serif text-2xl text-foreground">{formatINR(subtotal)}</span></div>
                <p className="pt-1 text-xs text-muted-foreground">Indicative only. Final quote confirmed by our team.</p>
              </div>

              <Button type="submit" variant="editorial" size="lg" className="mt-6 w-full">
                Submit Rental Request <ArrowRight className="h-4 w-4" />
              </Button>
              <button type="button" onClick={() => { clear(); toast("Request cleared"); }} className="mt-4 w-full text-center font-label text-[0.64rem] tracking-[0.14em] text-muted-foreground hover:text-burgundy">
                CLEAR REQUEST
              </button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
