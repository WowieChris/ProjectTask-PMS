import { Head, Link } from "@inertiajs/react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

type UserGroup = {
  id: number;
  name: string;
};

type Division = {
  id: number;
  name: string;
  user_group_id: number;
};

type District = {
  id: number;
  name: string;
  division_id: number;
};

type PageProps = {
  userGroups: UserGroup[];
  selectedGroup?: UserGroup | null;
  divisions: Division[];
  selectedDivision?: Division | null;
  districts: District[];
};

export default function Index({
  userGroups = [],
  selectedGroup = null,
  divisions = [],
  selectedDivision = null,
  districts = [],
}: PageProps) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Browse Organization", href: "/organization" },
      ]}
    >
      <Head title="Browse Organization" />

      <div className="grid gap-6 lg:grid-cols-3">

        {/* WORKGROUPS */}
        <Card>
          <CardHeader>
            <CardTitle>WorkGroups</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {userGroups.map((group) => {
              const active = selectedGroup?.id === group.id;

              return (
                <Link
                  key={group.id}
                  href={`/workgroups/${group.id}`}
                  className={`block rounded-md border p-3 hover:bg-muted ${
                    active ? "bg-muted" : ""
                  }`}
                >
                  <div className="font-medium">{group.name}</div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* DIVISIONS */}
        <Card>
          <CardHeader>
            <CardTitle>
              Divisions {selectedGroup ? `(${selectedGroup.name})` : ""}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {!selectedGroup ? (
              <p className="text-sm text-muted-foreground">
                Select a WorkGroup to view its divisions.
              </p>
            ) : divisions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No divisions under this workgroup yet.
              </p>
            ) : (
              divisions.map((division) => {
                const active = selectedDivision?.id === division.id;

                return (
                  <Link
                    key={division.id}
                    href={`/workgroups/${selectedGroup.id}/divisions/${division.id}`}
                    className={`block rounded-md border p-3 hover:bg-muted ${
                      active ? "bg-muted" : ""
                    }`}
                  >
                    <div className="font-medium">{division.name}</div>
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
              <p className="text-sm text-muted-foreground">
                Select a Division to view districts.
              </p>
            ) : districts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No districts under this division yet.
              </p>
            ) : (
              districts.map((district) => (
                <div key={district.id} className="rounded-md border p-3">
                  {district.name}
                </div>
              ))
            )}
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}