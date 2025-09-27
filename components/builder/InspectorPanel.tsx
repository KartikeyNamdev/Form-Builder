// components/builder/InspectorPanel.tsx
"use client";

import useBuilderStore from "@/store/builderStore";
import { Panel } from "../ui/Panel";
import { useState } from "react";
import { ThemePanel } from "./ThemePanel";

export function FieldSettings() {
  // Get all necessary state and actions from the store
  const { fields, selectedFieldId, updateField } = useBuilderStore();

  // Find the full object for the selected field
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  // If no field is selected, show a placeholder message
  if (!selectedField) {
    return (
      <Panel>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="flex items-center justify-center h-full text-gray-400 text-center">
          <p>Select a field on the canvas to see its properties.</p>
        </div>
      </Panel>
    );
  }

  // If a field IS selected, show the inputs to edit its properties
  return (
    <Panel>
      <h2 className="text-xl font-bold mb-4">Field Settings</h2>
      <div className="space-y-6">
        {/* Label Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Label
          </label>
          <input
            type="text"
            value={selectedField.label}
            onChange={(e) =>
              updateField(selectedField.id, { label: e.target.value })
            }
            className="w-full bg-white/5 border-white/10 rounded-md p-2"
          />
        </div>
        {/* Placeholder Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Placeholder
          </label>
          <input
            type="text"
            value={selectedField.placeholder || ""}
            onChange={(e) =>
              updateField(selectedField.id, { placeholder: e.target.value })
            }
            className="w-full bg-white/5 border-white/10 rounded-md p-2"
          />
        </div>
        {/* Required Toggle */}
        <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
          <label className="font-medium text-gray-300">Required</label>
          <input
            type="checkbox"
            checked={selectedField.required}
            onChange={(e) =>
              updateField(selectedField.id, { required: e.target.checked })
            }
            className="h-5 w-5 rounded accent-brand-green"
          />
        </div>
      </div>
    </Panel>
  );
}
export function InspectorPanel() {
  const [activeTab, setActiveTab] = useState<"settings" | "theme">("settings");

  return (
    <Panel>
      <div className="flex mb-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 ${
            activeTab === "settings"
              ? "text-brand-green border-b-2 border-brand-green"
              : "text-gray-400"
          }`}
        >
          Field
        </button>
        <button
          onClick={() => setActiveTab("theme")}
          className={`px-4 py-2 ${
            activeTab === "theme"
              ? "text-brand-green border-b-2 border-brand-green"
              : "text-gray-400"
          }`}
        >
          Theme
        </button>
      </div>
      {activeTab === "settings" ? <FieldSettings /> : <ThemePanel />}
    </Panel>
  );
}
