import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// Added missing Select imports
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
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
  user_group_id: number;
  user_group?: UserGroup;
};

type PageProps = {
  userGroups: UserGroup[];
  divisions: Division[];
};
// Form data type for useForm generic
interface DivisionForm {
  user_group_id: string;
  name: string;
}

export default function DivisionIndex({ userGroups, divisions }: PageProps) {
  const [q, setQ] = useState("");

  // Added generic type to useForm for better TypeScript support
  const { data, setData, post, processing, errors, reset } = useForm<DivisionForm>({
    user_group_id: "",
    name: "",
  });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return divisions;

    return divisions.filter((d) => {
      const div = d.name.toLowerCase();
      const area = d.user_group?.name?.toLowerCase() ?? "";
      const ug = d.user_group?.name?.toLowerCase() ?? "";
      return div.includes(query) || area.includes(query) || ug.includes(query);
    });
  }, [divisions, q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/divisions", {
      onSuccess: () => reset("user_group_id", "name"),
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this division?")) return;
    router.delete(`/divisions/${id}`);
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Divisions", href: "/divisions" },
      ]}
    >
      <Head title="Divisions" />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Division Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">UserGroup</label>

<Select
  value={data.user_group_id}
  onValueChange={(v) => setData("user_group_id", v)}
>
  <SelectTrigger>
    <SelectValue placeholder="Select UserGroup..." />
  </SelectTrigger>

  <SelectContent>
    {userGroups.map((g) => (
      <SelectItem key={g.id} value={String(g.id)}>
        {g.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
                {errors.user_group_id && <p className="text-sm text-red-500">{errors.user_group_id}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Division Name</label>
                <Input
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="e.g. Division 1"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="flex items-end">
                <Button type="submit" disabled={processing} className="w-full">
                  {processing ? "Saving..." : "Save Division"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>Division List</CardTitle>
            <div className="w-full md:w-80">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">ID</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>UserGroup</TableHead>
                  <TableHead className="w-[140px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.id}</TableCell>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell>{d.user_group?.name ?? `UserGroup #${d.user_group_id}`}</TableCell>
                      <TableCell>{d.user_group?.name ?? "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(d.id)}>
                          Delete
                        </Button>
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
