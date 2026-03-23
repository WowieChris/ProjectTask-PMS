import { Head, router } from '@inertiajs/react'
import React, { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import type { BreadcrumbItem } from '@/types'
import type { User } from "@/types/user"
import UsersCreate from './create'
import EditUserCard from './edit'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'User Maintenance', href: '/users' },
]

interface Props {
  users: User[]
}

type AnyFilter = 'all' | string

export default function UsersIndex({ users }: Props) {

  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [filterText, setFilterText] = useState('')
  const [filterRole, setFilterRole] = useState<AnyFilter>('all')
  const [filterDesignation, setFilterDesignation] = useState<AnyFilter>('all')

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)

  /* ---------------- ROLE OPTIONS ---------------- */

  const roleOptions = useMemo(() => {
    return Array.from(new Set(users.map(u => u.role))).sort()
  }, [users])

  const designationOptions = useMemo(() => {
    return Array.from(
      new Set(
        users
          .map(u => u.designation_id)
          .filter(Boolean)
      )
    ).sort() as string[]
  }, [users])

  /* ---------------- FILTER USERS ---------------- */

  const filteredUsers = useMemo(() => {


    const text = filterText.toLowerCase().trim()

    return users.filter((u) => {

      const matchesText =
        !text ||
        u.employee_id.toLowerCase().includes(text) ||
        u.name.toLowerCase().includes(text) ||
        (u.last_name ?? '').toLowerCase().includes(text) ||
        (u.email ?? '').toLowerCase().includes(text) ||
        (u.designation_id ?? '').toLowerCase().includes(text) ||
        (u.location ?? '').toLowerCase().includes(text) ||
        (u.district ?? '').toLowerCase().includes(text) ||
        (u.role ?? '').toLowerCase().includes(text)

      const matchesRole =
        filterRole === 'all' ||
        u.role.toLowerCase() === filterRole.toLowerCase()

      const matchesDesignation =
        filterDesignation === 'all' ||
        (u.designation_id ?? '').toLowerCase() === filterDesignation.toLowerCase()

      return matchesText && matchesRole && matchesDesignation

    })


  }, [users, filterText, filterRole, filterDesignation])

  /* ---------------- SELECT LOGIC ---------------- */

  const filteredIds = useMemo(
    () => filteredUsers.map(u => u.id),
    [filteredUsers]
  )

  // const handleSelectAll = (checked: boolean) => {
  //   if (checked) {
  //     setSelectedUsers(prev =>
  //       Array.from(new Set([...prev, ...filteredIds]))
  //     )
  //   } else {
  //     setSelectedUsers(prev =>
  //       prev.filter(id => !filteredIds.includes(id))
  //     )
  //   }
  // }

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId])
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId))
    }
  }

  const selectableIds = useMemo(
  () => filteredUsers.filter(u => u.employment_status === 'inactive').map(u => u.id),
  [filteredUsers]
)
const handleSelectAll = (checked: boolean) => {
  if (checked) {
    setSelectedUsers(prev => Array.from(new Set([...prev, ...selectableIds])))
  } else {
    setSelectedUsers(prev => prev.filter(id => !selectableIds.includes(id)))
  }
}

const isAllSelected =
  selectableIds.length > 0 &&
  selectableIds.every(id => selectedUsers.includes(id))

const isIndeterminate =
  selectableIds.length > 0 &&
  selectableIds.some(id => selectedUsers.includes(id)) &&
  !isAllSelected


  const handleClear = () => {
    setFilterText('')
    setFilterRole('all')
    setFilterDesignation('all')
    setSelectedUsers([])
  }
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage)
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredUsers.slice(start, end)
  }, [filteredUsers, page, rowsPerPage])

  return (<AppLayout breadcrumbs={breadcrumbs}> <Head title="Users" />


    <div className="flex flex-col gap-4 p-4">

      <Card>

        <CardHeader>

          <div className="flex items-center justify-between">

            <CardTitle>User Maintenance</CardTitle>

            <div className="flex gap-2">

              <Button
                variant="destructive"
                hidden={selectedUsers.length === 0}
                onClick={() => {

                  if (!confirm(`Delete ${selectedUsers.length} users?`)) return

                  router.delete('/users/bulk-delete', {
                    data: { ids: selectedUsers },
                    preserveScroll: true,
                    onSuccess: () => setSelectedUsers([])
                  })

                }}
              >
                Delete
              </Button>

              <Dialog open={openCreate} onOpenChange={setOpenCreate}>

                <DialogTrigger asChild>
                  <Button>Add User</Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl p-0">
                  <UsersCreate onSuccess={() => setOpenCreate(false)} />
                </DialogContent>

              </Dialog>

            </div>

          </div>

        </CardHeader>

        <CardContent>

          {/* FILTERS */}

          <div className="flex gap-2 mb-3">

            <Input
              placeholder="Search users..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-[260px]"
            />

            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roleOptions.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterDesignation} onValueChange={setFilterDesignation}>
              <SelectTrigger className="w-[190px]">
                <SelectValue placeholder="Designation" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Designations</SelectItem>
                {designationOptions.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="ghost" onClick={handleClear}>Clear</Button>

            <div className="flex items-center gap-2">

              <span className="text-sm">Rows per page:</span>

              <Select
                value={String(rowsPerPage)}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value))
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>

              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {paginatedUsers.length} of {filteredUsers.length}
              </div>
            </div>
          </div>
          {/* TABLE */}



          <Table>

            <TableHeader>

              <TableRow>

                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={isAllSelected ? true : isIndeterminate ? 'indeterminate' : false}
                    onCheckedChange={(checked) => handleSelectAll(checked === true)}
                  />
                </TableHead>

                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {paginatedUsers.map(user => (

                <TableRow
                  key={user.id}
                  className="cursor-pointer hover:bg-muted/30"
                  onClick={() => {
                    setSelectedUser(user)
                    setOpenEdit(true)
                  }}
                >

                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      disabled={user.employment_status !== 'inactive'}
                      onCheckedChange={(checked) =>
                        handleSelectUser(user.id, checked === true)
                      }
                    />
                  </TableCell>

                  <TableCell>{user.employee_id}</TableCell>

                  <TableCell>

                    <div className="flex items-center gap-2">

                      {user.photo?.path ? (
                        <img
                          src={`/storage/${user.photo.path}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                          {user.name[0]}
                        </div>
                      )}

                      {user.name} {user.last_name}

                    </div>

                  </TableCell>

                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.designation_id}</TableCell>
                  <TableCell>{user.location}</TableCell>

                  <TableCell>

                    <Badge
                      variant={
                        user.employment_status === 'active'
                          ? 'default'
                          : user.employment_status === 'terminated'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {user.employment_status}
                    </Badge>

                  </TableCell>

                  <TableCell>{user.role}</TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>
          <div className="flex justify-end items-center gap-2 mt-4">

            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>

          </div>
          {/* EDIT PANEL */}

          <Sheet open={openEdit} onOpenChange={setOpenEdit}>

            <SheetContent side="right" className="w-[600px]">

              {selectedUser && (
                <EditUserCard user={selectedUser} onSuccess={() => setOpenEdit(false)} />
              )}

            </SheetContent>

          </Sheet>

        </CardContent>

      </Card>

    </div>

  </AppLayout>


  )
}
