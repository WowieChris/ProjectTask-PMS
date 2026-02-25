import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Props = {
    usersByDesignation: {
        designation: string;
        total: number;
    }[];
};

export default function UsersPieChart({ usersByDesignation }: Props) {
    return (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={usersByDesignation}
                        dataKey="total"
                        nameKey="designation"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        label
                    >
                        {usersByDesignation.map((entry, index) => (
                            <Cell key={`cell-${index}`} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}