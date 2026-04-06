import { router } from "@inertiajs/react";
import { MapPin, User, ChevronDown, Save, RefreshCw } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

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

    const [baseEngineer, setBaseEngineer] = useState<any>("");
    const [areaOverrides, setAreaOverrides] = useState<any>({});
    const [saving, setSaving] = useState(false);

    // ✅ option 1 — suppress (acceptable when you know what you're doing)
    useEffect(() => {
        if (!selectedDistrict) return;

        const newBaseEngineer = selectedDistrict.engineer?.user_id || "";
        const newOverrides: any = {};
        areaAssignments.forEach((a: any) => {
            if (selectedDistrict.areas?.some((area: any) => area.id === a.area_id)) {
                newOverrides[a.area_id] = a.user_id;
            }
        });


        setBaseEngineer(newBaseEngineer);
        setAreaOverrides(newOverrides);
    }, [selectedDistrict, areaAssignments]);

    const handleBaseEngineerChange = (value: string) => {
        setBaseEngineer(value);
        if (value) setAreaOverrides({});
    };

    const handleAreaOverrideChange = (areaId: string, value: string) => {
        setAreaOverrides({ ...areaOverrides, [areaId]: value || null });
    };

    const handleSave = () => {
        if (!selectedDistrict) return;
        setSaving(true);
        router.post('/ConfigFiles/Field-Eng', {
            district_id: selectedDistrict.id,
            base_engineer: baseEngineer,
            overrides: areaOverrides,
        }, {
            onFinish: () => setSaving(false),
        });
    };

    const getEngineerName = (engineerId: string) => {
        return engineers.find((e: any) => e.id == engineerId)?.name || "";
    };

    const getEngineerInitials = (engineerId: string) => {
        const name = getEngineerName(engineerId);
        return name ? name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : '?';
    };

    const overrideCount = Object.values(areaOverrides).filter(Boolean).length;

    // ── Empty state ──
    if (!selectedDistrict) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center p-6">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <MapPin size={20} className="text-muted-foreground/40" />
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">No District Selected</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Click Edit on a district to assign engineers
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={selectedDistrict.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full"
            >
                {/* District header */}
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-violet-500/10 flex items-center justify-center">
                            <MapPin size={12} className="text-violet-400" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-foreground">{selectedDistrict.name}</p>
                            <p className="text-[10px] text-muted-foreground">
                                {selectedDistrict.areas?.length ?? 0} areas
                                {overrideCount > 0 && ` · ${overrideCount} override${overrideCount !== 1 ? 's' : ''}`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-5">

                    {/* Base Engineer */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <User size={12} className="text-muted-foreground" />
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                Base Engineer
                            </p>
                        </div>

                        <div className="relative">
                            <select
                                value={baseEngineer}
                                onChange={(e) => handleBaseEngineerChange(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-input bg-background px-3 py-2.5 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 cursor-pointer"
                            >
                                <option value="">— Select Engineer —</option>
                                {engineers.map((eng: any) => (
                                    <option key={eng.id} value={eng.id}>{eng.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Base engineer pill */}
                        {baseEngineer && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10"
                            >
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="text-[10px] font-bold text-primary">
                                        {getEngineerInitials(baseEngineer)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-foreground">{getEngineerName(baseEngineer)}</p>
                                    <p className="text-[10px] text-muted-foreground">Assigned to all areas</p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Area Overrides */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <RefreshCw size={12} className="text-muted-foreground" />
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                Area Overrides
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            {selectedDistrict.areas?.map((area: any, i: number) => {
                                const hasOverride = !!areaOverrides[area.id];
                                return (
                                    <motion.div
                                        key={area.id}
                                        initial={{ opacity: 0, x: -4 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className={`rounded-lg border transition-colors ${hasOverride
                                            ? 'border-amber-500/20 bg-amber-500/5'
                                            : 'border-border bg-muted/20'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between px-3 py-2 gap-3">
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium truncate">{area.name}</p>
                                                {!hasOverride && baseEngineer && (
                                                    <p className="text-[10px] text-emerald-500 mt-0.5">
                                                        ↳ {getEngineerName(baseEngineer)}
                                                    </p>
                                                )}
                                                {hasOverride && (
                                                    <p className="text-[10px] text-amber-500 mt-0.5">
                                                        Override active
                                                    </p>
                                                )}
                                            </div>

                                            <div className="relative shrink-0">
                                                <select
                                                    value={areaOverrides[area.id] ?? ""}
                                                    onChange={(e) => handleAreaOverrideChange(area.id, e.target.value)}
                                                    className={`appearance-none rounded-md border px-2 py-1.5 pr-6 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring/50 ${hasOverride
                                                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                                        : 'border-input bg-background text-foreground'
                                                        }`}
                                                >
                                                    <option value="">Use Base</option>
                                                    {engineers.map((eng: any) => (
                                                        <option key={eng.id} value={eng.id}>{eng.name}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Save footer */}
                <div className="px-4 py-3 border-t border-border bg-card/50 shrink-0">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full h-8 text-xs font-medium"
                    >
                        {saving ? (
                            <span className="flex items-center gap-2">
                                <RefreshCw size={12} className="animate-spin" /> Saving...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Save size={12} /> Save Assignment
                            </span>
                        )}
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}