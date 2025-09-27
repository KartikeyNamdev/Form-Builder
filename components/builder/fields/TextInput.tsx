// components/builder/fields/TextInput.tsx
import { FormField } from "@/types";
interface TextInputProps {
  field: FormField;
  isPreview?: boolean; // Add this prop
}

export function TextInput({ field, isPreview = false }: TextInputProps) {
  return (
    <input
      type="text"
      placeholder={field.placeholder}
      className={
        `w-full bg-white/5 border-white/10 rounded-md p-2 
        ${isPreview ? "" : "pointer-events-none"}` // Conditionally apply the class
      }
    />
  );
}
