import { Head, usePage } from '@inertiajs/react';
import {
    MapPin,
    ChevronRight,
    ChevronDown,
    Search,
    Eye,
    EyeOff,
    Building2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

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

interface PageProps extends Record<string, unknown> {
    district: District;
}

/* ================= TREE NODE ================= */
function TreeNode({ node, selected, onSelect, level = 0 }: any) {
    const [open, setOpen] = useState(level === 0);
    const [visible, setVisible] = useState(true);
    const hasChildren = node.children?.length > 0;
    const isActive = node.type === 'area' && selected?.id === node.data?.id;

    return (
        <div className="relative">
            {/* vertical connector */}
            {level > 0 && (
                <div className="absolute top-0 bottom-0 left-[10px] w-px bg-slate-700" />
            )}

            <div
                onClick={() => {
                    if (hasChildren) setOpen(!open);
                    if (node.type === 'area') {
                        onSelect(node.data);
                    }

                    if (node.type === 'district') {
                        onSelect(null);
                    }
                }}
                className={`mb-1 flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition-all ${isActive
                        ? 'border-primary bg-secondary'
                        : 'bg-secondary hover:bg-ring'
                    } `}
                style={{ marginLeft: level * 14 }}
            >
                <div className="flex items-center gap-2">
                    {/* arrow */}
                    {hasChildren ? (
                        open ? (
                            <ChevronDown size={14} />
                        ) : (
                            <ChevronRight size={14} />
                        )
                    ) : (
                        <div className="w-[14px]" />
                    )}

                    {/* node dot */}
                    <div className="h-2 w-2 rounded-full bg-foreground" />

                    <span>{node.name}</span>
                </div>

                {/* eye icon */}
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setVisible(!visible);
                    }}
                    className="opacity-70 hover:opacity-100"
                >
                    {visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </div>
            </div>

            {open && hasChildren && (
                <div className="ml-2">
                    {node.children.map((child: any) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            selected={selected}
                            onSelect={onSelect}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ================= MAIN ================= */
export default function MyLocation() {
    const { district } = usePage<PageProps>().props;

    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [search, setSearch] = useState('');

    const areas = useMemo(() => district?.areas || [], [district]);

    /* 🔥 FILTER */
    const filteredAreas = areas.filter((area) =>
        area.name.toLowerCase().includes(search.toLowerCase()),
    );

    /* 🔥 TREE */
    const treeData = [
        {
            id: `district-${district.id}`,
            name: district.name,
            type: 'district',
            children: filteredAreas.map((area) => ({
                id: `area-${area.id}`,
                name: area.name,
                type: 'area',
                data: area,
                children: (area.branches || []).map((branch) => ({
                    id: `branch-${branch.id}`,
                    name: branch.name,
                    type: 'branch',
                })),
            })),
        },
    ];

    return (
        <AppLayout>
            <Head title="My Location" />

            <div className="flex h-full flex-col">
                <Card className="flex flex-1 overflow-hidden bg-card text-foreground pt-0 gap-0">
                    {/* HEADER */}
                    <CardHeader className="border-b border-ring px-4 py-2">
                        <p className="text-sm font-semibold">Tree Views</p>
                    </CardHeader>

                    <CardContent className="flex flex-1 pt-0">
                        {/* ================= LEFT SIDEBAR ================= */}
                        <div className="flex w-80 flex-col border-r border-ring">
                            {/* SEARCH */}
                            <div className="p-3">
                                <div className="flex items-center rounded-lg bg-muted px-3 py-2">
                                    <Search
                                        size={14}
                                        className="mr-2 text-ring"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-ring"
                                    />
                                </div>
                            </div>

                            {/* TREE */}
                            <div className="flex-1 overflow-auto p-2">
                                {treeData.map((node) => (
                                    <TreeNode
                                        key={node.id}
                                        node={node}
                                        selected={selectedArea}
                                        onSelect={setSelectedArea}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* ================= RIGHT PANEL ================= */}
                        <div className="flex-1 overflow-auto p-6">
                            {!selectedArea ? (
                                <div className="flex h-full flex-col items-center justify-center text-slate-500">
                                    <MapPin
                                        size={40}
                                        className="mb-3 opacity-20"
                                    />
                                    <p>Select an Area</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">
                                        {selectedArea.name} Branches
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedArea.branches.map((branch) => (
                                            <div
                                                key={branch.id}
                                                className="flex items-center gap-3 rounded-xl border border-primary bg-secondary p-4 transition hover:border-ring"
                                            >
                                                <Building2 size={18} />
                                                <span>{branch.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
