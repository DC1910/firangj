"use client";

import React, { useMemo, useState } from "react";
import { useOutletContext } from "@/context/AdminMenuContext";
import { toast } from "sonner";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchInput } from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { statusMeta, categoryName, props as seedProps, formatINR } from "@/data/firangi";
import { useAdminData } from "@/context/AdminDataContext";

const nameToCategory = {};
seedProps.forEach((p) => { nameToCategory[p.name] = p.category; });

const statuses = ["all", "pending", "confirmed", "active", "returned", "cancelled"];

export default function AdminRentalRequests() {
  const { openMenu } = useOutletContext();
  const { requests, updateRequestStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [cat, setCat] = useState("all");
  const [month, setMonth] = useState("all");
  const [active, setActive] = useState(null);

  const months = useMemo(() => Array.from(new Set(requests.map((r) => r.startDate.slice(0, 7)))).sort(), [requests]);

  const rows = useMemo(() => requests.filter((r) => {
    if (status !== "all" && r.status !== status) return false;
    if (month !== "all" && !r.startDate.startsWith(month)) return false;
    if (cat !== "all" && !r.propNames.some((n) => nameToCategory[n] === cat)) return false;
    if (query.trim() && !`${r.id} ${r.customer} ${r.company}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [requests, status, month, cat, query]);

  const cats = useMemo(() => Array.from(new Set(Object.values(nameToCategory))), []);

  const act = (id, newStatus, label) => { updateRequestStatus(id, newStatus); setActive((a) => (a && a.id === id ? { ...a, status: newStatus } : a)); toast(label); };

  return (
    <>
      <AdminTopbar title="Rental Requests" subtitle={`${requests.length} total requests`} onMenu={openMenu} />
      <div className="space-y-6 p-5 lg:p-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SearchInput value={query} onChange={setQuery} placeholder="Search requests…" />
          <Select value={status} onValueChange={setStatus}><SelectTrigger className="h-12 rounded-sm capitalize"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent>{statuses.map((s) => (<SelectItem key={s} value={s} className="capitalize">{s === "all" ? "All statuses" : s}</SelectItem>))}</SelectContent></Select>
          <Select value={cat} onValueChange={setCat}><SelectTrigger className="h-12 rounded-sm"><SelectValue placeholder="Category" /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{cats.map((c) => (<SelectItem key={c} value={c}>{categoryName(c)}</SelectItem>))}</SelectContent></Select>
          <Select value={month} onValueChange={setMonth}><SelectTrigger className="h-12 rounded-sm"><SelectValue placeholder="Date" /></SelectTrigger><SelectContent><SelectItem value="all">All dates</SelectItem>{months.map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}</SelectContent></Select>
        </div>

        <div className="border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="eyebrow">Request ID</TableHead><TableHead className="eyebrow">Customer</TableHead>
                  <TableHead className="eyebrow">Props</TableHead><TableHead className="eyebrow">Start</TableHead>
                  <TableHead className="eyebrow">End</TableHead><TableHead className="eyebrow">Total</TableHead>
                  <TableHead className="eyebrow">Status</TableHead><TableHead className="eyebrow text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const m = statusMeta[r.status];
                  return (
                    <TableRow key={r.id} className="cursor-pointer border-border" onClick={() => setActive(r)}>
                      <TableCell className="font-medium text-foreground">{r.id}</TableCell>
                      <TableCell><div className="text-foreground">{r.customer}</div><div className="text-xs text-muted-foreground">{r.company}</div></TableCell>
                      <TableCell className="text-muted-foreground">{r.items}</TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{r.startDate}</TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{r.endDate}</TableCell>
                      <TableCell className="text-foreground">{formatINR(r.total)}</TableCell>
                      <TableCell><StatusBadge tone={m.tone}>{m.label}</StatusBadge></TableCell>
                      <TableCell className="text-right"><Button variant="line" size="sm" onClick={(e) => { e.stopPropagation(); setActive(r); }}>View</Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {!rows.length && <div className="p-12 text-center text-sm text-muted-foreground">No requests match your filters.</div>}
        </div>
      </div>

      {/* Detail drawer */}
      <Sheet open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          {active && (
            <div>
              <SheetHeader className="text-left">
                <div className="flex items-center justify-between"><SheetTitle className="font-serif text-2xl">{active.id}</SheetTitle><StatusBadge tone={statusMeta[active.status].tone}>{statusMeta[active.status].label}</StatusBadge></div>
              </SheetHeader>

              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <h4 className="eyebrow mb-3 text-muted-foreground">Customer</h4>
                  <p className="font-medium text-foreground">{active.customer}</p>
                  <p className="text-muted-foreground">{active.company}</p>
                  <p className="text-muted-foreground">{active.email}</p>
                  <p className="text-muted-foreground">{active.phone}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="eyebrow mb-3 text-muted-foreground">Requested props</h4>
                  <ul className="space-y-1.5">{active.propNames.map((n) => (<li key={n} className="text-foreground">{n}</li>))}</ul>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div><h4 className="eyebrow mb-1.5 text-muted-foreground">Rental dates</h4><p className="text-foreground">{active.startDate} → {active.endDate}</p></div>
                  <div><h4 className="eyebrow mb-1.5 text-muted-foreground">Shoot type</h4><p className="text-foreground">{active.shootType}</p></div>
                  <div><h4 className="eyebrow mb-1.5 text-muted-foreground">Delivery / Pickup</h4><p className="text-foreground">{active.delivery}</p></div>
                  <div><h4 className="eyebrow mb-1.5 text-muted-foreground">Location</h4><p className="text-foreground">{active.location}</p></div>
                </div>
                <Separator />
                <div><h4 className="eyebrow mb-1.5 text-muted-foreground">Additional notes</h4><p className="leading-relaxed text-muted-foreground">{active.notes}</p></div>
                <div className="flex items-baseline justify-between border-t border-border pt-4"><span className="eyebrow text-muted-foreground">Estimated amount</span><span className="font-serif text-2xl text-foreground">{formatINR(active.total)}</span></div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <Button variant="editorial" onClick={() => act(active.id, "confirmed", "Request confirmed")}>Confirm Request</Button>
                <Button variant="accent" onClick={() => act(active.id, "active", "Marked active")}>Mark Active</Button>
                <Button variant="line" onClick={() => act(active.id, "returned", "Marked returned")}>Mark Returned</Button>
                <Button variant="outline" onClick={() => act(active.id, "cancelled", "Request cancelled")} className="border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground">Cancel Request</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
