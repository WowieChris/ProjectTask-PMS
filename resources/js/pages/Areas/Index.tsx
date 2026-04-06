import { Head, router, useForm } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
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

type District = {
  id: number;
  name: string;
};

type Area = {
  id: number;
  name: string;
  district_id: number;
  district?: District;
};

type PageProps = {
  districts?: District[];
  areas?: Area[];
};

export default function AreaIndex({
  districts = [],
  areas = [],
}: PageProps) {

  const [q, setQ] = useState("");

  const { data, setData, post, processing, errors, reset } = useForm({
    district_id: "",
    name: "",
  });

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return areas.filter((a) =>
      a.name.toLowerCase().includes(query) ||
      a.district?.name?.toLowerCase().includes(query)
    );
  }, [areas, q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/areas", {
      onSuccess: () => reset("district_id", "name"),
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this area?")) return;
    router.delete(`/areas/${id}`);
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Areas", href: "/areas" },
      ]}
    >
      <Head title="Areas" />

      <div className="p-6 space-y-6">

        {/* 🔥 STATS */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Areas</p>
              <p className="text-2xl font-bold">{areas.length}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total District</p>
              <p className="text-2xl font-bold">
                {new Set(areas.filter(d => d.district).map(d => d.district_id)).size}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Unassigned</p>
              <p className="text-2xl font-bold">
                {areas.filter(a => !a.district).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 🔥 FORM */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Add Area</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">

              {/* DISTRICT */}
              <div className="space-y-2">
                <label className="text-sm font-medium">District</label>

                <Select
                  value={data.district_id}
                  onValueChange={(v) => setData("district_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district..." />
                  </SelectTrigger>

                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d.id} value={String(d.id)}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* NAME */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Area Name</label>

                <Input
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="e.g. Area 1"
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
            <CardTitle>Area List</CardTitle>

            <Input
              placeholder="Search area..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-80"
            />
          </CardHeader>

          <CardContent className="p-0">
            <Table>

              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="pl-6">Area</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12">
                      No areas found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((a) => (
                    <TableRow
                      key={a.id}
                      className="hover:bg-muted/40 transition"
                    >
                      <TableCell className="pl-6 font-medium">
                        {a.name}
                      </TableCell>

                      <TableCell>
                        <span className="px-3 py-1 text-xs rounded-full bg-muted">
                          {a.district?.name ?? "No District"}
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
                            onClick={() => handleDelete(a.id)}
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