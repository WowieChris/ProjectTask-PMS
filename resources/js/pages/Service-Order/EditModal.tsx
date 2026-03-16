import { router } from "@inertiajs/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

type ServiceOrder = {
    id: number;
    tse_assigned: string;
    requesting_party: string;
    department: string;
    location: string;
};

type Props = {
    order: ServiceOrder | null;
    onClose: () => void;
};

export default function EditModal({ order, onClose }: Props) {

    const [data, setData] = useState(() => ({
        tse_assigned: order?.tse_assigned ?? "",
        requesting_party: order?.requesting_party ?? "",
        department: order?.department ?? "",
        location: order?.location ?? "",
    }));

    if (!order) return null;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        router.put(`/service-order/${order.id}`, data, {
            onSuccess: onClose,
        });
    };

    return (
        <Dialog open={!!order} onOpenChange={onClose}>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Edit Service Order</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">

                    <Input
                        placeholder="Technician Assigned"
                        value={data.tse_assigned}
                        onChange={(e) =>
                            setData({ ...data, tse_assigned: e.target.value })
                        }
                    />

                    <Input
                        placeholder="Requesting Party"
                        value={data.requesting_party}
                        onChange={(e) =>
                            setData({ ...data, requesting_party: e.target.value })
                        }
                    />

                    <Input
                        placeholder="Department"
                        value={data.department}
                        onChange={(e) =>
                            setData({ ...data, department: e.target.value })
                        }
                    />

                    <Input
                        placeholder="Location"
                        value={data.location}
                        onChange={(e) =>
                            setData({ ...data, location: e.target.value })
                        }
                    />

                    <div className="flex justify-end gap-2">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button type="submit">
                            Update
                        </Button>

                    </div>

                </form>

            </DialogContent>

        </Dialog>
    );
}