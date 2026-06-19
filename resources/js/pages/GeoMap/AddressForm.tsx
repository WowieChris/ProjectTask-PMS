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
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-slate-100">
                Address Form
            </h1>

            <LocationSelector onChange={setAddress} />

            {/* Address Summary - Always visible with better styling */}
            <div className="mt-6 p-4 border border-slate-700/50 rounded-xl bg-slate-800/40">
                <div className="text-sm space-y-2">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
                        Selected Address
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium min-w-[100px]">Region:</span>
                            <span className={`text-sm ${address?.region ? 'text-slate-200' : 'text-slate-500'}`}>
                                {address?.region?.name ?? '—'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium min-w-[100px]">Province:</span>
                            <span className={`text-sm ${address?.province ? 'text-slate-200' : 'text-slate-500'}`}>
                                {address?.province?.name ?? '—'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium min-w-[100px]">Municipality / City:</span>
                            <span className={`text-sm ${address?.municipality ? 'text-slate-200' : 'text-slate-500'}`}>
                                {address?.municipality?.name ?? '—'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium min-w-[100px]">Barangay:</span>
                            <span className={`text-sm ${address?.barangay ? 'text-slate-200' : 'text-slate-500'}`}>
                                {address?.barangay?.name ?? '—'}
                            </span>
                        </div>
                    </div>

                    {isComplete && (
                        <div className="mt-3 pt-3 border-t border-slate-700/30">
                            <p className="text-xs text-slate-400 mb-1">Full Address</p>
                            <p className="text-sm text-emerald-300 font-medium">
                                {address.region?.name}
                                {", "}
                                {address.province?.name}
                                {", "}
                                {address.municipality?.name}
                                {", "}
                                {address.barangay?.name}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                disabled={!isComplete}
                className={`mt-6 w-full px-6 py-3 rounded-xl font-medium transition-all duration-200
                    ${isComplete
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30'
                        : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    }`}
            >
                {isComplete ? 'Submit Address' : 'Complete all fields to submit'}
            </button>
        </div>
    );
}