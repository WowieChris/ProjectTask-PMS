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
  SelectContent
} from "@/components/ui/select";

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
  user_group?: UserGroup;
};

type District = {
  id: number;
  name: string;
  division_id: number;
  division?: Division;
};

type PageProps = {
  divisions: Division[];
  districts: District[];
};

export default function DistrictIndex({ divisions = [], districts = [] }: PageProps) {
  const [q, setQ] = useState("");

  const { data, setData, post, processing, errors, reset } = useForm({
    division_id: "",
    name: "",
  });

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return districts.filter((d) =>
      d.name.toLowerCase().includes(query) ||
      d.division?.name?.toLowerCase().includes(query) ||
      d.division?.user_group?.name?.toLowerCase().includes(query)
    );
  }, [districts, q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/districts", {
      onSuccess: () => reset("division_id", "name"),
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this district?")) return;
    router.delete(`/districts/${id}`);
  };

  // 🎨 Badge color (same system)
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

        {/* 🔥 STATS */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Districts</p>
              <p className="text-2xl font-bold">{districts.length}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Division</p>
              <p className="text-2xl font-bold">
                {new Set(divisions.filter(d => d.id).map(d => d.id)).size}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">No Division</p>
              <p className="text-2xl font-bold">
                {districts.filter(d => !d.division).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 🔥 FORM */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Add District</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">

              {/* DIVISION */}
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
              </div>

              {/* NAME */}
              <div className="space-y-2">
                <label className="text-sm font-medium">District Name</label>
                <Input
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="e.g. District 1"
                />
              </div>

              {/* BUTTON */}
              <div className="flex items-end">
                <Button className="w-full">
                  {processing ? "Saving..." : "Save"}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

        {/* 🔥 TABLE */}
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
                    <TableRow
                      key={d.id}
                      className="hover:bg-muted/40 transition"
                    >
                      <TableCell className="pl-6 font-medium">
                        {d.name}
                      </TableCell>

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

                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="secondary">
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
    </AppLayout>
  );
}