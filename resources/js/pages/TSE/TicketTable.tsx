// import React, { useState } from 'react';
// import { ENGINEERS } from '../constants';
// import type { Ticket } from '../types';
// import Badge from './Badge';

// interface TicketTableProps {
//     tickets: Ticket[];
//     onEdit: (ticket: Ticket) => void;
//     onDelete: (id: string) => void;
// }

// const TicketTable: React.FC<TicketTableProps> = ({ tickets, onEdit, onDelete }) => {
//     const [search, setSearch] = useState('');
//     const [selectedEngr, setSelectedEngr] = useState<string | null>(null);
//     const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

//     const toggleRow = (id: string) => {
//         const newExpanded = new Set(expandedRows);
//         if (newExpanded.has(id)) {
//             newExpanded.delete(id);
//         } else {
//             newExpanded.add(id);
//         }
//         setExpandedRows(newExpanded);
//     };

//     const filteredTickets = tickets.filter(t => {
//         const matchesSearch =
//             t.jobOrder.toLowerCase().includes(search.toLowerCase()) ||
//             t.requestingParty.toLowerCase().includes(search.toLowerCase()) ||
//             t.designatedEngr.toLowerCase().includes(search.toLowerCase()) ||
//             t.category.toLowerCase().includes(search.toLowerCase()) ||
//             t.services.toLowerCase().includes(search.toLowerCase());

//         const matchesEngr = selectedEngr ? t.designatedEngr === selectedEngr : true;

//         return matchesSearch && matchesEngr;
//     });

//     const getEngineerCount = (name: string) => {
//         return tickets.filter(t => t.designatedEngr === name).length;
//     };

//     return (
//         <div className="space-y-6">
//             {/* Quick Filter Bar */}
//             <div className="flex flex-col gap-3">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Quick Filter by Engineer</label>
//                 <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
//                     <button
//                         onClick={() => setSelectedEngr(null)}
//                         className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${selectedEngr === null
//                                 ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
//                                 : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
//                             }`}
//                     >
//                         All Engineers
//                         <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${selectedEngr === null ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 font-bold'}`}>
//                             {tickets.length}
//                         </span>
//                     </button>

//                     {ENGINEERS.map(eng => {
//                         const count = getEngineerCount(eng);
//                         const isActive = selectedEngr === eng;
//                         return (
//                             <button
//                                 key={eng}
//                                 onClick={() => setSelectedEngr(isActive ? null : eng)}
//                                 className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${isActive
//                                         ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
//                                         : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
//                                     }`}
//                             >
//                                 <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${isActive ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}`}>
//                                     {eng[0]}
//                                 </div>
//                                 {eng}
//                                 <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 font-bold'}`}>
//                                     {count}
//                                 </span>
//                             </button>
//                         );
//                     })}
//                 </div>
//             </div>

//             <div className="relative group">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-blue-500 transition-colors">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
//                 </span>
//                 <input
//                     type="text"
//                     placeholder="Search by Job Order, Party, Category, Service..."
//                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all backdrop-blur-sm shadow-inner"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </div>

