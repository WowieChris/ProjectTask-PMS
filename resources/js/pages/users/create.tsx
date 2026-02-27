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
        employee_id: '',
        location: '',
        district: '',
        date_employed: new Date().toISOString().split('T')[0],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="w-2/3 mx-auto">
                    <CardHeader>
                        <CardTitle>Create User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4 flex flex-row gap-6" name="formCreateUser">
                            <div className="flex w-full flex-col gap-2">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder='Full Name'
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
                                        placeholder="Email Address"
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
                                        id="password"
                                        placeholder="Enter Password"
                                        name="password"
                                        autoComplete="new-password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                                </div>
                                   <div className="flex gap-2 mt-10">
                                    <Button type="submit" disabled={processing}>
                                        Create
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/users">Cancel</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <div>
                                    <Label htmlFor="employee_id">ID Number</Label>
                                    <Input
                                        id="employee_id"
                                        placeholder="Employee Number"
                                        name="employee_id"
                                        autoComplete="employee_id"
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        required
                                    />
                                    {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
                                </div>    
                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Input type="hidden" name="role" value={data.role} required />
                                    <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                        <SelectTrigger id="role" aria-labelledby="role-label" className="w-full">
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
                                        <Input type="hidden" name="designation" value={data.designation || ''} required />
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
                            <div className="flex w-full flex-col gap-2">
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input type="hidden" name="location" value={data.location} required />
                                    <Select value={data.location} onValueChange={(value) => setData('location', value)}>
                                        <SelectTrigger id="location" aria-labelledby="location-label" className="w-full">
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="central office">Central Office</SelectItem>
                                            <SelectItem value="division 1">Division 1</SelectItem>
                                            <SelectItem value="division 2">Division 2</SelectItem>
                                            <SelectItem value="division 3">Division 3</SelectItem>
                                            <SelectItem value="division 4">Division 4</SelectItem>
                                            <SelectItem value="division 5">Division 5</SelectItem>
                                            <SelectItem value="division 6">Division 6</SelectItem>
                                            <SelectItem value="division 7">Division 7</SelectItem>
                                            <SelectItem value="division 8">Division 8</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.location && <p className="text-red-500">{errors.location}</p>}
                                </div>
                                {data.location && data.location !== 'central office' && (
                                    <div>
                                        <Label htmlFor="district">District</Label>
                                        <Input
                                            id="district"
                                            placeholder="District"
                                            name="district"
                                            autoComplete="district"
                                            type="text"
                                            value={data.district}
                                            onChange={(e) => setData('district', e.target.value)}
                                        />
                                        {errors.district && <p className="text-red-500">{errors.district}</p>}
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="date_employed">Date Employed</Label>
                                    <Input 
                                    name="date_employed"
                                    id="date_employed" 
                                    type="date" value={data.date_employed} onChange={(e) => setData('date_employed', e.target.value)} 
                                    className='w-3/5' 
                                    />
                                        {errors.date_employed && <p className="text-red-500">{errors.date_employed}</p>}
                                </div>
                            </div>   
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}