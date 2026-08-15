import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/SearchInput";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { props as allProps, categories, categoryName, formatINR } from "@/data/firangi";

const availTone = { available: "accent", reserved: "gold", rented: "muted" };
const availLabel = { available: "Available", reserved: "Reserved", rented: "On Rent" };

export default function AdminProps() {
  const { openMenu } = useOutletContext();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");

  const rows = useMemo(() => allProps.filter((p) => {
    if (cat !== "all" && p.category !== cat) return false;
    if (query.trim() && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [query, cat]);

  return (
    <>
      <AdminTopbar title="Props" subtitle={`${allProps.length} pieces in the library`} onMenu={openMenu}
        action={<Button variant="editorial" size="sm" className="hidden sm:inline-flex"><Plus className="h-4 w-4" /> Add prop</Button>} />
      <div className="space-y-6 p-5 lg:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput value={query} onChange={setQuery} placeholder="Search props…" className="sm:max-w-xs" />
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="h-12 w-full rounded-sm sm:w-52"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (<SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>

        <div className="border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="eyebrow">Prop</TableHead>
                  <TableHead className="eyebrow">Category</TableHead>
                  <TableHead className="eyebrow">Price / day</TableHead>
                  <TableHead className="eyebrow">Rentals</TableHead>
                  <TableHead className="eyebrow">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((p) => (
                  <TableRow key={p.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="h-12 w-10 flex-shrink-0 object-cover" />
                        <div className="min-w-0"><div className="truncate font-medium text-foreground">{p.name}</div><div className="text-xs text-muted-foreground">{p.id}</div></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{categoryName(p.category)}</TableCell>
                    <TableCell className="text-foreground">{formatINR(p.pricePerDay)}</TableCell>
                    <TableCell className="text-muted-foreground">{p.rentalCount}</TableCell>
                    <TableCell><StatusBadge tone={availTone[p.availability]}>{availLabel[p.availability]}</StatusBadge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {!rows.length && <div className="p-12 text-center text-sm text-muted-foreground">No props match your search.</div>}
        </div>
      </div>
    </>
  );
}
