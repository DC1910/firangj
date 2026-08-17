import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, Search, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useRequest } from "@/context/RequestContext";
import { MobileNav } from "./MobileNav";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/explore", label: "Explore" },
  { to: "/#categories", label: "Categories", hash: true },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const { count } = useWishlist();
  const { count: requestCount } = useRequest();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  const linkClass = "font-label text-[0.7rem] tracking-[0.15em] text-foreground/75 transition-colors hover:text-foreground link-underline";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          transparent
            ? "bg-transparent border-b border-transparent"
            : "bg-background/90 backdrop-blur-md border-b border-border shadow-[0_1px_0_0_hsl(var(--border))]"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          {/* Left: brand + mobile menu */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="font-serif text-xl tracking-[0.18em] text-foreground sm:text-2xl">
              STUDIO FRANGIPANI
            </Link>
          </div>

          {/* Center: nav links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) =>
              l.hash ? (
                <Link key={l.label} to={l.to} className={linkClass}>
                  {l.label.toUpperCase()}
                </Link>
              ) : (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => cn(linkClass, isActive && "text-accent")}
                >
                  {l.label.toUpperCase()}
                </NavLink>
              )
            )}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/explore" aria-label="Search" className="hidden text-foreground transition-colors hover:text-accent sm:inline-flex">
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative text-foreground transition-colors hover:text-accent">
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[0.6rem] font-medium text-charcoal-foreground">
                  {count}
                </span>
              )}
            </Link>
            <Link to="/rental-request" aria-label="Rental request" className="relative text-foreground transition-colors hover:text-accent">
              <ClipboardList className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {requestCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-medium text-accent-foreground">
                  {requestCount}
                </span>
              )}
            </Link>
            <Button asChild variant="editorial" size="sm" className="hidden md:inline-flex">
              <Link to="/explore">Explore Props</Link>
            </Button>
          </div>
        </div>
      </header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={links} />
    </>
  );
};
