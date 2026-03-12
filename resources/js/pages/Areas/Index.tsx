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
    const query = q.trim().toLowerCase();
    if (!query) return areas;

    return areas.filter((a) => {
      const district = a.district?.name?.toLowerCase() ?? "";
      const area = a.name.toLowerCase();
      return area.includes(query) || district.includes(query);
    });
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

      <div className="space-y-6">

        {/* Area Entry */}
        <Card>
          <CardHeader>
            <CardTitle>Area Entry</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">

              {/* District Select */}
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

                {errors.district_id && (
                  <p className="text-sm text-red-500">{errors.district_id}</p>
                )}
              </div>

              {/* Area Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Area Name</label>

                <Input
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="e.g. Area 1"
                />

                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Save Button */}
              <div className="flex items-end">
                <Button type="submit" disabled={processing} className="w-full">
                  {processing ? "Saving..." : "Save Area"}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

        {/* Area List */}
        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>Area List</CardTitle>

            <div className="w-full md:w-80">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search area or district..."
              />
            </div>
          </CardHeader>

          <CardContent>
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">ID</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead className="w-[140px] text-right">
                    Actions
                  </TableHead>
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
                  filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.id}</TableCell>

                      <TableCell className="font-medium">
                        {a.name}
                      </TableCell>

                      <TableCell>
                        {a.district?.name ?? `District #${a.district_id}`}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(a.id)}
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