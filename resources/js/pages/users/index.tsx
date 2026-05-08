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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import type { BreadcrumbItem } from '@/types'
import type { User } from "@/types/user"
import UsersCreate from './create'
import EditUserCard from './edit'
import {
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  Search,
} from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'User Maintenance', href: '/users' },
]

interface Designation {
  id: number
  name: string
}

interface Props {
  users: User[]
  designations: Designation[]
}

type AnyFilter = 'all' | string

export default function UsersIndex({ users, designations }: Props) {

  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [filterText, setFilterText] = useState('')
  const [filterRole, setFilterRole] = useState<AnyFilter>('all')
  const [filterDesignation, setFilterDesignation] = useState<AnyFilter>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)

  const designationMap = useMemo(() => {
    return Object.fromEntries(designations.map(d => [String(d.id), d.name]))
  }, [designations])

  // ── Stats ──
  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.employment_status === 'active').length,
    inactive: users.filter(u => u.employment_status === 'inactive').length,
    separated: users.filter(u => u.employment_status === 'separated').length,
  }), [users])

  const roleOptions = useMemo(() => {
    return Array.from(new Set(users.map(u => u.role))).sort()
  }, [users])

  const designationOptions = useMemo(() => {
    return Array.from(
      new Set(users.map(u => u.designation_id).filter(Boolean))
    ).sort() as string[]
  }, [users])

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
        filterRole === 'all' || u.role.toLowerCase() === filterRole.toLowerCase()
      const matchesDesignation =
        filterDesignation === 'all' ||
        (u.designation_id ?? '').toLowerCase() === filterDesignation.toLowerCase()
      return matchesText && matchesRole && matchesDesignation
    })
  }, [users, filterText, filterRole, filterDesignation])

  const filteredIds = useMemo(() => filteredUsers.map(u => u.id), [filteredUsers])

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
    selectableIds.length > 0 && selectableIds.every(id => selectedUsers.includes(id))

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
    return filteredUsers.slice(start, start + rowsPerPage)
  }, [filteredUsers, page, rowsPerPage])

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      <div className="flex flex-col gap-6 p-6">

        {/* ── STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-indigo-800 text-white hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-100">
                  Total Users
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {stats.total}
                </h2>
              </div>

              <Users className="w-10 h-10 text-indigo-200" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-600 to-emerald-800 text-white hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-100">
                  Active Users
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {stats.active}
                </h2>
              </div>

              <UserCheck className="w-10 h-10 text-emerald-200" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-700 to-slate-900 text-white hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-200">
                  Inactive Users
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {stats.inactive}
                </h2>
              </div>

              <ShieldCheck className="w-10 h-10 text-slate-300" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-600 to-red-800 text-white hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-red-100">
                  Separated
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {stats.separated}
                </h2>
              </div>

              <UserX className="w-10 h-10 text-red-200" />
            </CardContent>
          </Card>

        </div>

        {/* ── MAIN TABLE CARD ── */}
        <Card className="border border-border/50 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  User Management
                </h1>

                <p className="text-muted-foreground">
                  Manage employees, permissions, roles, and access controls.
                </p>
              </div>
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
                    <Button className="shadow-lg">Add User</Button>
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
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">

                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    placeholder="Search users..."
                    className="pl-10 w-[280px] h-11 rounded-xl"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>

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

                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">
                    Showing {paginatedUsers.length} of {filteredUsers.length}
                  </span>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow className="hover:bg-primary/5 transition-all duration-200">
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
                      className="hover:bg-primary/5 transition-all duration-200 cursor-pointer"
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
                              className="w-10 h-10 rounded-full ring-2 ring-primary/20 object-cover"
                            />

                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                              {user.name[0]}
                            </div>
                          )}
                          {user.name} {user.last_name}
                        </div>
                      </TableCell>

                      <TableCell>{user.email}</TableCell>
                      <TableCell>{designationMap[String(user.designation_id)] ?? user.designation_id}</TableCell>
                      <TableCell>{user.location}</TableCell>

                      <TableCell>
                        <Badge
                          className={
                            user.employment_status === 'active'
                              ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20'
                              : user.employment_status === 'separated'
                                ? 'bg-red-500/15 text-red-500 border border-red-500/20'
                                : 'bg-slate-500/15 text-slate-400 border border-slate-500/20'
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
            </div>

            {/* PAGINATION */}
            <div className="flex justify-end items-center gap-2 mt-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm">Page {page} of {totalPages}</span>
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