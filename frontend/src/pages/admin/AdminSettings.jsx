import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Row = ({ title, desc, children }) => (
  <div className="flex items-center justify-between gap-6 py-4">
    <div><p className="text-sm font-medium text-foreground">{title}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
    {children}
  </div>
);

export default function AdminSettings() {
  const { openMenu } = useOutletContext();
  const [toggles, setToggles] = useState({ requests: true, deposit: true, delivery: false, newsletter: true });
  const set = (k) => setToggles((t) => ({ ...t, [k]: !t[k] }));

  const save = (e) => { e.preventDefault(); toast("Settings saved", { description: "Your studio preferences have been updated." }); };

  return (
    <>
      <AdminTopbar title="Settings" subtitle="Studio preferences" onMenu={openMenu} />
      <form onSubmit={save} className="max-w-3xl space-y-6 p-5 lg:p-8">
        {/* Studio profile */}
        <section className="border border-border bg-card p-6">
          <h3 className="font-serif text-2xl text-foreground">Studio profile</h3>
          <p className="text-xs text-muted-foreground">Public details shown across the site.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Studio name</Label><Input defaultValue="Studio Frangipani" className="h-11 rounded-sm" /></div>
            <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Contact email</Label><Input defaultValue="studio@studiofrangipani.rentals" className="h-11 rounded-sm" /></div>
            <div className="flex flex-col gap-2 sm:col-span-2"><Label className="eyebrow text-foreground">Studio address</Label><Textarea defaultValue="14 Atelier Lane, Bandra West, Mumbai 400050" rows={2} className="rounded-sm resize-none" /></div>
          </div>
        </section>

        {/* Rental preferences */}
        <section className="border border-border bg-card p-6">
          <h3 className="font-serif text-2xl text-foreground">Rental preferences</h3>
          <div className="mt-4 divide-y divide-border">
            <Row title="Accept new requests" desc="Allow customers to submit rental requests."><Switch checked={toggles.requests} onCheckedChange={() => set("requests")} /></Row>
            <Row title="Require security deposit" desc="Apply a refundable deposit per piece."><Switch checked={toggles.deposit} onCheckedChange={() => set("deposit")} /></Row>
            <Row title="Offer studio delivery" desc="Enable on-set and studio delivery."><Switch checked={toggles.delivery} onCheckedChange={() => set("delivery")} /></Row>
            <Row title="Newsletter sign-ups" desc="Collect emails from the footer form."><Switch checked={toggles.newsletter} onCheckedChange={() => set("newsletter")} /></Row>
          </div>
        </section>

        {/* Pricing */}
        <section className="border border-border bg-card p-6">
          <h3 className="font-serif text-2xl text-foreground">Pricing defaults</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Deposit %</Label><Input defaultValue="25" className="h-11 rounded-sm" /></div>
            <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Min. rental (days)</Label><Input defaultValue="1" className="h-11 rounded-sm" /></div>
            <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">Weekly discount %</Label><Input defaultValue="15" className="h-11 rounded-sm" /></div>
          </div>
        </section>

        <Separator />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="line">Cancel</Button>
          <Button type="submit" variant="editorial" size="lg">Save changes</Button>
        </div>
      </form>
    </>
  );
}
