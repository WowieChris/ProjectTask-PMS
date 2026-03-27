import { Head, usePage } from '@inertiajs/react';
import {
  MapPin,
  Layers,
  ChevronDown,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { TreeNodeData } from "@/components/treenode";
import { TreeNode } from "@/components/treenode"
import { router } from "@inertiajs/react"

// --- Types ---
type Level = 'division' | 'district' | 'area' | 'branch';

interface Branch {
  id: number;
  name: string;
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
  user_group_id: number;
  districts: District[];
}

interface UserGroup {
  id: number;
  name: string;
}

interface PageProps extends InertiaPageProps {
  userGroups: UserGroup[];
  divisions: Division[];
}

export default function App() {
  const { divisions, userGroups } = usePage<PageProps>().props;

  const [selectedUserGroup, setSelectedUserGroup] = useState<string>('');
  const [isGeneralOverview, setIsGeneralOverview] = useState(false);

  // ✅ DRAG STATE (ONLY ONCE)
  const [draggingNode, setDraggingNode] = useState<TreeNodeData | null>(null)
  const [dragOverId, setDragOverId] = useState<number | null>(null)

  // ✅ VALIDATION
  const isValidDrop = (drag: TreeNodeData, target: TreeNodeData) => {
    if (drag.type === 'district' && target.type === 'division') return true
    if (drag.type === 'area' && target.type === 'district') return true
    if (drag.type === 'branch' && target.type === 'area') return true
    return false
  }

  // ✅ HANDLERS
  const handleDragStart = (e: React.DragEvent, node: TreeNodeData) => {
    setDraggingNode(node)
  }

  const handleDragOver = (e: React.DragEvent, node: TreeNodeData) => {
    e.preventDefault()

    if (draggingNode && isValidDrop(draggingNode, node)) {
      setDragOverId(node.id)
    }
  }

  const handleDrop = (e: React.DragEvent, target: TreeNodeData) => {
    e.preventDefault()

    if (!draggingNode) return
    if (!isValidDrop(draggingNode, target)) return

    router.patch('/configfiles/navigation', {
      type: draggingNode.type,
      id: draggingNode.id,
      parent_id: target.id,
    })

    setDraggingNode(null)
    setDragOverId(null)
  }

  // Loading
  if (!divisions) {
    return <div>Loading...</div>
  }

  return (
    <AppLayout>
      <Head title="Locations" />

      <div className="p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin />
              <h1 className="text-lg font-semibold">Location Masterfile</h1>
            </div>
          </CardHeader>

          <CardContent>
            {/* FILTER */}
            <div className="mb-4">
              <Label>Select UserGroup</Label>
              <select
                value={selectedUserGroup}
                onChange={(e) => setSelectedUserGroup(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">All</option>
                {userGroups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            {/* TREE */}
            <div className="space-y-1">
              {divisions
                .filter(d =>
                  !selectedUserGroup ||
                  d.user_group_id === Number(selectedUserGroup)
                )
                .map(division => (
                  <TreeNode
                    key={division.id}
                    label={division.name}
                    defaultOpen
                    nodeData={{ id: division.id, name: division.name, type: 'division' }}
                    isDragOver={dragOverId === division.id}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >

                    {division.districts?.map(district => (
                      <TreeNode
                        key={district.id}
                        label={district.name}
                        nodeData={{ id: district.id, name: district.name, type: 'district' }}
                        isDragOver={dragOverId === district.id}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >

                        {district.areas?.map(area => (
                          <TreeNode
                            key={area.id}
                            label={area.name}
                            nodeData={{ id: area.id, name: area.name, type: 'area' }}
                            isDragOver={dragOverId === area.id}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                          >

                            {area.branches?.map(branch => (
                              <TreeNode
                                key={branch.id}
                                label={branch.name}
                                nodeData={{ id: branch.id, name: branch.name, type: 'branch' }}
                                isDragOver={dragOverId === branch.id}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                              />
                            ))}

                          </TreeNode>
                        ))}

                      </TreeNode>
                    ))}

                  </TreeNode>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}