import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
    Globe2,
    Landmark,
    Building2,
    Home,
    ChevronDown,
    Search,
    Check,
} from "lucide-react";

interface PSGCItem {
    psgc_code: string;
    area_name: string;
    geographic_level: string;
}

export interface SelectedAddress {
    region: { code: string; name: string } | null;
    province: { code: string; name: string } | null;
    municipality: { code: string; name: string } | null;
    barangay: { code: string; name: string } | null;
}

interface LocationSelectorProps {
    onChange?: (address: SelectedAddress) => void;
    className?: string;
}

type LevelKey = "region" | "province" | "municipality" | "barangay";

const LEVELS: Record<
    LevelKey,
    { label: string; icon: React.ElementType; placeholder: string }
> = {
    region: { label: "Region", icon: Globe2, placeholder: "Select region" },
    province: { label: "Province", icon: Landmark, placeholder: "Select province" },
    municipality: { label: "Municipality / City", icon: Building2, placeholder: "Select municipality" },
    barangay: { label: "Barangay", icon: Home, placeholder: "Select barangay" },
};

interface SearchableSelectProps {
    level: LevelKey;
    items: PSGCItem[];
    value: string;
    onSelect: (code: string) => void;
    disabled?: boolean;
    loading?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
    level,
    items,
    value,
    onSelect,
    disabled,
    loading,
}) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const { label, icon: Icon, placeholder } = LEVELS[level];

    const selectedItem = items.find((item) => item.psgc_code === value);

    const filteredItems = query
        ? items.filter((item) =>
            item.area_name.toLowerCase().includes(query.toLowerCase())
        )
        : items;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            {/* Icon badge + label */}
            <div className="flex items-center gap-3 mb-2">
                <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${selectedItem
                            ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
                            : "bg-slate-800/60 text-slate-400 ring-1 ring-slate-700/50"
                        }`}
                >
                    <Icon size={16} strokeWidth={2} />
                </span>
                <span className="text-sm font-medium text-slate-300">
                    {label}
                </span>
                {selectedItem && (
                    <span className="text-xs text-emerald-400/70 font-medium ml-auto">
                        ✓ Selected
                    </span>
                )}
            </div>

            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm transition-all duration-200
                    ${disabled
                        ? "border-slate-700/50 bg-slate-800/40 text-slate-600 cursor-not-allowed"
                        : open
                            ? "border-emerald-500/60 bg-slate-800 text-slate-100 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/5"
                            : "border-slate-700/70 bg-slate-800/60 text-slate-100 hover:border-slate-600 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-black/20"
                    }`}
            >
                <span className={`truncate ${selectedItem ? "text-slate-100" : "text-slate-500"}`}>
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-pulse">Loading</span>
                            <span className="inline-block w-1 h-1 bg-slate-500 rounded-full animate-bounce" />
                            <span className="inline-block w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-100" />
                            <span className="inline-block w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-200" />
                        </span>
                    ) : selectedItem ? (
                        selectedItem.area_name
                    ) : (
                        placeholder
                    )}
                </span>
                <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-slate-500 transition-all duration-300 ${open ? "rotate-180 text-emerald-400" : ""
                        }`}
                />
            </button>

            {open && !disabled && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-700/70 bg-slate-800 shadow-2xl shadow-black/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 border-b border-slate-700/50 px-4 py-3 bg-slate-800/50">
                        <Search size={16} className="text-slate-500 flex-shrink-0" />
                        <input
                            type="text"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={`Search ${label.toLowerCase()}...`}
                            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className="max-h-60 overflow-y-auto py-1.5">
                        {filteredItems.length === 0 && (
                            <div className="px-4 py-4 text-sm text-slate-500 text-center">
                                No matches found
                            </div>
                        )}

                        {filteredItems.map((item) => {
                            const isSelected = item.psgc_code === value;
                            return (
                                <div
                                    key={item.psgc_code}
                                    onClick={() => {
                                        onSelect(item.psgc_code);
                                        setOpen(false);
                                        setQuery("");
                                    }}
                                    className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm cursor-pointer transition-all duration-150
                                        ${isSelected
                                            ? "bg-emerald-500/10 text-emerald-300 border-l-2 border-emerald-500"
                                            : "text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 hover:pl-5"
                                        }`}
                                >
                                    <span className="truncate">{item.area_name}</span>
                                    {isSelected && (
                                        <Check size={14} className="flex-shrink-0 text-emerald-400" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const Connector: React.FC = () => (
    <div className="flex justify-start pl-4">
        <div className="h-5 w-0.5 bg-gradient-to-b from-slate-700/50 to-slate-700/20" />
    </div>
);

const LocationSelector: React.FC<LocationSelectorProps> = ({ onChange, className }) => {
    const [regions, setRegions] = useState<PSGCItem[]>([]);
    const [provinces, setProvinces] = useState<PSGCItem[]>([]);
    const [municipalities, setMunicipalities] = useState<PSGCItem[]>([]);
    const [barangays, setBarangays] = useState<PSGCItem[]>([]);

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedMunicipality, setSelectedMunicipality] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");

    const [loadingRegions, setLoadingRegions] = useState(false);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);
    const [loadingBarangays, setLoadingBarangays] = useState(false);

    const [error, setError] = useState<string | null>(null);

    async function loadRegions() {
        try {
            setLoadingRegions(true);
            const response = await axios.get("/psgc/regions");
            const normalized: PSGCItem[] = response.data.data.map((item: any) => ({
                psgc_code: item.code,
                area_name: item.name,
                geographic_level: "Reg",
            }));
            setRegions(normalized);
        } catch (err) {
            console.error(err);
            setError("Failed to load regions.");
        } finally {
            setLoadingRegions(false);
        }
    }

    const loadProvinces = async (regionCode: string) => {
        try {
            setLoadingProvinces(true);
            const response = await axios.get("/psgc/provinces", {
                params: { region_code: regionCode },
            });
            const normalized: PSGCItem[] = response.data.data.map((item: any) => ({
                psgc_code: item.code,
                area_name: item.name,
                geographic_level: "Prov",
            }));
            setProvinces(normalized);
        } catch (err) {
            console.error(err);
            setError("Failed to load provinces.");
        } finally {
            setLoadingProvinces(false);
        }
    };

    const loadMunicipalities = async (provinceCode: string) => {
        try {
            setLoadingMunicipalities(true);
            const response = await axios.get("/psgc/municipalities", {
                params: { province_code: provinceCode },
            });
            const normalized: PSGCItem[] = response.data.data.map((item: any) => ({
                psgc_code: item.code,
                area_name: item.name,
                geographic_level: item.isCity ? "City" : "Mun",
            }));
            setMunicipalities(normalized);
        } catch (err) {
            console.error(err);
            setError("Failed to load municipalities.");
        } finally {
            setLoadingMunicipalities(false);
        }
    };

    const loadBarangays = async (municipalityCode: string) => {
        try {
            setLoadingBarangays(true);
            const response = await axios.get("/psgc/barangays", {
                params: { municipality_code: municipalityCode },
            });
            const normalized: PSGCItem[] = response.data.data.map((item: any) => ({
                psgc_code: item.code,
                area_name: item.name,
                geographic_level: "Bgy",
            }));
            setBarangays(normalized);
        } catch (err) {
            console.error(err);
            setError("Failed to load barangays.");
        } finally {
            setLoadingBarangays(false);
        }
    };

    useEffect(() => {
        if (!onChange) return;

        const findByCode = (list: PSGCItem[], code: string) =>
            list.find((item) => item.psgc_code === code) || null;

        const region = findByCode(regions, selectedRegion);
        const province = findByCode(provinces, selectedProvince);
        const municipality = findByCode(municipalities, selectedMunicipality);
        const barangay = findByCode(barangays, selectedBarangay);

        onChange({
            region: region ? { code: region.psgc_code, name: region.area_name } : null,
            province: province ? { code: province.psgc_code, name: province.area_name } : null,
            municipality: municipality
                ? { code: municipality.psgc_code, name: municipality.area_name }
                : null,
            barangay: barangay ? { code: barangay.psgc_code, name: barangay.area_name } : null,
        });
    }, [selectedRegion, selectedProvince, selectedMunicipality, selectedBarangay, onChange, regions, provinces, municipalities, barangays]);

    const handleRegionSelect = (code: string) => {
        setSelectedRegion(code);
        setSelectedProvince("");
        setSelectedMunicipality("");
        setSelectedBarangay("");
        setProvinces([]);
        setMunicipalities([]);
        setBarangays([]);
        if (code) loadProvinces(code);
    };

    const handleProvinceSelect = (code: string) => {
        setSelectedProvince(code);
        setSelectedMunicipality("");
        setSelectedBarangay("");
        setMunicipalities([]);
        setBarangays([]);
        if (code) loadMunicipalities(code);
    };

    const handleMunicipalitySelect = (code: string) => {
        setSelectedMunicipality(code);
        setSelectedBarangay("");
        setBarangays([]);
        if (code) loadBarangays(code);
    };

    const handleBarangaySelect = (code: string) => {
        setSelectedBarangay(code);
    };

    useEffect(() => {
        loadRegions();
    }, []);

    const steps: { key: LevelKey; items: PSGCItem[]; value: string; onSelect: (c: string) => void; disabled: boolean; loading: boolean }[] = [
        { key: "region", items: regions, value: selectedRegion, onSelect: handleRegionSelect, disabled: false, loading: loadingRegions },
        { key: "province", items: provinces, value: selectedProvince, onSelect: handleProvinceSelect, disabled: !selectedRegion, loading: loadingProvinces },
        { key: "municipality", items: municipalities, value: selectedMunicipality, onSelect: handleMunicipalitySelect, disabled: !selectedProvince, loading: loadingMunicipalities },
        { key: "barangay", items: barangays, value: selectedBarangay, onSelect: handleBarangaySelect, disabled: !selectedMunicipality, loading: loadingBarangays },
    ];

    return (
        <div className={`rounded-2xl border border-slate-800/70 bg-slate-900/80 p-6 backdrop-blur-sm ${className || ""}`}>
            {error && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400 flex items-center gap-2">
                    <span className="text-red-400">⚠</span>
                    {error}
                </div>
            )}

            <div className="space-y-1">
                {steps.map((step, idx) => (
                    <React.Fragment key={step.key}>
                        {idx > 0 && <Connector />}
                        <SearchableSelect
                            level={step.key}
                            items={step.items}
                            value={step.value}
                            onSelect={step.onSelect}
                            disabled={step.disabled}
                            loading={step.loading}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default LocationSelector;