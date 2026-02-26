import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'User Maintenance',
        href: '/users',
    },
    {
        title: 'Edit',
        href: '/users/edit',
    },
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
        name: user.name,
        email: user.email,
        role: user.role,
        designation: user.designation || '',
        employee_id: user.employee_id || '',
    });

    // const submit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     put(`/users/${user.id}`);
    // };

    const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const changed =
        data.name !== user.name ||
        data.email !== user.email ||
        data.role !== user.role;

    if (changed && !window.confirm('Save the changes to this user?')) {
        return;
    }

    put(`/users/${user.id}`);
};

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="flex h-full flex flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="w-1/2 mx-auto">
                    <CardHeader>
                        <CardTitle>Edit User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4 flex flex-row w-full gap-2">
                        <div className="flex w-full flex-col gap-2"> 
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Administrator</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-red-500">{errors.role}</p>}
                            </div>
                            <div className="flex gap-2 mt-10">
                                <Button type="submit" disabled={processing}>
                                    Update
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/users">Cancel</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <div>
                                <Label htmlFor="id_number">ID Number</Label>
                               <Input
                                    id="id_number"
                                    type="text"
                                    value={data.employee_id}
                                    onChange={(e) => setData('employee_id', e.target.value)}
                                />
                                {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
                            </div>             
                            <div>
                                <Label htmlFor="role">Designation</Label>
                                        <Select value={data.designation} onValueChange={(value) => setData('designation', value)}>
                                        <SelectTrigger id="designation" aria-labelledby="designation-label" className="w-full">
                                        <SelectValue placeholder="Select designation" />
                                        </SelectTrigger>

                                        <SelectContent>
                                        <SelectItem value="Technical Support Engineer">Technical Support Engineer</SelectItem>
                                        <SelectItem value="Field Engineer">Field Engineer</SelectItem>
                                        <SelectItem value="System Operator">System Operator</SelectItem>
                                        <SelectItem value="Infrastructure Engineer">Infrastructure Engineer</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        {errors.designation && <p className="text-red-500">{errors.designation}</p>}
                            </div>

                            
                        </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}