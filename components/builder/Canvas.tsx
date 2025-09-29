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
      <div className="min-h-[24rem] p-4 space-y-4">
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.length > 0 ? (
            fields.map((field) => (
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

function PreviewView() {
  const { fields, theme } = useBuilderStore();
  const { primary, background, text } = theme.colors;

  return (
    <form
      style={{ borderColor: primary, backgroundColor: background, color: text }}
      className="p-4 space-y-6"
    >
      {fields.map((field) => (
        <FieldWrapper key={field.id} label={field.label}>
          {renderField(field, true)}
        </FieldWrapper>
      ))}
      <Button
        className={`border`}
        style={{ borderColor: primary }}
        type="submit"
      >
        Submit
      </Button>
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
    <div style={themeStyles}>
      <Panel>
        {mode === "edit" ? (
          <input
            type="text"
            placeholder={title}
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="text-2xl bg-white/5 border-white/10 rounded-md p-2"
          />
        ) : (
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-color)" }}
          >
            {title}
          </h2>
        )}
        {/* REMOVED the primaryColor prop from the PreviewView call */}
        {mode === "edit" ? <EditView /> : <PreviewView />}
      </Panel>
    </div>
  );
}
