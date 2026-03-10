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
// $request->validate([
//     'employee_id' => ['required', 'regex:/^\d{4}-\d{4,5}$/', 'unique:users,employee_id'],
// ]);
export default function UsersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        last_name: '',
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
const handleEmployeeId = (value: string) => {
  const digits = value.replace(/\D/g, '')

  let formatted = digits

  if (digits.length > 4) {
    formatted = digits.slice(0,4) + '-' + digits.slice(4,9)
  }

  setData('employee_id', formatted)
}
    // return (
        // <AppLayout breadcrumbs={breadcrumbs}>
        //     <Head title="Create User" />
        //     <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        //         <Card className="w-2/3 mx-auto">
        //             <CardHeader>
        //                 <CardTitle>Create User</CardTitle>
        //             </CardHeader>
        //             <CardContent>
        //                 <form onSubmit={submit} className="space-y-4" name="formCreateUser">
        //                 <div className='grid grid-cols-2 gap-4'> 

        //                     <div>
        //                             <Label htmlFor="name">Name</Label>
        //                             <div className='flex flex-row gap-4'>
        //                             <Input
        //                                 id="name"
        //                                 name="name"
        //                                 autoComplete="name"
        //                                 placeholder='First Name'
        //                                 value={data.name}
        //                                 onChange={(e) => setData('name', e.target.value)}
        //                                 required
        //                             />
        //                             <Input
        //                             id="last_name"
        //                             name="last_name"
        //                             placeholder="Last Name"
        //                             value={data.last_name}
        //                             onChange={(e) => setData('last_name', e.target.value)}
        //                             required
        //                             />
        //                             {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
        //                             </div>
        //                     </div>

        //                         <div>
        //                             <Label htmlFor="email">Email</Label>
        //                             <Input
        //                                 id="email"
        //                                 placeholder="Email Address"
        //                                 name="email"
        //                                 autoComplete="email"
        //                                 type="email"
        //                                 value={data.email}
        //                                 onChange={(e) => setData('email', e.target.value)}
        //                                 required
        //                             />
        //                             {errors.email && <p className="text-red-500">{errors.email}</p>}
        //                         </div>
                              
        //                             {/* <div>
        //                             <Label htmlFor="password">Password</Label>
        //                             <Input
        //                                 id="password"
        //                                 placeholder="Enter Password"
        //                                 name="password"
        //                                 autoComplete="new-password"
        //                                 type="password"
        //                                 value={data.password}
        //                                 onChange={(e) => setData('password', e.target.value)}
        //                                 required
        //                             />
        //                             {errors.password && <p className="text-red-500">{errors.password}</p>}
        //                         </div> */}
                                                                         
        //                         <div className='flex flex-row gap-4 w-full'>
        //                             <div className='w-full'>
        //                                 <Label htmlFor="employee_id">ID Number</Label>
        //                                 <Input
        //                                     id="employee_id"
        //                                     placeholder="Employee Number"
        //                                     name="employee_id"
        //                                     autoComplete="employee_id"
        //                                     type="text"
        //                                     value={data.employee_id}
        //                                     onChange={(e) => setData('employee_id', e.target.value)}
        //                                     required
        //                                 />
        //                                 {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
        //                             </div>    
        //                             {/* <div>
        //                                 <Label htmlFor="date_employed">Date Employed</Label>
        //                                 <Input 
        //                                 name="date_employed"
        //                                 id="date_employed" 
        //                                 type="date" value={data.date_employed} onChange={(e) => setData('date_employed', e.target.value)} 
        //                                 />
        //                                     {errors.date_employed && <p className="text-red-500">{errors.date_employed}</p>}
        //                             </div> */}
        //                             <div className='w-full'>
        //                             <Label htmlFor="role">Role</Label>
        //                             <Input type="hidden" name="role" value={data.role} required />
        //                             <Select value={data.role} onValueChange={(value) => setData('role', value)}>
        //                                 <SelectTrigger id="role" aria-labelledby="role-label" className="w-full">
        //                                 <SelectValue placeholder="Select role" />
        //                                 </SelectTrigger>
        //                                 <SelectContent>
        //                                 <SelectItem value="user">User</SelectItem>
        //                                 <SelectItem value="admin">Administrator</SelectItem>
        //                                 </SelectContent>
        //                             </Select>
        //                             {errors.role && <p className="text-red-500">{errors.role}</p>}
                                    
        //                         </div>
        //                         </div>
                                
        //                         <div>
        //                                 <Label htmlFor="designation">Designation</Label>
        //                                 <Input type="hidden" name="designation" value={data.designation || ''} required />
        //                                 <Select value={data.designation} onValueChange={(value) => setData('designation', value)}>
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
        //                         </div>
                                
                            
        //                         {/* <div>
        //                             <Label htmlFor="location">Location</Label>
        //                             <Input type="hidden" name="location" value={data.location} required />
        //                             <Select value={data.location} onValueChange={(value) => setData('location', value)}>
        //                                 <SelectTrigger id="location" aria-labelledby="location-label" className="w-full">
        //                                     <SelectValue placeholder="Select location" />
        //                                 </SelectTrigger>
        //                                 <SelectContent>
        //                                     <SelectItem value="Central office">Central Office</SelectItem>
        //                                     <SelectItem value="Division 1">Division 1</SelectItem>
        //                                     <SelectItem value="Division 2">Division 2</SelectItem>
        //                                     <SelectItem value="Division 3">Division 3</SelectItem>
        //                                     <SelectItem value="Division 4">Division 4</SelectItem>
        //                                     <SelectItem value="Division 5">Division 5</SelectItem>
        //                                     <SelectItem value="Division 6">Division 6</SelectItem>
        //                                     <SelectItem value="Division 7">Division 7</SelectItem>
        //                                     <SelectItem value="Division 8">Division 8</SelectItem>
        //                                 </SelectContent>
        //                             </Select>
        //                             {errors.location && <p className="text-red-500">{errors.location}</p>}
        //                         </div>
        //                         {data.location && data.location !== 'Central office' && (
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
        //                                 />
        //                                 {errors.district && <p className="text-red-500">{errors.district}</p>}
        //                             </div>
        //                         )}
        //                         */}
                                
        //                     </div>     
        //                        <div className='flex gap-4'>
        //                             <Button type="submit" disabled={processing}>
        //                                 Create
        //                             </Button>
        //                             <Button variant="outline" asChild>
        //                                 <Link href="/users">Cancel</Link>
        //                             </Button>
        //                         </div>
        //                 </form>
        //             </CardContent>
        //         </Card>
        //     </div>
        // </AppLayout>
    // );

    //     function CreateUserCard(){
        return(
        <Card className="w-full border-none">
                    <CardHeader>
                        <CardTitle>Create User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4" name="formCreateUser">
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor="name">Name</Label>
                                    <div className='flex flex-row gap-4'>
                                    <Input
                                        className='w-2/5'
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder='First Name'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <Input
                                    className='w-3/5'
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                    />
                                    {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                                    </div>

                                <div className='grid grid-cols-2 gap-4'> 
                                    <div className='w-full'>
                                        <Label htmlFor="employee_id">ID Number</Label>
                                        <Input
                                            id="employee_id"
                                            pattern="\d{4}-\d{4,5}"
                                            placeholder="Employee #"
                                            name="employee_id"
                                            autoComplete="employee_id"
                                            type="text"
                                            value={data.employee_id}
                                            onChange={(e) => setData('employee_id', e.target.value)}
                                            required
                                        />
                                        {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
                                    </div>  
                                    <div className='w-full'>
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
                                <div className='flex gap-4'>
                                    <Button type="submit" disabled={processing}>
                                        Create
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/users">Cancel</Link>
                                    </Button>
                                </div>
                            </div>        
                        </form>
                    </CardContent>
                </Card>
    )};