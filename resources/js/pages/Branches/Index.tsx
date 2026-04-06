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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import AppLayout from "@/layouts/app-layout";

type Area = {
    id: number;
    name: string;
};

type Branch = {
    id: number;
    name: string;
    area_id: number;
    area?: Area;
};

type PageProps = {
    areas?: Area[];
    branches?: Branch[];
};

export default function BranchIndex({
    areas = [],
    branches = [],
}: PageProps) {
    const [q, setQ] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        area_id: "",
        name: "",
    });

    const filtered = useMemo(() => {
        const query = q.toLowerCase();
        return branches.filter((b) =>
            b.name.toLowerCase().includes(query) ||
            b.area?.name?.toLowerCase().includes(query)
        );
    }, [branches, q]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/branches", {
            onSuccess: () => reset("area_id", "name"),
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Delete this branch?")) return;
        router.delete(`/branches/${id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/dashboard" },
                { title: "Branches", href: "/branches" },
            ]}
        >
            <Head title="Branches" />

            <div className="p-6 space-y-6">

                {/* 🔥 STATS */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="hover:shadow-lg transition">
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">Total Branches</p>
                            <p className="text-2xl font-bold">{branches.length}</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition">
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">Total Area's</p>
                            <p className="text-2xl font-bold">
                                {new Set(branches.filter(d => d.area).map(d => d.area_id)).size}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition">
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">Unassigned</p>
                            <p className="text-2xl font-bold">
                                {branches.filter(b => !b.area).length}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* 🔥 FORM */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Add Branch</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">

                            {/* AREA */}
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
                            </div>

                            {/* NAME */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Branch Name</label>

                                <Input
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="e.g. Branch 1"
                                />
                            </div>

                            {/* BUTTON */}
                            <div className="flex items-end">
                                <Button className="w-full">
                                    {processing ? "Saving..." : "Save"}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

                {/* 🔥 TABLE */}
                <Card className="shadow-lg">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Branch List</CardTitle>

                        <Input
                            placeholder="Search branch..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="w-80"
                        />
                    </CardHeader>

                    <CardContent className="p-0">
                        <Table>

                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead className="pl-6">Branch</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead className="text-right pr-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-12">
                                            No branches found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((b) => (
                                        <TableRow
                                            key={b.id}
                                            className="hover:bg-muted/40 transition"
                                        >
                                            <TableCell className="pl-6 font-medium">
                                                {b.name}
                                            </TableCell>

                                            <TableCell>
                                                <span className="px-3 py-1 text-xs rounded-full bg-muted">
                                                    {b.area?.name ?? "No Area"}
                                                </span>
                                            </TableCell>

                                            <TableCell className="text-right pr-6">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="secondary">
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(b.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                )}
                            </TableBody>

                        </Table>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}