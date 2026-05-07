import AppLayout from '@/layouts/app-layout';
import { router, usePage } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import {
    Search, Calendar, RotateCcw, User, MapPin, X,
    ChevronLeft, ChevronRight, Clock, ChevronDown,
    Play, Ban, CalendarClock, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EngineerTransferLogs() {
    const pageProps = usePage().props as any;
    const movementLogs: any[] = pageProps.logs ?? [];
    const scheduledTransfers: any[] = pageProps.scheduledTransfers ?? [];

    const [dateFilter, setDateFilter] = useState('');
    const [search, setSearch] = useState('');
    const [selectedEngineer, setSelectedEngineer] = useState<string | null>(null);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 15;

    // Pending panel state
    const [pendingOpen, setPendingOpen] = useState(true);
    const [actioningId, setActioningId] = useState<number | null>(null);

    // ── Pending transfers (only status = pending) ─────────────────
    const pendingTransfers = useMemo(() =>
        [...scheduledTransfers]
            .filter((t: any) => t.status === 'pending')
            .sort((a: any, b: any) =>
                new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
            ),
        [scheduledTransfers]
    );

    const handleApply = (id: number) => {
        setActioningId(id);
        router.post(`/ConfigFiles/Field-Eng/scheduled/${id}/apply`, {}, {
            onFinish: () => setActioningId(null),
        });
    };

    const handleCancel = (id: number) => {
        setActioningId(id);
        router.post(`/ConfigFiles/Field-Eng/scheduled/${id}/cancel`, {}, {
            onFinish: () => setActioningId(null),
        });
    };

    // ── Current log IDs (latest per area) ────────────────────────
    const currentLogIds = useMemo(() => {
        const seen = new Set<string>();
        const ids = new Set<number>();
        for (const log of movementLogs) {
            if (!seen.has(log.area_name)) {
                seen.add(log.area_name);
                ids.add(log.id);
            }
        }
        return ids;
    }, [movementLogs]);

    // ── Pending badge lookup ──────────────────────────────────────
    const pendingByKey = useMemo(() => {
        const map = new Map<string, any>();
        for (const t of pendingTransfers) {
            if (t.area_name) {
                if (!map.has(t.area_name)) map.set(t.area_name, t);
            } else {
                const key = `__district__${t.district_name}`;
                if (!map.has(key)) map.set(key, t);
            }
        }
        return map;
    }, [pendingTransfers]);

    const getPending = (log: any) =>
        pendingByKey.get(log.area_name) ??
        pendingByKey.get(`__district__${log.district}`) ??
        null;

    // ── Filters ───────────────────────────────────────────────────
    const filteredLogs = useMemo(() => {
        return movementLogs.filter((log: any) => {
            const matchEngineer = selectedEngineer
                ? log.new_engineer === selectedEngineer || log.previous_engineer === selectedEngineer
                : true;
            const matchArea = selectedArea ? log.area_name === selectedArea : true;
            const matchDate = dateFilter ? log.effectivity_date === dateFilter : true;
            const q = search.toLowerCase();
            const matchSearch = !search || (
                log.area_name?.toLowerCase().includes(q) ||
                log.previous_engineer?.toLowerCase().includes(q) ||
                log.new_engineer?.toLowerCase().includes(q) ||
                log.assigned_by?.toLowerCase().includes(q)
            );
            return matchEngineer && matchArea && matchDate && matchSearch;
        });
    }, [movementLogs, selectedEngineer, selectedArea, dateFilter, search]);

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
        setDateFilter(''); setSearch('');
        setSelectedEngineer(null); setSelectedArea(null);
        setCurrentPage(1);
    };

    const fmt = (iso: string) => new Date(iso).toLocaleString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });

    const isPast = (iso: string) => new Date(iso) <= new Date();

    const initials = (name: string) =>
        name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';

    const EngineerAvatar = ({ name, photo, isSelected, colorVariant }: {
        name: string; photo: string | null; isSelected: boolean; colorVariant: 'red' | 'green';
    }) => {
        const ring = isSelected ? 'ring-primary'
            : colorVariant === 'red' ? 'ring-red-400/40' : 'ring-emerald-400/40';
        const bg = isSelected ? 'bg-primary/20 text-primary'
            : colorVariant === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400';
        return photo ? (
            <img src={`/storage/${photo}`}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                className={`w-6 h-6 rounded-full object-cover shrink-0 ring-1 ${ring}`} />
        ) : (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${bg}`}>
                {initials(name)}
            </div>
        );
    };

    return (
        <AppLayout>
            <div className="p-6 h-[calc(100vh-5rem)] flex flex-col gap-3">

                {/* HEADER */}
                <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => window.history.length > 1
                                ? window.history.back()
                                : (window.location.href = '/ConfigFiles/Navigation')}
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

                {/* ── PENDING SCHEDULES PANEL ── */}
                <div className="shrink-0 rounded-xl border border-border overflow-hidden">
                    {/* Panel header */}
                    <button
                        onClick={() => setPendingOpen(o => !o)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <CalendarClock size={14} className="text-amber-400" />
                            <span className="text-sm font-semibold text-foreground">
                                Pending Scheduled Transfers
                            </span>
                            {pendingTransfers.length > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                                    {pendingTransfers.length}
                                </span>
                            )}
                        </div>
                        <motion.div
                            animate={{ rotate: pendingOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={14} className="text-muted-foreground" />
                        </motion.div>
                    </button>

                    {/* Panel body */}
                    <AnimatePresence initial={false}>
                        {pendingOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                {pendingTransfers.length === 0 ? (
                                    <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                                        No pending scheduled transfers.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="border-b border-border bg-muted/20">
                                                <tr className="text-[11px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                                                    <th className="px-4 py-2.5 text-left">Engineer</th>
                                                    <th className="px-4 py-2.5 text-left">District</th>
                                                    <th className="px-4 py-2.5 text-left">Area</th>
                                                    <th className="px-4 py-2.5 text-left">Scheduled At</th>
                                                    <th className="px-4 py-2.5 text-left">Scheduled By</th>
                                                    <th className="px-4 py-2.5 text-left">Notes</th>
                                                    <th className="px-4 py-2.5 text-left">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pendingTransfers.map((t: any) => {
                                                    const due = isPast(t.scheduled_at);
                                                    const actioning = actioningId === t.id;

                                                    return (
                                                        <motion.tr
                                                            key={t.id}
                                                            initial={{ opacity: 0, y: 4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, x: -10 }}
                                                            className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                                                        >
                                                            {/* Engineer */}
                                                            <td className="px-4 py-2.5">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-[10px] font-bold text-primary">
                                                                        {initials(t.engineer_name ?? '')}
                                                                    </div>
                                                                    <span className="text-xs font-medium text-foreground">
                                                                        {t.engineer_name ?? '—'}
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            {/* District */}
                                                            <td className="px-4 py-2.5">
                                                                <span className="text-xs text-muted-foreground">
                                                                    {t.district_name ?? '—'}
                                                                </span>
                                                            </td>

                                                            {/* Area — "District base" if null */}
                                                            <td className="px-4 py-2.5">
                                                                {t.area_name ? (
                                                                    <span className="text-xs text-foreground">{t.area_name}</span>
                                                                ) : (
                                                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                                                                        District base
                                                                    </span>
                                                                )}
                                                            </td>

                                                            {/* Scheduled At */}
                                                            <td className="px-4 py-2.5 whitespace-nowrap">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Clock size={11} className={due ? 'text-emerald-400' : 'text-amber-400'} />
                                                                    <span className={`text-xs font-medium ${due ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                                        {fmt(t.scheduled_at)}
                                                                    </span>
                                                                    {due && (
                                                                        <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                                                                            Due
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>

                                                            {/* Scheduled By */}
                                                            <td className="px-4 py-2.5">
                                                                <span className="text-xs text-muted-foreground">
                                                                    {t.scheduled_by ?? '—'}
                                                                </span>
                                                            </td>

                                                            {/* Notes */}
                                                            <td className="px-4 py-2.5 max-w-[180px]">
                                                                <span className="text-xs text-muted-foreground truncate block" title={t.notes ?? ''}>
                                                                    {t.notes ?? <span className="opacity-40">—</span>}
                                                                </span>
                                                            </td>

                                                            {/* Actions */}
                                                            <td className="px-4 py-2.5">
                                                                <div className="flex items-center gap-1.5">
                                                                    {/* Apply Now */}
                                                                    <button
                                                                        onClick={() => handleApply(t.id)}
                                                                        disabled={actioning}
                                                                        title="Apply this transfer now"
                                                                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors disabled:opacity-50 ${due
                                                                                ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/25'
                                                                                : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'
                                                                            }`}
                                                                    >
                                                                        {actioning
                                                                            ? <Loader2 size={11} className="animate-spin" />
                                                                            : <Play size={11} />
                                                                        }
                                                                        Apply
                                                                    </button>

                                                                    {/* Cancel */}
                                                                    <button
                                                                        onClick={() => handleCancel(t.id)}
                                                                        disabled={actioning}
                                                                        title="Cancel this scheduled transfer"
                                                                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {actioning
                                                                            ? <Loader2 size={11} className="animate-spin" />
                                                                            : <Ban size={11} />
                                                                        }
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* FILTER BAR */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center gap-3 shrink-0"
                >
                    <motion.div whileHover={{ scale: 1.01 }} className="relative w-full md:w-80">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input type="text" placeholder="Search area, engineer, assigned by..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                        />
                    </motion.div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Calendar size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input type="date" value={dateFilter}
                                onChange={e => { setDateFilter(e.target.value); setCurrentPage(1); }}
                                className="pl-7 pr-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                            />
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={handleReset}
                            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-input bg-muted/40 hover:bg-muted transition"
                        >
                            <RotateCcw size={12} /> Reset
                        </motion.button>
                    </div>
                </motion.div>

                {/* ACTIVE FILTER PILLS */}
                <AnimatePresence>
                    {(selectedEngineer || selectedArea) && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }} className="shrink-0"
                        >
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-muted-foreground">Filtered by:</span>
                                {selectedEngineer && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                                        <User size={11} />{selectedEngineer}
                                        <button onClick={() => { setSelectedEngineer(null); setCurrentPage(1); }}
                                            className="ml-1 hover:opacity-60 transition"><X size={11} /></button>
                                    </span>
                                )}
                                {selectedArea && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                        <MapPin size={11} />{selectedArea}
                                        <button onClick={() => { setSelectedArea(null); setCurrentPage(1); }}
                                            className="ml-1 hover:opacity-60 transition"><X size={11} /></button>
                                    </span>
                                )}
                                <span className="text-xs text-muted-foreground">
                                    {filteredLogs.length} result{filteredLogs.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MOVEMENT LOG TABLE */}
                <div className="flex-1 overflow-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur border-b border-border">
                            <tr className="text-[11px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                                <th className="px-4 py-3 min-w-[10px]"></th>
                                <th className="px-4 py-3 min-w-[100px]">Previous Engineer</th>
                                <th className="px-4 py-3 min-w-[100px]">District</th>
                                <th className="px-4 py-3 min-w-[100px]">Area</th>
                                <th className="px-4 py-3 min-w-[100px]">New Engineer</th>
                                <th className="px-4 py-3 min-w-[140px]">Status</th>
                                <th className="px-4 py-3 min-w-[100px]">Assigned By</th>
                                <th className="px-4 py-3 min-w-[100px]">Effective Date</th>
                                <th className="px-4 py-3 min-w-[100px]">Logged At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLogs.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="text-center py-16 text-sm text-muted-foreground">
                                        No movement logs found.
                                    </td>
                                </tr>
                            )}
                            {paginatedLogs.map((log: any, i: number) => {
                                const isCurrent = currentLogIds.has(log.id);
                                const pendingTransfer = isCurrent ? getPending(log) : null;

                                return (
                                    <motion.tr key={log.id}
                                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.02 }}
                                        className="border-b border-border hover:bg-muted/30 transition-colors"
                                    >
                                        {/* Status dot */}
                                        <td className="px-4 py-3">
                                            <div className={`w-2 h-2 rounded-full ${isCurrent
                                                    ? pendingTransfer ? 'bg-amber-400' : 'bg-emerald-400'
                                                    : 'bg-muted-foreground/30'
                                                }`} />
                                        </td>

                                        {/* Previous Engineer */}
                                        <td className="px-4 py-3">
                                            {log.previous_engineer && log.previous_engineer !== '—' ? (
                                                <button onClick={() => handleEngineerClick(log.previous_engineer)}
                                                    className={`flex items-center gap-2 text-left transition-colors ${selectedEngineer === log.previous_engineer ? 'text-primary' : 'hover:text-primary text-foreground'}`}
                                                >
                                                    <EngineerAvatar name={log.previous_engineer} photo={log.previous_engineer_photo}
                                                        isSelected={selectedEngineer === log.previous_engineer} colorVariant="red" />
                                                    <span className="text-xs truncate max-w-[120px]">{log.previous_engineer}</span>
                                                </button>
                                            ) : <span className="text-xs text-muted-foreground">—</span>}
                                        </td>

                                        {/* District */}
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleAreaClick(log.district)}
                                                className={`flex items-center gap-1.5 text-xs transition-colors ${selectedArea === log.district ? 'text-amber-400 font-semibold' : 'text-foreground hover:text-amber-400'}`}
                                            >
                                                <MapPin size={11} className={`shrink-0 ${selectedArea === log.district ? 'text-amber-400' : 'text-muted-foreground'}`} />
                                                {log.district ?? '—'}
                                            </button>
                                        </td>

                                        {/* Area */}
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleAreaClick(log.area_name)}
                                                className={`flex items-center gap-1.5 text-xs transition-colors ${selectedArea === log.area_name ? 'text-amber-400 font-semibold' : 'text-foreground hover:text-amber-400'}`}
                                            >
                                                <MapPin size={11} className={`shrink-0 ${selectedArea === log.area_name ? 'text-amber-400' : 'text-muted-foreground'}`} />
                                                {log.area_name ?? '—'}
                                            </button>
                                        </td>

                                        {/* New Engineer */}
                                        <td className="px-4 py-3">
                                            {log.new_engineer && log.new_engineer !== '—' ? (
                                                <button onClick={() => handleEngineerClick(log.new_engineer)}
                                                    className={`flex items-center gap-2 text-left transition-colors ${selectedEngineer === log.new_engineer ? 'text-primary' : 'hover:text-primary text-foreground'}`}
                                                >
                                                    <EngineerAvatar name={log.new_engineer} photo={log.new_engineer_photo}
                                                        isSelected={selectedEngineer === log.new_engineer} colorVariant="green" />
                                                    <span className="text-xs truncate max-w-[120px]">{log.new_engineer}</span>
                                                </button>
                                            ) : <span className="text-xs text-muted-foreground">—</span>}
                                        </td>

                                        {/* Status badges */}
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-1 items-start">
                                                {isCurrent && (
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium leading-none">
                                                        Current Assigned
                                                    </span>
                                                )}
                                                {pendingTransfer && (
                                                    <span
                                                        title={`Incoming: ${pendingTransfer.engineer_name} · ${fmt(pendingTransfer.scheduled_at)}`}
                                                        className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium leading-none cursor-help"
                                                    >
                                                        <Clock size={9} />
                                                        Pending Transfer
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Assigned By */}
                                        <td className="px-4 py-3">
                                            {log.assigned_by && log.assigned_by !== '—' ? (
                                                <div className="flex items-center gap-2">
                                                    <EngineerAvatar name={log.assigned_by} photo={log.assigned_by_photo}
                                                        isSelected={false} colorVariant="green" />
                                                    <span className="text-xs text-muted-foreground">{log.assigned_by}</span>
                                                </div>
                                            ) : <span className="text-xs text-muted-foreground">—</span>}
                                        </td>

                                        {/* Effective Date */}
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-muted-foreground">{log.effectivity_date ?? '—'}</span>
                                        </td>

                                        {/* Logged At */}
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(log.created_at).toLocaleString()}
                                            </span>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between shrink-0">
                        <span className="text-xs text-muted-foreground">
                            Showing {((currentPage - 1) * perPage) + 1}–{Math.min(currentPage * perPage, filteredLogs.length)} of {filteredLogs.length}
                        </span>
                        <div className="flex items-center gap-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
                                className="p-1.5 border rounded hover:bg-muted disabled:opacity-40 transition">
                                <ChevronLeft size={14} />
                            </button>
                            <span className="text-xs px-2">Page {currentPage} of {totalPages}</span>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
                                className="p-1.5 border rounded hover:bg-muted disabled:opacity-40 transition">
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}