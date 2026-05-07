import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    GitBranch,
    MapPinned,
    MapPin,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";

import { motion } from "motion/react";

type District = {
    id: number;
    name: string;
};

type Area = {
    id: number;
    name: string;
    district_id?: number;
    district?: District;
};

type Branch = {
    id: number;
    name: string;

    district_id?: number;
    area_id?: number;

    district?: District;
    area?: Area;
};

type PageProps = {
    branches: Branch[];

    districts: District[];
    areas: Area[];
};
export default function BranchIndex({
    branches,
    districts,
    areas,
}: PageProps) {
    const [q, setQ] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Branch | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const perPage = 15;

    // ── CREATE form ──
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        area_id: "",
        district_id: "",
    });

    // ── EDIT form ──
    const editForm = useForm({
        area_id: "",
        name: "",
        district_id: "",
    });

    const filtered = useMemo(() => {
        const query = q.toLowerCase();
        return branches.filter((b) =>
            b.name.toLowerCase().includes(query) ||
            b.area?.name?.toLowerCase().includes(query)
        );
    }, [branches, q]);

    const totalPages = Math.ceil(filtered.length / perPage);

    const paginatedBranches = useMemo(() => {
        const start = (currentPage - 1) * perPage;

        return filtered.slice(start, start + perPage);
    }, [filtered, currentPage]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/branches", {
            onSuccess: () => {
                reset("area_id", "name");
                setAddOpen(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Delete this branch?")) return;
        router.delete(`/branches/${id}`);
    };

    const openEdit = (b: Branch) => {
        setEditTarget(b);
        editForm.setData({
            area_id: String(b.area_id ?? ""),
            district_id: String(b.district_id ?? ""),  // ← add this
            name: b.name,
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editTarget) return;
        editForm.put(`/branches/${editTarget.id}`, {
            onSuccess: () => setEditTarget(null),
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/dashboard" },
                { title: "Branches", href: "/branches" },
            ]}
        >
            <Head title="Branches" />

            <div className="p-6 h-[calc(100vh-5rem)] flex flex-col gap-4">

                {/* HEADER */}
                <div className="flex items-center justify-between shrink-0">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <GitBranch className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold tracking-tight">
                                Branch Management
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Manage branches and locations
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setAddOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
                    >
                        <Plus size={15} />
                        Add Branch
                    </button>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 shrink-0">

                    <div className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Total Branches
                                </p>

                                <h2 className="text-2xl font-bold mt-1">
                                    {branches.length}
                                </h2>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <GitBranch size={18} className="text-primary" />
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
                                <MapPinned size={18} className="text-amber-400" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Areas
                                </p>

                                <h2 className="text-2xl font-bold mt-1">
                                    {areas.length}
                                </h2>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <MapPin size={18} className="text-green-400" />
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
                                    {branches.filter((b) => !b.area).length}
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
                            placeholder="Search branch..."
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

                                <th className="px-4 py-3 text-left">Branch</th>

                                <th className="px-4 py-3 text-left">District</th>

                                <th className="px-4 py-3 text-left">Area</th>

                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {paginatedBranches.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-16 text-sm text-muted-foreground"
                                    >
                                        No branches found.
                                    </td>
                                </tr>
                            )}

                            {paginatedBranches.map((b, i) => (

                                <motion.tr
                                    key={b.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    className="border-b border-border hover:bg-muted/30 transition-colors"
                                >

                                    {/* BRANCH */}
                                    <td className="px-4 py-3">

                                        <div className="flex items-center gap-3">

                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <GitBranch size={14} className="text-primary" />
                                            </div>

                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {b.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* DISTRICT */}
                                    <td className="px-4 py-3">

                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            {b.district?.name ?? "No District"}
                                        </span>
                                    </td>

                                    {/* AREA */}
                                    <td className="px-4 py-3">

                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] bg-green-500/10 text-green-400 border border-green-500/20">
                                            {b.area?.name ?? "No Area"}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-4 py-3">

                                        <div className="flex items-center justify-end gap-2">

                                            <button
                                                onClick={() => openEdit(b)}
                                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition"
                                            >
                                                <Pencil size={11} />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(b.id)}
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
            </div>

            {/* ADD MODAL */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Branch</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="space-y-2">
                            <label className="text-sm font-medium">District</label>
                            <div className="px-3 py-2 text-sm rounded-lg border border-input bg-muted text-muted-foreground">
                                {areas.find(a => String(a.id) === data.area_id)?.district?.name ?? "Auto-filled from area"}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Area</label>
                            <Select
                                value={data.area_id}
                                onValueChange={(v) => setData("area_id", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select area..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {areas.map((a) => (
                                        <SelectItem key={a.id} value={String(a.id)}>
                                            {a.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.area_id && (
                                <p className="text-sm text-red-500">{errors.area_id}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Branch Name</label>
                            <Input
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="e.g. Branch 1"
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
                        <DialogTitle>Edit Branch</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEdit} className="space-y-4">


                        <div className="space-y-2">
                            <label className="text-sm font-medium">District</label>
                            <div className="px-3 py-2 text-sm rounded-lg border border-input bg-muted text-muted-foreground">
                                {areas.find(a => String(a.id) === editForm.data.area_id)?.district?.name ?? "Auto-filled from area"}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Area</label>
                            <Select
                                value={editForm.data.area_id}
                                onValueChange={(v) => editForm.setData("area_id", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select area..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {areas.map((a) => (
                                        <SelectItem key={a.id} value={String(a.id)}>
                                            {a.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {editForm.errors.area_id && (
                                <p className="text-sm text-red-500">{editForm.errors.area_id}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Branch Name</label>
                            <Input
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData("name", e.target.value)}
                                placeholder="e.g. Branch 1"
                            />
                            {editForm.errors.name && (
                                <p className="text-sm text-red-500">{editForm.errors.name}</p>
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