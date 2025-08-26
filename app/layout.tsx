import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
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
