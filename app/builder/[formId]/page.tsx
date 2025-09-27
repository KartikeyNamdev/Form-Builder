// app/builder/[formId]/page.tsx
import { Canvas } from "@/components/builder/Canvas";
import { ElementsPanel } from "@/components/builder/ElementsPanel";
import { InspectorPanel } from "@/components/builder/InspectorPanel";
import { BuilderHeader } from "@/components/builder/BuilderHeader";

// import { Panel } from "@/components/ui/Panel";

export default function BuilderPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <BuilderHeader />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel */}
        <div className="lg:col-span-3">
          <ElementsPanel />
        </div>

        {/* Center Panel */}
        <div className="lg:col-span-6">
          <Canvas />
        </div>

        {/* Right Panel - Use the new component */}
        <div className="lg:col-span-3">
          <InspectorPanel />
        </div>
      </div>
    </main>
  );
}
