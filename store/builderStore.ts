// store/builderStore.ts
import { create } from "zustand";
import { BuilderState } from "@/types";

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
      panelBg: "rgba(23, 23, 23, 0.5)",
    },
    fonts: {
      body: "Inter, sans-serif",
    },
  },
  mode: "edit", // Default to edit mode

  // NEW STATE
  selectedFieldId: null, // Nothing is selected initially

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
}));

export default useBuilderStore;
