// components/builder/ElementsPanel.tsx
"use client"; // This must be a client component to use hooks

import { v4 as uuidv4 } from "uuid";
import useBuilderStore from "@/store/builderStore";
import { FormField } from "@/types";
import { Panel } from "../ui/Panel";
// import { Button } from "../ui/Button"; // We'll create this button soon

export function ElementsPanel() {
  // Get the addField action from our store
  const { addField } = useBuilderStore();

  const handleAddField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: uuidv4(),
      type: type,
      label: `New ${type} field`,
      required: false,
    };
    addField(newField);
  };

  return (
    <Panel>
      <h2 className="text-xl font-bold mb-4">Add Elements</h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleAddField("text")}
          className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          Text Input
        </button>
        <button
          onClick={() => handleAddField("email")}
          className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          Email Input
        </button>
        <button
          onClick={() => handleAddField("textarea")}
          className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          Textarea
        </button>
      </div>
    </Panel>
  );
}
