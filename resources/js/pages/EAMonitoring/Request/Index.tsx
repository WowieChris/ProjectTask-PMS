import { Head, router } from "@inertiajs/react";
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

type Props = {
    requests: {
        data: Request[];
    };
    filters: any;
};

export default function RequestIndex({ requests, filters }: Props) {
    const data = requests.data;

    const [selected, setSelected] = useState<number[]>([]);
    const [search, setSearch] = useState(filters?.search || "");
    const [status, setStatus] = useState(filters?.status || "All Status");
    const [type, setType] = useState(filters?.type || "All Types");
    const [date, setDate] = useState(filters?.date || "");

    // ✅ MODAL STATE
    const [showModal, setShowModal] = useState(false);

    // ✅ FORM STATE
    const [form, setForm] = useState({
        request_id: "",
        full_name: "",
        department: "",
        request_title: "",
        request_type: "",
        item_requested: "",
        date_received: "",
        status: "Pending",
    });

    const [processing, setProcessing] = useState(false);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProcessing(true);

        router.post("/EAMonitoring/Request", form, {
            onSuccess: () => {
                setProcessing(false);
                setShowModal(false);
            },
        });
    };

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

                        {/* ✅ FIXED BUTTON */}
                        <Button
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            New Request
                        </Button>
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

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700"
                    >
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Done</option>
                        <option>ASD Procurement</option>
                        <option>Endorsed to OP</option>
                        <option>Endorsed to CD</option>
                        <option>Cancelled</option>
                        <option>IICTD Progress</option>
                        <option>IICTD Signatories</option>
                        <option>On Hold</option>
                        <option>Releasing</option>
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700"
                    />

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700"
                    >
                        <option>All Types</option>
                        <option>For Purchase</option>
                        <option>Borrowing</option>
                        <option>Accountability</option>
                        <option>Access</option>
                        <option>Assistance</option>
                        <option>Return to Supplier</option>
                    </select>

                    <Button
                        variant="secondary"
                        onClick={() =>
                            router.get("/EAMonitoring/Request", {
                                search,
                                status,
                                type,
                                date,
                            })
                        }
                    >
                        Filter
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={() => router.get("/EAMonitoring/Request")}
                    >
                        Clear
                    </Button>
                </div>

                {/* BULK ACTION */}
                {selected.length > 0 && (
                    <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-xl flex items-center gap-4">
                        <span>{selected.length} selected</span>

                        <Button
                            size="sm"
                            onClick={() => {
                                const newStatus = prompt("Enter status:");
                                if (!newStatus) return;

                                router.post("/EAMonitoring/Request/bulk-update", {
                                    ids: selected,
                                    status: newStatus,
                                });

                                setSelected([]);
                            }}
                        >
                            Apply Status
                        </Button>

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
                                        checked={selected.length === data.length}
                                    />
                                </th>
                                <th className="p-3">Request ID</th>
                                <th className="p-3">Employee Name</th>
                                <th className="p-3">Department</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Date Received</th>
                                <th className="p-3">SRF Number</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <tr key={item.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                            />
                                        </td>
                                        <td className="p-3 font-semibold">{item.request_id}</td>
                                        <td className="p-3">{item.full_name}</td>
                                        <td className="p-3">{item.department}</td>
                                        <td className="p-3 truncate max-w-[200px]">{item.request_title}</td>
                                        <td className="p-3">{item.request_type}</td>
                                        <td className="p-3">{item.date_received}</td>
                                        <td className="p-3">{item.srf_number || "-"}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs ${statusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3 space-x-2">
                                            <Button size="sm">View</Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => {
                                                    if (confirm("Delete this request?")) {
                                                        router.delete(`/EAMonitoring/Request/${item.id}`);
                                                    }
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center p-6 text-gray-400">
                                        No requests found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🔥 MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    />

                    <div className="relative bg-gray-900 p-6 rounded-xl w-full max-w-xl z-10">
                        <h2 className="text-xl font-bold mb-4">New Request</h2>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input name="request_id" placeholder="Request ID" onChange={handleChange} className="input w-full" />
                            <input name="full_name" placeholder="Full Name" onChange={handleChange} className="input w-full" />
                            <input name="department" placeholder="Department" onChange={handleChange} className="input w-full" />
                            <input name="request_title" placeholder="Request Title" onChange={handleChange} className="input w-full" />

                            <select name="request_type" onChange={handleChange} className="input w-full">
                                <option value="">Select Type</option>
                                <option>For Purchase</option>
                                <option>Borrowing</option>
                                <option>Accountability</option>
                                <option>Access</option>
                                <option>Assistance</option>
                                <option>Return to Supplier</option>
                            </select>

                            <input name="item_requested" placeholder="Item Requested" onChange={handleChange} className="input w-full" />
                            <input type="date" name="date_received" onChange={handleChange} className="input w-full" />

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>

                                <Button type="submit" disabled={processing}>
                                    {processing ? "Creating..." : "Create"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}