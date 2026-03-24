import { Head } from "@inertiajs/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";

export default function TechnicalSupportEng() {
    const [data] = useState([
        {
            id: 1,
            ticket_no: "TS-001",
            issue: "Internet not working",
            status: "Pending",
        },
    ]);

    return (
        <AppLayout>
            <Head title="Technical Support Engineering" />

            <div className="p-6 space-y-4">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Technical Support Engineering
                        </h1>
                        <p className="text-gray-500">
                            Manage Technical Support tickets and requests.
                        </p>
                    </div>

                    <Button>Create Ticket</Button>
                </div>

                {/* TABLE */}
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 text-left">
                            <tr>
                                <th className="p-3">Ticket No</th>
                                <th className="p-3">Issue</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-gray-700"
                                >
                                    <td className="p-3">{item.ticket_no}</td>
                                    <td className="p-3">{item.issue}</td>
                                    <td className="p-3">{item.status}</td>
                                    <td className="p-3 space-x-2">
                                        <Button size="sm">Edit</Button>
                                        <Button size="sm" variant="destructive">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}