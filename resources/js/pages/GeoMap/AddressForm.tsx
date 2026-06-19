import { useState } from 'react';
import type { SelectedAddress } from '@/components/LocationSelector';
import LocationSelector from '@/components/LocationSelector';

export default function AddressForm() {
    const [address, setAddress] = useState<SelectedAddress | null>(null);

    const isComplete =
        address?.region && address?.province && address?.municipality && address?.barangay;

    const handleSubmit = () => {
        if (!isComplete) return;

        // Replace with your actual save logic (axios.post to your backend, etc.)
        console.log('Submitting address:', address);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Address Form
            </h1>

            <LocationSelector onChange={setAddress} />

            {address && (
                <div className="mt-4 p-4 border rounded text-sm space-y-1 bg-secondary">
                    <p>Region: {address.region?.name ?? '—'}</p>
                    <p>Province: {address.province?.name ?? '—'}</p>
                    <p>Municipality / City: {address.municipality?.name ?? '—'}</p>
                    <p>Barangay: {address.barangay?.name ?? '—'}</p>
                </div>
            )}

            <button
                type="button"
                onClick={handleSubmit}
                disabled={!isComplete}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                Submit
            </button>
        </div>
    );
}