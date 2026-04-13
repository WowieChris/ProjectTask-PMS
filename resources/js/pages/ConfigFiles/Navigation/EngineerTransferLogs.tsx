import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { Search, Calendar, RotateCcw, User, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EngineerTransferLogs() {
    const { logs } = usePage().props as any;

    const [dateFilter, setDateFilter] = useState('');
    const [search, setSearch] = useState('');
    const [selectedEngineer, setSelectedEngineer] = useState<string | null>(null);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 15;

    // 🔍 FILTER + SEARCH
    const filteredLogs = useMemo(() => {
        return logs.filter((log: any) => {
            const matchEngineer = selectedEngineer
                ? log.new_engineer === selectedEngineer || log.previous_engineer === selectedEngineer
                : true;

            const matchArea = selectedArea
                ? log.area_name === selectedArea
                : true;

            const matchDate = dateFilter
                ? log.effectivity_date === dateFilter
                : true;

            const searchText = search.toLowerCase();
            const matchSearch =
                log.area_name?.toLowerCase().includes(searchText) ||
                log.previous_engineer?.toLowerCase().includes(searchText) ||
                log.new_engineer?.toLowerCase().includes(searchText) ||
                log.assigned_by?.toLowerCase().includes(searchText);

            return matchEngineer && matchArea && matchDate && (search ? matchSearch : true);
        });
    }, [logs, selectedEngineer, selectedArea, dateFilter, search]);

    // 📄 PAGINATION
    const totalPages = Math.ceil(filteredLogs.length / perPage);

    const paginatedLogs = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredLogs.slice(start, start + perPage);
    }, [filteredLogs, currentPage]);

    const handleEngineerClick = (name: string) => {
        setSelectedEngineer(prev => prev === name ? null : name);
        setCurrentPage(1);
    };

    const handleAreaClick = (name: string) => {
        setSelectedArea(prev => prev === name ? null : name);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setDateFilter('');
        setSearch('');
        setSelectedEngineer(null);
        setSelectedArea(null);
        setCurrentPage(1);
    };

    const initials = (name: string) =>
        name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';

    return (
        <AppLayout>
            <div className="p-6 h-[calc(100vh-5rem)] flex flex-col">

                {/* HEADER ROW */}
                <div className="flex items-center justify-between mb-4 shrink-0">
                    <div className="flex items-center gap-3">
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
                            className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-muted"
                        >
                            ← Back
                        </motion.button>
                        <h1 className="text-lg font-semibold">Engineer Movement History</h1>
                    </div>

                    <span className="text-xs text-muted-foreground">
                        {filteredLogs.length} record{filteredLogs.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* 🔍 FILTER BAR */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center gap-3 mb-3 shrink-0"
                >
                    <motion.div whileHover={{ scale: 1.01 }} className="relative w-full md:w-80">
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

                    <div className="flex items-center gap-2">
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

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReset}
                            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-input
                                bg-muted/40 hover:bg-muted transition"
                        >
                            <RotateCcw size={12} />
                            Reset
                        </motion.button>
                    </div>
                </motion.div>

                {/* Active filter pills */}
                <AnimatePresence>
                    {(selectedEngineer || selectedArea) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-3 shrink-0"
                        >
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-muted-foreground">Filtered by:</span>

                                {/* Engineer pill */}
                                {selectedEngineer && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                                        <User size={11} />
                                        {selectedEngineer}
                                        <button
                                            onClick={() => { setSelectedEngineer(null); setCurrentPage(1); }}
                                            className="ml-1 hover:opacity-60 transition"
                                        >
                                            <X size={11} />
                                        </button>
                                    </span>
                                )}

                                {/* Area pill */}
                                {selectedArea && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                        <MapPin size={11} />
                                        {selectedArea}
                                        <button
                                            onClick={() => { setSelectedArea(null); setCurrentPage(1); }}
                                            className="ml-1 hover:opacity-60 transition"
                                        >
                                            <X size={11} />
                                        </button>
                                    </span>
                                )}

                                <span className="text-xs text-muted-foreground">
                                    {filteredLogs.length} result{filteredLogs.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* TABLE */}
                <div className="flex-1 overflow-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur border-b border-border">
                            <tr>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground w-6"></th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Area</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Previous Engineer</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">New Engineer</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Assigned By</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Effective Date</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Logged At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLogs.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-16 text-sm text-muted-foreground">
                                        No movement logs found.
                                    </td>
                                </tr>
                            )}

                            {paginatedLogs.map((log: any, i: number) => (
                                <motion.tr
                                    key={log.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    className="border-b border-border hover:bg-muted/30 transition-colors"
                                >
                                    {/* Status dot */}
                                    <td className="px-4 py-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                    </td>

                                    {/* Area — clickable */}
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleAreaClick(log.area_name)}
                                            className={`flex items-center gap-1.5 text-xs transition-colors ${selectedArea === log.area_name
                                                    ? 'text-amber-400 font-semibold'
                                                    : 'text-foreground hover:text-amber-400'
                                                }`}
                                        >
                                            <MapPin size={11} className={`shrink-0 ${selectedArea === log.area_name
                                                    ? 'text-amber-400'
                                                    : 'text-muted-foreground'
                                                }`} />
                                            {log.area_name ?? '—'}
                                        </button>
                                    </td>

                                    {/* Previous Engineer — clickable */}
                                    <td className="px-4 py-3">
                                        {log.previous_engineer ? (
                                            <button
                                                onClick={() => handleEngineerClick(log.previous_engineer)}
                                                className={`flex items-center gap-2 text-left transition-colors ${selectedEngineer === log.previous_engineer
                                                        ? 'text-primary'
                                                        : 'hover:text-primary text-foreground'
                                                    }`}
                                            >
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${selectedEngineer === log.previous_engineer
                                                        ? 'bg-primary/20 text-primary'
                                                        : 'bg-red-500/10 text-red-400'
                                                    }`}>
                                                    {initials(log.previous_engineer)}
                                                </div>
                                                <span className="text-xs truncate max-w-[120px]">
                                                    {log.previous_engineer}
                                                </span>
                                            </button>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">—</span>
                                        )}
                                    </td>

                                    {/* New Engineer — clickable */}
                                    <td className="px-4 py-3">
                                        {log.new_engineer ? (
                                            <button
                                                onClick={() => handleEngineerClick(log.new_engineer)}
                                                className={`flex items-center gap-2 text-left transition-colors ${selectedEngineer === log.new_engineer
                                                        ? 'text-primary'
                                                        : 'hover:text-primary text-foreground'
                                                    }`}
                                            >
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${selectedEngineer === log.new_engineer
                                                        ? 'bg-primary/20 text-primary'
                                                        : 'bg-emerald-500/10 text-emerald-400'
                                                    }`}>
                                                    {initials(log.new_engineer)}
                                                </div>
                                                <span className="text-xs truncate max-w-[120px]">
                                                    {log.new_engineer}
                                                </span>
                                            </button>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">—</span>
                                        )}
                                    </td>

                                    {/* Assigned By */}
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-foreground">
                                            {log.assigned_by ?? '—'}
                                        </span>
                                    </td>

                                    {/* Effective Date */}
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-foreground">
                                            {log.effectivity_date ?? '—'}
                                        </span>
                                    </td>

                                    {/* Logged At */}
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(log.created_at).toLocaleString()}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 📄 PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 shrink-0">
                        <span className="text-xs text-muted-foreground">
                            Showing {((currentPage - 1) * perPage) + 1}–{Math.min(currentPage * perPage, filteredLogs.length)} of {filteredLogs.length}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="p-1.5 border rounded hover:bg-muted disabled:opacity-40 transition"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <span className="text-xs px-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="p-1.5 border rounded hover:bg-muted disabled:opacity-40 transition"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}