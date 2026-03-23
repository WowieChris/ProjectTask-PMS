
// import React, { useState } from 'react';
// import { CATEGORIES, ENGINEERS, SERVICES, ENGINEER_DETAILS, COMMON_DESIGNATIONS } from '../constants';
// import { geminiService } from '../services/geminiService';
// import type { Ticket } from '../types';
// import { TicketStatus, ComplexityLevel } from '../types';

// interface TicketFormProps {
//     tickets: Ticket[];
//     initialData?: Ticket;
//     onSubmit: (data: Partial<Ticket>) => void;
//     onCancel: () => void;
// }

// const TicketForm: React.FC<TicketFormProps> = ({ tickets, initialData, onSubmit, onCancel }) => {
//     const generateNextJO = () => {
//         const pattern = /TSE\s*-\s*JO\s*-\s*(\d+)/i;
//         let maxNum = 0;
//         tickets.forEach(t => {
//             const match = t.jobOrder.match(pattern);
//             if (match) {
//                 const num = parseInt(match[1], 10);
//                 if (num > maxNum) maxNum = num;
//             }
//         });
//         return `TSE-JO-${(maxNum + 1).toString().padStart(4, '0')}`;
//     };

//     const [formData, setFormData] = useState<Partial<Ticket>>(() => {
//         if (initialData) return initialData;
//         return {
//             jobOrder: generateNextJO(),
//             status: TicketStatus.NOT_RESOLVED,
//             dateReported: new Date().toISOString().split('T')[0],
//             dateCreated: new Date().toISOString().split('T')[0],
//             complexityLevel: ComplexityLevel.MEDIUM,
//             complexityRating: 3,
//             customerFeedbackRating: 3,
//             overallRating: 3,
//             actualServiceTimeMinutes: 0,
//             isLocked: false,
//             services: SERVICES[0],
//             category: CATEGORIES[0],
//             requestingPartyDesignation: 'Office Staff',
//             requestingPartyEmail: '',
//             completionRating: 1,
//             completionStatus: 'On Time',
//             designation: '', // Initialize empty
//             employeeId: ''  // Initialize empty
//         };
//     });

//     const [isAnalyzing, setIsAnalyzing] = useState(false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value, type } = e.target;

//         if (name === 'designatedEngr' && ENGINEER_DETAILS[value]) {
//             setFormData(prev => ({
//                 ...prev,
//                 designatedEngr: value,
//                 employeeId: ENGINEER_DETAILS[value].id,
//                 designation: ENGINEER_DETAILS[value].designation
//             }));
//             return;
//         }

//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value
//         }));
//     };

//     const handleAIAnalysis = async () => {
//         if (!formData.description) return;
//         setIsAnalyzing(true);
//         const analysis = await geminiService.analyzeIssue(formData.description);
//         if (analysis) {
//             setFormData(prev => ({
//                 ...prev,
//                 category: CATEGORIES.includes(analysis.category) ? analysis.category : prev.category,
//                 complexityLevel: analysis.complexity,
//                 actionTaken: analysis.suggestedAction,
//                 actualServiceTimeMinutes: analysis.estimatedMinutes
//             }));
//         }
//         setIsAnalyzing(false);
//     };

//     const isLocked = !!formData.isLocked;

//     const renderStars = (rating: number) => {
//         return (
//             <div className="flex gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                     <svg
//                         key={star}
//                         className={`w-4 h-4 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth="1"
//                     >
//                         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                     </svg>
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <div className="max-w-7xl mx-auto pb-20 px-4">
//             <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">

//                 {/* Header Section */}
//                 <div className="p-10 pb-6 flex justify-between items-start">
//                     <div>
//                         <h1 className="text-2xl font-black text-[#1e293b] uppercase tracking-tight">Technical Support Tracking</h1>
//                         <p className="text-sm font-semibold text-slate-400 mt-0.5 italic">
//                             Create and manage job order entries for engineer performance reporting.
//                         </p>
//                     </div>
//                     <button
//                         type="button"
//                         onClick={() => setFormData(p => ({ ...p, isLocked: !p.isLocked }))}
//                         className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all shadow-sm"
//                     >
//                         {isLocked ? (
//                             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
//                         ) : (
//                             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></svg>
//                         )}
//                     </button>
//                 </div>

