import { useEffect, useMemo, useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import L from 'leaflet';
import { ChevronDown, Eye } from 'lucide-react';
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
type SavedLocation = { id: number; label: string; lat: number; lng: number };
type AppMode       = 'browse' | 'save' | 'address';

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

function PanTo({ point }: { point: Position | null }) {
    const map = useMap();
    useEffect(() => { if (point) map.panTo([point.lat, point.lng], { animate: true, duration: 0.3 }); }, [point?.lat, point?.lng, map]);
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


// ─── Office info card (left panel) ───────────────────────────────────────────

function OfficeInfoCard({ office, allOffices, onGetDirections, onMovePin, onClose }: {
    office: Office;
    allOffices: Office[];
    onGetDirections: () => void;
    onMovePin: () => void;
    onClose: () => void;
}) {
    const levelCfg = LEVEL_CONFIG[office.level];
    const levelLabel = levelCfg ? levelCfg.label.replace(/s$/, '') : office.level;
    const { area, district, division } = getOfficeHierarchy(office, allOffices);
    const addressLines = office.address ? office.address.split(',').map(s => s.trim()).filter(Boolean) : [];

    const hierarchyRows = [
        { label: 'Area',     value: area?.name },
        { label: 'District', value: district?.name },
        { label: 'Division', value: division?.name },
    ].filter(row => row.value); // only show levels above the current office

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
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">{office.name}</p>

            {/* Hierarchy */}
            {hierarchyRows.length > 0 && (
                <>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Hierarchy</p>
                    <div className="mb-3 space-y-1.5">
                        {hierarchyRows.map(row => (
                            <div key={row.label}>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{row.label}</p>
                                <p className="text-xs text-gray-700 dark:text-gray-200 pl-3">
                                    <span className="text-gray-300 dark:text-gray-600">└── </span>{row.value}
                                </p>
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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Index() {
    const { props } = usePage<{ savedLocations?: SavedLocation[] }>();

    // App mode
    const [mode, setMode] = useState<AppMode>('browse');

    // Selected office (shown in left panel on marker click)
    const [selectedOffice,  setSelectedOffice]  = useState<Office | null>(null);

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

    // Save-coordinates
    const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(props.savedLocations ?? []);
    const [pendingPoint,   setPendingPoint]   = useState<Position | null>(null);
    const [labelInput,     setLabelInput]     = useState('');
    const [saving,         setSaving]         = useState(false);

    // Address
    const [selectedAddress, setSelectedAddress] = useState<SelectedAddress | null>(null);

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
        for (const o of offices) if (grouped[o.level]) grouped[o.level].push(o);
        return grouped;
    }, [offices]);

    const isMovingPin = !!movingOffice;

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

    // Panel is visible whenever there is content to show
    const showPanel = mode !== 'browse' || showDirections || !!selectedOffice;

    // Marker click handler
    function handleMarkerClick(office: Office) {
        if (isMovingPin) return;
        if (showDirections) {
            // In directions mode — set as From or To
            if (routeClickTarget === 'from') { setFromOffice(office); setFromSearch(''); setRouteClickTarget('to'); }
            else                             { setToOffice(office);   setToSearch('');   setRouteClickTarget('from'); }
        } else {
            setSelectedOffice(office);
            setMode('browse');
        }
    }

    // Map click (save mode only — directions uses marker clicks)
    function handleMapClick(lat: number, lng: number) {
        if (mode === 'save') { setPendingPoint({ lat, lng }); setLabelInput(''); }
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

    function openDirections(preFrom?: Office) {
        setShowDirections(true);
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

    // Save location
    const confirmSaveLocation = () => {
        if (!pendingPoint || !labelInput.trim()) return;
        setSaving(true);
        router.post('/saved-locations', { label: labelInput.trim(), lat: pendingPoint.lat, lng: pendingPoint.lng }, {
            preserveScroll: true,
            onSuccess: (page) => {
                const newLoc = (page.props as any).savedLocation as SavedLocation | undefined;
                setSavedLocations(prev => [newLoc ?? { id: Date.now(), label: labelInput.trim(), lat: pendingPoint.lat, lng: pendingPoint.lng }, ...prev]);
                setPendingPoint(null); setLabelInput(''); setSaving(false);
            },
            onError: () => setSaving(false),
        });
    };

    const deleteSavedLocation = (id: number) =>
        router.delete(`/saved-locations/${id}`, { preserveScroll: true, onSuccess: () => setSavedLocations(prev => prev.filter(l => l.id !== id)) });

    const handleAddressSubmit = () => {
        if (!selectedAddress?.region || !selectedAddress?.province || !selectedAddress?.municipality || !selectedAddress?.barangay) return;
        router.post('/addresses', {
            region: selectedAddress.region.name, province: selectedAddress.province.name,
            municipality: selectedAddress.municipality.name, barangay: selectedAddress.barangay.name,
        }, { preserveScroll: true, onSuccess: () => setSelectedAddress(null) });
    };

    const isAddressComplete = !!(selectedAddress?.region && selectedAddress?.province && selectedAddress?.municipality && selectedAddress?.barangay);

    // Default center — Philippines
    const mapCenter: [number, number] = [12.8797, 121.774];

    return (
        <AppLayout>
            <div className="flex flex-col h-screen max-h-screen p-4 gap-4 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                            <Route className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Geo Mapping</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Click a pin to view details · Get directions between offices</p>
                        </div>
                    </div>

                    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                        {([
                            { key: 'save'    as const, label: 'Save Coordinates', Icon: Bookmark,    active: 'bg-amber-600'   },
                            { key: 'address' as const, label: 'Address',          Icon: MapPinHouse, active: 'bg-blue-600'    },
                        ]).map(({ key, label, Icon, active }) => (
                            <button key={key} onClick={() => setMode(prev => prev === key ? 'browse' : key)}
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
                                        onGetDirections={() => openDirections(selectedOffice)}
                                        onMovePin={() => { setMovingOffice(selectedOffice); }}
                                        onClose={() => setSelectedOffice(null)}
                                    />
                                ) : (
                                    <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex-shrink-0 flex flex-col items-center justify-center text-center gap-2">
                                        <MapPin className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Click any office pin on the map to view its details here</p>
                                    </div>
                                )}
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

                        {/* ── Save coordinates mode ── */}
                        {mode === 'save' && (
                            <>
                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 flex-shrink-0">
                                    <div className="flex items-center gap-2 mb-1"><Bookmark className="w-4 h-4 text-amber-700 dark:text-amber-400" /><p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Save Coordinates Mode</p></div>
                                    <p className="text-xs text-amber-700 dark:text-amber-400">Click anywhere on the map to drop a pin and save it with a label.</p>
                                </div>
                                {pendingPoint && (
                                    <div className="bg-white dark:bg-gray-900 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-3 flex-shrink-0 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">New Location</p>
                                            <button onClick={() => { setPendingPoint(null); setLabelInput(''); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-4 h-4" /></button>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{pendingPoint.lat.toFixed(6)}, {pendingPoint.lng.toFixed(6)}</p>
                                        <input type="text" autoFocus value={labelInput} onChange={e => setLabelInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && confirmSaveLocation()} placeholder="e.g. Dumangas Port Office"
                                            className="w-full text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                                        <div className="flex gap-2">
                                            <button onClick={confirmSaveLocation} disabled={!labelInput.trim() || saving} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">{saving ? 'Saving…' : 'Save Location'}</button>
                                            <button onClick={() => { setPendingPoint(null); setLabelInput(''); }} className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Cancel</button>
                                        </div>
                                    </div>
                                )}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-1 min-h-0 flex flex-col">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 flex-shrink-0">Saved Locations ({savedLocations.length})</p>
                                    {savedLocations.length > 0 ? (
                                        <ul className="space-y-1.5 overflow-y-auto flex-1 min-h-0 pr-1">
                                            {savedLocations.map(loc => (
                                                <li key={loc.id} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 group">
                                                    <div className="flex items-start gap-2 min-w-0">
                                                        <Bookmark className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">{loc.label}</p>
                                                            <p className="text-xs text-gray-400 dark:text-gray-500">{loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => deleteSavedLocation(loc.id)} className="flex-shrink-0 text-gray-300 dark:text-gray-600 hover:text-rose-500 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-6">
                                            <Bookmark className="w-5 h-5 text-gray-300 dark:text-gray-600 mb-1.5" />
                                            <p className="text-xs text-gray-400 dark:text-gray-500">No saved locations yet. Click the map to add one.</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* ── Address mode ── */}
                        {mode === 'address' && (
                            <>
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 flex-shrink-0">
                                    <div className="flex items-center gap-2 mb-1"><MapPinHouse className="w-4 h-4 text-blue-700 dark:text-blue-400" /><p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Address Mode</p></div>
                                    <p className="text-xs text-blue-700 dark:text-blue-400">Select a region, province, municipality, and barangay to save an address.</p>
                                </div>
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex-1 min-h-0">
                                    <div className="p-3 h-full overflow-y-auto"><LocationSelector onChange={setSelectedAddress} /></div>
                                </div>
                                {selectedAddress && (
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0 space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Selected Address</p>
                                        <div className="text-xs space-y-1">
                                            {(['region', 'province', 'municipality', 'barangay'] as const).map(k => (
                                                <p key={k} className="text-gray-600 dark:text-gray-300">
                                                    <span className="text-gray-400 dark:text-gray-500 capitalize">{k}:</span>{' '}
                                                    {(selectedAddress as any)[k]?.name || '—'}
                                                </p>
                                            ))}
                                        </div>
                                        <button onClick={handleAddressSubmit} disabled={!isAddressComplete}
                                            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${isAddressComplete ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}`}>
                                            Save Address
                                        </button>
                                    </div>
                                )}
                            </>
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
                                                    const isFrom     = fromOffice?.id === office.id;
                                                    const isTo       = toOffice?.id === office.id;
                                                    const dimmed     = isMovingPin && movingOffice?.id !== office.id;
                                                    if (isFrom || isTo) return null;
                                                    return (
                                                        <Marker
                                                            key={office.id}
                                                            position={[office.lat, office.lon]}
                                                            icon={createLevelIcon(level, isSelected, dimmed)}
                                                            eventHandlers={{ click: () => handleMarkerClick(office) }}
                                                        />
                                                    );
                                                })}
                                            </LayerGroup>
                                        </LayersControl.Overlay>
                                    ))}
                                </LayersControl>

                                {/* Save mode pending point */}
                                {pendingPoint && mode === 'save' && (
                                    <Circle center={[pendingPoint.lat, pendingPoint.lng]} radius={60} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.3, weight: 2, dashArray: '4 4' }} />
                                )}

                                {/* Saved location markers */}
                                {savedLocations.map(loc => (
                                    <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={savedIcon} />
                                ))}
                            </MapContainer>
                        </div>

                        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 text-center flex-shrink-0">
                            {isMovingPin
                                ? <><span>Crosshair mode · Click anywhere to reposition · </span><button onClick={() => setMovingOffice(null)} className="underline">Cancel</button></>
                                : showDirections
                                    ? <>Clicking a pin will set it as <strong className="text-gray-500">{routeClickTarget === 'from' ? 'From' : 'To'}</strong> · Toggle layers top-right</>
                                    : mode === 'save'
                                        ? <>Click anywhere on the map to save a new labeled location</>
                                        : mode === 'address'
                                            ? <>Select a complete Philippine address from the dropdowns above</>
                                            : <>Click any office pin to view its details · Toggle office layers top-right</>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}