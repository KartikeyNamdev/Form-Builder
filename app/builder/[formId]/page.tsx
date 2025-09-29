// app/builder/[formId]/page.tsx
"use client";

import { Canvas } from "@/components/builder/Canvas";
import { ElementsPanel } from "@/components/builder/ElementsPanel";
import { InspectorPanel } from "@/components/builder/InspectorPanel";
import { BuilderHeader } from "@/components/builder/BuilderHeader";
import useBuilderStore from "@/store/builderStore";
import { use, useEffect } from "react";
import { loadFormFromLocalStorage } from "@/lib/Storage";

// import { Panel } from "@/components/ui/Panel";

export default function BuilderPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { initState, setFormId } = useBuilderStore();
  const { formId } = use(params);

  useEffect(() => {
    const savedState = loadFormFromLocalStorage(formId);
    if (savedState) {
      initState(savedState);
    }
    setFormId(formId);
  }, [formId, initState, setFormId]);

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <BuilderHeader />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <ElementsPanel />
        </div>
        <div className="lg:col-span-6">
          <Canvas />
        </div>
        <div className="lg:col-span-3">
          <InspectorPanel />
        </div>
      </div>
    </main>
  );
}
