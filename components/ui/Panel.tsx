// components/ui/Panel.tsx
import React from "react";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <div
      className={`
        bg-panel-bg 
        backdrop-blur-xl 
        rounded-2xl 
        border border-white/30 
        p-6 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
