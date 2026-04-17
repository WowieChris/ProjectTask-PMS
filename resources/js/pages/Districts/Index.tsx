import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
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
  address: string;
};

type Division = {
  id: number;
  name: string;
  user_group?: UserGroup;

};

type District = {
  id: number;
  name: string;
  division_id: number;
  division?: Division;
  address: string;

};

type PageProps = {
  divisions: Division[];
  districts: District[];
};

export default function DistrictIndex({ divisions = [], districts = [] }: PageProps) {
  const [q, setQ] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<District | null>(null);

  // ── CREATE form ──
  const { data, setData, post, processing, errors, reset } = useForm({
    division_id: "",
    name: "",
    address: "",
  });

  // ── EDIT form ──
  const editForm = useForm({
    division_id: "",
    name: "",
    address: "",
  });

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return districts.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.division?.name?.toLowerCase().includes(query) ||
        d.division?.user_group?.name?.toLowerCase().includes(query) ||
        d.address?.toLowerCase().includes(query)
    );
  }, [districts, q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/districts", {
      onSuccess: () => {
        reset("division_id", "name", "address");
        setAddOpen(false);
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this district?")) return;
    router.delete(`/districts/${id}`);
  };

  const openEdit = (d: District) => {
    setEditTarget(d);
    editForm.setData({
      division_id: String(d.division_id),
      name: d.name,
      address: d.address,
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    editForm.put(`/districts/${editTarget.id}`, {
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
        { title: "Districts", href: "/districts" },
      ]}
    >
      <Head title="Districts" />

      <div className="p-6 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Districts</p>
              <p className="text-2xl font-bold">{districts.length}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Divisions</p>
              <p className="text-2xl font-bold">{divisions.length}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">No Division</p>
              <p className="text-2xl font-bold">
                {districts.filter((d) => !d.division).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ADD BUTTON */}
        <div className="flex justify-end">
          <Button onClick={() => setAddOpen(true)}>Add District</Button>
        </div>

        {/* TABLE */}
        <Card className="shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>District List</CardTitle>
            <Input
              placeholder="Search district..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-80"
            />
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="pl-6">District</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>User Group</TableHead>
                  <TableHead>Address</TableHead>

                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      No districts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((d) => (
                    <TableRow key={d.id} className="hover:bg-muted/40 transition">
                      <TableCell className="pl-6 font-medium">{d.name}</TableCell>

                      <TableCell>
                        <span className="px-3 py-1 text-xs rounded-full bg-muted">
                          {d.division?.name ?? "No Division"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className={`px-3 py-1 text-xs rounded-full ${badgeColor(d.division?.user_group?.name)}`}>
                          {d.division?.user_group?.name ?? "No Group"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className={`px-3 py-1 text-xs rounded-full ${badgeColor(d.address)}`}>
                          {d.address ?? "No Address"}
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

      {/* ADD MODAL */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add District</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Division</label>
              <Select
                value={data.division_id}
                onValueChange={(v) => setData("division_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select division..." />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.division_id && (
                <p className="text-sm text-red-500">{errors.division_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">District Name</label>
              <Input
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="e.g. District 1"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => { setAddOpen(false); reset(); }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit District</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Division</label>
              <Select
                value={editForm.data.division_id}
                onValueChange={(v) => editForm.setData("division_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select division..." />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {editForm.errors.division_id && (
                <p className="text-sm text-red-500">{editForm.errors.division_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">District Name</label>
              <Input
                value={editForm.data.name}
                onChange={(e) => editForm.setData("name", e.target.value)}
                placeholder="e.g. District 1"
              />
              {editForm.errors.name && (
                <p className="text-sm text-red-500">{editForm.errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={editForm.data.address}
                onChange={(e) => editForm.setData("address", e.target.value)}
                placeholder="e.g. Cities"
              />
              {editForm.errors.address && (
                <p className="text-sm text-red-500">{editForm.errors.address}</p>
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