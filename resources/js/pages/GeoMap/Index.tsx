import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

import L from "leaflet";
import { ChevronDown } from 'lucide-react';
import { useMap, MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMapEvents } from 'react-leaflet';

import AppLayout from '@/layouts/app-layout';
import { MapPin, Navigation, Route, Clock, ArrowRight, Milestone, Ship, Bookmark, X, Trash2 } from 'lucide-react';

// ── Colored pin factory — replaces the old unpkg PNG icons ──
function createColorIcon(color: string) {
    return new L.DivIcon({
        className: 'custom-pin-icon',
        html: `
            <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5s12.5-19.1 12.5-28.5C25 5.6 19.4 0 12.5 0z"
                      fill="${color}" stroke="#fff" stroke-width="1.5"/>
                <circle cx="12.5" cy="12.5" r="5" fill="#fff" fill-opacity="0.9"/>
            </svg>
        `,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -38],
    });
}

const fromIcon = createColorIcon('#10b981');          // emerald — From marker
const toIcon = createColorIcon('#ef4444');             // red — To marker
const savedIcon = createColorIcon('#f59e0b');          // amber — saved point, idle
const selectedSavedIcon = createColorIcon('#8b5cf6');  // violet — saved point currently used as From/To

type Position = { lat: number; lng: number };
type Step = { instruction: string; distance: string; lat: number; lng: number };
type SavedLocation = { id: number; label: string; lat: number; lng: number };
type AppMode = 'route' | 'save';

function MapClickHandler({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) { onLocationChange(e.latlng.lat, e.latlng.lng); },
    });
    return null;
}

function decodePolyline6(encoded: string): [number, number][] {
    let index = 0, lat = 0, lng = 0;
    const coordinates: [number, number][] = [];
    const factor = 1e6;

    while (index < encoded.length) {
        let byte, shift = 0, result = 0;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
        lat += deltaLat;

        shift = 0; result = 0;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
        lng += deltaLng;

        coordinates.push([lat / factor, lng / factor]);
    }
    return coordinates;
}

function Routing({
    start, end, onRouteFound, onError,
}: {
    start: Position;
    end: Position;
    onRouteFound: (distance: string, duration: string, steps: Step[], coords: [number, number][], usesFerry: boolean) => void;
    onError: () => void;
}) {
    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const res = await fetch('https://valhalla1.openstreetmap.de/route', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        locations: [
                            { lat: start.lat, lon: start.lng },
                            { lat: end.lat, lon: end.lng },
                        ],
                        costing: 'auto',
                        costing_options: { auto: { use_ferry: 1 } },
                        units: 'kilometers',
                    }),
                });

                const data = await res.json();

                if (!data.trip || !data.trip.legs?.[0]) {
                    console.error('No route found', data);
                    onError();
                    return;
                }

                const leg = data.trip.legs[0];
                const decoded = decodePolyline6(leg.shape);

                const steps: Step[] = leg.maneuvers.map((m: any) => {
                    const [lat, lng] = decoded[m.begin_shape_index];
                    return {
                        instruction: m.instruction,
                        distance: m.length >= 1
                            ? m.length.toFixed(1) + ' km'
                            : Math.round(m.length * 1000) + ' m',
                        lat,
                        lng,
                    };
                });

                const usesFerry = leg.maneuvers.some((m: any) =>
                    m.instruction?.toLowerCase().includes('ferry')
                );

                onRouteFound(
                    data.trip.summary.length.toFixed(2) + ' km',
                    Math.round(data.trip.summary.time / 60) + ' mins',
                    steps,
                    decoded,
                    usesFerry
                );
            } catch (err) {
                console.error('Valhalla routing error:', err);
                onError();
            }
        };

        fetchRoute();
    }, [start, end]);

    return null;
}

function FitBounds({ start, end }: { start: Position; end: Position }) {
    const map = useMap();

    useEffect(() => {
        const bounds = L.latLngBounds([start.lat, start.lng], [end.lat, end.lng]);
        map.fitBounds(bounds, { padding: [50, 50] });
    }, [map, start, end]);

    return null;
}

