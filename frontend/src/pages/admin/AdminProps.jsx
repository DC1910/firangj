import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Eye, Pencil, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SearchInput } from "@/components/common/SearchInput";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { categories, categoryName, allShootTypes, allStyles, formatINR } from "@/data/firangi";
import { useAdminData } from "@/context/AdminDataContext";

const availTone = { available: "accent", reserved: "gold", rented: "muted" };
const availLabel = { available: "Available", reserved: "Reserved", rented: "On Rent" };
const blank = { name: "", category: "decor", description: "", pricePerDay: "", color: "", material: "", dimensions: "", condition: "Excellent", style: "Contemporary", shootTypes: [], availability: "available", quantity: 1, images: [] };

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2"><Label className="eyebrow text-foreground">{label}</Label>{children}</div>
);

export default function AdminProps() {
  const { openMenu } = useOutletContext();
  const { props, addProp, updateProp, deleteProp } = useAdminData();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [avail, setAvail] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [toDelete, setToDelete] = useState(null);

  const rows = useMemo(() => props.filter((p) => {
    if (cat !== "all" && p.category !== cat) return false;
    if (avail !== "all" && p.availability !== avail) return false;
    if (query.trim() && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [props, query, cat, avail]);

  const setF = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const toggleShoot = (s) => setForm((p) => ({ ...p, shootTypes: p.shootTypes.includes(s) ? p.shootTypes.filter((x) => x !== s) : [...p.shootTypes, s] }));

  const openAdd = () => { setEditing(null); setForm(blank); setDialogOpen(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...p, pricePerDay: String(p.pricePerDay) }); setDialogOpen(true); };

  const onImage = (e) => {
    const file = e.target.files?.[0];
    if (file) setF("images", [URL.createObjectURL(file)]);
  };

  const save = () => {
    if (!form.name.trim()) { toast("Please enter a prop name"); return; }
    if (editing) { updateProp(editing.id, form); toast("Prop updated", { description: form.name }); }
    else { addProp(form); toast("Prop added", { description: form.name }); }
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (toDelete) { deleteProp(toDelete.id); toast("Prop deleted", { description: toDelete.name }); setToDelete(null); }
  };

  return (
    <>
      <AdminTopbar title="Prop Collection" subtitle={`${props.length} pieces in the library`} onMenu={openMenu}
        action={<Button onClick={openAdd} variant="editorial" size="sm"><Plus className="h-4 w-4" /> Add New Prop</Button>} />
      <div className="space-y-6 p-5 lg:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchInput value={query} onChange={setQuery} placeholder="Search props…" className="lg:max-w-xs" />
          <div className="flex gap-3">
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="h-12 w-full rounded-sm sm:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map((c) => (<SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={avail} onValueChange={setAvail}>
              <SelectTrigger className="h-12 w-full rounded-sm sm:w-44"><SelectValue placeholder="Availability" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All availability</SelectItem><SelectItem value="available">Available</SelectItem><SelectItem value="reserved">Reserved</SelectItem><SelectItem value="rented">On Rent</SelectItem></SelectContent>
            </Select>
          </div>
        </div>

        <div className="border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="eyebrow">Prop</TableHead><TableHead className="eyebrow">Category</TableHead>
                  <TableHead className="eyebrow">Price / Day</TableHead><TableHead className="eyebrow">Availability</TableHead>
                  <TableHead className="eyebrow">Qty</TableHead><TableHead className="eyebrow text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((p) => (
                  <TableRow key={p.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3"><img src={p.images[0]} alt={p.name} className="h-12 w-10 flex-shrink-0 object-cover" /><div className="min-w-0"><div className="truncate font-medium text-foreground">{p.name}</div><div className="text-xs text-muted-foreground">{p.id}</div></div></div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{categoryName(p.category)}</TableCell>
                    <TableCell className="text-foreground">{formatINR(p.pricePerDay)}</TableCell>
                    <TableCell><StatusBadge tone={availTone[p.availability]}>{availLabel[p.availability]}</StatusBadge></TableCell>
                    <TableCell className="text-muted-foreground">{p.quantity}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="View"><a href={`/product/${p.id}`} target="_blank" rel="noreferrer"><Eye className="h-4 w-4" /></a></Button>
                        <Button onClick={() => openEdit(p)} variant="ghost" size="icon" className="h-8 w-8" title="Edit"><Pencil className="h-4 w-4" /></Button>
                        <Button onClick={() => setToDelete(p)} variant="ghost" size="icon" className="h-8 w-8 text-burgundy hover:text-burgundy" title="Delete"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {!rows.length && <div className="p-12 text-center text-sm text-muted-foreground">No props match your filters.</div>}
        </div>
      </div>

      {/* Add / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader><DialogTitle className="font-serif text-2xl">{editing ? "Edit Prop" : "Add New Prop"}</DialogTitle></DialogHeader>
          <div className="grid gap-5 py-2 sm:grid-cols-2">
            <div className="sm:col-span-2"><Field label="Prop Name"><Input value={form.name} onChange={(e) => setF("name", e.target.value)} className="h-11 rounded-sm" placeholder="Vintage Tan Leather Handbag" /></Field></div>
            <Field label="Category">
              <Select value={form.category} onValueChange={(v) => setF("category", v)}><SelectTrigger className="h-11 rounded-sm"><SelectValue /></SelectTrigger><SelectContent>{categories.map((c) => (<SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>))}</SelectContent></Select>
            </Field>
            <Field label="Price per Day (₹)"><Input type="number" value={form.pricePerDay} onChange={(e) => setF("pricePerDay", e.target.value)} className="h-11 rounded-sm" placeholder="850" /></Field>
            <div className="sm:col-span-2"><Field label="Description"><Textarea value={form.description} onChange={(e) => setF("description", e.target.value)} rows={3} className="rounded-sm resize-none" /></Field></div>
            <Field label="Colour"><Input value={form.color} onChange={(e) => setF("color", e.target.value)} className="h-11 rounded-sm" /></Field>
            <Field label="Material"><Input value={form.material} onChange={(e) => setF("material", e.target.value)} className="h-11 rounded-sm" /></Field>
            <Field label="Dimensions"><Input value={form.dimensions} onChange={(e) => setF("dimensions", e.target.value)} className="h-11 rounded-sm" /></Field>
            <Field label="Condition"><Input value={form.condition} onChange={(e) => setF("condition", e.target.value)} className="h-11 rounded-sm" /></Field>
            <Field label="Style">
              <Select value={form.style} onValueChange={(v) => setF("style", v)}><SelectTrigger className="h-11 rounded-sm"><SelectValue /></SelectTrigger><SelectContent>{allStyles.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Availability"><Select value={form.availability} onValueChange={(v) => setF("availability", v)}><SelectTrigger className="h-11 rounded-sm"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="available">Available</SelectItem><SelectItem value="reserved">Reserved</SelectItem><SelectItem value="rented">On Rent</SelectItem></SelectContent></Select></Field>
              <Field label="Quantity"><Input type="number" value={form.quantity} onChange={(e) => setF("quantity", e.target.value)} className="h-11 rounded-sm" /></Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Shoot Types">
                <div className="flex flex-wrap gap-2">
                  {allShootTypes.map((s) => (
                    <button type="button" key={s} onClick={() => toggleShoot(s)} className={cn("border px-3 py-1.5 text-xs transition-colors", form.shootTypes.includes(s) ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:border-foreground/40")}>{s}</button>
                  ))}
                </div>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Image">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-16 flex-shrink-0 overflow-hidden border border-border bg-muted">{form.images[0] && <img src={form.images[0]} alt="preview" className="h-full w-full object-cover" />}</div>
                  <label className="flex cursor-pointer items-center gap-2 border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40">
                    <UploadCloud className="h-4 w-4" /> Upload image
                    <input type="file" accept="image/*" onChange={onImage} className="hidden" />
                  </label>
                </div>
              </Field>
            </div>
          </div>
          <DialogFooter>
            <Button variant="line" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="editorial" onClick={save}>Save Prop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!toDelete} onOpenChange={(v) => !v && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl">Delete this prop?</AlertDialogTitle>
            <AlertDialogDescription>{toDelete?.name} will be removed from the collection. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
