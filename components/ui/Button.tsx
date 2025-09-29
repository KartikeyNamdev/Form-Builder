// components/ui/Button.tsx
import React from "react";
import { twMerge } from "tailwind-merge"; // Import the utility

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg ";

  const variantStyles = {
    primary: "bg-primary text-white hover:opacity-90 focus:ring-primary",
    secondary:
      "bg-white/5 text-gray-200 hover:bg-white/10 focus:ring-brand-green",
    // submit: "border-2 border-red-500",
  };

  return (
    <button
      // Use twMerge to combine classes safely
      className={twMerge(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
