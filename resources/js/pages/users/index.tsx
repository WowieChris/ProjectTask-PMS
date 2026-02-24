import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
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
  name: string;
  email: string;
  role: string;
  designation: string | null;
}

interface Props {
  users: User[];
}

export default function UsersIndex({ users }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filterText] = useState('');
  const [filterRole] = useState('all');
  const [editingCells, setEditingCells] = useState<Set<string>>(new Set());
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [usersList, setUsersList] = useState(users);


  const filteredUsers = usersList.filter((u) => {
    const matchesText =
      u.name.toLowerCase().includes(filterText.toLowerCase());

    const matchesRole =
      filterRole === 'all' || u.role === filterRole;

    return matchesText && matchesRole;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((u) => u.id)); // select only filtered rows
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) setSelectedUsers((prev) => [...prev, userId]);
    else setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  const startEditing = (userId: number, field: string, value: string) => {
    const cellKey = `${userId}-${field}`;
    setEditingCells((prev) => new Set(prev).add(cellKey));
    setEditValues((prev) => ({ ...prev, [cellKey]: value }));
  };

  const cancelEditing = (userId: number, field: string) => {
    const cellKey = `${userId}-${field}`;
    setEditingCells((prev) => {
      const newSet = new Set(prev);
      newSet.delete(cellKey);
      return newSet;
    });
    setEditValues((prev) => {
      const newValues = { ...prev };
      delete newValues[cellKey];
      return newValues;
    });
  };

  const saveEdit = async (userId: number, field: string, value: string) => {
    try {
      const response = await fetch(`/users/${userId}/inline-update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        },
        body: JSON.stringify({ field, value }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsersList((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, [field]: value } : u))
        );
        cancelEditing(userId, field);
      }
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const isAllSelected = filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length;
  const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length;
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
            <div className="mb-3 flex items-center gap-2">

                {/* SEARCH INPUT */}
                {/* <Input
                    placeholder="Search name..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="h-9 w-[220px]"
                /> */}

                {/* ROLE FILTER */}
                {/* <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-[150px] h-9">
                    <SelectValue placeholder="Filter role" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                </Select> */}

                {/* FILTER BUTTON */}
                {/* <Button variant="outline">
                    Filter
                </Button> */}

                </div>

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
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map((user) => {
                  const employeeIdKey = `${user.id}-id`;
                  const designationKey = `${user.id}-designation`;
                  const isEditingEmployeeId = editingCells.has(employeeIdKey);
                  const isEditingDesignation = editingCells.has(designationKey);

                  return (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={(checked) => handleSelectUser(user.id, checked === true)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                        <TableCell onClick={() => router.visit(`/users/${user.id}/edit`)}>
                        {user.id}
                      </TableCell>
                      <TableCell onClick={() => router.visit(`/users/${user.id}/edit`)}>
                        {user.name}
                      </TableCell>
                      <TableCell onClick={() => router.visit(`/users/${user.id}/edit`)}>
                        {user.email}
                      </TableCell>
                      <TableCell onClick={() => router.visit(`/users/${user.id}/edit`)}>
                        {user.designation}
                      </TableCell>
                      <TableCell onClick={() => router.visit(`/users/${user.id}/edit`)}>
                        {user.role}
                      </TableCell>
                    </TableRow>
                  );
                })}

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