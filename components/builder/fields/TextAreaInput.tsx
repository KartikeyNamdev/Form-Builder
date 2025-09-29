// components/builder/fields/TextareaInput.tsx
import { FormField } from "@/types";

interface TextareaInputProps {
  field: FormField;
  isPreview?: boolean;
}
export function TextareaInput({
  field,
  isPreview = false,
}: TextareaInputProps) {
  return (
    <textarea
      placeholder={field.placeholder}
      name={field.id} // <-- ADD THIS LINE
      className={`w-full bg-white/5 border-white/10 rounded-md p-2 h-24 resize-none ${
        isPreview ? "" : "pointer-events-none"
      }`}
    />
  );
}
