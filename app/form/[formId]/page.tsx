// app/form/[formId]/page.tsx
"use client";

import React, { useEffect, useState, use } from "react";
import {
  loadFormFromLocalStorage,
  saveSubmissionToLocalStorage,
} from "@/lib/Storage";
import { v4 as uuidv4 } from "uuid";

import { FormField, FormTheme } from "@/types";
import { FieldWrapper } from "@/components/builder/FieldWrapper";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/builder/fields/TextInput";
import { EmailInput } from "@/components/builder/fields/EmailInput";
import { TextareaInput } from "@/components/builder/fields/TextAreaInput";
import { DropdownInput } from "@/components/builder/fields/DropdownInput";
import { CheckboxInput } from "@/components/builder/fields/CheckboxInput";
import { Panel } from "@/components/ui/Panel";

function renderField(field: FormField) {
  switch (field.type) {
    case "text":
      return <TextInput field={field} isPreview={true} />;
    case "email":
      return <EmailInput field={field} isPreview={true} />;
    case "textarea":
      return <TextareaInput field={field} isPreview={true} />;
    case "dropdown":
      return <DropdownInput field={field} isPreview={true} />;
    case "checkbox":
      return <CheckboxInput field={field} isPreview={true} />;
    default:
      return null;
  }
}

export default function FormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const [fields, setFields] = useState<FormField[]>([]);
  const [theme, setTheme] = useState<FormTheme | null>(null);
  const [title, setTitle] = useState<string>("Form");

  const { formId } = use(params);

  useEffect(() => {
    const savedState = loadFormFromLocalStorage(formId);
    if (savedState) {
      setFields(savedState.fields);
      setTheme(savedState.theme);
      setTitle(savedState.title);
      console.log(savedState);
    }
  }, [formId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const answers: Record<string, string> = {};
    fields.forEach((field) => {
      answers[field.type] = formData.get(field.id) as string;
    });
    const newSubmission = {
      id: uuidv4(),
      formId,
      answers,
    };

    saveSubmissionToLocalStorage(formId, newSubmission);
    alert("Form submitted successfully!");
    event.currentTarget.reset();
  };

  if (!theme) {
    return <div>Loading...</div>;
  }

  const { primary, background, text } = theme.colors;

  return (
    <main className="flex items-center justify-center min-h-screen p-6 md:p-8">
      <Panel className="w-full max-w-2xl">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ color: theme.colors.text }}
        >
          {title}
        </h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          style={{
            borderColor: primary,
            backgroundColor: background,
            color: text,
          }}
          className="space-y-8 p-4 "
        >
          {fields.map((field) => (
            <FieldWrapper key={field.id} label={field.label}>
              {renderField(field)}
            </FieldWrapper>
          ))}
          <div className="p-4 flex justify-center">
            <Button
              //   variant="submit"
              type="submit"
              style={{ background: primary, justifyContent: "center" }}
              className={`w-full hover:transition-colors  md:w-auto px-8 py-3 text-lg`}
            >
              Submit
            </Button>
          </div>
        </form>
      </Panel>
    </main>
  );
}
