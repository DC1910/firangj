import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { useRequest } from "@/context/RequestContext";
import { getPropById, editorialImages } from "@/data/firangi";

export default function Wishlist() {
  const { ids, clear } = useWishlist();
  const { addMany } = useRequest();
  const navigate = useNavigate();
  const items = ids.map(getPropById).filter(Boolean);

  const requestAll = () => {
    addMany(ids);
    toast("Added to your request", { description: `${ids.length} ${ids.length === 1 ? "prop" : "props"} ready to reserve.` });
    navigate("/rental-request");
  };

  return (
    <div className="pt-[72px]">
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <span className="eyebrow text-accent">Your selection</span>
          <h1 className="mt-4 font-serif text-5xl leading-[1] text-foreground sm:text-6xl">Wishlist</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            The pieces you&rsquo;ve saved for an upcoming shoot. Send them across as a
            rental request when you&rsquo;re ready.
          </p>
        </div>
      </section>

      {items.length ? (
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{items.length} {items.length === 1 ? "piece" : "pieces"} saved</p>
            <div className="flex gap-3">
              <Button variant="line" onClick={() => { clear(); toast("Wishlist cleared"); }}>Clear all</Button>
              <Button variant="editorial" onClick={requestAll}>Request all <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p, i) => (<ProductCard key={p.id} prop={p} index={i} />))}
          </div>
          <p className="mt-10 text-xs text-muted-foreground">Tap the heart on any card to remove it from your wishlist.</p>
        </div>
      ) : (
        // Editorial empty state
        <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-24">
          <div className="order-2 lg:order-1">
            <span className="eyebrow text-accent">A blank canvas</span>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Your wishlist is<br /><span className="italic text-accent">waiting to be styled.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Save the objects that speak to your concept and gather them here.
              When your edit feels right, send it across as a rental request.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="editorial" size="lg"><Link to="/explore">Browse the library <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild variant="line" size="lg"><Link to="/how-it-works">How it works</Link></Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={editorialImages.flatlayA} alt="Curated styling still life" className="editorial-img h-full w-full object-cover" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
