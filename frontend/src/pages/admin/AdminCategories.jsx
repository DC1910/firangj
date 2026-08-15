import React from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Button } from "@/components/ui/button";
import { categories, getPropsByCategory } from "@/data/firangi";

export default function AdminCategories() {
  const { openMenu } = useOutletContext();
  return (
    <>
      <AdminTopbar title="Categories" subtitle={`${categories.length} collections`} onMenu={openMenu}
        action={<Button variant="editorial" size="sm" className="hidden sm:inline-flex"><Plus className="h-4 w-4" /> Add category</Button>} />
      <div className="p-5 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c) => {
            const count = getPropsByCategory(c.slug).length;
            return (
              <div key={c.slug} className="group flex flex-col overflow-hidden border border-border bg-card">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={c.image} alt={c.name} className="editorial-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-background/90 px-2.5 py-1 font-label text-[0.6rem] tracking-[0.12em] text-foreground backdrop-blur-sm"><Package className="h-3 w-3" /> {count}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl text-foreground">{c.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  <div className="mt-auto flex gap-2 pt-5">
                    <Button variant="line" size="sm" className="flex-1">Edit</Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground">View</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
