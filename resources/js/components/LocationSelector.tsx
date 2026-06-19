import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

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
}

/**
 * A searchable dropdown to replace native <select>. Click to open, type to
 * filter, click an option to select. Avoids any native scroll quirks and
 * stays usable even with hundreds of options (e.g. barangay lists).
 */
interface SearchableSelectProps {
    items: PSGCItem[];
    value: string;
    onSelect: (code: string) => void;
    placeholder: string;
    disabled?: boolean;
    loading?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
    items,
    value,
    onSelect,
    placeholder,
    disabled,
    loading,
}) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

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
            <button
                type="button"
                className="border p-2 w-full bg-secondary text-primary text-left flex justify-between items-center disabled:opacity-50"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className={selectedItem ? "" : "text-gray-400"}>
                    {loading
                        ? "Loading..."
                        : selectedItem
                            ? selectedItem.area_name
                            : placeholder}
                </span>
                <span className="ml-2">▾</span>
            </button>

            {open && !disabled && (
                <div className="absolute z-10 mt-1 w-full bg-secondary text-primary border rounded shadow-lg max-h-64 overflow-y-auto">
                    <div className="p-2 sticky top-0 bg-secondary border-b">
                        <input
                            type="text"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type to search..."
                            className="w-full border p-1 bg-transparent outline-none"
                        />
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="p-2 text-sm text-gray-400">No matches</div>
                    )}

                    {filteredItems.map((item) => (
                        <div
                            key={item.psgc_code}
                            onClick={() => {
                                onSelect(item.psgc_code);
                                setOpen(false);
                                setQuery("");
                            }}
                            className={`p-2 cursor-pointer hover:bg-blue-100 hover:text-black ${item.psgc_code === value ? "font-semibold" : ""
                                }`}
                        >
                            {item.area_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const LocationSelector: React.FC<LocationSelectorProps> = ({ onChange }) => {
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

            console.log("Municipality:", municipalityCode);
            console.log("Barangays response:", normalized);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRegion, selectedProvince, selectedMunicipality, selectedBarangay]);

    const handleRegionSelect = (code: string) => {
        setSelectedRegion(code);
        setSelectedProvince("");
        setSelectedMunicipality("");
        setSelectedBarangay("");

        setProvinces([]);
        setMunicipalities([]);
        setBarangays([]);

        loadProvinces(code);
    };

    const handleProvinceSelect = (code: string) => {
        setSelectedProvince(code);
        setSelectedMunicipality("");
        setSelectedBarangay("");

        setMunicipalities([]);
        setBarangays([]);

        loadMunicipalities(code);
    };

    const handleMunicipalitySelect = (code: string) => {
        setSelectedMunicipality(code);
        setSelectedBarangay("");

        setBarangays([]);

        loadBarangays(code);
    };

    const handleBarangaySelect = (code: string) => {
        setSelectedBarangay(code);
    };

    useEffect(() => {
        loadRegions();
    }, []);

    return (
        <div className="space-y-4 p-4">
            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div>
                <label>Region</label>
                <SearchableSelect
                    items={regions}
                    value={selectedRegion}
                    onSelect={handleRegionSelect}
                    placeholder="Select Region"
                    loading={loadingRegions}
                />
            </div>

            <div>
                <label>Province</label>
                <SearchableSelect
                    items={provinces}
                    value={selectedProvince}
                    onSelect={handleProvinceSelect}
                    placeholder="Select Province"
                    disabled={!selectedRegion}
                    loading={loadingProvinces}
                />
            </div>

            <div>
                <label>Municipality / City</label>
                <SearchableSelect
                    items={municipalities}
                    value={selectedMunicipality}
                    onSelect={handleMunicipalitySelect}
                    placeholder="Select Municipality"
                    disabled={!selectedProvince}
                    loading={loadingMunicipalities}
                />
            </div>

            <div>
                <label>Barangay</label>
                <SearchableSelect
                    items={barangays}
                    value={selectedBarangay}
                    onSelect={handleBarangaySelect}
                    placeholder="Select Barangay"
                    disabled={!selectedMunicipality}
                    loading={loadingBarangays}
                />
            </div>
        </div>
    );
};

export default LocationSelector;