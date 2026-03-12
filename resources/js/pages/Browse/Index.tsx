/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Head, usePage } from '@inertiajs/react';
import {
  ChevronRight,
  Search,
  MapPin,
  Building2,
  Network,
  Layers,
  Edit3,
  Filter,
  ChevronDown,
  MoreVertical,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

// --- Types ---

type Level = 'division' | 'district' | 'area' | 'branch';

interface LocationItem {
  id: string;
  name: string;
  parentId?: string;
  userGroupId?: number;
  level: Level;
  status: 'active' | 'inactive';
  address?: string;
}
interface Branch {
  id: number;
  name: string;
  address?: string;
}

interface Area {
  id: number;
  name: string;
  branches?: Branch[];
}

interface District {
  id: number;
  name: string;
  areas?: Area[];
}

interface Division {
  id: number;
  name: string;
  user_group_id: number; // ✅ add this
  districts?: District[];
}
interface UserGroup {
  id: number;
  name: string;
}
interface PageProps extends Record<string, unknown> {
  userGroups: UserGroup[];
  divisions: Division[];
}

export default function App() {
  const { divisions, userGroups } = usePage<PageProps>().props;

  const [selectedUserGroup, setSelectedUserGroup] = useState<string>('');
  const [currentLevel, setCurrentLevel] = useState<Level>('division');
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<LocationItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneralOverview, setIsGeneralOverview] = useState(false);

  // Generate locations from divisions data
  const locations: LocationItem[] = useMemo(() => {
    const list: LocationItem[] = [];

    divisions.forEach((division: Division) => {
      const divisionId = `div-${division.id}`;

      list.push({
        id: divisionId,
        name: division.name,
        level: 'division',
        userGroupId: division.user_group_id, // ⭐ IMPORTANT
        status: 'active',
      });

      division.districts?.forEach((district: District) => {
        const districtId = `dist-${district.id}`;

        list.push({
          id: districtId,
          name: district.name,
          parentId: divisionId,
          level: 'district',
          status: 'active',
        });

        district.areas?.forEach((area: Area) => {
          const areaId = `area-${area.id}`;

          list.push({
            id: areaId,
            name: area.name,
            parentId: districtId,
            level: 'area',
            status: 'active',
          });

          area.branches?.forEach((branch: Branch) => {
            list.push({
              id: `br-${branch.id}`,
              name: branch.name,
              parentId: areaId,
              level: 'branch',
              status: 'active',
              address: branch.address,
            });
          });
        });
      });
    });

    return list;
  }, [divisions]);

  // Auto-select first division when data loads
  // useEffect(() => {
  //   if (divisions && divisions.length > 0 && !selectedDivision) {
  //     const firstDivisionId = `div-${divisions[0].id}`;
  //     setSelectedDivision(firstDivisionId);
  //   }
  // }, [divisions, selectedDivision]);

  // --- Derived State ---

  const filteredList = useMemo(() => {
    if (!selectedUserGroup && !isGeneralOverview) return [];

    return locations.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (isGeneralOverview) {
        return item.level === currentLevel;
      }

      if (currentLevel === 'division') {
        return (
          item.level === 'division' &&
          item.userGroupId === Number(selectedUserGroup)
        );
      }

      if (selectedParentId) {
        return item.level === currentLevel && item.parentId === selectedParentId;
      }

      return false;
    });
  }, [
    locations,
    selectedUserGroup,
    currentLevel,
    selectedParentId,
    searchQuery,
    isGeneralOverview,
  ]);

  const breadcrumbs = useMemo(() => {
    if (isGeneralOverview) {
      return [{ label: 'General Overview', level: currentLevel, id: 'overview' }];
    }

    const crumbs: { label: string; level: Level; id: string }[] = [];

    // UserGroup
    const userGroup = userGroups.find(
      (g) => g.id === Number(selectedUserGroup)
    );

    if (userGroup) {
      crumbs.push({
        label: userGroup.name,
        level: 'division',
        id: `group-${userGroup.id}`,
      });
    }

    // District breadcrumb
    if (currentLevel === 'area' || currentLevel === 'branch') {
      const district = locations.find((d) => d.id === selectedParentId);
      if (district) {
        crumbs.push({
          label: district.name,
          level: 'district',
          id: district.id,
        });
      }
    }

    // Area breadcrumb
    if (currentLevel === 'branch') {
      const area = locations.find((a) => a.id === selectedParentId);
      if (area) {
        crumbs.push({
          label: area.name,
          level: 'area',
          id: area.id,
        });
      }
    }

    return crumbs;
  }, [
    userGroups,
    locations,
    currentLevel,
    selectedParentId,
    selectedUserGroup,
    isGeneralOverview,
  ]);

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

  // Loading state
  if (!divisions) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading locations...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Empty state
  if (divisions.length === 0) {
    return (
      <AppLayout>
        <Head title="Browse Locations" />
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 text-center">
            <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Locations Found</h2>
            <p className="text-muted-foreground">There are no locations available to display.</p>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title="Browse Locations" />
      <div className="h-screen text-foreground font-sans flex flex-col overflow-hidden">
        {/* Header */}
        <Card className='m-3 gap-0 py-0 flex flex-col flex-1 overflow-hidden'>
          <CardHeader className="h-16 border-b border-border flex flex-row mt-3 pb-3 items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-sm">
                <MapPin size={22} />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">Location Masterfile</h1>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Module Prototype</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
                <Plus size={16} />
                Add New Location
              </button>
            </div> */}
          </CardHeader>
          <CardContent className="p-0 flex-1 flex overflow-hidden">
            <main className="flex flex-col flex-1 overflow-hidden">
              {/* Left Panel: Filter & List (top) */}
              <div className="h-1/2 border-b border-border flex flex-row overflow-hidden">
                <div className="flex-1 border-r border-border flex flex-col shrink-0 overflow-y-hidden p-3 space-y-2">
                  {/* General Overview Toggle /left */}
                  <div className="flex w-[320px] items-center justify-between rounded-2xl border border-border bg-muted p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isGeneralOverview ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        <Layers size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">General Overview</p>
                        <p className="text-[10px] text-muted-foreground">Disable hierarchical filtering</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsGeneralOverview(!isGeneralOverview);
                        setEditingItem(null);
                        if (!isGeneralOverview) {
                          setSelectedParentId(null);
                        } else {
                          setCurrentLevel('division');
                          setSelectedParentId(null);
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isGeneralOverview ? 'bg-primary' : 'bg-secondary'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-primary-foreground transition-transform ${isGeneralOverview ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Division Selector */}
                  <div className={`space-y-2 transition-opacity ${isGeneralOverview ? 'hidden' : 'opacity-100'}`}>
                    <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Select UserGroup</Label>
                    <div className="relative">
                      <select
                        value={selectedUserGroup}
                        onChange={(e) => {
                          setSelectedUserGroup(e.target.value);
                          handleLevelChange('division');
                        }}
                        className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground transition-all cursor-pointer focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                      >
                        <option value="">Select User Group</option>
                        {(userGroups || []).map(group => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                    </div>
                  </div>

                  {/* Level Navigation */}
                  <div className="flex items-center rounded-xl bg-muted p-1">
                    {(['division', 'district', 'area', 'branch'] as Level[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          if (isGeneralOverview) {
                            setCurrentLevel(level);
                            setEditingItem(null);
                            return;
                          }

                          if (level === 'division') handleLevelChange('division');
                          else if (level === 'district') {
                            handleLevelChange('district', editingItem?.id || selectedParentId);
                          } else if (level === 'area') {
                            if (currentLevel === 'branch') {
                              const parentArea = locations.find(a => a.id === selectedParentId);
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
                            (level === 'division' && !editingItem && !selectedParentId) ||
                            (level === 'district' && !editingItem && !selectedParentId) ||
                            (level === 'area' && !editingItem && !selectedParentId) ||
                            (level === 'branch' && (currentLevel !== 'area' || !editingItem) && currentLevel !== 'branch')
                          )
                        }
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all capitalize ${currentLevel === level
                          ? 'bg-background text-primary shadow-sm'
                          : 'text-muted-foreground hover:text-foreground disabled:opacity-30'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                      type="text"
                      placeholder={`Search ${currentLevel}s...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background py-3 pr-4 pl-11 text-sm text-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                    />
                  </div>
                </div>


                {/* List Content / right */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* List Header / Breadcrumbs */}
                  <div className="px-3 py-2 bg-muted border-b border-border flex items-center gap-2">
                    {breadcrumbs.length > 0 ? (
                      breadcrumbs.map((crumb, idx) => (
                        <React.Fragment key={crumb.id}>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">{crumb.label}</span>
                          {idx < breadcrumbs.length - 1 && <ChevronRight size={12} className="text-muted-foreground/70 shrink-0" />}
                        </React.Fragment>
                      ))
                    ) : (
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Select a UserGroup</span>
                    )}
                  </div>
                  {/* List Content / right */}
                  <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-2">
                    <AnimatePresence mode="popLayout">
                      {!selectedUserGroup && !isGeneralOverview ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-20">
                          <MapPin size={40} strokeWidth={1.5} className="mb-4 opacity-20" />
                          <p className="text-sm font-medium">Select a UserGroup to begin</p>
                        </div>
                      ) : filteredList.length > 0 ? (
                        filteredList.map((item) => (
                          <motion.div
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={item.id}
                            onClick={() => handleSelectItem(item)}
                            className={`group p-2 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${editingItem?.id === item.id
                              ? 'bg-accent border-border shadow-sm'
                              : 'bg-card border-border hover:border-primary/40 hover:bg-muted/50'
                              }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.level === 'district' ? 'bg-amber-100 text-amber-600' :
                                item.level === 'area' ? 'bg-emerald-100 text-emerald-600' :
                                  'bg-blue-100 text-blue-600'
                                }`}>
                                {item.level === 'district' ? <Network size={20} /> :
                                  item.level === 'area' ? <Layers size={20} /> :
                                    <Building2 size={16} />}
                              </div>
                              <div>
                                <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                              </div>
                              <div className="flex items-center gap-2">
                                {item.level !== 'branch' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDrillDown(item);
                                    }}
                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                  >
                                    <ChevronRight size={18} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-20">
                          <Filter size={40} strokeWidth={1.5} className="mb-4 opacity-20" />
                          <p className="text-sm font-medium">No {currentLevel}s found</p>
                          <p className="text-xs opacity-60">Try adjusting your filters</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Right Panel: Editor / Details (bottom) */}
              <div className="h-1/2 bg-muted/40 overflow-y-auto p-4">
                <AnimatePresence mode="wait">
                  {editingItem ? (
                    <motion.div
                      key={editingItem.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-6 h-full"
                    >
                      {/* Header Info */}
                      <div className='flex flex-col overflow-hidden w-2/3'>
                        <div className="flex items-end justify-between ">
                          <div className="space-y-1 mx-4">
                            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                              <Edit3 size={14} />
                              Viewing {editingItem.level}
                            </div>
                            <h2 className="text-3xl font-bold text-foreground">{editingItem.name}</h2>
                            <p className="text-muted-foreground">View details and hierarchy for this location.</p>
                          </div>
                        </div>

                        {/* Form Card */}
                        <div className="bg-card rounded-3xl border border-border shadow-sm overflow-visible">
                          <div className="px-8 py-2 grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest capitalize">
                                {editingItem.level}
                              </label>
                              <input
                                type="text"
                                readOnly
                                value={editingItem.name}
                                className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm text-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                              />
                            </div>


                            {/* Hierarchy Bases */}
                            {(() => {
                              const area = editingItem.level === 'branch' ? locations.find(i => i.id === editingItem.parentId) : null;
                              const district = editingItem.level === 'area' ? locations.find(i => i.id === editingItem.parentId) :
                                (editingItem.level === 'branch' && area ? locations.find(i => i.id === area.parentId) : null);
                              const division = editingItem.level === 'district' ? locations.find(i => i.id === editingItem.parentId) :
                                (district ? locations.find(i => i.id === district.parentId) : null);

                              return (
                                <div className="col-span-2 grid grid-flow-col auto-cols gap-4">
                                  {division && (
                                    <div className="space-y-2">
                                      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Division Base</label>
                                      <input
                                        type="text"
                                        readOnly
                                        value={division.name}
                                        className="w-full rounded-xl border border-input bg-background px-4 py-1 text-sm text-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                                      />
                                    </div>
                                  )}
                                  {district && (
                                    <div className="space-y-2">
                                      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">District Base</label>
                                      <input
                                        type="text"
                                        readOnly
                                        value={district.name}
                                        className="w-full rounded-xl border border-input bg-background px-4 py-1 text-sm text-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                                      />
                                    </div>
                                  )}
                                  {area && (
                                    <div className="space-y-2">
                                      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Area Base</label>
                                      <input
                                        type="text"
                                        readOnly
                                        value={area.name}
                                        className="w-full rounded-xl border border-input bg-background px-4 py-1 text-sm text-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })()}

                            {editingItem.level === 'branch' && (
                              <div className="space-y-2 col-span-2">
                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Address</label>
                                <textarea
                                  readOnly
                                  value={editingItem.address}
                                  rows={2}
                                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Hierarchy View */}
                      {(editingItem.level === 'division' ||
                        editingItem.level === 'district' ||
                        editingItem.level === 'area' ||
                        editingItem.level === 'branch') && (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                {editingItem.level === 'district' ? 'Assigned Areas' :
                                  editingItem.level === 'area' ? 'Assigned Branches' :
                                    'Branch Details'}
                                {editingItem.level !== 'branch' && ` (${locations.filter(a => a.parentId === editingItem.id).length})`}
                              </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                              {editingItem.level === 'division' ? (
                                locations
                                  .filter(child => child.level === 'district' && child.parentId === editingItem.id)
                                  .map(district => (
                                    <div key={district.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                                      <div className="p-5 bg-muted/40 border-b border-border flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-100 text-amber-600">
                                            <Network size={20} />
                                          </div>
                                          <div>
                                            <h4 className="font-bold text-foreground">{district.name}</h4>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Areas under district */}
                                      <div className="p-5">
                                        {locations
                                          .filter(a => a.level === 'area' && a.parentId === district.id)
                                          .map(area => (
                                            <div key={area.id} className="mb-4">
                                              <div className="flex items-center gap-3 mb-3">
                                                <Layers size={16} />
                                                <span className="font-semibold">{area.name}</span>
                                              </div>

                                              {/* branches */}
                                              <div className="grid grid-cols-2 gap-3">
                                                {locations
                                                  .filter(b => b.level === 'branch' && b.parentId === area.id)
                                                  .map(branch => (
                                                    <div
                                                      key={branch.id}
                                                      className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border"
                                                    >
                                                      <Building2 size={14} />
                                                      <span className="text-xs font-semibold">{branch.name}</span>
                                                    </div>
                                                  ))}
                                              </div>
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  ))
                              ) : (
                                locations.filter(child => child.parentId === editingItem.id).map(child => (
                                  <div key={child.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:border-primary/40 transition-all">
                                    <div className="p-5 bg-muted/40 border-b border-border flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${child.level === 'area' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                          }`}>
                                          {child.level === 'area' ? <Layers size={20} /> : <Building2 size={20} />}
                                        </div>
                                        <div>
                                          <h4 className="font-bold text-foreground">{child.name}</h4>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${child.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-muted text-muted-foreground'
                                          }`}>
                                          {child.status}
                                        </span>
                                        <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
                                          <MoreVertical size={16} />
                                        </button>
                                      </div>
                                    </div>

                                    {child.level === 'area' && (
                                      <div className="p-5">
                                        <div className="flex items-center justify-between mb-4">
                                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Branches Under Area</span>
                                          <span className="text-[10px] font-bold text-muted-foreground">
                                            {locations.filter(b => b.level === 'branch' && b.parentId === child.id).length} Total
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                          {locations.filter(b => b.level === 'branch' && b.parentId === child.id).map(branch => (
                                            <div key={branch.id} className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border group/branch hover:bg-card hover:border-primary/40 transition-all cursor-pointer">
                                              <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover/branch:bg-primary group-hover/branch:text-primary-foreground transition-colors">
                                                <Building2 size={14} />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-foreground truncate">{branch.name}</p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )}
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                      <div className="w-20 h-20 bg-card rounded-3xl shadow-sm border border-border flex items-center justify-center mb-6">
                        <Edit3 size={32} strokeWidth={1.5} className="opacity-20" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">No Location Selected</h2>
                      <p className="text-sm max-w-xs text-center opacity-60">
                        Select a location from the list on the left to view and edit its details.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </main>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}