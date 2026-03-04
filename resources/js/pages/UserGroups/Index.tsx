import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

import AppLayout from "@/layouts/app-layout";

type UserGroup = { id: number; name: string };

type PageProps = {
  userGroups: UserGroup[];
};

export default function UserGroupsIndex({ userGroups }: PageProps) {
  const [q, setQ] = useState("");

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
  });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return userGroups;
    return userGroups.filter((g) => g.name.toLowerCase().includes(query));
  }, [userGroups, q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/user-groups", { onSuccess: () => reset("name") });
  };

  const remove = (id: number) => {
    if (!confirm("Delete this User Group?")) return;
    router.delete(`/user-groups/${id}`);
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "User Groups", href: "/user-groups" },
      ]}
    >
      <Head title="User Groups" />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Group Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">User Group Name</label>
                <Input
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="e.g. UserGroup"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="flex items-end">
                <Button type="submit" disabled={processing} className="w-full">
                  {processing ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>User Group List</CardTitle>
            <div className="w-full md:w-80">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[140px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((g) => (
                    <TableRow key={g.id}>
                      <TableCell>{g.id}</TableCell>
                      <TableCell className="font-medium">{g.name}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" size="sm" onClick={() => remove(g.id)}>
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