import type { Metadata } from "next";
import { roboto } from "./fonts";
import "./globals.css";
import type React from "react"; // Import React

export const metadata: Metadata = {
  title: "Enkaj Dashboard",
  description: "Property management dashboard for Enkaj",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children} <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
