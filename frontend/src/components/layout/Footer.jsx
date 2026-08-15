import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/firangi";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "All Props", to: "/explore" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Request Props", to: "/rental-request" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About Firangi", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Admin", to: "/admin" },
    ],
  },
];

export const Footer = () => {
  const [email, setEmail] = useState("");

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast("Thank you for subscribing", { description: "Look out for the next Firangi edit." });
    setEmail("");
  };

  return (
    <footer className="relative bg-charcoal text-charcoal-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Top: newsletter */}
        <div className="grid gap-10 border-b border-charcoal-foreground/15 pb-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Props with a point of view.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal-foreground/70">
              Join our list for new arrivals, styling notes and behind-the-scenes
              from the Firangi library.
            </p>
          </div>
          <div className="flex items-end">
            <form onSubmit={onSubscribe} className="w-full max-w-md">
              <label className="eyebrow text-charcoal-foreground/60">Newsletter</label>
              <div className="mt-3 flex items-center gap-3 border-b border-charcoal-foreground/30 pb-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@studio.com"
                  className="w-full bg-transparent text-base text-charcoal-foreground placeholder:text-charcoal-foreground/40 focus:outline-none"
                />
                <button type="submit" aria-label="Subscribe" className="flex-shrink-0 text-charcoal-foreground transition-transform hover:translate-x-1">
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="font-serif text-2xl tracking-[0.22em]">FIRANGI</Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-foreground/60">
              A curated prop rental studio for photographers, filmmakers and
              stylists. Objects with character, styled for the frame.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-charcoal-foreground/60">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-charcoal-foreground/80 transition-colors hover:text-charcoal-foreground link-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="eyebrow text-charcoal-foreground/60">Categories</h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link to={`/explore?category=${c.slug}`} className="text-sm text-charcoal-foreground/80 transition-colors hover:text-charcoal-foreground">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-charcoal-foreground/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-charcoal-foreground/50">
            © {new Date().getFullYear()} Firangi Studio. A prototype for demonstration.
          </p>
          <div className="flex items-center gap-6">
            {["Instagram", "Pinterest", "Behance"].map((s) => (
              <a key={s} href="#" onClick={(e) => e.preventDefault()} className="font-label text-[0.68rem] tracking-[0.16em] text-charcoal-foreground/60 transition-colors hover:text-charcoal-foreground">
                {s.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
