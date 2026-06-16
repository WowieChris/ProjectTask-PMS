import { useState } from 'react';
import axios from 'axios';

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents
} from 'react-leaflet';

import L from 'leaflet';
import AppLayout from '@/layouts/app-layout';

const markerIcon = new L.Icon({
    iconUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

    shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

type Position = {
    lat: number;
    lng: number;
};

function MapClickHandler({
    onLocationChange,
}: {
    onLocationChange: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click(e) {
            onLocationChange(
                e.latlng.lat,
                e.latlng.lng
            );
        },
    });

    return null;
}

export default function Index() {
    const [name, setName] = useState('');

    const [address, setAddress] = useState('');

    const [position, setPosition] =
        useState<Position>({
            lat: 14.6507,
            lng: 121.0494,
        });

    const [loading, setLoading] =
        useState(false);

    async function reverseGeocode(
        lat: number,
        lng: number
    ) {
        try {
            const response = await axios.post(
                '/api/reverse-geocode',
                {
                    latitude: lat,
                    longitude: lng,
                }
            );

            setAddress(
                response.data.address ?? ''
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function searchAddress() {
        if (!address) return;

        try {
            setLoading(true);

            const response = await axios.post(
                '/api/geocode',
                {
                    address,
                }
            );

            setPosition({
                lat: response.data.latitude,
                lng: response.data.longitude,
            });

            setAddress(
                response.data.address
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function saveBranch() {
        try {
            setLoading(true);

            await axios.post(
                '/api/geomap-branches',
                {
                    name,
                    address,
                    latitude: position.lat,
                    longitude: position.lng,
                }
            );

            alert('Branch saved!');
        } catch (error) {
            console.error(error);
            alert('Failed to save');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout>
            <div className="p-4 space-y-4">

                <h1 className="text-2xl font-bold">
                    Geo Mapping
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        placeholder="Branch Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="border p-2 rounded"
                    />

                    <div className="flex gap-2">

                        <input
                            type="text"
                            placeholder="Search Address"
                            value={address}
                            onChange={(e) =>
                                setAddress(
                                    e.target.value
                                )
                            }
                            className="border p-2 rounded w-full"
                        />

                        <button
                            onClick={
                                searchAddress
                            }
                            className="bg-blue-500 text-white px-4 rounded"
                        >
                            Search
                        </button>

                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                    <div>

                        <MapContainer
                            center={[
                                position.lat,
                                position.lng,
                            ]}
                            zoom={17}
                            style={{
                                height:
                                    '600px',
                                width:
                                    '100%',
                            }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <MapClickHandler
                                onLocationChange={async (
                                    lat,
                                    lng
                                ) => {
                                    setPosition({
                                        lat,
                                        lng,
                                    });

                                    await reverseGeocode(
                                        lat,
                                        lng
                                    );
                                }}
                            />

                            <Marker
                                position={[
                                    position.lat,
                                    position.lng,
                                ]}
                                draggable={true}
                                icon={
                                    markerIcon
                                }
                                eventHandlers={{
                                    dragend:
                                        async (
                                            e
                                        ) => {
                                            const marker =
                                                e.target;

                                            const pos =
                                                marker.getLatLng();

                                            setPosition(
                                                {
                                                    lat: pos.lat,
                                                    lng: pos.lng,
                                                }
                                            );

                                            await reverseGeocode(
                                                pos.lat,
                                                pos.lng
                                            );
                                        },
                                }}
                            >
                                <Popup>
                                    Branch
                                    Location
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                    <div className="space-y-4">

                        <div className="border rounded p-4">

                            <h2 className="font-bold mb-2">
                                Location
                            </h2>

                            <p>
                                <strong>
                                    Latitude:
                                </strong>{' '}
                                {
                                    position.lat
                                }
                            </p>

                            <p>
                                <strong>
                                    Longitude:
                                </strong>{' '}
                                {
                                    position.lng
                                }
                            </p>

                        </div>

                        <div className="border rounded p-4">

                            <h2 className="font-bold mb-2">
                                Address
                            </h2>

                            <textarea
                                value={
                                    address
                                }
                                onChange={(
                                    e
                                ) =>
                                    setAddress(
                                        e.target
                                            .value
                                    )
                                }
                                className="w-full border rounded p-2"
                                rows={5}
                            />

                        </div>

                        <button
                            onClick={
                                saveBranch
                            }
                            disabled={
                                loading
                            }
                            className="bg-green-600 text-white px-6 py-3 rounded"
                        >
                            Save Branch
                        </button>

                    </div>
                </div>
            </div>
        </AppLayout>

    );
}