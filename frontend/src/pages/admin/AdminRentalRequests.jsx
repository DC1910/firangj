import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { rentalRequests, statusMeta, formatINR } from "@/data/firangi";

const filters = ["all", "pending", "confirmed", "active", "completed", "cancelled"];

export default function AdminRentalRequests() {
  const { openMenu } = useOutletContext();
  const [tab, setTab] = useState("all");
  const rows = useMemo(() => tab === "all" ? rentalRequests : rentalRequests.filter((r) => r.status === tab), [tab]);

  return (
    <>
      <AdminTopbar title="Rental Requests" subtitle={`${rentalRequests.length} total requests`} onMenu={openMenu} />
      <div className="space-y-6 p-5 lg:p-8">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-auto flex-wrap justify-start gap-1 bg-secondary/60 p-1">
            {filters.map((f) => (
              <TabsTrigger key={f} value={f} className="font-label text-[0.66rem] tracking-[0.12em] capitalize data-[state=active]:bg-background">{f}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="eyebrow">Request</TableHead>
                  <TableHead className="eyebrow">Customer</TableHead>
                  <TableHead className="eyebrow">Shoot</TableHead>
                  <TableHead className="eyebrow">Dates</TableHead>
                  <TableHead className="eyebrow">Items</TableHead>
                  <TableHead className="eyebrow">Total</TableHead>
                  <TableHead className="eyebrow">Status</TableHead>
                  <TableHead className="eyebrow text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const m = statusMeta[r.status];
                  return (
                    <TableRow key={r.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{r.id}</TableCell>
                      <TableCell><div className="text-foreground">{r.customer}</div><div className="text-xs text-muted-foreground">{r.company}</div></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.shootType}</TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{r.startDate} → {r.endDate}</TableCell>
                      <TableCell className="text-muted-foreground">{r.items}</TableCell>
                      <TableCell className="text-foreground">{formatINR(r.total)}</TableCell>
                      <TableCell><StatusBadge tone={m.tone}>{m.label}</StatusBadge></TableCell>
                      <TableCell className="text-right"><Button variant="line" size="sm">Review</Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {!rows.length && <div className="p-12 text-center text-sm text-muted-foreground">No requests in this state.</div>}
        </div>
      </div>
    </>
  );
}
