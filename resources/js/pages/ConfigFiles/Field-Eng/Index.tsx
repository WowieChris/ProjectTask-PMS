import { router } from "@inertiajs/react";
import { MapPin, User, ChevronDown, Save, RefreshCw, AlertTriangle, X } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
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
    const [confirmOpen, setConfirmOpen] = useState(false);

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

    const getEngineerName = useCallback((engineerId: string) => {
        return engineers.find((e: any) => e.id == engineerId)?.name || "";
    }, [engineers]);

    const getEngineerInitials = useCallback((engineerId: string) => {
        const name = getEngineerName(engineerId);
        return name ? name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : '?';
    }, [getEngineerName]);

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
        setConfirmOpen(false);
        router.post('/ConfigFiles/Field-Eng', {
            district_id: selectedDistrict.id,
            base_engineer: baseEngineer,
            overrides: areaOverrides, // sends {} when base changed → clears DB overrides
        }, {
            onFinish: () => setSaving(false),
        });
    };

    const overrideCount = Object.values(areaOverrides).filter(Boolean).length;

    const confirmSummary = useMemo(() => {
        if (!selectedDistrict) return [];
        return selectedDistrict.areas?.map((area: any) => {
            const hasOverride = !!areaOverrides[area.id];
            const engineerId = hasOverride ? areaOverrides[area.id] : baseEngineer;
            return {
                area: area.name,
                engineer: getEngineerName(engineerId),
                isOverride: hasOverride,
            };
        }) ?? [];
    }, [selectedDistrict, areaOverrides, baseEngineer, getEngineerName]);

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
        <>
            {/* ── Confirm Modal ── */}
            <AnimatePresence>
                {confirmOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto overflow-hidden">

                                {/* Modal header */}
                                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Save size={15} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">Confirm Assignment</p>
                                            <p className="text-[10px] text-muted-foreground">{selectedDistrict.name}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setConfirmOpen(false)}
                                        className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                                    >
                                        <X size={14} className="text-muted-foreground" />
                                    </button>
                                </div>

                                {/* Summary */}
                                <div className="px-5 py-4 space-y-3 max-h-72 overflow-y-auto">

                                    {/* Base engineer row */}
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-[11px] font-bold text-primary">
                                                {getEngineerInitials(baseEngineer)}
                                            </span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[11px] font-semibold text-foreground truncate">
                                                {getEngineerName(baseEngineer) || '— None —'}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground">Base engineer</p>
                                        </div>
                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider shrink-0">
                                            Base
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-px bg-border" />
                                        <span className="text-[10px] text-muted-foreground">Area breakdown</span>
                                        <div className="flex-1 h-px bg-border" />
                                    </div>

                                    {/* Area rows */}
                                    {confirmSummary.map((row: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -4 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className={`flex items-center gap-3 p-2.5 rounded-xl border ${row.isOverride
                                                ? 'bg-amber-500/5 border-amber-500/20'
                                                : 'bg-muted/30 border-border'
                                                }`}
                                        >
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${row.isOverride
                                                ? 'bg-amber-500/15 text-amber-400'
                                                : 'bg-primary/10 text-primary'
                                                }`}>
                                                {row.engineer
                                                    ? row.engineer.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                                                    : '?'
                                                }
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[11px] font-medium text-foreground truncate">{row.area}</p>
                                                <p className={`text-[10px] truncate ${row.isOverride ? 'text-amber-500/80' : 'text-muted-foreground'}`}>
                                                    {row.engineer || 'No engineer'}
                                                </p>
                                            </div>
                                            {row.isOverride && (
                                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 uppercase tracking-wider shrink-0">
                                                    Override
                                                </span>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Warning if no base engineer */}
                                {!baseEngineer && (
                                    <div className="mx-5 mb-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                        <AlertTriangle size={13} className="text-yellow-500 shrink-0" />
                                        <p className="text-[11px] text-yellow-500">No base engineer selected</p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 px-5 py-4 border-t border-border bg-muted/20">
                                    <Button
                                        variant="secondary"
                                        className="flex-1 h-9 text-xs"
                                        onClick={() => setConfirmOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="flex-1 h-9 text-xs"
                                        onClick={handleSave}
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <span className="flex items-center gap-1.5">
                                                <RefreshCw size={11} className="animate-spin" /> Saving...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5">
                                                <Save size={11} /> Confirm Save
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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

                            {baseEngineer && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-1 px-2 py-2 rounded-lg bg-primary/5 border border-primary/10"
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <RefreshCw size={12} className="text-muted-foreground" />
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                        Area Overrides
                                    </p>
                                </div>
                                <span className="text-[10px] text-muted-foreground">
                                    {selectedDistrict.areas?.length ?? 0} areas
                                </span>
                            </div>

                            <div className="space-y-2">
                                {selectedDistrict.areas?.map((area: any, i: number) => {
                                    const hasOverride = !!areaOverrides[area.id];
                                    const assignedEngineerId = hasOverride ? areaOverrides[area.id] : baseEngineer;
                                    const assignedName = getEngineerName(assignedEngineerId);
                                    const initials = assignedName
                                        ? assignedName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                                        : '?';

                                    return (
                                        <motion.div
                                            key={area.id}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className={`group relative rounded-xl border overflow-hidden transition-all duration-200 ${hasOverride
                                                ? 'border-amber-500/30 shadow-amber-500/5 shadow-md'
                                                : 'border-border hover:border-border/80'
                                                }`}
                                        >
                                            <div className={`h-0.5 w-full ${hasOverride
                                                ? 'bg-gradient-to-r from-amber-500/80 to-amber-300/40'
                                                : 'bg-gradient-to-r from-emerald-500/40 to-transparent'
                                                }`} />

                                            <div className={`p-3 ${hasOverride ? 'bg-amber-500/5' : 'bg-card'}`}>
                                                <div className="flex items-start justify-between gap-5 mb-2">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${hasOverride
                                                            ? 'bg-amber-500/15 border border-amber-500/20'
                                                            : 'bg-muted border border-border'
                                                            }`}>
                                                            <MapPin size={12} className={hasOverride ? 'text-amber-400' : 'text-muted-foreground'} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-semibold text-foreground truncate">{area.name}</p>
                                                            <p className="text-[10px] text-muted-foreground">
                                                                {hasOverride ? 'Custom assignment' : 'Using base engineer'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {hasOverride ? (
                                                        <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 uppercase tracking-wider">
                                                            Override
                                                        </span>
                                                    ) : (
                                                        <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 uppercase tracking-wider">
                                                            Base
                                                        </span>
                                                    )}
                                                </div>

                                                {assignedEngineerId ? (
                                                    <div className={`flex items-center gap-2 px-2.5 py-1 rounded-xl mb-2 ${hasOverride
                                                        ? 'bg-amber-500/10 border border-amber-500/15'
                                                        : 'bg-muted/50 border border-border/50'
                                                        }`}>
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${hasOverride
                                                            ? 'bg-amber-500/20 text-amber-400'
                                                            : 'bg-primary/10 text-primary'
                                                            }`}>
                                                            {initials}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] font-medium text-foreground truncate">{assignedName}</p>
                                                            <p className={`text-[9px] ${hasOverride ? 'text-amber-500/70' : 'text-emerald-500/80'}`}>
                                                                {hasOverride ? '↳ Area override' : '↳ Inherited from base'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg mb-3 bg-muted/30 border border-dashed border-border/50">
                                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                                                            <span className="text-[10px] text-muted-foreground">?</span>
                                                        </div>
                                                        <p className="text-[11px] text-muted-foreground">No engineer assigned</p>
                                                    </div>
                                                )}

                                                <div className="relative">
                                                    <select
                                                        value={areaOverrides[area.id] ?? ""}
                                                        onChange={(e) => handleAreaOverrideChange(area.id, e.target.value)}
                                                        className={`w-full appearance-none rounded-2xl border px-3 py-1.5 pr-8 text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 transition-all ${hasOverride
                                                            ? 'border-amber-500/30 bg-amber-500/10 text-amber-500 focus:ring-amber-500/20'
                                                            : 'border-input bg-background text-foreground focus:ring-ring/30'
                                                            }`}
                                                    >
                                                        <option value="">
                                                            Use Base{baseEngineer ? ` — ${getEngineerName(baseEngineer)}` : ''}
                                                        </option>
                                                        {engineers.map((eng: any) => (
                                                            <option key={eng.id} value={eng.id}>{eng.name}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
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
                            onClick={() => setConfirmOpen(true)}
                            disabled={saving}
                            className="w-full h-9 text-xs font-medium"
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
        </>
    );
}