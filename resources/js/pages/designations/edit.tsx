import { useForm } from '@inertiajs/react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

import {
  ShieldCheck,
  UserCog,
  CheckCircle2,
  X,
  Save,
  Lock,
  Eye,
  FilePlus2,
  Trash2,
} from 'lucide-react'

interface EditDesignationProps {
  designation: {
    id: number
    name: string
    role: 'user' | 'admin'
    permissions?: string[]
  }
  onCancel?: () => void
  onSuccess?: () => void
}

const permissionMeta: Record<string, {
  icon: React.ReactNode
  description: string
  activeClass: string
  badgeClass: string
}> = {
  create: {
    icon: <FilePlus2 className="h-3.5 w-3.5" />,
    description: 'Add new records to the system.',
    activeClass: 'border-blue-500/30 bg-blue-500/8',
    badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  },
  read: {
    icon: <Eye className="h-3.5 w-3.5" />,
    description: 'View and query existing records.',
    activeClass: 'border-emerald-500/30 bg-emerald-500/8',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  },
  update: {
    icon: <Lock className="h-3.5 w-3.5" />,
    description: 'Modify and edit existing records.',
    activeClass: 'border-amber-500/30 bg-amber-500/8',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  },
  delete: {
    icon: <Trash2 className="h-3.5 w-3.5" />,
    description: 'Remove records from the system.',
    activeClass: 'border-red-500/30 bg-red-500/8',
    badgeClass: 'bg-red-500/15 text-red-400 border-red-500/20',
  },
}

export default function EditDesignation({
  designation,
  onCancel,
  onSuccess,
}: EditDesignationProps) {

  const allPermissions = ['create', 'read', 'update', 'delete']

  const { data, setData, put, processing } = useForm({
    name: designation.name,
    role: designation.role,
    permissions: designation.permissions ?? [],
  })

  const togglePermission = (perm: string) => {
    setData(
      'permissions',
      data.permissions.includes(perm)
        ? data.permissions.filter(p => p !== perm)
        : [...data.permissions, perm]
    )
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/designations/${designation.id}`, {
      onSuccess: () => onSuccess?.(),
    })
  }

  return (
    <form onSubmit={submit} className="flex flex-col min-h-0">

      {/* ── BODY ───────────────────────────────────────── */}
      <div className="px-5 py-4 space-y-4 overflow-y-auto max-h-[70vh]">

        {/* Details card */}
        <div className="rounded-xl border border-white/8 bg-zinc-950/40 p-4">

          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
              <UserCog className="h-3 w-3 text-zinc-400" />
            </div>
            <h3 className="text-xs font-semibold text-white">Designation Details</h3>
          </div>

          <div className="space-y-3">

            {/* Name */}
            <div className="space-y-1">
              <Label className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                Designation Name
              </Label>
              <Input
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="h-9 rounded-xl bg-zinc-950/60 border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500/50"
                placeholder="e.g. Department Manager"
              />
            </div>

            {/* Role toggle */}
            <div className="space-y-1">
              <Label className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                Role Type
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {(['user', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setData('role', r)}
                    className={`
                      h-9 rounded-xl border text-xs font-medium
                      flex items-center justify-center gap-1.5
                      transition-all duration-150
                      ${data.role === r
                        ? r === 'admin'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
                        : 'border-white/8 bg-zinc-900/40 text-zinc-500 hover:text-zinc-300 hover:border-white/15'
                      }
                    `}
                  >
                    {r === 'admin'
                      ? <ShieldCheck className="w-3 h-3" />
                      : <UserCog className="w-3 h-3" />
                    }
                    <span className="capitalize">{r}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Permissions card */}
        <div className="rounded-xl border border-white/8 bg-zinc-950/40 p-4">

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-3 w-3 text-zinc-400" />
              </div>
              <h3 className="text-xs font-semibold text-white">Permissions</h3>
            </div>
            <span className="text-[10px] text-zinc-500">
              {data.permissions.length} / {allPermissions.length} enabled
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {allPermissions.map((perm) => {
              const selected = data.permissions.includes(perm)
              const meta = permissionMeta[perm]

              return (
                <button
                  key={perm}
                  type="button"
                  onClick={() => togglePermission(perm)}
                  className={`
                    rounded-xl border p-3 text-left
                    transition-all duration-150
                    ${selected
                      ? meta.activeClass
                      : 'border-white/8 bg-zinc-900/30 hover:bg-zinc-800/40 hover:border-white/12'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`flex items-center gap-1.5 ${selected ? '' : 'text-zinc-600'}`}>
                      <span className={selected ? meta.badgeClass.split(' ')[1] : ''}>
                        {meta.icon}
                      </span>
                      <Badge className={`text-[10px] px-2 h-4 border ${selected ? meta.badgeClass : 'bg-zinc-800/80 text-zinc-500 border-zinc-700'
                        }`}>
                        {perm.toUpperCase()}
                      </Badge>
                    </div>
                    {selected && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <p className={`text-[10px] leading-relaxed ${selected ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {meta.description}
                  </p>
                </button>
              )
            })}
          </div>

        </div>

      </div>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-white/8 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>

        <Button
          type="submit"
          disabled={processing}
          className="rounded-xl px-5 h-8 text-xs bg-indigo-600 hover:bg-indigo-500 border-0 gap-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          {processing ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>

    </form>
  )
}