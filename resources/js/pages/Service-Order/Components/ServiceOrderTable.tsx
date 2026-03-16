import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import StatusBadge from "./StatusBadge";

type Order = {
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
    orders: Order[];
    onEdit: (order: Order) => void;
    onDelete: (id: number) => void;
};

export default function ServiceOrderTable({ orders, onEdit, onDelete }: Props) {

    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead>JO No</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                {orders.map((o) => (
                    <TableRow key={o.id}>

                        <TableCell>{o.tse_jo_no}</TableCell>
                        <TableCell>{o.tse_assigned}</TableCell>
                        <TableCell>{o.requesting_party}</TableCell>
                        <TableCell>{o.department}</TableCell>
                        <TableCell>{o.location}</TableCell>
                        <TableCell>{o.date_reported}</TableCell>

                        <TableCell>
                            <StatusBadge status={o.status} />
                        </TableCell>

                        <TableCell className="text-right space-x-2">

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onEdit(o)}
                            >
                                Edit
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => onDelete(o.id)}
                            >
                                Delete
                            </Button>

                        </TableCell>

                    </TableRow>
                ))}

            </TableBody>

        </Table>
    );
}