import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { MapPin, User } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function EngineerAssignment({ districts = [], engineers = [], areaAssignments = [], editingDistrict }: any) {

    const [selectedDistrict, setSelectedDistrict] = useState<any>(editingDistrict ?? null);;
    const [areaOverrides, setAreaOverrides] = useState<any>({});
    const [baseEngineer, setBaseEngineer] = useState<any>("");
 // Sync when editingDistrict changes from parent
useEffect(() => {
    if (editingDistrict) {
        // Find the full district object with engineer relationship
    const fullDistrict = districts.find((d: any) => d.id === editingDistrict.id);
    if (!fullDistrict) return;
      setSelectedDistrict(editingDistrict);
      setBaseEngineer(fullDistrict.engineer?.user_id || "");

      const overrides: any = {};
      areaAssignments.forEach((a: any) => {
        if (editingDistrict.areas.some((area: any) => area.id === a.area_id)) {
          overrides[a.area_id] = a.user_id;
        }
      });
      setAreaOverrides(overrides);
    }
  }, [editingDistrict]);
    return (
            <div className="flex">
                        {/* LEFT PANEL = DISTRICTS */}
                        {/* <div className="w-1/3 border-r min-h-0 p-4 space-y-4 overflow-y-auto">

                            <p className="text-xs uppercase text-muted-foreground font-bold">
                                Districts
                            </p>

                            {districts.map((district: any) => (
                                <div
                                    key={district.id}
                                    onClick={() => {
                                        setSelectedDistrict(district);

                                        // 🔥 LOAD BASE ENGINEER
                                        setBaseEngineer(district.engineer?.user_id || "");

                                        // 🔥 LOAD AREA OVERRIDES
                                        const overrides: any = {};

                                        areaAssignments.forEach((a: any) => {
                                            if (district.areas.some((area: any) => area.id === a.area_id)) {
                                                overrides[a.area_id] = a.user_id;
                                            }
                                        });

                                        setAreaOverrides(overrides);
                                    }}
                                    className={`p-3 rounded-xl border cursor-pointer
                                        ${selectedDistrict?.id === district.id
                                            ? "bg-primary/10 border-primary"
                                            : "hover:bg-muted"
                                        }`}
                                >
                                    <p className="font-medium">{district.name}</p>
                                </div>
                            ))}

                        </div> */}

                        {/* RIGHT PANEL */}
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
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setBaseEngineer(value);

                                                if (value) {
                                                    setAreaOverrides({}); // 🔥 CLEAR overrides
                                                }
                                            }}
                                            className="w-full border rounded-lg p-2 text-foreground bg-background"
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
                                                onClick={() => {
                                                    router.post('/ConfigFiles/Field-Eng', {
                                                        district_id: selectedDistrict.id,
                                                        base_engineer: baseEngineer,
                                                        overrides: areaOverrides,
                                                    });
                                                }}
                                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
                                            >
                                                Save Assignment
                                            </Button>
                                        
                                        </div>

                                        {selectedDistrict.areas.map((area: any) => (

                                            <div
                                                key={area.id}
                                                className="flex items-center justify-between border py-2 px-3 rounded-xl"
                                            >
                                                <span>
                                                    {area.name}
                                                    {baseEngineer && (
                                                        <p className="text-xs text-green-500 mt-1">
                                                            All areas assigned to selected base engineer
                                                        </p>
                                                    )}
                                                </span>

                                                <select
                                                    value={areaOverrides[area.id] ?? ""}
                                                    onChange={(e) =>
                                                        setAreaOverrides({
                                                            ...areaOverrides,
                                                            [area.id]: e.target.value || null,
                                                        })
                                                    }
                                                    className="border rounded-lg p-1 text-sm text-foreground bg-background"
                                                >
                                                    {/* ALWAYS show base option */}
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
    </div>
    );
}