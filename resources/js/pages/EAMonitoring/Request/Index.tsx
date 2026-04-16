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
    item_requested: string;
    date_received: string;
    srf_number: string;
    status: string;
};

type Props = {
    requests: { data: Request[] };
    filters: any;
};

const DEPARTMENTS = [
    "CD-PAYROLL", "SSDD-SEP", "SSDD-PCCT", "CD-AR", "CD", "OD-MI/LI",
    "CD-LI", "CD-FA", "TD", "MISD", "HDBP-RECORDS", "HDBP-SA",
    "ASD-PROCUREMENT", "ASD-INVENTORY", "ASD-COMMS AND BILLING", "IICTD",
    "HD-TR", "HD-SR", "OD", "OP", "OVP-SSDD", "RM", "SUI", "SSDD-MI",
    "LD", "QED", "SSDD", "SSDD/NICE", "(SECTION HEAD, LA)", "OD ZONE 3",
    "OD ZONE 4", "OD ZONE 5", "OD ZONE 6", "OD ZONE 1", "OD ZONE 2",
    "HDBP-PMS", "HDBP", "OP/SMC", "SOM", "MFO", "ASD/LA", "HDD",
    "HDD-LOD", "OVP-MO", "ASD", "SDD", "CD-AP", "OP-OMC", "OP-CMER",
    "OP-DSIT", "LSII",
].sort((a, b) => a.localeCompare(b));

const STATUSES = [
    "Pending", "Done", "ASD Procurement", "Endorsed to OP",
    "Endorsed to CD", "Cancelled", "IICTD Progress",
    "IICTD Signatories", "On Hold", "Releasing",
];

const emptyForm = {
    full_name: "",
    department: "",
    request_title: "",
    request_type: "",
    item_requested: "",
    date_received: "",
    status: "Pending",
};

const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    const utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return utc.toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
    });
};

const statusColor = (status: string) => {
    const map: Record<string, string> = {
        Pending:             "bg-yellow-500/20 text-yellow-400",
        Done:                "bg-green-500/20 text-green-400",
        Cancelled:           "bg-red-500/20 text-red-400",
        "On Hold":           "bg-blue-500/20 text-blue-400",
        "ASD Procurement":   "bg-purple-500/20 text-purple-400",
        "Endorsed to OP":    "bg-indigo-500/20 text-indigo-400",
        "Endorsed to CD":    "bg-indigo-500/20 text-indigo-400",
        "IICTD Progress":    "bg-cyan-500/20 text-cyan-400",
        "IICTD Signatories": "bg-teal-500/20 text-teal-400",
        Releasing:           "bg-orange-500/20 text-orange-400",
    };
    return map[status] || "bg-gray-500/20 text-gray-400";
};

