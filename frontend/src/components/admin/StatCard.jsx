import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const StatCard = ({ label, value, delta, trend, sub, icon: Icon }) => {
  const up = trend === "up";
  return (
    <div className="flex flex-col border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <span className="eyebrow text-muted-foreground">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-accent" strokeWidth={1.6} />}
      </div>
      <div className="mt-4 font-serif text-4xl text-foreground">{value}</div>
      <div className="mt-auto flex items-center gap-2 pt-4">
        {delta && (
          <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", up ? "text-accent" : "text-burgundy")}>
            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {delta}
          </span>
        )}
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      </div>
    </div>
  );
};
