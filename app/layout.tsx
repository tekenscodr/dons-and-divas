import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopCards from "./components/TopCards";
import SideNav from "./components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import Provider from "./utils/Providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Point Of Sales",
  description: "The Best Salon in Ghana",
};

export const viewport: Viewport = {
  themeColor: '#204cb5'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />

      </body>
    </html>
  );
}
