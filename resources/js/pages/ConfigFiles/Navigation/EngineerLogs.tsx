import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { Search, Calendar, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EngineerLogs() {
    const { engineerLogs } = usePage().props as any;

    const [dateFilter, setDateFilter] = useState('');
    const [search, setSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    // 🔍 FILTER + SEARCH
    const filteredLogs = useMemo(() => {
        return engineerLogs.filter((log: any) => {

            const matchDate = dateFilter
                ? log.effectivity_date === dateFilter
                : true;

            const searchText = search.toLowerCase();

            const matchSearch =
                log.area_name?.toLowerCase().includes(searchText) ||
                log.new_engineer?.toLowerCase().includes(searchText) ||
                log.previous_engineer?.toLowerCase().includes(searchText);

            return matchDate && (search ? matchSearch : true);
        });
    }, [engineerLogs, dateFilter, search]);

    // 📄 PAGINATION
    const totalPages = Math.ceil(filteredLogs.length / perPage);

    const paginatedLogs = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredLogs.slice(start, start + perPage);
    }, [filteredLogs, currentPage]);

    return (
        <AppLayout>
            <div className="p-6">

                {/* 🔙 BACK */}
                <button
                    onClick={() => window.history.back()}
                    className="mb-3 text-sm border px-3 py-1 rounded"
                >
                    ← Back
                </button>

                {/* HEADER */}
                <h1 className="text-lg font-semibold mb-4">
                    Engineer Assignment Logs
                </h1>

                {/* 🔍 FILTER */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">

                    {/* SEARCH */}
                    <div className="relative w-full md:w-72">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search area, engineer..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-9 pr-3 py-2 text-sm border rounded"
                        />
                    </div>

                    {/* DATE */}
                    <div className="relative">
                        <Calendar size={14} className="absolute left-2 top-1/2 -translate-y-1/2" />
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => {
                                setDateFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-7 pr-3 py-2 text-sm border rounded"
                        />
                    </div>

                    {/* RESET */}
                    <button
                        onClick={() => {
                            setSearch('');
                            setDateFilter('');
                            setCurrentPage(1);
                        }}
                        className="flex items-center gap-1 px-3 py-2 text-xs border rounded"
                    >
                        <RotateCcw size={12} />
                        Reset
                    </button>

                </div>

                {/* 🔥 LOG LIST */}
                <div className="space-y-4">

                    <AnimatePresence>
                        {paginatedLogs.length === 0 && (
                            <motion.div className="text-sm text-muted-foreground">
                                No logs found.
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {paginatedLogs.map((log: any) => (
                        <motion.div
                            key={log.id}
                            className="border rounded-lg p-4 bg-card shadow-sm"
                        >

                            {/* TOP */}
                            <div className="flex justify-between">
                                <span className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400">
                                    engineer assignment
                                </span>

                                <span className="text-xs text-muted-foreground">
                                    {new Date(log.created_at).toLocaleString()}
                                </span>
                            </div>

                            {/* AREA */}
                            <div className="mt-2 text-sm font-semibold">
                                👷 {log.area_name}
                            </div>

                            {/* CHANGE */}
                            <div className="mt-1 text-xs text-muted-foreground">
                                Assigned from{' '}
                                <span className="text-red-400">
                                    {log.previous_engineer ?? 'None'}
                                </span>{' '}
                                →{' '}
                                <span className="text-green-400 font-medium">
                                    {log.new_engineer}
                                </span>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-2 text-[11px] flex justify-between text-muted-foreground">
                                <span>by {log.assigned_by}</span>
                                <span>Effective: {log.effectivity_date}</span>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="px-3 py-1 border rounded"
                        >
                            Prev
                        </button>

                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="px-3 py-1 border rounded"
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}