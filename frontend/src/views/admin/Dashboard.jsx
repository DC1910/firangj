"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useOutletContext } from "@/context/AdminMenuContext";
import { Package, PackageCheck, Activity, Clock, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analytics, statusMeta, categoryName, formatINR } from "@/data/firangi";
import { useAdminData } from "@/context/AdminDataContext";

const summary = [
  { label: "Total Props", value: "342", delta: "+18", trend: "up", sub: "in catalogue", icon: Package },
  { label: "Available Props", value: "286", delta: "+6", trend: "up", sub: "ready to rent", icon: PackageCheck },
  { label: "Active Rentals", value: "38", delta: "+4", trend: "up", sub: "out this week", icon: Activity },
  { label: "Pending Requests", value: "12", delta: "+3", trend: "up", sub: "awaiting review", icon: Clock },
];

const rentalsByMonth = analytics.revenueByMonth.map((m) => ({ month: m.month, rentals: Math.round(m.revenue / 6800) }));
const tip = { border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", borderRadius: 2, fontSize: 12 };

export default function Dashboard() {
  const { openMenu } = useOutletContext();
  const { props, requests } = useAdminData();

  const popular = useMemo(() => [...props].sort((a, b) => b.rentalCount - a.rentalCount).slice(0, 5)
    .map((p) => ({ ...p, revenue: p.rentalCount * p.pricePerDay })), [props]);

  return (
    <>
      <AdminTopbar title="Good morning, Admin" subtitle="Here’s what’s happening with your prop collection." onMenu={openMenu} />
      <div className="space-y-8 p-5 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map((s) => (<StatCard key={s.label} {...s} />))}
        </div>

        {/* Analytics preview */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <div><h3 className="font-serif text-2xl text-foreground">Revenue over time</h3><p className="text-xs text-muted-foreground">Last 6 months</p></div>
              <StatusBadge tone="accent">+12.4%</StatusBadge>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.revenueByMonth} margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
                  <defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.28} /><stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tickLine={false} axisLine={false} width={40} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip contentStyle={tip} formatter={(v) => [formatINR(v), "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#rev)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <div className="mb-6"><h3 className="font-serif text-2xl text-foreground">Rentals over time</h3><p className="text-xs text-muted-foreground">Monthly bookings</p></div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rentalsByMonth} margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tickLine={false} axisLine={false} width={30} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={tip} cursor={{ fill: "hsl(var(--secondary))" }} formatter={(v) => [`${v} rentals`, ""]} />
                  <Bar dataKey="rentals" fill="hsl(var(--gold))" radius={[2, 2, 0, 0]} barSize={24} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Popular categories + props */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <h3 className="font-serif text-2xl text-foreground">Most popular categories</h3>
            <ul className="mt-6 space-y-4">
              {[...analytics.categoryDemand].sort((a, b) => b.value - a.value).map((c) => (
                <li key={c.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm"><span className="text-foreground">{c.name}</span><span className="text-muted-foreground">{c.value}%</span></div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-accent" style={{ width: `${c.value * 3.5}%` }} /></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between"><h3 className="font-serif text-2xl text-foreground">Most rented props</h3><Link href="/admin/analytics" className="font-label text-[0.66rem] tracking-[0.14em] text-accent hover:underline">DETAILS</Link></div>
            <ul className="divide-y divide-border">
              {popular.map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <img src={p.images[0]} alt={p.name} className="h-12 w-10 flex-shrink-0 object-cover" />
                  <div className="min-w-0 flex-1"><p className="truncate text-sm text-foreground">{p.name}</p><p className="text-xs text-muted-foreground">{categoryName(p.category)}</p></div>
                  <div className="text-right"><p className="text-sm text-foreground">{p.rentalCount} rentals</p><p className="text-xs text-muted-foreground">{formatINR(p.revenue)}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent rentals */}
        <div className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-6">
            <h3 className="font-serif text-2xl text-foreground">Recent rental activity</h3>
            <Link href="/admin/rental-requests" className="inline-flex items-center gap-1 font-label text-[0.68rem] tracking-[0.14em] text-accent hover:underline">VIEW ALL <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="eyebrow">Request ID</TableHead><TableHead className="eyebrow">Customer</TableHead>
                  <TableHead className="eyebrow">Prop</TableHead><TableHead className="eyebrow">Rental Dates</TableHead>
                  <TableHead className="eyebrow">Amount</TableHead><TableHead className="eyebrow">Status</TableHead>
                  <TableHead className="eyebrow text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.slice(0, 6).map((r) => {
                  const m = statusMeta[r.status];
                  return (
                    <TableRow key={r.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{r.id}</TableCell>
                      <TableCell><div className="text-foreground">{r.customer}</div><div className="text-xs text-muted-foreground">{r.company}</div></TableCell>
                      <TableCell className="max-w-[180px] truncate text-sm text-muted-foreground">{r.propNames[0]}</TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{r.startDate} → {r.endDate}</TableCell>
                      <TableCell className="text-foreground">{formatINR(r.total)}</TableCell>
                      <TableCell><StatusBadge tone={m.tone}>{m.label}</StatusBadge></TableCell>
                      <TableCell className="text-right"><Button asChild variant="line" size="sm"><Link href="/admin/rental-requests">Review</Link></Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
