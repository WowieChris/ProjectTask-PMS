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

} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { TreeNode } from '@/components/treenode'
import { MoveLocationModal } from '@/components/move-location-modal'
import type { TreeNodeData } from '@/components/treenode'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button';

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
  branches: Branch[];
}

interface District {
  id: number;
  name: string;
  areas: Area[];
}

interface Division {
  id: number;
  name: string;
  user_group_id: number; // ✅ add this
  districts: District[];
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
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null)
  const [draggedNode, setDraggedNode] = useState<TreeNodeData | null>(null)
  const [dragOverNode, setDragOverNode] = useState<TreeNodeData | null>(null)
  const [moveModalOpen, setMoveModalOpen] = useState(false)

  const handleMove = (targetId: number) => {
  if (!selectedNode && !draggedNode) return
  const moving = selectedNode ?? draggedNode!

  //location move handler
  router.patch('/browse/move', {
    type: moving.type,
    id: moving.id,
    parent_id: targetId,
  }, {
    preserveScroll: true,
    onSuccess: () => {
      setMoveModalOpen(false)
      setSelectedNode(null)
      setDraggedNode(null)
    }
  })
}
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
            <p className="text-foreground">There are no locations available to display.</p>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title="Browse Locations" />
      <div className="h-[calc(100vh-5rem)] text-foreground font-sans flex flex-col">
        {/* Header */}
        <Card className='flex flex-col flex-1 gap-0 py-0 overflow-hidden'>
          <CardHeader className="h-16 border-b border-border flex items-start justify-between px-6">
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-sm">
                <MapPin size={22} />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">Location Masterfile</h1>
                <p className="text-xs text-card-foreground font-medium uppercase tracking-wider">Module Prototype</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
                <Plus size={16} />
                Add New Location
              </button>
            </div> */}
          </CardHeader>
          <CardContent className="p-0 flex flex-1 overflow-hidden">
            <main className="flex flex-col w-full min-h-0 overflow-hidden">
              {/* Left Panel: Filter & List (top) */}
              <div className="flex flex-row border-b border-border overflow-hidden">
                {/* General Overview Toggle /left */}
                <div className="w-1/3 border-r border-border flex flex-col p-3 gap-3">
                  <div className="flex w-full items-center justify-between rounded-2xl border border-border bg-muted p-4">
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
                    <Label className="text-[11px] font-bold uppercase tracking-widest text-card-foreground">Select UserGroup</Label>
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


                </div>


                {/* List Content / right */}
                <div className="flex flex-col overflow-hidden w-2/3">
                  <div className="p-4 overflow-y-auto h-full space-y-2">

  {/* Move button — appears when a node is selected */}
  {selectedNode && (
    <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 mb-3">
      <span className="text-xs text-primary font-medium">
        Selected: <strong>{selectedNode.name}</strong>
      </span>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setSelectedNode(null)}>
          Cancel
        </Button>
        <Button size="sm" onClick={() => setMoveModalOpen(true)}>
          Move
        </Button>
      </div>
    </div>
  )}

  {divisions
    .filter(division =>
      isGeneralOverview || !selectedUserGroup
        ? true
        : division.user_group_id === Number(selectedUserGroup)
    )
    .map(division => (
      <TreeNode
        key={division.id}
        label={division.name}
        nodeData={{ id: division.id, name: division.name, type: 'division' }}
        isSelected={selectedNode?.id === division.id && selectedNode?.type === 'division'}
        isDragOver={dragOverNode?.id === division.id && dragOverNode?.type === 'division'}
        onDragOver={(_, node) => setDragOverNode(node)}
        onDragLeave={() => setDragOverNode(null)}
        onDrop={(_, target) => {
          if (draggedNode) {
            setSelectedNode(draggedNode)
            setDragOverNode(null)
            setMoveModalOpen(true)
          }
        }}
      >
        {(division.districts ?? []).map(district => (
          <TreeNode
            key={district.id}
            label={district.name}
            nodeData={{ id: district.id, name: district.name, type: 'district' }}
            isSelected={selectedNode?.id === district.id && selectedNode?.type === 'district'}
            isDragOver={dragOverNode?.id === district.id && dragOverNode?.type === 'district'}
            onSelect={setSelectedNode}
            onDragStart={(_, node) => setDraggedNode(node)}
            onDragOver={(_, node) => setDragOverNode(node)}
            onDragLeave={() => setDragOverNode(null)}
            onDrop={(_, target) => {
              if (draggedNode) {
                setSelectedNode(draggedNode)
                setDragOverNode(null)
                setMoveModalOpen(true)
              }
            }}
          >
            {(district.areas ?? []).map(area => (
              <TreeNode
                key={area.id}
                label={area.name}
                nodeData={{ id: area.id, name: area.name, type: 'area' }}
                isSelected={selectedNode?.id === area.id && selectedNode?.type === 'area'}
                isDragOver={dragOverNode?.id === area.id && dragOverNode?.type === 'area'}
                onSelect={setSelectedNode}
                onDragStart={(_, node) => setDraggedNode(node)}
                onDragOver={(_, node) => setDragOverNode(node)}
                onDragLeave={() => setDragOverNode(null)}
                onDrop={(_, target) => {
                  if (draggedNode) {
                    setSelectedNode(draggedNode)
                    setDragOverNode(null)
                    setMoveModalOpen(true)
                  }
                }}
              >
                {(area.branches ?? []).map(branch => (
                  <TreeNode
                    key={branch.id}
                    label={branch.name}
                    nodeData={{ id: branch.id, name: branch.name, type: 'branch' }}
                    isSelected={selectedNode?.id === branch.id && selectedNode?.type === 'branch'}
                    onSelect={setSelectedNode}
                    onDragStart={(_, node) => setDraggedNode(node)}
                  />
                ))}
              </TreeNode>
            ))}
          </TreeNode>
        ))}
      </TreeNode>
    ))}
</div>

{/* Move Modal */}
<MoveLocationModal
  open={moveModalOpen}
  onClose={() => {
    setMoveModalOpen(false)
    setDraggedNode(null)
  }}
  moving={selectedNode ?? draggedNode}
  divisions={divisions}
  onConfirm={handleMove}
/>
                </div>
              </div>
            </main>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}