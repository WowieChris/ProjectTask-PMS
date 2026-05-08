import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { TreeNodeData } from '@/components/treenode'
import { ChevronRight, Clock } from 'lucide-react'


interface Division {
  id: number; name: string
  districts: { id: number; name: string; areas: { id: number; name: string }[] }[]
}

interface Props {
  open: boolean
  onClose: () => void
  moving: TreeNodeData | null
  divisions: Division[]
  onConfirm: (targetId: number) => void  // kept for immediate moves
}

export function MoveLocationModal({ open, onClose, moving, divisions, onConfirm }: Props) {
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null)
  const [mode, setMode] = useState<'now' | 'scheduled'>('now')

  const { data, setData, post, processing, reset } = useForm({
    location_type:    '',
    location_id:      0,
    target_parent_id: 0,
    scheduled_at:     '',
    notes:            '',
  })

  if (!moving) return null

  const handleConfirm = () => {
    if (!selectedTarget) return

    if (mode === 'now') {
      onConfirm(selectedTarget)
      setSelectedTarget(null)
      return
    }

    // Scheduled
    setData({
      location_type:    moving.type,
      location_id:      moving.id,
      target_parent_id: selectedTarget,
      scheduled_at:     data.scheduled_at,
      notes:            data.notes,
    })

    post(route('scheduled-location-moves.store'), {
      onSuccess: () => {
        reset()
        setSelectedTarget(null)
        setMode('now')
        onClose()
      },
    })
  }

  const renderTargets = () => {
    if (moving.type === 'district') {
      return divisions.map(div => (
        <div key={div.id} onClick={() => setSelectedTarget(div.id)}
          className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors
            ${selectedTarget === div.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
          {div.name}
        </div>
      ))
    }
    if (moving.type === 'area') {
      return divisions.map(div => (
        <div key={div.id} className="mb-2">
          <p className="text-xs font-bold uppercase text-muted-foreground px-2 mb-1">{div.name}</p>
          {div.districts.map(dist => (
            <div key={dist.id} onClick={() => setSelectedTarget(dist.id)}
              className={`px-3 py-2 rounded-lg cursor-pointer text-sm ml-2 transition-colors
                ${selectedTarget === dist.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
              {dist.name}
            </div>
          ))}
        </div>
      ))
    }
    if (moving.type === 'branch') {
      return divisions.map(div => (
        <div key={div.id} className="mb-2">
          <p className="text-xs font-bold uppercase text-muted-foreground px-2 mb-1">{div.name}</p>
          {div.districts.map(dist => (
            <div key={dist.id} className="ml-2 mb-1">
              <p className="text-xs font-semibold text-muted-foreground px-2 mb-1 flex items-center gap-1">
                <ChevronRight size={10} />{dist.name}
              </p>
              {dist.areas.map(area => (
                <div key={area.id} onClick={() => setSelectedTarget(area.id)}
                  className={`px-3 py-2 rounded-lg cursor-pointer text-sm ml-3 transition-colors
                    ${selectedTarget === area.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                  {area.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Move "{moving.name}"</DialogTitle>
          <p className="text-xs text-muted-foreground">Select a new parent for this {moving.type}</p>
        </DialogHeader>

        {/* Mode toggle */}
        <div className="flex rounded-lg border overflow-hidden text-sm">
          <button onClick={() => setMode('now')}
            className={`flex-1 py-1.5 transition-colors ${mode === 'now' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
            Move Now
          </button>
          <button onClick={() => setMode('scheduled')}
            className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 transition-colors
              ${mode === 'scheduled' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
            <Clock size={13} /> Schedule
          </button>
        </div>

        {/* Target picker */}
        <div className="max-h-52 overflow-y-auto border rounded-lg p-2 space-y-1">
          {renderTargets()}
        </div>

        {/* Scheduled fields */}
        {mode === 'scheduled' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Effective Date & Time</Label>
              <Input
                type="datetime-local"
                min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
                value={data.scheduled_at}
                onChange={e => setData('scheduled_at', e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Notes (optional)</Label>
              <Input
                placeholder="Reason for move…"
                value={data.notes}
                onChange={e => setData('notes', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            disabled={!selectedTarget || (mode === 'scheduled' && !data.scheduled_at) || processing}
            onClick={handleConfirm}
          >
            {mode === 'scheduled' ? 'Schedule Move' : 'Move'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}