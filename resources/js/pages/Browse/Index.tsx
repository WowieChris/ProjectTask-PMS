/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Head } from '@inertiajs/react';

// import type { BreadcrumbItem } from '@/types';
// import { dashboard } from '@/routes';

import {
  ChevronRight,
  Search,
  MapPin,
  Building2,
  Network,
  Layers,
  Edit3,
  Save,
  Plus,
  Filter,
  ChevronDown,
  MoreVertical,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';

// --- Types ---

type Level = 'division' | 'district' | 'area' | 'branch';

interface LocationItem {
  id: string;
  name: string;
  code: string;
  parentId?: string;
  level: Level;
  status: 'active' | 'inactive';
  address?: string;
}

// --- Mock Data ---

const MOCK_DATA: LocationItem[] = [
  // Divisions
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `div-${i + 1}`,
    name: `Division ${i + 1}`,
    code: `D0${i + 1}`,
    level: 'division' as Level,
    status: 'active' as const,
  })),
  // Districts for Division 1
  { id: 'dist-1', name: 'North District', code: 'DIST-N', parentId: 'div-1', level: 'district', status: 'active' },
  { id: 'dist-2', name: 'South District', code: 'DIST-S', parentId: 'div-1', level: 'district', status: 'active' },
  // Areas for North District
  { id: 'area-1', name: 'Area 1', code: 'A-01', parentId: 'dist-1', level: 'area', status: 'active' },
  { id: 'area-2', name: 'Area 2', code: 'A-02', parentId: 'dist-1', level: 'area', status: 'active' },
  { id: 'area-4', name: 'Area 4', code: 'A-04', parentId: 'dist-1', level: 'area', status: 'active' },
  { id: 'area-5', name: 'Area 5', code: 'A-05', parentId: 'dist-1', level: 'area', status: 'active' },
  // Branches for Area 1
  { id: 'br-1', name: 'Main Branch', code: 'BR-001', parentId: 'area-1', level: 'branch', status: 'active', address: '123 Business Ave, Metro City' },
  { id: 'br-2', name: 'Sub Branch A', code: 'BR-002', parentId: 'area-1', level: 'branch', status: 'active', address: '456 Industrial Way, North Sector' },
];

