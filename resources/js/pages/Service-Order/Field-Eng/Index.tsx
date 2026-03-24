import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function FieldEng() {
    return (
        <AppLayout>
            <Head title="Field Engineering" />

            <div className="p-6">
                <h1 className="text-2xl font-bold">Field Engineer</h1>
                <p className="mt-2 text-gray-500">
                    Manage Field Engineer service orders here.
                </p>
            </div>
        </AppLayout>
    );
}