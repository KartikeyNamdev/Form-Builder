// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { ClientLayout } from "@/components/ui/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-bg text-gray-200`}>
        {/* Your background image div can stay here if you want it on all pages */}
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <Image
            width={500}
            height={500}
            src="/bg.jpg"
            alt="Serene background texture"
            className="h-full w-full object-cover "
          />
        </div>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
