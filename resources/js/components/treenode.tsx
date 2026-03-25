// components/tree-node.tsx
import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface TreeNodeProps {
  label: string
  children?: React.ReactNode
  defaultOpen?: boolean
}

export function TreeNode({ label, children, defaultOpen = false }: TreeNodeProps) {
  const [open, setOpen] = useState(defaultOpen)
  const hasChildren = Boolean(children)

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-1 py-1 px-2 rounded-md hover:bg-muted cursor-pointer text-sm"
        onClick={() => hasChildren && setOpen(o => !o)}
      >
        <span className="w-4 text-muted-foreground">
          {hasChildren
            ? open
              ? <ChevronDown size={14} />
              : <ChevronRight size={14} />
            : null
          }
        </span>
        {label}
      </div>

      {open && children && (
        <div className="ml-4 border-l pl-2 border-border">
          {children}
        </div>
      )}
    </div>
  )
}