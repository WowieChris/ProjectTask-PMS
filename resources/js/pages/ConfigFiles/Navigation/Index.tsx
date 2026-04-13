import { Head, usePage } from '@inertiajs/react';
import { MapPin, ChevronDown, Users, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { TreeNode } from '@/components/treenode';
import { MoveLocationModal } from '@/components/move-location-modal';
import type { TreeNodeData } from '@/components/treenode';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import EngineerAssignment from '../Field-Eng/Index';

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
interface Branch { id: number; name: string; address?: string; }
interface Area { id: number; name: string; branches: Branch[]; }
interface District { id: number; name: string; areas: Area[]; address?: string; }
interface Division { id: number; name: string; user_group_id: number; address?: string; districts: District[]; }
interface UserGroup { id: number; name: string; }
interface SeniorField { id: number; name: string; last_name: string; user_group_id?: number; userGroup?: UserGroup; }
interface PageProps extends Record<string, unknown> {
  userGroups: UserGroup[];
  divisions: Division[];
  seniorFields: SeniorField[];
  filters: { user_group_id?: string; };
}

export default function App() {

  const [selectedDate, setSelectedDate] = useState<string>('');
  const { divisions, userGroups, seniorFields, filters } = usePage<PageProps>().props;
  const { districts, engineers, areaAssignments } = usePage().props as any;

  const [selectedUserGroup, setSelectedUserGroup] = useState<string>(filters?.user_group_id ?? '');
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [draggedNode, setDraggedNode] = useState<TreeNodeData | null>(null);
  const [dragOverNode, setDragOverNode] = useState<TreeNodeData | null>(null);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState<any>(null);
  const [selectedSeniorField, setSelectedSeniorField] = useState<SeniorField | null>(null);
  const [selectedSeniorFieldGroupId, setSelectedSeniorFieldGroupId] = useState<string>('');

  const assignSeniorFieldGroup = () => {
    if (!selectedSeniorField) {
      return;
    }

    router.post('/seniorfieldassignment', {
      senior_field_id: selectedSeniorField.id,
      user_group_id: selectedSeniorFieldGroupId,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setSelectedSeniorField(null);
        router.reload({ only: ['seniorFields'] }); // 👈 refresh the list
      },
    });
  };

  const handleMove = (targetId: number) => {
    if (!selectedNode && !draggedNode) return;
    const moving = selectedNode ?? draggedNode!;
    router.patch('/navigation/move', {
      type: moving.type, id: moving.id, parent_id: targetId, effectivity_date: selectedDate,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setMoveModalOpen(false);
        setSelectedNode(null);
        setDraggedNode(null);
      }
    });
  };

  const filteredDivisions = useMemo(() =>
    divisions.filter(d =>
      !selectedUserGroup || d.user_group_id === Number(selectedUserGroup)
    ), [divisions, selectedUserGroup]);

  const selectedGroup = userGroups.find(g => String(g.id) === selectedUserGroup);

  if (!divisions) return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </AppLayout>
  );

  return (
    <AppLayout>
      <Head title="Field Group Operations" />

      <div className="h-[calc(100vh-5rem)] flex flex-col bg-background">

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin size={16} className="text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">Field Group Operation Setup</h1>
              <p className="text-[11px] text-muted-foreground">

                {selectedGroup ? selectedGroup.name : 'All Groups'} · {filteredDivisions.length} division{filteredDivisions.length !== 1 ? 's' : ''}
              </p>

            </div>

          </div>

          {/* Group selector in top bar */}
          <div className="relative w-56">
            <select
              value={selectedUserGroup}
              onChange={(e) => {
                setSelectedUserGroup(e.target.value);
                router.get('/ConfigFiles/Navigation', { user_group_id: e.target.value }, {
                  preserveState: true, replace: true,
                });
              }}
              className="w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 cursor-pointer"
            >
              <option value="">All Field Groups</option>
              {(userGroups || []).map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* ── Main 3-col layout ── */}
        <div className="flex flex-1 grid grid-cols-5 gap-0 overflow-hidden">

          {/* ── LEFT: Senior Field Users ── */}
          <div className="col-span-1 shrink-0 border-r border-border flex flex-col bg-card/50">
            <div className="px-4 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Users size={13} className="text-muted-foreground" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Senior Field
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {!seniorFields?.length ? (
                <p className="text-xs text-muted-foreground px-2 py-4 text-center">
                  No senior field users
                </p>
              ) : (
                <div className="space-y-0.5">
                  {seniorFields.map((user, i) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center justify-between gap-2 px-2 py-2 rounded-md hover:bg-muted/60 transition-colors group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary">
                            {user.name[0]}{user.last_name[0]}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-foreground truncate">
                            {user.name} {user.last_name}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {user.userGroup?.name ?? 'Unassigned'}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-[11px]"
                        onClick={() => {
                          setSelectedSeniorField(user);
                          setSelectedSeniorFieldGroupId(String(user.user_group_id ?? ''));
                        }}
                      >
                        Assign
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {selectedSeniorField && (
              <div className="border-t border-border bg-card/75 px-3 py-4">
                <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                  Assign Senior Field Engineer
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold">
                      {selectedSeniorField.name} {selectedSeniorField.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Current field group: {selectedSeniorField.userGroup?.name ?? 'Unassigned'}
                    </p>
                  </div>

                  <select
                    value={selectedSeniorFieldGroupId}
                    onChange={(e) => setSelectedSeniorFieldGroupId(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-2 py-1 text-xs text-foreground"
                  >
                    <option value="">Select a field group</option>
                    {userGroups.map((group) => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2">
                    {selectedSeniorField.user_group_id && !selectedSeniorFieldGroupId ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          router.post('/seniorfieldassignment', {
                            senior_field_id: selectedSeniorField.id,
                            user_group_id: null,
                          }, {
                            preserveScroll: true,
                            onSuccess: () => {
                              setSelectedSeniorField(null);
                              router.reload({ only: ['seniorFields'] });
                            },
                          });
                        }}
                      >
                        Unassign
                      </Button>
                    ) : (
                      <Button size="sm" onClick={assignSeniorFieldGroup} disabled={!selectedSeniorFieldGroupId && !selectedSeniorField.user_group_id}>
                        Save
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => setSelectedSeniorField(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── CENTER: Tree ── */}
          <div className="flex-1 flex flex-col col-span-2 border-r border-border overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 border-b border-border bg-card/30 shrink-0">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Location Hierarchy
              </span>

              <Button
                size="sm"
                variant="outline"
                onClick={() => router.get('/navigation/logs')}
              >
                View Transfer Logs
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => router.get('/navigation/EngineerTransferLogs')}
              >
                Engineer Transfer Logs
              </Button>
            </div>

            {/* Move banner */}
            <AnimatePresence>
              {selectedNode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden shrink-0"
                >
                  <div className="flex items-center justify-between bg-primary/5 border-b border-primary/20 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Move size={13} className="text-primary" />
                      <span className="text-xs text-primary">
                        Moving <strong>{selectedNode.name}</strong>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSelectedNode(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" className="h-7 text-xs" onClick={() => setMoveModalOpen(true)}>
                        Choose Target
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tree content */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {filteredDivisions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <MapPin size={32} className="text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">No divisions for this group</p>
                </div>
              ) : (
                filteredDivisions.map((division, i) => (
                  <motion.div
                    key={division.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <TreeNode
                      label={`${division.name} - ${division.address ?? 'No Base'}`}
                      nodeData={{
                        id: division.id,
                        name: division.name,
                        type: 'division'   // 👈 REQUIRED
                      }}
                      isSelected={selectedNode?.id === division.id && selectedNode?.type === 'division'}
                    // isDragOver={dragOverNode?.id === division.id && dragOverNode?.type === 'division'}
                    // onDragOver={(_, node) => setDragOverNode(node)}
                    // onDragLeave={() => setDragOverNode(null)}
                    // onDrop={() => { if (draggedNode) { setSelectedNode(draggedNode); setDragOverNode(null); setMoveModalOpen(true); } }}
                    >
                      {(division.districts ?? []).map(district => (
                        <TreeNode
                          key={district.id}
                          label={`${district.name} - ${district.address ?? 'No Base'}`}
                          nodeData={{ id: district.id, name: district.name, type: 'district' }}
                          isSelected={selectedNode?.id === district.id && selectedNode?.type === 'district'}
                          // isDragOver={dragOverNode?.id === district.id && dragOverNode?.type === 'district'}
                          onSelect={setSelectedNode}
                          // onDragStart={(_, node) => setDraggedNode(node)}
                          // onDragOver={(_, node) => setDragOverNode(node)}
                          // onDragLeave={() => setDragOverNode(null)}
                          // onDrop={() => { if (draggedNode) { setSelectedNode(draggedNode); setDragOverNode(null); setMoveModalOpen(true); } }}
                          actions={
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => { e.stopPropagation(); setEditingDistrict(district); }}
                            >
                              Edit
                            </Button>
                          }
                        >
                          {(district.areas ?? []).map(area => (
                            <TreeNode
                              key={area.id}
                              label={area.name}
                              nodeData={{ id: area.id, name: area.name, type: 'area' }}
                              isSelected={selectedNode?.id === area.id && selectedNode?.type === 'area'}
                              // isDragOver={dragOverNode?.id === area.id && dragOverNode?.type === 'area'}
                              onSelect={setSelectedNode}
                            // onDragStart={(_, node) => setDraggedNode(node)}
                            // onDragOver={(_, node) => setDragOverNode(node)}
                            // onDragLeave={() => setDragOverNode(null)}
                            // onDrop={() => { if (draggedNode) { setSelectedNode(draggedNode); setDragOverNode(null); setMoveModalOpen(true); } }}
                            >
                              {(area.branches ?? []).map(branch => (
                                <TreeNode
                                  key={branch.id}
                                  label={branch.name}
                                  nodeData={{ id: branch.id, name: branch.name, type: 'branch' }}
                                  isSelected={selectedNode?.id === branch.id && selectedNode?.type === 'branch'}
                                  onSelect={setSelectedNode}
                                // onDragStart={(_, node) => setDraggedNode(node)}
                                />
                              ))}
                            </TreeNode>
                          ))}
                        </TreeNode>
                      ))}
                    </TreeNode>
                  </motion.div>
                ))
              )}
            </div>

            <MoveLocationModal
              open={moveModalOpen}
              onClose={() => { setMoveModalOpen(false); setDraggedNode(null); }}
              moving={selectedNode ?? draggedNode}
              divisions={divisions}
              onConfirm={handleMove}
            />
          </div>

          {/* ── RIGHT: Engineer Assignment ── */}
          <div className="shrink-0 col-span-2 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-card/30 shrink-0">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Engineer Assignment
              </span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <EngineerAssignment
                districts={districts}
                engineers={engineers}
                areaAssignments={areaAssignments}
                editingDistrict={editingDistrict}
              />
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}