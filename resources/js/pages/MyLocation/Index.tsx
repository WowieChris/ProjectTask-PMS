import { Head, usePage } from "@inertiajs/react";
import { MapPin, Layers, Building2, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";


interface Branch {
    id: number;
    name: string;
}

interface Area {
    id: number;
    name: string;
    branches: Branch[];
}

interface District {
    id: number;
    name: string;
    areas: Area[];
}

interface PageProps extends Record<string, unknown> {
    district: District;
}

export default function MyLocation() {

    const { district } = usePage<PageProps>().props;

    const [selectedArea, setSelectedArea] = useState<Area | null>(null);

    const areas = useMemo(() => district?.areas || [], [district]);

    return (
        <AppLayout>
            <Head title="My Location" />

            <div className="flex flex-col h-full">

                <Card className="flex flex-col flex-1 overflow-hidden">

                    {/* Header */}
                    <CardHeader className="border-b flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                            <MapPin size={20} />
                        </div>

                        <div>
                            <h1 className="text-lg font-semibold">My Location</h1>
                            <p className="text-xs text-muted-foreground uppercase">
                                District Overview
                            </p>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 overflow-hidden p-0">

                        {/* LEFT PANEL */}
                        <div className="w-1/3 border-r p-4 space-y-4 overflow-auto">

                            {/* District */}
                            <div className="p-4 rounded-xl bg-muted border">
                                <div className="flex items-center gap-3">
                                    <Layers size={18} />
                                    <div>
                                        <p className="text-xs uppercase text-muted-foreground">
                                            District
                                        </p>
                                        <p className="font-semibold">{district?.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Areas */}
                            <div className="space-y-2">

                                <p className="text-xs uppercase text-muted-foreground font-bold">
                                    Areas
                                </p>

                                {areas.map((area) => (
                                    <div
                                        key={area.id}
                                        onClick={() => setSelectedArea(area)}
                                        className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center
                    ${selectedArea?.id === area.id
                                                ? "bg-primary/10 border-primary"
                                                : "bg-card hover:bg-muted"
                                            }`}
                                    >

                                        <div className="flex items-center gap-3">
                                            <Layers size={16} />
                                            <span className="font-medium">{area.name}</span>
                                        </div>

                                        <ChevronRight size={16} />

                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* RIGHT PANEL */}
                        <div className="flex-1 p-6 overflow-auto">

                            {!selectedArea ? (

                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                    <MapPin size={40} className="opacity-20 mb-3" />
                                    <p>Select an Area to view branches</p>
                                </div>

                            ) : (

                                <div className="space-y-4">

                                    <h2 className="text-xl font-semibold">
                                        {selectedArea.name} Branches
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4">

                                        {selectedArea.branches.map((branch) => (

                                            <div
                                                key={branch.id}
                                                className="p-4 border rounded-xl flex items-center gap-3 bg-card hover:border-primary transition"
                                            >

                                                <Building2 size={18} />

                                                <div>
                                                    <p className="font-medium">{branch.name}</p>
                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            )}

                        </div>

                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}