import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import AppLayout from "@/layouts/app-layout";

type ServiceOrder = {
    id: number;
    tse_jo_no: string;
    tse_assigned: string;
    requesting_party: string;
    department: string;
    location: string;
    date_reported: string;
    status: string;
};

type Props = {
    orders?: ServiceOrder[];
};

export default function ServiceOrderIndex({ orders = [] }: Props) {

    const [q, setQ] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        tse_assigned: "",
        requesting_party: "",
        department: "",
        location: "",
        issues_encountered: "",
    });

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return orders;

        return orders.filter((o) => {
            const jo = o.tse_jo_no?.toLowerCase() ?? "";
            const requester = o.requesting_party?.toLowerCase() ?? "";
            const technician = o.tse_assigned?.toLowerCase() ?? "";

            return (
                jo.includes(query) ||
                requester.includes(query) ||
                technician.includes(query)
            );
        });
    }, [orders, q]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post("/service-order", {
            onSuccess: () =>
                reset("tse_assigned", "requesting_party", "department", "location", "issues_encountered"),
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Delete this service order?")) return;

        router.delete(`/service-order/${id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "/dashboard" },
                { title: "Service Orders", href: "/service-order" },
            ]}
        >
            <Head title="Service Orders" />

            <div className="space-y-6">

                {/* Service Order Entry */}
                <Card>
                    <CardHeader>
                        <CardTitle>Service Order Entry</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            className="grid gap-4 md:grid-cols-4"
                        >

                            {/* Technician */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Technician Assigned
                                </label>

                                <Input
                                    value={data.tse_assigned}
                                    onChange={(e) =>
                                        setData("tse_assigned", e.target.value)
                                    }
                                    placeholder="Technician name"
                                />

                                {errors.tse_assigned && (
                                    <p className="text-sm text-red-500">
                                        {errors.tse_assigned}
                                    </p>
                                )}
                            </div>

                            {/* Requesting Party */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Requesting Party
                                </label>

                                <Input
                                    value={data.requesting_party}
                                    onChange={(e) =>
                                        setData("requesting_party", e.target.value)
                                    }
                                    placeholder="Requester name"
                                />

                                {errors.requesting_party && (
                                    <p className="text-sm text-red-500">
                                        {errors.requesting_party}
                                    </p>
                                )}
                            </div>

                            {/* Department */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Department
                                </label>

                                <Input
                                    value={data.department}
                                    onChange={(e) =>
                                        setData("department", e.target.value)
                                    }
                                    placeholder="Department"
                                />

                                {errors.department && (
                                    <p className="text-sm text-red-500">
                                        {errors.department}
                                    </p>
                                )}
                            </div>

                            {/* Issue Incounter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Issue Incounter
                                </label>

                                <Input
                                    value={data.issues_encountered}
                                    onChange={(e) =>
                                        setData("issues_encountered", e.target.value)
                                    }
                                    placeholder="Issue Incounter"
                                />

                                {errors.issues_encountered && (
                                    <p className="text-sm text-red-500">
                                        {errors.issues_encountered}
                                    </p>
                                )}
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Location
                                </label>

                                <Input
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    placeholder="Location"
                                />

                                {errors.location && (
                                    <p className="text-sm text-red-500">
                                        {errors.location}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="md:col-span-4 flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Saving..." : "Create Service Order"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Service Order List */}
                <Card>
                    <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <CardTitle>Service Order List</CardTitle>

                        <div className="w-full md:w-80">
                            <Input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search JO, technician, requester..."
                            />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Table>

                            <TableHeader>
                                <TableRow>
                                    <TableHead>JO No</TableHead>
                                    <TableHead>Technician</TableHead>
                                    <TableHead>Requesting Party</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            className="text-center text-muted-foreground"
                                        >
                                            No records found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((o) => (
                                        <TableRow key={o.id}>
                                            <TableCell>{o.tse_jo_no}</TableCell>
                                            <TableCell>{o.tse_assigned}</TableCell>
                                            <TableCell>{o.requesting_party}</TableCell>
                                            <TableCell>{o.department}</TableCell>
                                            <TableCell>{o.location}</TableCell>
                                            <TableCell>{o.date_reported}</TableCell>
                                            <TableCell>{o.status}</TableCell>

                                            <TableCell className="text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(o.id)
                                                    }
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