//                 <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-10 pt-0 space-y-8">

//                     {/* Main Form Fields */}
//                     <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

//                         {/* Row 1: Optimized Layout for Engineer Details */}
//                         <div className="md:col-span-2 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Job Order #</label>
//                             <div className="relative">
//                                 <input
//                                     value={formData.jobOrder || ''}
//                                     readOnly
//                                     className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-800 outline-none"
//                                 />
//                                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-black text-blue-500 uppercase flex items-center gap-1 opacity-60">
//                                     FIXED
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="md:col-span-2 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Date Created</label>
//                             <input
//                                 type="date"
//                                 name="dateCreated"
//                                 value={formData.dateCreated || ''}
//                                 onChange={handleChange}
//                                 disabled={isLocked}
//                                 className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20"
//                             />
//                         </div>

//                         <div className="md:col-span-3 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Designated Engr.</label>
//                             <select
//                                 name="designatedEngr"
//                                 value={formData.designatedEngr || ''}
//                                 onChange={handleChange}
//                                 disabled={isLocked}
//                                 className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
//                             >
//                                 <option value="">Select Engineer</option>
//                                 {ENGINEERS.map(eng => <option key={eng} value={eng}>{eng}</option>)}
//                             </select>
//                         </div>

//                         {/* NEW FIELD: Designation (Engineer) */}
//                         <div className="md:col-span-3 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Designation (Engr.)</label>
//                             <input
//                                 value={formData.designation || 'Technical Support Engineer'}
//                                 readOnly
//                                 className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 outline-none truncate"
//                             />
//                         </div>

//                         <div className="md:col-span-2 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Employee ID</label>
//                             <input
//                                 value={formData.employeeId || '20XX-XXXX'}
//                                 readOnly
//                                 className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 outline-none"
//                             />
//                         </div>

//                         {/* Row 2: Requesting Party, Designation */}
//                         <div className="md:col-span-8 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Requesting Party</label>
//                             <input
//                                 name="requestingParty"
//                                 value={formData.requestingParty || ''}
//                                 onChange={handleChange}
//                                 disabled={isLocked}
//                                 className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
//                                 placeholder="Full Name"
//                             />
//                         </div>

//                         <div className="md:col-span-4 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Designation / Role (Requester)</label>
//                             <select
//                                 name="requestingPartyDesignation"
//                                 value={formData.requestingPartyDesignation || ''}
//                                 onChange={handleChange}
//                                 disabled={isLocked}
//                                 className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
//                             >
//                                 <option value="">Select Designation</option>
//                                 {COMMON_DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
//                             </select>
//                         </div>

//                         {/* Row 3: Service Category, Issue Category */}
//                         <div className="md:col-span-6 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Service Category</label>
//                             <select
//                                 name="services"
//                                 value={formData.services || ''}
//                                 onChange={handleChange}
//                                 disabled={isLocked}
//                                 className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
//                             >
//                                 <option value="">Select Service</option>
//                                 {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
//                             </select>
//                         </div>

//                         <div className="md:col-span-6 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Issue Category</label>
//                             <select
//                                 name="category"
//                                 value={formData.category || ''}
//                                 onChange={handleChange}
//                                 disabled={isLocked}
//                                 className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
//                             >
//                                 <option value="">Select Category</option>
//                                 {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
//                             </select>
//                         </div>

//                         {/* Row 4: Issue Description */}
//                         <div className="md:col-span-12 space-y-1.5">
//                             <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">Issue Description</label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description || ''}
//                                 onChange={handleChange}
//                                 disabled={isLocked}
//                                 rows={6}
//                                 className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none placeholder:text-slate-300 shadow-inner"
//                                 placeholder="Detailed description of the problem..."
//                             />
//                         </div>
//                     </div>

