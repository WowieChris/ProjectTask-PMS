import { Head, usePage } from "@inertiajs/react";
import {
    MapPin,
    ChevronRight,
    ChevronDown,
    Search,
    Eye,
    EyeOff,
    Building2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

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
    const isActive =
        node.type === "area" && selected?.id === node.data?.id;

    return (
        <div className="relative">

            {/* vertical connector */}
            {level > 0 && (
                <div className="absolute left-[10px] top-0 bottom-0 w-px bg-slate-700" />
            )}

            <div
                onClick={() => {
                    if (hasChildren) setOpen(!open);
                    if (node.type === "area") {
                        onSelect(node.data);
                    }

                    if (node.type === "district") {
                        onSelect(null);
                    }
                }}
                className={`
    flex items-center justify-between
    px-3 py-2 rounded-lg cursor-pointer
    text-sm transition-all
    border mb-1
    ${isActive
                        ? "bg-slate-700 border-slate-500"
                        : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                    }
`}
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
                    <div className="w-2 h-2 rounded-full bg-slate-400" />

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

            {
                open && hasChildren && (
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
                )
            }
        </div >
    );
}

/* ================= MAIN ================= */
export default function MyLocation() {
    const { district } = usePage<PageProps>().props;

    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [search, setSearch] = useState("");

    const areas = useMemo(() => district?.areas || [], [district]);

    /* 🔥 FILTER */
    const filteredAreas = areas.filter((area) =>
        area.name.toLowerCase().includes(search.toLowerCase())
    );

    /* 🔥 TREE */
    const treeData = [
        {
            id: `district-${district.id}`,
            name: district.name,
            type: "district",
            children: filteredAreas.map((area) => ({
                id: `area-${area.id}`,
                name: area.name,
                type: "area",
                data: area,
                children: (area.branches || []).map((branch) => ({
                    id: `branch-${branch.id}`,
                    name: branch.name,
                    type: "branch",
                })),
            })),
        },
    ];

    return (
        <AppLayout>
            <Head title="My Location" />

            <div className="flex flex-col h-full">

                <Card className="flex flex-1 overflow-hidden bg-slate-950 text-white">

                    {/* HEADER */}
                    <CardHeader className="border-b border-slate-800 px-4 py-3">
                        <p className="text-sm font-semibold">Tree Views</p>
                    </CardHeader>

                    <CardContent className="flex flex-1 p-0">

                        {/* ================= LEFT SIDEBAR ================= */}
                        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">

                            {/* SEARCH */}
                            <div className="p-3 border-b border-slate-800">
                                <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2">
                                    <Search size={14} className="text-slate-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="bg-transparent outline-none text-sm w-full text-white placeholder:text-slate-400"
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
                        <div className="flex-1 p-6 overflow-auto bg-slate-950">

                            {!selectedArea ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                    <MapPin size={40} className="opacity-20 mb-3" />
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
                                                className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-500 transition flex items-center gap-3"
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