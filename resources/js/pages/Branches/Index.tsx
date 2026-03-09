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
        const query = q.trim().toLowerCase();
        if (!query) return branches;

        return branches.filter((b) => {
            const area = b.area?.name?.toLowerCase() ?? "";
            const branch = b.name?.toLowerCase() ?? "";
            return branch.includes(query) || area.includes(query);
        });
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
    console.log(areas);
    return (

        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/dashboard" },
                { title: "Branches", href: "/branches" },
            ]}
        >
            <Head title="Branches" />

            <div className="space-y-6">

                {/* Branch Entry */}
                <Card>
                    <CardHeader>
                        <CardTitle>Branch Entry</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">

                            {/* Area Select */}
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

                            {/* Branch Name */}
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

                            {/* Save Button */}
                            <div className="flex items-end">
                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? "Saving..." : "Save Branch"}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

                {/* Branch List */}
                <Card>
                    <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <CardTitle>Branch List</CardTitle>

                        <div className="w-full md:w-80">
                            <Input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search branch or area..."
                            />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Table>

                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[90px]">ID</TableHead>
                                    <TableHead>Branch</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead className="w-[140px] text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                                            No records found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((b) => (
                                        <TableRow key={b.id}>
                                            <TableCell>{b.id}</TableCell>

                                            <TableCell className="font-medium">
                                                {b.name}
                                            </TableCell>

                                            <TableCell>
                                                {b.area?.name ?? `Area #${b.area_id}`}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(b.id)}
                                                >
                                                    Delete
                                                </Button>
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