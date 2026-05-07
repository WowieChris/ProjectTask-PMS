// resources/js/pages/AssetManagement/Dashboard/Index.tsx

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function AssetDashboard() {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Asset Management', href: '/asset-management/dashboard' },
        ]}>
            <Head title="Asset Dashboard" />

            <div className="p-6">
                <h1 className="text-xl font-semibold">Asset Dashboard</h1>
            </div>
        </AppLayout>
    );
}