//                     {/* AI Suggest Section */}
//                     <div className="flex items-center gap-3 py-6 border-b border-slate-100">
//                         <button
//                             type="button"
//                             onClick={handleAIAnalysis}
//                             disabled={isAnalyzing || !formData.description || isLocked}
//                             className={`flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${isAnalyzing ? 'text-blue-500' : 'text-slate-400 hover:text-blue-600'}`}
//                         >
//                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" /></svg>
//                             {isAnalyzing ? "AI Analyzing Record..." : "AI Suggest Resolution & Complexity"}
//                         </button>
//                     </div>

//                     {/* Evaluation Columns */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 pt-6">

//                         {/* TECHNICAL EVALUATION Column */}
//                         <div className="space-y-8">
//                             <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-50 pb-3">TECHNICAL EVALUATION</h3>

//                             <div className="grid grid-cols-2 gap-8">
//                                 <div className="space-y-1.5">
//                                     <label className="block text-sm font-bold text-slate-600">Complexity Level</label>
//                                     <select
//                                         name="complexityLevel"
//                                         value={formData.complexityLevel || ''}
//                                         onChange={handleChange}
//                                         disabled={isLocked}
//                                         className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
//                                     >
//                                         {Object.values(ComplexityLevel).map(l => <option key={l} value={l}>{l}</option>)}
//                                     </select>
//                                 </div>
//                                 <div className="space-y-1.5">
//                                     <label className="block text-sm font-bold text-slate-600">Resolution Status</label>
//                                     <select
//                                         name="status"
//                                         value={formData.status || ''}
//                                         onChange={handleChange}
//                                         disabled={isLocked}
//                                         className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
//                                     >
//                                         {Object.values(TicketStatus).map(s => <option key={s} value={s}>{s}</option>)}
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="space-y-1.5">
//                                 <label className="block text-sm font-bold text-slate-600">Actual Service Time (Minutes)</label>
//                                 <input
//                                     type="number"
//                                     name="actualServiceTimeMinutes"
//                                     value={formData.actualServiceTimeMinutes || 0}
//                                     onChange={handleChange}
//                                     disabled={isLocked}
//                                     className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 shadow-inner"
//                                 />
//                             </div>
//                         </div>

//                         {/* CUSTOMER FEEDBACK Column */}
//                         <div className="space-y-8">
//                             <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-50 pb-3">CUSTOMER FEEDBACK EVALUATION</h3>

//                             <div className="space-y-1.5">
//                                 <label className="block text-sm font-bold text-slate-600">Overall Performance Rating (1-5)</label>
//                                 <div className="flex items-center gap-6">
//                                     <select
//                                         name="overallRating"
//                                         value={formData.overallRating || 3}
//                                         onChange={handleChange}
//                                         disabled={isLocked}
//                                         className="w-28 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
//                                     >
//                                         {[1, 2, 3, 4, 5].map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                                     </select>
//                                     <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex items-center justify-center">
//                                         {renderStars(formData.overallRating || 0)}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="space-y-1.5">
//                                 <label className="block text-sm font-bold text-slate-600">Customer Comments</label>
//                                 <input
//                                     name="customerFeedback"
//                                     value={formData.customerFeedback || ''}
//                                     onChange={handleChange}
//                                     disabled={isLocked}
//                                     className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 shadow-inner"
//                                     placeholder="Summarize client feedback..."
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Form Actions Footer */}
//                     <div className="flex justify-end gap-5 pt-12">
//                         <button
//                             type="button"
//                             onClick={onCancel}
//                             className="px-10 py-4 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 border-2 border-slate-100 rounded-xl transition-all"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={isLocked}
//                             className="px-12 py-4 bg-blue-600 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                         >
//                             SAVE RECORD
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default TicketForm;
