'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { inter } from '@/app/ui/fonts';
import { AuthProvider } from "./contexts/AuthProvider";
import { DataProvider } from "./contexts/DataContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </AuthProvider>
        <script src="flowbite/dist/flowbite.min.js"></script>
        <script src="//daybrush.com/moveable/release/latest/dist/moveable.min.js"></script>
      </body>
    </html>
  );
}
