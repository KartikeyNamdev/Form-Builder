// components/builder/fields/DropdownInput.tsx
import { FormField } from "@/types";

interface DropdownInputProps {
  field: FormField;
  isPreview?: boolean;
}
export function DropdownInput({
  field,
  isPreview = false,
}: DropdownInputProps) {
  return (
    <select
      className={`w-full bg-white/5 border-white/10 rounded-md p-2 ${
        isPreview ? "" : "pointer-events-none"
      }`}
      name={field.id} // <-- ADD THIS LINE
    >
      {field.options?.map((option, index) => (
        <option key={index} value={option} className="bg-dark-bg">
          {option}
        </option>
      ))}
    </select>
  );
}
