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
    last_name?: string;
    email: string;
    role: string;
    designation?: string;
    employee_id?: string;
    location?: string;
    district?: string;
    employment_status?: string;
    date_employed?: string;
}

interface Props {
    user: User;
}

export default function EditUserCard({ user }: Props) {
    const isInitiallyActive = user.employment_status === 'active';
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        last_name: user.last_name || '',
        email: user.email,
        role: user.role,
        designation: user.designation || '',
        employee_id: user.employee_id || '',
        location: user.location || '',
        district: user.district || '',
        employment_status: user.employment_status || 'active',
        date_employed: user.date_employed || '',
    });

    // const submit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     put(`/users/${user.id}`);
    // };

    const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const changed =
        data.name !== user.name ||
        data.last_name !== (user.last_name || '') ||
        data.email !== user.email ||
        data.role !== user.role ||
        data.designation !== (user.designation || '') ||
        data.employee_id !== (user.employee_id || '') ||
        data.location !== (user.location || '') ||
        data.district !== (user.district || '') ||
        data.employment_status !== (user.employment_status || 'active') ||
        data.date_employed !== (user.date_employed || '');

    if (changed && !window.confirm('Save the changes to this user?')) {
        return;
    }

    put(`/users/${user.id}`);
};

    return (
        // <AppLayout breadcrumbs={breadcrumbs}>
        //     <Head title="Edit User" />
        //     <div className="flex h-full flex flex-col gap-4 overflow-x-auto rounded-xl p-4">
        //         <Card className="w-2/3 mx-auto">
        //             <CardHeader>
        //                 <CardTitle>Edit User</CardTitle>
        //             </CardHeader>
        //             <CardContent>
        //                 <form onSubmit={submit} className="space-y-4 gap-2">
        //                 <div className="flex w-full flex-col gap-2"> 
        //                     <div>
        //                         <Label htmlFor="name">Name</Label>
        //                             <div className='flex flex-row gap-4'>
        //                             <Input
        //                                 id="name"
        //                                 value={data.name}
        //                                 onChange={(e) => setData('name', e.target.value)}
        //                                 disabled={!isInitiallyActive}
        //                                 required
        //                             />
        //                             {errors.name && <p className="text-red-500">{errors.name}</p>}
        //                             <Input 
        //                                 id="last_name"
        //                                 placeholder="Last Name"
        //                                 value={data.last_name}
        //                                 onChange={(e) => setData('last_name', e.target.value)}
        //                                 disabled={!isInitiallyActive}
        //                                 required
        //                             />
        //                             {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
        //                         </div>
        //                     </div>
        //                     <div>
        //                         <Label htmlFor="email">Email</Label>
        //                         <Input
        //                             id="email"
        //                             type="email"
        //                             value={data.email}
        //                             onChange={(e) => setData('email', e.target.value)}
        //                             disabled={!isInitiallyActive}
        //                             required
        //                         />
        //                         {errors.email && <p className="text-red-500">{errors.email}</p>}
        //                     </div>
        //                     <div>
        //                         <Label htmlFor="role">Role</Label>
        //                         <Select value={data.role} onValueChange={(value) => setData('role', value)} disabled={!isInitiallyActive}>
        //                             <SelectTrigger>
        //                                 <SelectValue />
        //                             </SelectTrigger>
        //                             <SelectContent>
        //                                 <SelectItem value="user">User</SelectItem>
        //                                 <SelectItem value="admin">Administrator</SelectItem>
        //                             </SelectContent>
        //                         </Select>
        //                         {errors.role && <p className="text-red-500">{errors.role}</p>}
        //                     </div>
                            
        //                     <div className='flex flex-row gap-4'>
        //                         <div className='w-full'>
        //                             <Label htmlFor="id_number">ID Number</Label>
        //                         <Input
        //                                 id="id_number"
        //                                 type="text"
        //                                 value={data.employee_id}
        //                                 onChange={(e) => setData('employee_id', e.target.value)}
        //                                 disabled={!isInitiallyActive}
        //                             />
        //                             {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
        //                         </div>
        //                         <div className='w-full'>
        //                             <Label htmlFor="date_employed">Date Employed</Label>
        //                             <Input 
        //                             name="date_employed"
        //                             id="date_employed" 
        //                             type="date" value={data.date_employed} onChange={(e) => setData('date_employed', e.target.value)} 
        //                             disabled={!isInitiallyActive}
        //                             />
        //                                 {errors.date_employed && <p className="text-red-500">{errors.date_employed}</p>}
        //                         </div>
        //                     </div> 

        //                     <div>
        //                         <Label htmlFor="role">Designation</Label>
        //                                 <Select value={data.designation} onValueChange={(value) => setData('designation', value)} disabled={!isInitiallyActive}>
        //                                 <SelectTrigger id="designation" aria-labelledby="designation-label" className="w-full">
        //                                 <SelectValue placeholder="Select designation" />
        //                                 </SelectTrigger>

        //                                 <SelectContent>
        //                                 <SelectItem value="Technical Support Engineer">Technical Support Engineer</SelectItem>
        //                                 <SelectItem value="Field Engineer">Field Engineer</SelectItem>
        //                                 <SelectItem value="System Operator">System Operator</SelectItem>
        //                                 <SelectItem value="Infrastructure Engineer">Infrastructure Engineer</SelectItem>
        //                                 </SelectContent>
        //                                 </Select>
        //                                 {errors.designation && <p className="text-red-500">{errors.designation}</p>}
        //                     </div>
        //                     <div>
        //                         <Label htmlFor="employment_status">Employment Status</Label>
        //                         <Select value={data.employment_status} onValueChange={(value) => setData('employment_status', value)}>
        //                             <SelectTrigger id="employment_status" aria-labelledby="employment_status-label" className="w-full">
        //                                 <SelectValue placeholder="Select employment status" />
        //                             </SelectTrigger>
        //                             <SelectContent>
        //                                 <SelectItem value="active">Active</SelectItem>
        //                                 <SelectItem value="inactive">Inactive</SelectItem>
        //                                 <SelectItem value="terminated">Terminated</SelectItem>
        //                             </SelectContent>
        //                         </Select>
        //                         {errors.employment_status && <p className="text-red-500">{errors.employment_status}</p>}
        //                     </div>

        //                         <div>
        //                             <Label htmlFor="location">Location</Label>
        //                             <Input type="hidden" name="location" value={data.location} required />
        //                             <Select value={data.location} onValueChange={(value) => setData('location', value)} disabled={!isInitiallyActive}>
        //                                 <SelectTrigger id="location" aria-labelledby="location-label" className="w-full">
        //                                     <SelectValue placeholder="Select location" />
        //                                 </SelectTrigger>
        //                                 <SelectContent>
        //                                     <SelectItem value="central office">Central Office</SelectItem>
        //                                     <SelectItem value="division 1">Division 1</SelectItem>
        //                                     <SelectItem value="division 2">Division 2</SelectItem>
        //                                     <SelectItem value="division 3">Division 3</SelectItem>
        //                                     <SelectItem value="division 4">Division 4</SelectItem>
        //                                     <SelectItem value="division 5">Division 5</SelectItem>
        //                                     <SelectItem value="division 6">Division 6</SelectItem>
        //                                     <SelectItem value="division 7">Division 7</SelectItem>
        //                                     <SelectItem value="division 8">Division 8</SelectItem>
        //                                 </SelectContent>
        //                             </Select>
        //                             {errors.location && <p className="text-red-500">{errors.location}</p>}
        //                         </div>
        //                         {data.location && data.location !== 'central office' && (
        //                             <div>
        //                                 <Label htmlFor="district">District</Label>
        //                                 <Input
        //                                     id="district"
        //                                     placeholder="District"
        //                                     name="district"
        //                                     autoComplete="district"
        //                                     type="text"
        //                                     value={data.district}
        //                                     onChange={(e) => setData('district', e.target.value)}
        //                                     disabled={!isInitiallyActive}
        //                                 />
        //                                 {errors.district && <p className="text-red-500">{errors.district}</p>}
        //                             </div>
        //                         )}
                                
        //                     <div className="flex gap-2 mt-5">
        //                         {isInitiallyActive && (
        //                             data.employment_status === 'terminated' ? (
        //                                 <Button 
        //                                     type="button"
        //                                     variant="destructive"
        //                                     disabled={processing}
        //                                     onClick={() => {
        //                                         if (window.confirm('Are you sure you want to deactivate this user? They will no longer be able to log in.')) {
        //                                             put(`/users/${user.id}`);
        //                                         }
        //                                     }}
        //                                 >
        //                                     Deactivate
        //                                 </Button>
        //                             ) : (
        //                                 <Button type="submit" disabled={processing}>
        //                                     Update
        //                                 </Button>
        //                             )
        //                         )}
        //                         <Button variant="outline" asChild>
        //                             <Link href="/users">Cancel</Link>
        //                         </Button>
        //                     </div>    
        //                 </div>
        //                 </form>
        //             </CardContent>
        //         </Card>
        //     </div>
        // </AppLayout>

        <Card className="py-4 gap-0 h-full">
            <CardHeader className="border-b pb-4">
                <CardTitle>{user?.name}'s Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4 gap-2">
                <div className="flex w-full flex-col gap-2 overflow-x-auto"> 
                    <div>
                        <Label htmlFor="name">Name</Label>
                            <div className='flex flex-row gap-4'>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={!isInitiallyActive}
                                required
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                            <Input 
                                id="last_name"
                                placeholder="Last Name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                disabled={!isInitiallyActive}
                                required
                            />
                            {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={!isInitiallyActive}
                            required
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div className='flex flex-row gap-4'>
                        <div className='w-full'>
                            <Label htmlFor="id_number">ID Number</Label>
                        <Input
                                id="id_number"
                                type="text"
                                value={data.employee_id}
                                onChange={(e) => setData('employee_id', e.target.value)}
                                disabled={!isInitiallyActive}
                            />
                            {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
                        </div>
                        <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)} disabled={!isInitiallyActive}>
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
                        {/* <div className='w-full'>
                            <Label htmlFor="date_employed">Date Employed</Label>
                            <Input 
                            name="date_employed"
                            id="date_employed" 
                            type="date" value={data.date_employed} onChange={(e) => setData('date_employed', e.target.value)} 
                            disabled={!isInitiallyActive}
                            />
                                {errors.date_employed && <p className="text-red-500">{errors.date_employed}</p>}
                        </div> */}
                    </div> 

                    <div>
                        <Label htmlFor="role">Designation</Label>
                                <Select value={data.designation} onValueChange={(value) => setData('designation', value)} disabled={!isInitiallyActive}>
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
                    <div>
                        <Label htmlFor="employment_status">Employment Status</Label>
                        <Select value={data.employment_status} onValueChange={(value) => setData('employment_status', value)}>
                            <SelectTrigger id="employment_status" aria-labelledby="employment_status-label" className="w-full">
                                <SelectValue placeholder="Select employment status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="terminated">Terminated</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.employment_status && <p className="text-red-500">{errors.employment_status}</p>}
                    </div>

                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input type="hidden" name="location" value={data.location} required />
                            <Select value={data.location} onValueChange={(value) => setData('location', value)} disabled={!isInitiallyActive}>
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
                                    disabled={!isInitiallyActive}
                                />
                                {errors.district && <p className="text-red-500">{errors.district}</p>}
                            </div>
                        )}
                        
                    <div className="flex gap-2 mt-5">
                        {isInitiallyActive && (
                            data.employment_status === 'terminated' ? (
                                <Button 
                                    type="button"
                                    variant="destructive"
                                    disabled={processing}
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to deactivate this user? They will no longer be able to log in.')) {
                                            put(`/users/${user.id}`);
                                        }
                                    }}
                                >
                                    Deactivate
                                </Button>
                            ) : (
                                <Button type="submit" disabled={processing}>
                                    Update
                                </Button>
                            )
                        )}
                        <Button variant="outline" asChild>
                            <Link href="/users">Cancel</Link>
                        </Button>
                    </div>    
                </div>
                </form>
            </CardContent>
        </Card>
    );
}