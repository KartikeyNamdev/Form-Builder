// store/builderStore.ts
import { create } from "zustand";
import { BuilderState } from "@/types";
import { saveFormToLocalStorage } from "@/lib/Storage";

// Define the initial state of our store
const useBuilderStore = create<BuilderState>((set) => ({
  // STATE
  fields: [], // The form starts with no fields
  theme: {
    // Default theme settings
    colors: {
      primary: "#10b981",
      background: "#0a0a0a",
      text: "#f3f4f6",
    },
    fonts: {
      body: "Inter, sans-serif",
    },
  },
  mode: "edit", // Default to edit mode
  // NEW STATE
  selectedFieldId: null, // Nothing is selected initially
  formId: null, // Add formId to your state
  title: "Add Title", // Add the title property
  // ...
  updateTitle: (title) => set({ title }), // Add the update action

  setFormId: (id) => set({ formId: id }),
  // This is where you would load initial state
  initState: (initialState) => set(initialState),

  // ACTIONS (functions to modify the state)
  addField: (field) =>
    set((state) => ({
      fields: [...state.fields, field],
    })),

  updateField: (id, newConfig) =>
    set((state) => ({
      fields: state.fields.map((field) =>
        field.id === id ? { ...field, ...newConfig } : field
      ),
    })),
  // NEW ACTION
  selectField: (id) => set({ selectedFieldId: id }),
  // NEW ACTION
  reorderFields: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.fields);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { fields: result };
    }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "edit" ? "preview" : "edit",
    })),
  updateThemeColor: (key, value) =>
    set((state) => ({
      theme: {
        ...state.theme,
        colors: {
          ...state.theme.colors,
          [key]: value,
        },
      },
    })),
  // NEW ACTION - Update font
  updateThemeFont: (key: string, value: string) =>
    set((state) => ({
      theme: {
        ...state.theme,
        fonts: {
          ...state.theme.fonts,
          [key]: value,
        },
      },
    })),
}));

// Subscribe to changes and save to local storage
useBuilderStore.subscribe((state) => {
  if (state.formId) {
    const stateToSave = {
      fields: state.fields,
      theme: state.theme,
      title: state.title,
    };
    saveFormToLocalStorage(state.formId, stateToSave);
  }
});

export default useBuilderStore;
