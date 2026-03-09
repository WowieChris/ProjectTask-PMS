import { Head, Link } from "@inertiajs/react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

type Area = {
  id: number;
  name: string;
};

type Branch = {
  id: number;
  name: string;
  area_id: number;
};

type PageProps = {
  areas: Area[];
  selectedArea?: Area | null;
  branches: Branch[];
};

export default function Index({
  areas = [],
  selectedArea = null,
  branches = [],
}: PageProps) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Browse Organization", href: "/organization" },
      ]}
    >
      <Head title="Branches" />

      <div className="grid gap-6 lg:grid-cols-2">

        {/* AREAS */}
        <Card>
          <CardHeader>
            <CardTitle>Areas</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {areas.map((area) => {
              const active = selectedArea?.id === area.id;

              return (
                <Link
                  key={area.id}
                  href={`/areas/${area.id}/branches`}
                  className={`block rounded-md border p-3 hover:bg-muted ${
                    active ? "bg-muted" : ""
                  }`}
                >
                  <div className="font-medium">{area.name}</div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* BRANCHES */}
        <Card>
          <CardHeader>
            <CardTitle>
              Branches {selectedArea ? `(${selectedArea.name})` : ""}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {!selectedArea ? (
              <p className="text-sm text-muted-foreground">
                Select an Area to view branches.
              </p>
            ) : branches.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No branches under this area yet.
              </p>
            ) : (
              branches.map((branch) => (
                <div
                  key={branch.id}
                  className="rounded-md border p-3 hover:bg-muted"
                >
                  {branch.name}
                </div>
              ))
            )}
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}