//             <div className="glass-panel rounded-xl border border-slate-200 shadow-xl overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                         <thead className="bg-slate-100/80 border-b border-slate-200">
//                             <tr>
//                                 <th className="px-4 py-4 w-10"></th>
//                                 <th className="px-2 py-4 text-xs font-black text-slate-700 uppercase tracking-wider">Job Order</th>
//                                 <th className="px-6 py-4 text-xs font-black text-slate-700 uppercase tracking-wider">Requesting Party</th>
//                                 <th className="px-6 py-4 text-xs font-black text-slate-700 uppercase tracking-wider">Engineer</th>
//                                 <th className="px-6 py-4 text-xs font-black text-slate-700 uppercase tracking-wider">Category</th>
//                                 <th className="px-6 py-4 text-xs font-black text-slate-700 uppercase tracking-wider">Status</th>
//                                 <th className="px-6 py-4 text-xs font-black text-slate-700 uppercase tracking-wider text-right">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100">
//                             {filteredTickets.map((ticket) => {
//                                 const isExpanded = expandedRows.has(ticket.id);
//                                 return (
//                                     <React.Fragment key={ticket.id}>
//                                         <tr className={`hover:bg-slate-50/80 transition-colors group ${ticket.isLocked ? 'bg-slate-50/40' : ''} ${isExpanded ? 'bg-blue-50/40' : ''}`}>
//                                             <td className="px-4 py-4 text-center">
//                                                 <button
//                                                     onClick={() => toggleRow(ticket.id)}
//                                                     className={`text-slate-400 hover:text-blue-600 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
//                                                 </button>
//                                             </td>
//                                             <td className="px-2 py-4">
//                                                 <div className="flex items-center gap-2">
//                                                     {ticket.isLocked ? (
//                                                         <div className="flex items-center gap-2 text-slate-500">
//                                                             <svg className="text-amber-500" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
//                                                             <span className="font-mono text-sm font-bold">{ticket.jobOrder}</span>
//                                                         </div>
//                                                     ) : (
//                                                         <button
//                                                             onClick={() => toggleRow(ticket.id)}
//                                                             className="font-mono text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline decoration-2 underline-offset-4 transition-all"
//                                                         >
//                                                             {ticket.jobOrder}
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                                 <div className="text-[10px] text-slate-500 mt-0.5 font-bold">{ticket.dateReported}</div>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className={`text-sm font-bold ${ticket.isLocked ? 'text-slate-600' : 'text-slate-900'}`}>{ticket.requestingParty}</div>
//                                                 <div className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">{ticket.departmentSection}</div>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className={`text-sm font-semibold ${ticket.isLocked ? 'text-slate-600' : 'text-slate-800'}`}>{ticket.designatedEngr}</div>
//                                                 <div className="text-[10px] text-slate-500 font-medium italic">{ticket.designation}</div>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <span className={`text-xs font-black uppercase tracking-tighter ${ticket.isLocked ? 'text-slate-400' : 'text-slate-700'}`}>
//                                                     {ticket.category}
//                                                 </span>
//                                                 <div className="text-[10px] text-slate-500 font-medium max-w-[150px] truncate">{ticket.services}</div>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <div className={ticket.isLocked ? 'opacity-60' : ''}>
//                                                     <Badge status={ticket.status} />
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 text-right">
//                                                 <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                                                     <button
//                                                         disabled={ticket.isLocked}
//                                                         onClick={() => onEdit(ticket)}
//                                                         className={`p-1.5 rounded-lg transition-all ${ticket.isLocked
//                                                                 ? 'text-slate-200 cursor-not-allowed'
//                                                                 : 'text-slate-500 hover:text-blue-700 hover:bg-blue-50'
//                                                             }`}
//                                                         title={ticket.isLocked ? "Record is locked" : "Edit Record"}
//                                                     >
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
//                                                     </button>
//                                                     <button
//                                                         disabled={ticket.isLocked}
//                                                         onClick={() => onDelete(ticket.id)}
//                                                         className={`p-1.5 rounded-lg transition-all ${ticket.isLocked
//                                                                 ? 'text-slate-200 cursor-not-allowed'
//                                                                 : 'text-slate-500 hover:text-red-700 hover:bg-red-50'
//                                                             }`}
//                                                         title={ticket.isLocked ? "Record is locked" : "Delete Record"}
//                                                     >
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>

//                                         {/* EXPANDABLE PREVIEW AREA */}
//                                         {isExpanded && (
//                                             <tr className="bg-slate-50/90 animate-in fade-in slide-in-from-top-2 duration-300">
//                                                 <td colSpan={7} className="px-12 py-6 border-l-4 border-blue-500">
//                                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                                         <div className="space-y-2">
//                                                             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
//                                                                 Issue Description
//                                                             </h4>
//                                                             <p className="text-sm text-slate-800 font-semibold leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
//                                                                 {ticket.description || 'No description provided.'}
//                                                             </p>
//                                                             <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
//                                                                 <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1.5">
//                                                                     <svg className="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
//                                                                     Location: <span className="text-slate-900 font-black">{ticket.location}</span>
//                                                                 </div>
//                                                                 <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1.5">
//                                                                     <svg className="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
//                                                                     Dept: <span className="text-slate-900 font-black">{ticket.departmentSection}</span>
//                                                                 </div>
//                                                                 <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1.5">
//                                                                     <svg className="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
//                                                                     Email: <span className="text-slate-900 font-black">{ticket.requestingPartyEmail || 'N/A'}</span>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                         <div className="space-y-2">
//                                                             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
//                                                                 Action Taken & Resolution
//                                                             </h4>
//                                                             <p className="text-sm text-slate-800 font-semibold leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100 shadow-sm">
//                                                                 {ticket.actionTaken || 'Resolution pending...'}
//                                                             </p>
//                                                             <div className="grid grid-cols-2 gap-4 mt-2">
//                                                                 <div>
//                                                                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Time Spent</div>
//                                                                     <div className="text-xs font-black text-blue-700">{ticket.actualServiceTimeMinutes} Minutes</div>
//                                                                 </div>
//                                                                 <div>
//                                                                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Satisfaction Rating</div>
//                                                                     <div className="text-xs font-black text-amber-600">
//                                                                         {ticket.overallRating > 0 ? '★'.repeat(ticket.overallRating) : 'Not Rated'}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </React.Fragment>
//                                 );
//                             })}
//                             {filteredTickets.length === 0 && (
//                                 <tr>
//                                     <td colSpan={7} className="px-6 py-12 text-center">
//                                         <div className="flex flex-col items-center gap-2">
//                                             <div className="p-4 bg-slate-50 rounded-full text-slate-300">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
//                                             </div>
//                                             <p className="text-slate-500 font-bold">No tickets found matching your search.</p>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TicketTable;