function PanToHover({ point }: { point: { lat: number; lng: number } | null }) {
    const map = useMap();
    useEffect(() => {
        if (point) {
            map.panTo([point.lat, point.lng], { animate: true, duration: 0.3 });
        }
    }, [point, map]);
    return null;
}

export default function Index() {
    const { props } = usePage<{ savedLocations?: SavedLocation[] }>();

    const [position, setPosition] = useState<Position>({ lat: 10.8110262, lng: 122.6562518 });
    const [destination, setDestination] = useState<Position>({ lat: 10.7202000, lng: 122.5628000 });
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [clickTarget, setClickTarget] = useState<'from' | 'to'>('from');
    const [steps, setSteps] = useState<Step[]>([]);
    const [directionsOpen, setDirectionsOpen] = useState(true);
    const [hoveredStep, setHoveredStep] = useState<{ lat: number; lng: number } | null>(null);
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
    const [usesFerry, setUsesFerry] = useState(false);
    const [routeError, setRouteError] = useState(false);

    const [mode, setMode] = useState<AppMode>('route');

    const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(props.savedLocations ?? []);
    const [pendingPoint, setPendingPoint] = useState<Position | null>(null);
    const [labelInput, setLabelInput] = useState('');
    const [saving, setSaving] = useState(false);

    const handleMapClick = (lat: number, lng: number) => {
        if (mode === 'save') {
            setPendingPoint({ lat, lng });
            setLabelInput('');
            return;
        }
        if (clickTarget === 'from') setPosition({ lat, lng });
        else setDestination({ lat, lng });
    };

    const handleSavedLocationClick = (loc: SavedLocation) => {
        if (mode === 'save') setMode('route');

        if (clickTarget === 'from') {
            setPosition({ lat: loc.lat, lng: loc.lng });
            setClickTarget('to');
        } else {
            setDestination({ lat: loc.lat, lng: loc.lng });
            setClickTarget('from');
        }
    };

    const confirmSaveLocation = () => {
        if (!pendingPoint || !labelInput.trim()) return;
        setSaving(true);

        router.post('/saved-locations', {
            label: labelInput.trim(),
            lat: pendingPoint.lat,
            lng: pendingPoint.lng,
        }, {
            preserveScroll: true,
            onSuccess: (page) => {
                const newLoc = (page.props as any).savedLocation as SavedLocation | undefined;
                if (newLoc) {
                    setSavedLocations((prev) => [newLoc, ...prev]);
                } else {
                    setSavedLocations((prev) => [
                        { id: Date.now(), label: labelInput.trim(), lat: pendingPoint.lat, lng: pendingPoint.lng },
                        ...prev,
                    ]);
                }
                setPendingPoint(null);
                setLabelInput('');
                setSaving(false);
            },
            onError: () => setSaving(false),
        });
    };

    const cancelSaveLocation = () => {
        setPendingPoint(null);
        setLabelInput('');
    };

    const deleteSavedLocation = (id: number) => {
        router.delete(`/saved-locations/${id}`, {
            preserveScroll: true,
            onSuccess: () => setSavedLocations((prev) => prev.filter((l) => l.id !== id)),
        });
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-screen max-h-screen p-4 gap-4 overflow-hidden">

                {/* Page Header */}
                <div className="flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                            <Route className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Geo Mapping</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Plan routes or save points of interest</p>
                        </div>
                    </div>

                    {/* ── Mode Toggle: Map Set vs Save Coordinates ── */}
                    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <button
                            onClick={() => setMode('route')}
                            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${mode === 'route'
                                ? 'bg-emerald-700 text-white'
                                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            <Route className="w-3.5 h-3.5" />
                            Map Set
                        </button>
                        <button
                            onClick={() => setMode('save')}
                            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${mode === 'save'
                                ? 'bg-amber-600 text-white'
                                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            <Bookmark className="w-3.5 h-3.5" />
                            Save Coordinates
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 flex-1 min-h-0">

                    {/* ── Left Panel ── */}
                    <div className="xl:col-span-1 flex flex-col gap-3 min-h-0 overflow-y-auto pr-1">

                        {/* Map Legend — visible in both modes */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                                Map Legend
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-xs text-gray-600 dark:text-gray-300">From</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    <span className="text-xs text-gray-600 dark:text-gray-300">To</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                    <span className="text-xs text-gray-600 dark:text-gray-300">Saved</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                                    <span className="text-xs text-gray-600 dark:text-gray-300">Active</span>
                                </div>
                            </div>
                        </div>

                        {mode === 'route' ? (
                            <>
                                {/* Click Mode Toggle (From/To) */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                                        Click map to set
                                    </p>
                                    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={() => setClickTarget('from')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${clickTarget === 'from'
                                                ? 'bg-emerald-700 text-white'
                                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <MapPin className="w-3.5 h-3.5" />
                                            From
                                        </button>
                                        <button
                                            onClick={() => setClickTarget('to')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${clickTarget === 'to'
                                                ? 'bg-emerald-700 text-white'
                                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <Navigation className="w-3.5 h-3.5" />
                                            To
                                        </button>
                                    </div>
                                </div>

                                {/* Coordinates Card */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-3 h-3 text-white" />
                                            </span>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">From</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs text-gray-400 dark:text-gray-500 mb-1">Latitude</label>
                                                <input
                                                    type="text"
                                                    value={position.lat}
                                                    onChange={(e) => setPosition({ ...position, lat: parseFloat(e.target.value) || 0 })}
                                                    className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-400 dark:text-gray-500 mb-1">Longitude</label>
                                                <input
                                                    type="text"
                                                    value={position.lng}
                                                    onChange={(e) => setPosition({ ...position, lng: parseFloat(e.target.value) || 0 })}
                                                    className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center py-1.5 bg-gray-50 dark:bg-gray-800/50">
                                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 rotate-90" />
                                    </div>

                                    <div className="p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
                                                <Navigation className="w-3 h-3 text-white" />
                                            </span>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">To</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs text-gray-400 dark:text-gray-500 mb-1">Latitude</label>
                                                <input
                                                    type="text"
                                                    value={destination.lat}
                                                    onChange={(e) => setDestination({ ...destination, lat: parseFloat(e.target.value) || 0 })}
                                                    className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-400 dark:text-gray-500 mb-1">Longitude</label>
                                                <input
                                                    type="text"
                                                    value={destination.lng}
                                                    onChange={(e) => setDestination({ ...destination, lng: parseFloat(e.target.value) || 0 })}
                                                    className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Route Summary */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                            Route Summary
                                        </p>
                                        {usesFerry && (
                                            <span className="flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-0.5 rounded-full">
                                                <Ship className="w-3 h-3" />
                                                Ferry
                                            </span>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2.5">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <Route className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Distance</span>
                                            </div>
                                            <p className="text-base font-bold text-emerald-800 dark:text-emerald-300">
                                                {distance || <span className="text-gray-300 dark:text-gray-600 text-sm font-normal">—</span>}
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2.5">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                                <span className="text-xs text-blue-700 dark:text-blue-400 font-medium">Travel Time</span>
                                            </div>
                                            <p className="text-base font-bold text-blue-800 dark:text-blue-300">
                                                {duration || <span className="text-gray-300 dark:text-gray-600 text-sm font-normal">—</span>}
                                            </p>
                                        </div>
                                    </div>
                                    {routeError && (
                                        <p className="text-xs text-rose-500 dark:text-rose-400 mt-2">
                                            Could not calculate a route between these points.
                                        </p>
                                    )}
                                </div>

                                {/* Directions — collapsible */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-shrink-0">
                                    <button
                                        onClick={() => setDirectionsOpen(!directionsOpen)}
                                        className="flex items-center justify-between w-full mb-2 flex-shrink-0"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                            Directions
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {steps.length > 0 && (
                                                <span className="text-xs text-gray-400 dark:text-gray-500">{steps.length} steps</span>
                                            )}
                                            <ChevronDown
                                                className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${directionsOpen ? 'rotate-180' : ''}`}
                                            />
                                        </div>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-200 ${directionsOpen ? 'max-h-96' : 'max-h-0'}`}>
                                        {steps.length > 0 ? (
                                            <ol className="space-y-1 overflow-y-auto max-h-96 pr-1">
                                                {steps.map((step, i) => {
                                                    const isFerryStep = step.instruction.toLowerCase().includes('ferry');
                                                    return (
                                                        <li
                                                            key={i}
                                                            onMouseEnter={() => setHoveredStep({ lat: step.lat, lng: step.lng })}
                                                            onMouseLeave={() => setHoveredStep(null)}
                                                            className="flex items-start gap-2.5 p-1.5 -mx-1.5 rounded-lg cursor-pointer transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/20 active:bg-emerald-100 dark:active:bg-emerald-900/30"
                                                        >
                                                            <span className={`flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 ${isFerryStep
                                                                ? 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400'
                                                                : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                                                                }`}>
                                                                {isFerryStep ? <Ship className="w-3 h-3" /> : i + 1}
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
                                                    Directions will appear here once a route is calculated
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* ── Save Coordinates mode UI ── */}
                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 flex-shrink-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Bookmark className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Save Coordinates Mode</p>
                                    </div>
                                    <p className="text-xs text-amber-700 dark:text-amber-400">
                                        Click anywhere on the map to drop a pin and save it with a label.
                                    </p>
                                </div>

                                {/* Label form — appears when a point is pending */}
                                {pendingPoint && (
                                    <div className="bg-white dark:bg-gray-900 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-3 flex-shrink-0 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                                New Location
                                            </p>
                                            <button onClick={cancelSaveLocation} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {pendingPoint.lat.toFixed(6)}, {pendingPoint.lng.toFixed(6)}
                                        </p>
                                        <input
                                            type="text"
                                            autoFocus
                                            value={labelInput}
                                            onChange={(e) => setLabelInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && confirmSaveLocation()}
                                            placeholder="e.g. Dumangas Port Office"
                                            className="w-full text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={confirmSaveLocation}
                                                disabled={!labelInput.trim() || saving}
                                                className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                                            >
                                                {saving ? 'Saving…' : 'Save Location'}
                                            </button>
                                            <button
                                                onClick={cancelSaveLocation}
                                                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Saved locations list */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex-1 min-h-0 flex flex-col">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 flex-shrink-0">
                                        Saved Locations ({savedLocations.length})
                                    </p>

                                    {savedLocations.length > 0 ? (
                                        <ul className="space-y-1.5 overflow-y-auto flex-1 min-h-0 pr-1">
                                            {savedLocations.map((loc) => (
                                                <li
                                                    key={loc.id}
                                                    className="flex items-start justify-between gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 group"
                                                >
                                                    <div className="flex items-start gap-2 min-w-0">
                                                        <Bookmark className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">{loc.label}</p>
                                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                                {loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteSavedLocation(loc.id)}
                                                        className="flex-shrink-0 text-gray-300 dark:text-gray-600 hover:text-rose-500 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-6">
                                            <Bookmark className="w-5 h-5 text-gray-300 dark:text-gray-600 mb-1.5" />
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                No saved locations yet. Click the map to add one.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* ── Map Panel ── */}
                    <div className="xl:col-span-2 flex flex-col min-h-0">
                        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm flex-1">
                            <MapContainer
                                center={[position.lat, position.lng]}
                                zoom={13}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                <MapClickHandler onLocationChange={handleMapClick} />

                                {mode === 'route' && (
                                    <>
                                        <FitBounds start={position} end={destination} />

                                        <Routing
                                            start={position}
                                            end={destination}
                                            onRouteFound={(dist, dur, routeSteps, coords, ferry) => {
                                                setDistance(dist);
                                                setDuration(dur);
                                                setSteps(routeSteps);
                                                setRouteCoords(coords);
                                                setUsesFerry(ferry);
                                                setRouteError(false);
                                            }}
                                            onError={() => setRouteError(true)}
                                        />

                                        {routeCoords.length > 0 && (
                                            <Polyline
                                                positions={routeCoords}
                                                pathOptions={{ color: '#10b981', weight: 4, opacity: 0.85 }}
                                            />
                                        )}

                                        <Circle
                                            center={[position.lat, position.lng]}
                                            radius={100}
                                            pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.2, weight: 2 }}
                                        />
                                        <Circle
                                            center={[destination.lat, destination.lng]}
                                            radius={100}
                                            pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2, weight: 2 }}
                                        />

                                        <PanToHover point={hoveredStep} />
                                        {hoveredStep && (
                                            <Circle
                                                center={[hoveredStep.lat, hoveredStep.lng]}
                                                radius={40}
                                                pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.4, weight: 3 }}
                                            />
                                        )}

                                        <Marker
                                            position={[position.lat, position.lng]}
                                            draggable={true}
                                            icon={fromIcon}
                                            eventHandlers={{
                                                dragend: (e) => {
                                                    const pos = e.target.getLatLng();
                                                    setPosition({ lat: pos.lat, lng: pos.lng });
                                                },
                                            }}
                                        >
                                            <Popup><strong>From</strong><br />{position.lat.toFixed(6)}, {position.lng.toFixed(6)}</Popup>
                                        </Marker>

                                        <Marker
                                            position={[destination.lat, destination.lng]}
                                            draggable={true}
                                            icon={toIcon}
                                            eventHandlers={{
                                                dragend: (e) => {
                                                    const pos = e.target.getLatLng();
                                                    setDestination({ lat: pos.lat, lng: pos.lng });
                                                },
                                            }}
                                        >
                                            <Popup><strong>To</strong><br />{destination.lat.toFixed(6)}, {destination.lng.toFixed(6)}</Popup>
                                        </Marker>
                                    </>
                                )}

                                {/* Saved location markers — color reflects whether they're currently active */}
                                {savedLocations.map((loc) => {
                                    const isCurrentlyUsed =
                                        (loc.lat === position.lat && loc.lng === position.lng) ||
                                        (loc.lat === destination.lat && loc.lng === destination.lng);

                                    return (
                                        <Marker
                                            key={loc.id}
                                            position={[loc.lat, loc.lng]}
                                            icon={isCurrentlyUsed ? selectedSavedIcon : savedIcon}
                                            eventHandlers={{
                                                click: () => handleSavedLocationClick(loc),
                                            }}
                                        >
                                            <Popup>
                                                <strong>{loc.label}</strong><br />
                                                {loc.lat.toFixed(6)}, {loc.lng.toFixed(6)}
                                                <br />
                                                <span className="text-xs text-gray-500">Click marker again to set as {clickTarget === 'from' ? 'To' : 'From'}</span>
                                            </Popup>
                                        </Marker>
                                    );
                                })}

                                {/* Pending point marker — while labeling */}
                                {pendingPoint && (
                                    <Circle
                                        center={[pendingPoint.lat, pendingPoint.lng]}
                                        radius={60}
                                        pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.3, weight: 2, dashArray: '4 4' }}
                                    />
                                )}
                            </MapContainer>
                        </div>

                        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 text-center flex-shrink-0">
                            {mode === 'route'
                                ? <>Click map to place <strong className="text-gray-500">{clickTarget === 'from' ? 'From' : 'To'}</strong> marker · Drag either marker to adjust</>
                                : <>Click anywhere on the map to save a new labeled location</>
                            }
                        </p>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}