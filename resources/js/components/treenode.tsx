import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function TreeNode({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = !!children;

  return (
    <div className="select-none">
      {/* NODE BOX */}
      <div
        onClick={() => hasChildren && setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg 
                   bg-[#2a2d34] hover:bg-[#343741] 
                   text-sm cursor-pointer transition-all"
      >
        {/* Arrow */}
        {hasChildren ? (
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={14} />
          </motion.div>
        ) : (
          <span className="w-[14px]" />
        )}

        {/* Label */}
        <span className="flex-1">{label}</span>
      </div>

      {/* CHILDREN WITH ANIMATION */}
      <AnimatePresence initial={false}>
        {open && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="ml-4 mt-1 pl-3 border-l border-[#3a3d45] overflow-hidden"
          >
            <div className="flex flex-col gap-1 py-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}