// components/builder/fields/CheckboxInput.tsx
import { FormField } from "@/types";

interface CheckboxInputProps {
  field: FormField;
  isPreview?: boolean;
}
export function CheckboxInput({
  field,
  isPreview = false,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name={field.id} // <-- ADD THIS LINE
        className={`h-4 w-4 rounded accent-brand-green ${
          isPreview ? "" : "pointer-events-none"
        }`}
      />
      <label className="text-gray-400">{field.placeholder || ""}</label>
    </div>
  );
}
