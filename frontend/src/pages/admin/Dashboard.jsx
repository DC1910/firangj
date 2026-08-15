import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { IndianRupee, Package, Activity, Grid3x3, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analytics, rentalRequests, statusMeta, formatINR } from "@/data/firangi";

const icons = [IndianRupee, Activity, Package, Grid3x3];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-border bg-card px-3 py-2 shadow-soft">
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p className="mt-1 font-serif text-lg text-foreground">{formatINR(payload[0].value)}</p>
    </div>
  );
};

export default function Dashboard() {
  const { openMenu } = useOutletContext();
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <>
      <AdminTopbar title="Dashboard" subtitle={today} onMenu={openMenu} />
      <div className="space-y-8 p-5 lg:p-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {analytics.stats.map((s, i) => (<StatCard key={s.label} {...s} icon={icons[i]} />))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="border border-border bg-card p-6 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-foreground">Revenue</h3>
                <p className="text-xs text-muted-foreground">Last 6 months</p>
              </div>
              <StatusBadge tone="accent">+12.4%</StatusBadge>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.revenueByMonth} margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tickLine={false} axisLine={false} width={44} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "hsl(var(--accent))", strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#rev)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <h3 className="font-serif text-2xl text-foreground">Category demand</h3>
            <p className="text-xs text-muted-foreground">Share of active rentals</p>
            <ul className="mt-6 space-y-4">
              {analytics.categoryDemand.map((c) => (
                <li key={c.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">{c.value}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${c.value * 3.5}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent requests */}
        <div className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-6">
            <h3 className="font-serif text-2xl text-foreground">Recent rental requests</h3>
            <Link to="/admin/rental-requests" className="inline-flex items-center gap-1 font-label text-[0.68rem] tracking-[0.14em] text-accent hover:underline">VIEW ALL <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="eyebrow">Request</TableHead>
                  <TableHead className="eyebrow">Customer</TableHead>
                  <TableHead className="eyebrow">Dates</TableHead>
                  <TableHead className="eyebrow">Total</TableHead>
                  <TableHead className="eyebrow">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentalRequests.slice(0, 6).map((r) => {
                  const m = statusMeta[r.status];
                  return (
                    <TableRow key={r.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{r.id}</TableCell>
                      <TableCell><div className="text-foreground">{r.customer}</div><div className="text-xs text-muted-foreground">{r.company}</div></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.startDate} → {r.endDate}</TableCell>
                      <TableCell className="text-foreground">{formatINR(r.total)}</TableCell>
                      <TableCell><StatusBadge tone={m.tone}>{m.label}</StatusBadge></TableCell>
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
