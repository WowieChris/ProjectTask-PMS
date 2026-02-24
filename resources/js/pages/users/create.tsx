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
        title: 'Users Maintenance',
        href: '/users',
    },
    {
        title: 'Create',
        href: '/users/create',
    },
];

export default function UsersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
        designation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="w-1/2 mx-auto">
                    <CardHeader>
                        <CardTitle>Create User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4" name="formCreateUser">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    className="w-1/2"
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    className="w-1/2"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    className="w-1/2"
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <p className="text-red-500">{errors.password}</p>}
                            </div>
                            <div>
                                <Label htmlFor="role">Role</Label>
                                  <Input type="hidden" name="role" value={data.role} />
                                 <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                    <SelectTrigger id="role" aria-labelledby="role-label" className="w-1/3">
                                    <SelectValue placeholder="Select role" />
                                    </SelectTrigger>

                                    <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-red-500">{errors.role}</p>}
                            </div>
                            <div>
                                    <Label htmlFor="designation">Designation</Label>
                                    <Input type="hidden" name="designation" value={data.designation || ''} />
                                    <Select value={data.designation} onValueChange={(value) => setData('designation', value)}>
                                    <SelectTrigger id="designation" aria-labelledby="designation-label" className="w-1/2">
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
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    Create
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/users">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}