// components/builder/Builder.tsx
"use client";

import { useEffect } from "react";
import useBuilderStore from "@/store/builderStore";
import { Canvas } from "./Canvas";
import { ElementsPanel } from "./ElementsPanel";
import { InspectorPanel } from "./InspectorPanel";
import { BuilderHeader } from "./BuilderHeader";
import { saveForm } from "@/app/actions";
import { Button } from "../ui/Button";
import { Form } from "@prisma/client";
import { FormField, FormTheme } from "@/types";

export function Builder({ form }: { form: Form }) {
  const { initState, setFormId, title, fields, theme } = useBuilderStore();

  useEffect(() => {
    initState({
      title: form.title,
      fields: form.fields as unknown as FormField[],
      theme: form.theme as unknown as FormTheme,
    });
    setFormId(form.id);
  }, [form, initState, setFormId]);

  const handleSave = async () => {
    await saveForm(form.id, { title, fields, theme });
    alert("Form saved successfully!");
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* This div creates the header row */}
      <div className="flex justify-between items-center mb-8">
        <BuilderHeader />
        <Button onClick={handleSave} variant="primary">
          Save
        </Button>
      </div>

      {/* This div creates the 3-column grid for the main content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          {" "}
          <ElementsPanel />{" "}
        </div>
        <div className="lg:col-span-6">
          {" "}
          <Canvas />{" "}
        </div>
        <div className="lg:col-span-3">
          {" "}
          <InspectorPanel />{" "}
        </div>
      </div>
    </main>
  );
}
