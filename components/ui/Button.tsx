// components/ui/Button.tsx
import React from "react";

// Define the props for our button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Optional variant prop
}

export function Button({
  // bg-[var(--primary-color)]
  children,
  className,
  variant = "primary", // Default to primary style
  ...props
}: ButtonProps) {
  // Base styles for all buttons
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg";

  // Variant-specific styles
  const variantStyles = {
    primary: "bg-primary text-white hover:opacity-90 focus:ring-primary",
    secondary:
      "bg-white/5 text-gray-200 hover:bg-white/10 focus:ring-brand-green",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
