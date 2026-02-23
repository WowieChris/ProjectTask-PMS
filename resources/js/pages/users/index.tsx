import { Head, Link, router } from '@inertiajs/react';
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
        title: 'User Maintenance',
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

    const handleDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    router.delete(`/users/${id}`);
  }
};

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        
                        <div className="flex items-right justify-between">
                            <div className="flex items-center">
                            <CardTitle>User Maintenance</CardTitle>
                            </div>
                            <div className="flex gap-2 mr-10">
                            <Button asChild
                                variant="destructive"
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => handleDelete(user.id)}
                            >
                                <Link href='#' >Delete</Link>
                                                 
                            </Button>
                            <Button asChild>
                                <Link href="/users/create">Add User</Link>
                            </Button>
                            </div>
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
                                        <TableCell className="flex gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                                </Button>


                                            </TableCell>
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