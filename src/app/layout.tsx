import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import TopBar from "@/components/TopBar";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Internet Download Manager",
 description: "Internet Download Manager UI Design",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" suppressHydrationWarning>
   <body
    className={cn(
     "min-h-screen bg-neutral-900 text-white antialiased flex flex-col overflow-hidden",
     font.className
    )}
   >
    <TopBar />
    {children}
   </body>
  </html>
 );
}
