import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AppLayout from "@/layouts/app-layout";

import {
  Search,
  MapPin,
  Building2,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

type District = {
  id: number;
  name: string;
};

type Area = {
  id: number;
  name: string;
  address: string;
  district_id: number;
  district?: District;
};

type PageProps = {
  districts?: District[];
  areas?: Area[];
};

export default function AreaIndex({ districts = [], areas = [] }: PageProps) {
  const [q, setQ] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 15;
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Area | null>(null);

  // ── CREATE form ──
  const { data, setData, post, processing, errors, reset } = useForm({
    district_id: "",
    name: "",
    address: "",
  });

  // ── EDIT form ──
  const editForm = useForm({
    district_id: "",
    name: "",
    address: "",
  });

  const filtered = useMemo(() => {
    const query = q.toLowerCase();

    return areas.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.address?.toLowerCase().includes(query) ||
        a.district?.name?.toLowerCase().includes(query)
    );
  }, [areas, q]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginatedAreas = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/areas", {
      onSuccess: () => {
        reset("district_id", "name");
        setAddOpen(false);
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this area?")) return;
    router.delete(`/areas/${id}`);
  };

  const openEdit = (a: Area) => {
    setEditTarget(a);
    editForm.setData({
      district_id: String(a.district_id),
      name: a.name,
      address: a.address,
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    editForm.put(`/areas/${editTarget.id}`, {
      onSuccess: () => setEditTarget(null),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Areas", href: "/areas" },
      ]}
    >
      <Head title="Areas" />

      <div className="p-6 h-[calc(100vh-5rem)] flex flex-col gap-4">

        {/* STATS */}
        {/* HEADER */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Area Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage areas and district assignments
              </p>
            </div>
          </div>

          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            <Plus size={15} />
            Add Area
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Total Areas
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {areas.length}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin size={18} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Districts
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {districts.length}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Building2 size={18} className="text-amber-400" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Unassigned
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {areas.filter((a) => !a.district).length}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <X size={18} className="text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 shrink-0"
        >
          <div className="relative w-full max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search area or district..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>

          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* TABLE */}
        <div className="flex-1 overflow-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur border-b border-border">
              <tr className="text-[11px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                <th className="px-4 py-3 text-left">Area</th>
                <th className="px-4 py-3 text-left">District</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-16 text-sm text-muted-foreground"
                  >
                    No areas found.
                  </td>
                </tr>
              )}

              {paginatedAreas.map((a, i) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  {/* AREA */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin size={14} className="text-primary" />
                      </div>

                      <div>
                        <p className="font-medium text-foreground">
                          {a.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DISTRICT */}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {a.district?.name ?? "No District"}
                    </span>
                  </td>

                  {/* ADDRESS */}
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {a.address}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(a)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition"
                      >
                        <Pencil size={11} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(a.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition"
                      >
                        <Trash2 size={11} />
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between shrink-0">
          <span className="text-xs text-muted-foreground">
            Showing {((currentPage - 1) * perPage) + 1}
            –
            {Math.min(currentPage * perPage, filtered.length)}
            {" "}of {filtered.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1.5 text-xs rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition"
            >
              Prev
            </button>

            <span className="text-xs px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 text-xs rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Area</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">District</label>
              <Select
                value={data.district_id}
                onValueChange={(v) => setData("district_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district..." />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.district_id && (
                <p className="text-sm text-red-500">{errors.district_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Area Name</label>
              <Input
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="e.g. Area 1"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => { setAddOpen(false); reset(); }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Area</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">District</label>
              <Select
                value={editForm.data.district_id}
                onValueChange={(v) => editForm.setData("district_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district..." />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {editForm.errors.district_id && (
                <p className="text-sm text-red-500">{editForm.errors.district_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Area Name</label>
              <Input
                value={editForm.data.name}
                onChange={(e) => editForm.setData("name", e.target.value)}
                placeholder="e.g. Area 1"
              />
              {editForm.errors.name && (
                <p className="text-sm text-red-500">{editForm.errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={editForm.data.address}
                onChange={(e) => editForm.setData("address", e.target.value)}
                placeholder="Address"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditTarget(null)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={editForm.processing}>
                {editForm.processing ? "Saving..." : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    </AppLayout>
  );
}