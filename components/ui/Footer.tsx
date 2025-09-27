// components/ui/Footer.tsx
import Link from "next/link";
import { Twitter, Instagram, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="container mx-auto px-8 py-12 mt-24 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <Link href="/" className="text-2xl font-bold text-white">
            Form Builder
          </Link>
          <p className="text-gray-400 mt-2">
            © 2025 Form Builder Inc. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8 text-gray-400">
          <Link href="#" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Support
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms
          </Link>
        </div>
        <div className="flex gap-6 text-gray-400">
          <Link href="#" className="hover:text-white transition-colors">
            <Twitter />
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            <Instagram />
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            <Github />
          </Link>
        </div>
      </div>
    </footer>
  );
}
