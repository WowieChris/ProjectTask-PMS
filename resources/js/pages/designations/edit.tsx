import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

interface EditDesignationProps {
  designation: {
    id: number
    name: string
    permissions?: string[] // optional, if loaded from backend
  }
}

export default function EditDesignation({ designation }: EditDesignationProps) {

  // Define available permissions
  const allPermissions = ['create', 'read', 'update', 'delete']

  const { data, setData, put, processing } = useForm({
    name: designation.name,
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