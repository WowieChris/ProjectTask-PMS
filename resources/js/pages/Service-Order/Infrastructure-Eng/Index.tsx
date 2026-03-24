import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function InfrastructureEng() {
    return (
        <AppLayout>
            <Head title="Infrastructure Engineering" />

            <div className="p-6">
                <h1 className="text-2xl font-bold">Infrastructure Engineer</h1>
                <p className="mt-2 text-gray-500">
                    Manage infrastructure-related service orders.
                </p>
            </div>
        </AppLayout>
    );
}