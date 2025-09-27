// components/ui/FeatureCard.tsx
import { Panel } from "./Panel";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Panel>
      <div className="flex items-center gap-4 mb-4">
        {/* This div creates the semi-transparent green background */}
        <div className="p-2 bg-brand-green/20 rounded-lg">
          {/* This className makes the icon itself green */}
          <Icon className="text-brand-green" size={24} />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </Panel>
  );
}
