import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TreeNode, TreeNodeData } from '@/components/treenode'
import { ChevronRight } from 'lucide-react'

interface Division {
  id: number; name: string
  districts: { id: number; name: string; areas: { id: number; name: string }[] }[]
}

interface Props {
  open: boolean
  onClose: () => void
  moving: TreeNodeData | null
  divisions: Division[]
  onConfirm: (targetId: number) => void
}

export function MoveLocationModal({ open, onClose, moving, divisions, onConfirm }: Props) {
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null)

  if (!moving) return null

  // Valid targets based on what's being moved
  const renderTargets = () => {
    if (moving.type === 'district') {
      // Can move to any division
      return divisions.map(div => (
        <div
          key={div.id}
          onClick={() => setSelectedTarget(div.id)}
          className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors
            ${selectedTarget === div.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
        >
          {div.name}
        </div>
      ))
    }

    if (moving.type === 'area') {
      // Can move to any district
      return divisions.map(div => (
        <div key={div.id} className="mb-2">
          <p className="text-xs font-bold uppercase text-muted-foreground px-2 mb-1">{div.name}</p>
          {div.districts.map(dist => (
            <div
              key={dist.id}
              onClick={() => setSelectedTarget(dist.id)}
              className={`px-3 py-2 rounded-lg cursor-pointer text-sm ml-2 transition-colors
                ${selectedTarget === dist.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
            >
              {dist.name}
            </div>
          ))}
        </div>
      ))
    }

    if (moving.type === 'branch') {
      // Can move to any area
      return divisions.map(div => (
        <div key={div.id} className="mb-2">
          <p className="text-xs font-bold uppercase text-muted-foreground px-2 mb-1">{div.name}</p>
          {div.districts.map(dist => (
            <div key={dist.id} className="ml-2 mb-1">
              <p className="text-xs font-semibold text-muted-foreground px-2 mb-1 flex items-center gap-1">
                <ChevronRight size={10} />{dist.name}
              </p>
              {dist.areas.map(area => (
                <div
                  key={area.id}
                  onClick={() => setSelectedTarget(area.id)}
                  className={`px-3 py-2 rounded-lg cursor-pointer text-sm ml-3 transition-colors
                    ${selectedTarget === area.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                >
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
          <p className="text-xs text-muted-foreground">
            Select a new parent for this {moving.type}
          </p>
        </DialogHeader>

        <div className="max-h-72 overflow-y-auto border rounded-lg p-2 space-y-1">
          {renderTargets()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            disabled={!selectedTarget}
            onClick={() => {
              if (selectedTarget) {
                onConfirm(selectedTarget)
                setSelectedTarget(null)
              }
            }}
          >
            Move
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}