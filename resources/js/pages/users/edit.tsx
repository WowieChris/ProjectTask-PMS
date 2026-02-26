import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'User Maintenance', href: '/users' },
  // (optional) better breadcrumb URL:
  // { title: 'Edit', href: `/users/${user.id}/edit` },
  { title: 'Edit', href: '/users/edit' },
];

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  designation?: string;
  employee_id?: string;
}

interface Props {
  user: User;
}

export default function UsersEdit({ user }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name ?? '',
    email: user.email ?? '',
    role: user.role ?? 'user',
    designation: user.designation ?? '',
    employee_id: user.employee_id ?? '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const changed =
      data.name !== (user.name ?? '') ||
      data.email !== (user.email ?? '') ||
      data.role !== (user.role ?? '') ||
      data.designation !== (user.designation ?? '') ||
      data.employee_id !== (user.employee_id ?? '');

    if (changed && !window.confirm('Save the changes to this user?')) return;

    put(`/users/${user.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit User" />

      <div className="flex h-full flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Card className="mx-auto w-1/2">
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="flex w-full flex-row gap-6">
              {/* LEFT COLUMN */}
              <div className="flex w-full flex-col gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                    <Label htmlFor="role">Role</Label>

                    <Select
                        value={data.role}
                        onValueChange={(value) => setData('role', value)}
                    >
                        <SelectTrigger id="role" className="w-full">
                        <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* ✅ Hidden input so browser sees name */}
                    <input type="hidden" name="role" value={data.role} />

                    {errors.role && (
                        <p className="mt-1 text-sm text-red-500">{errors.role}</p>
                    )}
                    </div>

                <div className="mt-6 flex gap-2">
                  <Button type="submit" disabled={processing}>
                    Update
                  </Button>

                  <Button variant="outline" asChild>
                    <Link href="/users">Cancel</Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex w-full flex-col gap-4">
                <div>
                  <Label htmlFor="employee_id">ID Number</Label>
                  <Input
                    id="employee_id"
                    name="employee_id"
                    type="text"
                    autoComplete="off"
                    value={data.employee_id}
                    onChange={(e) => setData('employee_id', e.target.value)}
                  />
                  {errors.employee_id && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.employee_id}
                    </p>
                  )}
                </div>

                <div>
                    <Label htmlFor="designation">Designation</Label>

                    <Select
                        value={data.designation}
                        onValueChange={(value) => setData('designation', value)}
                    >
                        <SelectTrigger id="designation" className="w-full">
                        <SelectValue placeholder="Select designation" />
                        </SelectTrigger>

                        <SelectContent>
                        <SelectItem value="Technical Support Engineer">
                            Technical Support Engineer
                        </SelectItem>
                        <SelectItem value="Field Engineer">Field Engineer</SelectItem>
                        <SelectItem value="System Operator">System Operator</SelectItem>
                        <SelectItem value="Infrastructure Engineer">
                            Infrastructure Engineer
                        </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* ✅ Hidden input so browser sees name */}
                    <input type="hidden" name="designation" value={data.designation} />

                    {errors.designation && (
                        <p className="mt-1 text-sm text-red-500">{errors.designation}</p>
                    )}
                    </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}