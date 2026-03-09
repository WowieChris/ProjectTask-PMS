import { Head, router } from '@inertiajs/react'
import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import type { BreadcrumbItem } from '@/types'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import CreateDesignation from './create'
import EditDesignation from './edit'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Designation Masterfile', href: '/designations' },
]

interface Designation {
  id: number
  name: string
  description?: string
}

interface Props {
  designations: Designation[]
}

export default function DesignationIndex({ designations }: Props) {
  const [search, setSearch] = useState('')
  const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const filteredDesignations = useMemo(() => {
    return designations.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [designations, search])

  const openEdit = (designation: Designation) => {
    setSelectedDesignation(designation)
    setIsEditOpen(true)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Designation Masterfile" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

        <Card>

          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Designation Masterfile</CardTitle>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Designation</Button>
              </DialogTrigger>

              <DialogContent>
                <CreateDesignation />
              </DialogContent>
            </Dialog>

          </CardHeader>

          <CardContent>

            <div className="mb-4">
              <Input
                placeholder="Search designation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {filteredDesignations.map((designation) => (

                  <TableRow
                    key={designation.id}
                    className="cursor-pointer hover:bg-muted/30"
                    onClick={() => openEdit(designation)}
                  >

                    <TableCell>{designation.id}</TableCell>

                    <TableCell>{designation.name}</TableCell>

                    <TableCell>
                      {designation.description ?? '-'}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          openEdit(designation)
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </CardContent>

        </Card>

      </div>

      {/* Edit Slide-in */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent>

          <SheetHeader>
            <SheetTitle>Edit Designation</SheetTitle>
          </SheetHeader>

          {selectedDesignation && (
            <EditDesignation designation={selectedDesignation} />
          )}

        </SheetContent>
      </Sheet>

    </AppLayout>
  )
}