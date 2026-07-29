import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { GlobalTopNav } from "@/components/navigation/global-top-nav";
import { RouteTransition } from "@/components/motion/route-transition";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
      <body className={inter.className}>
        <GlobalTopNav />
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
