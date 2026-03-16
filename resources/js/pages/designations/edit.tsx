import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

interface EditDesignationProps {
  designation: {
    id: number
    name: string
    role: 'user' | 'admin'
    permissions?: string[] // optional, if loaded from backend
  }
}

export default function EditDesignation({ designation }: EditDesignationProps) {

  // Define available permissions
  const allPermissions = ['create', 'read', 'update', 'delete']

  const { data, setData, put, processing } = useForm({
    name: designation.name,
    role: designation.role,
    permissions: designation.permissions ?? [], // initial selected permissions
  })

  const togglePermission = (perm: string) => {
    setData('permissions', data.permissions.includes(perm)
      ? data.permissions.filter(p => p !== perm)
      : [...data.permissions, perm]
    )
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/designations/${designation.id}`)
  }

  return (
    <form onSubmit={submit} className="space-y-4 mt-4">

      <div>
        <Label>Designation Name</Label>
        <Input
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
      </div>
      <div>
        <Label>Role</Label>
        <select
          value={data.role}
          onChange={(e) => setData('role', e.target.value as 'user' | 'admin')}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <Label>Permissions</Label>
        <div className="flex flex-col gap-2 mt-1">
          {allPermissions.map((perm) => (
            <label key={perm} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.permissions.includes(perm)}
                onChange={() => togglePermission(perm)}
                className="cursor-pointer"
              />
              {perm.charAt(0).toUpperCase() + perm.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={processing}>
        Update
      </Button>
    </form>
  )
}