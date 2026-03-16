import React, { useState, useMemo, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditDesignation from "./edit";
import CreateDesignation from "./create";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Designation {
  id: number;
  name: string;
  // optional: permissions if your API returns them
  permissions?: string[];
}

interface Props {
  designations: Designation[];
}

export default function DesignationMasterfile({ designations }: Props) {
  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  // filter designations based on search
  const filteredDesignations = useMemo(() => {
    return designations.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [designations, search]);

  return (
    <AppLayout breadcrumbs={[{ title: "Designation Masterfile", href: "/designations" }]}>
      <Head title="Designation Masterfile" />

      <div className="flex h-full gap-4 p-4">

        {/* Left Column: Designation Table */}
        <div className="w-1/2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
  <CardTitle>Designation List</CardTitle>

  <Dialog open={openCreate} onOpenChange={setOpenCreate}>
    <DialogTrigger asChild>
      <Button>Create Designation</Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Designation</DialogTitle>
      </DialogHeader>

      <CreateDesignation onSuccess={() => setOpenCreate(false)} />
    </DialogContent>
  </Dialog>

</CardHeader>

            <CardContent>
              <Input
                placeholder="Search designation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4"
              />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Designation</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredDesignations.map((designation) => (
                    <TableRow
                      key={designation.id}
                      className={`cursor-pointer hover:bg-muted/30 ${
                        selectedDesignation?.id === designation.id ? "bg-muted/20" : ""
                      }`}
                      onClick={() => setSelectedDesignation(designation)}
                    >
                      <TableCell>{designation.id}</TableCell>
                      <TableCell>{designation.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Edit Area */}
        <div className="w-1/2">
          {selectedDesignation ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit: {selectedDesignation.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Render the edit form from edit.tsx */}
                <EditDesignation designation={selectedDesignation} />
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-muted-foreground mt-10">
              Select a designation to edit
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}