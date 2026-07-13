import { useEffect, useMemo, useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import L from 'leaflet';
import { ChevronDown, Eye, ChevronLeft, ChevronRight, 
} from 'lucide-react';
import {
    Circle,
    LayerGroup,
    LayersControl,
    MapContainer,
    Marker,
    Polyline,
    TileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowRight, Bookmark, Clock, MapPin, MapPinHouse,
    Milestone, Move, Navigation, Route, Ship, Trash2, X,
} from 'lucide-react';
import LocationSelector from '@/components/LocationSelector';
import type { SelectedAddress } from '@/components/LocationSelector';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Office {
    id: string;
    db_id: number;
    level: string;
    name: string;
    code: string | null;
    parent_id: string | null;
    address: string;
    lat: number;
    lon: number;
}

type Position      = { lat: number; lng: number };
type Step          = { instruction: string; distance: string; lat: number; lng: number };
type AppMode       = 'browse'| 'unmapped' | 'addOffice';

// ─── Level config ─────────────────────────────────────────────────────────────

const LEVEL_CONFIG: Record<string, { label: string; color: string; size: number }> = {
    division: { label: 'Divisions', color: '#d9ff00', size: 16 },
    district: { label: 'Districts', color: '#001aff', size: 14 },
    area:     { label: 'Areas',     color: '#ff6f00', size: 12 },
    branch:   { label: 'Branches',  color: '#ff0000', size: 10 },
};

// ─── Icon factories ───────────────────────────────────────────────────────────

function createLevelIcon(level: string, highlight = false, dim = false) {
    const config  = LEVEL_CONFIG[level] ?? { color: '#374151', size: 12 };
    const opacity = dim ? 0.35 : 1;
    const ring    = highlight ? `box-shadow:0 0 0 3px #fff,0 0 0 5px ${config.color};` : '';
    return L.divIcon({
        className: 'office-marker',
        html: `<div style="width:${config.size}px;height:${config.size}px;background:${config.color};border:2px solid #fff;border-radius:50%;${ring}opacity:${opacity};transition:all .2s;"></div>`,
        iconSize:   [config.size, config.size],
        iconAnchor: [config.size / 2, config.size / 2],
    });
}

function createColorIcon(color: string) {
    return new L.DivIcon({
        className: 'custom-pin-icon',
        html: `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5s12.5-19.1 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
            <circle cx="12.5" cy="12.5" r="5" fill="#fff" fill-opacity="0.9"/>
        </svg>`,
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -38],
    });
}

const fromIcon          = createColorIcon('#10b981');
const toIcon            = createColorIcon('#ef4444');
const savedIcon         = createColorIcon('#f59e0b');
const selectedSavedIcon = createColorIcon('#8b5cf6');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractCity(address: string): string {
    if (!address) return '';
    const parts    = address.split(',').map(s => s.trim()).filter(Boolean);
    const filtered = parts.filter(p => p.toLowerCase() !== 'philippines');
    return filtered.length >= 2 ? filtered.slice(-2).join(', ') : filtered.join(', ');
}

function decodePolyline6(encoded: string): [number, number][] {
    let index = 0, lat = 0, lng = 0;
    const coordinates: [number, number][] = [];
    const factor = 1e6;
    while (index < encoded.length) {
        let byte, shift = 0, result = 0;
        do { byte = encoded.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
        lat += (result & 1) ? ~(result >> 1) : (result >> 1);
        shift = 0; result = 0;
        do { byte = encoded.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
        lng += (result & 1) ? ~(result >> 1) : (result >> 1);
        coordinates.push([lat / factor, lng / factor]);
    }
    return coordinates;
}
function formatOfficeLabel(office: Office): string {
    return office.code ? `${office.code} - ${office.name}` : office.name;
}

// office href
const OFFICE_SETUP_ROUTES: Record<string, string> = {
    division:      '###', // e.g. `/division-office-setup/${office.db_id}`
    district:      '###', // e.g. `/district-office-setup/${office.db_id}`
    area:          '###', // e.g. `/area-office-setup/${office.db_id}`
    branch:        '###', // e.g. `/branch-office-setup/${office.db_id}`
    field_branch:  '###', // e.g. `/field-branch-setup/${office.db_id}`
};

function getOfficeSetupHref(office: { level: string }) {
    return OFFICE_SETUP_ROUTES[office.level] ?? '###';
}
type OfficeWithParent = Office & { parent_id: string | null };

function getOfficeHierarchy(office: Office, allOffices: Office[]): { area?: Office; district?: Office; division?: Office } {
    const withParent = allOffices as OfficeWithParent[];
    const current = office as OfficeWithParent;

    const byLevelId: Record<string, Map<string, Office>> = { area: new Map(), district: new Map(), division: new Map() };
    for (const o of withParent) {
        if (byLevelId[o.level]) byLevelId[o.level].set(String(o.db_id), o);
    }

    let area: Office | undefined;
    let district: Office | undefined;
    let division: Office | undefined;

    if (current.level === 'branch') {
        area     = current.parent_id != null ? byLevelId.area.get(String(current.parent_id)) : undefined;
        district = area ? byLevelId.district.get(String((area as OfficeWithParent).parent_id)) : undefined;
        division = district ? byLevelId.division.get(String((district as OfficeWithParent).parent_id)) : undefined;
    } else if (current.level === 'area') {
        district = current.parent_id != null ? byLevelId.district.get(String(current.parent_id)) : undefined;
        division = district ? byLevelId.division.get(String((district as OfficeWithParent).parent_id)) : undefined;
    } else if (current.level === 'district') {
        division = current.parent_id != null ? byLevelId.division.get(String(current.parent_id)) : undefined;
    }

    return { area, district, division };
}

const CHILD_LEVEL: Record<string, string> = {
    division: 'district',
    district: 'area',
    area:     'branch',
};

// Returns ALL descendants at every level below `office` — e.g. a division
// returns its districts, their areas, and their branches, all flattened.
function getDescendantOffices(office: Office, allOffices: Office[]): Office[] {
    const childLevel = CHILD_LEVEL[office.level];
    if (!childLevel) return [];

    const directChildren = allOffices.filter(
        o => o.level === childLevel && (o as OfficeWithParent).parent_id != null
            && String((o as OfficeWithParent).parent_id) === String(office.db_id)
    );

    const deeperDescendants = directChildren.flatMap(child => getDescendantOffices(child, allOffices));

    return [...directChildren, ...deeperDescendants];
}

function InvalidateOnResize({ trigger }: { trigger: unknown }) {
    const map = useMap();
    useEffect(() => {
        // Wait for the CSS grid/width transition to finish before recalculating,
        // otherwise Leaflet measures the container mid-transition and gets it wrong.
        const timer = setTimeout(() => map.invalidateSize(), 320);
        return () => clearTimeout(timer);
    }, [trigger, map]);
    return null;
}
// ─── Map sub-components ───────────────────────────────────────────────────────

function MapClickHandler({ onClick, disabled }: { onClick: (lat: number, lng: number) => void; disabled: boolean }) {
    useMapEvents({ click(e) { if (!disabled) onClick(e.latlng.lat, e.latlng.lng); } });
    return null;
}

function MovePinClickHandler({ active, onPick }: { active: boolean; onPick: (lat: number, lng: number) => void }) {
    const readyRef = useRef(false);
    const map      = useMap();
    useEffect(() => {
        const container = map.getContainer();
        if (active) {
            container.style.cursor = 'crosshair';
            readyRef.current = false;
            const t = setTimeout(() => { readyRef.current = true; }, 300);
            return () => { clearTimeout(t); container.style.cursor = ''; };
        }
        container.style.cursor = '';
        readyRef.current = false;
    }, [active, map]);
    useMapEvents({ click(e) { if (active && readyRef.current) onPick(e.latlng.lat, e.latlng.lng); } });
    return null;
}

function Routing({ start, end, onRouteFound, onError }: {
    start: Position; end: Position;
    onRouteFound: (dist: string, dur: string, steps: Step[], coords: [number, number][], ferry: boolean) => void;
    onError: () => void;
}) {
    useEffect(() => {
        (async () => {
            try {
                const res  = await fetch('https://valhalla1.openstreetmap.de/route', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        locations: [{ lat: start.lat, lon: start.lng }, { lat: end.lat, lon: end.lng }],
                        costing: 'auto', costing_options: { auto: { use_ferry: 1 } }, units: 'kilometers',
                    }),
                });
                const data = await res.json();
                if (!data.trip?.legs?.[0]) { onError(); return; }
                const leg     = data.trip.legs[0];
                const decoded = decodePolyline6(leg.shape);
                const steps: Step[] = leg.maneuvers.map((m: any) => {
                    const [lat, lng] = decoded[m.begin_shape_index];
                    return { instruction: m.instruction, distance: m.length >= 1 ? m.length.toFixed(1) + ' km' : Math.round(m.length * 1000) + ' m', lat, lng };
                });
                const ferry = leg.maneuvers.some((m: any) => m.instruction?.toLowerCase().includes('ferry'));
                onRouteFound(data.trip.summary.length.toFixed(2) + ' km', Math.round(data.trip.summary.time / 60) + ' mins', steps, decoded, ferry);
            } catch { onError(); }
        })();
    }, [start?.lat, start?.lng, end?.lat, end?.lng]);
    return null;
}

