import React from "react";
import { Link, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const MobileNav = ({ open, onClose, links }) => {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="left" className="w-[86%] max-w-sm border-r border-border bg-background p-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <Link to="/" onClick={onClose} className="font-serif text-xl tracking-[0.2em] text-foreground">
              FIRANGI
            </Link>
            <button aria-label="Close menu" onClick={onClose} className="text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-6 py-8">
            {links.map((l, i) =>
              l.hash ? (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={onClose}
                  className="border-b border-border/60 py-4 font-serif text-3xl text-foreground transition-colors hover:text-accent"
                >
                  <span className="mr-3 font-label text-xs text-muted-foreground">0{i + 1}</span>
                  {l.label}
                </Link>
              ) : (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `border-b border-border/60 py-4 font-serif text-3xl transition-colors ${
                      isActive ? "text-accent" : "text-foreground hover:text-accent"
                    }`
                  }
                >
                  <span className="mr-3 font-label text-xs text-muted-foreground">0{i + 1}</span>
                  {l.label}
                </NavLink>
              )
            )}
            <NavLink
              to="/wishlist"
              onClick={onClose}
              className="border-b border-border/60 py-4 font-serif text-3xl text-foreground hover:text-accent"
            >
              <span className="mr-3 font-label text-xs text-muted-foreground">0{links.length + 1}</span>
              Wishlist
            </NavLink>
          </nav>

          <div className="border-t border-border p-6">
            <Button asChild variant="editorial" size="lg" className="w-full">
              <Link to="/explore" onClick={onClose}>Explore Props</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
