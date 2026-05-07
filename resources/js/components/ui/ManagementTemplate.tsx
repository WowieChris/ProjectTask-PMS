import React from "react";
import { motion } from "motion/react";

type Props = {
    title: string;
    subtitle: string;
    icon: React.ReactNode;

    stats?: React.ReactNode;
    actions?: React.ReactNode;
    filters?: React.ReactNode;
    table: React.ReactNode;
    pagination?: React.ReactNode;
};

export default function ManagementTemplate({
    title,
    subtitle,
    icon,
    stats,
    actions,
    filters,
    table,
    pagination,
}: Props) {
    return (
        <div className="p-6 h-[calc(100vh-5rem)] flex flex-col gap-4">

            {/* HEADER */}
            <div className="flex items-center justify-between shrink-0">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        {icon}
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            {title}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    </div>
                </div>

                {actions}
            </div>

            {/* STATS */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
                    {stats}
                </div>
            )}

            {/* FILTERS */}
            {filters && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="shrink-0"
                >
                    {filters}
                </motion.div>
            )}

            {/* TABLE */}
            <div className="flex-1 overflow-auto rounded-xl border border-border bg-card">
                {table}
            </div>

            {/* PAGINATION */}
            {pagination && (
                <div className="shrink-0">
                    {pagination}
                </div>
            )}
        </div>
    );
}