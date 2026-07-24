import type { Metadata } from "next";
import "@/app/globals.css";
import { GlobalTopNav } from "@/components/navigation/global-top-nav";
import { RouteTransition } from "@/components/motion/route-transition";

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
      <body>
        <GlobalTopNav />
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
