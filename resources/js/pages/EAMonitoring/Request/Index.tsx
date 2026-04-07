import { Head } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";

type Request = {
    id: number;
    request_id: string;
    full_name: string;
    department: string;
    request_title: string;
    request_type: string;
    date_received: string;
    srf_number: string;
    status: string;
};

export default function RequestIndex() {
    // 🔹 MOCK DATA (replace with props later)
    const [data, setData] = useState<Request[]>([
        {
            id: 1,
            request_id: "REQ-001",
            full_name: "John Doe",
            department: "IT",
            request_title: "Laptop Request",
            request_type: "For Purchase",
            date_received: "2026-01-01",
            srf_number: "",
            status: "Pending",
        },
    ]);

    const [selected, setSelected] = useState<number[]>([]);
    const [search, setSearch] = useState("");

    const toggleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selected.length === data.length) {
            setSelected([]);
        } else {
            setSelected(data.map((d) => d.id));
        }
    };

    const statusColor = (status: string) => {
        const map: Record<string, string> = {
            Pending: "bg-yellow-500/20 text-yellow-400",
            Done: "bg-green-500/20 text-green-400",
            Cancelled: "bg-red-500/20 text-red-400",
            "On Hold": "bg-blue-500/20 text-blue-400",
        };
        return map[status] || "bg-gray-500/20 text-gray-400";
    };

    return (
        <AppLayout>
            <Head title="Request EA Monitoring" />

            <div className="p-6 space-y-6">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Request Module
                        </h1>
                        <p className="text-gray-400">
                            Manage all employee requests
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline">Export CSV</Button>
                        <Button>New Request</Button>
                    </div>
                </div>

                {/* FILTER BAR */}
                <div className="flex gap-3 flex-wrap bg-gray-900 p-4 rounded-xl">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select className="px-3 py-2 rounded bg-gray-800 border border-gray-700">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Done</option>
                        <option>ASD Procurement</option>
                        <option>Endorsed to OP</option>
                        <option>Endorsed to CD</option>
                        <option>Cancelled</option>
                        <option>IICTD Process</option>
                        <option>IICTD Signatories</option>
                        <option>On Hold</option>
                        <option>Releasing</option>
                    </select>

                    <input
                        type="date"
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700"
                    />

                    <select className="px-3 py-2 rounded bg-gray-800 border border-gray-700">
                        <option>All Types</option>
                        <option>For Purchase</option>
                        <option>Borrowing</option>
                        <option>Accountability</option>
                        <option>Access</option>
                        <option>Assistance</option>
                        <option>Return to Supplier</option>
                    </select>

                    <Button variant="secondary">Filter</Button>
                    <Button variant="ghost">Clear</Button>
                </div>

                {/* BULK ACTION */}
                {selected.length > 0 && (
                    <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-xl flex items-center gap-4">
                        <span>
                            {selected.length} selected
                        </span>

                        <select className="px-2 py-1 bg-gray-800 border border-gray-700 rounded">
                            <option>Set Status</option>
                            <option>Pending</option>
                            <option>Done</option>
                        </select>

                        <Button size="sm">Apply</Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelected([])}
                        >
                            Cancel
                        </Button>
                    </div>
                )}

                {/* TABLE */}
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 text-left">
                            <tr>
                                <th className="p-3">
                                    <input
                                        type="checkbox"
                                        onChange={toggleSelectAll}
                                        checked={
                                            selected.length === data.length
                                        }
                                    />
                                </th>
                                <th className="p-3">Request ID</th>
                                <th className="p-3">Employee Name</th>
                                <th className="p-3">Department</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Date Recieved</th>
                                <th className="p-3">SRF Number</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                                <th className="p-3">Files</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t border-gray-800 hover:bg-gray-800/50"
                                    >
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(
                                                    item.id
                                                )}
                                                onChange={() =>
                                                    toggleSelect(item.id)
                                                }
                                            />
                                        </td>
                                        <td className="p-3 font-semibold">
                                            {item.request_id}
                                        </td>
                                        <td className="p-3">
                                            {item.full_name}
                                        </td>
                                        <td className="p-3">
                                            {item.department}
                                        </td>
                                        <td className="p-3 truncate max-w-[200px]">
                                            {item.request_title}
                                        </td>
                                        <td className="p-3">
                                            {item.request_type}
                                        </td>
                                        <td className="p-3">
                                            {item.date_received}
                                        </td>
                                        <td className="p-3">
                                            {item.srf_number}
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${statusColor(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3 space-x-2">
                                            <Button size="sm">
                                                View
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="text-center p-6 text-gray-400"
                                    >
                                        No requests found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}