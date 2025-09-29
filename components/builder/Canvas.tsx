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
import { FormField } from "@/types";
import { Button } from "../ui/Button";
import { FieldWrapper } from "./FieldWrapper";
import { TextInput } from "./fields/TextInput";
import { EmailInput } from "./fields/EmailInput";
import { TextareaInput } from "./fields/TextAreaInput";
import { DropdownInput } from "./fields/DropdownInput";
import { CheckboxInput } from "./fields/CheckboxInput";

function renderField(field: FormField, isPreview = false) {
  switch (field.type) {
    case "text":
      return <TextInput field={field} isPreview={isPreview} />;
    case "email":
      return <EmailInput field={field} isPreview={isPreview} />;
    case "textarea":
      return <TextareaInput field={field} isPreview={isPreview} />;
    case "dropdown":
      return <DropdownInput field={field} isPreview={isPreview} />;
    case "checkbox":
      return <CheckboxInput field={field} isPreview={isPreview} />;
    default:
      return <p className="text-red-500">Unknown field type</p>;
  }
}

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
      <div className="min-h-[32rem] p-8">
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {fields.length > 0 ? (
              fields.map((field) => (
                <SortableField key={field.id} field={field}>
                  {renderField(field, false)}
                </SortableField>
              ))
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-600 rounded-lg">
                <p>Add your first element from the left panel.</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}

function PreviewView() {
  const { fields, theme } = useBuilderStore();
  const { primary, background, text } = theme.colors;

  return (
    <form
      style={{ borderColor: primary, backgroundColor: background, color: text }}
      className="p-8 space-y-8 rounded-lg"
    >
      {fields.map((field) => (
        <FieldWrapper key={field.id} label={field.label}>
          {renderField(field, true)}
        </FieldWrapper>
      ))}
      <div className="pt-6 flex justify-center">
        <Button
          className="border-2 px-8 py-3 text-lg"
          style={{ borderColor: primary, backgroundColor: primary }}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export function Canvas() {
  const { mode, theme, title, updateTitle } = useBuilderStore();

  const themeStyles = {
    "--primary-color": theme.colors.primary,
    "--text-color": theme.colors.text,
  } as React.CSSProperties;

  return (
    <div style={themeStyles} className="flex-1 overflow-auto">
      <Panel className="m-6">
        <div className="mb-8">
          {mode === "edit" ? (
            <input
              type="text"
              placeholder={title}
              value={title}
              onChange={(e) => updateTitle(e.target.value)}
              className="text-3xl font-bold bg-white/5 border-white/10 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <h2
              className="text-3xl font-bold text-center"
              style={{ color: "var(--text-color)" }}
            >
              {title}
            </h2>
          )}
        </div>
        {mode === "edit" ? <EditView /> : <PreviewView />}
      </Panel>
    </div>
  );
}
