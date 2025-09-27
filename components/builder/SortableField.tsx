// components/builder/SortableField.tsx
"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useBuilderStore from "@/store/builderStore";
import { FormField } from "@/types";
import { FieldWrapper } from "./FieldWrapper";

interface SortableFieldProps {
  field: FormField;
  children: React.ReactNode;
}

export function SortableField({ field, children }: SortableFieldProps) {
  const { selectedFieldId, selectField } = useBuilderStore();

  const {
    attributes,
    listeners, // These are the drag listeners
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = field.id === selectedFieldId;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} // Apply structural attributes here
      onClick={() => selectField(field.id)}
      className={`p-4 bg-white/10 rounded-lg cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-brand-green" : ""
      }`}
    >
      <FieldWrapper
        label={field.label}
        // Pass the drag listeners to the wrapper
        dragHandleListeners={listeners}
      >
        {children}
      </FieldWrapper>
    </div>
  );
}
