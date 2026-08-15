import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <AdminSidebar />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 border-r-0 p-0">
          <AdminSidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64">
        <Outlet context={{ openMenu: () => setOpen(true) }} />
      </div>
    </div>
  );
};
