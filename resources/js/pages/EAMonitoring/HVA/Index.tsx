import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";

type HVA = {
    id: number;
    year: number;
    sfe_name: string;
    location: string;
    staff_status: string;
    base_office: string;
    home_address: string;
    hva_frequency: string;
    [key: string]: any; // for availment_1...12
};

type Props = {
    hva_records: HVA[];
    filters: any;
};

const STAFF_STATUS = ["Regular", "Probationary"];
const HVA_FREQ = [
    "Once a Year",
    "Twice a Year",
    "3x a Year",
    "4x a Year",
    "Monthly",
    "Twice a Month",
    "Weekly",
];

export default function HVAIndex({ hva_records, filters }: Props) {
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState<any>({
        year: new Date().getFullYear(),
        sfe_name: "",
        location: "",
        staff_status: "Regular",
        base_office: "",
        home_address: "",
        hva_frequency: "",
        dates: [] as string[],
    });

    const [processing, setProcessing] = useState(false);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const addDate = () => {
        if (form.dates.length >= 12) return;
        setForm({ ...form, dates: [...form.dates, ""] });
    };

    const updateDate = (index: number, value: string) => {
        const newDates = [...form.dates];
        newDates[index] = value;
        setForm({ ...form, dates: newDates });
    };

    const removeDate = (index: number) => {
        const newDates = form.dates.filter((_: any, i: number) => i !== index);
        setForm({ ...form, dates: newDates });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setProcessing(true);

        router.post("/hva", {
            ...form,
            ...Object.fromEntries(
                form.dates.map((d: string, i: number) => [
                    `availment_${i + 1}`,
                    d,
                ])
            ),
        }, {
            onFinish: () => {
                setProcessing(false);
                setShowModal(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="HVA Module" />

            <div className="p-6 space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">HVA Module</h1>

                    <Button onClick={() => setShowModal(true)}>
                        New HVA Record
                    </Button>
                </div>

                {/* TABLE */}
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 text-left">
                            <tr>
                                <th className="p-3">Location</th>
                                <th className="p-3">Name of Staff</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Frequency of Travel</th>
                                <th className="p-3">Availments</th>
                            </tr>
                        </thead>

                        <tbody>
                            {hva_records.map((item) => {
                                const dates = [];
                                for (let i = 1; i <= 12; i++) {
                                    if (item[`availment_${i}`]) {
                                        dates.push(item[`availment_${i}`]);
                                    }
                                }

                                return (
                                    <tr key={item.id} className="border-t border-gray-800">
                                        <td className="p-3">{item.location}</td>
                                        <td className="p-3">{item.sfe_name}</td>
                                        <td className="p-3">{item.staff_status}</td>
                                        <td className="p-3">{item.hva_frequency}</td>
                                        <td className="p-3">
                                            {dates.length > 0
                                                ? dates.join(", ")
                                                : "-"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    {/* BLUR BACKGROUND */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    />

                    {/* MODAL CONTENT */}
                    <div className="relative bg-gray-900 p-6 rounded-xl w-full max-w-3xl z-10">
                        <h2 className="text-xl font-bold mb-4">
                            New HVA Record
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                type="text"
                                name="sfe_name"
                                placeholder="SFE Name"
                                value={form.sfe_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                            />

                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={form.location}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                            />

                            <select
                                name="staff_status"
                                value={form.staff_status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                            >
                                {STAFF_STATUS.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                name="base_office"
                                placeholder="Base Office"
                                value={form.base_office}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                            />

                            <input
                                type="text"
                                name="home_address"
                                placeholder="Home Address"
                                value={form.home_address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                            />

                            <select
                                name="hva_frequency"
                                value={form.hva_frequency}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                            >
                                <option value="">Select Frequency</option>
                                {HVA_FREQ.map((f) => (
                                    <option key={f}>{f}</option>
                                ))}
                            </select>

                            {/* AVAILMENT DATES */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span>Availment Dates</span>
                                    <Button type="button" onClick={addDate}>
                                        + Add Date
                                    </Button>
                                </div>

                                {form.dates.map((d: string, i: number) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input
                                            type="date"
                                            value={d}
                                            onChange={(e) =>
                                                updateDate(i, e.target.value)
                                            }
                                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => removeDate(i)}
                                        >
                                            X
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </Button>

                                <Button type="submit" disabled={processing}>
                                    {processing ? "Saving..." : "Save"}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}