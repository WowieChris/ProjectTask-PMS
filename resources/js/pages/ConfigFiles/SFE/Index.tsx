import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { MapPin, User } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

export default function SeniorEngineerAssignment({ divisions, engineers, districtOverrides }: any) {

    const [selectedDivision, setSelectedDivision] = useState<any>(null);
    const [districtOverridesState, setDistrictOverridesState] = useState<any>({});
    const [baseEngineer, setBaseEngineer] = useState<any>("");

    return (
        <AppLayout>
            <Head title="Senior Engineer Assignment" />

            <div className="flex flex-col h-[calc(100vh-5rem)]">
                <Card className="flex flex-col flex-1 overflow-hidden pt-2 gap-0">

                    {/* HEADER */}
                    <CardHeader className="border-b flex">
                        <div className="flex justify-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center">
                                <User size={20} />
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-lg font-semibold">Senior Engineer Assignment</h1>
                                <p className="text-xs text-muted-foreground uppercase">
                                    Division → Base → District Override
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 overflow-hidden p-0">

                        {/* LEFT PANEL = DIVISIONS */}
                        <div className="w-1/3 border-r min-h-0 p-4 space-y-4 overflow-y-auto">

                            <p className="text-xs uppercase text-muted-foreground font-bold">
                                Divisions
                            </p>

                            {divisions.map((division: any) => (
                                <div
                                    key={division.id}
                                    onClick={() => {
                                        setSelectedDivision(division);

                                        // LOAD BASE SENIOR ENGINEER
                                        setBaseEngineer(division.engineer?.user_id || "");

                                        // LOAD DISTRICT OVERRIDES
                                        const overrides: any = {};

                                        districtOverrides.forEach((o: any) => {
                                            if (division.districts.some((d: any) => d.id === o.district_id)) {
                                                overrides[o.district_id] = o.user_id;
                                            }
                                        });

                                        setDistrictOverridesState(overrides);
                                    }}
                                    className={`p-3 rounded-xl border cursor-pointer
                                        ${selectedDivision?.id === division.id
                                            ? "bg-primary/10 border-primary"
                                            : "hover:bg-muted"
                                        }`}
                                >
                                    <p className="font-medium">{division.name}</p>
                                </div>
                            ))}

                        </div>

                        {/* RIGHT PANEL */}
                        <div className="flex-1 py-3 px-6 overflow-auto">

                            {!selectedDivision ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                    <MapPin size={40} className="opacity-20 mb-3" />
                                    <p>Select a Division</p>
                                </div>
                            ) : (
                                <div className="space-y-6">

                                    {/* BASE SENIOR ENGINEER */}
                                    <div>
                                        <p className="text-sm font-semibold mb-2">
                                            Base Senior Engineer
                                        </p>

                                        <select
                                            value={baseEngineer}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setBaseEngineer(value);

                                                if (value) {
                                                    setDistrictOverridesState({}); // CLEAR overrides
                                                }
                                            }}
                                            className="w-full border rounded-lg p-2 test-foreground bg-background"
                                        >
                                            <option value="">Select Senior Engineer</option>

                                            {engineers.map((eng: any) => (
                                                <option key={eng.id} value={eng.id}>
                                                    {eng.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* DISTRICT OVERRIDES */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold">
                                                District Overrides
                                            </p>
                                            <button
                                                onClick={() => {
                                                    router.post('/Config-Files/Senior-Eng', {
                                                        division_id: selectedDivision.id,
                                                        base_engineer: baseEngineer,
                                                        overrides: districtOverridesState,
                                                    });
                                                }}
                                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
                                            >
                                                Save Assignment
                                            </button>
                                        </div>

                                        {selectedDivision.districts.map((district: any) => (
                                            <div
                                                key={district.id}
                                                className="flex items-center justify-between border py-2 px-3 rounded-xl"
                                            >
                                                <span>
                                                    {district.name}
                                                    {baseEngineer && (
                                                        <p className="text-xs text-green-500 mt-1">
                                                            All districts assigned to selected base engineer
                                                        </p>
                                                    )}
                                                </span>

                                                <select
                                                    value={districtOverridesState[district.id] ?? ""}
                                                    onChange={(e) =>
                                                        setDistrictOverridesState({
                                                            ...districtOverridesState,
                                                            [district.id]: e.target.value || null,
                                                        })
                                                    }
                                                    className="border rounded-lg p-1 text-sm text-foreground bg-background"
                                                >
                                                    <option value="">
                                                        Use Base Engineer
                                                        {baseEngineer &&
                                                            ` (${engineers.find((e: any) => e.id == baseEngineer)?.name || ""})`}
                                                    </option>

                                                    {engineers.map((eng: any) => (
                                                        <option key={eng.id} value={eng.id}>
                                                            {eng.name}
                                                        </option>
                                                    ))}
                                                </select>
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