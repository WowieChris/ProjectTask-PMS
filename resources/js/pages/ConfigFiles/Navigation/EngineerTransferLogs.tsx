import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { Search, Calendar, RotateCcw, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EngineerTransferLogs() {
    const { logs } = usePage().props as any;

    const [dateFilter, setDateFilter] = useState('');
    const [search, setSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    // 🔍 FILTER + SEARCH
    const filteredLogs = useMemo(() => {
        return logs.filter((log: any) => {

            const matchDate = dateFilter
                ? log.effectivity_date === dateFilter
                : true;

            const searchText = search.toLowerCase();

            const matchSearch =
                log.area_name?.toLowerCase().includes(searchText) ||
                log.previous_engineer?.toLowerCase().includes(searchText) ||
                log.new_engineer?.toLowerCase().includes(searchText) ||
                log.assigned_by?.toLowerCase().includes(searchText);

            return matchDate && (search ? matchSearch : true);
        });
    }, [logs, dateFilter, search]);

    // 📄 PAGINATION
    const totalPages = Math.ceil(filteredLogs.length / perPage);

    const paginatedLogs = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredLogs.slice(start, start + perPage);
    }, [filteredLogs, currentPage]);

    return (
        <AppLayout>
            <div className="p-6">

                {/* 🔙 BACK BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (window.history.length > 1) {
                            window.history.back();
                        } else {
                            window.location.href = '/ConfigFiles/Navigation';
                        }
                    }}
                    className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-muted mb-3"
                >
                    ← Back
                </motion.button>

                {/* HEADER */}
                <h1 className="text-lg font-semibold mb-4">
                    Engineer Movement History
                </h1>

                {/* 🔍 FILTER BAR */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center gap-3 mb-6"
                >
                    {/* SEARCH */}
                    <motion.div whileHover={{ scale: 1.02 }} className="relative w-full md:w-72">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search area, engineer, assigned by..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background
                                focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                        />
                    </motion.div>

                    <div className="flex items-center gap-2 flex-wrap">

                        {/* DATE */}
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <div className="relative">
                                <Calendar size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
                                    className="pl-7 pr-3 py-2 text-sm rounded-lg border border-input bg-background
                                        focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                                />
                            </div>
                        </motion.div>

                        {/* RESET */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { setDateFilter(''); setSearch(''); setCurrentPage(1); }}
                            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-input
                                bg-muted/40 hover:bg-muted transition"
                        >
                            <RotateCcw size={12} />
                            Reset
                        </motion.button>
                    </div>
                </motion.div>

                {/* 🔥 TIMELINE */}
                <motion.div layout className="space-y-4">

                    <AnimatePresence>
                        {paginatedLogs.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-muted-foreground"
                            >
                                No movement logs found.
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {paginatedLogs.map((log: any) => (
                        <motion.div
                            key={log.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="border rounded-lg p-4 bg-card shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400">
                                    Engineer Movement
                                </span>
                                <span className="text-[13px] text-muted-foreground">
                                    {new Date(log.created_at).toLocaleString()}
                                </span>
                            </div>

                            {/* Area */}
                            <div className="mt-2 text-sm font-semibold flex items-center gap-1">
                                📍 {log.area_name ?? `Area #${log.id}`}
                            </div>

                            {/* Engineer change */}
                            <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                                <User size={11} className="shrink-0" />
                                Engineer changed from{' '}
                                <span className="text-red-400 font-medium">
                                    {log.previous_engineer ?? '—'}
                                </span>
                                {' '}→{' '}
                                <span className="text-green-400 font-medium">
                                    {log.new_engineer ?? '—'}
                                </span>
                            </div>

                            {/* Footer */}
                            <div className="mt-2 text-[11px] text-muted-foreground flex justify-between">
                                <span>by {log.assigned_by ?? '—'}</span>
                                <span>Effective: {log.effectivity_date ?? '—'}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 📄 PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="text-sm px-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}