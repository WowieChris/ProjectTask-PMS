import { Head, Link, router } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'User Maintenance', href: '/users' },
];

interface User {
  id: number;
  employee_id:string;
  name: string;
  email: string;
  role: string;
  designation: string | null;
}

interface Props {
  users: User[];
}

type AnyFilter = 'all' | string;

export default function UsersIndex({ users }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // LIVE FILTER STATE
  const [filterText, setFilterText] = useState<string>('');
  const [filterRole, setFilterRole] = useState<AnyFilter>('all');
  const [filterDesignation, setFilterDesignation] = useState<AnyFilter>('all');

  // Dynamic dropdown options
  const roleOptions = useMemo(() => {
    return Array.from(new Set(users.map((u) => u.role))).sort();
  }, [users]);

  const designationOptions = useMemo(() => {
    return Array.from(new Set(users.map((u) => u.designation).filter(Boolean) as string[])).sort();
  }, [users]);

  // LIVE FILTERING
  const filteredUsers = useMemo(() => {
    const text = filterText.trim().toLowerCase();

    return users.filter((u) => {
      const matchesText =
        text === '' ||
        String(u.id).includes(text) ||
        u.employee_id.toLowerCase().includes(text) ||
        u.name.toLowerCase().includes(text) ||
        u.email.toLowerCase().includes(text) ||
        (u.designation ?? '').toLowerCase().includes(text) ||
        u.role.toLowerCase().includes(text);

      const matchesRole =
        filterRole === 'all' || u.role.toLowerCase() === filterRole.toLowerCase();

      const matchesDesignation =
        filterDesignation === 'all' ||
        (u.designation ?? '').toLowerCase() === filterDesignation.toLowerCase();

      return matchesText && matchesRole && matchesDesignation;
    });
  }, [users, filterText, filterRole, filterDesignation]);

  // Selection logic that respects filtered rows
  const filteredIds = useMemo(() => filteredUsers.map((u) => u.id), [filteredUsers]); 

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => Array.from(new Set([...prev, ...filteredIds])));
    } else {
      setSelectedUsers((prev) => prev.filter((id) => !filteredIds.includes(id)));
    }
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) setSelectedUsers((prev) => Array.from(new Set([...prev, userId])));
    else setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  const isAllSelected =
    filteredUsers.length > 0 && filteredIds.every((id) => selectedUsers.includes(id));

  const isIndeterminate =
    filteredUsers.length > 0 &&
    filteredIds.some((id) => selectedUsers.includes(id)) &&
    !isAllSelected;

  const handleClear = () => {
    setFilterText('');
    setFilterRole('all');
    setFilterDesignation('all');
    setSelectedUsers([]); 
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Maintenance</CardTitle>

              <div className="flex gap-2 mr-10">
                <Button
                  variant="destructive"
                  className="bg-red-500 text-white hover:bg-red-600"
                  disabled={selectedUsers.length === 0}
                  onClick={() => {
                    if (!confirm(`Delete ${selectedUsers.length} selected user(s)?`)) return;

                    router.delete('/users/bulk-delete', {
                      data: { ids: selectedUsers },
                      preserveScroll: true,
                      onSuccess: () => setSelectedUsers([]),
                    });
                  }}
                >
                  Delete
                </Button>

                <Button asChild>
                  <Link href="/users/create">Add User</Link>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* FILTER BAR (LIVE) */}
            <div className="mb-3 flex items-center gap-2">
              <Input
                placeholder="Search ID, name, email, designation..."
                value={filterText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                className="h-9 w-[260px]"
              />

              {/* ROLE FILTER */}
              <Select value={filterRole} onValueChange={(v) => setFilterRole(v)}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Filter role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roleOptions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* DESIGNATION FILTER (optional) */}
              <Select value={filterDesignation} onValueChange={(v) => setFilterDesignation(v)}>
                <SelectTrigger className="w-[190px] h-9">
                  <SelectValue placeholder="Filter designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Designations</SelectItem>
                  {designationOptions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="ghost" onClick={handleClear}>
                Clear
              </Button>

              <div className="ml-auto text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length}
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      className="border-gray-500 dark:border-gray-400"
                      checked={isAllSelected ? true : isIndeterminate ? 'indeterminate' : false}
                      onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    />
                  </TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.visit(`/users/${user.id}/edit`)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                      className="border-gray-500 dark:border-gray-400"
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => handleSelectUser(user.id, checked === true)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>{user.employee_id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.designation}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}

                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}