// components/builder/FieldWrapper.tsx
"use client";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { GripVertical } from "lucide-react";
import React from "react";

// 1. Remove the 'theme' prop from the interface
interface FieldWrapperProps {
  label: string;
  children: React.ReactNode;
  dragHandleListeners?: SyntheticListenerMap;
}

export function FieldWrapper({
  label,
  children,
  dragHandleListeners,
}: FieldWrapperProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-3 text-gray-500 cursor-grab" {...dragHandleListeners}>
        <GripVertical size={18} />
      </div>

      <div className="flex-grow">
        <label
          // 2. Remove the inline style and use the Tailwind class instead
          className="block text-sm font-medium text-page-text mb-1"
        >
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
