// components/builder/FieldWrapper.tsx
import { GripVertical } from "lucide-react";
import React from "react";

// We now accept the dnd-kit listeners as a prop
interface FieldWrapperProps {
  label: string;
  children: React.ReactNode;
  dragHandleListeners?: any; // To hold the dnd-kit listeners
}

export function FieldWrapper({
  label,
  children,
  dragHandleListeners,
}: FieldWrapperProps) {
  return (
    <div className="flex items-start gap-4">
      {/* Attach the listeners ONLY to the drag handle */}
      <div className="mt-3 text-gray-500 cursor-grab" {...dragHandleListeners}>
        <GripVertical size={18} />
      </div>

      <div className="flex-grow">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
