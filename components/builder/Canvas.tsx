// components/builder/Canvas.tsx
"use client";

import useBuilderStore from "@/store/builderStore";
import { Panel } from "../ui/Panel";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableField } from "./SortableField";
import { FieldWrapper } from "./FieldWrapper";
import { TextInput } from "./fields/TextInput";
import { EmailInput } from "./fields/EmailInput";
import { TextareaInput } from "./fields/TextAreaInput";
import { FormField } from "@/types";
import { Button } from "../ui/Button";
import { ThemePanel } from "./ThemePanel";

// Updated renderField function accepts an isPreview prop
function renderField(field: FormField, isPreview = false) {
  switch (field.type) {
    case "text":
      return <TextInput field={field} isPreview={isPreview} />;
    case "email":
      return <EmailInput field={field} isPreview={isPreview} />;
    case "textarea":
      return <TextareaInput field={field} isPreview={isPreview} />;
    default:
      return <p className="text-red-500">Unknown field type</p>;
  }
}

// EditView remains the same
function EditView() {
  const { fields, reorderFields } = useBuilderStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      reorderFields(oldIndex, newIndex);
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="min-h-[24rem] p-4 space-y-4">
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.length > 0 ? (
            fields.map((field) => (
              // The logic is now cleaner and encapsulated in SortableField
              <SortableField key={field.id} field={field}>
                {renderField(field, false)}
              </SortableField>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Add your first element from the left panel.</p>
            </div>
          )}
        </SortableContext>
      </div>
    </DndContext>
  );
}

// Corrected PreviewView
function PreviewView() {
  const { fields } = useBuilderStore();
  return (
    <form className="p-4 space-y-6">
      {fields.map((field) => (
        <FieldWrapper key={field.id} label={field.label}>
          {renderField(field, true)}
        </FieldWrapper>
      ))}
      <Button
        variant="primary"
        type="submit"
        className="border border-white/30 hover:border-green-500"
      >
        Submit
      </Button>
    </form>
  );
}

// Canvas component now correctly chooses between EditView and PreviewView
export function Canvas() {
  const { mode, theme } = useBuilderStore();

  // Define the style object with CSS variables
  const themeStyles = {
    "--primary-color": theme.colors.primary,
    "--text-color": theme.colors.text,
    "--background-color": theme.colors.background,
  } as React.CSSProperties;

  return (
    <div style={themeStyles}>
      <Panel>
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: "var(--text-color)" }}
        >
          Project Feedback
        </h2>
        {mode === "edit" ? <EditView /> : <PreviewView />}
      </Panel>
    </div>
  );
}
