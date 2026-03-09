import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EditDesignation({ designation }: any) {

  const { data, setData, put, processing } = useForm({
    name: designation.name,
    description: designation.description ?? '',
  })

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
        <Label>Description</Label>
        <Input
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
        />
      </div>

      <Button type="submit" disabled={processing}>
        Update
      </Button>

    </form>

  )
}