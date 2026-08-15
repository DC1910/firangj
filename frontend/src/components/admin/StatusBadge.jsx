import React from "react";
import { cn } from "@/lib/utils";

const tones = {
  muted: "bg-secondary text-secondary-foreground",
  accent: "bg-accent/12 text-accent",
  gold: "bg-gold/15 text-gold",
  success: "bg-accent/12 text-accent",
  destructive: "bg-destructive/10 text-destructive",
};

export const StatusBadge = ({ tone = "muted", children, className }) => (
  <span className={cn("inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 font-label text-[0.6rem] tracking-[0.12em]", tones[tone] || tones.muted, className)}>
    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
    {children}
  </span>
);
