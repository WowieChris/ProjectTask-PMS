import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import AppLayout from "@/layouts/app-layout";

import {
  Search,
  Layers3,
  Plus,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import { motion } from "motion/react";

type UserGroup = {
  id: number;
  name: string;
};

type Division = {
  id: number;
  name: string;
  user_group_id: number;
  user_group?: UserGroup;
  address: string;
};

type PageProps = {
  userGroups: UserGroup[];
  divisions: Division[];
};

interface DivisionForm {
  user_group_id: string;
  name: string;
  address: string;
}



export default function DivisionIndex({ userGroups, divisions }: PageProps) {
  const [q, setQ] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 15;

  const [editTarget, setEditTarget] = useState<Division | null>(null);

  // ── CREATE form ──
  const { data, setData, post, processing, errors, reset } =
    useForm<DivisionForm>({ user_group_id: "", name: "", address: "", });

  // ── EDIT form ──
  const editForm = useForm<DivisionForm>({ user_group_id: "", name: "", address: "", });

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return divisions.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.user_group?.name?.toLowerCase().includes(query)
    );
  }, [divisions, q]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginatedDivisions = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/divisions", {
      onSuccess: () => {
        reset("user_group_id", "name", "address");
        setAddOpen(false); // ← add this
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this division?")) return;
    router.delete(`/divisions/${id}`);
  };

  const openEdit = (d: Division) => {
    setEditTarget(d);
    editForm.setData({
      user_group_id: String(d.user_group_id),
      name: d.name,
      address: d.address,
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    editForm.put(`/divisions/${editTarget.id}`, {
      onSuccess: () => setEditTarget(null),
    });
  };

  const badgeColor = (name?: string) => {
    if (!name) return "bg-muted text-muted-foreground";
    if (name.includes("Luzon")) return "bg-blue-500/10 text-blue-400";
    if (name.includes("Visayas")) return "bg-green-500/10 text-green-400";
    if (name.includes("Mindanao")) return "bg-purple-500/10 text-purple-400";
    return "bg-muted text-muted-foreground";
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Divisions", href: "/divisions" },
      ]}
    >
      <Head title="Divisions" />

      <div className="p-6 h-[calc(100vh-5rem)] flex flex-col gap-4">

        {/* HEADER */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Layers3 className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Division Management
              </h1>

              <p className="text-sm text-muted-foreground">
                Manage divisions and user groups
              </p>
            </div>
          </div>

          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            <Plus size={15} />
            Add Division
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Total Divisions
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {divisions.length}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Layers3 size={18} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  User Groups
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {userGroups.length}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Users size={18} className="text-amber-400" />
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
                  {divisions.filter((d) => !d.user_group).length}
                </h2>
              </div>

              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Search size={18} className="text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
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
              placeholder="Search division..."
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

                <th className="px-4 py-3 text-left">Division</th>

                <th className="px-4 py-3 text-left">Address</th>

                <th className="px-4 py-3 text-left">User Group</th>

                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>

              {paginatedDivisions.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-16 text-sm text-muted-foreground"
                  >
                    No divisions found.
                  </td>
                </tr>
              )}

              {paginatedDivisions.map((d, i) => (

                <motion.tr
                  key={d.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >

                  {/* DIVISION */}
                  <td className="px-4 py-3">

                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Layers3 size={14} className="text-primary" />
                      </div>

                      <div>
                        <p className="font-medium text-foreground">
                          {d.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ADDRESS */}
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {d.address}
                  </td>

                  {/* USER GROUP */}
                  <td className="px-4 py-3">

                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] border ${badgeColor(d.user_group?.name)}`}
                    >
                      {d.user_group?.name ?? "No Group"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">

                    <div className="flex items-center justify-end gap-2">

                      <button
                        onClick={() => openEdit(d)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition"
                      >
                        <Pencil size={11} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(d.id)}
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
                onClick={() => setCurrentPage((p: number) => p - 1)}
                className="px-3 py-1.5 text-xs rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition"
              >
                Prev
              </button>

              <span className="text-xs px-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p: number) => p + 1)}
                className="px-3 py-1.5 text-xs rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

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
                onClick={() => setCurrentPage((p: number) => p - 1)}
                className="px-3 py-1.5 text-xs rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition"
              >
                Prev
              </button>

              <span className="text-xs px-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p: number) => p + 1)}
                className="px-3 py-1.5 text-xs rounded-lg border border-input hover:bg-muted disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Division</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">User Group</label>
              <Select
                value={editForm.data.user_group_id}
                onValueChange={(v) => editForm.setData("user_group_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select group..." />
                </SelectTrigger>
                <SelectContent>
                  {userGroups.map((g) => (
                    <SelectItem key={g.id} value={String(g.id)}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {editForm.errors.user_group_id && (
                <p className="text-sm text-red-500">{editForm.errors.user_group_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Division Name</label>
              <Input
                value={editForm.data.name}
                onChange={(e) => editForm.setData("name", e.target.value)}
                placeholder="e.g. Division 1"
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
                placeholder="e.g. Cities"
              />
              {editForm.errors.name && (
                <p className="text-sm text-red-500">{editForm.errors.address}</p>
              )}
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