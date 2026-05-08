import { Head } from '@inertiajs/react'
import { useMemo, useState } from 'react'

import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'

import type { BreadcrumbItem } from '@/types'

import {
    Users,
    UserCheck,
    UserMinus,
    Search,
    Plus,
    Download,
    Filter,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Employee Management', href: '/employee' },
]

interface Employee {
    id: number
    employee_id: string
    name: string
    last_name?: string
    email: string
    employment_status: string

    designation?: {
        id: number
        name: string
    }

    branch?: {
        id: number
        name: string
    }

    department?: {
        id: number
        name: string
    }

    photo?: {
        path: string
    }
}

interface Props {
    employees: Employee[]
}

export default function EmployeeIndex({
    employees,
}: Props) {



    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {

            const matchesSearch =
                employee.name.toLowerCase().includes(search.toLowerCase()) ||

                employee.employee_id
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                employee.designation?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

            const matchesStatus =
                status === 'all' ||
                employee.employment_status === status

            return matchesSearch && matchesStatus
        })
    }, [employees, search, status])

    const stats = useMemo(() => ({
        total: employees.length,
        active: employees.filter(e => e.employment_status === 'active').length,
        inactive: employees.filter(e => e.employment_status === 'inactive').length,
        separated: employees.filter(e => e.employment_status === 'separated').length,
    }), [employees])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Management" />

            <div className="flex flex-col gap-6 p-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Employee Management
                        </h1>

                        <p className="text-muted-foreground">
                            Manage employee records, profiles, assignments, and employment information.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>

                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Employee
                        </Button>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-indigo-800 text-white hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-indigo-100">
                                    Total Employees
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
                                    Active Employees
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
                                    Inactive Employees
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {stats.inactive}
                                </h2>
                            </div>

                            <Users className="w-10 h-10 text-slate-300" />
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

                            <UserMinus className="w-10 h-10 text-red-200" />
                        </CardContent>
                    </Card>
                </div>

                {/* TABLE */}
                <Card className="border border-border/50 shadow-sm">

                    <CardContent className="p-6">

                        {/* TOOLBAR */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

                            <div className="flex flex-wrap items-center gap-3">

                                <div className="relative">



                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                                    <Input
                                        placeholder="Search employee..."
                                        className="pl-10 w-[280px]"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                <Select
                                    value={status}
                                    onValueChange={setStatus}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <Filter className="w-4 h-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>

                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>

                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>

                                        <SelectItem value="separated">
                                            Separated
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="text-sm text-muted-foreground">
                                Showing {filteredEmployees.length} employees
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="rounded-xl border overflow-hidden">

                            <Table>

                                <TableHeader className="bg-muted/40">
                                    <TableRow>
                                        <TableHead>Employee ID</TableHead>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Designation</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Branch</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>

                                    {filteredEmployees.map((employee) => (

                                        <TableRow
                                            key={employee.id}
                                            className="hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                                        >

                                            <TableCell className="font-medium">
                                                {employee.employee_id}
                                            </TableCell>

                                            <TableCell>

                                                <div className="flex items-center gap-3">

                                                    <div className="relative">

                                                        {employee.photo?.path ? (

                                                            <img
                                                                src={`/storage/${employee.photo.path}`}
                                                                alt={employee.name}
                                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shadow-lg"
                                                            />

                                                        ) : (

                                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                                                                {employee.name.charAt(0)}
                                                            </div>

                                                        )}

                                                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background bg-emerald-500"></span>
                                                    </div>

                                                    <div>
                                                        <p className="font-medium">
                                                            {employee.name} {employee.last_name}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            Employee Profile
                                                        </p>
                                                    </div>
                                                </div>

                                            </TableCell>

                                            <TableCell>
                                                {employee.designation?.name ?? 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {employee.department?.name ?? 'N/A'}
                                            </TableCell>

                                            <TableCell>
                                                {employee.branch?.name ?? 'N/A'}
                                            </TableCell>

                                            <TableCell>
                                                {employee.email ?? 'N/A'}
                                            </TableCell>

                                            <TableCell>

                                                <Badge
                                                    className={
                                                        employee.employment_status === 'active'
                                                            ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20'
                                                            : employee.employment_status === 'separated'
                                                                ? 'bg-red-500/15 text-red-500 border border-red-500/20'
                                                                : 'bg-slate-500/15 text-slate-400 border border-slate-500/20'
                                                    }
                                                >
                                                    {employee.employment_status}
                                                </Badge>

                                            </TableCell>

                                        </TableRow>
                                    ))}

                                </TableBody>

                            </Table>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}