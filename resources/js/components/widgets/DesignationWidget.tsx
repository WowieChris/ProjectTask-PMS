import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { designations } from '@/routes/dashboard';

interface DesignationCount {
    designation: string | null;
    count: number;
}

export default function DesignationWidget() {
    const [data, setData] = useState<DesignationCount[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(designations().url)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Users by Designation
            </h3>

            {loading ? (
                <div className="flex flex-col gap-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-5 w-8 rounded-full" />
                        </div>
                    ))}
                </div>
            ) : data.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data available.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {data.map((item, i) => (
                        <li key={i} className="flex items-center justify-between">
                            <span className="text-sm truncate">
                                {item.designation ?? 'Unassigned'}
                            </span>
                            <Badge variant="secondary">{item.count}</Badge>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
