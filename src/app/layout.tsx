import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/common/AppSidebar"

export const metadata: Metadata = {
  title: "Biller",
  description: "search your topics",
  icons:"icon.png"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-200`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }} >
        {/* You can manually render a drawer here if needed */}
       <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
        <Toaster />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
