import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { GlobalTopNav } from "@/components/navigation/global-top-nav";
import { RouteTransition } from "@/components/motion/route-transition";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ilya-NextLevel",
  description: "Next.js App Router foundation synced with Figma design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <GlobalTopNav />
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
