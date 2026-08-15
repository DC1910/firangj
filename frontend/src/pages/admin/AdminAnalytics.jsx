import React from "react";
import { useOutletContext } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatCard } from "@/components/admin/StatCard";
import { analytics, formatINR } from "@/data/firangi";

const PIE_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--taupe))"];

const Box = ({ title, subtitle, children }) => (
  <div className="border border-border bg-card p-6">
    <h3 className="font-serif text-2xl text-foreground">{title}</h3>
    {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    <div className="mt-6 h-64 w-full">{children}</div>
  </div>
);

const tipStyle = { border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", borderRadius: 2, fontSize: 12 };

export default function AdminAnalytics() {
  const { openMenu } = useOutletContext();
  return (
    <>
      <AdminTopbar title="Analytics" subtitle="Performance overview" onMenu={openMenu} />
      <div className="space-y-6 p-5 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {analytics.stats.map((s) => (<StatCard key={s.label} {...s} />))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Box title="Revenue trend" subtitle="Monthly, last 6 months">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.revenueByMonth} margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tickLine={false} axisLine={false} width={44} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip contentStyle={tipStyle} formatter={(v) => [formatINR(v), "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--accent))" }} activeDot={{ r: 5 }} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </div>
          <Box title="Category mix" subtitle="Share of demand">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.categoryDemand} dataKey="value" nameKey="name" innerRadius={48} outerRadius={80} paddingAngle={2} stroke="hsl(var(--card))" strokeWidth={2} isAnimationActive={false}>
                  {analytics.categoryDemand.map((e, i) => (<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
                </Pie>
                <Tooltip contentStyle={tipStyle} formatter={(v, n) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </div>

        <Box title="Most rented props" subtitle="By total rental count">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.topProps} layout="vertical" margin={{ top: 0, right: 16, left: 12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis type="category" dataKey="name" width={160} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} />
              <Tooltip contentStyle={tipStyle} cursor={{ fill: "hsl(var(--secondary))" }} formatter={(v) => [`${v} rentals`, ""]} />
              <Bar dataKey="rentals" fill="hsl(var(--accent))" radius={[0, 2, 2, 0]} barSize={18} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </div>
    </>
  );
}