export default function RequestIndex({ requests, filters }: Props) {
    const data = requests.data;

    // ── Filter state ──────────────────────────────────────────────
    const [selected, setSelected]   = useState<number[]>([]);
    const [search, setSearch]       = useState(filters?.search || "");
    const [status, setStatus]       = useState(filters?.status || "All Status");
    const [type, setType]           = useState(filters?.type   || "All Types");
    const [date, setDate]           = useState(filters?.date   || "");

    // ── Create modal state ────────────────────────────────────────
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [form, setForm]                       = useState(emptyForm);
    const [createProcessing, setCreateProcessing] = useState(false);
    const [createErrors, setCreateErrors]       = useState<Record<string, string>>({});

    // ── View modal state ──────────────────────────────────────────
    const [viewItem, setViewItem]       = useState<Request | null>(null);
    const [editingStatus, setEditingStatus] = useState(false);
    const [newStatus, setNewStatus]     = useState("");
    const [statusProcessing, setStatusProcessing] = useState(false);

    // ── Handlers: create ──────────────────────────────────────────
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (createErrors[e.target.name]) {
            setCreateErrors({ ...createErrors, [e.target.name]: "" });
        }
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCreateProcessing(true);
        router.post("/EAMonitoring/Request", form, {
            preserveScroll: true,
            onSuccess: () => {
                setForm(emptyForm);
                setCreateErrors({});
                setShowCreateModal(false);
                setCreateProcessing(false);
            },
            onError: (errs) => {
                setCreateErrors(errs);
                setCreateProcessing(false);
            },
        });
    };

    const handleCloseCreate = () => {
        if (createProcessing) return;
        setShowCreateModal(false);
        setForm(emptyForm);
        setCreateErrors({});
    };

    // ── Handlers: view ────────────────────────────────────────────
    const openView = (item: Request) => {
        setViewItem(item);
        setNewStatus(item.status);
        setEditingStatus(false);
    };

    const closeView = () => {
        setViewItem(null);
        setEditingStatus(false);
    };

    const handleStatusUpdate = () => {
        if (!viewItem) return;
        setStatusProcessing(true);
        router.put(`/EAMonitoring/Request/${viewItem.id}`, {
            ...viewItem,
            status: newStatus,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusProcessing(false);
                setEditingStatus(false);
                // Update local viewItem so modal reflects changes immediately
                setViewItem({ ...viewItem, status: newStatus });
                router.reload({ only: ["requests"] });
            },
            onError: () => setStatusProcessing(false),
        });
    };

    // ── Handlers: select ──────────────────────────────────────────
    const toggleSelect = (id: number) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );

    const toggleSelectAll = () =>
        setSelected(selected.length === data.length ? [] : data.map((d) => d.id));

    const inputClass =
        "w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-sm";

    return (
        <AppLayout>
            <Head title="Request EA Monitoring" />

            <div className="p-6 space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Request Module</h1>
                        <p className="text-gray-400">Manage all employee requests</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Export CSV</Button>
                        <Button type="button" onClick={() => setShowCreateModal(true)}>
                            New Request
                        </Button>
                    </div>
                </div>

                {/* FILTER BAR */}
                <div className="flex gap-3 flex-wrap bg-gray-900 p-4 rounded-xl">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
                    >
                        <option>All Status</option>
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
                    />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
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
                        onClick={() => router.get("/EAMonitoring/Request", { search, status, type, date })}
                    >
                        Filter
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSearch(""); setStatus("All Status");
                            setType("All Types"); setDate("");
                            router.get("/EAMonitoring/Request");
                        }}
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
                                const s = prompt("Enter status:");
                                if (!s) return;
                                router.post("/EAMonitoring/Request/bulk-update", {
                                    ids: selected, status: s,
                                });
                                setSelected([]);
                            }}
                        >
                            Apply Status
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
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
                                        checked={data.length > 0 && selected.length === data.length}
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
                                        <td className="p-3">{formatDate(item.date_received)}</td>
                                        <td className="p-3">{item.srf_number || "—"}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs ${statusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3 space-x-2">
                                            {/* ✅ Opens view modal instead of navigating */}
                                            <Button size="sm" onClick={() => openView(item)}>
                                                View
                                            </Button>
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

            {/* ── VIEW MODAL ─────────────────────────────────────────────── */}
            {viewItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeView} />

                    <div className="relative bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-800">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Request Details</p>
                                <h2 className="text-xl font-bold">{viewItem.request_id}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(viewItem.status)}`}>
                                    {viewItem.status}
                                </span>
                                <button
                                    onClick={closeView}
                                    className="text-gray-400 hover:text-white text-xl leading-none ml-2"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 space-y-5">

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Employee Name", value: viewItem.full_name },
                                    { label: "Department",    value: viewItem.department },
                                    { label: "Request Type",  value: viewItem.request_type },
                                    { label: "Date Received", value: formatDate(viewItem.date_received) },
                                    { label: "SRF Number",    value: viewItem.srf_number || "—" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="space-y-1">
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
                                        <p className="text-sm text-white">{value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Full-width fields */}
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Request Title</p>
                                <p className="text-sm text-white">{viewItem.request_title}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Item Requested</p>
                                <p className="text-sm text-white">{viewItem.item_requested || "—"}</p>
                            </div>

                            {/* ── STATUS EDIT SECTION ── */}
                            <div className="border-t border-gray-800 pt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                                        Update Status
                                    </p>
                                    {!editingStatus && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setEditingStatus(true)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </div>

                                {editingStatus ? (
                                    <div className="space-y-3">
                                        {/* Status dropdown */}
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Status</label>
                                            <select
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}
                                                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
                                            >
                                                {STATUSES.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 justify-end">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    setEditingStatus(false);
                                                    setNewStatus(viewItem.status);
                                                }}
                                                disabled={statusProcessing}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={handleStatusUpdate}
                                                disabled={statusProcessing}
                                            >
                                                {statusProcessing ? "Saving..." : "Save Changes"}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-500">
                                        Click <span className="text-gray-300">Edit</span> to update the status.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── CREATE MODAL ───────────────────────────────────────────── */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseCreate} />

                    <div className="relative bg-gray-900 border border-gray-700 p-6 rounded-xl w-full max-w-xl z-10 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">New Request</h2>

                        <form onSubmit={handleCreateSubmit} className="space-y-3">

                            <div>
                                <input
                                    name="full_name"
                                    placeholder="Full Name"
                                    value={form.full_name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {createErrors.full_name && (
                                    <p className="text-red-400 text-xs mt-1">{createErrors.full_name}</p>
                                )}
                            </div>

                            <div>
                                <select
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">Select Department</option>
                                    {DEPARTMENTS.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                                {createErrors.department && (
                                    <p className="text-red-400 text-xs mt-1">{createErrors.department}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    name="request_title"
                                    placeholder="Request Title"
                                    value={form.request_title}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {createErrors.request_title && (
                                    <p className="text-red-400 text-xs mt-1">{createErrors.request_title}</p>
                                )}
                            </div>

                            <div>
                                <select
                                    name="request_type"
                                    value={form.request_type}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">Select Type</option>
                                    <option>For Purchase</option>
                                    <option>Borrowing</option>
                                    <option>Accountability</option>
                                    <option>Access</option>
                                    <option>Assistance</option>
                                    <option>Return to Supplier</option>
                                </select>
                                {createErrors.request_type && (
                                    <p className="text-red-400 text-xs mt-1">{createErrors.request_type}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    name="item_requested"
                                    placeholder="Item Requested"
                                    value={form.item_requested}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {createErrors.item_requested && (
                                    <p className="text-red-400 text-xs mt-1">{createErrors.item_requested}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Date Received</label>
                                <input
                                    type="date"
                                    name="date_received"
                                    value={form.date_received}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {createErrors.date_received && (
                                    <p className="text-red-400 text-xs mt-1">{createErrors.date_received}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="ghost" onClick={handleCloseCreate} disabled={createProcessing}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={createProcessing}>
                                    {createProcessing ? "Creating..." : "Create"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}