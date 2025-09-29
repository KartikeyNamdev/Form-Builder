import { FormField } from "@/types";
interface EmailInputProps {
  field: FormField;
  isPreview?: boolean;
}
export function EmailInput({ field, isPreview = false }: EmailInputProps) {
  return (
    <input
      type="email"
      placeholder={field.placeholder}
      name={field.id} // <-- ADD THIS LINE
      className={`w-full bg-white/5 border-white/10 rounded-md p-2 ${
        isPreview ? "" : "pointer-events-none"
      }`}
    />
  );
}
