"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Check if the current page is part of the builder or dashboard
  const isAppPage =
    pathname.startsWith("/builder") || pathname.startsWith("/dashboard");

  // If we are on an app page, just show the content
  if (isAppPage) {
    return <>{children}</>;
  }

  // Otherwise, for public pages, show the full layout
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
