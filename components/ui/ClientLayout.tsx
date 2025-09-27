// components/ui/ClientLayout.tsx
"use client"; // This must be a client component to use hooks

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBuilderPage = pathname.startsWith("/builder");

  // If we are on the builder page, just show the content without Header/Footer
  if (isBuilderPage) {
    return <>{children}</>;
  }

  // Otherwise, show the full public layout with Header and Footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
