// components/ui/Header.tsx
import Link from "next/link";
import { Button } from "./Button";

export function Header() {
  const navLinks = ["Features", "Pricing", "Themes", "Contact"];

  return (
    <header className="py-6 px-8 flex justify-between items-center container mx-auto">
      <Link href="/" className="text-2xl font-bold text-white">
        Form Builder
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link}
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            {link}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Button variant="secondary">Log In</Button>
        <Button variant="primary">Sign Up</Button>
      </div>
    </header>
  );
}
