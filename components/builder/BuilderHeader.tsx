// components/builder/BuilderHeader.tsx
"use client";

import useBuilderStore from "@/store/builderStore";

export function BuilderHeader() {
  const { mode, toggleMode } = useBuilderStore();

  return (
    <header className="flex justify-center items-center mb-8">
      <div className="flex items-center bg-white/10 p-1 rounded-lg">
        <button
          onClick={mode === "preview" ? toggleMode : undefined}
          className={`px-4 py-2 rounded-md transition-colors ${
            mode === "edit" ? "bg-brand-green text-white" : "text-gray-300"
          }`}
        >
          Edit
        </button>
        <button
          onClick={mode === "edit" ? toggleMode : undefined}
          className={`px-4 py-2 rounded-md transition-colors ${
            mode === "preview" ? "bg-brand-green text-white" : "text-gray-300"
          }`}
        >
          Preview
        </button>
      </div>
    </header>
  );
}
