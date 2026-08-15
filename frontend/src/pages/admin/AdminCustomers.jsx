import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchInput } from "@/components/common/SearchInput";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { customers, formatINR } from "@/data/firangi";

const tierTone = { Production: "gold", Agency: "accent", Studio: "muted", Creator: "muted" };

export default function AdminCustomers() {
  const { openMenu } = useOutletContext();
  const [query, setQuery] = useState("");
  const rows = useMemo(() => customers.filter((c) => `${c.name} ${c.company} ${c.city}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <>
      <AdminTopbar title="Customers" subtitle={`${customers.length} accounts`} onMenu={openMenu} />
      <div className="space-y-6 p-5 lg:p-8">
        <SearchInput value={query} onChange={setQuery} placeholder="Search customers…" className="sm:max-w-xs" />
        <div className="border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="eyebrow">Customer</TableHead>
                  <TableHead className="eyebrow">City</TableHead>
                  <TableHead className="eyebrow">Tier</TableHead>
                  <TableHead className="eyebrow">Rentals</TableHead>
                  <TableHead className="eyebrow">Total spend</TableHead>
                  <TableHead className="eyebrow">Since</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((c) => (
                  <TableRow key={c.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-label text-[0.6rem] text-foreground">{c.name.split(" ").map((n) => n[0]).join("")}</div>
                        <div><div className="font-medium text-foreground">{c.name}</div><div className="text-xs text-muted-foreground">{c.company}</div></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.city}</TableCell>
                    <TableCell><StatusBadge tone={tierTone[c.tier]}>{c.tier}</StatusBadge></TableCell>
                    <TableCell className="text-muted-foreground">{c.rentals}</TableCell>
                    <TableCell className="font-medium text-foreground">{formatINR(c.totalSpend)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(c.joined).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
