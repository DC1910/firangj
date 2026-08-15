import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval,
  isSameMonth, isSameDay, format, parseISO, isWithinInterval, addMonths,
} from "date-fns";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { rentalRequests, statusMeta } from "@/data/firangi";
import { cn } from "@/lib/utils";

const toneDot = { pending: "bg-taupe", confirmed: "bg-accent", active: "bg-gold", completed: "bg-accent/60", cancelled: "bg-destructive" };
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AdminCalendar() {
  const { openMenu } = useOutletContext();
  const [cursor, setCursor] = useState(new Date(2026, 1, 1));

  const days = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(cursor));
    const gridEnd = endOfWeek(endOfMonth(cursor));
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [cursor]);

  const bookingsFor = (day) => rentalRequests.filter((r) => {
    try { return r.status !== "cancelled" && isWithinInterval(day, { start: parseISO(r.startDate), end: parseISO(r.endDate) }); }
    catch { return false; }
  });

  return (
    <>
      <AdminTopbar title="Calendar" subtitle="Bookings & availability" onMenu={openMenu} />
      <div className="space-y-6 p-5 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-3xl text-foreground">{format(cursor, "MMMM yyyy")}</h2>
            <div className="flex gap-1">
              <button aria-label="Previous month" onClick={() => setCursor((c) => addMonths(c, -1))} className="flex h-9 w-9 items-center justify-center rounded-sm border border-input hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
              <button aria-label="Next month" onClick={() => setCursor((c) => addMonths(c, 1))} className="flex h-9 w-9 items-center justify-center rounded-sm border border-input hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["pending", "confirmed", "active", "completed"].map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><span className={cn("h-2 w-2 rounded-full", toneDot[s])} /><span className="capitalize">{s}</span></span>
            ))}
          </div>
        </div>

        <div className="border border-border bg-card">
          <div className="grid grid-cols-7 border-b border-border">
            {weekdays.map((d) => (<div key={d} className="eyebrow px-3 py-3 text-center text-muted-foreground">{d}</div>))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const inMonth = isSameMonth(day, cursor);
              const isToday = isSameDay(day, new Date());
              const bookings = bookingsFor(day);
              return (
                <div key={i} className={cn("min-h-[92px] border-b border-r border-border p-2 last:border-r-0", !inMonth && "bg-secondary/30", (i + 1) % 7 === 0 && "border-r-0")}>
                  <div className={cn("mb-1 flex h-6 w-6 items-center justify-center text-xs", isToday ? "rounded-full bg-accent text-accent-foreground" : inMonth ? "text-foreground" : "text-muted-foreground/50")}>{format(day, "d")}</div>
                  <div className="space-y-1">
                    {bookings.slice(0, 2).map((b) => (
                      <div key={b.id} className="flex items-center gap-1 truncate rounded-sm bg-secondary px-1.5 py-0.5">
                        <span className={cn("h-1.5 w-1.5 flex-shrink-0 rounded-full", toneDot[b.status])} />
                        <span className="truncate text-[0.62rem] text-foreground">{b.customer.split(" ")[0]}</span>
                      </div>
                    ))}
                    {bookings.length > 2 && <div className="px-1.5 text-[0.6rem] text-muted-foreground">+{bookings.length - 2} more</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming list */}
        <div className="border border-border bg-card p-6">
          <h3 className="font-serif text-2xl text-foreground">Upcoming bookings</h3>
          <ul className="mt-5 divide-y divide-border">
            {rentalRequests.filter((r) => r.status !== "cancelled" && r.status !== "completed").map((r) => {
              const m = statusMeta[r.status];
              return (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                  <div><span className="font-medium text-foreground">{r.customer}</span><span className="ml-2 text-xs text-muted-foreground">{r.id}</span></div>
                  <div className="flex items-center gap-4"><span className="text-sm text-muted-foreground">{r.startDate} → {r.endDate}</span><StatusBadge tone={m.tone}>{m.label}</StatusBadge></div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