function FitBounds({ start, end }: { start: Position; end: Position }) {
    const map = useMap();
    useEffect(() => { map.fitBounds(L.latLngBounds([start.lat, start.lng], [end.lat, end.lng]), { padding: [60, 60] }); }, [map, start?.lat, start?.lng, end?.lat, end?.lng]);
    return null;
}

function FitBoundsToOffices({ offices }: { offices: Office[] }) {
    const map = useMap();
    useEffect(() => {
        if (offices.length === 0) return;
        if (offices.length === 1) {
            map.setView([offices[0].lat, offices[0].lon], Math.max(map.getZoom(), 11), { animate: true });
            return;
        }
        const bounds = L.latLngBounds(offices.map(o => [o.lat, o.lon] as [number, number]));
        map.fitBounds(bounds, { padding: [60, 60], animate: true });
    }, [offices, map]);
    return null;
}

function PanTo({ point, offsetXPercent = 0 }: { point: Position | null; offsetXPercent?: number }) {
    const map = useMap();
    useEffect(() => {
        if (!point) return;
        if (!offsetXPercent) {
            map.panTo([point.lat, point.lng], { animate: true, duration: 0.3 });
            return;
        }
        const zoom = map.getZoom();
        const targetPoint = map.project([point.lat, point.lng], zoom);
        const offsetPx = map.getSize().x * offsetXPercent;
        // Shift the map's center point to the right of the pin,
        // so the pin itself lands to the left of center on screen.
        const shiftedCenter = targetPoint.add([offsetPx, 0]);
        const shiftedLatLng = map.unproject(shiftedCenter, zoom);
        map.panTo(shiftedLatLng, { animate: true, duration: 0.3 });
    }, [point?.lat, point?.lng, map, offsetXPercent]);
    return null;
}

function MovePinBanner({ office, onCancel }: { office: Office; onCancel: () => void }) {
    return (
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, background: '#1e3a5f', color: '#fff', padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.25)', whiteSpace: 'nowrap' }}>
            <span>Click the map to reposition <em>{office.name}</em></span>
            <button onClick={onCancel} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: 4, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>Cancel</button>
        </div>
    );
}

// ─── Office picker (searchable dropdown) ──────────────────────────────────────

