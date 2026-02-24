import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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


  const filteredUsers = users;

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
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.visit(`/users/${user.id}/edit`)}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => handleSelectUser(user.id, checked === true)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
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