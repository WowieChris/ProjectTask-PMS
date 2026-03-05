import { Head } from '@inertiajs/react';
import { CircleAlert, Home, User2 } from 'lucide-react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];


export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 col-span-2">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {/* total users card */}
                    <div className="relative aspect-video gap-2 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border  bg-neutral-100 dark:bg-neutral-900 midnight:bg-[#040622] mondstadt:bg-teal-200/10 flex flex-col p-4">
                        <div><h3 className="text-lg font-semibold">Total Users:</h3></div>
                        <div className='flex mx-auto gap-2 my-auto'><User2 size={36} className='my-auto text-primary bg-muted-foreground rounded-md p-1' /><span className="text-4xl font-bold">24</span></div>
                    </div>

                    {/* users per designation card */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-neutral-100 dark:bg-neutral-900 midnight:bg-[#040622] mondstadt:bg-teal-200/10 flex flex-col items-center justify-center p-4">
                        <h3 className="text-lg font-semibold">Users per Designation</h3>
                        <span className="text-4xl font-bold mt-2">
                        <ul className="text-2xl mt-2 flex flex-row items-start gap-6">
                            <li>TSE: 4</li>
                            <li>IE: 5</li>
                            <li>FE: 15</li>
                        </ul>   
                        </span>
                    </div>

                    {/* active users card */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-neutral-100 dark:bg-muted midnight:bg-muted mondstadt:bg-muted flex flex-col items-center justify-center p-4">
                        <h3 className="text-lg font-semibold">Active Users</h3>
                        <span className="text-4xl font-bold mt-2">17</span>
                    </div>
                   
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-muted midnight:bg-muted mondstadt:bg-muted flex flex-col items-center justify-center p-4">
                        <Home size={30} className='text-primary bg-primary/10 rounded-sm p-1 mt-3 ml-3'/>
                        <CircleAlert size={30} className='text-destructive bg-destructive/20 rounded-sm p-1 mt-3 ml-3 '/>
                    </div>
                </div>
                <div className='grid grid-cols-3 h-full gap-4'>
                    <div className="col-span-2 relative min-h-[100vh] overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-neutral-100 dark:bg-muted midnight:bg-muted mondstadt:bg-muted p-6">
                    <h3 className="text-2xl font-semibold mb-4">Users Activity - Last 7 Days</h3>
                    <svg viewBox="0 0 800 300" className="w-full h-full max-h-96" preserveAspectRatio="xMidYMid meet">
                        {/* Grid lines */}
                        <line x1="50" y1="30" x2="50" y2="250" stroke="currentColor" strokeWidth="2" className="text-neutral-400 dark:text-neutral-600" />
                        <line x1="50" y1="250" x2="750" y2="250" stroke="currentColor" strokeWidth="2" className="text-neutral-400 dark:text-neutral-600" />
                        
                        {/* Horizontal grid lines */}
                        <line x1="50" y1="100" x2="750" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-neutral-300 dark:text-neutral-700" />
                        <line x1="50" y1="150" x2="750" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-neutral-300 dark:text-neutral-700" />
                        <line x1="50" y1="200" x2="750" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-neutral-300 dark:text-neutral-700" />
                        
                        {/* Active Users line (Total: 17) */}
                        <polyline points="100,180 200,160 300,140 400,120 500,100 600,110 700,90" stroke="currentColor" strokeWidth="3" className='stroke-chart-1' fill='none' />
                        
                        {/* Inactive Users line (Total: 7) */}
                        <polyline points="100,220 200,210 300,215 400,225 500,218 600,220 700,225" stroke="currentColor" strokeWidth="3" className='stroke-chart-2' fill="none" />
                        
                        {/* Data points for Active */}
                        <circle cx="100" cy="180" r="4" className='fill-chart-1' />
                        <circle cx="200" cy="160" r="4" className='fill-chart-1' />
                        <circle cx="300" cy="140" r="4" className='fill-chart-1' />
                        <circle cx="400" cy="120" r="4" className='fill-chart-1' />
                        <circle cx="500" cy="100" r="4" className='fill-chart-1' />
                        <circle cx="600" cy="110" r="4" className='fill-chart-1' />
                        <circle cx="700" cy="90" r="4" className='fill-chart-1' />
                        
                        {/* Data points for Inactive */}
                        <circle cx="100" cy="220" r="4" className='fill-chart-2' />
                        <circle cx="200" cy="210" r="4" className='fill-chart-2' />
                        <circle cx="300" cy="215" r="4" className='fill-chart-2' />
                        <circle cx="400" cy="225" r="4" className='fill-chart-2' />
                        <circle cx="500" cy="218" r="4" className='fill-chart-2' />
                        <circle cx="600" cy="220" r="4" className='fill-chart-2' />
                        <circle cx="700" cy="225" r="4" className='fill-chart-2' />
                        
                        {/* X-axis labels */}
                        <text x="100" y="270" textAnchor="middle" fontSize="12" stroke='currentColor' className="text-card-foreground">Mon</text>
                        <text x="200" y="270" textAnchor="middle" fontSize="12" stroke='currentColor' className="text-card-foreground">Tue</text>
                        <text x="300" y="270" textAnchor="middle" fontSize="12" stroke='currentColor' className="text-card-foreground">Wed</text>
                        <text x="400" y="270" textAnchor="middle" fontSize="12" stroke='currentColor' className="text-card-foreground">Thu</text>
                        <text x="500" y="270" textAnchor="middle" fontSize="12" stroke='currentColor' className="text-card-foreground">Fri</text>
                        <text x="600" y="270" textAnchor="middle" fontSize="12" stroke='currentColor' className="text-card-foreground">Sat</text>
                        <text x="700" y="270" textAnchor="middle" fontSize="12" stroke='currentColor' className="text-card-foreground">Sun</text>
                        
                        {/* Y-axis labels */}
                        <text x="35" y="255" textAnchor="end" fontSize="12" stroke='currentColor' className="text-card-foreground">0</text>
                        <text x="35" y="205" textAnchor="end" fontSize="12" stroke='currentColor' className="text-card-foreground">5</text>
                        <text x="35" y="155" textAnchor="end" fontSize="12" stroke='currentColor' className="text-card-foreground">10</text>
                        <text x="35" y="105" textAnchor="end" fontSize="12" stroke='currentColor' className="text-card-foreground">15</text>
                        <text x="35" y="55" textAnchor="end" fontSize="12" stroke='currentColor' className="text-card-foreground">20</text>
                    </svg>
                    
                    {/* Legend */}
                    <div className="flex gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-chart-1 rounded"></div>
                            <span className="text-sm">Active Users (17)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-chart-2 rounded"></div>
                            <span className="text-sm">Inactive Users (7)</span>
                        </div>
                    </div>
                </div>
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    
                </div>
            </div>
        </AppLayout>
    );
}
