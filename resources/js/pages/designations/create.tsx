import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CreateDesignation() {

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/designations')
  }

  return (

    <form onSubmit={submit} className="space-y-4">

      <div>
        <Label>Designation Name</Label>
        <Input
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <Label>Description</Label>
        <Input
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
        />
      </div>

      <Button type="submit" disabled={processing}>
        Save
      </Button>

    </form>

  )
}