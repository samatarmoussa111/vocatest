import type React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Mona_Sans } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const mona_sans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Vocatest - Learn French Vocabulary",
  description:
    "A mobile-first vocabulary learning app for French language learners",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(mona_sans.className)}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 px-4 sm:px-6 lg:px-8">{children}</main>
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