function OfficePicker({ label, color, Icon, selected, search, onSearch, onSelect, onClear, offices }: {
    label: string; color: string; Icon: any;
    selected: Office | null; search: string;
    onSearch: (v: string) => void;
    onSelect: (o: Office) => void;
    onClear: () => void;
    offices: Office[];
}) {
    const filtered = search.length >= 1
        ? offices.filter(o => o.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
        : [];

    return (
        <div>
            <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-5 h-5 rounded-full ${color} flex items-center justify-center flex-shrink-0`}><Icon className="w-3 h-3 text-white" /></span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</span>
            </div>
            {selected ? (
                <div className="flex items-start justify-between gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-100 truncate">{formatOfficeLabel(selected)}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{extractCity(selected.address)}</p>
                    </div>
                    <button onClick={onClear} className="flex-shrink-0 text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors mt-0.5">
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        value={search}
                        onChange={e => onSearch(e.target.value)}
                        placeholder={`Search ${label} office…`}
                        className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                    />
                    {filtered.length > 0 && (
                        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-44 overflow-y-auto">
                            {filtered.map(o => (
                                <div key={o.id} onClick={() => { onSelect(o); onSearch(''); }}
                                    className="px-3 py-2 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                                    <p className="text-xs font-medium text-gray-800 dark:text-gray-100">{formatOfficeLabel(o)}</p>  
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{extractCity(o.address)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {search.length > 0 && filtered.length === 0 && (
                        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-3 text-xs text-gray-400 dark:text-gray-500 text-center">
                            No offices found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// -- searchbar -------
function HeaderOfficeSearch({ offices, onSelect }: { offices: Office[]; onSelect: (o: Office) => void }) {
    const [query, setQuery] = useState('');
    const [open, setOpen]   = useState(false);
    const wrapperRef        = useRef<HTMLDivElement>(null);

    const filtered = query.length >= 1
        ? offices.filter(o => o.name.toLowerCase().includes(query.toLowerCase()) || o.code?.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
        : [];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handlePick(o: Office) {
        onSelect(o);
        setQuery('');
        setOpen(false);
    }

    return (
        <div ref={wrapperRef} className="relative w-64 flex-shrink-0">
            <input
                value={query}
                onChange={e => { setQuery(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                placeholder="Search offices…"
                className="w-full text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
            />
            {open && filtered.length > 0 && (
                <div className="absolute z-[2000] w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                    {filtered.map(o => (
                        <div
                            key={o.id}
                            onClick={() => handlePick(o)}
                            className="px-3 py-2 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                        >
                            <p className="text-xs font-medium text-gray-800 dark:text-gray-100">{formatOfficeLabel(o)}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{o.level} · {extractCity(o.address)}</p>
                        </div>
                    ))}
                </div>
            )}
            {open && query.length > 0 && filtered.length === 0 && (
                <div className="absolute z-[2000] w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-3 text-xs text-gray-400 dark:text-gray-500 text-center">
                    No offices found
                </div>
            )}
        </div>
    );
}

// ─── Office info card (left panel) ───────────────────────────────────────────

function OfficeInfoCard({ office, allOffices, onSelectOffice, onShowChildren, onGetDirections, onMovePin, onClose }: {
    office: Office;
    allOffices: Office[];
    onSelectOffice: (o: Office) => void;
    onShowChildren: (office: Office, children: Office[]) => void;
    onGetDirections: () => void;
    onMovePin: () => void;
    onClose: () => void;
}) {
    const levelCfg = LEVEL_CONFIG[office.level];
    const levelLabel = levelCfg ? levelCfg.label.replace(/s$/, '') : office.level;
    const { area, district, division } = getOfficeHierarchy(office, allOffices);
    const addressLines = office.address ? office.address.split(',').map(s => s.trim()).filter(Boolean) : [];
    const descendants = getDescendantOffices(office, allOffices);
    const descendantCountsByLevel = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const d of descendants) counts[d.level] = (counts[d.level] ?? 0) + 1;
        return counts;
    }, [descendants]);
    const descendantSummary = Object.entries(descendantCountsByLevel)
        .map(([level, count]) => `${count} ${count === 1 ? LEVEL_CONFIG[level].label.replace(/s$/, '') : LEVEL_CONFIG[level].label}`)
        .join(', ');

    const hierarchyRows = [
        { label: 'Area',     office: area },
        { label: 'District', office: district },
        { label: 'Division', office: division },
    ].filter(row => row.office);

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0">
            <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: levelCfg?.color ?? '#374151' }} />
                    <span className="text-xs text-gray-400 dark:text-gray-500 capitalize">{office.level}</span>
                </div>
                <button onClick={onClose} className="flex-shrink-0 text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Office Name */}
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">Office Name</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">{formatOfficeLabel(office)}</p>

            {/* Hierarchy */}
            {hierarchyRows.length > 0 && (
                <>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Hierarchy</p>
                    <div className="mb-3 space-y-1.5">
                        {hierarchyRows.map(row => (
                            <div key={row.label}>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{row.label}</p>
                               <button
                                    onClick={() => row.office && onSelectOffice(row.office)}
                                    className="text-xs text-gray-700 dark:text-gray-200 pl-3 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors text-left"
                                >
                                    <span className="text-gray-300 dark:text-gray-600">└── </span>{row.office?.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Address */}
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Address</p>
            {addressLines.length > 0 ? (
                <div className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    {addressLines.map((line, i) => <p key={i}>{line}</p>)}
                </div>
            ) : (
                <p className="text-xs italic text-gray-400 dark:text-gray-500 mb-3">No address on file</p>
            )}
            {office.level !== 'branch' && (
                <button
                    onClick={() => onShowChildren(office, descendants)}
                    disabled={descendants.length === 0}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors mb-3"
                >
                    <MapPin className="w-3.5 h-3.5" />
                    Show {descendantSummary || 'no offices'} on map
                </button>
            )}

            <div className="flex gap-2 mt-1">
                
                    <a href={getOfficeSetupHref(office)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <Eye className="w-3.5 h-3.5" />
                    See More
                </a>
                <button
                    onClick={onMovePin}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <Move className="w-3.5 h-3.5" />
                    Move Pin
                </button>
                <button
                    onClick={onGetDirections}
                    className="flex-1 flex items-center justify-center gap-1 text-xs font-medium py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
                >
                    <Navigation className="w-3.5 h-3.5" />
                    Directions
                </button>
            </div>
        </div>
    );
}

// ─── PGSC-assisted address resolution ──────────────────────────────────────

interface PsgcMatch {
    region?: { code: string; name: string };
    province?: { code: string; name: string };
    municipality?: { code: string; name: string };
    barangay?: { code: string; name: string };
    rawAddress: string; // full Nominatim display_name, for the "confirm address" step
}

function normalizeForMatch(s: string): string {
    return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findBestNameMatch<T extends { psgc_code: string; area_name: string }>(
    items: T[],
    candidates: (string | undefined)[]
): T | undefined {
    const validCandidates = candidates.filter(Boolean).map(c => normalizeForMatch(c as string));
    if (validCandidates.length === 0) return undefined;

    // Exact normalized match first
    for (const item of items) {
        const norm = normalizeForMatch(item.area_name);
        if (validCandidates.includes(norm)) return item;
    }
    // Fallback: substring containment either direction
    for (const item of items) {
        const norm = normalizeForMatch(item.area_name);
        if (validCandidates.some(c => norm.includes(c) || c.includes(norm))) return item;
    }
    return undefined;
}

async function reverseGeocode(lat: number, lng: number): Promise<any> {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
    );
    if (!res.ok) throw new Error('Reverse geocode failed');
    return res.json();
}

// Walks your existing /psgc/* endpoints (same ones LocationSelector uses),
// matching Nominatim's address fields against PSGC names at each level.
async function resolvePsgcFromCoordinates(lat: number, lng: number): Promise<PsgcMatch> {
    const nominatim = await reverseGeocode(lat, lng);
    const addr = nominatim.address ?? {};

    const result: PsgcMatch = { rawAddress: nominatim.display_name ?? '' };

    const regionsRes = await axios.get('/psgc/regions');
    const regions = regionsRes.data.data.map((r: any) => ({ psgc_code: r.code, area_name: r.name }));
    const region = findBestNameMatch(regions, [addr.state, addr.region]);
    if (!region) return result;
    result.region = { code: region.psgc_code, name: region.area_name };

    const provincesRes = await axios.get('/psgc/provinces', { params: { region_code: region.psgc_code } });
    const provinces = provincesRes.data.data.map((p: any) => ({ psgc_code: p.code, area_name: p.name }));
    const province = findBestNameMatch(provinces, [addr.state_district, addr.province, addr.county]);
    if (!province) return result;
    result.province = { code: province.psgc_code, name: province.area_name };

    const munisRes = await axios.get('/psgc/municipalities', { params: { province_code: province.psgc_code } });
    const munis = munisRes.data.data.map((m: any) => ({ psgc_code: m.code, area_name: m.name }));
    const municipality = findBestNameMatch(munis, [addr.city, addr.town, addr.municipality]);
    if (!municipality) return result;
    result.municipality = { code: municipality.psgc_code, name: municipality.area_name };

    const brgysRes = await axios.get('/psgc/barangays', { params: { municipality_code: municipality.psgc_code } });
    const brgys = brgysRes.data.data.map((b: any) => ({ psgc_code: b.code, area_name: b.name }));
    const barangay = findBestNameMatch(brgys, [addr.suburb, addr.village, addr.neighbourhood, addr.barangay]);
    if (barangay) result.barangay = { code: barangay.psgc_code, name: barangay.area_name };

    return result;
}

function formatPsgcAddress(match: PsgcMatch): string {
    return [match.barangay?.name, match.municipality?.name, match.province?.name, match.region?.name]
        .filter(Boolean)
        .join(', ');
}

const PARENT_LEVEL: Record<string, string> = {
    district: 'division',
    area:     'district',
    branch:   'area',
};

// Suggest the parent office whose address best contains the resolved
// province/municipality name — per the "match by name" approach.
function suggestParentOffice(level: string, psgc: PsgcMatch, allOffices: Office[]): Office[] {
    const parentLevel = PARENT_LEVEL[level];
    if (!parentLevel) return [];

    const candidates = allOffices.filter(o => o.level === parentLevel);
    const targets = [psgc.municipality?.name, psgc.province?.name].filter(Boolean).map(t => normalizeForMatch(t as string));

    if (targets.length === 0) return candidates;

    // Sort matches first, but return the FULL list so the user can still pick any parent manually.
    return [...candidates].sort((a, b) => {
        const aMatch = targets.some(t => normalizeForMatch(a.address || a.name).includes(t)) ? 0 : 1;
        const bMatch = targets.some(t => normalizeForMatch(b.address || b.name).includes(t)) ? 0 : 1;
        return aMatch - bMatch;
    });
}

interface PsgcOption { code: string; name: string }

async function fetchPsgcList(url: string, params?: Record<string, string>): Promise<PsgcOption[]> {
    const res = await axios.get(url, { params });
    return res.data.data.map((item: any) => ({ code: item.code, name: item.name }));
}

function AddressPsgcEditor({ initial, onChange }: {
    initial: PsgcMatch | null;
    onChange: (selected: { region: PsgcOption | null; province: PsgcOption | null; municipality: PsgcOption | null; barangay: PsgcOption | null }) => void;
}) {
    const [regions, setRegions]             = useState<PsgcOption[]>([]);
    const [provinces, setProvinces]         = useState<PsgcOption[]>([]);
    const [municipalities, setMunicipalities] = useState<PsgcOption[]>([]);
    const [barangays, setBarangays]         = useState<PsgcOption[]>([]);

    const [regionCode, setRegionCode]           = useState('');
    const [provinceCode, setProvinceCode]       = useState('');
    const [municipalityCode, setMunicipalityCode] = useState('');
    const [barangayCode, setBarangayCode]       = useState('');

    const [loading, setLoading] = useState({ region: false, province: false, municipality: false, barangay: false });

    // Initial load: fetch regions, then cascade-prefill from the auto-detected match
    useEffect(() => {
        (async () => {
            setLoading(l => ({ ...l, region: true }));
            const regionList = await fetchPsgcList('/psgc/regions');
            setRegions(regionList);
            setLoading(l => ({ ...l, region: false }));

            if (!initial?.region) return;
            setRegionCode(initial.region.code);

            setLoading(l => ({ ...l, province: true }));
            const provinceList = await fetchPsgcList('/psgc/provinces', { region_code: initial.region.code });
            setProvinces(provinceList);
            setLoading(l => ({ ...l, province: false }));
            if (!initial?.province) return;
            setProvinceCode(initial.province.code);

            setLoading(l => ({ ...l, municipality: true }));
            const muniList = await fetchPsgcList('/psgc/municipalities', { province_code: initial.province.code });
            setMunicipalities(muniList);
            setLoading(l => ({ ...l, municipality: false }));
            if (!initial?.municipality) return;
            setMunicipalityCode(initial.municipality.code);

            setLoading(l => ({ ...l, barangay: true }));
            const brgyList = await fetchPsgcList('/psgc/barangays', { municipality_code: initial.municipality.code });
            setBarangays(brgyList);
            setLoading(l => ({ ...l, barangay: false }));
            if (initial?.barangay) setBarangayCode(initial.barangay.code);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // only on mount — `initial` is the one-time auto-detect result

    // Report the current full selection upward whenever anything changes
    useEffect(() => {
        const find = (list: PsgcOption[], code: string) => list.find(i => i.code === code) ?? null;
        onChange({
            region: find(regions, regionCode),
            province: find(provinces, provinceCode),
            municipality: find(municipalities, municipalityCode),
            barangay: find(barangays, barangayCode),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regionCode, provinceCode, municipalityCode, barangayCode, regions, provinces, municipalities, barangays]);

    async function handleRegionChange(code: string) {
        setRegionCode(code);
        setProvinceCode(''); setMunicipalityCode(''); setBarangayCode('');
        setProvinces([]); setMunicipalities([]); setBarangays([]);
        if (!code) return;
        setLoading(l => ({ ...l, province: true }));
        setProvinces(await fetchPsgcList('/psgc/provinces', { region_code: code }));
        setLoading(l => ({ ...l, province: false }));
    }

    async function handleProvinceChange(code: string) {
        setProvinceCode(code);
        setMunicipalityCode(''); setBarangayCode('');
        setMunicipalities([]); setBarangays([]);
        if (!code) return;
        setLoading(l => ({ ...l, municipality: true }));
        setMunicipalities(await fetchPsgcList('/psgc/municipalities', { province_code: code }));
        setLoading(l => ({ ...l, municipality: false }));
    }

    async function handleMunicipalityChange(code: string) {
        setMunicipalityCode(code);
        setBarangayCode('');
        setBarangays([]);
        if (!code) return;
        setLoading(l => ({ ...l, barangay: true }));
        setBarangays(await fetchPsgcList('/psgc/barangays', { municipality_code: code }));
        setLoading(l => ({ ...l, barangay: false }));
    }

    const fieldClass = "w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div className="space-y-2">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Barangay <span className="text-gray-400 dark:text-gray-600">(optional)</span></p>
                <select
                    value={barangayCode}
                    onChange={e => setBarangayCode(e.target.value)}
                    disabled={!municipalityCode || loading.barangay}
                    className={fieldClass}
                >
                    <option value="">
                        {loading.barangay
                            ? 'Loading…'
                            : !municipalityCode
                                ? 'Select municipality first'
                                : barangays.length === 0
                                    ? 'No barangays available — skip this field'
                                    : 'Select barangay (optional)'}
                    </option>
                    {barangays.map(b => <option key={b.code} value={b.code}>{b.name}</option>)}
                </select>
                {!loading.barangay && municipalityCode && barangays.length === 0 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        No barangay data found for this municipality — you can leave this blank and use the street field above instead.
                    </p>
                )}
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Municipality / City</p>
                <select
                    value={municipalityCode}
                    onChange={e => handleMunicipalityChange(e.target.value)}
                    disabled={!provinceCode || loading.municipality}
                    className={fieldClass}
                >
                    <option value="">{loading.municipality ? 'Loading…' : 'Select municipality'}</option>
                    {municipalities.map(m => <option key={m.code} value={m.code}>{m.name}</option>)}
                </select>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Province</p>
                <select
                    value={provinceCode}
                    onChange={e => handleProvinceChange(e.target.value)}
                    disabled={!regionCode || loading.province}
                    className={fieldClass}
                >
                    <option value="">{loading.province ? 'Loading…' : 'Select province'}</option>
                    {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                </select>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Region</p>
                <select
                    value={regionCode}
                    onChange={e => handleRegionChange(e.target.value)}
                    disabled={loading.region}
                    className={fieldClass}
                >
                    <option value="">{loading.region ? 'Loading…' : 'Select region'}</option>
                    {regions.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
                </select>
            </div>
        </div>
    );
}

// ─── Add Office flow (left panel content while mode === 'addOffice') ─────────

    type AddOfficeStep = 'drop-pin' | 'resolving' | 'form' | 'saving';

    function AddOfficeFlow({
        point,
        step,
        psgcMatch,
        allOffices,
        onCancel,
        onSaved,
    }: {
        point: Position | null;
        step: AddOfficeStep;
        psgcMatch: PsgcMatch | null;
        allOffices: Office[];
        onCancel: () => void;
        onSaved: (office: Office) => void;
    }) {
        const [level, setLevel]       = useState<string>('branch');
        const [parentId, setParentId] = useState<string>('');
        const [name, setName]         = useState('');
        const [addressSelection, setAddressSelection] = useState<{
        region: PsgcOption | null; province: PsgcOption | null; municipality: PsgcOption | null; barangay: PsgcOption | null;
    }>({ region: null, province: null, municipality: null, barangay: null });
    const [streetDetail, setStreetDetail] = useState('');    
    const [saving, setSaving]     = useState(false);
        const [error, setError]       = useState<string | null>(null);

       const finalAddress = [streetDetail.trim(), addressSelection.barangay?.name, addressSelection.municipality?.name, addressSelection.province?.name, addressSelection.region?.name]
        .filter(Boolean)
        .join(', ');

        const parentOptions = useMemo(
            () => (psgcMatch ? suggestParentOffice(level, psgcMatch, allOffices) : []),
            [level, psgcMatch, allOffices]
        );
        const needsParent = level !== 'division';

        // Reset parent selection when level changes, defaulting to the top suggestion
        useEffect(() => {
            setParentId(needsParent && parentOptions.length > 0 ? String(parentOptions[0].db_id) : '');
        }, [level]); // eslint-disable-line react-hooks/exhaustive-deps

        async function handleSubmit() {
            if (!point || !name.trim() || (needsParent && !parentId)) return;
            setSaving(true);
            setError(null);
            try {
                const res = await fetch(`/api/offices/${level}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({
                        name: name.trim(),
                        parent_id: needsParent ? parentId : undefined,
                        address: finalAddress,
                        latitude: point.lat,
                        longitude: point.lng,
                    }),
                });
                if (!res.ok) {
                    const body = await res.json().catch(() => null);
                    throw new Error(body?.error || 'Failed to save office');
                }
                const created: Office = await res.json();
                onSaved(created);
            } catch (e: any) {
                setError(e.message || 'Something went wrong');
            } finally {
                setSaving(false);
            }
        }

        if (step === 'drop-pin') {
            return (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Add Office</p>
                    </div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mb-2">Click anywhere on the map to drop a pin for the new office.</p>
                    <button onClick={onCancel} className="text-xs font-medium text-gray-500 dark:text-gray-400 underline">Cancel</button>
                </div>
            );
        }

        if (step === 'resolving') {
            return (
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex-shrink-0 flex flex-col items-center gap-2 text-center">
                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">Detecting region, province, municipality, barangay…</p>
                </div>
            );
        }

        // step === 'form'
        return (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0 space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">New Office Details</p>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-4 h-4" /></button>
                </div>

                {/* Detected address */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Address</p>
                    <input
                        value={streetDetail}
                        onChange={e => setStreetDetail(e.target.value)}
                        placeholder="Street / building / additional detail (optional)"
                        className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                    />
                    <AddressPsgcEditor initial={psgcMatch} onChange={setAddressSelection} />
                    {!(psgcMatch && (psgcMatch.region || psgcMatch.province)) && (
                        <p className="text-xs italic text-amber-600 dark:text-amber-400 mt-1">
                            Could not confidently auto-detect this location — please fill in or correct the address above.
                        </p>
                    )}
                    {psgcMatch?.rawAddress && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Detected: {psgcMatch.rawAddress}</p>
                    )}
                </div>

                {/* Office Level */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Office Level</p>
                    <div className="grid grid-cols-4 gap-1.5">
                        {Object.entries(LEVEL_CONFIG).map(([lvl, cfg]) => (
                            <button
                                key={lvl}
                                onClick={() => setLevel(lvl)}
                                className={`text-xs font-medium py-1.5 rounded-lg border transition-colors ${
                                    level === lvl
                                        ? 'bg-emerald-700 border-emerald-700 text-white'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                {cfg.label.replace(/s$/, '')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Parent office */}
                {needsParent && (
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                            Parent {LEVEL_CONFIG[PARENT_LEVEL[level]]?.label.replace(/s$/, '')}
                        </p>
                        {parentOptions.length === 0 ? (
                            <p className="text-xs italic text-rose-500 dark:text-rose-400">No {PARENT_LEVEL[level]} offices exist yet — create one first.</p>
                        ) : (
                            <select
                                value={parentId}
                                onChange={e => setParentId(e.target.value)}
                                className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                {parentOptions.map((p, i) => (
                                    <option key={p.id} value={p.db_id}>
                                        {i === 0 ? '★ ' : ''}{formatOfficeLabel(p)}
                                    </option>
                                ))}
                            </select>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">★ = suggested based on detected location</p>
                    </div>
                )}

                {/* Office name */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Office Name</p>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Bacolod Branch"
                        className="w-full text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {error && <p className="text-xs text-rose-500 dark:text-rose-400">{error}</p>}

                <div className="flex gap-2 pt-1">
                    <button onClick={onCancel} className="flex-1 text-xs font-medium py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim() || (needsParent && !parentId) || !addressSelection.province || saving}
                        className="flex-1 text-xs font-medium py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white transition-colors"
                    >
                        {saving ? 'Saving…' : 'Save Office'}
                    </button>
                </div>
            </div>
        );
    }
// ─── Main page ────────────────────────────────────────────────────────────────

export default function Index() {
    // App mode
    const [mode, setMode] = useState<AppMode>('browse');
    const [panelOpen, setPanelOpen] = useState(true);

    // Selected office (shown in left panel on marker click)
    const [selectedOffice,  setSelectedOffice]  = useState<Office | null>(null);
    const [highlightedChildren, setHighlightedChildren] = useState<Office[]>([]);

    // Directions panel
    const [showDirections,     setShowDirections]     = useState(false);
    const [fromOffice,         setFromOffice]         = useState<Office | null>(null);
    const [toOffice,           setToOffice]           = useState<Office | null>(null);
    const [fromSearch,         setFromSearch]         = useState('');
    const [toSearch,           setToSearch]           = useState('');
    const [routeClickTarget,   setRouteClickTarget]   = useState<'from' | 'to'>('from');
    const [distance,           setDistance]           = useState('');
    const [duration,           setDuration]           = useState('');
    const [steps,              setSteps]              = useState<Step[]>([]);
    const [directionsOpen,     setDirectionsOpen]     = useState(true);
    const [hoveredStep,        setHoveredStep]        = useState<Position | null>(null);
    const [routeCoords,        setRouteCoords]        = useState<[number, number][]>([]);
    const [usesFerry,          setUsesFerry]          = useState(false);
    const [routeError,         setRouteError]         = useState(false);

    // Move pin
    const [movingOffice, setMovingOffice] = useState<Office | null>(null);
    const [savingPin,    setSavingPin]    = useState(false);

    //addOffice
    const [addOfficeStep, setAddOfficeStep] = useState<AddOfficeStep>('drop-pin');
    const [addOfficePoint, setAddOfficePoint] = useState<Position | null>(null);
    const [addOfficePsgc, setAddOfficePsgc] = useState<PsgcMatch | null>(null);

    // Offices
    const [offices, setOffices] = useState<Office[]>([]);

    useEffect(() => {
        fetch('/api/offices')
            .then(r => { if (!r.ok) throw new Error(); return r.json(); })
            .then(data => setOffices(data))
            .catch(() => console.warn('Could not load office pins'));
    }, []);

    const officesByLevel = useMemo(() => {
        const grouped: Record<string, Office[]> = { division: [], district: [], area: [], branch: [] };
        for (const o of offices) {
            const isUnmapped = o.lat === 0 && o.lon === 0;
            if (grouped[o.level] && !isUnmapped) grouped[o.level].push(o);
        }
        return grouped;
    }, [offices]);
    const unmappedOffices = useMemo(
        () => offices.filter(o => o.lat === 0 && o.lon === 0),
        [offices]
    );

    const isMovingPin = !!movingOffice;
    const focusPoint = selectedOffice ? { lat: selectedOffice.lat, lng: selectedOffice.lon } : null;

    const highlightedChildIds = useMemo(
        () => new Set(highlightedChildren.map(o => o.id)),
        [highlightedChildren]
    );

    // Memoize so Routing useEffect only fires when coordinates actually change,
    // not on every parent re-render (objects compared by reference in useEffect deps).
    const routeStart = useMemo(
        () => fromOffice ? { lat: fromOffice.lat, lng: fromOffice.lon } : null,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fromOffice?.lat, fromOffice?.lon]
    );
    const routeEnd = useMemo(
        () => toOffice ? { lat: toOffice.lat, lng: toOffice.lon } : null,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [toOffice?.lat, toOffice?.lon]
    );
    const canRoute = !!routeStart && !!routeEnd;

    // Panel is visible when there's content to show AND the user hasn't manually hidden it
    const hasContent = mode !== 'browse' || showDirections || !!selectedOffice;
    const showPanel = hasContent && panelOpen;
    
    // Marker click handler
    function handleMarkerClick(office: Office) {
         if (isMovingPin) return;
         if (showDirections) {
             if (routeClickTarget === 'from') { setFromOffice(office); setFromSearch(''); setRouteClickTarget('to'); }
             else                             { setToOffice(office);   setToSearch('');   setRouteClickTarget('from'); }
         } else {
             setSelectedOffice(office);
             setHighlightedChildren([]);
             setMode('browse');
             setPanelOpen(true);
         }
     }

    // Show children of a parent office
    function handleShowChildren(_parent: Office, children: Office[]) {
        setHighlightedChildren(children);
    }

    // Map click (save mode only — directions uses marker clicks)
    function handleMapClick(lat: number, lng: number) {
        if (mode === 'addOffice' && addOfficeStep === 'drop-pin') {
        const point = { lat, lng };
        setAddOfficePoint(point);
        setAddOfficeStep('resolving');
        resolvePsgcFromCoordinates(lat, lng)
            .then(match => { setAddOfficePsgc(match); setAddOfficeStep('form'); })
            .catch(() => { setAddOfficePsgc(null); setAddOfficeStep('form'); });
    }
    }
    function cancelAddOffice() {
        setMode('browse');
        setAddOfficeStep('drop-pin');
        setAddOfficePoint(null);
        setAddOfficePsgc(null);
    }

    function handleOfficeSaved(created: Office) {
        setOffices(prev => [...prev, created]);
        cancelAddOffice();
        setSelectedOffice(created);
        setPanelOpen(true);
    }
    

    // Move pin
    async function handleMovePinPick(lat: number, lng: number) {
        if (!movingOffice || savingPin) return;
        setSavingPin(true);
        try {
            const res = await fetch(`/api/offices/${movingOffice.level}/${movingOffice.db_id}/pin`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ latitude: lat, longitude: lng }),
            });
            if (!res.ok) throw new Error();
            const updated: Office = await res.json();
            setOffices(prev => prev.map(o => o.id === updated.id ? updated : o));
            if (selectedOffice?.id === updated.id) setSelectedOffice(updated);
        } catch {
            alert('Failed to save new pin position. Please try again.');
        } finally {
            setSavingPin(false);
            setMovingOffice(null);
        }
    }
    function AddOfficeCursor({ active }: { active: boolean }) {
        const map = useMap();
        useEffect(() => {
            const container = map.getContainer();
            container.style.cursor = active ? 'crosshair' : '';
            return () => { container.style.cursor = ''; };
        }, [active, map]);
        return null;
    }

    function openDirections(preFrom?: Office) {
        setShowDirections(true);
        setPanelOpen(true);
        if (preFrom) { setFromOffice(preFrom); setFromSearch(''); }
        setRouteClickTarget(preFrom ? 'to' : 'from');
        setDistance(''); setDuration(''); setSteps([]); setRouteCoords([]);
    }

    function closeDirections() {
        setShowDirections(false);
        setFromOffice(null); setToOffice(null);
        setFromSearch(''); setToSearch('');
        setDistance(''); setDuration(''); setSteps([]); setRouteCoords([]);
        setRouteError(false);
    }

    // Default center — Philippines
    const mapCenter: [number, number] = [12.8797, 121.774];

    return (
        <AppLayout>
            <div className="flex flex-col h-screen max-h-screen p-4 gap-4 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {/* <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                            <Route className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                        </div> */}
                        <button
                        onClick={() => setPanelOpen(prev => !prev)}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
                        title={panelOpen ? 'Hide panel' : 'Show panel'}
                    >
                        {panelOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        Panel
                    </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Geo Mapping</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Click a pin to view details · Get directions between offices</p>
                        </div>
                    </div>
                    <HeaderOfficeSearch
                        offices={offices}
                        onSelect={(o) => {
                        setSelectedOffice(o);
                        setHighlightedChildren([]);
                        setMode('browse');
                        setPanelOpen(true);    
                        }}
                    />
                    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                         {([
                            { key: 'unmapped' as const, label: `Unmapped Offices (${unmappedOffices.length})`, Icon: MapPinHouse, active: 'bg-rose-600' },
                            { key: 'addOffice' as const, label: 'Add Office', Icon: MapPin, active: 'bg-emerald-600' },
                         ]).map(({ key, label, Icon, active }) => (
                            <button key={key} onClick={() => {
                                if (key === 'addOffice' && mode === 'addOffice') { cancelAddOffice(); }
                                else { setMode(key); setPanelOpen(true); if (key === 'addOffice') { setAddOfficeStep('drop-pin'); setAddOfficePoint(null); setAddOfficePsgc(null); } }
                            }}
                                 className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${mode === key ? `${active} text-white` : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                 <Icon className="w-3.5 h-3.5" />
                                 {label}
                             </button>
                         ))}
                     </div>
                </div>

                {/* Main content */}
                <div className={`grid grid-cols-1 gap-4 flex-1 min-h-0 ${showPanel ? 'xl:grid-cols-3' : 'xl:grid-cols-1'}`}>

                    {/* ── Left panel — collapses when nothing to show ── */}
                    <div className={`flex flex-col gap-3 min-h-0 overflow-y-auto pr-1 transition-all duration-300 ${showPanel ? 'xl:col-span-1' : 'hidden xl:hidden'}`}>
                        
                        {/* ── Browse mode: office info or placeholder ── */}
                        {mode === 'browse' && !showDirections && (
                            <>
                                {selectedOffice ? (
                                    <OfficeInfoCard
                                        office={selectedOffice}
                                        allOffices={offices}
                                        onSelectOffice={handleMarkerClick}
                                        onShowChildren={handleShowChildren}
                                        onGetDirections={() => openDirections(selectedOffice)}
                                        onMovePin={() => { setMovingOffice(selectedOffice); }}
                                        onClose={() => { setSelectedOffice(null); setHighlightedChildren([]); }}
                                    />
                                ) : (
                                    <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex-shrink-0 flex flex-col items-center justify-center text-center gap-2">
                                        <MapPin className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Click any office pin on the map to view its details here</p>
                                    </div>
                                )}
                            </>
                        )}
                                                
                        {/* ── Unmapped offices mode ── */}
                        {mode === 'unmapped' && (
                            <>
                                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-3 flex-shrink-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <MapPinHouse className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                                        <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">Unmapped Offices</p>
                                    </div>
                                    <p className="text-xs text-rose-700 dark:text-rose-400">
                                        These offices have no coordinates set (0, 0). Click "Move Pin" then click the map to place them.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-1 min-h-0 flex flex-col">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 flex-shrink-0">
                                        {unmappedOffices.length} Unmapped
                                    </p>
                                    {unmappedOffices.length > 0 ? (
                                        <ul className="space-y-1.5 overflow-y-auto flex-1 min-h-0 pr-1">
                                            {unmappedOffices.map(office => {
                                                const levelCfg = LEVEL_CONFIG[office.level];
                                                return (
                                                    <li key={office.id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: levelCfg?.color ?? '#374151' }} />
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">{formatOfficeLabel(office)}</p>
                                                                <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{office.level}</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => setMovingOffice(office)}
                                                            className="flex-shrink-0 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                        >
                                                            <Move className="w-3 h-3" />
                                                            Move Pin
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-6">
                                            <MapPinHouse className="w-5 h-5 text-gray-300 dark:text-gray-600 mb-1.5" />
                                            <p className="text-xs text-gray-400 dark:text-gray-500">All offices have coordinates set.</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* ── Directions panel ── */}
                        {showDirections && (
                            <>
                                {/* Header */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Route className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Get Directions</p>
                                        </div>
                                        <button onClick={closeDirections} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Hint */}
                                    <div className="mb-3 flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-xs">
                                        <button onClick={() => setRouteClickTarget('from')}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 font-medium transition-colors ${routeClickTarget === 'from' ? 'bg-emerald-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                            <MapPin className="w-3 h-3" /> Set From
                                        </button>
                                        <button onClick={() => setRouteClickTarget('to')}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 font-medium transition-colors ${routeClickTarget === 'to' ? 'bg-rose-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                            <Navigation className="w-3 h-3" /> Set To
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                                        Type to search, or click a <strong className="text-gray-500">{routeClickTarget === 'from' ? 'From' : 'To'}</strong> pin on the map
                                    </p>

                                    {/* From */}
                                    <OfficePicker
                                        label="From" color="bg-emerald-700" Icon={MapPin}
                                        selected={fromOffice} search={fromSearch}
                                        onSearch={setFromSearch} onSelect={o => { setFromOffice(o); setRouteClickTarget('to'); }}
                                        onClear={() => setFromOffice(null)} offices={offices}
                                    />
                                    <div className="flex justify-center py-1.5">
                                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 rotate-90" />
                                    </div>
                                    {/* To */}
                                    <OfficePicker
                                        label="To" color="bg-rose-500" Icon={Navigation}
                                        selected={toOffice} search={toSearch}
                                        onSearch={setToSearch} onSelect={o => { setToOffice(o); setRouteClickTarget('from'); }}
                                        onClear={() => setToOffice(null)} offices={offices}
                                    />
                                </div>

                                {/* Route summary */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Route Summary</p>
                                        {usesFerry && <span className="flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-0.5 rounded-full"><Ship className="w-3 h-3" />Ferry</span>}
                                    </div>
                                    {!canRoute ? (
                                        <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-2">Select both offices to calculate route</p>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2.5">
                                                <div className="flex items-center gap-1.5 mb-1"><Route className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /><span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Distance</span></div>
                                                <p className="text-base font-bold text-emerald-800 dark:text-emerald-300">{distance || <span className="text-gray-300 dark:text-gray-600 text-sm font-normal">—</span>}</p>
                                            </div>
                                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2.5">
                                                <div className="flex items-center gap-1.5 mb-1"><Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" /><span className="text-xs text-blue-700 dark:text-blue-400 font-medium">Travel Time</span></div>
                                                <p className="text-base font-bold text-blue-800 dark:text-blue-300">{duration || <span className="text-gray-300 dark:text-gray-600 text-sm font-normal">—</span>}</p>
                                            </div>
                                        </div>
                                    )}
                                    {routeError && <p className="text-xs text-rose-500 dark:text-rose-400 mt-2">Could not calculate a route between these offices.</p>}
                                </div>

                                {/* Turn-by-turn directions */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0">
                                    <button onClick={() => setDirectionsOpen(!directionsOpen)} className="flex items-center justify-between w-full mb-2">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Directions</p>
                                        <div className="flex items-center gap-2">
                                            {steps.length > 0 && <span className="text-xs text-gray-400 dark:text-gray-500">{steps.length} steps</span>}
                                            <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${directionsOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-200 ${directionsOpen ? 'max-h-96' : 'max-h-0'}`}>
                                        {steps.length > 0 ? (
                                            <ol className="space-y-1 overflow-y-auto max-h-96 pr-1">
                                                {steps.map((step, i) => {
                                                    const isFerry = step.instruction.toLowerCase().includes('ferry');
                                                    return (
                                                        <li key={i}
                                                            onMouseEnter={() => setHoveredStep({ lat: step.lat, lng: step.lng })}
                                                            onMouseLeave={() => setHoveredStep(null)}
                                                            className="flex items-start gap-2.5 p-1.5 -mx-1.5 rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                                                            <span className={`flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 ${isFerry ? 'bg-sky-100 dark:bg-sky-900/40 text-sky-700' : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700'}`}>
                                                                {isFerry ? <Ship className="w-3 h-3" /> : i + 1}
                                                            </span>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs text-gray-700 dark:text-gray-200 leading-snug">{step.instruction}</p>
                                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{step.distance}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ol>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-center px-2 py-6">
                                                <Milestone className="w-5 h-5 text-gray-300 dark:text-gray-600 mb-1.5" />
                                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                                    {canRoute ? 'Calculating route…' : 'Select both offices above to see turn-by-turn directions'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── Add offices mode ── */}
                        {mode === 'addOffice' && (
                            <AddOfficeFlow
                                point={addOfficePoint}
                                step={addOfficeStep}
                                psgcMatch={addOfficePsgc}
                                allOffices={offices}
                                onCancel={cancelAddOffice}
                                onSaved={handleOfficeSaved}
                            />
                        )}
                        </div>

                    {/* ── Map panel ── */}
                    <div className="xl:col-span-2 flex flex-col min-h-0">
                        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm flex-1 relative">

                            {isMovingPin && movingOffice && (
                                <MovePinBanner office={movingOffice} onCancel={() => setMovingOffice(null)} />
                            )}

                            {/* Map legend — floating bottom-right */}
                            <div
                               style={{
                                    position: 'absolute',
                                    bottom: 12,
                                    right: 12,
                                    zIndex: 1000,
                                }}
                                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-md"
                            >
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">Map Legend</p>
                                <div className="flex flex-col gap-1">
                                    {Object.entries(LEVEL_CONFIG).map(([level, cfg]) => (
                                        <div key={level} className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full border border-white shadow-sm flex-shrink-0" style={{ background: cfg.color }} />
                                            <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">{cfg.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <MapContainer center={mapCenter} zoom={6} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />

                                <MapClickHandler onClick={handleMapClick} disabled={isMovingPin} />
                                <MovePinClickHandler active={isMovingPin} onPick={handleMovePinPick} />
                                <AddOfficeCursor active={mode === 'addOffice' && addOfficeStep === 'drop-pin'} />

                                <InvalidateOnResize trigger={panelOpen} />

                                {/* Fit bounds when both offices selected */}
                                {canRoute && routeStart && routeEnd && <FitBounds start={routeStart} end={routeEnd} />}

                                {/* Route calculation */}
                                {canRoute && routeStart && routeEnd && (
                                    <Routing
                                        start={routeStart} end={routeEnd}
                                        onRouteFound={(dist, dur, routeSteps, coords, ferry) => {
                                            setDistance(dist); setDuration(dur); setSteps(routeSteps);
                                            setRouteCoords(coords); setUsesFerry(ferry); setRouteError(false);
                                        }}
                                        onError={() => setRouteError(true)}
                                    />
                                )}

                                {/* Route polyline */}
                                {routeCoords.length > 0 && (
                                    <Polyline positions={routeCoords} pathOptions={{ color: '#10b981', weight: 4, opacity: 0.85 }} />
                                )}

                                {/* From/To circles */}
                                {fromOffice && <Circle center={[fromOffice.lat, fromOffice.lon]} radius={150} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.15, weight: 2 }} />}
                                {toOffice   && <Circle center={[toOffice.lat,   toOffice.lon  ]} radius={150} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 2 }} />}

                                {/* From/To pins */}
                                {fromOffice && (
                                    <Marker position={[fromOffice.lat, fromOffice.lon]} icon={fromIcon} />
                                )}
                                {toOffice && (
                                    <Marker position={[toOffice.lat, toOffice.lon]} icon={toIcon} />
                                )}

                                {/* Hovered step highlight */}
                                <PanTo point={hoveredStep} />
                                {hoveredStep && <Circle center={[hoveredStep.lat, hoveredStep.lng]} radius={50} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.4, weight: 3 }} />}

                                {/* Pan map to the selected office */}
                                <PanTo point={focusPoint} offsetXPercent={0.15} />

                                {/* Pan to the newly dropped office pin */}
                                {mode === 'addOffice' && <PanTo point={addOfficePoint} offsetXPercent={0.15} />}

                                {/* Dropped pin for the new office being added */}
                                {addOfficePoint && mode === 'addOffice' && (
                                    <>
                                        <Marker position={[addOfficePoint.lat, addOfficePoint.lng]} icon={fromIcon} />
                                        <Circle
                                            center={[addOfficePoint.lat, addOfficePoint.lng]}
                                            radius={60}
                                            pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.15, weight: 2, dashArray: '4 4' }}
                                        />
                                    </>
                                )}

                                {/* ── Office layer control ── */}
                                <LayersControl position="topright">
                                    {Object.entries(LEVEL_CONFIG).map(([level, config]) => (
                                        <LayersControl.Overlay
                                            key={`${level}-${officesByLevel[level]?.length ?? 0}`}
                                            name={`${config.label} (${officesByLevel[level]?.length ?? 0})`}
                                            checked={level === 'division' || level === 'district' || level === 'area' || level === 'branch'}
                                        >
                                            <LayerGroup>
                                                {officesByLevel[level]?.map(office => {
                                                    const isSelected = selectedOffice?.id === office.id;
                                                    const isHighlightedChild = highlightedChildIds.has(office.id);
                                                    const isFrom     = fromOffice?.id === office.id;
                                                    const isTo       = toOffice?.id === office.id;
                                                     if (isFrom || isTo) return null;

                                                     // When a "show descendants" filter is active, hide any office
                                                    // that isn't the focused parent or one of its descendants.
                                                    const filterActive = highlightedChildren.length > 0;
                                                    if (filterActive && !isHighlightedChild && !isSelected) return null;

                                                    const dimmed = isMovingPin && movingOffice?.id !== office.id;
                                                     return (
                                                         <Marker
                                                             key={office.id}
                                                             position={[office.lat, office.lon]}
                                                             icon={createLevelIcon(level, isSelected || isHighlightedChild, dimmed)}
                                                             eventHandlers={{ click: () => handleMarkerClick(office) }}
                                                         />
                                                     );
                                                 })}
                                            </LayerGroup>
                                        </LayersControl.Overlay>
                                    ))}
                                </LayersControl>
                            </MapContainer>
                        </div>

                        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 text-center flex-shrink-0">
                            {isMovingPin
                                ? <><span>Crosshair mode · Click anywhere to reposition · </span><button onClick={() => setMovingOffice(null)} className="underline">Cancel</button></>
                                : showDirections
                                    ? <>Clicking a pin will set it as <strong className="text-gray-500">{routeClickTarget === 'from' ? 'From' : 'To'}</strong> · Toggle layers top-right</>
                                    : mode === 'addOffice'
                                        ? <>Click anywhere on the map to place the new office's pin</>
                                        : mode === 'unmapped'
                                            ? <>Select an unmapped office and click "Move Pin" to place it</>
                                            : <>Click any office pin to view its details · Toggle office layers top-right</>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
