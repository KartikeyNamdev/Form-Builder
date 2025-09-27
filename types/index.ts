// types/index.ts
export interface FormField {
  id: string; // A unique ID for each field
  type: "text" | "email" | "textarea" | "checkbox" | "dropdown" | "file";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For dropdowns
}

export interface FormTheme {
  colors: {
    primary: string;
    background: string;
    text: string;
    panelBg: string;
  };
  fonts: {
    body: string;
  };
}

// This will define the structure of our store
// types/index.ts

export interface BuilderState {
  fields: FormField[];
  theme: FormTheme;
  selectedFieldId: string | null;
  addField: (field: FormField) => void;
  updateField: (id: string, newConfig: Partial<FormField>) => void;
  selectField: (id: string | null) => void;
  reorderFields: (startIndex: number, endIndex: number) => void;
  mode: "edit" | "preview";
  toggleMode: () => void;
  updateThemeColor: (
    key: "primary" | "background" | "text" | "panelBg",
    value: string
  ) => void;
}
