import AppLayout from '@/layouts/app-layout';
import { usePage, router } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import {
    Search, Filter, Calendar, RotateCcw, MapPin, X,
    ChevronLeft, ChevronRight, Clock, Ban, Play,
    CalendarClock, ChevronDown, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Logs() {
    const { logs = [], scheduledMoves = [] } = usePage().props as any;

    const [typeFilter, setTypeFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [search, setSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 15;

    // Pending panel state
    const [pendingOpen, setPendingOpen] = useState(true);
    const [actioningId, setActioningId] = useState<number | null>(null);

    // ── Pending moves (only status = pending, sorted by scheduled_at) ──
    const pendingMoves = useMemo(() =>
        [...scheduledMoves]
            .filter((m: any) => m.status === 'pending')
            .sort((a: any, b: any) =>
                new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
            ),
        [scheduledMoves]
    );

    const handleApply = (id: number) => {
        setActioningId(id);
        router.post(`/scheduled-location-moves/${id}/apply`, {}, {
            onFinish: () => setActioningId(null),
        });
    };

    const handleCancel = (id: number) => {
        setActioningId(id);
        router.post(`/scheduled-location-moves/${id}/cancel`, {}, {
            onFinish: () => setActioningId(null),
        });
    };

    // ── History filters ───────────────────────────────────────────
    const filteredLogs = useMemo(() => {
        return logs.filter((log: any) => {
            const matchType = typeFilter ? log.type === typeFilter : true;
            const matchDate = dateFilter ? log.effectivity_date === dateFilter : true;
            const matchLocation = selectedLocation ? log.location_name === selectedLocation : true;
            const matchUser = selectedUser ? log.user?.name === selectedUser : true;
            const searchText = search.toLowerCase();
            const matchSearch =
                log.location_name?.toLowerCase().includes(searchText) ||
                log.user?.name?.toLowerCase().includes(searchText) ||
                log.type?.toLowerCase().includes(searchText) ||
                log.from_parent_name?.toLowerCase().includes(searchText) ||
                log.to_parent_name?.toLowerCase().includes(searchText);
            return matchType && matchDate && matchLocation && matchUser && (search ? matchSearch : true);
        });
    }, [logs, typeFilter, dateFilter, search, selectedLocation, selectedUser]);

    const totalPages = Math.ceil(filteredLogs.length / perPage);
    const paginatedLogs = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredLogs.slice(start, start + perPage);
    }, [filteredLogs, currentPage]);

    const currentLogIds = useMemo(() => {
        const seen = new Set<string>();
        const currentIds = new Set<number>();
        for (const log of logs) {
            const key = `${log.type}-${log.location_id}`;
            if (!seen.has(key)) { seen.add(key); currentIds.add(log.id); }
        }
        return currentIds;
    }, [logs]);

    const resolveName = (log: any, name: string | null, id: number) => {
        if (name) return name;
        switch (log.type) {
            case 'branch': return `Area ${id}`;
            case 'area': return `District ${id}`;
            case 'district': return `Division ${id}`;
            default: return `#${id}`;
        }
    };

    const handleLocationClick = (name: string) => { setSelectedLocation(prev => prev === name ? null : name); setCurrentPage(1); };
    const handleUserClick = (name: string) => { setSelectedUser(prev => prev === name ? null : name); setCurrentPage(1); };
    const handleReset = () => { setTypeFilter(''); setDateFilter(''); setSearch(''); setSelectedLocation(null); setSelectedUser(null); setCurrentPage(1); };

    const initials = (name: string) => name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';

    const typeColor = (type: string) => {
        switch (type) {
            case 'branch': return 'bg-blue-500/10 text-blue-400';
            case 'area': return 'bg-violet-500/10 text-violet-400';
            case 'district': return 'bg-amber-500/10 text-amber-400';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const isPast = (iso: string) => new Date(iso) <= new Date();

    const fmt = (iso: string) => new Date(iso).toLocaleString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });

    const UserAvatar = ({ name, photo, isSelected }: { name: string; photo: string | null; isSelected: boolean }) => {
        return photo ? (
            <img src={`/storage/${photo}`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                className={`w-6 h-6 rounded-full object-cover shrink-0 ring-1 ${isSelected ? 'ring-primary' : 'ring-muted'}`} />
        ) : (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${isSelected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
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
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = '/ConfigFiles/Navigation'}
                            className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-muted">
                            ← Back
                        </motion.button>
                        <h1 className="text-lg font-semibold">Location Movement History</h1>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {filteredLogs.length} record{filteredLogs.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* ── PENDING SCHEDULED MOVES PANEL ── */}
                <div className="shrink-0 rounded-xl border border-border overflow-hidden">
                    {/* Panel header */}
                    <button
                        onClick={() => setPendingOpen(o => !o)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <CalendarClock size={14} className="text-amber-400" />
                            <span className="text-sm font-semibold text-foreground">
                                Pending Scheduled Moves
                            </span>
                            {pendingMoves.length > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                                    {pendingMoves.length}
                                </span>
                            )}
                        </div>
                        <motion.div animate={{ rotate: pendingOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
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
                                {pendingMoves.length === 0 ? (
                                    <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                                        No pending scheduled moves.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="border-b border-border bg-muted/20">
                                                <tr className="text-[11px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                                                    <th className="px-4 py-2.5 text-left">Type</th>
                                                    <th className="px-4 py-2.5 text-left">Location</th>
                                                    <th className="px-4 py-2.5 text-left">Moving To</th>
                                                    <th className="px-4 py-2.5 text-left">Scheduled At</th>
                                                    <th className="px-4 py-2.5 text-left">Scheduled By</th>
                                                    <th className="px-4 py-2.5 text-left">Notes</th>
                                                    <th className="px-4 py-2.5 text-left">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pendingMoves.map((m: any) => {
                                                    const due = isPast(m.scheduled_at);
                                                    const actioning = actioningId === m.id;
                                                    return (
                                                        <motion.tr key={m.id}
                                                            initial={{ opacity: 0, y: 4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, x: -10 }}
                                                            className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                                                        >
                                                            {/* Type */}
                                                            <td className="px-4 py-2.5">
                                                                <span className={`text-[11px] px-2 py-0.5 rounded capitalize font-medium ${typeColor(m.location_type)}`}>
                                                                    {m.location_type}
                                                                </span>
                                                            </td>

                                                            {/* Location name */}
                                                            <td className="px-4 py-2.5">
                                                                <div className="flex items-center gap-1.5">
                                                                    <MapPin size={11} className="text-muted-foreground shrink-0" />
                                                                    <span className="text-xs text-foreground">{m.location_name ?? `#${m.location_id}`}</span>
                                                                </div>
                                                            </td>

                                                            {/* Target parent */}
                                                            <td className="px-4 py-2.5">
                                                                <span className="text-xs text-green-400 font-medium">
                                                                    {m.target_parent_name ?? `#${m.target_parent_id}`}
                                                                </span>
                                                            </td>

                                                            {/* Scheduled At */}
                                                            <td className="px-4 py-2.5 whitespace-nowrap">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Clock size={11} className={due ? 'text-emerald-400' : 'text-amber-400'} />
                                                                    <span className={`text-xs font-medium ${due ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                                        {fmt(m.scheduled_at)}
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
                                                                <span className="text-xs text-muted-foreground">{m.scheduled_by ?? '—'}</span>
                                                            </td>

                                                            {/* Notes */}
                                                            <td className="px-4 py-2.5 max-w-[180px]">
                                                                <span className="text-xs text-muted-foreground truncate block" title={m.notes ?? ''}>
                                                                    {m.notes ?? <span className="opacity-40">—</span>}
                                                                </span>
                                                            </td>

                                                            {/* Actions */}
                                                            <td className="px-4 py-2.5">
                                                                <div className="flex items-center gap-1.5">
                                                                    <button
                                                                        onClick={() => handleApply(m.id)}
                                                                        disabled={actioning}
                                                                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors disabled:opacity-50 ${due
                                                                            ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/25'
                                                                            : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'
                                                                        }`}
                                                                    >
                                                                        {actioning ? <Loader2 size={11} className="animate-spin" /> : <Play size={11} />}
                                                                        Apply
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleCancel(m.id)}
                                                                        disabled={actioning}
                                                                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {actioning ? <Loader2 size={11} className="animate-spin" /> : <Ban size={11} />}
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
                    className="flex flex-col md:flex-row md:items-center gap-3 shrink-0">
                    <motion.div whileHover={{ scale: 1.01 }} className="relative w-full md:w-80">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input type="text" placeholder="Search location, user, type..." value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" />
                    </motion.div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <Filter size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                                className="pl-7 pr-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition cursor-pointer">
                                <option value="">All Types</option>
                                <option value="branch">Branch</option>
                                <option value="area">Area</option>
                                <option value="district">District</option>
                            </select>
                        </div>
                        <div className="relative">
                            <Calendar size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input type="date" value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
                                className="pl-7 pr-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition" />
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleReset}
                            className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg border border-input bg-muted/40 hover:bg-muted transition">
                            <RotateCcw size={12} /> Reset
                        </motion.button>
                    </div>
                </motion.div>

                {/* ACTIVE FILTER PILLS */}
                <AnimatePresence>
                    {(selectedLocation || selectedUser) && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }} className="shrink-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-muted-foreground">Filtered by:</span>
                                {selectedLocation && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                        <MapPin size={11} />{selectedLocation}
                                        <button onClick={() => { setSelectedLocation(null); setCurrentPage(1); }} className="ml-1 hover:opacity-60"><X size={11} /></button>
                                    </span>
                                )}
                                {selectedUser && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                                        {selectedUser}
                                        <button onClick={() => { setSelectedUser(null); setCurrentPage(1); }} className="ml-1 hover:opacity-60"><X size={11} /></button>
                                    </span>
                                )}
                                <span className="text-xs text-muted-foreground">{filteredLogs.length} result{filteredLogs.length !== 1 ? 's' : ''}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HISTORY TABLE */}
                <div className="flex-1 overflow-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur border-b border-border">
                            <tr>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"></th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Type</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Location</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">From</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">To</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Moved By</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Effective Date</th>
                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Logged At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLogs.length === 0 && (
                                <tr><td colSpan={8} className="text-center py-16 text-sm text-muted-foreground">No logs found.</td></tr>
                            )}
                            {paginatedLogs.map((log: any, i: number) => (
                                <motion.tr key={log.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                                    className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className={`w-2 h-2 rounded-full ${currentLogIds.has(log.id) ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[11px] px-2 py-0.5 rounded capitalize font-medium ${typeColor(log.type)}`}>{log.type}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleLocationClick(log.location_name)}
                                            className={`flex items-center gap-1.5 text-xs transition-colors ${selectedLocation === log.location_name ? 'text-amber-400 font-semibold' : 'text-foreground hover:text-amber-400'}`}>
                                            <MapPin size={11} className={`shrink-0 ${selectedLocation === log.location_name ? 'text-amber-400' : 'text-muted-foreground'}`} />
                                            {log.location_name || `#${log.location_id}`}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3"><span className="text-xs text-red-400">{resolveName(log, log.from_parent_name, log.from_parent_id)}</span></td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs text-green-400 font-medium">{resolveName(log, log.to_parent_name, log.to_parent_id)}</span>
                                            {currentLogIds.has(log.id) && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium leading-none">Current</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {log.user?.name ? (
                                            <button onClick={() => handleUserClick(log.user.name)}
                                                className={`flex items-center gap-2 text-left transition-colors ${selectedUser === log.user.name ? 'text-primary' : 'hover:text-primary text-foreground'}`}>
                                                <UserAvatar name={log.user.name} photo={log.user.photo} isSelected={selectedUser === log.user.name} />
                                                <span className="text-xs truncate max-w-[120px]">{log.user.name}</span>
                                            </button>
                                        ) : <span className="text-xs text-muted-foreground">—</span>}
                                    </td>
                                    <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{log.effectivity_date ?? '—'}</span></td>
                                    <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</span></td>
                                </motion.tr>
                            ))}
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
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1.5 border rounded hover:bg-muted disabled:opacity-40 transition"><ChevronLeft size={14} /></button>
                            <span className="text-xs px-2">Page {currentPage} of {totalPages}</span>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 border rounded hover:bg-muted disabled:opacity-40 transition"><ChevronRight size={14} /></button>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}