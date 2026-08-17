"use client";

import React from "react";
import { Menu, Search, Bell } from "lucide-react";

export const AdminTopbar = ({ title, subtitle, onMenu, action }) => {
  return (
    <header className="sticky top-0 z-30 flex min-h-[68px] items-center justify-between gap-4 border-b border-border bg-background/90 px-5 py-3 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-3">
        <button aria-label="Menu" onClick={onMenu} className="text-foreground lg:hidden"><Menu className="h-5 w-5" /></button>
        <div>
          <h1 className="font-serif text-2xl leading-tight text-foreground">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden items-center md:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search…" className="h-9 w-52 rounded-sm border border-input bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        {action}
        <button aria-label="Notifications" className="relative flex h-9 w-9 items-center justify-center rounded-sm border border-input text-foreground hover:bg-secondary">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-burgundy" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-label text-xs text-accent-foreground">FS</div>
      </div>
    </header>
  );
};
