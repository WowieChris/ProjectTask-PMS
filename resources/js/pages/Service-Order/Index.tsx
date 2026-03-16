import { Head, router, useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import AppLayout from "@/layouts/app-layout";

import ServiceOrderTable from "./Components/ServiceOrderTable";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";

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
    orders: ServiceOrder[];
};

export default function Index({ orders }: Props) {

    const [q, setQ] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState<ServiceOrder | null>(null);

    const { data, setData, post, processing, reset } = useForm({
        tse_assigned: "",
        requesting_party: "",
        department: "",
        location: "",
        issues_encountered: "",
    });

    const filtered = useMemo(() => {
        const query = q.toLowerCase();

        if (!query) return orders;

        return orders.filter((o) =>
            o.tse_jo_no.toLowerCase().includes(query) ||
            o.tse_assigned.toLowerCase().includes(query) ||
            o.requesting_party.toLowerCase().includes(query)
        );

    }, [orders, q]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post("/service-order", {
            onSuccess: () => {
                reset();
                setModalOpen(false);
            },
        });
    };

    const handleEdit = (order: ServiceOrder) => {
        setEditingOrder(order);
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

                <Card>

                    <CardHeader className="flex justify-between items-center">

                        <CardTitle>Service Orders</CardTitle>

                        <div className="flex gap-4">

                            <Input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search JO..."
                                className="w-80"
                            />

                            <Button onClick={() => setModalOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Service Order
                            </Button>

                        </div>

                    </CardHeader>

                    <CardContent>

                        <ServiceOrderTable
                            orders={filtered}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    </CardContent>

                </Card>

                <CreateModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    data={data}
                    setData={setData}
                    processing={processing}
                    onSubmit={handleSubmit}
                />

                <EditModal
                    order={editingOrder}
                    onClose={() => setEditingOrder(null)}
                />

            </div>

        </AppLayout>
    );
}