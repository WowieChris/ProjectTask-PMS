import { Link, useForm } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Designation {
    id: number
    name: string
    role: 'user' | 'admin'
}
interface PageProps extends Record<string, unknown> {
    designations: Designation[]
}
interface Props {
    onSuccess?: () => void
}

export default function UsersCreate({ onSuccess }: Props) {
    const { designations = [] } = usePage<PageProps>().props

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        last_name: '',
        email: '',
        role: 'user',
        designation_id: '',  // ← change from designation to designation_id
        employee_id: '',
        district: '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/users', {
            onSuccess: () => {
                reset()
                onSuccess?.()
            },
        })
    }

    const handleEmployeeId = (value: string) => {
        const digits = value.replace(/\D/g, '')

        let formatted = digits

        if (digits.length > 4) {
            formatted = digits.slice(0, 4) + '-' + digits.slice(4, 9)
        }

        setData('employee_id', formatted)
    }

    return (
        <Card className="w-full border-none">
            <CardHeader>
                <CardTitle>Create User</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className="space-y-4">

                    {/* NAME */}
                    <div>
                        <Label>Name</Label>

                        <div className="flex gap-4">
                            <Input
                                className="w-2/5"
                                placeholder="First Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <Input
                                className="w-3/5"
                                placeholder="Last Name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                            />
                        </div>

                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                        {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                    </div>


                    {/* EMPLOYEE + ROLE */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <Label>ID Number</Label>

                            <Input
                                pattern="\d{4}-\d{4,5}"
                                placeholder="0000-0000"
                                value={data.employee_id}
                                onChange={(e) => handleEmployeeId(e.target.value)}
                                required
                            />

                            {errors.employee_id && <p className="text-red-500">{errors.employee_id}</p>}
                        </div>

                        {/* DESIGNATION */}
                        <div>
                            <Label>Designation</Label>

                            <Select
                                value={data.designation_id}
                                onValueChange={(value) => {
                                    setData('designation_id', value)
                                    // auto-set role based on selected designation
                                    const selected = designations.find(d => String(d.id) === value)
                                    if (selected) setData('role', selected.role)
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select designation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {designations.map((d) => (
                                        <SelectItem key={d.id} value={String(d.id)}>
                                            {d.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.designation_id && <p className="text-red-500">{errors.designation_id}</p>}
                        </div>
                        {/* <div>
                            <Label>Role</Label>

                            <Select
                                value={data.role}
                                onValueChange={(value) => setData('role', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                </SelectContent>

                            </Select>

                            {errors.role && <p className="text-red-500">{errors.role}</p>}
                        </div> */}

                    </div>


                    {/* PASSWORD */}
                    {/* <div>
                        <Label>Password</Label>

                        <Input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div> */}


                    {/* EMAIL */}
                    <div>
                        <Label>Email</Label>

                        <Input
                            type="email"
                            placeholder="Email Address"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>





                    {/* LOCATION */}
                    {/* <div>
                        <Label>Location</Label>

                        <Input
                            placeholder="Location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            required
                        />

                        {errors.location && <p className="text-red-500">{errors.location}</p>}
                    </div> */}


                    {/* BUTTONS */}
                    <div className="flex gap-4 pt-2">

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
    )
}