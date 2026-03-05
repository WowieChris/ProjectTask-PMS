import { Head, Link } from "@inertiajs/react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

type UserGroup = { id: number; name: string };
type Area = { id: number; name: string; user_group_id: number; user_group?: UserGroup };
type Division = { id: number; name: string; area_id: number };
type District = { id: number; name: string; division_id: number };

type PageProps = {
  userGroups: UserGroup[];
  areas: Area[];
  selectedArea: { id: number; name: string; user_group_id: number } | null;
  divisions: Division[];
  selectedDivision: { id: number; name: string; area_id: number } | null;
  districts: District[];
};

export default function AreasBrowse({
  areas,
  selectedArea,
  divisions,
  selectedDivision,
  districts,
}: PageProps) {
  return (
    <AppLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }, { title: "Browse", href: "/areas" }]}>
      <Head title="Browse Areas / Divisions / Districts" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AREAS */}
        <Card>
          <CardHeader>
            <CardTitle>Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {areas.map((a) => {
              const active = selectedArea?.id === a.id;
              return (
                <Link
                  key={a.id}
                  href={`/areas/${a.id}`}
                  className={`block rounded-md border p-3 hover:bg-muted ${active ? "bg-muted" : ""}`}
                >
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.user_group?.name ?? ""}</div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* DIVISIONS */}
        <Card>
          <CardHeader>
            <CardTitle>
              Divisions {selectedArea ? `(${selectedArea.name})` : ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {!selectedArea ? (
              <p className="text-sm text-muted-foreground">Click an Area (ex: Luzon A) to view divisions.</p>
            ) : divisions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No divisions under this area yet.</p>
            ) : (
              divisions.map((d) => {
                const active = selectedDivision?.id === d.id;
                return (
                  <Link
                    key={d.id}
                    href={`/areas/${selectedArea.id}/divisions/${d.id}`}
                    className={`block rounded-md border p-3 hover:bg-muted ${active ? "bg-muted" : ""}`}
                  >
                    <div className="font-medium">{d.name}</div>
                  </Link>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* DISTRICTS */}
        <Card>
          <CardHeader>
            <CardTitle>
              Districts {selectedDivision ? `(${selectedDivision.name})` : ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {!selectedDivision ? (
              <p className="text-sm text-muted-foreground">Click a Division to view districts.</p>
            ) : districts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No districts under this division yet.</p>
            ) : (
              districts.map((x) => (
                <div key={x.id} className="rounded-md border p-3">
                  {x.name}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}