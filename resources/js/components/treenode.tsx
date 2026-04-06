import { ChevronRight, ChevronDown, GripVertical } from 'lucide-react'
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

const typeBadge: Record<TreeNodeData['type'], { label: string; class: string }> = {
  division: { label: 'DIV', class: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  district: { label: 'DIST', class: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  area: { label: 'AREA', class: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  branch: { label: 'BR', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
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
  const badge = nodeData ? typeBadge[nodeData.type] : null

  return (
    <div className="select-none">
      <div
        draggable={isMovable}
        onDragStart={(e) => isMovable && nodeData && onDragStart?.(e, nodeData)}
        onDragOver={(e) => { e.preventDefault(); nodeData && onDragOver?.(e, nodeData); }}
        onDragLeave={onDragLeave}
        onDrop={(e) => nodeData && onDrop?.(e, nodeData)}
        onClick={() => {
          if (hasChildren) setOpen(o => !o);
          if (nodeData && isMovable) onSelect?.(nodeData);
        }}
        className={`
          group relative flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm
          transition-all duration-150 cursor-pointer
          ${isSelected
            ? 'bg-primary text-primary-foreground shadow-sm'
            : isDragOver
              ? 'bg-emerald-500/10 border border-dashed border-emerald-500/50'
              : 'hover:bg-muted/70'
          }
          ${isMovable ? 'cursor-grab active:cursor-grabbing' : ''}
        `}
      >
        {/* Drag handle — only visible on hover for movable nodes */}
        {isMovable && (
          <GripVertical
            size={13}
            className={`shrink-0 transition-opacity duration-150
              ${isSelected
                ? 'opacity-50 text-primary-foreground'
                : 'opacity-0 group-hover:opacity-30 text-muted-foreground'
              }`
            }
          />
        )}

        {/* Chevron */}
        <span className="w-4 shrink-0 flex items-center justify-center">
          {hasChildren ? (
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.15 }}
              className={`flex ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`}
            >
              <ChevronRight size={14} />
            </motion.span>
          ) : (
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30 mx-auto" />
          )}
        </span>

        {/* Type badge */}
        {badge && (
          <span className={`
            shrink-0 text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded border
            ${isSelected ? 'bg-white/10 text-primary-foreground border-white/20' : badge.class}
          `}>
            {badge.label}
          </span>
        )}

        {/* Label */}
        <span className={`flex-1 truncate text-xs font-medium
          ${isSelected ? 'text-primary-foreground' : 'text-foreground'}
        `}>
          {label}
        </span>

        {/* Actions slot */}
        {actions && (
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            onClick={e => e.stopPropagation()}
          >
            {actions}
          </div>
        )}
      </div>

      {/* Children with animated expand */}
      <AnimatePresence initial={false}>
        {open && children && (
          <motion.div
            key="children"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="ml-5 mt-0.5 mb-0.5 border-l border-border/60 pl-2 space-y-0.5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}