import { useEffect, useMemo, useState } from 'react';

type Row = {
    designation: string | null;
    count: number;
};

export default function DesignationWidget() {
    const [rows, setRows] = useState<Row[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        fetch('/dashboard/designations', { credentials: 'same-origin' })
            .then((r) => {
                if (!r.ok) throw new Error('Failed to load');
                return r.json();
            })
            .then((data) => {
                if (!mounted) return;
                setRows(data as Row[]);
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err.message || 'Error');
            });

        return () => {
            mounted = false;
        };
    }, []);

    const chartData = useMemo(() => {
        if (!rows || rows.length === 0) return null;
        const max = Math.max(...rows.map((r) => r.count));
        return { rows, max };
    }, [rows]);

    return (
        <div className="p-4">
            <h3 className="mb-2 text-lg font-medium text-neutral-50 dark:text-neutral-100">Users by Designation</h3>
            {!rows && !error && <div className="text-neutral-700 dark:text-neutral-100">Loading…</div>}
            {error && <div className="text-sm text-red-500">{error}</div>}

            {chartData && (
                <div className="overflow-auto">
                    <svg
                        viewBox={`0 0 420 ${chartData.rows.length * 40}`}
                        width="100%"
                        height={chartData.rows.length * 40}
                        role="img"
                        aria-label="Bar chart of user counts by designation"
                        style={{ ['--bar' as any]: '#00b7ff' }}
                    >
                        {chartData.rows.map((r, i) => {
                            const y = i * 40 + 8;
                            const maxBar = 260;
                            const barWidth = r.count === 0 ? 0 : (r.count / chartData.max) * maxBar;
                            const nameX = 8;
                            const barX = 150;
                            const labelX = barX + Math.min(barWidth, maxBar) + 8;
                            const onBar = barWidth > 40;
                            return (
                                <g key={i} transform={`translate(0, ${y})`}>
                                    <text x={nameX} y={12} fontSize={12} fill="currentColor" className="text-neutral-100 dark:text-neutral-300">
                                        {r.designation ?? 'Unspecified'}
                                    </text>
                                    <rect
                                        x={barX}
                                        y={-8}
                                        width={barWidth}
                                        height={16}
                                        rx={4}
                                        fill="var(--bar)"
                                        opacity={0.95}
                                    />
                                    <text
                                        x={labelX}
                                        y={8}
                                        fontSize={17}
                                        fill={onBar ? '#ffffff' : 'currentColor'}
                                        fontWeight={600}
                                    >
                                        {r.count}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            )}
        </div>
    );
}
