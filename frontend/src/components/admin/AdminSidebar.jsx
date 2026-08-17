import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LayoutDashboard, Package, Grid3x3, ClipboardList, CalendarDays, Users, BarChart3, Settings, ArrowLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/props", label: "Props", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Grid3x3 },
  { to: "/admin/rental-requests", label: "Rental Requests", icon: ClipboardList },
  { to: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const AdminSidebar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const logout = () => {
    if (onNavigate) onNavigate();
    toast("Signed out", { description: "You have been logged out of the admin panel." });
    navigate("/");
  };
  return (
    <div className="flex h-full flex-col bg-charcoal text-charcoal-foreground">
      <div className="flex h-[68px] items-center border-b border-charcoal-foreground/12 px-6">
        <NavLink to="/" className="font-serif text-base tracking-[0.16em]">STUDIO FRANGIPANI</NavLink>
        <span className="ml-2 font-label text-[0.55rem] tracking-[0.14em] text-gold">ADMIN</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {adminLinks.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-charcoal-foreground/10 text-charcoal-foreground"
                  : "text-charcoal-foreground/60 hover:bg-charcoal-foreground/5 hover:text-charcoal-foreground"
              )
            }
          >
            <l.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
            {l.label}
          </NavLink>
        ))}
      </nav>

      {/* Admin profile + logout */}
      <div className="border-t border-charcoal-foreground/12 p-3">
        <div className="mb-1 flex items-center gap-3 rounded-sm px-3 py-2.5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 font-label text-[0.62rem] text-gold">SF</div>
          <div className="min-w-0">
            <p className="truncate text-sm text-charcoal-foreground">Studio Frangipani</p>
            <p className="truncate text-[0.7rem] text-charcoal-foreground/50">admin@studiofrangipani.rentals</p>
          </div>
        </div>
        <NavLink to="/" onClick={onNavigate} className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-charcoal-foreground/60 transition-colors hover:text-charcoal-foreground">
          <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.6} /> Back to site
        </NavLink>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm text-charcoal-foreground/60 transition-colors hover:text-charcoal-foreground">
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.6} /> Logout
        </button>
      </div>
    </div>
  );
};
