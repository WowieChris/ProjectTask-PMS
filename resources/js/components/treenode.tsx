import { ChevronRight, ChevronDown, Move } from 'lucide-react'
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface TreeNodeData {
  id: number
  name: string
  type: 'division' | 'district' | 'area' | 'branch'
}
interface TreeNodeProps {
  label: string
  children?: React.ReactNode
  defaultOpen?: boolean
  nodeData?: TreeNodeData
  isSelected?: boolean
  onSelect?: (node: TreeNodeData) => void
  isDragOver?: boolean
  onDragStart?: (e: React.DragEvent, node: TreeNodeData) => void
  onDragOver?: (e: React.DragEvent, node: TreeNodeData) => void
  onDragLeave?: () => void
  onDrop?: (e: React.DragEvent, node: TreeNodeData) => void
  actions?: React.ReactNode
}

export function TreeNode({
  label,
  children,
  defaultOpen = false,
  nodeData,
  isSelected,
  onSelect,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  actions,
}: TreeNodeProps) {
  const [open, setOpen] = useState(defaultOpen)
  const hasChildren = Boolean(children)
  const isMovable = nodeData?.type !== 'division'

  return (
    <div className="select-none">
      <div
        draggable={isMovable}
        onDragStart={(e) => isMovable && nodeData && onDragStart?.(e, nodeData)}
        onDragOver={(e) => {
          e.preventDefault()
          if (nodeData) {
            onDragOver?.(e, nodeData);
          }
        }}
        onDragLeave={onDragLeave}
        onDrop={(e) => nodeData && onDrop?.(e, nodeData)}
        onClick={() => {
          if (hasChildren) setOpen(o => !o)
          if (nodeData && isMovable) onSelect?.(nodeData)
        }}
        className={`
          group flex items-center gap-1 py-1.5 px-2 rounded-md cursor-pointer text-sm transition-colors
          ${isSelected ? 'bg-primary text-muted-primary font-medium' : 'hover:bg-muted'}
          ${isDragOver ? 'bg-green-100 border border-dashed border-green-400' : ''}
          ${isMovable ? 'cursor-grab active:cursor-grabbing' : ''}
        `}
      >
        <span className="w-4 text-muted-foreground shrink-0">
          {hasChildren
            ? open
              ? <ChevronDown size={14} />
              : <ChevronRight size={14} />
            : null}
        </span>

        <span className="flex-1 truncate">{label}</span>
          {actions && (
            <div onClick={e => e.stopPropagation()}>
              {actions}
            </div>
          )}

        {isMovable && isSelected && (
          <Move size={13} className="text-primary shrink-0 opacity-70" />
        )}
      </div>

      {open && children && (
        <div className="ml-4 border-l pl-0 border-border border rounded-lg">
          {children}
        </div>
      )}
    </div>
  );
}