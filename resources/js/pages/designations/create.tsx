import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function CreateDesignation() {

  const allPermissions = ['create', 'read', 'update', 'delete']

  const { data, setData, post, processing } = useForm({
    name: '',
    description: '',
    permissions: [] as string[],
  })

  const togglePermission = (perm: string) => {
    setData(
      'permissions',
      data.permissions.includes(perm)
        ? data.permissions.filter((p) => p !== perm)
        : [...data.permissions, perm]
    )
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/designations')
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

      {/* Permissions */}
      <div>
        <Label>Permissions</Label>

        <div className="flex flex-col gap-2 mt-2">

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
        Create
      </Button>

    </form>

  )
}