export default function App() {
  const [selectedDivision, setSelectedDivision] = useState<string>('div-1');
  const [currentLevel, setCurrentLevel] = useState<Level>('district');
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<LocationItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneralOverview, setIsGeneralOverview] = useState(false);

  // --- Derived State ---

  const filteredList = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (isGeneralOverview) {
        return item.level === currentLevel;
      }

      if (currentLevel === 'district') {
        return item.level === 'district' && item.parentId === selectedDivision;
      }

      if (selectedParentId) {
        return item.level === currentLevel && item.parentId === selectedParentId;
      }

      return false;
    });
  }, [selectedDivision, currentLevel, selectedParentId, searchQuery, isGeneralOverview]);

  const breadcrumbs = useMemo(() => {
    if (isGeneralOverview) {
      return [{ label: 'General Overview', level: currentLevel, id: 'overview' }];
    }

    const crumbs = [{ label: 'Division', level: 'division' as Level, id: selectedDivision }];

    if (currentLevel === 'area' || currentLevel === 'branch') {
      const district = MOCK_DATA.find(d => d.id === selectedParentId || (currentLevel === 'branch' && MOCK_DATA.find(a => a.id === selectedParentId)?.parentId === d.id));
      if (district) crumbs.push({ label: 'District', level: 'district' as Level, id: district.id });
    }

    if (currentLevel === 'branch') {
      const area = MOCK_DATA.find(a => a.id === selectedParentId);
      if (area) crumbs.push({ label: 'Area', level: 'area' as Level, id: area.id });
    }

    return crumbs;
  }, [currentLevel, selectedParentId, selectedDivision, isGeneralOverview]);

  // --- Handlers ---

  const handleLevelChange = (level: Level, parentId: string | null = null) => {
    setCurrentLevel(level);
    setSelectedParentId(parentId);
    setEditingItem(null);
  };

  const handleSelectItem = (item: LocationItem) => {
    setEditingItem(item);
  };

  const handleDrillDown = (item: LocationItem) => {
    if (item.level === 'district') handleLevelChange('area', item.id);
    else if (item.level === 'area') handleLevelChange('branch', item.id);
  };


  // --- Components ---

  return (
    <AppLayout>
      <Head title="Browse Locations" />
      <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
              <MapPin size={22} />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Location Masterfile</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Module Prototype</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              <Plus size={16} />
              Add New Location
            </button>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel: Filter & List */}
          <div className="w-[450px] border-r border-slate-200 bg-white flex flex-col shrink-0">
            <div className="p-6 space-y-6">
              {/* General Overview Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isGeneralOverview ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'}`}>
                    <Layers size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">General Overview</p>
                    <p className="text-[10px] text-slate-500">Disable hierarchical filtering</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsGeneralOverview(!isGeneralOverview);
                    setEditingItem(null);
                    if (!isGeneralOverview) {
                      // When turning ON, we might want to stay at current level but clear parent
                      setSelectedParentId(null);
                    } else {
                      // When turning OFF, reset to district
                      setCurrentLevel('district');
                      setSelectedParentId(null);
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isGeneralOverview ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isGeneralOverview ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Division Selector */}
              <div className={`space-y-2 transition-opacity ${isGeneralOverview ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Select Division</label>
                <div className="relative">
                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      handleLevelChange('district');
                    }}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    {MOCK_DATA.filter(i => i.level === 'division').map(div => (
                      <option key={div.id} value={div.id}>{div.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Level Navigation */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                {(['district', 'area', 'branch'] as Level[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      if (isGeneralOverview) {
                        setCurrentLevel(level);
                        setEditingItem(null);
                        return;
                      }

                      if (level === 'district') handleLevelChange('district');
                      else if (level === 'area') {
                        if (currentLevel === 'branch') {
                          const parentArea = MOCK_DATA.find(a => a.id === selectedParentId);
                          handleLevelChange('area', parentArea?.parentId || null);
                        } else {
                          handleLevelChange('area', editingItem?.id || selectedParentId);
                        }
                      } else if (level === 'branch') {
                        handleLevelChange('branch', editingItem?.id || selectedParentId);
                      }
                    }}
                    disabled={
                      !isGeneralOverview && (
                        (level === 'area' && !editingItem && !selectedParentId) ||
                        (level === 'branch' && (currentLevel !== 'area' || !editingItem) && currentLevel !== 'branch')
                      )
                    }
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all capitalize ${currentLevel === level
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 disabled:opacity-30'
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder={`Search ${currentLevel}s...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* List Header / Breadcrumbs */}
            <div className="px-6 py-3 bg-slate-50 border-y border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.id}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">{crumb.label}</span>
                  {idx < breadcrumbs.length - 1 && <ChevronRight size={12} className="text-slate-300 shrink-0" />}
                </React.Fragment>
              ))}
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <AnimatePresence mode="popLayout">
                {filteredList.length > 0 ? (
                  filteredList.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className={`group p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${editingItem?.id === item.id
                        ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                        : 'bg-white border-slate-100 hover:border-indigo-100 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.level === 'district' ? 'bg-amber-100 text-amber-600' :
                          item.level === 'area' ? 'bg-emerald-100 text-emerald-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                          {item.level === 'district' ? <Network size={20} /> :
                            item.level === 'area' ? <Layers size={20} /> :
                              <Building2 size={20} />}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-800">{item.name}</h3>
                          <p className="text-xs text-slate-500 font-mono">{item.code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.level !== 'branch' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDrillDown(item);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <ChevronRight size={18} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 py-20">
                    <Filter size={40} strokeWidth={1.5} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">No {currentLevel}s found</p>
                    <p className="text-xs opacity-60">Try adjusting your filters</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Editor / Details */}
          <div className="flex-1 bg-slate-50 overflow-y-auto p-8">
            <AnimatePresence mode="wait">
              {editingItem ? (
                <motion.div
                  key={editingItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-3xl mx-auto space-y-8"
                >
                  {/* Header Info */}
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-widest">
                        <Edit3 size={14} />
                        Editing {editingItem.level}
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900">{editingItem.name}</h2>
                      <p className="text-slate-500">Manage details and hierarchy for this location.</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                        Cancel
                      </button>
                      <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Form Card */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                          {editingItem.level === 'branch' ? 'Branch Name' : 'Location Name'}
                        </label>
                        <input
                          type="text"
                          defaultValue={editingItem.name}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                          {editingItem.level === 'branch' ? 'Branch ID' : 'Location Code'}
                        </label>
                        <input
                          type="text"
                          defaultValue={editingItem.code}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
                        />
                      </div>
                      {editingItem.level === 'branch' ? (
                        <div className="space-y-2 col-span-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Address</label>
                          <textarea
                            defaultValue={editingItem.address}
                            rows={2}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                          <div className="flex items-center gap-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="status" defaultChecked={editingItem.status === 'active'} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                              <span className="text-sm font-medium text-slate-700">Active</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="status" defaultChecked={editingItem.status === 'inactive'} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                              <span className="text-sm font-medium text-slate-700">Inactive</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hierarchy View (Special logic for District, Area, and Branch) */}
                  {(editingItem.level === 'district' || editingItem.level === 'area' || editingItem.level === 'branch') && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                          {editingItem.level === 'district' ? 'Assigned Areas' :
                            editingItem.level === 'area' ? 'Assigned Branches' :
                              'Branch Details'}
                          {editingItem.level !== 'branch' && ` (${MOCK_DATA.filter(a => a.parentId === editingItem.id).length})`}
                        </h3>
                        {editingItem.level !== 'branch' && (
                          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            <Plus size={14} />
                            Add {editingItem.level === 'district' ? 'Area' : 'Branch'}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {editingItem.level === 'branch' ? (
                          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Building2 size={24} />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-slate-800">{editingItem.name}</h4>
                                <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">ID: {editingItem.code}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Status</p>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${editingItem.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                  <span className="text-sm font-semibold capitalize text-slate-700">{editingItem.status}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parent Area</p>
                                <p className="text-sm font-semibold text-slate-700">
                                  {MOCK_DATA.find(a => a.id === editingItem.parentId)?.name || 'N/A'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          MOCK_DATA.filter(child => child.parentId === editingItem.id).map(child => (
                            <div key={child.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-indigo-200 transition-all">
                              <div className="p-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${child.level === 'area' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {child.level === 'area' ? <Layers size={20} /> : <Building2 size={20} />}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-slate-800">{child.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{child.code}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${child.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {child.status}
                                  </span>
                                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                    <MoreVertical size={16} />
                                  </button>
                                </div>
                              </div>

                              {child.level === 'area' && (
                                <div className="p-5">
                                  <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Branches Under Area</span>
                                    <span className="text-[10px] font-bold text-slate-400">{MOCK_DATA.filter(b => b.level === 'branch' && b.parentId === child.id).length} Total</span>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    {MOCK_DATA.filter(b => b.level === 'branch' && b.parentId === child.id).map(branch => (
                                      <div key={branch.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group/branch hover:bg-white hover:border-indigo-100 transition-all cursor-pointer">
                                        <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center group-hover/branch:bg-blue-500 group-hover/branch:text-white transition-colors">
                                          <Building2 size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs font-semibold text-slate-700 truncate">{branch.name}</p>
                                          <p className="text-[10px] text-slate-400 font-mono">{branch.code}</p>
                                        </div>
                                      </div>
                                    ))}
                                    <button className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-200 rounded-xl text-xs font-medium text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all">
                                      <Plus size={14} />
                                      Add Branch
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        )}

                        {editingItem.level !== 'branch' && (
                          <button className="w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all group">
                            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:border-indigo-300 group-hover:bg-indigo-100/50 transition-all">
                              <Plus size={20} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="font-bold text-sm">Assign New {editingItem.level === 'district' ? 'Area' : 'Branch'} to {editingItem.name}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Danger Zone */}
                  <div className="pt-8 border-t border-slate-200">
                    <div className="bg-red-50 rounded-2xl p-6 flex items-center justify-between border border-red-100">
                      <div>
                        <h4 className="text-sm font-bold text-red-900">Danger Zone</h4>
                        <p className="text-xs text-red-700 opacity-80">Deleting this location will affect all child entities in the hierarchy.</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <Trash2 size={14} />
                        Delete {editingItem.level}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center mb-6">
                    <Edit3 size={32} strokeWidth={1.5} className="opacity-20" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">No Location Selected</h2>
                  <p className="text-sm max-w-xs text-center opacity-60">
                    Select a location from the list on the left to view and edit its details.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
