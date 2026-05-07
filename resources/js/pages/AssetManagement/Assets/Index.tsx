import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Asset Management', href: '/asset-management/assets' },
        ]}>
            <Head title="Assets"></Head>
            <div className="p-6">
                <h1 className="text-xl font-semibold">
                    Asset Management
                </h1>
            </div>
        </AppLayout>
    );
}