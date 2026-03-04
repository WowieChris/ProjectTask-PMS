import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AppLayout from "@/layouts/app-layout";

type Division = {
  id: number;
  name: string;
};

type District = {
  id: number;
  name: string;
  division_id: number;
  division?: Division;
};

type PageProps = {
  divisions: Division[];
  districts: District[]; // keep simple (array). You can change to paginator later.
};

export default function DistrictIndex({ divisions, districts }: PageProps) {
  const [q, setQ] = useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    division_id: '',
    name: '',
  });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return districts;

    return districts.filter((d) => {
      const div = d.division?.name?.toLowerCase() ?? '';
      const dist = d.name?.toLowerCase() ?? '';
      return dist.includes(query) || div.includes(query);
    });
  }, [districts, q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/districts', {
      onSuccess: () => reset('division_id', 'name'),
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete this district?')) return;
    router.delete(`/districts/${id}`);
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Districts', href: '/districts' },
      ]}
    >
      <Head title="Districts" />

      <div className="space-y-6">
        {/* Create Form */}
        <Card>
          <CardHeader>
            <CardTitle>District Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Division</label>
                <Select
                  value={data.division_id}
                  onValueChange={(v) => setData('division_id', v)}
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
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="e.g. District 1"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="flex items-end">
                <Button type="submit" disabled={processing} className="w-full">
                  {processing ? 'Saving...' : 'Save District'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* List */}
        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>District List</CardTitle>
            <div className="w-full md:w-80">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search district or division..."
              />
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">ID</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead className="w-[140px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.id}</TableCell>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell>{d.division?.name ?? `Division #${d.division_id}`}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(d.id)}
                        >
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