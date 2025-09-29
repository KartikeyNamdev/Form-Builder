// app/page.tsx
"use client";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Brush, Code, Rocket } from "lucide-react"; // Example icons
import { redirect } from "next/navigation";

export default function LandingPage() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="container mx-auto px-8 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
          Build Beautiful Forms.
          <span className="text-brand-green"> Effortlessly.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          The Serene-Tech Where code meets calm.
        </p>
        <div className="mt-8">
          <Button
            variant="primary"
            className="px-8 py-4 text-lg border-2 hover:border-[#10b981]"
            onClick={() => {
              redirect("/signup");
            }}
          >
            Start Building for Free
          </Button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="container mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Powerful Features, Naturally Integrated.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Brush}
            title="Intuitive Design"
            description="Create stunning forms with a simple and beautiful drag-and-drop editor."
          />
          <FeatureCard
            icon={Code}
            title="Developer Friendly"
            description="Integrate your forms anywhere with just a snippet of code."
          />
          <FeatureCard
            icon={Rocket}
            title="Advanced Logic"
            description="Build smart forms with conditional logic, calculations, and more."
          />
        </div>
      </div>
    </>
  );
}
