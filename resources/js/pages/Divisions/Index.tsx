import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AppLayout from "@/layouts/app-layout";

type UserGroup = {
  id: number;
  name: string;
};

type Division = {
  id: number;
  name: string;
  user_group_id: number;
  user_group?: UserGroup;
};

type PageProps = {
  userGroups: UserGroup[];
  divisions: Division[];
};

interface DivisionForm {
  user_group_id: string;
  name: string;
}

export default function DivisionIndex({ userGroups, divisions }: PageProps) {
  const [q, setQ] = useState("");
  const [editTarget, setEditTarget] = useState<Division | null>(null);

  // ── CREATE form ──
  const { data, setData, post, processing, errors, reset } =
    useForm<DivisionForm>({ user_group_id: "", name: "" });

  // ── EDIT form ──
  const editForm = useForm<DivisionForm>({ user_group_id: "", name: "" });

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return divisions.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.user_group?.name?.toLowerCase().includes(query)
    );
  }, [divisions, q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/divisions", { onSuccess: () => reset("user_group_id", "name") });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this division?")) return;
    router.delete(`/divisions/${id}`);
  };

  const openEdit = (d: Division) => {
    setEditTarget(d);
    editForm.setData({
      user_group_id: String(d.user_group_id),
      name: d.name,
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    editForm.put(`/divisions/${editTarget.id}`, {
      onSuccess: () => setEditTarget(null),
    });
  };

  const badgeColor = (name?: string) => {
    if (!name) return "bg-muted text-muted-foreground";
    if (name.includes("Luzon")) return "bg-blue-500/10 text-blue-400";
    if (name.includes("Visayas")) return "bg-green-500/10 text-green-400";
    if (name.includes("Mindanao")) return "bg-purple-500/10 text-purple-400";
    return "bg-muted text-muted-foreground";
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Divisions", href: "/divisions" },
      ]}
    >
      <Head title="Divisions" />

      <div className="p-6 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Divisions</p>
              <p className="text-2xl font-bold">{divisions.length}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Group</p>
              <p className="text-2xl font-bold">
                {new Set(divisions.filter(d => d.user_group).map(d => d.user_group_id)).size}
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Unassigned</p>
              <p className="text-2xl font-bold">
                {divisions.filter((d) => !d.user_group).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ADD FORM */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Add Division</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-3 gap-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">User Group</label>
                <Select
                  value={data.user_group_id}
                  onValueChange={(v) => setData("user_group_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select group..." />
                  </SelectTrigger>
                  <SelectContent>
                    {userGroups.map((g) => (
                      <SelectItem key={g.id} value={String(g.id)}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.user_group_id && (
                  <p className="text-sm text-red-500">{errors.user_group_id}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Division Name</label>
                <Input
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="e.g. Division 1"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="flex items-end">
                <Button className="w-full" disabled={processing}>
                  {processing ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card className="shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Division List</CardTitle>
            <Input
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-80"
            />
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="pl-6">Division</TableHead>
                  <TableHead>User Group</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12">
                      No divisions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((d) => (
                    <TableRow key={d.id} className="hover:bg-muted/40 transition">
                      <TableCell className="pl-6 font-medium">{d.name}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${badgeColor(d.user_group?.name)}`}
                        >
                          {d.user_group?.name ?? "No Group"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => openEdit(d)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(d.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* EDIT MODAL */}
      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Division</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">User Group</label>
              <Select
                value={editForm.data.user_group_id}
                onValueChange={(v) => editForm.setData("user_group_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select group..." />
                </SelectTrigger>
                <SelectContent>
                  {userGroups.map((g) => (
                    <SelectItem key={g.id} value={String(g.id)}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {editForm.errors.user_group_id && (
                <p className="text-sm text-red-500">{editForm.errors.user_group_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Division Name</label>
              <Input
                value={editForm.data.name}
                onChange={(e) => editForm.setData("name", e.target.value)}
                placeholder="e.g. Division 1"
              />
              {editForm.errors.name && (
                <p className="text-sm text-red-500">{editForm.errors.name}</p>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditTarget(null)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={editForm.processing}>
                {editForm.processing ? "Saving..." : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    </AppLayout>
  );
}