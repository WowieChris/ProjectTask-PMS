import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Users',
        href: '/users',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    users: User[];
}

export default function UsersIndex({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Users</CardTitle>
                            <Button asChild>
                                <Link href="/users/create">Add User</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
<<<<<<< Updated upstream
                                        <TableCell>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                            </Button>
                                            <Button variant="outline" size="sm" className="ml-2 bg-red-500 hover:bg-red-300" asChild>
                                                <Link href={`/users/${user.id}/delete`} className="text-white hover:text-red-600" >Delete</Link>
                                            </Button>
                                        </TableCell>
=======
                                        <TableCell className="flex gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="bg-red-300 text-black hover:bg-red-500 hover:text-white"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Link href="#">Delete</Link>
                                                </Button>
                                            </TableCell>
>>>>>>> Stashed changes
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}