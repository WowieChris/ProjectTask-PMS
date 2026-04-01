import { router } from "@inertiajs/react";
import { MapPin } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

export default function EngineerAssignment({
    districts = [],
    engineers = [],
    areaAssignments = [],
    editingDistrict
}: any) {

    const selectedDistrict = useMemo(() => {
        return editingDistrict
            ? districts.find((d: any) => d.id === editingDistrict.id)
            : null;
    }, [editingDistrict, districts]);

    // ✅ STATE
    const [baseEngineer, setBaseEngineer] = useState<any>("");
    const [areaOverrides, setAreaOverrides] = useState<any>({});

    // ✅ IMPORTANT: Sync AFTER refresh / change
    useEffect(() => {
        if (!selectedDistrict) return;

        // Get base engineer from backend
        const newBaseEngineer = selectedDistrict.engineer?.user_id || "";

        // Build overrides from backend
        const newOverrides: any = {};
        areaAssignments.forEach((a: any) => {
            if (selectedDistrict.areas?.some((area: any) => area.id === a.area_id)) {
                newOverrides[a.area_id] = a.user_id;
            }
        });

        // Batch state updates to prevent multiple re-renders
        setBaseEngineer(newBaseEngineer);
        setAreaOverrides(newOverrides);

    }, [selectedDistrict, areaAssignments]); // ✅ depend on selectedDistrict instead of editingDistrict?.id

    const handleBaseEngineerChange = (value: string) => {
        setBaseEngineer(value);
        if (value) {
            setAreaOverrides({});
        }
    };

    const handleAreaOverrideChange = (areaId: string, value: string) => {
        setAreaOverrides({
            ...areaOverrides,
            [areaId]: value || null,
        });
    };

    const handleSave = () => {
        if (!selectedDistrict) return;

        router.post('/ConfigFiles/Field-Eng', {
            district_id: selectedDistrict.id,
            base_engineer: baseEngineer,
            overrides: areaOverrides,
        });
    };

    const getEngineerName = (engineerId: string) => {
        const engineer = engineers.find((e: any) => e.id == engineerId);
        return engineer?.name || "";
    };

    return (
        <div className="flex">
            <div className="flex-1 py-3 px-6 overflow-auto">
                {!selectedDistrict ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                        <MapPin size={40} className="opacity-20 mb-3" />
                        <p>Select a District</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* BASE ENGINEER */}
                        <div>
                            <p className="text-sm font-semibold mb-2">
                                Base Engineer
                            </p>
                            <select
                                value={baseEngineer}
                                onChange={(e) => handleBaseEngineerChange(e.target.value)}
                                className="bg-muted w-full border rounded-lg p-2"
                            >
                                <option value="">Select Engineer</option>
                                {engineers.map((eng: any) => (
                                    <option key={eng.id} value={eng.id}>
                                        {eng.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* AREAS */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold">
                                    Area Overrides
                                </p>
                                <Button
                                    onClick={handleSave}
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
                                >
                                    Save Assignment
                                </Button>
                            </div>

                            {selectedDistrict.areas?.map((area: any) => (
                                <div
                                    key={area.id}
                                    className="flex items-center justify-between border py-2 px-3 rounded-xl"
                                >
                                    <div>
                                        <p>{area.name}</p>
                                        {baseEngineer && Object.keys(areaOverrides).length === 0 && (
                                            <p className="text-xs text-green-500 mt-1">
                                                All areas use base engineer
                                            </p>
                                        )}
                                    </div>

                                    <select
                                        value={areaOverrides[area.id] ?? ""}
                                        onChange={(e) => handleAreaOverrideChange(area.id, e.target.value)}
                                        className="bg-muted border rounded-lg p-1 text-sm"
                                    >
                                        <option value="">
                                            Use Base Engineer
                                            {baseEngineer &&
                                                ` (${getEngineerName(baseEngineer)})`}
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
        </div>
    );
}