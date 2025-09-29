// types/index.ts

import { Prisma } from "@prisma/client";

export interface FormField {
  id: string;
  type: "text" | "email" | "textarea" | "checkbox" | "dropdown" | "file";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}
export interface Submission {
  id: string;
  formId: string;
  answers: Record<string, string>; // e.g., { fieldId: 'answer' }
}
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface FormTheme {
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  fonts: {
    body: string;
  };
}

// Helper type for what we save to local storage
type StoredState = Pick<BuilderState, "fields" | "theme" | "title">;

export interface BuilderState {
  // STATE
  fields: FormField[];
  theme: FormTheme;
  formId: string | null;
  selectedFieldId: string | null;
  mode: "edit" | "preview";
  title: string;

  // ACTIONS
  addField: (field: FormField) => void;
  updateField: (id: string, newConfig: Partial<FormField>) => void;
  selectField: (id: string | null) => void;
  reorderFields: (startIndex: number, endIndex: number) => void;
  toggleMode: () => void;
  updateThemeColor: (
    key: "primary" | "background" | "text",
    value: string
  ) => void;
  setFormId: (id: string) => void;
  initState: (initialState: StoredState) => void;
  updateTitle: (title: string) => void;
}
