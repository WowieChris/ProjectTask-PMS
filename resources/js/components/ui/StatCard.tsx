type Props = {
    label: string;
    value: number | string;
    icon: React.ReactNode;
};

export default function StatCard({
    label,
    value,
    icon,
}: Props) {
    return (
        <div className="rounded-xl border border-border bg-card p-4">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {label}
                    </p>

                    <h2 className="text-2xl font-bold mt-1">
                        {value}
                    </h2>
                </div>

                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {icon}
                </div>
            </div>
        </div>
    );
}